# ODM research note

**Updated 2026-10-26** (America/Toronto). **Upstream:** https://github.com/Lebbitheplow/open-dungeon-master (MIT; maintainer lebbi / `Lebbitheplow`, lebbitheplow@proton.me). **Branch:** `research/notes` on `Smoebo/open-dungeon-master`, docs only.

Status words: **confirmed** = read at a cited path; **closed** = merged upstream; **unverified** = claimed, not checked; **unknown** = no evidence.

## a. Scope

- Research notes for ODM contributors. Started from Albert's (`Smoebo`) Tabletop Companion (TC, `Smoebo/tabletop-companion`) research after the 2026-10-05 decision to build on ODM (TC `docs/companion-design-decisions.md`).
- Research only. Not for merging upstream; nothing here is posted upstream. Claims cite a path, release, PR or URL; upstream paths are at `main` `817e76c` (v0.30.2, 2026-10-25 10:52 PM ET).
- Fork `main` is **even with upstream** (`817e76c`, 0 ahead / 0 behind). `Smoebo` is pull-only upstream; their PRs land through forks.

## b. Current state (verified 2026-10-26)

**v0.30.2**, 2026-10-25 11:32 PM ET. Eight releases since last week: v0.28.3 (Oct 20), v0.28.4 (Oct 21), v0.29.0 (Oct 22), v0.29.1 (Oct 22 11:49 PM), v0.30.0 (Oct 24), v0.30.1 (Oct 25 12:06 AM), v0.30.2 ([releases](https://github.com/Lebbitheplow/open-dungeon-master/releases)). **488 commits** since `v0.28.2`; ~110 PRs merged since Oct 19 (about half by Smoebo). **52 stars, 22 forks.** Client (desktop + Android): **v0.21.2**, 2026-10-25 11:55 PM ET ([client](https://github.com/Lebbitheplow/open-dungeon-master-client)).

**New since 2026-10-19** (release notes v0.28.3–v0.30.2):

| Area | What shipped | Evidence |
|---|---|---|
| Pause the table | Any human seat can call a break; banner names who paused and counts up; only pauser, lead or DM resumes; running DM turn finishes but its audio is held; in-character refused, OOC allowed; agents see lifecycle `paused` and cannot pause; survives restart; X-card stacks on top | #453 (Smoebo); `src/lib/dm/table-break.ts`, `queue.ts` (multi-reason gate) |
| Wait for the table | Opt-in: AI DM answers once everyone has acted or passed; respects a break | #438 (Smoebo); `src/lib/dm/table-wait.ts` |
| Correction ledger | Every fix a table makes to the AI DM (undo, revert, sheet edit, HP/turn-order fix, narration edit, reroll, overruled ruling, rewind) is counted; Admin shows narrator quality; edited narration keeps the narrator's take | #522 (Smoebo, closes #460); builds on #515 tester report kit |
| Report a problem | One-file tester report, gated issue forms, testing guide; admin-only | #515 (Smoebo), #527 |
| One ruleset | **Everything is SRD 5.1:** 2024 rows removed from the content pack; 2014 magic-item prices | #506 (issue #502); v0.30.0 |
| Workshop classes | Homebrew classes made in the workshop play like any other; subclass audit fixes | #477, #476 (mcerina audit #474); v0.29.0 |
| NPCs and companions | NPC advances (opt-in), scheming NPCs seen through by Insight (whispered to one player), companion conscience, pacts, sides in a fight; companion command | #507, #494 |
| Undo / review | Undo move; builder "Put it back" undo; draft a world from an idea, reviewed before anything is made; reimport keeps campaign edits and offers the import's version (Restore mine / Keep the import's) | #493, #510, #462, #499 (Smoebo) |
| Prep mid-adventure | Lead (AI table) or DM steps out to campaign prep with the table kept running | #533 (issue #530); v0.30.2 |
| Rolls | Prose beside a roll waits for the dice, so clues can't leak before a check | #536 (#531); v0.30.2 |
| Local models | llama.cpp recommended, Ollama supported; 16 GB minimum with gpt-oss-20b; local turns about half as long (100 s to 50 s in the town smoke) | #475, #463, #535 |
| WorldForge | Large worlds budgeted (World tab usable at 4,000 entries); world packs take workshop factions; Ask shows its passages; storyboard provenance | #479, #440, #439, #441 (Smoebo) |
| Addons | Native session stage, independent viewport, stage controls, threads permission, draw-once | #420, #421, #458 (Xargot), #518, #519 |
| Table / builder | Shops opened by the DM; haggling; offered pregens; AI-drafted pregens; owed choices on join; spell desk; party hook; two-tap board moves; Hand grouped by cost with colours | #456, #509, #508, #516, #510, #455, #485, #532 |

Unchanged from prior weeks: single process (SQLite, event bus, queue, voice), Human/Assisted/Steered modes, voice off by default, deny-by-default event audiences, WorldForge inside the workshop.

## c. Planned work

- **`docs/ROADMAP.md` "Next"** (ROADMAP moved under `docs/`) still opens with ruleset validation against the selected ruleset.
- **Milestone `stabilization`**: 0 open / 11 closed (still marked open). **#37 consolidation proposal closed as completed** (Oct 20), as was **#288** 3D view idea. **#275 fresh-install walkthrough closed** today (Oct 26).
- **Working style:** lebbi still batches every open PR into a nightly "carrier" release (#496, #511, #526, #537). Integration audits keep landing in `docs/` (e.g. `workshop-creator-import-audit-2026-10-22.md`).

## d. Open work by area (upstream, 2026-10-26 ~9:00 AM ET)

2 open PRs; 4 open issues. ~28 issues closed since 2026-10-19. Client: 1 open PR, no open issues.

| Area | Issues | PRs | Why it may matter |
|---|---|---|---|
| Community | #168 Discord server is up (Smoebo) | - | Coordination channel for proposals |
| Voice / narration | #539 TTS fails after first turn in desktop client (GDPguy) | #540 retried narration + read-aloud scenario (Lebbitheplow); client PR #88 `play()` waits for sound address (Lebbitheplow) | Desktop narration regression; fix in flight |
| DM tools | - | #542 parameter names and hint paths that misstated what they hold (mcerina) | Model tool-call accuracy, especially on local models |
| Backends / docs | #541 DemonRoute as an OpenAI-compatible endpoint example (haterfactory) | - | More backend choices for hosts |
| Builder / homebrew | #538 Custom species traits with selectable options (boneweevil1-del) | - | Next step after workshop classes (#477) |

**Proposals:** none open. #37 (consolidation) and #288 (3D view) closed as completed on 2026-10-20.

## e. Gaps vs Tabletop Companion ideas

Sources: TC `docs/companion-design-decisions.md` and TC research note. Status at v0.30.2; changes since 2026-10-19 in bold.

| # | TC idea | ODM status | Evidence |
|---|---|---|---|
| 1 | Swappable rules modules (SRD 5.2, 3.5, GURPS, Daggerheart) | Confirmed missing. **Moved further away:** "one ruleset, SRD 5.1" removed 2024 rows; homebrew now grows inside 5e (workshop classes) | #506, #477 |
| 2 | Non-playing human co-DM on AI tables | Closed (steering seat, v0.25.0) | #144 |
| 3 | Pause-and-redirect apart from X-card | **Pause closed** (Pause the table, any seat, X-card separate and stacking). Redirect still partial: no private redirect note on a hold; prep mid-adventure lets the lead step out | #453, #533; `src/lib/dm/table-break.ts` |
| 4 | Whole-session assisted handoff | Partial. `MAX_COVER_TURNS = 20` unchanged | `src/lib/dm/delegation.ts` |
| 5 | Propose / dry-run / approve + undo | Partial, **deepened:** undo move, builder undo, world draft reviewed first, reimport restore. `dryRun` still not exposed to the console or agents | #493, #510, #462, #499 |
| 6 | Fail-closed knowledge tiers | Mostly closed. **Deepened:** text beside a roll withheld until the dice; storyteller secrets never reach the lead at an AI table. Whispers/outline in DM prompt not rechecked | #536, #507 |
| 7 | Read-only canon import (WorldForge) | Closed shape. **Deepened:** reimport records what a campaign kept over the source (DM-only notice, Use import's / Keep mine / Restore mine). Still no read-only canon flag | #499; `src/lib/worldforge/model.ts` `KeptValue` |
| 8 | Private DM-to-player text in person | Partial. **Deepened:** Insight results and pact actions whispered to one player | #507 |
| 9 | Same-Wi-Fi hub | Shipped in code (desktop), live test unverified. Discord sign-in now skips a stale saved Wi-Fi address | #484 |
| 10 | Audited privacy evidence | Partial, **stronger evidence base:** correction ledger and tester report kit give measured narrator quality; still no independent privacy audit | #522, #515 |
| 11 | Correction voting | Closed; **corrections now counted** | #144, #522 |
| 12 | Starter adventure + pregens | Closed; **plus** offered and AI-drafted pregens | #145, #508, #516 |
| 13 | Voice: DM acts only on a trigger phrase | Unverified / likely missing | - |
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
| Between-session self-serve | ScryRPG, MythWeaver, Archivist, Grimoire; ODM has agent level-up, shops, prep mid-adventure | Shops, trade, level-up, Ask outside live play |

## g. Watchlist

**Commercial** (checked 2026-10-26):

| Product | Note |
|---|---|
| Familiar (Foundry) | No release since v2.26.0 (Oct 5) (not rechecked) |
| TableForge | **New Oct entries:** multiclassing from Level Up; class features on the sheet with a Use Feature action; fewer needless checks. Prior: homebrew rulings persist, Mirelle referee, companions in fights |
| ScryRPG | Loot, shops, approve-before-write (not rechecked) |
| MythWeaver | Prep co-DM with approval (not rechecked) |
| Archivist | Recaps; hosted MCP with OAuth (not rechecked) |
| Grimoire (ttrpg.bot) | No release since 1.5.3g (Oct 13) |
| Skeinkeeper | Pre-MVP (not rechecked) |

**Open source** (GitHub API, 2026-10-26; push dates ET):

| Project | License | Stars | Push | Note |
|---|---|---|---|---|
| [DiceFrame](https://github.com/diceframe/diceframe) | AGPL-3.0 | 136 (+8) | Oct 26 | **v3.0.0 stable** (Oct 19), v3.0.2 (Oct 22): modular runtime, generic adventure packages, import preview/confirm/receipt, DF Agent scoped modes, CoC resources. Study only |
| [Covel](https://github.com/ackness/covel) | MIT | 61 | Oct 26 | Active (not re-read) |
| [Loreweaver](https://github.com/1A7432/loreweaver) | MIT | 67 | Oct 22 | Gap 1 reference |
| [NarrativeEngine-P](https://github.com/Sagesheep/NarrativeEngine-P) | MIT | 108 | Oct 22 | Solo AI-DM memory |
| [open-tabletop-gm](https://github.com/Bobby-Gray/open-tabletop-gm) | not detected | 61 | Oct 9 | 5e as a pluggable system module. Best gap 1 reference |
| [AnyWorld](https://github.com/iamarxs/AnyWorld) | MIT | 40 | Oct 12 | Multiplayer, AI-only DM |
| [srdcheck](https://github.com/chaoz23/srdcheck) | not detected | 3 | Oct 21 | Cited SRD verdicts |
| [CozyVTT](https://github.com/CheekyChinchilla/CozyVTT) | AGPL-3.0 | 23 | Oct 25 | **v1.5.4 "Mending"** (Oct 25): 200+ fixes; sheet and rolls from initiative tracker; token facing. Study only |

**Study-only (low stars / niche):** [navi-dnd](https://github.com/AlexandrNemashkalo/navi-dnd) (5 stars, C# 5e AI DM); [eldritchdm](https://github.com/shoemoney/eldritchdm) (Apache-2.0, three-brain Discord bot).

New-project scan (GitHub, created since Oct 12): only zero-star repos (e.g. `pmghartman/tavern`, `CannonPrince711/cannonvtt`); nothing credible enough to add. Quiet / unchanged: VelvetRP, CampaignRepo, ADnD, dmcp, lorekit, STMP.

## h. Weekly search queries (bump the date)

- `"dungeon master" ai created:>=2026-01-01 stars:>=10` (sort: stars)
- `topic:ai-dungeon-master created:>=2026-01-01` (sort: stars)
- `"game master" llm ttrpg created:>=2026-01-01 stars:>=5`
- `ttrpg mcp created:>=2026-01-01` (sort: stars)
- `llm tabletop multiplayer created:>=2026-01-01`
- `topic:ttrpg topic:self-hosted pushed:>=2026-10-26`
- `ai gm rpg multiplayer created:>=2026-10-26 stars:>=3`
- `repo:Lebbitheplow/open-dungeon-master is:pr is:open` and `is:issue is:open`; same for `open-dungeon-master-client`

## i. Recommendations

- **O1.** ~~Review #143~~ Merged. Remaining: keep whispers and outline out of the DM prompt where possible, and test redaction vs absence (gap 6).
- **O2.** Test the steering seat (merged, v0.25.0) against TC's "human-steered AI DM". Confirmed: the lead loses `secretStory`. Pause now exists (#453); AI check-ins still missing (gap 4).
- **O3.** ~~Propose a non-X-card pause~~ **Shipped as Pause the table (#453).** Remaining delta: let the person who resumes (DM, lead, steerer) attach a private redirect note the DM reads on Resume (gap 3).
- **O4.** Ask whether whole-session cover is still wanted now that the steering seat, pause and prep mid-adventure exist (gap 4).
- **O5.** Map where 5e is assumed before any rules-module code. **Delta:** #506 makes SRD 5.1 the only ruleset and `docs/ROADMAP.md` still lists ruleset validation first; a rules module would now start from one clean 5.1 seam. References: open-tabletop-gm, Loreweaver, DiceFrame v3 modular runtime, srdcheck (gap 1).
- **O6.** Expose `dryRun` beyond the cast guard and build previews on #142's offer bar; undo move, builder undo and world-draft review are patterns to reuse (gap 5).
- **O7.** ~~Add WorldForge as a read-only lore source~~ Done another way (#169, #393). **Delta:** #499's kept-value record is most of a canon-sync contract; an optional "read-only canon" flag could make the table side always "Keep the import's", and an import receipt (DiceFrame v3) would make sync auditable.
- **O8.** Same-Wi-Fi test with internet off on the desktop app's "Share on this Wi-Fi"; check voice and Android (gap 9).
- **O9.** Lead with tests: a privacy evidence matrix (event audiences, text-leak suite, browser harness, fields-not-English, roll-text withholding) fits `stabilization` (gap 10). The correction ledger (#522) now gives narrator-quality numbers to report beside it.
- **O10.** ~~Sync the fork~~ **Done:** fork `main` even with upstream at `817e76c`. Rebase TC `odm-companion` onto v0.30.2 if still used.
- **O11.** New grants default to `read` + `play` (confirmed). Suggest `read` only for player agents, or label `play` clearly.
- **O12.** Keep settled disputes (#144) as a table-rulings list the DM prompt reads (TableForge). Overruled rulings are now counted by #522, so the data is there.
- **O13.** Test that revoking an agent grant or share closes live streams and assistant-link relays (DiceFrame, Grimoire).
- **O14.** Stop / queue watchdog (hung-turn recovery) and Pause the table (break) now both exist. **Delta:** make sure Help and the tours name the difference, so tables don't press Stop for a break.
- **O15.** Addon catalogue hygiene: #420/#421/#458/#519 merged (session stage, viewport, threads permission). Confirm propose-then-server-decides and player-safe fog still hold with threads, and add a seat-rights check to the catalogue audit.
- **O16.** *(new)* Use the correction ledger (#522) per model and backend: publish narrator-quality rates for the recommended local setup (llama.cpp + gpt-oss-20b) in the fresh-install docs. Why it may matter: hosts choosing a model get evidence, not anecdotes.

## j. Verify next week

1. Pause the table: is a private redirect note on Resume planned? (O3)
2. "Share on this Wi-Fi" with internet off: play, voice, Android.
3. Revocation: open streams and assistant-link relay after a grant is revoked.
4. Read-only canon option after #499's kept-value record.
5. Prompt whispers and outline after #143 (recheck).
6. Desktop TTS regression #539 / PRs #540, client #88; #538 custom species traits; #542 tool parameter names.
7. DiceFrame v3.x; CozyVTT after 1.5.4; TableForge multiclassing vs ODM's.
8. ScryRPG, MythWeaver, Archivist, Skeinkeeper, Familiar (not rechecked this week).
9. Whether milestone `stabilization` is closed now that #37 and #275 are done.

## Sources

Upstream at `817e76c`; releases v0.28.3–v0.30.2; PRs #438, #453, #462, #475, #477, #479, #493, #494, #499, #506, #507, #510, #515, #522, #533, #535, #536; open issues #168, #538, #539, #541; open PRs #540, #542; client PR #88; milestone `stabilization`; client releases through v0.21.2; https://www.ttrpg.bot/changelog/; https://tableforge.gg/changelog; DiceFrame v3.0.0/v3.0.2; CozyVTT v1.5.4; GitHub API for section g.

## Changelog

- **2026-10-08** - Created; research moves from Tabletop Companion to ODM.
- **2026-10-08** - Rewritten for the contributor team: about half the length, "Why it may matter" column, new section d.
- **2026-10-12** - Weekly delta: v0.25.0-v0.26.3 (about 300 commits). Gaps 2, 11, 12 closed; gap 7 closed in a different shape (WorldForge built in, #169); gap 6 mostly closed; gap 9 shipped in the desktop client, untested. No open PRs; section d now has a Proposals group (#37 open, #57 closed by #183). New adopt ideas O12 (table rulings) and O13 (revocation ends streams). New watch: CozyVTT.
- **2026-10-19** - Weekly delta: v0.26.4–v0.28.2 (~571 commits; head `9da9d1b`; client v0.19.2). World at table, addons + first catalogue addon, Stop/watchdog, `@DM` OOC, Atlas/party Atlas, agent level-up, fields-not-English, worn-on. Gaps 1, 3, 5, 7, 8, 10 marked deepened. Open work refreshed (PRs #420/#421/#423/#425; issues #275/#424); Proposals now #37 and #288. O7/O10 deltas; **O14** (Stop ≠ pause) and **O15** (addon catalogue hygiene). Competitor/OSS: DiceFrame v3 beta, Grimoire 1.5.3g, TableForge Oct, CozyVTT 1.5.3; navi-dnd / eldritchdm study-only. Stars 47 / forks 22; Smoebo/main ~172 behind.
- **2026-10-26** - Weekly delta: v0.28.3–v0.30.2 (488 commits; head `817e76c`; client v0.21.2). **Gap 3 pause closed** (Pause the table, #453); gap 1 moved further away (SRD 5.1 only, #506); gaps 5, 6, 7, 8, 10, 11, 12 deepened (undo move/builder, roll-text withholding, reimport kept-value #499, correction ledger #522). #37, #288, #275 closed; Proposals empty. O3 and O10 retired as done; deltas on O2, O5, O7, O9, O12, O14, O15; **O16** (narrator-quality numbers per model). DiceFrame v3.0.0 stable, CozyVTT 1.5.4, TableForge multiclassing. Stars 52 / forks 22; fork even with upstream.
