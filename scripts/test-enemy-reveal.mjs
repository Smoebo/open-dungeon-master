// The reveal of a disguised enemy (src/lib/dm/reveal-tools.ts). Horror and
// mystery present some monsters as people: The Good Doctor fights as a
// werewolf, and his token keeps the secret (src/lib/placeholders.ts, the
// reskin guard). Nothing lifted it, so the doctor who turned into a wolf in
// round two stayed a person on the board to the end of the fight. reveal_enemy
// marks the enemy's own row: every face of it draws the creature from then
// on, through a new name, damage, a new form and a return in a later fight,
// and the same call puts the disguise back. A person running the game has it
// as a console action; the AI GM says it with set_condition, since its tool
// set has no room for another tool.
import assert from "node:assert/strict";
import { openWorld } from "./lib/enforce-world.mjs";
import { suite } from "./lib/enforce-harness.mjs";
import { combatKit, TRAINED } from "./lib/enforce-combat.mjs";

const { test, finish } = suite("test-enemy-reveal");
const world = await openWorld({ campaign: { theme: "horror" }, gameSettings: { genre: "horror" } });
const kit = await combatKit(world);
const { getEnemy, renameEnemy, patchEnemyHp } = await import("../src/lib/db/encounters.ts");
const { writeEnemyForm } = await import("../src/lib/db/enemy-form.ts");
const { activePublicEncounter } = await import("../src/lib/db/encounter-view.ts");
const { monsterPlaceholder } = await import("../src/lib/placeholders.ts");
const { adjudication } = await import("../src/lib/dm/invoke-catalog.ts");
const { disguiseNote } = await import("../src/lib/dm/reveal-tools.ts");

// Two of them, so a werewolf and a bandit fit the party's budget.
world.addHero({ class: "fighter", level: 8, proficiencies: TRAINED });
world.addHero({ class: "fighter", level: 8, proficiencies: TRAINED });
await world.beginFight([
  { monster: "werewolf", name: "The Good Doctor" },
  { monster: "bandit", name: "Road Vulture", cr: 0.125 },
]);
kit.openField();
const genre = world.campaign().genre;
const doctor = world.enemies().find((enemy) => enemy.displayName === "The Good Doctor");
const vulture = world.enemies().find((enemy) => enemy.displayName === "Road Vulture");

// The face every screen draws, from what the fight's view carries: the
// board, the encounter panel, the composer and the cinematic view all pass
// these same fields to monsterPlaceholder.
function faceOf(enemyId) {
  const enemy = activePublicEncounter(world.campaignId).enemies.find((entry) => entry.id === enemyId);
  return monsterPlaceholder(enemy.type, { cr: enemy.cr, genre, seed: enemy.name, slug: enemy.slug, name: enemy.name, race: enemy.race, gender: enemy.gender, revealed: enemy.revealed });
}

await test("a disguised enemy starts in its disguise", () => {
  assert.equal(genre, "horror");
  assert.equal(doctor.slug, "werewolf");
  assert.equal(doctor.revealed, undefined);
  assert.equal(Object.hasOwn(activePublicEncounter(world.campaignId).enemies.find((entry) => entry.id === doctor.id), "revealed"), false);
  assert.doesNotMatch(faceOf(doctor.id), /werewolf/);
});

await test("reveal_enemy stores the reveal on the enemy's row and its face becomes the creature", async () => {
  const out = await world.invoke("reveal_enemy", { enemyId: doctor.id });
  assert.equal(out.ok, true, out.error);
  assert.equal(out.result.revealed, true);
  assert.match(out.result.note, /creature it fights as/);
  assert.equal(getEnemy(doctor.id).revealed, true);
  assert.match(faceOf(doctor.id), /\/monster\/werewolf\.webp$/);
  assert.equal(getEnemy(vulture.id).revealed, undefined, "nobody else in the fight is touched");
});

await test("the reveal survives a new name, damage and a new form", () => {
  renameEnemy(doctor.id, "The Wolf");
  patchEnemyHp(doctor.id, Math.max(1, doctor.currentHp - 5), "alive");
  writeEnemyForm(doctor.id, { ...doctor.stats, ac: 15 });
  assert.equal(getEnemy(doctor.id).revealed, true);
  assert.match(faceOf(doctor.id), /\/monster\/werewolf\.webp$/);
  renameEnemy(doctor.id, "The Good Doctor");
});

