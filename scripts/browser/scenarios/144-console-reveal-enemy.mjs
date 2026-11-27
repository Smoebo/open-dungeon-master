// The GM console's "Reveal a disguised enemy". Horror presents some monsters
// as people: The Good Doctor fights as a werewolf and his token keeps the
// secret. Nothing lifted it, so the doctor who turned into a wolf stayed a
// person on the board to the end of the fight. The action draws the werewolf
// from then on, and its one box, "Put its disguise back", undoes it: labelled,
// off by default, explained in a line under it, a target a finger can reach at
// phone width, and legible in the night and day themes. The seed's Reveal
// Table, one per viewport, left in its disguise for a second run.
import { check, eventually, openPanelTab, untilStill } from "../lib.mjs";

const WOLF = '[src*="/monster/werewolf.webp"]';

export default {
  name: "console-reveal-enemy",
  viewports: ["desktop", "phone"],
  async run(t) {
    const { page, root, ids, viewport } = t;
    const table = ids.revealTables[viewport];
    const wolves = () => page.locator(`${root}${WOLF}`).count();
    const openForm = async () => {
      await openPanelTab(t, "dm");
      const tab = page.locator(`${root}[data-tour="dm-console-tabs"] button`).filter({ hasText: /^combat$/i }).locator("visible=true").first();
      await eventually(() => tab.count(), { timeoutMs: 30_000, label: "the console's Combat tab" });
      await t.tap(tab);
      const open = page.getByRole("button", { name: /^Reveal a disguised enemy\b/ }).locator("visible=true").first();
      await eventually(() => open.count(), { label: "the console's Reveal a disguised enemy" });
      if ((await page.getByLabel("Put its disguise back", { exact: true }).locator("visible=true").count()) === 0) {
        await t.tap(open);
      }
      await untilStill(page);
    };
    const box = () => page.getByLabel("Put its disguise back", { exact: true }).locator("visible=true").first();
    const ticked = () => box().evaluate((node) => node.getAttribute("aria-checked") === "true" || node.checked === true);
    const run = async () => {
      const answered = page.waitForResponse((response) => response.url().endsWith(`/api/campaigns/${table.id}/dm/invoke`) && response.request().method() === "POST");
      await t.tap(page.getByRole("button", { name: "Run", exact: true }).locator("visible=true").first());
      const response = await answered;
      check(response.ok(), `the console answered ${response.status()}: ${await response.text()}`);
    };

    const pickDoctor = async () => {
      const pick = page.getByRole("button", { name: "Enemy", exact: true }).locator("visible=true").first();
      await eventually(() => pick.count(), { label: "the Enemy picker" });
      await t.tap(pick);
      const doctor = page.getByRole("menuitemradio", { name: new RegExp(table.doctor) }).locator("visible=true").first();
      await eventually(() => doctor.count(), { label: "The Good Doctor under Enemy" });
      await t.tap(doctor);
    };

    await t.open(`/campaigns/${table.id}`);
    await eventually(() => page.locator(`${root}.cine-stage`).count(), { timeoutMs: 30_000, label: "the table's stage" });
    check((await wolves()) === 0, "The Good Doctor is drawn as a werewolf before anyone revealed him");
    await openForm();

    await eventually(() => box().count(), { label: "Put its disguise back, labelled" });
    check(!(await ticked()), "Put its disguise back starts on: the plain action would reveal nothing");
    await eventually(() => page.getByText(/Undoes a reveal/).locator("visible=true").count(), { label: "the line that says what the box does" });
    if (viewport === "phone") {
      // The kit's switch takes a press from above and below its track on a
      // touch screen (globals.css .kit-switch::before).
      const press = await box().evaluate((node) => parseFloat(getComputedStyle(node, "::before").height));
      check(press >= 39.5, `Put its disguise back is a target a finger can reach (${press}px)`);
    }
    await pickDoctor();
    await box().focus();
    await t.shot("reveal-form");
    const theme = await page.evaluate(() => document.documentElement.dataset.theme ?? "");
    await page.evaluate(() => (document.documentElement.dataset.theme = "light"));
    await untilStill(page);
    await t.shot("reveal-form-day");
    await page.evaluate((mode) => (document.documentElement.dataset.theme = mode), theme);

    await run();
    await eventually(() => page.getByText(/now shows the creature it fights as/).locator("visible=true").count(), { label: "what the reveal did, said back" });
    await eventually(async () => (await wolves()) > 0, { label: "the werewolf drawn once revealed" });
    await t.shot("revealed");
    await page.evaluate(() => (document.documentElement.dataset.theme = "light"));
    await untilStill(page);
    await t.shot("revealed-day");
    await page.evaluate((mode) => (document.documentElement.dataset.theme = mode), theme);

    // The way back, by the same form.
    await openForm();
    await pickDoctor();
    await t.tap(box());
    check(await ticked(), "Put its disguise back did not take the press");
    await run();
    await eventually(() => page.getByText(/back in its disguise/).locator("visible=true").count(), { label: "the disguise put back, said back" });
    await eventually(async () => (await wolves()) === 0, { label: "the person drawn again" });
  },
};
