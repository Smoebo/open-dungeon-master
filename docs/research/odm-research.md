# ODM research note

**Updated 2026-10-19** (America/Toronto). **Upstream:** https://github.com/Lebbitheplow/open-dungeon-master (MIT; maintainer lebbi / `Lebbitheplow`, lebbitheplow@proton.me). **Branch:** `research/notes` on `Smoebo/open-dungeon-master`, docs only.

Status words: **confirmed** = read at a cited path; **closed** = merged upstream; **unverified** = claimed, not checked; **unknown** = no evidence.

## a. Scope

- Research notes for ODM contributors. Started from Albert's (`Smoebo`) Tabletop Companion (TC, `Smoebo/tabletop-companion`) research after the 2026-10-05 decision to build on ODM (TC `docs/companion-design-decisions.md`).
- Research only. Not for merging upstream; nothing here is posted upstream. Claims cite a path, release, PR or URL; upstream paths are at `main` `9da9d1b` (v0.28.2, 2026-10-18 11:50 PM ET).
- Fork `main` is at `1b4d97d` (synced through ~Oct 17), now **~172 commits behind** upstream. `Smoebo` is pull-only upstream; their PRs land through forks.

## b. Current state (verified 2026-10-19)

**v0.28.2**, 2026-10-19 12:25 AM ET. Seven releases since last week: v0.26.4 (Oct 12 10:53 PM), v0.27.0 (Oct 14 1:40 AM), v0.27.1 (Oct 15 12:43 AM), v0.27.2 (Oct 16 2:25 AM), v0.28.0 (Oct 17 4:03 AM), v0.28.1 (Oct 18 1:01 AM), v0.28.2 ([releases](https://github.com/Lebbitheplow/open-dungeon-master/releases)). About 571 commits since `v0.26.3`. **47 stars, 22 forks.** Client (desktop + Android): **v0.19.2**, 2026-10-19 12:48 AM ET ([client](https://github.com/Lebbitheplow/open-dungeon-master-client)).

**New since 2026-10-12** (release notes v0.26.4–v0.28.2):

| Area | What shipped | Evidence |
|---|---|---|
| World at table | Campaign WorldForge tab for story authority (wiki, links, timeline, atlas, secrets); Reveal to the party; one canon policy across model paths; Atlas as Region backdrop; party's Atlas (DM review of what players see); place battle maps/encounters from pins | #393–#394, #392, #404/#407, #416, #409 (Smoebo); v0.28.1–v0.28.2 |
| Addons | Addon framework (install from GitHub at a pinned commit, MCP program, propose→server decides); first catalogue addon **Isometric Tabletop** (Godot pixel board, player-safe fog, Windows hosts); open PRs for session stage / viewport | #371, #405 (laurentsparks-art); PRs #420/#421 (Xargot) |
| Stop / watchdog | Every DM turn ends and says why: stage status, **Stop** button, queue watchdog, admin Server log; model-window fitting; no AI seat without a text model | #390 (issue #383), #400, #398; v0.28.1 |
| @DM OOC | Table talk naming `@DM` gets a brief out-of-character ruling at once, without moving the story; held moves stay held | #314; v0.27.1 |
| Atlas / party Atlas | Atlas over Region; party Atlas with per-pin/region hide and review-before-show | #404/#407/#416; v0.28.2 |
| Agent level-up | `odm_level_up_options` / `odm_level_up`; workshop subclasses cast by features; open PR for webhook `level_up_available` | #406, #418; PR #425 (Smoebo) |
| Fields-not-English | Tables read model writes by fields/tags/codes, never English word lists (Favored Enemy, potions, coins, etc. at non-English tables); Unicode name/search keys | #408, #375 (mcerina); v0.28.1–v0.28.2 |
| Worn-on | One of a kind worn at a time (cloak, helmet, boots…); workshop "Worn on" picker | #419 (issue #412); v0.28.2 |
| Catalogue addon | Isometric Tabletop in the catalogue; catalogue audit runs each addon on every platform it names | #405; v0.28.2 |
| Models / setup | No model named in code; pickers list what backends serve; guided 3-step campaign creator with personal defaults; usability pass across setup/lobby/table/builder | #298, #273; v0.26.4–v0.28.0 |
| Builder | Drafts with Resume; library Level up; quick wins A/B/C; bring a library hero to the lobby | #329/#343/#331, #395–#397 (Smoebo) |

Unchanged from prior weeks: one 5e engine (SRD 5.1 plus Open5e 5.2 backfill), single process (SQLite, event bus, queue, voice), Human/Assisted/Steered modes, voice off by default, deny-by-default event audiences, WorldForge inside the workshop.

## c. Planned work

- **ROADMAP "Next"** still lists ruleset validation (deferred), homebrew monsters in bundles, per-account dice sync, multiple DM personalities, split `src/app/solo/page.tsx`.
- **Milestone `stabilization`**: still open with #37; no due date.
- **Working style:** lebbi batches community PRs into nightly integration releases (#402, #422). Addon docs under `docs/addons/`. New plan/audit docs continue to land alongside carries.

## d. Open work by area (upstream, 2026-10-19 ~9:00 AM ET)

4 open PRs; 5 open issues (plus PRs counted in `open_issues`). ~30 issues closed since 2026-10-12. Client not re-scanned for open issues this pass.

| Area | Issues | PRs | Why it may matter |
|---|---|---|---|
| Community | #168 Discord server is up (Smoebo) | - | Coordination channel for proposals |
| Install / 1.0 | #275 Fresh-install walkthrough on the default local model (Smoebo) | - | Gate before calling the product 1.0 |
| Combat / gear | #424 Hands and gear in a fight (Smoebo) | #423 companion shield / one-handed weapon (Smoebo) | Equipped-weapon fidelity after worn-on |
| Agents | - | #425 webhook wakes agent for earned level-up (Smoebo) | Between-session agent level-up path |
| Addons | - | #420 native session stage; #421 independent viewport + camera (Xargot) | Board views on the new addon framework |

**Proposals** (ideas under discussion, not bugs; better suited to the Discord):

| # | Proposal | Author | Status |
|---|---|---|---|
| #37 | Consolidation phase focused on core-flow polish (`core-flow`, `stabilization`) | mcerina | Open, 10 comments, last activity 2026-10-09 8:35 PM ET |
| #288 | Optional TaleSpire-style 3D tabletop combat view | Xargot | Open, 2 comments, last activity 2026-10-17 8:13 AM ET |

## e. Gaps vs Tabletop Companion ideas

Sources: TC `docs/companion-design-decisions.md` and TC research note. Status at v0.28.2; changes since 2026-10-12 in bold.

| # | TC idea | ODM status | Evidence |
|---|---|---|---|
| 1 | Swappable rules modules (SRD 5.2, 3.5, GURPS, Daggerheart) | Confirmed missing. **Deepened:** still one 5e engine; fields-not-English, worn-on, workshop third-casters tighten 5e fidelity further | #408, #419, #418; `docs/rules-coverage.md` |
| 2 | Non-playing human co-DM on AI tables | **Closed** (steering seat, v0.25.0) | #144; `viewer.ts` |
| 3 | Pause-and-redirect apart from X-card | Pause confirmed missing. **Deepened nuance:** Stop + queue watchdog end hung DM turns with a reason — recovery, not a steerer "hold". Redirect still partial (Direct, reroll, rewind, steering, `@DM` OOC) | #390; `src/lib/dm/queue.ts` |
| 4 | Whole-session assisted handoff | Partial. `MAX_COVER_TURNS = 20` unchanged; steering seat may be the answer for AI tables | `src/lib/dm/delegation.ts` |
| 5 | Propose / dry-run / approve + undo | Partial. Vitals approvals closed. **Deepened:** Atlas/party Atlas and secret reveal use review-before-show. `dryRun` still only inside the cast guard | #416, #394; `mutations.ts` |
| 6 | Fail-closed knowledge tiers | Mostly closed. Deny-by-default event audiences. Remaining: DM prompt still carries recent whispers and outline (not rechecked this week) | #143 |
| 7 | Read-only canon import (WorldForge) | **Closed shape, deepened:** WorldForge at the play table (DM World tab); party Atlas; Reveal to the party. Still writable — no optional read-only canon flag | #393–#394, #416; `src/lib/worldforge/` |
| 8 | Private DM-to-player text in person | Partial. Whispers, phone play. **Deepened:** `@DM` OOC rulings without moving the story | #314; v0.27.1 |
| 9 | Same-Wi-Fi hub | Shipped in code (desktop), live test still unverified. Android LAN unknown | client `local-server.ts` |
| 10 | Audited privacy evidence | Partial, stronger. **Deepened:** fields-not-English + Unicode compare keys reduce language-leak class of bugs; still no independent audit | #408, #375 |
| 11 | Correction voting | **Closed** (disputed rulings by steerer or vote) | #144 |
| 12 | Starter adventure + pregens | **Closed** (quick start) | #145 |
| 13 | Voice: DM acts only on a trigger phrase | Unverified / likely missing | - |
| 14 | Consent-scoped private-sheet corrections | Unverified | - |

## f. Worth adopting from competitors

| Idea | Source | Where it would land in ODM |
|---|---|---|
| Dry-run, then approval cards | Familiar v2.26.0 (`/undo`, MCP `undo-last-workflow`) | Expose the cast guard's `dryRun` on `odm_dm_invoke` and the console; reuse #142's offer bar |
| Hidden = 404; one projection for portal, agent, export | Grimoire 1.5.3f/g | #143 covers events; party Atlas review path is a start; add "export as the player sees it" |
| Read-only player MCP by default | Grimoire 1.5.3e | Settings defaults new grants to `read` + `play` |
| Revocation ends live streams | DiceFrame (SSE end on revoke); Grimoire 1.5.3e | Check that revoking a grant or share closes open event streams and assistant-link relays |
| A table's agreed homebrew rulings, kept | TableForge (Oct): rulings hold for the campaign | Store #144's settled disputes as a "table rulings" list the DM prompt reads |
| Separate referee and narrator AIs | TableForge "Mirelle" (now every table) | Opt-in referee role; srdcheck for cited verdicts |
| Modular runtime / adventure packages | **New:** DiceFrame v3.0.0-beta (Oct 17–18) | Study for rules-module seams (gap 1) and safer AI/authority split |
| Between-session self-serve | ScryRPG, MythWeaver, Archivist, Grimoire; ODM now has agent level-up tools | Shops, trade, level-up, Ask outside live play |

## g. Watchlist

**Commercial** (checked 2026-10-19):

| Product | Note |
|---|---|
| Familiar (Foundry) | No release since v2.26.0 (Oct 5): undo, Cast/Pass reaction cards (not rechecked) |
| TableForge | **Oct:** companions in fight; Ask the DM about TableForge (OOC); homebrew rulings that persist; equipment slots; Mirelle on every table. Up to 6 players; host pays |
| ScryRPG | Loot, shops, approve-before-write (not rechecked) |
| MythWeaver | Prep co-DM with approval (not rechecked) |
| Archivist | Recaps; hosted MCP with OAuth (not rechecked) |
| Grimoire (ttrpg.bot) | **1.5.3g** (Oct 13): long campaigns show everything, export for every sign-in, live editor holds overwrite races. Prior 1.5.3e/f still the privacy/export reference |
| Skeinkeeper | Pre-MVP (not rechecked) |

**Open source** (GitHub API, 2026-10-19; push dates ET):

| Project | License | Stars | Push | Note |
|---|---|---|---|---|
| [DiceFrame](https://github.com/diceframe/diceframe) | AGPL-3.0 | 128 (+8) | Oct 19 | **v3.0.0-beta.1–.3** (Oct 17–18): modular runtime, adventure packages, DF Agent, story plans, multiplayer security. Study only |
| [Covel](https://github.com/ackness/covel) | MIT | ~56 | (not rechecked) | Desktop installers |
| [Loreweaver](https://github.com/1A7432/loreweaver) | MIT | ~66 | (not rechecked) | Gap 1 reference |
| [NarrativeEngine-P](https://github.com/Sagesheep/NarrativeEngine-P) | MIT | ~103 | (not rechecked) | Solo AI-DM memory |
| [open-tabletop-gm](https://github.com/Bobby-Gray/open-tabletop-gm) | not detected | ~59 | (not rechecked) | 5e as a pluggable system module. Best gap 1 reference |
| [AnyWorld](https://github.com/iamarxs/AnyWorld) | MIT | ~37 | (not rechecked) | Multiplayer, AI-only DM |
| [srdcheck](https://github.com/chaoz23/srdcheck) | not detected | 3 | (quiet) | v0.9.0 |
| [CozyVTT](https://github.com/CheekyChinchilla/CozyVTT) | AGPL-3.0 | 20 | Oct 18 | **v1.5.3** (Oct 18): dependency/security Long Rest, no new play features. Study only |

**Study-only (low stars / niche):**

| Project | License | Stars | Note |
|---|---|---|---|
| [navi-dnd](https://github.com/AlexandrNemashkalo/navi-dnd) | other | 3 | 5e AI DM over Claude/Codex (C#). Study only |
| [eldritchdm](https://github.com/shoemoney/eldritchdm) | Apache-2.0 | 0 | Local-first Discord bot; three-brain (narration + dm20 MCP rules + orchestrator); LLM never computes math. Active push Oct 19. Study only |

Quiet / unchanged: VelvetRP, CampaignRepo, ADnD, dmcp, lorekit, STMP.

## h. Weekly search queries (bump the date)

- `"dungeon master" ai created:>=2026-01-01 stars:>=10` (sort: stars)
- `topic:ai-dungeon-master created:>=2026-01-01` (sort: stars)
- `"game master" llm ttrpg created:>=2026-01-01 stars:>=5`
- `ttrpg mcp created:>=2026-01-01` (sort: stars)
- `llm tabletop multiplayer created:>=2026-01-01`
- `topic:ttrpg topic:self-hosted pushed:>=2026-10-19`
- `ai gm rpg multiplayer created:>=2026-10-19 stars:>=3`
- `repo:Lebbitheplow/open-dungeon-master is:pr is:open` and `is:issue is:open`; same for `open-dungeon-master-client`

## i. Recommendations

- **O1.** ~~Review #143~~ Merged. Remaining: keep whispers and outline out of the DM prompt where possible, and test redaction vs absence (gap 6).
- **O2.** Test the steering seat (merged, v0.25.0) against TC's "human-steered AI DM". Confirmed: the lead loses `secretStory`. Still missing: steerer pause, AI check-ins (gaps 3-4).
- **O3.** Propose a non-X-card pause: `pauseDmQueue(campaignId, reason)` already takes a reason; give the steerer and human DM a "hold" with a private redirect note (gap 3). Do not confuse with Stop/watchdog (O14).
- **O4.** Ask whether whole-session cover is still wanted now that the steering seat exists (gap 4).
- **O5.** Map where 5e is assumed (`src/lib/srd/`, `src/lib/dm/`, tool schemas, sheet shape) before rules-module code. Fields-not-English and worn-on are more seams. References: open-tabletop-gm, Loreweaver, DiceFrame v3 modular runtime, srdcheck (gap 1).
- **O6.** Expose `dryRun` beyond the cast guard and build previews on #142's offer bar; party Atlas review-before-show is a pattern to reuse (gap 5).
- **O7.** ~~Add WorldForge as a read-only lore source~~ Done another way: WorldForge is built in (#169) and now reaches the play table (#393). **Delta:** optional "read-only canon" flag on an imported world so table play can't overwrite it; party Atlas already reviews what players see.
- **O8.** Same-Wi-Fi test with internet off on the desktop app's "Share on this Wi-Fi"; check voice and Android (gap 9).
- **O9.** Lead with tests: a privacy evidence matrix (event audiences, text-leak suite, browser harness, fields-not-English) fits `stabilization` (gap 10).
- **O10.** Sync the fork: **`main` is ~172 behind** (was 326 on Oct 12; partial sync landed ~Oct 17). Rebase TC `odm-companion` onto v0.28.2.
- **O11.** New grants default to `read` + `play` (confirmed). Suggest `read` only for player agents, or label `play` clearly.
- **O12.** Keep settled disputes (#144) as a table-rulings list the DM prompt reads (TableForge).
- **O13.** Test that revoking an agent grant or share closes live streams and assistant-link relays (DiceFrame, Grimoire).
- **O14.** *(new)* Treat Stop / queue watchdog (v0.28.1) as hung-turn recovery, not gap 3's pause. Document the difference for steerers; still need a "hold" with private redirect (extends O3). Why it may matter: tables will press Stop expecting a session pause.
- **O15.** *(new)* Addon catalogue hygiene: confirm propose→server-decides holds for Isometric Tabletop and for open #420/#421; add a player-safe fog / seat-rights check to the catalogue audit. Why it may matter: first catalogue addon + session-stage PRs are the new attack surface beside assistant links.

## j. Verify next week

1. Steering seat: can the steerer pause? Are AI check-ins planned? (Stop ≠ pause.)
2. "Share on this Wi-Fi" with internet off: play, voice, Android.
3. Revocation: open streams and assistant-link relay after a grant is revoked.
4. WorldForge at table: editable by the table; is a read-only option planned?
5. Prompt whispers and outline after #143 (recheck).
6. #37 consolidation outcome; #288 3D proposal discussion; whether `stabilization` closes.
7. DiceFrame v3 beta → stable; CozyVTT after 1.5.3; addon PRs #420/#421.
8. ScryRPG, MythWeaver, Archivist, Skeinkeeper, Familiar (not rechecked this week).
9. Agent level-up webhook (#425) and hands/gear (#424 / #423).

## Sources

Upstream at `9da9d1b`; releases v0.26.4–v0.28.2; open issues #37, #168, #275, #288, #424; open PRs #420, #421, #423, #425; milestone `stabilization`; client releases through v0.19.2; https://www.ttrpg.bot/changelog/; https://tableforge.gg/changelog; DiceFrame releases v3.0.0-beta.1–.3; CozyVTT v1.5.3; GitHub API for section g.

## Changelog

- **2026-10-08** - Created; research moves from Tabletop Companion to ODM.
- **2026-10-08** - Rewritten for the contributor team: about half the length, "Why it may matter" column, new section d.
- **2026-10-12** - Weekly delta: v0.25.0-v0.26.3 (about 300 commits). Gaps 2, 11, 12 closed; gap 7 closed in a different shape (WorldForge built in, #169); gap 6 mostly closed; gap 9 shipped in the desktop client, untested. No open PRs; section d now has a Proposals group (#37 open, #57 closed by #183). New adopt ideas O12 (table rulings) and O13 (revocation ends streams). New watch: CozyVTT.
- **2026-10-19** - Weekly delta: v0.26.4–v0.28.2 (~571 commits; head `9da9d1b`; client v0.19.2). World at table, addons + first catalogue addon, Stop/watchdog, `@DM` OOC, Atlas/party Atlas, agent level-up, fields-not-English, worn-on. Gaps 1, 3, 5, 7, 8, 10 marked deepened. Open work refreshed (PRs #420/#421/#423/#425; issues #275/#424); Proposals now #37 and #288. O7/O10 deltas; **O14** (Stop ≠ pause) and **O15** (addon catalogue hygiene). Competitor/OSS: DiceFrame v3 beta, Grimoire 1.5.3g, TableForge Oct, CozyVTT 1.5.3; navi-dnd / eldritchdm study-only. Stars 47 / forks 22; Smoebo/main ~172 behind.