await test("the same call puts the disguise back, and saying either twice changes nothing", async () => {
  const again = await world.invoke("reveal_enemy", { enemyId: doctor.id });
  assert.equal(again.ok, true, again.error);
  assert.equal(getEnemy(doctor.id).revealed, true);
  const back = await world.invoke("reveal_enemy", { enemyId: doctor.id, disguised: true });
  assert.equal(back.ok, true, back.error);
  assert.equal(back.result.revealed, false);
  assert.match(back.result.note, /back in its disguise/);
  assert.equal(getEnemy(doctor.id).revealed, undefined);
  assert.doesNotMatch(faceOf(doctor.id), /werewolf/);
  const twice = await world.invoke("reveal_enemy", { enemyId: doctor.id, disguised: true });
  assert.equal(twice.ok, true, twice.error);
  assert.equal(getEnemy(doctor.id).revealed, undefined);
});

await test("the AI GM says it with the tool it has: the condition 'revealed' on the enemy, and clearing it", async () => {
  const told = disguiseNote(world.campaign(), getEnemy(doctor.id)).disguise;
  assert.match(told, /set_condition/, "GAME STATE tells it how, on the line of an enemy in disguise");
  assert.match(told, /"revealed"/);
  assert.deepEqual(disguiseNote(world.campaign(), getEnemy(vulture.id)), {}, "and says nothing for an enemy with no disguise");
  const out = await world.invoke("set_condition", { enemyId: doctor.id, condition: "revealed" });
  assert.equal(out.ok, true, out.error);
  assert.equal(out.result.revealed, true);
  assert.equal(getEnemy(doctor.id).revealed, true);
  assert.deepEqual(getEnemy(doctor.id).conditions, [], "the mark is no condition: nothing to expire or be cleared with the rest");
  assert.match(faceOf(doctor.id), /\/monster\/werewolf\.webp$/);
  assert.deepEqual(disguiseNote(world.campaign(), getEnemy(doctor.id)), {}, "once revealed, GAME STATE stops saying so");
  const back = await world.invoke("clear_condition", { enemyId: doctor.id, condition: "revealed" });
  assert.equal(back.ok, true, back.error);
  assert.equal(getEnemy(doctor.id).revealed, undefined);
  assert.doesNotMatch(faceOf(doctor.id), /werewolf/);
});

await test("an enemy with no disguise is told its token stays the same", async () => {
  const before = faceOf(vulture.id);
  const out = await world.invoke("reveal_enemy", { enemyId: vulture.id });
  assert.equal(out.ok, true, out.error);
  assert.match(out.result.note, /same either way/);
  assert.equal(faceOf(vulture.id), before);
});

await test("a call that names nobody is sent back, and nothing changes", async () => {
  const out = await world.invoke("reveal_enemy", { enemyId: "nobody-here" });
  assert.equal(out.ok, false);
  assert.equal(out.result?.retry ?? out.retry, true);
  const empty = await world.invoke("reveal_enemy", {});
  assert.equal(empty.ok, false);
  assert.equal(getEnemy(doctor.id).revealed, undefined);
});

await test("a person running the game has the same action, with its way back", () => {
  const entry = adjudication("reveal_enemy");
  assert.ok(entry, "reveal_enemy is in the adjudication catalog");
  assert.equal(entry.needsEncounter, true);
  assert.deepEqual(entry.fields.map((field) => field.name), ["enemyId", "disguised"]);
});

await test("a revealed creature comes back revealed in a later fight", async () => {
  const shown = await world.invoke("reveal_enemy", { enemyId: doctor.id });
  assert.equal(shown.ok, true, shown.error);
  await kit.endFight();
  await world.beginFight([{ monster: "werewolf", returning: doctor.id }, { monster: "bandit", returning: vulture.id }]);
  const back = world.enemies();
  const wolf = back.find((enemy) => enemy.carriedFrom === doctor.id);
  assert.equal(wolf.revealed, true);
  assert.match(faceOf(wolf.id), /\/monster\/werewolf\.webp$/);
  assert.equal(back.find((enemy) => enemy.carriedFrom === vulture.id).revealed, true, "what the table was shown stays shown");
});

await test("outside a fight there is nobody to reveal", async () => {
  await kit.endFight();
  const out = await world.invoke("reveal_enemy", { enemyId: doctor.id });
  assert.equal(out.ok, false);
});

world.close();
finish();
