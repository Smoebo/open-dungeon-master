# ODM research note

**Updated 2026-10-12** (America/Toronto). **Upstream:** https://github.com/Lebbitheplow/open-dungeon-master (MIT; maintainer lebbi / `Lebbitheplow`, lebbitheplow@proton.me). **Branch:** `research/notes` on `Smoebo/open-dungeon-master`, docs only.

Status words: **confirmed** = read at a cited path; **closed** = merged upstream; **unverified** = claimed, not checked; **unknown** = no evidence.

## a. Scope

- Research notes for ODM contributors. Started from Albert's (`Smoebo`) Tabletop Companion (TC, `Smoebo/tabletop-companion`) research after the 2026-10-05 decision to build on ODM (TC `docs/companion-design-decisions.md`).
- Research only. Not for merging upstream; nothing here is posted upstream. Claims cite a path, release, PR or URL; upstream paths are at `main` `71f72cc` (v0.26.3 + art downsizing, 2026-10-12 3:52 AM ET).
- Fork `main` is still `f9b5ee7` (v0.24.7), now **326 commits behind** upstream. `Smoebo` is pull-only upstream; their PRs land through forks.

## b. Current state (verified 2026-10-12)

**v0.26.3**, 2026-10-12 1:42 AM ET. Five releases since last week: v0.25.0 (Oct 8 11:48 PM), v0.26.0 (Oct 9 11:51 PM), v0.26.1 (Oct 10 11:42 PM), v0.26.2 (Oct 11 2:08 AM), v0.26.3 ([releases](https://github.com/Lebbitheplow/open-dungeon-master/releases)). About 300 commits since `198a871`: Kaleb Lutterman 200, Matteo Cerina 54, Smoebo 22, Xargot 18, others ≤2. 37 stars, 18 forks. Client (desktop + Android): v0.17.4, 2026-10-12 4:43 AM ET ([client](https://github.com/Lebbitheplow/open-dungeon-master-client)).

**New since 2026-10-08** (release notes v0.25.0-v0.26.3):

| Area | What shipped | PRs |
|---|---|---|
| DM modes | `dmMode: "steered"`: AI narrates, a person holds a character-less DM seat (arc, console, Direct, secret rolls); the lead loses `secretStory` (`src/lib/dm/viewer.ts` `capsForRole`). Disputed rulings settled by steerer or vote | #144 |
| Approvals | Approve-first vitals (`vitalsApprovals`); settled item/coin offers now reach the AI DM as the player's answer | #142, #247 |
| Privacy | Every event type declares its audience; undeclared reaches nobody (`src/lib/event-audience.ts`). 2026-10-11 audit (stream lifetimes, request limits, pictures for their table only); text-leak suite; browser regression harness (`npm run test:browser`) | #143, #203, #262 |
| Rules | 2014 rules audit closed: 29 findings + 21 related gaps fixed at ten root causes, each with a forced-dice suite; AI DM damage/healing needs server dice; action-economy fidelity; concentration prompts | #177, #233/#241, #235, #261 |
| Workshop | Rules fidelity ("Start from" copies run like the original; hazards kind; checker for every kind). **WorldForge built in** (see gap 7). Market shops travel in bundles | #169, #172 |
| Agents | Assistant links (ChatGPT, Claude, Grok, Muse) on device worlds; signed player decision webhooks; bounded JSON results; `odm_get_whispers`, `odm_whisper_dm`; `odm_write_lore`, `odm_get_facts` | #161, #165/#167/#173 (Smoebo), #166, #195, #260 (halr9000) |
| Table | Table language (15 languages; no English word lists read story text; closes #57); several characters per player; travel formation; coordinated party actions; Sound panel + open-licensed library (76 MB Opus download) | #183 (mcerina), #191 (laurentsparks-art), #241, #261, #182, #202 |
| Setup / hosting | `npm run setup` + guided `/setup` wizard; quick start with four pregens; campaign-creation and paid-AI policy, usage ledger | #160, #145, #141 |
| Art | Painted race/class portraits, majority-voted thumbnails, creature and genre tokens readable at 40 px | #174, #201, #236, #242-#248 (Smoebo) |
| Client | **Share on this Wi-Fi** (desktop): server binds `0.0.0.0` only when the host turns it on, else `127.0.0.1`; "play with no internet at all". Move a device world between devices | client `src/main/local-server.ts` (2026-10-08 12:44 PM ET); client README l.74 |

Unchanged from last week: one 5e engine (SRD 5.1 plus Open5e 5.2 backfill), single process (SQLite, event bus, queue, voice), Human/Assisted modes, voice off by default.

## c. Planned work

- **ROADMAP "Next"** unchanged: ruleset validation (deferred), homebrew monsters in bundles, per-account dice sync, multiple DM personalities, split `src/app/solo/page.tsx`. The empty-ambience limit is gone (library ships); one cue still has no recording.
- **Milestone `stabilization`**: 1 open (#37) / 10 closed, no due date.
- **Working style:** lebbi batches community PRs into "carry" PRs and releases nightly (#179, #200, #253, #262). New plan docs: `docs/player-webhooks.md`, `docs/multi-character-players.md`, `docs/workshop-portability.md`, `docs/dnd-rules-audit-2026-10-09*.md`, `docs/workshop-rulebook-audit-pr169.md`.

## d. Open work by area (upstream, 2026-10-12 9:30 AM ET)

No open PRs on either repo. 52 issues closed since 2026-10-08 (GeekSheikh 38, Smoebo 9, mcerina 2, others 1 each); the client has no open issues.

| Area | Issues | PRs |
|---|---|---|
| Community | #168 Discord server is up (Smoebo) | - |

**Proposals** (ideas under discussion, not bugs; better suited to the Discord):

| # | Proposal | Author | Status |
|---|---|---|---|
| #37 | Consolidation phase focused on core-flow polish (`core-flow`, `stabilization`) | mcerina | Open, 10 comments, last activity 2026-10-09 8:35 PM ET |
| #57 | Language-independent text reading | mcerina | **Closed** by #183 (Table language, v0.26.1) |

## e. Gaps vs Tabletop Companion ideas

Sources: TC `docs/companion-design-decisions.md` and TC research note. Status at v0.26.3; changes since 2026-10-08 in bold.

| # | TC idea | ODM status | Evidence |
|---|---|---|---|
| 1 | Swappable rules modules (SRD 5.2, 3.5, GURPS, Daggerheart) | Confirmed missing. Still one 5e engine; this week deepened 2014 fidelity | #177; `docs/rules-coverage.md` |
| 2 | Non-playing human co-DM on AI tables | **Closed** (steering seat, v0.25.0) | #144; `viewer.ts` |
| 3 | Pause-and-redirect apart from X-card | Pause confirmed missing (only `safety.ts` calls `pauseDmQueue`). Redirect partial (Direct, reroll, rewind, steering seat) | `src/lib/dm/queue.ts` |
| 4 | Whole-session assisted handoff | Partial. `MAX_COVER_TURNS = 20` unchanged; **steering seat may be the answer for AI tables** | `src/lib/dm/delegation.ts` |
| 5 | Propose / dry-run / approve + undo | Partial. **Vitals approvals closed**; offers reach the DM. `dryRun` exists only inside the cast guard (`mutations.ts` l.412, "not in the tool schema"); no user- or agent-facing preview | #142, #247 |
| 6 | Fail-closed knowledge tiers | **Mostly closed.** Deny-by-default event audiences merged. Remaining: DM prompt still carries recent whispers (`src/lib/dm/prompt.ts` l.228-232) and outline | #143 |
| 7 | Read-only canon import (WorldForge) | **Closed, different shape.** WorldForge is ported into the workshop (with Smoebo's permission; continues inside ODM). Exports import whole as a workshop or merge; re-import updates; workshop saves back out as WorldForge; new `world` import kind; AI DM gets NPC hidden truths and unlearned secrets (DM-only, capped). Writable, not read-only | #169; `src/lib/worldforge/` |
| 8 | Private DM-to-player text in person | Partial. Whispers, phone play; agents can now read whispers. Narrate-aloud flow unverified | #195 |
| 9 | Same-Wi-Fi hub | **Shipped in code (desktop), live test unverified.** Opt-in LAN bind; no-internet play claimed. Android LAN unknown | client `local-server.ts` |
| 10 | Audited privacy evidence | Partial, **stronger**: 2026-10-11 audit, text-leak suite, browser harness. Still no independent audit | #203, #262 |
| 11 | Correction voting | **Closed** (disputed rulings by steerer or vote) | #144 |
| 12 | Starter adventure + pregens | **Closed** (quick start) | #145 |
| 13 | Voice: DM acts only on a trigger phrase | Unverified / likely missing | - |
| 14 | Consent-scoped private-sheet corrections | Unverified | - |

## f. Worth adopting from competitors

| Idea | Source | Where it would land in ODM |
|---|---|---|
| Dry-run, then approval cards | Familiar v2.26.0 (`/undo`, MCP `undo-last-workflow`) | Expose the cast guard's `dryRun` on `odm_dm_invoke` and the console, returning the would-be audit row; reuse #142's offer bar |
| Hidden = 404; one projection for portal, agent, export | Grimoire 1.5.3f (Oct 6) | #143 covers events; add an "export as the player sees it" test |
| Read-only player MCP by default | Grimoire 1.5.3e | Settings defaults new grants to `read` + `play` (`ConnectedAgentsSection.tsx` l.54) |
| Revocation ends live streams | **New:** DiceFrame (Oct: SSE streams end when share, bot or owner credentials are revoked); Grimoire 1.5.3e (password reset disconnects AI apps) | Check that revoking a grant or a share closes open event streams and assistant-link relays |
| A table's agreed homebrew rulings, kept | **New:** TableForge changelog (Oct 2026): rulings agreed with the DM hold for the campaign and show on the campaign page or sheet | Store #144's settled disputes as a "table rulings" list the DM prompt reads |
| Separate referee and narrator AIs | TableForge "Mirelle" (limited test, Sep) | Opt-in referee role; srdcheck for cited verdicts |
| Between-session self-serve | ScryRPG, MythWeaver, Archivist, Grimoire | Shops, trade, level-up, Ask outside live play |

## g. Watchlist

**Commercial** (checked 2026-10-12):

| Product | Note |
|---|---|
| Familiar (Foundry) | No release since v2.26.0 (Oct 5): undo, Cast/Pass reaction cards, any OpenAI-compatible endpoint |
| TableForge | **Oct:** table homebrew rulings that persist. Mirelle referee in limited test. Up to 6 players; host pays |
| ScryRPG | Loot, shops, approve-before-write; Foundry module closed beta (not rechecked) |
| MythWeaver | Prep co-DM with approval (not rechecked) |
| Archivist | Recaps; hosted MCP with OAuth (not rechecked) |
| Grimoire (ttrpg.bot) | 1.5.3e/f both dated Oct 6: real sign-out, read-only connections enforced, Status Hidden kept from players, export = player view |
| Skeinkeeper | Pre-MVP (not rechecked) |

**Open source** (GitHub API, 2026-10-12; push dates ET):

| Project | License | Stars | Push | Note |
|---|---|---|---|---|
| [DiceFrame](https://github.com/diceframe/diceframe) | AGPL-3.0 | 120 (+13) | Oct 12 | 100+ commits this week: credential revocation ends SSE streams, content sync, engine refactor. No release since v2.6.1 (Sep 18). Study only |
| [Covel](https://github.com/ackness/covel) | MIT | 56 | Oct 12 | v0.0.50, v0.0.51 (Oct 10-12): desktop installers, CodeQL fixes; no new play features |
| [Loreweaver](https://github.com/1A7432/loreweaver) | MIT | 66 | Oct 11 | 2.3.dev360 build; quiet otherwise. Gap 1 reference |
| [NarrativeEngine-P](https://github.com/Sagesheep/NarrativeEngine-P) | MIT | 103 | Oct 11 | Solo AI-DM memory |
| [open-tabletop-gm](https://github.com/Bobby-Gray/open-tabletop-gm) | not detected | 59 | Oct 9 | 5e as a pluggable system module. Best gap 1 reference |
| [AnyWorld](https://github.com/iamarxs/AnyWorld) | MIT | 37 | Oct 12 | Multiplayer, AI-only DM, no rules |
| [srdcheck](https://github.com/chaoz23/srdcheck) | not detected | 3 | Aug 25 | v0.9.0 (Aug 3); no commits this week |
| [VelvetRP](https://github.com/mojomast/velvetrp) | none | 2 | Oct 7 | Quiet |
| [CampaignRepo](https://github.com/avorial/CampaignRepo) | MIT | 8 | Sep 23 | Quiet. Gap 7 reference (now less needed) |
| [ADnD](https://github.com/jncchds/adnd), [dmcp](https://github.com/shawnrushefsky/dmcp), [lorekit](https://github.com/matluz1/lorekit), [STMP](https://github.com/RossAscends/STMP) | MIT / MIT / Apache-2.0 / AGPL-3.0 | 0-123 | quiet | No change |

**New find:**

| Project | License | Stars | Push | Note |
|---|---|---|---|---|
| [CozyVTT](https://github.com/CheekyChinchilla/CozyVTT) | AGPL-3.0 | 20 | Oct 12 | Self-hosted narrative VTT (maps, fog, lighting, sheets); pairs with `cozyvtt-mcp` for an agent DM. Study only |

Not watched (0-4 stars, created 2026): navi-dnd (5e AI DM over Claude/Codex, Oct 8), battlemap-mcp (AI help building battle maps from owned assets), mythx-mcp (engine + MCP, four worlds), questbound (playtest), hippocampus (shared agent memory as a campaign wiki).

## h. Weekly search queries (bump the date)

- `"dungeon master" ai created:>=2026-01-01 stars:>=10` (sort: stars)
- `topic:ai-dungeon-master created:>=2026-01-01` (sort: stars)
- `"game master" llm ttrpg created:>=2026-01-01 stars:>=5`
- `ttrpg mcp created:>=2026-01-01` (sort: stars)
- `llm tabletop multiplayer created:>=2026-01-01`
- `topic:ttrpg topic:self-hosted pushed:>=2026-10-12`
- `ai gm rpg multiplayer created:>=2026-10-12 stars:>=3`
- `repo:Lebbitheplow/open-dungeon-master is:pr is:open` and `is:issue is:open`; same for `open-dungeon-master-client`

## i. Recommendations

- **O1.** ~~Review #143~~ Merged. Remaining: keep whispers and outline out of the DM prompt where possible, and test redaction vs absence (gap 6).
- **O2.** Test the steering seat (merged, v0.25.0) against TC's "human-steered AI DM". Confirmed: the lead loses `secretStory`. Still missing: steerer pause, AI check-ins (gaps 3-4).
- **O3.** Propose a non-X-card pause: `pauseDmQueue(campaignId, reason)` already takes a reason; give the steerer and human DM a "hold" with a private redirect note (gap 3).
- **O4.** Ask whether whole-session cover is still wanted now that the steering seat exists (gap 4).
- **O5.** Map where 5e is assumed (`src/lib/srd/`, `src/lib/dm/`, tool schemas, sheet shape) before rules-module code. The 2014 audit's ten root-cause helpers (save builder, condition instances) are natural seams. References: open-tabletop-gm, Loreweaver, srdcheck (gap 1).
- **O6.** Expose `dryRun` beyond the cast guard and build previews on #142's offer bar (gap 5).
- **O7.** ~~Add WorldForge as a read-only lore source~~ Done another way: WorldForge is built in (#169). Follow-up: an optional "read-only canon" flag on an imported world so table play can't overwrite it.
- **O8.** Same-Wi-Fi test with internet off on the desktop app's "Share on this Wi-Fi"; check voice and Android (gap 9).
- **O9.** Lead with tests: a privacy evidence matrix (event audiences, text-leak suite, browser harness) fits `stabilization` (gap 10).
- **O10.** Sync the fork: `main` is 326 behind. Rebase TC `odm-companion` onto v0.26.3.
- **O11.** New grants default to `read` + `play` (confirmed). Suggest `read` only for player agents, or label `play` clearly.
- **O12.** *(new)* Keep settled disputes (#144) as a table-rulings list the DM prompt reads (TableForge).
- **O13.** *(new)* Test that revoking an agent grant or share closes live streams and assistant-link relays (DiceFrame, Grimoire).

## j. Verify next week

1. Steering seat: can the steerer pause? Are AI check-ins planned?
2. "Share on this Wi-Fi" with internet off: play, voice, Android.
3. Revocation: open streams and assistant-link relay after a grant is revoked.
4. WorldForge in play: is an imported world editable by the table, and is there a read-only option?
5. Prompt whispers and outline after #143.
6. #37 consolidation outcome; whether `stabilization` closes.
7. DiceFrame release; Covel features; srdcheck activity.
8. ScryRPG, MythWeaver, Archivist, Skeinkeeper (not rechecked this week).

## Sources

Upstream at `71f72cc`; releases v0.25.0-v0.26.3; PRs #134-#262 (merged list via GitHub API); issues #37, #57, #168; milestone `stabilization`; client repo `src/main/local-server.ts`, README, releases v0.17.0-v0.17.4; https://www.ttrpg.bot/changelog/; https://tableforge.gg/changelog; https://github.com/Ryanjansen92/familiar-releases/releases; GitHub API for section g.

## Changelog

- **2026-10-08** - Created; research moves from Tabletop Companion to ODM.
- **2026-10-08** - Rewritten for the contributor team: about half the length, "Why it may matter" column, new section d.
- **2026-10-12** - Weekly delta: v0.25.0-v0.26.3 (about 300 commits). Gaps 2, 11, 12 closed; gap 7 closed in a different shape (WorldForge built in, #169); gap 6 mostly closed; gap 9 shipped in the desktop client, untested. No open PRs; section d now has a Proposals group (#37 open, #57 closed by #183). New adopt ideas O12 (table rulings) and O13 (revocation ends streams). New watch: CozyVTT.
