# ODM research note

**Updated 2026-10-08** (America/Toronto). **Upstream:** https://github.com/Lebbitheplow/open-dungeon-master (MIT; maintainer lebbi / `Lebbitheplow`, lebbitheplow@proton.me). **Branch:** `research/notes` on `Smoebo/open-dungeon-master`, docs only.

Status words: **confirmed** = read at a cited path; **open PR** = proposed, not merged; **unverified** = claimed, not checked; **unknown** = no evidence.

## a. Scope

- Research notes for ODM contributors. Started from Albert's (`Smoebo`) Tabletop Companion (TC, `Smoebo/tabletop-companion`) research after the 2026-10-05 decision to build on ODM (TC `docs/companion-design-decisions.md`; replaces TC `docs/research/grok-weekly-tabletop-companion.md`, branch `codex/first-playable-core`).
- Research only. Not for merging upstream; nothing here is posted upstream. Claims cite a path, release or URL; upstream paths are at `main` `198a871` (v0.24.9).
- Fork `main` is `f9b5ee7` (v0.24.7), 26 commits behind (2026-10-08); fork created 2026-10-06 2:26 PM ET. `Smoebo` is pull-only upstream (API `admin/maintain/push/triage = false`; collaborators endpoint 403).

## b. Current state (verified 2026-10-08)

