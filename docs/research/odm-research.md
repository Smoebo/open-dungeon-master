# ODM research note

**Updated 2026-11-02** (America/Toronto). **Upstream:** https://github.com/Lebbitheplow/open-game-master (MIT; maintainer lebbi / `Lebbitheplow`, lebbitheplow@proton.me). **Renamed 2026-10-27 (v0.31.0): Open Dungeon Master is now Open Game Master (OGM)**; the old repo URL redirects. "ODM" below means the same project. **Branch:** `research/notes` on `Smoebo/open-dungeon-master` (fork name unchanged), docs only.

Status words: **confirmed** = read at a cited path; **closed** = merged upstream; **unverified** = claimed, not checked; **unknown** = no evidence.

## a. Scope

- Research notes for ODM contributors. Started from Albert's (`Smoebo`) Tabletop Companion (TC, `Smoebo/tabletop-companion`) research after the 2026-10-05 decision to build on ODM (TC `docs/companion-design-decisions.md`).
- Research only. Not for merging upstream; nothing here is posted upstream. Claims cite a path, release, PR or URL; upstream paths are at `main` `2819283` (v0.32.0, 2026-11-02 6:06 AM ET).
- Fork `main` is **even with upstream** (0 ahead / 0 behind). `Smoebo` is pull-only upstream; their PRs land through forks.

## b. Current state (verified 2026-11-02)

