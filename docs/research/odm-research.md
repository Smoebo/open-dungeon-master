# ODM research note (Albert / Smoebo)

**Date:** 2026-10-08 (America/Toronto). **Maintainer of this note:** Grok Bot, for Albert Ng (GitHub `Smoebo`).
**Upstream:** https://github.com/Lebbitheplow/open-dungeon-master (MIT; maintainer `Lebbitheplow` / lebbi; contact lebbitheplow@proton.me).
**This branch:** `research/notes` on `Smoebo/open-dungeon-master`. Docs only.

Status words used below: **confirmed** = read in code or docs at a cited path; **open PR** = proposed upstream but not merged; **unverified** = claimed somewhere but not checked first-hand; **unknown** = no evidence found.

---

## a. Purpose and scope

This is the living research note for Albert's work as a contributor to Open Dungeon Master (ODM). It replaces
`docs/research/grok-weekly-tabletop-companion.md` (Smoebo/tabletop-companion, branch `codex/first-playable-core`) as the
place where weekly research lands, because Albert decided on 2026-10-05 to build on ODM instead of his own app
(`docs/companion-design-decisions.md`, "2026-10-05 - Build on Open Dungeon Master", same repo and branch).

Scope:

- Research and recommend. No product code changes on this branch.
- This branch is a notebook and is **never meant to be merged upstream**. Nothing here is posted to the upstream repo.
- Every claim cites a file path, release or URL. Upstream paths are relative to upstream `main` at `198a871` (release 0.24.9) unless stated.

Fork note: the fork's `main` (and so this branch's base) is at `f9b5ee7` (release 0.24.7), **26 commits behind** upstream `main`
as of 2026-10-08. The fork was created 2026-10-06 2:26 PM ET. Smoebo's permissions on upstream are **pull only**
(repo API: `admin/maintain/push/triage = false`; the collaborators endpoint returns 403 "Must have push access").

---

## b. ODM current state (verified 2026-10-08)