**v0.24.9**, 2026-10-07 8:29 PM ET ("Local models get their window back, feats grant what they say, GPT-6 and Codex run a table"); six releases v0.24.4 (Oct 4) to v0.24.9 (Oct 7) ([releases](https://github.com/Lebbitheplow/open-dungeon-master/releases)). 33 stars, 13 forks, TypeScript/Next.js, created 2026-07-17. Commits: Lebbitheplow 375, newideas99 45 (original Open Dungeon base), mcerina-exm 23, tw48083 10, others <10. MIT, copyright Jacob Ferrari and Kaleb Lutterman. Client (desktop + Android, app-hosted): https://github.com/Lebbitheplow/open-dungeon-master-client.

| Capability | What ships | Evidence |
|---|---|---|
| DM modes, co-DM | `dmMode` `ai`/`human`/`assisted`. Human DM: console, 64 engine adjudications. Assisted: AI takes monster turns, read-alouds or a counted "cover". Co-DM seat (`/dm/seat`) only at human-DM tables | `src/lib/dm/viewer.ts` (`isDmSeat`); `docs/human-dm-plan.md` (8i) |
| Lead + Director | AI tables: lead sees the secret arc, rerolls/edits narration, rewinds chapters, arms a private one-turn "Direct" (players see it is armed, not what) | README "Narrative"; `viewer.ts` `capsForRole` |
| Workshop | `kind = 'workshop'` campaign: maps, encounters, cast, bestiary (derived CR), storyboard, lore, world-pack builder, bundles | `docs/ROADMAP.md` phases 1-9; `docs/workshop-plan.md` |
| Setups | **Hosted** (npm/Docker; local model, API key or CLI agent); **no-server** (app embeds server, room code, human DM, no AI by default); **own key** (OpenAI key or desktop CLI agent) | opendungeonmaster.com `/guide/start/choose-your-setup/` (search snippets; site blocks fetch); client README |
| AI backends | llama.cpp/Ollama/LM Studio/vLLM, OpenAI-compatible APIs, or Claude Code/Codex/opencode/Grok Build limited to the turn's DM tools over the server MCP | `docs/agent-harness.md`; `docs/harness-mcp-plan.md` |
| Connected agents | Hashed revocable bearer token. Scopes `read`, `play`, `characters`, `campaigns`, `dm` (+ planned opt-in `admin`); `dm` only for a human/assisted DM. No OAuth, on purpose | `src/lib/agents/grants.ts` l.13; `harness-mcp-plan.md` 7.2, 14 |
| Voice | mediasoup SFU, floor-aware, up to 8 side rooms, optional map proximity. Off by default (`VOICE_ENABLED`); needs HTTPS + one UDP/TCP port | README "Voice chat"; `docs/configuration.md` |
| Ask the DM | OOC answers from the record (server HP + recent dice since v0.24.6); one-turn note to the DM, sent after confirming the text | README; v0.24.6 notes |
| Secrets | DM whispers, private player threads; public/DM-only/blind/self rolls (v0.24.4); DM-only world facts and storyboard notes; sheet notes stripped. AI prompt still carries whispers ("don't reveal") | `src/lib/table-delivery.ts`; `src/lib/dm/prompt.ts` (TC `docs/exchanges/2026-10-05-odm-survey/README.md`) |
| Rules, world packs | ~50 server engines ("the narrator never owns the numbers"); 5e **SRD 5.1 (2014)**; Open5e SRD 5.2 backfill with changed 2024 mechanics logged as gaps. World packs rename only ("Every mechanic stays 5e") | `docs/rules-coverage.md`; `docs/rules-enforcement-audit.md`; `docs/content.md`; `docs/worlds.md` |
| Safety, undo | Lines/veils; X-card pauses the DM queue. Optional `inventoryApprovals`; audit undo, revert-turn, chapter rewind | `src/lib/dm/safety.ts`; `docs/vtt-parity-implementation-plan.md` 9.1; `src/app/api/campaigns/[campaignId]/audit/` |

## c. Planned work

- **ROADMAP "Next":** authoring-time ruleset validation (`src/lib/rulesets/validate.ts`, deferred); homebrew monsters in bundles; per-account dice-source sync; multiple DM personalities; split `src/app/solo/page.tsx`; drop mflux/sdnq enums. Limits: single process (SQLite, event bus, turn queue, voice); empty ambience; typed dice are trust-based.
- **Milestone `stabilization`** (1 open / 9 closed, no due date): "Hardening the core flows before 1.0 ... with a test that keeps each fix fixed. Proposed in #3." The only 1.0 signal.
- **Plan docs with open tails:** `human-dm-plan.md`, `workshop-plan.md`, `vtt-parity-implementation-plan.md`, `visual-overhaul-plan.md` ("Not built: the NPC conversation panel", 0.21.0), `harness-mcp-plan.md` (13 open questions; 14 left out: external agent as AI DM, OAuth), `vtt-feature-gap-report.md` (2024 toggle deferred until an open 5.2 dataset). No CHANGELOG; release notes instead.

**Open PRs by Lebbitheplow** (#141-#145 opened 2026-10-08, 11:54 AM-12:33 PM ET):

| PR | Proposes | Why it may matter |
|---|---|---|
| #143 | Each event type declares its audience (`src/lib/event-audience.ts`); **undeclared events reach nobody**; enemy damage and cover brief stay server-side; `scripts/test-event-audience.mjs` | Deny-by-default delivery (gap 6) |
| #144 | `dmMode: "steered"`: AI narrates, creator takes a character-less DM seat (arc, console, Direct, secret rolls), lead becomes a player; "Dispute this ruling" settled by steerer or vote | Gaps 2, 11 |
| #142 | `vitalsApprovals`: PC damage/healing/conditions become offers (AI, console or `odm_dm_invoke`); approval replays the audited call | Gap 5 |
| #145 | Quick start *The Silent Bell of Marrow's Crossing*: one evening, four pregens | Gap 12 |
| #141 | Campaign-creation and paid-AI policy, `usage_events` ledger, Admin > Usage (#137, #138) | Hosting without spending the owner's key |
| #134, #135, #139 | Spell/combat feats; four gap-hunting suites; priced pack gear (#136) | Stabilization |

## d. Open work by area (upstream, 2026-10-08 1:15 PM ET)

| Area | Issues | PRs |
|---|---|---|
| Privacy | - | #143 event audiences (Lebbitheplow) |
| DM modes | - | #144 steered mode + disputes; #142 vitals approvals (Lebbitheplow) |
| Rules / character creation | #136 priced Open5e gear unpriced (GeekSheikh) | #139 fixes #136; #134 feats, for #125 (Lebbitheplow) |
| Server admin | #137 usage overview; #138 user-owned AI providers (GeekSheikh) | #141 for #137, #138 (Lebbitheplow) |
| Bugs / tests | #140 Battle Maps drawer empty on failed list request (GeekSheikh) | #135 gap-hunting suites, five fixes (Lebbitheplow) |
| Onboarding | - | #145 quick start (Lebbitheplow) |
| Core flow / language | #37 consolidation phase, `core-flow`; #57 language-independent text reading (mcerina) | - |

No open PR yet for #140, #37 or #57.

## e. Gaps vs Tabletop Companion ideas

Sources: TC `docs/companion-design-decisions.md` (2026-09-09 "D&D first, other supplied RPG rules later"; 2026-09-11 "Two longer-term hybrid DM arrangements", "Same-Wi-Fi first test", "Private play for the live test"; 2026-09-12 "Local use"; 2026-10-05 "Build on ODM") and TC research note (R8, R12, R13, R15, steal list). Status at 0.24.9.

| # | TC idea | ODM status | Evidence |
|---|---|---|---|
| 1 | Swappable rules modules (SRD 5.2/5.2.1, 3.5, GURPS, Daggerheart) | **Confirmed missing.** One 5e engine (`src/lib/srd/`, `src/lib/dm/`); "ruleset validation" means 5e variants | README "Systems & engines"; `vtt-feature-gap-report.md` |
| 2 | Non-playing human co-DM on AI tables | **Missing on main; open PR #144.** Only the lead (a player) holds secrets | `viewer.ts` |
| 3 | Pause-and-redirect apart from X-card | **Pause: confirmed missing** (only `safety.ts` calls `pauseDmQueue`). **Redirect: partial** (Direct, reroll, rewind) | `src/lib/dm/queue.ts` |
| 4 | Whole-session assisted handoff | **Partial.** `MAX_COVER_TURNS = 20`; cover can't end chapters, resolve the central question, kill named NPCs or add twists. #144 may cover it | `src/lib/dm/delegation.ts`; `human-dm-plan.md` 7c |
| 5 | Propose / dry-run / approve + undo | **Partial.** Approve-first for items/gold (off by default); vitals in #142; undo exists; no dry-run; agent `dm` calls apply directly | `audit/[entryId]/undo`, `audit/revert-turn` |
| 6 | Fail-closed knowledge tiers | **Partial.** `capsFor` caps, redaction. Main uses a deny-list (`DM_ONLY_EVENTS`); prompt holds outline and whispers; redacted rolls "visibly happened" (Grimoire: 404). Fix in #143 | `table-delivery.ts` |
| 7 | Read-only canon import (WorldForge) | **Confirmed missing.** World Anvil import ruled out (paste as lore). Seam: transactional import planner, bundles | ROADMAP (World Anvil); README "Content import" |
| 8 | Private DM-to-player text in person | **Partial.** Whispers, phone play, second-screen view. Narrate-aloud flow **unverified** | ROADMAP phases 26-30 |
| 9 | Same-Wi-Fi hub | **Partial / conflicting.** Source server binds `0.0.0.0:3005` (`npm run start:lan`). App worlds use the broker's Cloudflare tunnel; client README says LAN works, TC survey saw `127.0.0.1`. Offline **unverified** | client README ~l.74, ~128, ~305 |
| 10 | Audited privacy evidence | **Partial.** Tests (`test-viewer-roles`, `test-enforce-permissions`, #143); no independent audit; fixed leaks: v0.12.1 campaign keys in member snapshots, v0.24.5 hidden-token board record and logged-out uploads | v0.24.5 notes; guide "Where a key lives" |
| 11 | Correction voting | **Missing on main; open PR #144** (fix stays with undo) | PR #144 |
| 12 | Starter adventure + pregens | **Missing on main; open PR #145** | PR #145 |
| 13 | Voice: DM acts only on a trigger phrase | **Unverified / likely missing.** Push-to-talk, confirm-then-send, transcription | TC 2026-09-12 |
| 14 | Consent-scoped private-sheet corrections, history kept | **Unverified.** Narration edit (dice kept), audit undo; no consent flow found | TC 2026-09-13, 2026-09-19 |

## f. Worth adopting from competitors

| Idea | Source | Where it would land in ODM |
|---|---|---|
| Dry-run, then approval cards | Familiar (beta 2026-09-25; v2.26.0 2026-10-05 adds cost preview, `/undo`, MCP `undo-last-workflow`) | `dryRun` on `odm_dm_invoke` and the AI tool path, returning the would-be audit row; reuse #142's offer bar |
| Hidden = 404; one projection for portal, agent, export | Grimoire 1.5.3b-f | #143 is half; add an "export as the player sees it" check |
| Read-only player MCP by default | Grimoire | Default new grants to `read` (current default **unverified**); test `read` is refused on writes (Grimoire 1.5.3e bug) |
| Explicit write grant, OAuth | Archivist MCP (`agent_write`) | Keep scopes; OAuth only if hosted multi-user needs it |
| Separate referee and narrator AIs | TableForge "Mirelle" | ODM has story vs utility models; name a "referee" role; opt-in rules check (srdcheck) |
| Between-session self-serve | ScryRPG, MythWeaver, Archivist, Grimoire "My Character" | Check shops, trade, level-up, Ask, library outside live play; else a lobby view |

## g. Watchlist

**Commercial** (from TC note, checked 2026-10-05 unless new):

| Product | Note |
|---|---|
| Familiar (Foundry) | **New:** v2.26.0, 2026-10-05 5:13 PM ET: 230 tools, undo, Cast/Pass reaction cards, any OpenAI-compatible endpoint |
| TableForge | Multiplayer AI DM, SRD 2024 engine, Mirelle; host pays, guests free. Oct: party chat, recaps |
| ScryRPG | Loot, shops, approve-before-write; Foundry module closed beta |
| MythWeaver | Prep co-DM with human approval; DM-vs-player knowledge |
| Archivist | Recaps; hosted MCP with OAuth; `agent_write` |
| Grimoire (ttrpg.bot) | Common/Player/GM-Secret tiers, hidden = 404; read-only player MCP; export = player view (1.5.3f) |
| Skeinkeeper | Pre-MVP Discord voice + Foundry MCP |

**Open source** (GitHub API, 2026-10-08; push dates ET):

| Project | License | Stars | Push | Note |
|---|---|---|---|---|
| [AnyWorld](https://github.com/iamarxs/AnyWorld) | MIT | 36 | Oct 8 | Python/FastAPI multiplayer, AI-only DM, no rules. Created 2026-09-15 |
| [Loreweaver](https://github.com/1A7432/loreweaver) | MIT | 63 | Oct 6 | 5e SRD + CoC 7e, shared sessions, AI party, SillyTavern cards. Gap 1 reference |
| [NarrativeEngine-P](https://github.com/Sagesheep/NarrativeEngine-P) | MIT | 102 | Oct 7 | Solo AI-DM memory; credited in `docs/LICENSES.md` |
| [open-tabletop-gm](https://github.com/Bobby-Gray/open-tabletop-gm) | not detected | 58 | Sep 16 | 5e as pluggable "system module"; single-player. Best gap 1 reference |
| [dmcp](https://github.com/shawnrushefsky/dmcp) | MIT | 12 | Jan 6 | Agent-DM MCP server; quiet |
| [ADnD](https://github.com/jncchds/adnd) | MIT | 0 | Sep 28 | C#/SignalR; claims 5e, PF2e, CoC 7e, custom; whispers/OOC kept from AI; PostgreSQL queue |
| [STMP](https://github.com/RossAscends/STMP) | AGPL-3.0 | 123 | 2025-10-01 | SillyTavern MultiPlayer; no rules; quiet |

**New finds** (created 2026):

| Project | License | Stars | Push | Note |
|---|---|---|---|---|
| [DiceFrame](https://github.com/diceframe/diceframe) | AGPL-3.0 | 107 | Oct 8 | Multi-system (5e light, CoC 7e, custom d20, diceless), multiplayer WebUI, SSE, experimental WebRTC, QQ bot. Closest peer. AGPL: study only |
| [Covel](https://github.com/ackness/covel) | MIT | 55 | Oct 8 | Kernel + plugins + world packs; proposals/validation; hidden events kept out of prompts |
| [srdcheck](https://github.com/chaoz23/srdcheck) | not detected | 3 | Aug 25 | Cited rules verdicts, **SRD 5.2.1 + 5.1**, fail-closed transitions. Gaps 1, 5 |
| [VelvetRP](https://github.com/mojomast/velvetrp) | none detected | 2 | Oct 7 | "The model proposes, the server owns what became true"; SRD 5.1 coverage matrix |
| [CampaignRepo](https://github.com/avorial/CampaignRepo) | MIT | 8 | Sep 23 | Git wiki, `:::gm` blocks, no-login portal, MCP review queue. Gap 7 |
| [lorekit](https://github.com/matluz1/lorekit) | Apache-2.0 | 10 | Apr 4 | MCP engine, NPC agents, branching saves; quiet |

Not watched (0-16 stars): claude-dnd (SergeyKhval), chronicle (solo, home network), oracle / nightwire (real-time GMs), eldritchdm (Discord + MCP rules), cozyvtt-mcp (agent DM over a VTT), asyncrpg (play-by-email), lonely-dungeon-master (projector + webcam minis).

## h. Weekly search queries (bump the date)

- `"dungeon master" ai created:>=2026-01-01 stars:>=10` (sort: stars)
- `topic:ai-dungeon-master created:>=2026-01-01` (sort: stars)
- `"game master" llm ttrpg created:>=2026-01-01 stars:>=5`
- `ttrpg mcp created:>=2026-01-01` (sort: stars)
- `llm tabletop multiplayer created:>=2026-01-01`
- `topic:ttrpg topic:self-hosted pushed:>=<last week>`
- `repo:Lebbitheplow/open-dungeon-master is:pr is:open` and `is:issue is:open`

## i. Recommendations

- **O1.** Review #143 before new privacy work; what remains is the prompt's outline/whispers and redaction vs absence (gap 6).
- **O2.** Test #144 steered mode against TC's "human-steered AI DM" (2026-09-11). Still missing: pause, AI check-ins, private pre-play planning (gaps 2-4).
- **O3.** Propose a non-X-card pause: `pauseDmQueue(campaignId, reason)` already takes a reason; add a "hold" with a private redirect note (gap 3).
- **O4.** Ask whether whole-session cover is wanted before coding; steered mode may replace it (gap 4).
- **O5.** Map where 5e is assumed (`src/lib/srd/`, `src/lib/dm/`, tool schemas, sheet shape) before rules-module code. SRD 5.2 is the cheapest start (Open5e `srd-2024` rows). References: open-tabletop-gm, Loreweaver, srdcheck (gap 1).
- **O6.** Build dry-run on #142's offer bar (gap 5).
- **O7.** Add WorldForge as a read-only lore source via the import planner (gap 7).
- **O8.** Same-Wi-Fi test with internet off, source server and desktop app; is the broker needed? (gap 9).
- **O9.** Lead with tests: a privacy evidence matrix like `test-event-audience.mjs` fits `stabilization` (gap 10).
- **O10.** Sync first: fork is 0.24.7; TC `odm-companion` starts at 0.24.6 (`48a4a7e`). Rebase onto 0.24.9 plus merged #141-#145.
- **O11.** Default agent grants to `read`; verify current defaults first (section f).

## j. Verify next week

1. Which of #141-#145 merged, and in which release.
2. Steered mode: does the lead lose `secretStory`? Can the steerer pause?
3. Desktop-hosted world: LAN vs `127.0.0.1`; offline use.
4. Default scopes on a new agent grant; what `play` can read.
5. Prompt whispers/outline after #143.
6. `stabilization`; #37, #57; any PR for #140.
7. DiceFrame, Covel cadence; srdcheck status and license.
8. Familiar after v2.26.0; Grimoire 1.5.3e/f dates; TableForge Mirelle.

## Sources

Upstream at `198a871`; releases v0.24.4-v0.24.9; PRs #134, #135, #139, #141-#145; issues #37, #57, #136-#138, #140; milestone `stabilization`; client README; opendungeonmaster.com (`/guide/start/choose-your-setup/`, `/guide/android/first-launch/`, `/guide/ai/where-keys-live/`, search snippets); `Smoebo/tabletop-companion`@`codex/first-playable-core` docs above; https://github.com/Ryanjansen92/familiar-releases/releases/tag/v2.26.0; GitHub API for sections g.

## Changelog

- **2026-10-08** - Created; research moves from Tabletop Companion to ODM.
- **2026-10-08** - Rewritten for the contributor team: about half the length, "Why it may matter" column, new section d, PR timing corrected (only #141-#145 opened 11:54 AM-12:33 PM ET).