**v0.32.0, the first beta** (prerelease, Docker `:beta`), 2026-11-02 5:58 AM ET; **v0.31.4 is stable** (Oct 31 10:11 PM ET). Seven releases since last week: v0.30.3 (Oct 27), v0.31.0 (Oct 27, rename), v0.31.1 (Oct 28), v0.31.2 (Oct 29), v0.31.3 (Oct 31), v0.31.4, v0.32.0 ([releases](https://github.com/Lebbitheplow/open-game-master/releases)). **878 commits** since `v0.30.2`; **158 PRs merged** since Oct 26 (59 by Smoebo). **72 stars (+20), 31 forks.** Client: **v0.23.0 beta / v0.22.4 stable** ([client](https://github.com/Lebbitheplow/open-game-master-client), also renamed).

**New since 2026-10-26** (release notes v0.30.3–v0.32.0):

| Area | What shipped | Evidence |
|---|---|---|
| Rename | Open Game Master; the role is "Game Master (GM)" everywhere; `opengamemaster.com` (old domain answers until year end); Docker `lebbi/open-game-master` (old image names still published); `@GM` and `@DM` both work; nothing saved changes | #558, #559, #560, #565; v0.31.0 |
| Release channels | Every build ships as a nightly **beta**; betas that hold up are promoted **stable** unchanged every 2–4 weeks. Same for apps | `docs/releases.md`; v0.32.0 |
| Sessions | **End the session / Start session N**: play stops where it stands, sheets and prep stay open, every seat sees the next meeting with RSVP; after a long gap a "Previously, on..." recap; the shared recap leaves out what only some characters know | #616 (closes #586) |
| Secrets and breaks | Hidden attributes, effects and private notes reach only allowed seats, live and on replay; a break now holds trades, rolls, clock, floor and monster turns (talk, corrections, prep stay open) | #547 |
| Engine resolves first | Every complete Hand card is resolved by the engine before the narrator speaks; a player's **whole declared action** resolves in one GM turn (agent GMs no longer need "keep going"); **improvised actions** are rolled, not refused | #629–#633, #749/#751 (mcerina), #742/#752 (mcerina) |
| Rules fidelity | **SRD 5.1 text audit**: every rule the engine breaks is a failing test, then fixed (monsters, combat, gear, magic items, spells, multiclass); content pack stores what the app read from each entry, held to a golden set; "a 5.1 table never gets Level Up's version"; initiative order and reactions hold | #673 (part of #570), #684–#693, #669–#672, #713, #739 |
| Undo / test bench | **Revert this turn** takes back everything (death saves, clock); Workshop **Test fight** (replaces Deploy); saved fight set-ups, dice script, turn trace, scripted events, Resolve as played; a Hand scorer counts cards resolved by the right tool | #627, #556, #739 (from #685), #628 |
| Agents | Connected player agent takes its whole combat turn; poll link follows a player to a new hero; Test backend plays one campaign-shaped turn | #700, #701, #624 (Smoebo) |
| Characters | Multiclass at creation (Smoebo); species with player choices; companions you keep; "Hopes for this story" (private, read by the GM); a fallen hero's player brings in a new one; race and gender on NPC/foe faces (Smoebo) | #568, #555, #573, #574, #617, #747 |
| Companions / romance | Conscience gaps closed (server keeps companions at warning; split party); romance at the table, exclusive by default, paced by story time | #564, #723–#726 |
| Languages | Light, romance safety, dictation and narrator voice in all 15 table languages; Spanish/French/Italian/Portuguese narrators | #734 (mcerina) |
| Addons | Native 3D board addons on Windows desktop (`combatOnly` option); 3D models get foe sex; safety alerts and break banners stay visible over native boards | #584, #745, #748 (Xargot) |
| Contributors | CONTRIBUTING guide; a PR needs no issue of its own | #575, #697 |

Unchanged: single process (SQLite, event bus, queue, voice), Human/Assisted/Steered modes, deny-by-default event audiences, WorldForge inside the workshop (this week only portrait/race touches, no canon-contract change).

## c. Planned work

- **`docs/ROADMAP.md` "Next"** still opens with ruleset validation (`src/lib/rulesets/validate.ts`), then homebrew monsters travelling with workshop bundles.
- **#570** (mcerina, 4 comments) is the live design thread: measure model accuracy with fixed seeded scenarios before changing prompts, let the Hand talk to the engine directly (now largely shipped, #629/#749), and shared code conventions (CONTRIBUTING #575). The SRD text audit is filed as part of it.
- **#685 audit** (`docs/issue-685-audit-2026-11-01.md`) turned into the fight bench in v0.32.0.
- Milestone `stabilization`: 0 open / 11 closed, still open. Working style unchanged: lebbi batches every open PR of the day into one audited release (#759).

## d. Open work by area (upstream, 2026-11-02 ~9:00 AM ET)

**0 open PRs**; 11 open issues. 67 issues closed since 2026-10-26. Client: no open PRs or issues.

| Area | Issues | Why it may matter |
|---|---|---|
| Turn flow (bug) | #761 AI party members and PC turns advance before the player finishes (GDPguy) | Regression risk from the "whole declared action" and initiative work |
| UI (bug) | #760 Campaign page keeps scrolling to the input while the AI streams (said46) | Readability during long narration |
| Tool budget | #746 Small-window tool set has no room left; any new core-tool argument breaks `test-tool-profiles` (Smoebo) | Blocks the `start_encounter` proposals below on 48K-context local models |
| Encounters | #740 `absent` party members, #741 long `distanceFeet` spawns no tokens, #743 party inside / enemies outside (ziomik) | Scene fidelity for fights; all need tool arguments (see #746) |
| Narration | #744 Orphan closers like `)*` saved at the start of narration (ziomik) | Output cleanup |
| Rules / conventions | #570 Discussion: rules fidelity, the Hand and code conventions (mcerina) | Where measurement and rules-module questions belong |
| Community / docs | #562 Send app players to the main repo, ask for a star once (Smoebo); #541 DemonRoute endpoint example (haterfactory); #168 Discord server (Smoebo) | Growth and backend docs |

## e. Gaps vs Tabletop Companion ideas

Sources: TC `docs/companion-design-decisions.md` and TC research note. Status at v0.32.0; changes since 2026-10-26 in bold.

| # | TC idea | ODM status | Evidence |
|---|---|---|---|
| 1 | Swappable rules modules (SRD 5.2, 3.5, GURPS, Daggerheart) | Confirmed missing. **5.1 now audited line by line; but the content pack's per-entry readings already separate a "5.1 table" from Level Up entries, a small ruleset seam** | #673, #669–#672 |
| 2 | Non-playing human co-DM on AI tables | Closed (steering seat, v0.25.0) | #144 |
| 3 | Pause-and-redirect apart from X-card | Pause closed; **break now holds every game action**. Redirect note on resume still missing. **End session (#616) adds a between-session stop** | #453, #547, #616 |
| 4 | Whole-session assisted handoff | Partial. `MAX_COVER_TURNS = 20` unchanged. **Deepened for agents:** whole declared action in one GM turn; player agent takes its whole combat turn | `src/lib/dm/delegation.ts`, #749, #700 |
| 5 | Propose / dry-run / approve + undo | Partial, **deepened:** Revert this turn takes back everything; saved fight set-ups and Resolve as played. `dryRun` still internal (cast guard and rules helpers) | #627, #739 |
| 6 | Fail-closed knowledge tiers | **Nearly closed:** hidden attributes/effects/private notes per seat incl. replay; shared recap drops partial knowledge; players get only introduced people and visible cast changes | #547, #616, #709, #736 |
| 7 | Read-only canon import (WorldForge) | Closed shape; no change this week. Still no read-only canon flag | #499; `src/lib/worldforge/model.ts` |
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

## g. Watchlist

**Commercial** (last checked 2026-11-02; changes since 2026-10-19):

| Product | Note |
|---|---|
| Familiar (Foundry) | No change found: v2.26.0 (Oct 5) is still the latest ([releases](https://github.com/Ryanjansen92/familiar-releases/releases), Foundry package page) |
| TableForge | No change found after the Oct 26 dev update (multiclassing; class features with Use Feature; fewer needless checks), already listed last week. Changelog dates by month only. Prior: homebrew rulings persist, Mirelle referee, companions in fights (Oct 17) ([changelog](https://tableforge.gg/changelog), r/TableForgeDM) |
| ScryRPG | **Four releases** ([changelog](https://scryrpg.com/changelog/)): **Nov 2** disguised unidentified items (appearance drives weight/price/splits; use asks the GM), custom-worded lore connections, familiar gets full agent toolset; **Oct 26** per-system sheets (PF2e, Draw Steel, Daggerheart), create missing spells, GM-only NPC names kept out of player encounters; **Oct 24** familiar private page + party room, free rein with ask-first list, all-or-nothing rollback, import pages with hide-only final check and GM undo of player imports, monthly AI allowance; **Oct 21** players link own characters to factions |
| MythWeaver | No dated change found (no public changelog; Android open beta Aug 28 is the last dated release). Site now shows Community sharing of lore/maps and an iOS TestFlight beta, undated |
| Archivist | **Session Gems** (Oct 28): per-player Hero Award, Key Moments, Memorable Quotes ~10 min after a session, by email/Discord ([blog](https://www.myarchivist.ai/blog/session-gems)). **API/MCP** (Oct 31): Markdown in/out for journals ([changelog](https://github.com/archivistai/api-examples/blob/main/CHANGELOG.md)) |
| Grimoire (ttrpg.bot) | **1.6.0** (Oct 28): custom in-world calendars; "today in the world" follows played sessions; player-shared calendar shows only known dates/events; flashback sessions; stale date writes refused; MCP calendar tools incl. player-scoped `get_calendar_month` ([changelog](https://www.ttrpg.bot/changelog/)) |
| Skeinkeeper | No change found: repo last pushed Sep 10, 1 star, still pre-MVP ([repo](https://github.com/skeinkeeper/skeinkeeper)) |

**Open source** (GitHub API, 2026-11-02; push dates ET):

| Project | License | Stars | Push | Note |
|---|---|---|---|---|
| [DiceFrame](https://github.com/diceframe/diceframe) | AGPL-3.0 | 144 (+8) | Nov 2 | **v3.0.4** (Nov 2): D&D 2024 class features and spells, battle HUD and initiative bar, Adventure v2 scene progression, affinity scores with rollback, Tavern PNG import, ended saves read-only. Prior: modular runtime, import preview/confirm/receipt. Study only |
| [Covel](https://github.com/ackness/covel) | MIT | 66 | Nov 2 | v0.0.53 (Oct 28) (not re-read) |
| [Loreweaver](https://github.com/1A7432/loreweaver) | MIT | 67 | Nov 2 | Gap 1 reference; dev builds daily |
| [NarrativeEngine-P](https://github.com/Sagesheep/NarrativeEngine-P) | MIT | 113 | Nov 1 | Solo AI-DM memory; v2.1.0 (Oct 29) |
| [open-tabletop-gm](https://github.com/Bobby-Gray/open-tabletop-gm) | not detected | 62 | Oct 27 | 5e as a pluggable system module. Best gap 1 reference |
| [AnyWorld](https://github.com/iamarxs/AnyWorld) | MIT | 41 | Oct 31 | Multiplayer, AI-only DM |
| [srdcheck](https://github.com/chaoz23/srdcheck) | not detected | 3 | Oct 21 | Cited SRD verdicts |
| [CozyVTT](https://github.com/CheekyChinchilla/CozyVTT) | AGPL-3.0 | 27 | Nov 1 | v1.5.4 "Mending"** (Oct 25): 200+ fixes; sheet and rolls from initiative tracker; token facing. Study only |

**Study-only (low stars / niche):** [navi-dnd](https://github.com/AlexandrNemashkalo/navi-dnd) (5 stars, C# 5e AI DM); [eldritchdm](https://github.com/shoemoney/eldritchdm) (Apache-2.0, three-brain Discord bot).

New-project scan (GitHub, created since Oct 19): only zero-star repos (e.g. `blackars/TTRPG-AI-DM-Web`); nothing credible enough to add. Quiet / unchanged: VelvetRP, CampaignRepo, ADnD, dmcp, lorekit, STMP.

## h. Weekly search queries (bump the date)

- `"dungeon master" ai created:>=2026-01-01 stars:>=10` (sort: stars)
- `topic:ai-dungeon-master created:>=2026-01-01` (sort: stars)
- `"game master" llm ttrpg created:>=2026-01-01 stars:>=5`
- `ttrpg mcp created:>=2026-01-01` (sort: stars)
- `llm tabletop multiplayer created:>=2026-01-01`
- `topic:ttrpg topic:self-hosted pushed:>=2026-11-02`
- `ai gm rpg multiplayer created:>=2026-11-02 stars:>=3`
- `repo:Lebbitheplow/open-game-master is:pr is:open` and `is:issue is:open`; same for `open-game-master-client`

## i. Recommendations

- **O1.** ~~Review #143~~ Merged. Remaining: keep whispers and outline out of the DM prompt where possible, and test redaction vs absence (gap 6).
- **O2.** Test the steering seat (merged, v0.25.0) against TC's "human-steered AI DM". Confirmed: the lead loses `secretStory`. Pause now exists (#453); AI check-ins still missing (gap 4).
- **O3.** ~~Propose a non-X-card pause~~ **Shipped as Pause the table (#453).** Remaining delta: let the person who resumes (DM, lead, steerer) attach a private redirect note the DM reads on Resume (gap 3). **2026-11-02:** the same note would fit End session / Start session N (#616), read with the "Previously, on..." recap.
- **O4.** Ask whether whole-session cover is still wanted now that the steering seat, pause and prep mid-adventure exist (gap 4).
- **O5.** Map where 5e is assumed before any rules-module code. **2026-11-02:** the SRD 5.1 text audit (#673) and per-entry pack readings that keep Level Up out of a 5.1 table (#669–#672) are the pattern a second ruleset would copy: its own text audit as failing tests, its own readings. #570 is the thread to raise it in. **Delta:** #506 makes SRD 5.1 the only ruleset and `docs/ROADMAP.md` still lists ruleset validation first; a rules module would now start from one clean 5.1 seam. References: open-tabletop-gm, Loreweaver, DiceFrame v3 modular runtime, srdcheck (gap 1).
- **O6.** Expose `dryRun` beyond the cast guard and build previews on #142's offer bar; undo move, builder undo and world-draft review are patterns to reuse (gap 5).
- **O7.** ~~Add WorldForge as a read-only lore source~~ Done another way (#169, #393). **Delta:** #499's kept-value record is most of a canon-sync contract; an optional "read-only canon" flag could make the table side always "Keep the import's", and an import receipt (DiceFrame v3) would make sync auditable.
- **O8.** Same-Wi-Fi test with internet off on the desktop app's "Share on this Wi-Fi"; check voice and Android (gap 9).
- **O9.** Lead with tests (**2026-11-02:** the fight bench's dice script and turn trace, #739, and the Hand scorer, #628, make seeded privacy and leak scenarios practical): a privacy evidence matrix (event audiences, text-leak suite, browser harness, fields-not-English, roll-text withholding) fits `stabilization` (gap 10). The correction ledger (#522) now gives narrator-quality numbers to report beside it.
- **O10.** ~~Sync the fork~~ **Done:** fork `main` even with upstream. Fork keeps its old name; GitHub redirects upstream links, so renaming it is optional.
- **O11.** New grants default to `read` + `play` (confirmed). Suggest `read` only for player agents, or label `play` clearly.
- **O12.** Keep settled disputes (#144) as a table-rulings list the DM prompt reads (TableForge). Overruled rulings are now counted by #522, so the data is there.
- **O13.** Test that revoking an agent grant or share closes live streams and assistant-link relays (DiceFrame, Grimoire).
- **O14.** Stop / queue watchdog (hung-turn recovery) and Pause the table (break) now both exist. **Delta:** make sure Help and the tours name the difference, so tables don't press Stop for a break.
- **O15.** Addon catalogue hygiene: #420/#421/#458/#519 merged (session stage, viewport, threads permission). Confirm propose-then-server-decides and player-safe fog still hold with threads, and add a seat-rights check to the catalogue audit.
- **O16.** Use the correction ledger (#522) per model and backend: publish narrator-quality rates for the recommended local setup (llama.cpp + gpt-oss-20b) in the fresh-install docs. Why it may matter: hosts choosing a model get evidence, not anecdotes. **2026-11-02:** #570's seeded scenarios plus the scorer (#628) are the way to produce those numbers.
- **O17.** *(new)* Settle the small-window tool budget (#746) before the `start_encounter` asks (#740, #741, #743) add arguments: for example, one grouped `scene` argument or tools loaded per intent. Why it may matter: 48K-context local tables are the recommended setup, and every new argument currently breaks them.
- **O18.** *(new)* Since betas now ship nightly and stable every 2–4 weeks (`docs/releases.md`), run the O8 Wi-Fi test and O13 revocation test on the stable build. Why it may matter: results then hold for most installs, which follow stable.

## j. Verify next week

1. #761 (turns advancing early): cause and fix; whether it came from #739/#749.
2. Redirect note on resume or session start (O3).
3. "Share on this Wi-Fi" with internet off, on stable v0.31.4 (O8, O18).
4. Revocation: open streams and assistant-link relay after a grant is revoked (O13).
5. Read-only canon option after #499 (O7).
6. #746 tool budget and the `start_encounter` issues #740/#741/#743 (O17).
7. #570 replies on measurement and rules fidelity.

## Sources

Upstream at `2819283`; releases v0.30.3–v0.32.0; `docs/releases.md`, `docs/ROADMAP.md`, `docs/issue-685-audit-2026-11-01.md`, `src/lib/dm/delegation.ts`; PRs #547, #556, #564, #568, #574, #584, #616, #627–#633, #669–#673, #700, #713, #734, #739, #742, #747, #749; open issues #168, #541, #562, #570, #740, #741, #743, #744, #746, #760, #761; client releases v0.22.4 and v0.23.0; DiceFrame v3.0.4; GitHub API for section g. Commercial recheck: ScryRPG changelog, ttrpg.bot changelog, TableForge changelog and r/TableForgeDM, Archivist blog and API changelog, Familiar GitHub releases, mythweaver.gg, Skeinkeeper repo.

## Changelog

- **2026-10-08** - Created; research moves from Tabletop Companion to ODM.
- **2026-10-08** - Rewritten for the contributor team: about half the length, "Why it may matter" column, new section d.
- **2026-10-12** - Weekly delta: v0.25.0-v0.26.3 (about 300 commits). Gaps 2, 11, 12 closed; gap 7 closed in a different shape (WorldForge built in, #169); gap 6 mostly closed; gap 9 shipped in the desktop client, untested. No open PRs; section d now has a Proposals group (#37 open, #57 closed by #183). New adopt ideas O12 (table rulings) and O13 (revocation ends streams). New watch: CozyVTT.
- **2026-10-19** - Weekly delta: v0.26.4–v0.28.2 (~571 commits; head `9da9d1b`; client v0.19.2). World at table, addons + first catalogue addon, Stop/watchdog, `@DM` OOC, Atlas/party Atlas, agent level-up, fields-not-English, worn-on. Gaps 1, 3, 5, 7, 8, 10 marked deepened. Open work refreshed (PRs #420/#421/#423/#425; issues #275/#424); Proposals now #37 and #288. O7/O10 deltas; **O14** (Stop ≠ pause) and **O15** (addon catalogue hygiene). Competitor/OSS: DiceFrame v3 beta, Grimoire 1.5.3g, TableForge Oct, CozyVTT 1.5.3; navi-dnd / eldritchdm study-only. Stars 47 / forks 22; Smoebo/main ~172 behind.
- **2026-10-26** - Weekly delta: v0.28.3–v0.30.2 (488 commits; head `817e76c`; client v0.21.2). **Gap 3 pause closed** (Pause the table, #453); gap 1 moved further away (SRD 5.1 only, #506); gaps 5, 6, 7, 8, 10, 11, 12 deepened (undo move/builder, roll-text withholding, reimport kept-value #499, correction ledger #522). #37, #288, #275 closed; Proposals empty. O3 and O10 retired as done; deltas on O2, O5, O7, O9, O12, O14, O15; **O16** (narrator-quality numbers per model). DiceFrame v3.0.0 stable, CozyVTT 1.5.4, TableForge multiclassing. Stars 52 / forks 22; fork even with upstream.
- **2026-11-02** - Weekly delta: v0.30.3–v0.32.0 (878 commits; head `2819283`; client v0.23.0 beta). **Renamed Open Game Master** (repo `Lebbitheplow/open-game-master`); stable/beta channels, v0.32.0 first beta. End session / Start session N, secrets per seat, engine resolves cards first, whole declared actions, improvised actions, SRD 5.1 text audit, Revert this turn, fight bench. Gap 6 nearly closed; gaps 1, 3, 4, 5, 8, 10 deepened. 0 open PRs; 11 open issues. O3, O5, O9, O10, O16 deltas; **O17** (tool budget #746) and **O18** (test on stable). DiceFrame v3.0.4. Stars 72 / forks 31; fork even with upstream.
- **2026-11-02 (follow-up)** - Commercial watchlist rechecked (skipped in the weekly run): ScryRPG (4 releases), Grimoire 1.6.0, Archivist Session Gems; no change for Familiar, TableForge, MythWeaver, Skeinkeeper. Six **New** adopt ideas in section f (ask-first list + atomic agent writes, disguised items, hide-only import pass, stale-write refusal, player-scoped calendar, per-player highlights). Section j item 8 done.
