import { z } from "zod";
import type { Campaign } from "@/lib/db/campaigns";
import { getActiveEncounter, getEnemy, setEnemyRevealed, type EncounterEnemy } from "@/lib/db/encounters";
import { publishEncounter, resolveEnemyRef, unknownEnemyRef } from "@/lib/dm/enemy-damage";
import { badArguments, type ToolResult } from "@/lib/dm/tool-errors";
import { monsterPlaceholder } from "@/lib/placeholders";

// reveal_enemy: the GM says the table now sees what a disguised creature
// really is. Horror and mystery present some monsters as people (The Good
// Doctor fights as a werewolf, The Night Clerk as a vampire spawn), and their
// tokens keep the secret (src/lib/placeholders.ts, the reskin guard). Nothing
// lifted it, so the doctor who turned into a wolf in round two stayed a
// person on the board to the end of the fight. This marks the enemy's row
// (src/lib/db/encounters.ts setEnemyRevealed) and every face of it draws the
// creature from then on. It changes no rule and rolls nothing.
//
// An engine action with a console form (catalog-combat.ts) and no tool
// definition of its own. The AI GM's tool set had about 25 tokens to spare
// under the floors scripts/test-prompt-window.mjs keeps, and a tool costs
// some 130, so the AI says it with the tool it already has: set_condition on
// the enemy with the condition "revealed", and clear_condition to put the
// disguise back (encounter-tools-extra.ts handleEnemyCondition sends both
// here). GAME STATE tells it so on the line of each enemy still in disguise
// (disguiseNote), and on no other.

const revealEnemyArgsSchema = z.object({
  enemyId: z.string().min(1),
  // The way back: unset reveals, so the plain call is the common one.
  disguised: z.coerce.boolean().optional(),
});

// Whether the genre draws this enemy as something other than the creature it
// fights as, so a reveal has a face to change.
function hasDisguise(campaign: Pick<Campaign, "genre">, enemy: EncounterEnemy): boolean {
  const look = { cr: enemy.cr, genre: campaign.genre, seed: enemy.displayName, slug: enemy.slug, name: enemy.displayName, race: enemy.race, gender: enemy.gender };
  return monsterPlaceholder(enemy.stats.type, look) !== monsterPlaceholder(enemy.stats.type, { ...look, revealed: true });
}

// For GAME STATE, on the line of an enemy still in its disguise: how the GM
// says the mask is off. Nothing for any other enemy, so a table with no
// disguised monster pays no words for it.
export function disguiseNote(campaign: Pick<Campaign, "genre">, enemy: EncounterEnemy): { disguise?: string } {
  return !enemy.revealed && hasDisguise(campaign, enemy)
    ? { disguise: `in disguise on the board: once the table has seen what it really is, set_condition with its enemyId and condition "revealed" makes its token the creature (clear_condition puts the disguise back)` }
    : {};
}

export function handleRevealEnemy(campaign: Campaign, rawArguments: string): ToolResult {
  const encounter = getActiveEncounter(campaign.id);
  if (!encounter) {
    return { error: "No active encounter: reveal_enemy works only in a fight.", retry: true };
  }
  let args: z.infer<typeof revealEnemyArgsSchema>;
  try {
    args = revealEnemyArgsSchema.parse(JSON.parse(rawArguments || "{}"));
  } catch (error) {
    return badArguments("Invalid arguments: reveal_enemy needs enemyId.", error, rawArguments);
  }
  const enemy = resolveEnemyRef(encounter.id, args.enemyId);
  if (!enemy) {
    return unknownEnemyRef(encounter.id, "enemyId", args.enemyId);
  }
  // The fallen and the fled keep a face in the tracker too, so any enemy of
  // the fight may be marked: the wolf lying dead is still the wolf.
  const revealed = args.disguised !== true;
  // Said back so nobody narrates a picture that did not change: only a
  // creature the genre draws in disguise has another face to show.
  const changes = hasDisguise(campaign, enemy);
  if (Boolean(enemy.revealed) !== revealed) {
    setEnemyRevealed(enemy.id, revealed);
    publishEncounter(campaign.id);
  }
  const after = getEnemy(enemy.id) ?? enemy;
  return {
    ok: true,
    name: after.displayName,
    revealed: Boolean(after.revealed),
    note: !changes
      ? `${after.displayName} has no disguise on the board: its token is the same either way.`
      : revealed
        ? `${after.displayName}'s token now shows the creature it fights as, and keeps it in later fights.`
        : `${after.displayName}'s token is back in its disguise.`,
  };
}
