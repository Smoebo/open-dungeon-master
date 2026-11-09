# ODM research note

**Updated 2026-11-09** (America/Toronto). **Upstream:** https://github.com/Lebbitheplow/open-game-master (MIT; maintainer lebbi / `Lebbitheplow`, lebbitheplow@proton.me). **Renamed 2026-10-27 (v0.31.0): Open Dungeon Master is now Open Game Master (OGM)**; the old repo URL redirects. "ODM" below means the same project. **Branch:** `research/notes` on `Smoebo/open-dungeon-master` (fork name unchanged), docs only.

Status words: **confirmed** = read at a cited path; **closed** = merged upstream; **unverified** = claimed, not checked; **unknown** = no evidence.

## a. Scope

- Research notes for ODM contributors. Started from Albert's (`Smoebo`) Tabletop Companion (TC, `Smoebo/tabletop-companion`) research after the 2026-10-05 decision to build on ODM (TC `docs/companion-design-decisions.md`).
- Research only. Not for merging upstream; nothing here is posted upstream. Claims cite a path, release, PR or URL; upstream paths are at `main` `b2f12e7` (v0.34.1, 2026-11-09 5:13 AM ET).
- Fork `main` is **even with upstream** (0 ahead / 0 behind). `Smoebo` is pull-only upstream; their PRs land through forks.

## b. Current state (verified 2026-11-09)