**Latest release:** v0.24.9, published 2026-10-07 8:29 PM ET ("Local models get their window back, feats grant what they say,
GPT-6 and Codex run a table"). Cadence is very fast: v0.24.4 (Oct 4) through v0.24.9 (Oct 7) is six releases in four days
(https://github.com/Lebbitheplow/open-dungeon-master/releases). Repo: 33 stars, 13 forks, TypeScript/Next.js, created 2026-07-17.
Contributors by commit count: Lebbitheplow 375, newideas99 45 (author of the original Open Dungeon fork base), mcerina-exm 23,
tw48083 10, others under 10. LICENSE: MIT, copyright Jacob Ferrari and Kaleb Lutterman. A separate client repo,
https://github.com/Lebbitheplow/open-dungeon-master-client (desktop + Android), carries the app-hosted mode.

| Capability | What ODM ships | Evidence |
|---|---|---|
| DM modes | `dmMode` is `"ai" \| "human" \| "assisted"`. AI narrates; a human narrates with a DM console and 64 engine adjudications; assisted lets the human hand the AI monster turns, read-alouds or a counted "cover" stretch | `src/lib/dm/viewer.ts`; README "Human DM and the workshop"; `docs/human-dm-plan.md` |
| Co-DM | An assistant DM seat with full in-game powers, appointed via `/dm/seat`; **only exists when a human is DM** (`isDmSeat` returns false when `dmMode === "ai"`) | `src/lib/dm/viewer.ts`; `docs/human-dm-plan.md` 8i; `docs/rules-coverage.md` |
| Workshop prep | A campaign row with `kind = 'workshop'` that never plays: maps, region, encounters, cast, bestiary with derived CR, storyboard, lore, tables, rules, world-pack builder, bundle export/import | `docs/ROADMAP.md` "The Workshop, phases 1 to 9"; `docs/workshop-plan.md` |
| Party lead + Director | At an AI table the lead holds story authority (sees the secret arc, rerolls/edits narration, rewinds chapters) and can arm a one-turn private "Direct" steer; players see that something is armed, not what | README "Narrative"; `viewer.ts` `capsForRole` (lead gets `secretStory` only in AI mode) |
| Setups | Three shapes: **hosted server** (npm/Docker; local model, API key or CLI agent), **no-server** (desktop/Android app embeds a server, shares via room code; human DM, no AI by default), **own key** (paste an OpenAI key or, on desktop, use a signed-in CLI agent) | opendungeonmaster.com home and `/guide/start/choose-your-setup/` (search snippets; site blocks fetch); client README |
| AI backends | llama.cpp/Ollama/LM Studio/vLLM, OpenAI-compatible APIs (OpenRouter etc.), or Claude Code / Codex / opencode / Grok Build started with no tools of their own, only the turn's DM tools over the server's MCP endpoint | README "AI and LLM integration"; `docs/agent-harness.md`; `docs/harness-mcp-plan.md` |
| Connected player agents | A user's own MCP client connects as that user with a hashed, revocable bearer token. Scopes in code: `read`, `play`, `characters`, `campaigns`, `dm` (plus opt-in `admin` in the plan). `dm` works only for the person in a human/assisted DM seat. No OAuth (bearer only, on purpose) | `src/lib/agents/grants.ts` line 13; `docs/harness-mcp-plan.md` 7.2 and 14 |
| Voice | In-process mediasoup SFU, floor-aware turn taking, up to eight DM-managed side rooms, optional battle-map proximity/whisper/shout; off by default (`VOICE_ENABLED`), needs HTTPS + one UDP/TCP port | README "Voice chat"; `docs/configuration.md` |
| Ask the DM | Out-of-character questions answered from the campaign record without moving the story; since v0.24.6 it reads server HP and recent dice. Plus a one-turn note to the DM, drafted from your thread and sent only after you confirm the exact text | README "Platform and multiplayer"; v0.24.6 notes |
| Private whispers | One-way DM-to-player whispers and private player-to-player threads, kept out of the shared stream. **But** the AI DM prompt carries whispers it sent and received, with an instruction not to reveal them | README; Companion survey of `src/lib/dm/prompt.ts` (TC `docs/exchanges/2026-10-05-odm-survey/README.md`) |
| DM-only rolls/notes/lore | Public, DM-only, blind and self rolls ("Roll in secret", v0.24.4); world-facts register with player-visible vs DM-only facts; storyboard secrets import as DM-only notes; sheet notes stripped for other seats | README; `src/lib/table-delivery.ts`; `docs/ROADMAP.md` phase 7 |
| Rules engine | ~50 server engines; "the narrator never owns the numbers". Ruleset is D&D 5e **SRD 5.1 (2014)**. Open5e pack includes an SRD 5.2 (2024) backfill, but 2024 rows that change a 2014 mechanic are recorded as gaps | README; `docs/rules-coverage.md`; `docs/rules-enforcement-audit.md`; `docs/content.md` |
| World packs | A JSON manifest that renames rules into a setting plus lore/monsters; "a pure name mapping. Every mechanic stays 5e" | README "Campaign plugins"; `docs/worlds.md` |
| Safety | Lines and veils; X-card pauses the DM turn queue and offers rewind/reroll/continue | `docs/vtt-parity-implementation-plan.md` 9.1; `src/lib/dm/safety.ts` |
| Undo/approval | Optional `inventoryApprovals` stages item/gold changes as player-approved offers; per-entry audit undo and revert-turn routes; chapter snapshots and lead-confirmed rewind | README "Items and anti-cheat"; `src/app/api/campaigns/[campaignId]/audit/` |

---

## c. ODM planned work

There is a public roadmap file and a milestone. The strongest signals, though, are **eight open PRs the maintainer opened on
2026-10-08 between 11:54 AM and 12:33 PM ET**, several of which hit Companion gaps directly.

**`docs/ROADMAP.md` "Next"** (dated items are all delivered; "Next" is short):
ruleset validation at authoring time (`src/lib/rulesets/validate.ts`, deferred); homebrew monsters travelling with workshop bundles;
per-account dice-source sync; multiple DM personalities; split `src/app/solo/page.tsx`; remove vestigial mflux/sdnq enums.
Known limitations: single process (SQLite, event bus, turn queue, voice), ambience ships empty, typed dice are a trust feature.

**Milestone `stabilization`** (open, 1 open / 9 closed, no due date): "Hardening the core flows before 1.0 ... Bugs in these
flows come first, with a test that keeps each fix fixed. Proposed in #3." This is the only signal of a 1.0 plan.

**Open PRs by Lebbitheplow, 2026-10-08 (not merged):**

| PR | What it proposes | Why it matters to Albert |
|---|---|---|
| #143 | Every event type declares its audience in `src/lib/event-audience.ts`; **undeclared events reach nobody**; enemy damage figures and the cover brief projected server-side; `scripts/test-event-audience.mjs` | Deny-by-default delivery, i.e. the privacy unit Albert picked as his first ODM unit |
| #144 | `dmMode: "steered"`: AI narrates every turn, the creator takes a DM seat with no character, holding arc, console, Direct and secret rolls; lead becomes a plain player. Plus "Dispute this ruling" settled by the steerer or a majority vote | Non-playing human seat on AI-run games; keeps the secret arc away from a player; correction voting |
| #142 | `vitalsApprovals`: damage, healing and conditions on PCs become pending offers (from AI, console or a connected agent's `odm_dm_invoke`); approval replays the audited call | Approve-before-write beyond items/gold |
| #145 | Quick start: one-evening adventure *The Silent Bell of Marrow's Crossing* with four pregens | Companion's "prepared starter adventure" decision |
| #141 | Shared-server policy: who may create campaigns, paid-AI gate, `usage_events` ledger, Admin > Usage (answers issues #137/#138) | Hosting for friends without spending the owner's key |
| #134, #135, #139 | Spell/combat feats; four gap-hunting test suites; priced pack gear (#136) | Stabilization |

Whether these PRs were prompted by Albert's team is **unknown**; they match Albert's 2026-10-05 decisions closely, so check before duplicating work.

**Open issues (6):** #140 Battle Maps drawer empty on failed load; #138 user-owned AI providers for hosted campaigns; #137 admin
usage overview; #136 unpriced Open5e gear (all by GeekSheikh, 2026-10-08); #57 language-independent text reading (mcerina,
proposal); #37 consolidation phase on core-flow polish (mcerina, label `core-flow`).

**Plan docs with open tails:** `docs/human-dm-plan.md`, `docs/workshop-plan.md`, `docs/vtt-parity-implementation-plan.md`,
`docs/visual-overhaul-plan.md` (0.21.0 notes: "Not built: the NPC conversation panel"), `docs/harness-mcp-plan.md`
(section 13 open questions; section 14 "left out on purpose": an external agent as AI DM over the Workbench; OAuth),
`docs/vtt-feature-gap-report.md` ("2024 rules toggle ... defer until an open 5.2 dataset is imported"). No CHANGELOG file; release notes serve that role.

---

## d. Gaps vs the planned Tabletop Companion

Sources for Companion intent: TC `docs/companion-design-decisions.md` (esp. 2026-09-09 "D&D first, other supplied RPG rules later",
2026-09-11 "Two longer-term hybrid DM arrangements", "Same-Wi-Fi first test", "Private play for the live test", 2026-09-12
"Local use", 2026-10-05 "Build on ODM") and the TC research note (R8, R12, R13, R15, steal list). Status is for upstream `main` at 0.24.9.

| # | Companion feature | ODM status | Evidence |
|---|---|---|---|
| 1 | Swappable rules modules (SRD 5.2/5.2.1, 3.5, GURPS, Daggerheart; editions change) | **Confirmed missing.** One 5e SRD 5.1 engine in `src/lib/srd/` + `src/lib/dm/`; world packs rename only; 2024 rows are logged as gaps; "Ruleset validation" in Next is 5e variant rules, not other systems | README "Systems & engines", "Campaign plugins"; `docs/rules-enforcement-audit.md`; `docs/vtt-feature-gap-report.md` |
| 2 | Non-playing human co-DM seat on AI-run games | **Confirmed missing on main; in open PR #144** ("steered" mode). Today the only human with secrets at an AI table is the lead, who also plays a character | `viewer.ts` `isDmSeat`/`capsForRole`; PR #144 |
| 3 | Pause-and-redirect control separate from X-card | **Pause: confirmed missing** (only `src/lib/dm/safety.ts` calls `pauseDmQueue`, with the X-card reason). **Redirect: partial** (Director one-turn steer, narration reroll, chapter rewind) | `src/lib/dm/queue.ts`, `safety.ts`; README "Narrative" |
| 4 | Longer whole-session handoffs in Assisted mode | **Partial.** Cover is capped at `MAX_COVER_TURNS = 20` answers, and the cover prompt forbids ending chapters, resolving the central question, killing named NPCs or new twists. PR #144's steered mode may cover the "AI runs, human steers" case | `src/lib/dm/delegation.ts`; `docs/human-dm-plan.md` 7c |
| 5 | Propose / dry-run / approve + undo for AI and agent state changes | **Partial.** Approve-first only for items/gold (`inventoryApprovals`, off by default); vitals in open PR #142. Undo exists (audit entry undo, revert-turn, rewind). No dry-run preview; agent `dm`-scope calls apply directly unless a switch stages them | README; `audit/[entryId]/undo`, `audit/revert-turn` routes; PR #142 |
| 6 | Fail-closed, server-enforced knowledge tiers | **Partial.** Server-side caps exist (`capsFor`), rolls redacted, sheet notes stripped. But stream delivery on main is a deny-list (`DM_ONLY_EVENTS` in `src/lib/table-delivery.ts`), the AI prompt holds the outline and whispers, and redacted rolls still "visibly happened" (vs Grimoire's 404). Deny-by-default is open PR #143 | `table-delivery.ts`; `viewer.ts`; PR #143 |
| 7 | Optional read-only external canon import (WorldForge) | **Confirmed missing.** World Anvil import ruled out; fallback is paste/upload an article as lore. Nearest seam: the transactional content-import planner/executor and workshop bundles | `docs/ROADMAP.md` (World Anvil paragraph); README "Content import" |
| 8 | Private DM-to-one-player text for in-person tables | **Partial.** One-way DM whispers and private threads exist, the table runs on phones, and there is a chrome-free second-screen table view. A flow designed for a DM narrating aloud in the same room is **unverified** | README; `docs/ROADMAP.md` phases 26-30 ("the room") |
| 9 | Local same-Wi-Fi hub | **Partial / conflicting.** Server from source binds `0.0.0.0:3005` (`npm run start:lan`) and works on a LAN. App-hosted worlds share through a Cloudflare tunnel issued by the ODM broker; client README says "friends on the same Wi-Fi can use the LAN address", while TC's 2026-10-05 survey found a desktop-hosted world binds `127.0.0.1`. Fully offline app hosting **unverified** | README "Quick start"; client README lines ~74, ~128, ~305; TC survey README |
| 10 | Audited privacy evidence | **Partial.** Strong test culture (`test-viewer-roles`, `test-enforce-permissions`, PR #143's chunk-by-chunk test), but no independent privacy audit or evidence pack, and leaks were fixed after launch (v0.12.1 campaign keys in member snapshots; v0.24.5 hidden-token board record, uploads without login) | `docs/rules-coverage.md`; release notes v0.24.5; guide "Where a key lives" |
| 11 | Correction authority / voting | **Missing on main; open PR #144** (disputes upheld/overruled/voted; the fix itself stays with undo) | PR #144 |
| 12 | Prepared starter adventure + pregens | **Missing on main; open PR #145** | PR #145 |
| 13 | Voice: DM listens to table talk, acts only on a trigger phrase | **Unverified / likely missing.** ODM has push-to-talk with confirm-then-send and transcription for human-DM tables | README "Voice"; TC decisions 2026-09-12 |
| 14 | Consent-scoped disclosure for private-sheet corrections; history-preserving current-value corrections | **Unverified.** ODM has inline narration edit (dice markers preserved) and audit undo; no consent/disclosure flow found | README "Narrative"; TC decisions 2026-09-13, 2026-09-19 |

---

## e. Worth adopting from competitors (TC steal list mapped to ODM)

| Steal | Source | ODM today | Where it would land |
|---|---|---|---|
| Dry-run, then approval cards for inventory/coin | Familiar (beta 2026-09-25); v2.26.0 (2026-10-05) adds "ask what something costs first" and undo via `/undo` or MCP `undo-last-workflow` | Item/gold offers exist; no preview of an AI/agent call before it is staged | A `dryRun` flag on `odm_dm_invoke` and the AI tool path that returns the would-be audit row; reuse the offer bar from PR #142 |
| Server-side absence (hidden = 404), one projection for portal, agent and export | Grimoire 1.5.3b-f | Redaction, not absence; Workbench reads reuse web redaction (good); deny-list on main | PR #143 is the absence half; then an "export as the player sees it" check |
| Read-only player MCP by default | Grimoire | `read` scope exists; `play` lets an agent act. Default scopes for a new grant **unverified** | Default new grants to `read`; test that `read` is refused on every mutating route (Grimoire 1.5.3e bug) |
| Read vs write separated by an explicit grant (`agent_write`), OAuth | Archivist MCP | Scopes split read/play/characters/campaigns/dm; bearer tokens, OAuth deliberately left out | Keep scopes; OAuth only if a hosted multi-user server needs it |
| Dual specialized AI roles (referee/memory vs narrator) | TableForge "Mirelle" | Story vs utility model roles with separate sampling; engines own numbers | Name a "referee" role in docs; consider an opt-in rules-check pass (see srdcheck below) |
| Between-session player self-serve (loot, shop, sheet) | ScryRPG, MythWeaver, Archivist, Grimoire "My Character" | Shops with haggling, player trade, level-up flow, Ask, character library | Check whether these work outside a live session; add a "between sessions" lobby view if not |

---

## f. Watchlist

Commercial entries are carried from the TC note (last checked there 2026-10-05) unless marked new; not all re-checked today.

| Product | Note |
|---|---|
| Familiar (Foundry) | **New:** v2.26.0 stable 2026-10-05 5:13 PM ET: 230 tools, undo (`/undo`, MCP `undo-last-workflow`), reactions as player Cast/Pass cards, any OpenAI-compatible endpoint. Still Foundry-bound DM tooling |
| TableForge | Multiplayer AI DM with SRD 2024 engine; Mirelle adjudication/memory AI; host pays, guests free. Oct changelog: party chat, recaps |
| ScryRPG | Around-play hub: loot, shops, approve-before-write familiar; Foundry module closed beta |
| MythWeaver | Prep co-DM with human approval; DM-vs-player knowledge framing |
| Archivist | Recap/compendium; hosted MCP with OAuth; `agent_write` gate |
| Grimoire (ttrpg.bot) | Common/Player/GM-Secret tiers, hidden = 404; read-only player MCP; export = player view (1.5.3f) |
| Skeinkeeper | Pre-MVP Discord voice + Foundry MCP; watch only |

Open source (stars and last push read from the GitHub API on 2026-10-08):

| Project | License | Stars | Last push (ET) | Note |
|---|---|---|---|---|
| [AnyWorld](https://github.com/iamarxs/AnyWorld) | MIT | 36 | Oct 8 | Python/FastAPI multiplayer browser game; freeform AI-only DM, no rules engine. Created 2026-09-15 |
| [Loreweaver](https://github.com/1A7432/loreweaver) | MIT | 63 | Oct 6 | Self-hosted AI GM/Keeper for 5e SRD + Call of Cthulhu 7e; function calling, shared sessions, AI party members, SillyTavern card import. Two rule systems in one app is a reference for gap 1 |
| [NarrativeEngine-P](https://github.com/Sagesheep/NarrativeEngine-P) | MIT | 102 | Oct 7 | Solo AI-DM memory and living NPCs; ODM credits it for design ideas (`docs/LICENSES.md`) |
| [open-tabletop-gm](https://github.com/Bobby-Gray/open-tabletop-gm) | not detected by API | 58 | Sep 16 | LLM-agnostic GM framework; 5e as reference "system module", others pluggable; single-player. Best architecture reference for gap 1 |
| [dmcp](https://github.com/shawnrushefsky/dmcp) | MIT | 12 | Jan 6 | MCP server for an agent DM; quiet since January |
| [ADnD](https://github.com/jncchds/adnd) | MIT | 0 | Sep 28 | C#/SignalR multiplayer AI GM; README claims 5e, PF2e, CoC 7e and custom systems; whispers and OOC excluded from the AI's context; PostgreSQL work queue. Small but feature-relevant |
| [STMP](https://github.com/RossAscends/STMP) | AGPL-3.0 | 123 | 2025-10-01 | SillyTavern MultiPlayer: several users chatting with one AI; no rules engine; quiet for a year |

---

## g. New open-source scan (2026-10-08)

Searched GitHub (via the GitHub MCP `search_repositories`) for projects created in 2026. Credible new ones:

| Project | License | Stars | Last push (ET) | Why watch |
|---|---|---|---|---|
| [DiceFrame](https://github.com/diceframe/diceframe) | AGPL-3.0 | 107 | Oct 8 | Self-hosted AI TRPG engine, multiple rule systems (D&D 5e light, CoC 7e, custom d20, diceless), multiplayer WebUI with invites, SSE, experimental WebRTC direct play, QQ group bot. Early release. Closest new multi-system multiplayer peer. AGPL: study only, do not copy into MIT ODM |
| [Covel](https://github.com/ackness/covel) | MIT | 55 | Oct 8 | Agentic AI-RPG framework: kernel + capability plugins + portable world packs; "proposals, validation" in the kernel; hidden story events kept out of prompts until conditions hold. Reference for plugin seams and keeping secrets out of the prompt |
| [srdcheck](https://github.com/chaoz23/srdcheck) | not detected | 3 | Aug 25 | Deterministic, cited rules verdicts for agents; **SRD 5.2.1 + 5.1 adapters**; transition proposals that fail closed on stale state. Small but directly relevant to gaps 1 and 5 |
| [VelvetRP](https://github.com/mojomast/velvetrp) | none detected | 2 | Oct 7 | "The model proposes, the server owns what became true"; human-DM mode with exact AI proposals to review; SRD 5.1 with a coverage matrix |
| [CampaignRepo](https://github.com/avorial/CampaignRepo) | MIT | 8 | Sep 23 | Git-backed campaign wiki; `:::gm` secret blocks; no-login player portal; MCP writes land in a review queue. Read-only canon-source pattern (gap 7) |
| [lorekit](https://github.com/matluz1/lorekit) | Apache-2.0 | 10 | Apr 4 | MCP TTRPG engine with deterministic rules, NPC agents, branching saves; quiet since April |

Lower-signal finds (0-16 stars, mostly solo or Claude Code plugins): claude-dnd (SergeyKhval), chronicle (solo, home network),
oracle / nightwire (real-time table GMs), eldritchdm (Discord + MCP rules engine), cozyvtt-mcp (agent DM over a self-hosted VTT),
asyncrpg (play-by-email LLM DM), lonely-dungeon-master (projector + webcam minis). Not added to the watchlist.

**Weekly GitHub queries to reuse** (bump the date):

- `"dungeon master" ai created:>=2026-01-01 stars:>=10` sorted by stars
- `topic:ai-dungeon-master created:>=2026-01-01` sorted by stars
- `"game master" llm ttrpg created:>=2026-01-01 stars:>=5`
- `ttrpg mcp created:>=2026-01-01` sorted by stars
- `llm tabletop multiplayer created:>=2026-01-01`
- `topic:ttrpg topic:self-hosted pushed:>=<last week>`
- `repo:Lebbitheplow/open-dungeon-master is:pr is:open` and `is:issue is:open` (upstream signals)

---

## h. Recommendations for Albert as an ODM contributor

Short, concrete, each tied to evidence. None of these posts anything upstream; anything that would (a comment, PR or issue) needs Albert's own go-ahead.

- **O1. Check PR #143 before starting the privacy unit.** It already does deny-by-default delivery with a test (section c). If it merges, the first Companion unit shrinks to what it leaves out: the AI prompt carrying outline and whispers, and redaction vs absence (gap 6).
- **O2. Test PR #144 "steered" mode against Companion's "human-steered AI DM" decision** (TC decisions 2026-09-11). Note what is still missing: a pause, AI check-ins with the human, and private planning before play (gaps 2-4).
- **O3. Propose a pause that is not the X-card.** `pauseDmQueue(campaignId, reason)` already takes a reason and only `safety.ts` calls it. A steerer/DM "hold" reason with a private redirect note is a small, well-scoped change (gap 3).
- **O4. Ask whether a whole-session cover is wanted.** Today it is 20 answers and story-freezing (`delegation.ts`). With steered mode it may be unnecessary; settle that before writing code (gap 4).
- **O5. Write a rules-seam map before any rules-module code.** List where 5e is assumed (`src/lib/srd/`, `src/lib/dm/`, tool schemas, sheet shape). SRD 5.2 is the cheapest first step because the Open5e pack already carries `srd-2024` rows and the audit lists the 2024 gaps. Use open-tabletop-gm, Loreweaver and srdcheck as references (gap 1).
- **O6. Build dry-run on PR #142's offer bar.** A `dryRun` on `odm_dm_invoke` that returns the would-be change matches Familiar's pattern and ODM's audit model (gap 5).
- **O7. Put WorldForge import in as a read-only lore source** through the existing transactional import planner, the same place ODM sends pasted World Anvil articles (gap 7).
- **O8. Run a same-Wi-Fi test with the internet off,** both server-from-source and desktop app, and record whether the broker is needed. That settles the conflicting evidence on gap 9.
- **O9. Lead with tests.** The `stabilization` milestone wants "a test that keeps each fix fixed". A privacy evidence matrix written as tests (like `test-event-audience.mjs`) is the contribution most likely to be welcome and covers gap 10.
- **O10. Sync before code.** The fork's `main` is 26 commits behind (0.24.7), and TC's `odm-companion` branch starts at 0.24.6 (`48a4a7e`). Rebase onto 0.24.9 plus whatever of #141-#145 merges before building.
- **O11. Default connected-agent grants to `read`** and check that `read` is refused on every write route (Grimoire 1.5.3e had exactly that bug). Verify current defaults first (section e).

**Verify next week**

1. Whether #141-#145 merged, and in which release.
2. Steered mode in practice: does the lead really lose `secretStory`? Can the steerer pause?
3. Desktop-hosted world: LAN address vs `127.0.0.1` bind; whether it works offline.
4. Default scopes on a new connected-agent grant; what `play` can read.
5. Whether the AI prompt still carries whispers and the secret outline after #143.
6. Movement on the `stabilization` milestone and issues #37 / #57 (mcerina proposals).
7. DiceFrame and Covel release cadence; srdcheck status and license.
8. Familiar after v2.26.0; Grimoire 1.5.3e/f final dates; TableForge Mirelle changes.

## Sources

Upstream repo files cited above at `198a871`; https://github.com/Lebbitheplow/open-dungeon-master/releases (v0.24.4-v0.24.9);
open PRs #134, #135, #139, #141-#145 and issues #37, #57, #136-#140; milestone `stabilization`;
https://github.com/Lebbitheplow/open-dungeon-master-client (README);
opendungeonmaster.com (home, `/guide/start/choose-your-setup/`, `/guide/android/first-launch/`, `/guide/ai/where-keys-live/`, via search snippets);
Smoebo/tabletop-companion@`codex/first-playable-core`: `docs/research/grok-weekly-tabletop-companion.md`, `docs/companion-design-decisions.md`, `docs/exchanges/2026-10-05-odm-survey/README.md`;
https://github.com/Ryanjansen92/familiar-releases/releases/tag/v2.26.0; GitHub API metadata for every repo in sections f and g.

## Changelog

- **2026-10-08** - Note created on `research/notes`. Research pivots from Tabletop Companion to ODM.