**v0.34.1 beta** (2026-11-09 6:00 AM ET) and **v0.33.0 stable** (Nov 7 2:26 AM ET). Six releases since last week: v0.32.1, v0.32.2 (betas), **v0.32.3 (stable, Nov 5)**, **v0.33.0 (stable)**, v0.34.0, v0.34.1 (betas) ([releases](https://github.com/Lebbitheplow/open-game-master/releases)). **512 commits** since `v0.32.0`; **116 PRs merged** since Nov 2 (94 by Smoebo, 22 by Lebbitheplow). **76 stars (+4), 36 forks (+5).** Client: **v0.25.1 beta / v0.24.0 stable** ([client](https://github.com/Lebbitheplow/open-game-master-client)). Docker: the old `open-dungeon-master` image names stopped at v0.32.3; installs must switch to `lebbi/open-game-master` (#835).

**New since 2026-11-02** (release notes v0.32.1–v0.34.1):

| Area | What shipped | Evidence |
|---|---|---|
| Adventure PDF import | A GM's own adventure PDF becomes a workshop: chapters as storyboard cards, keyed rooms as places, maps with grid, art, roll tables, stat blocks, the book's words as GM lore; with a model, also people, factions, treasure, scenes, secrets. **Every creature, item and spell is matched to SRD 5.1 whatever system the book is for** (5e, 2024, OSE/B/X, Pathfinder); the GM confirms each match, nothing lands until matches are confirmed; works without AI. The PDF is read on the device. Also reachable from **WorldForge ("Add an adventure PDF to this world")**, landing as a WorldForge file in the open world | #869 (v0.34.0 beta) |
| Fights and turns | `absent` party members (#768, fixes #740), long-distance openings keep tokens (#766, #741), party inside / enemies outside (#786, #743); the GM plays a player's character only as far as their words ask, and a question about ending the turn ends nothing (#874, #872, closes #761) | v0.32.1, v0.32.2, v0.34.1 |
| Tool errors | A refused tool call says which field was wrong and why; long descriptions fitted instead of refused (#875). The GM keeps its tools on llama.cpp gpt-oss (a schema had silently dropped all tools since 0.32.0; template errors now fail loudly) (#861) | v0.34.0, v0.34.1 |
| Factions | GM told when standing changes and which factions are in play, gets tools, reviews factions at chapter close (#876, from ziomik's 589-turn report #870) | v0.34.1 |
| After-the-roll card | Lucky, Bardic Inspiration, Portent, Chronal Shift, Guided Strike and others chosen after seeing the die; a roll nobody chooses for is kept after 20 seconds; a helper whose player is away is not waited on | #782, #848, #856, #857, #873, #877–#881 |
| Rules fidelity | Real dice and server dice run one attack pipeline (24 rules now work on real dice); dozens of reactions, subclass features, Channel Divinity, Ring of Spell Storing, wands/staffs/scrolls as Hand cards, two-damage-type spells, silver and copper coins, corner-to-corner sight | #836, #765–#780, #809–#831, #878, #883, #779, #826 |
| Workshop / homebrew | Spell lists for workshop classes, species spells, subclass choices, whole Draconic Bloodline; Fill what's left builds every subclass (649 combinations checked) | #833, #837–#840, #863 |
| Narration | Stray `)*` removed (#767, fixes #744); scroll-up holds (#764, fixes #760); GM answers the person a player spoke to (#829, #830); brisker fight replies (#867) | v0.32.1, v0.33.0, v0.34.0 |

Unchanged: single process, Human/Assisted/Steered modes, deny-by-default audiences, no redirect note on resume, no read-only canon flag, SRD 5.1 only.

## c. Planned work

- **`docs/ROADMAP.md` "Next"** unchanged: ruleset validation (`src/lib/rulesets/validate.ts`) first, then homebrew monsters in workshop bundles.
- **#570** (mcerina) is still the open design thread on measurement, the Hand and conventions.
- **#845** (Smoebo, new): replace 517 painted spell icons with a composable glyph system (example art only, discussion stage).
- Working style unchanged: each release carries every open PR of the day, audited against main and SRD 5.1, often finished by lebbi (#841, #886). Stable promotions now arrive about every 2–3 days (v0.32.3, v0.33.0), faster than `docs/releases.md`'s 2–4 weeks.

## d. Open work by area (upstream, 2026-11-09 ~9:00 AM ET)

**0 open PRs**; **5 open issues** (was 11). 18 issues closed since Nov 2, including #740, #741, #743, #744, #746, #760, #761, #870. Client: no open PRs or issues.

| Area | Issues | Why it may matter |
|---|---|---|
| Art / UI | #845 Spell icons: composable glyph system (Smoebo) | Readable icons for 517 spells and every homebrew spell without new paintings |
| Rules / conventions | #570 Discussion: rules fidelity, the Hand and code conventions (mcerina) | Where measurement and rules-module questions belong |
| Community / docs | #562 Send app players to the main repo, ask for a star once (Smoebo); #541 DemonRoute endpoint example (haterfactory); #168 Discord server (Smoebo) | Growth and backend docs |

## e. Gaps vs Tabletop Companion ideas

Sources: TC `docs/companion-design-decisions.md` and TC research note. Status at v0.34.1; changes since 2026-11-02 in bold.

| # | TC idea | ODM status | Evidence |
|---|---|---|---|
| 1 | Swappable rules modules (SRD 5.2, 3.5, GURPS, Daggerheart) | Confirmed missing. **The adventure PDF import takes the opposite route: books for OSE/B/X, Pathfinder or 5e 2024 are converted to SRD 5.1 at import, with a GM-confirmed match per creature, item and spell** | #869, #673 |
| 2 | Non-playing human co-DM on AI tables | Closed (steering seat, v0.25.0) | #144 |
| 3 | Pause-and-redirect apart from X-card | Pause closed; break holds every game action; End session exists. Redirect note on resume still missing (no change) | #453, #547, #616 |
| 4 | Whole-session assisted handoff | Partial. `MAX_COVER_TURNS = 20` unchanged. **A helper whose player is away is no longer waited on; the GM plays a seat's character only as far as its words ask** | `src/lib/dm/delegation.ts`, #881, #874 |
| 5 | Propose / dry-run / approve + undo | Partial. **Refused tool calls now name the wrong field and why (#875); the PDF import is a propose-then-confirm flow (nothing lands until matches are confirmed)**. `dryRun` still internal | #627, #739, #869, #875 |
| 6 | Fail-closed knowledge tiers | **Nearly closed:** hidden attributes/effects/private notes per seat incl. replay; shared recap drops partial knowledge; players get only introduced people and visible cast changes | #547, #616, #709, #736 |
| 7 | Read-only canon import (WorldForge) | Closed shape. **New path into WorldForge: an adventure PDF can be laid into the open world (#869).** Still no read-only canon flag | #499, #869; `src/lib/pdf-import/bundle-logic.ts` |
| 8 | Private DM-to-player text in person | Partial. **Deepened:** private notes and "Hopes for this story" per seat; agent GM's whisper back answers the player | #547, #574, v0.31.3 |
| 9 | Same-Wi-Fi hub | Shipped in code (desktop), live test unverified | #484 |
| 10 | Audited privacy evidence | Partial. **Test base stronger:** Hand scorer, seeded dice script and turn trace make reproducible checks possible; still no independent privacy audit | #628, #739, #570 |
| 11 | Correction voting | Closed; corrections counted | #144, #522 |
| 12 | Starter adventure + pregens | Closed | #145, #508, #516 |
| 13 | Voice: DM acts only on a trigger phrase | Unverified / likely missing (a closed microphone now stays closed, #544) | - |
| 14 | Consent-scoped private-sheet corrections | Unverified | - |

## f. Worth adopting from competitors

| Idea | Source | Where it would land in ODM |
|---|---|---|
| Dry-run, then approval cards | Familiar v2.26.0 (`/undo`, MCP `undo-last-workflow`) | Expose the cast guard's `dryRun` on `odm_dm_invoke` and the console; reuse #142's offer bar |
| Hidden = 404; one projection for portal, agent, export | Grimoire 1.5.3f/g | #143 covers events; party Atlas review path is a start; add "export as the player sees it" |
| Read-only player MCP by default | Grimoire 1.5.3e | Settings defaults new grants to `read` + `play` |
| Revocation ends live streams | DiceFrame (SSE end on revoke); Grimoire 1.5.3e | Check that revoking a grant or share closes open event streams and assistant-link relays |
| A table's agreed homebrew rulings, kept | TableForge (Oct): rulings shown on the campaign page and hero sheet | Store #144's settled disputes as a "table rulings" list the DM prompt reads |
| Separate referee and narrator AIs | TableForge "Mirelle" (every table) | Opt-in referee role; srdcheck for cited verdicts |
| Import preview, confirm, receipt; conflicts stop at the boundary | **New:** DiceFrame v3.0.0 stable (Oct 19) | Matches #499's kept-value record; a receipt per WorldForge import would make canon sync auditable (O7) |
| Scoped agent modes (suggest / routine / task), bulk visibility plan confirmed once | **New:** DiceFrame v3 DF Agent | Model for player/DM agent grants and batch reveal on party Atlas |
| Ended saves stay read-only; relationship scores roll back with the save | **New:** DiceFrame v3.0.4 (Nov 2) | ODM's bonds and romance are now big state; check that Revert this turn and End session restore or freeze them the same way (#627, #616) |
| Between-session self-serve | ScryRPG, MythWeaver, Archivist, Grimoire; ODM has agent level-up, shops, prep mid-adventure | Shops, trade, level-up, Ask outside live play |
| Agent "free rein" with a fixed ask-first list; a failed change rolls back whole ("Nothing was applied" means exactly that) | **New:** ScryRPG (Oct 24) | Player/GM agent grants and `odm_dm_invoke`: routine edits go through; deleting, revealing, permissions, another seat's character or a large change asks first. Why it may matter: one written list is easier to audit than per-tool rules, and all-or-nothing writes keep Revert this turn (#627) simple |
| Disguised items: the player-side appearance drives weight, price and loot splits; using one sends the GM an identify request | **New:** ScryRPG (Nov 2) | Per-seat hidden attributes (#547), trade and shops. Why it may matter: derived numbers (carry weight, sale price) are a leak path the per-seat secrets work may not cover yet; worth a gap 6 test |
| Imports: the last visibility pass can only hide, never reveal; GM can undo a player's import | **New:** ScryRPG (Oct 24) | WorldForge import (#499, O7), next to the import receipt idea above. Why it may matter: a hide-only final pass makes canon sync fail closed |
| Stale writes refused: an edit or AI write based on data that changed since it loaded is rejected and asked again | **New:** Grimoire 1.6.0 (Oct 28); ScryRPG (Sep 24, inventory) | Agent tools that write sheets, inventory or world state. Why it may matter: agent GMs and player agents act on state read turns earlier; a version check stops silent overwrites of a human's edit |
| Player-scoped in-world calendar: "today in the world" follows the last played session; players see only dates and eras they already know | **New:** Grimoire 1.6.0 (Oct 28) | End session / Start session N (#616) and the "Previously, on..." recap: say how much story time passed, filtered per seat. Why it may matter: session boundaries are now explicit, and time between them is shared state that can leak future events |
| Per-player post-session highlights (an award per player, key moments, quotes) about 10 minutes after the session ends | **New:** Archivist Session Gems (Oct 28) | After End session (#616), built from each seat's own view. Why it may matter: a between-session reason to come back that respects per-seat knowledge |
| Rules tags split: a pack's hard dependency (`requires.rulesets`) is separate from "written for" (`compatible_rulesets`), so a CoC pack can be filtered without a runtime; unproven 5e→2024 alias removed | **New:** DiceFrame v3.1.0 (Nov 7), which also adds a CoC 7e rules track | Workshop bundles and PDF-imported workshops. Why it may matter: labelling content by system now, before any rules module, keeps gap 1 open cheaply |
| Content-pack detail page leaked keeper-only entries; fixed by filtering every pack view by the viewer, fail closed when unsure | **New:** DiceFrame v3.1.2 (Nov 8) | PDF imports put a whole book's text in as GM lore (#869). Why it may matter: worth a gap 6 test that no workshop, pack or import review page shows that lore to a player seat |
| Per-category "revealed world": unmet entries show nothing, a glimpse (name plus chosen fields) or everything; every player-visible entry says how the party knows it; a private-to-this-player section on each PC | **New:** Grimoire 1.6.1 (Nov 6) | World at the table and WorldForge imports (O7); player notes (#547). Why it may matter: a tiered default per category is a simple spoiler-safe rule for imported canon |
| One account switch: "check with me first" before any agent change; the agent says why it stopped | **New:** ScryRPG (Nov 3) | Player/GM agent grants. Why it may matter: complements the ask-first list idea above with one user-facing switch |
| Measured memory: scene recall reached the GM in 9 of 9 tests on a 578-scene campaign, up from 2 of 9 | **New:** NarrativeEngine-P v2.2.0 (Nov 9) | O16 and #570. Why it may matter: a published recall test is the kind of number ODM's lore budget (#309) could report |
| Whisper to one person, phone layout, drawing on the map | **New:** CozyVTT v1.6.0 (Nov 9) | Gap 8 (private text in person). Study only (AGPL) |

## g. Watchlist

**Commercial** (last checked 2026-11-09 for ScryRPG and Grimoire; others 2026-11-02):

| Product | Note |
|---|---|
| Familiar (Foundry) | No change found: v2.26.0 (Oct 5) is still the latest ([releases](https://github.com/Ryanjansen92/familiar-releases/releases), Foundry package page) |
| TableForge | No change found after the Oct 26 dev update (multiclassing; class features with Use Feature; fewer needless checks), already listed last week. Changelog dates by month only. Prior: homebrew rulings persist, Mirelle referee, companions in fights (Oct 17) ([changelog](https://tableforge.gg/changelog), r/TableForgeDM) |
| ScryRPG | **Nov 3:** masked items preview the player's view, one Reveal button, reveals respect private containers; account-wide "Check with me first" for the familiar; familiar says why it stopped. Prior: Nov 2 disguised items; Oct 24 free rein with ask-first list, all-or-nothing rollback, hide-only import pass ([changelog](https://scryrpg.com/changelog/)) |
| MythWeaver | No dated change found (no public changelog; Android open beta Aug 28 is the last dated release). Site now shows Community sharing of lore/maps and an iOS TestFlight beta, undated |
| Archivist | **Session Gems** (Oct 28): per-player Hero Award, Key Moments, Memorable Quotes ~10 min after a session, by email/Discord ([blog](https://www.myarchivist.ai/blog/session-gems)). **API/MCP** (Oct 31): Markdown in/out for journals ([changelog](https://github.com/archivistai/api-examples/blob/main/CHANGELOG.md)) |
| Grimoire (ttrpg.bot) | **1.6.1 "Revealed world"** (Nov 6): per category, unmet entries show Nothing / A glimpse / Everything; per-entry override and "how the party knows it"; PC section private to its player. Prior: 1.6.0 calendars, stale writes refused ([changelog](https://www.ttrpg.bot/changelog/)) |
| Skeinkeeper | No change found: repo last pushed Sep 10, 1 star, still pre-MVP ([repo](https://github.com/skeinkeeper/skeinkeeper)) |

**Open source** (GitHub API, 2026-11-09; push dates ET):

| Project | License | Stars | Push | Note |
|---|---|---|---|---|
| [DiceFrame](https://github.com/diceframe/diceframe) | AGPL-3.0 | 151 (+7) | Nov 9 | **v3.1.0–v3.1.2** (Nov 7–8): CoC 7e rules track, rules tags split (requires vs compatible), content-pack market; v3.1.2 fixed a pack page that showed keeper-only entries to players. Study only |
| [Covel](https://github.com/ackness/covel) | MIT | 70 | Nov 9 | v0.0.54 (Nov 4) (not re-read) |
| [Loreweaver](https://github.com/1A7432/loreweaver) | MIT | 68 | Nov 2 | Gap 1 reference; dev builds |
| [NarrativeEngine-P](https://github.com/Sagesheep/NarrativeEngine-P) | MIT | 121 | Nov 9 | **v2.2.0** (Nov 9): scene recall 9/9 vs 2/9 on a 578-scene test campaign; GM OS v5 default ruleset |
| [open-tabletop-gm](https://github.com/Bobby-Gray/open-tabletop-gm) | not detected | 66 | Nov 8 | 5e as a pluggable system module. Best gap 1 reference (last release v0.14.1, Aug) |
| [AnyWorld](https://github.com/iamarxs/AnyWorld) | MIT | 41 | Oct 31 | Multiplayer, AI-only DM |
| [srdcheck](https://github.com/chaoz23/srdcheck) | not detected | 3 | Oct 21 | Cited SRD verdicts |
| [CozyVTT](https://github.com/CheekyChinchilla/CozyVTT) | AGPL-3.0 | 29 | Nov 9 | **v1.6.0** (Nov 9): phone layout, whisper to one person, drawing on the map. Study only |

**Study-only (low stars / niche):** [navi-dnd](https://github.com/AlexandrNemashkalo/navi-dnd) (5 stars, C# 5e AI DM); [eldritchdm](https://github.com/shoemoney/eldritchdm) (Apache-2.0, three-brain Discord bot).

New-project scan (GitHub, created since Oct 26, 2026-11-09): only zero-star repos (e.g. `jakehandy/tavern-mcp`, `G33ks/foundryvtt-mcp`, `shirofuji/blackwallai`); nothing credible enough to add. Not rechecked this week: Familiar, TableForge, MythWeaver, Archivist, Skeinkeeper (repo still last pushed Sep 10). Quiet / unchanged: VelvetRP, CampaignRepo, ADnD, dmcp, lorekit, STMP.

## h. Weekly search queries (bump the date)

- `"dungeon master" ai created:>=2026-01-01 stars:>=10` (sort: stars)
- `topic:ai-dungeon-master created:>=2026-01-01` (sort: stars)
- `"game master" llm ttrpg created:>=2026-01-01 stars:>=5`
- `ttrpg mcp created:>=2026-01-01` (sort: stars)
- `llm tabletop multiplayer created:>=2026-01-01`
- `topic:ttrpg topic:self-hosted pushed:>=2026-11-09`
- `ai gm rpg multiplayer created:>=2026-11-09 stars:>=3`
- `repo:Lebbitheplow/open-game-master is:pr is:open` and `is:issue is:open`; same for `open-game-master-client`

## i. Recommendations

- **O1.** ~~Review #143~~ Merged. Remaining: keep whispers and outline out of the DM prompt where possible, and test redaction vs absence (gap 6).
- **O2.** Test the steering seat (merged, v0.25.0) against TC's "human-steered AI DM". Confirmed: the lead loses `secretStory`. Pause now exists (#453); AI check-ins still missing (gap 4).
- **O3.** ~~Propose a non-X-card pause~~ **Shipped as Pause the table (#453).** Remaining delta: let the person who resumes (DM, lead, steerer) attach a private redirect note the DM reads on Resume (gap 3). **2026-11-02:** the same note would fit End session / Start session N (#616), read with the "Previously, on..." recap.
- **O4.** Ask whether whole-session cover is still wanted now that the steering seat, pause and prep mid-adventure exist (gap 4).
- **O5.** Map where 5e is assumed before any rules-module code. **2026-11-02:** the SRD 5.1 text audit (#673) and per-entry pack readings that keep Level Up out of a 5.1 table (#669–#672) are the pattern a second ruleset would copy: its own text audit as failing tests, its own readings. #570 is the thread to raise it in. **Delta:** #506 makes SRD 5.1 the only ruleset and `docs/ROADMAP.md` still lists ruleset validation first; a rules module would now start from one clean 5.1 seam. References: open-tabletop-gm, Loreweaver, DiceFrame v3 modular runtime, srdcheck (gap 1). **2026-11-09:** the PDF import (#869) already matches other systems to SRD 5.1 per entry; tagging each imported workshop with the book's source system (DiceFrame v3.1.0's `compatible_rulesets` idea) would keep that information for a later rules module.
- **O6.** Expose `dryRun` beyond the cast guard and build previews on #142's offer bar; undo move, builder undo and world-draft review are patterns to reuse (gap 5).
- **O7.** ~~Add WorldForge as a read-only lore source~~ Done another way (#169, #393). **Delta:** #499's kept-value record is most of a canon-sync contract; an optional "read-only canon" flag could make the table side always "Keep the import's", and an import receipt (DiceFrame v3) would make sync auditable. **2026-11-09:** #869 adds a second way into a WorldForge world (an adventure PDF). Grimoire 1.6.1's per-category reveal tiers (nothing / glimpse / everything for unmet entries) are a candidate default for what players see of imported canon.
- **O8.** Same-Wi-Fi test with internet off on the desktop app's "Share on this Wi-Fi"; check voice and Android (gap 9).
- **O9.** Lead with tests (**2026-11-02:** the fight bench's dice script and turn trace, #739, and the Hand scorer, #628, make seeded privacy and leak scenarios practical): a privacy evidence matrix (event audiences, text-leak suite, browser harness, fields-not-English, roll-text withholding) fits `stabilization` (gap 10). The correction ledger (#522) now gives narrator-quality numbers to report beside it.
- **O10.** ~~Sync the fork~~ **Done:** fork `main` even with upstream. Fork keeps its old name; GitHub redirects upstream links, so renaming it is optional.
- **O11.** New grants default to `read` + `play` (confirmed). Suggest `read` only for player agents, or label `play` clearly.
- **O12.** Keep settled disputes (#144) as a table-rulings list the DM prompt reads (TableForge). Overruled rulings are now counted by #522, so the data is there.
- **O13.** Test that revoking an agent grant or share closes live streams and assistant-link relays (DiceFrame, Grimoire).
- **O14.** Stop / queue watchdog (hung-turn recovery) and Pause the table (break) now both exist. **Delta:** make sure Help and the tours name the difference, so tables don't press Stop for a break.
- **O15.** Addon catalogue hygiene: #420/#421/#458/#519 merged (session stage, viewport, threads permission). Confirm propose-then-server-decides and player-safe fog still hold with threads, and add a seat-rights check to the catalogue audit.
- **O16.** Use the correction ledger (#522) per model and backend: publish narrator-quality rates for the recommended local setup (llama.cpp + gpt-oss-20b) in the fresh-install docs. Why it may matter: hosts choosing a model get evidence, not anecdotes. **2026-11-02:** #570's seeded scenarios plus the scorer (#628) are the way to produce those numbers.
- **O17.** ~~Settle the small-window tool budget (#746) before the `start_encounter` asks (#740, #741, #743) add arguments: for example, one grouped `scene` argument or tools loaded per intent. Why it may matter: 48K-context local tables are the recommended setup, and every new argument currently breaks them.~~ **Done:** #746 closed Nov 3 and all three asks shipped (#768, #766, #786).
- **O18.** Since betas now ship nightly and stable every 2–4 weeks (`docs/releases.md`), run the O8 Wi-Fi test and O13 revocation test on the stable build. Why it may matter: results then hold for most installs, which follow stable. **2026-11-09:** stable is now v0.33.0; installs on the old Docker image name are stuck at v0.32.3 (#835).
- **O19.** *(new)* Adventure PDF import (#869) follow-ups: (a) a player-seat leak test that the book's text, kept as GM lore, never shows on a workshop, pack or import page (DiceFrame v3.1.2 found exactly that leak); (b) mark a workshop made from a PDF as made from a book the GM owns, and warn before it is exported or shared as a bundle (no licence or sharing flag found in `src/lib/pdf-import/`). Why it may matter: the feature answers GeekSheikh's convert-your-own-books idea, and both checks keep it safe for private tables.

## j. Verify next week

1. Redirect note on resume or session start (O3).
2. "Share on this Wi-Fi" with internet off, on stable v0.33.0 (O8, O18).
3. Revocation: open streams and assistant-link relay after a grant is revoked (O13).
4. Read-only canon option, and how a PDF laid into a WorldForge world behaves on reimport (O7, #869).
5. PDF import: player-seat leak test and bundle export of a PDF workshop (O19).
6. #845 glyph proposal and #570 replies.

## Sources

Upstream at `b2f12e7`; releases v0.32.1–v0.34.1; client releases v0.23.3–v0.25.1; `docs/ROADMAP.md`, `src/lib/pdf-import/` (`bundle-logic.ts`, `srd-match.ts`); PRs #766, #768, #786, #835, #836, #861, #869, #872, #874–#876, #878; issues #570, #746, #761, #845, #870. DiceFrame v3.1.0/v3.1.2, NarrativeEngine-P v2.2.0, CozyVTT v1.6.0 release notes; ScryRPG changelog; ttrpg.bot changelog; GitHub API for section g. Earlier weeks' sources are in git history.

## Changelog

- **2026-10-08** - Created; research moves from Tabletop Companion to ODM.
- **2026-10-08** - Rewritten for the contributor team: about half the length, "Why it may matter" column, new section d.
- **2026-10-12** - Weekly delta: v0.25.0-v0.26.3 (about 300 commits). Gaps 2, 11, 12 closed; gap 7 closed in a different shape (WorldForge built in, #169); gap 6 mostly closed; gap 9 shipped in the desktop client, untested. No open PRs; section d now has a Proposals group (#37 open, #57 closed by #183). New adopt ideas O12 (table rulings) and O13 (revocation ends streams). New watch: CozyVTT.
- **2026-10-19** - Weekly delta: v0.26.4–v0.28.2 (~571 commits; head `9da9d1b`; client v0.19.2). World at table, addons + first catalogue addon, Stop/watchdog, `@DM` OOC, Atlas/party Atlas, agent level-up, fields-not-English, worn-on. Gaps 1, 3, 5, 7, 8, 10 marked deepened. Open work refreshed (PRs #420/#421/#423/#425; issues #275/#424); Proposals now #37 and #288. O7/O10 deltas; **O14** (Stop ≠ pause) and **O15** (addon catalogue hygiene). Competitor/OSS: DiceFrame v3 beta, Grimoire 1.5.3g, TableForge Oct, CozyVTT 1.5.3; navi-dnd / eldritchdm study-only. Stars 47 / forks 22; Smoebo/main ~172 behind.
- **2026-10-26** - Weekly delta: v0.28.3–v0.30.2 (488 commits; head `817e76c`; client v0.21.2). **Gap 3 pause closed** (Pause the table, #453); gap 1 moved further away (SRD 5.1 only, #506); gaps 5, 6, 7, 8, 10, 11, 12 deepened (undo move/builder, roll-text withholding, reimport kept-value #499, correction ledger #522). #37, #288, #275 closed; Proposals empty. O3 and O10 retired as done; deltas on O2, O5, O7, O9, O12, O14, O15; **O16** (narrator-quality numbers per model). DiceFrame v3.0.0 stable, CozyVTT 1.5.4, TableForge multiclassing. Stars 52 / forks 22; fork even with upstream.
- **2026-11-02** - Weekly delta: v0.30.3–v0.32.0 (878 commits; head `2819283`; client v0.23.0 beta). **Renamed Open Game Master** (repo `Lebbitheplow/open-game-master`); stable/beta channels, v0.32.0 first beta. End session / Start session N, secrets per seat, engine resolves cards first, whole declared actions, improvised actions, SRD 5.1 text audit, Revert this turn, fight bench. Gap 6 nearly closed; gaps 1, 3, 4, 5, 8, 10 deepened. 0 open PRs; 11 open issues. O3, O5, O9, O10, O16 deltas; **O17** (tool budget #746) and **O18** (test on stable). DiceFrame v3.0.4. Stars 72 / forks 31; fork even with upstream.
- **2026-11-02 (follow-up)** - Commercial watchlist rechecked (skipped in the weekly run): ScryRPG (4 releases), Grimoire 1.6.0, Archivist Session Gems; no change for Familiar, TableForge, MythWeaver, Skeinkeeper. Six **New** adopt ideas in section f (ask-first list + atomic agent writes, disguised items, hide-only import pass, stale-write refusal, player-scoped calendar, per-player highlights). Section j item 8 done.
- **2026-11-09** - Weekly delta: v0.32.1–v0.34.1 (512 commits; head `b2f12e7`; stable v0.33.0, client v0.24.0 stable / v0.25.1 beta). **Adventure PDF import** (#869) converts any system's book to SRD 5.1 with GM-confirmed matches, also into a WorldForge world. #761 fixed; #740/#741/#743/#746 shipped, **O17 retired**. Factions move (#876); tool errors name the bad field (#875). Gaps 1, 4, 5, 7 updated; 0 open PRs, 5 open issues. O5, O7, O18 deltas; **O19** (PDF import leak test and sharing warning). New adopt ideas from DiceFrame v3.1, Grimoire 1.6.1, ScryRPG Nov 3, NarrativeEngine 2.2.0, CozyVTT 1.6.0. Stars 76 / forks 36; fork even with upstream.
