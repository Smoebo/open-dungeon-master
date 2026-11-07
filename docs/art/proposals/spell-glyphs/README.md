# Full spell glyph set

## Files
- vocabulary.png (1080×1256) and vocabulary-2x.png (2160×2512).
- samples.png (1080×1657) and samples-2x.png (2160×3314).
- vocabulary.html and samples.html are standalone, with embedded images.
- frames/8, effects/19 (11 damage +8 non-damage), targets/8, flags/2, tiny/19:56 final128×128 RGBA WebPs, q90/alpha95/method6.
- composed/ and current/:24 sample composites and their original repo icons.
- spell-map.json, map_spells.py and manual-rules.json: complete source union and auditable classification.
- metadata-warnings.json: four verified source-level discrepancies; no repo edits.
- asset-manifest.json: encoding, palette, composition recipe, per-asset SHA256.

## Revision3 — selected necrotic death energy
Selected C, the hollow soul-flame: sickly sage over black-teal, with a large open core and ragged upward wisps. It no longer reads as a plant, a rock/fist, a venom drop, or another skull.

Three painted candidates were compared at actual52/20/16px, and in the same necromancy frame at52/20px:
- A, reaching skeletal hand in smoke: more literal bone/death, but fingers and smoke compete and reduce to fine-detail noise at20px.
- B, cracked grey-violet draining heart: the crack survives, but the silhouette risks heartbreak/emotion semantics and repeats the healing-heart family.
- C, hollow soul-flame: best balance of supernatural death-energy meaning and a surviving negative-space silhouette. Widened20percent and gently brightened the sage edge after the first comparison so the core remains open at20px.

Before/after with all candidates: necrotic-candidates.png, necrotic-candidates-2x.png and standalone necrotic-candidates.html. The previous leaf is included as the first column. Raw alternatives and archived before assets are in review/revision3/.

Updated only effects/necrotic.webp and tiny/necrotic.webp among the56 library files. Summon, multiple, self and the other51 files were retained unchanged. Rebuilt the24 compositions, main PNGs/2×/HTML and full bundle. Coverage and metadata warnings are unchanged.

Rebuild selection with `python3 select_necrotic.py`. fix_pass.py applies this selection last, so a full rebuild cannot silently restore the rejected leaf. README revision2 notes below are historical, not the current motif.

## Revision2 — historical reviewed pieces
- Necrotic: replaced the muddy clenched hand with a broad ash-sage wilted leaf, black-teal crack and broken tip. A first darker, finer-veined leaf candidate was also rejected after20px review. No drop shape and no skull.
- Summon: replaced the trophy/lamp-like orb pedestal with a featureless spirit visibly emerging through a low glowing rune circle. No animal-specific features.
- Multiple targets: replaced three coin-like dots/ticks with three target reticles inside shared brackets. This now reads as a grouped selection at20px rather than a loose count/ellipsis.
- Self: inspected at20px and in the hand strips; retained the approved bronze bust inside its open circle. It remains distinguishable from the single-target crosshair and the newly bracketed group.
- Rebuilt necrotic/summon16px effect-only fallbacks, all24 compositions, HTML, both sheets at1×/2× and bundle. Target pieces now also appear at20px on vocabulary.png.
- Before/after: review/revision2/before-after-pieces.png; archived prior sheets and pieces are alongside it. Read inspected the new source generations, true-size20px pieces,16px fallbacks, all24 samples and card strips.
- All coverage counts and metadata warnings are unchanged. No repository changes or public issue.

## Coverage
510 canonical spell records: **271 rule-mapped without per-spell overrides; 239 explicit per-spell rules; 0 unclassified utility catchalls.**

The 239 rules include semantic category, base targeting, multi-mode and metadata overrides, not239 missing art assets. These are transparent mapping proposals, not a production targeting rules engine or a claim all510 interactions were exhaustively playtested.

Sources: manifest510; baked mechanics268; SRD5.1 rules319; authored-expanded185. Aliases normalize to510 canonical names. The517 painted icon filenames are not517 separate canonical data records. No live content database was present in the repository checkout; no live/custom content pack was queried.

12 multi-mode entries retain alternatives and require selected-mode resolution at runtime. Animate Dead also retains single/multiple target alternatives for creation vs control/upcast.

Six entries have no local rules text: Catapult, Charm Monster, Frostbite, Power Word Pain, Ray of Sickness, Thunderclap. They have explicit manual proposals; do not represent them as locally rules-verified. Catapult/Frostbite/Thunderclap were checked against official D&D Beyond pages; Power Word Pain level against the official Wizards spell list.

### Intentional utility classifications (51; not unknown fallback)
Animal Messenger, Ceremony, Conjured Tower, Continual Flame, Control Flames, Control Weather, Create Food and Water, Create or Destroy Water, Creation, Dancing Lights, Daylight, Disguise Self, Drawmij's Instant Summons, Dream, Druidcraft, Fabricate, Gift of Gab, Hallucinatory Terrain, Illusory Script, Knock, Leomund's Secret Chest, Light, Mage Hand, Magic Mouth, Major Image, Mending, Message, Mighty Fortress, Minor Illusion, Mirage Arcane, Mislead, Mold Earth, Mordenkainen's Magnificent Mansion, Move Earth, Nystul's Magic Aura, Plant Growth, Prestidigitation, Programmed Illusion, Project Image, Purify Food and Drink, Pyrotechnics, Sending, Shape Water, Silent Image, Skywrite, Stone Shape, Tenser's Floating Disk, Tether Essence, Thaumaturgy, Wish, Wristpocket.

### Metadata defects found during review
The raw `level` remains repository-sourced in spell-map.json. `reviewLevel` is separately identified, never silently replacing source data. Catapult is shown as1† in the samples, with a disclosure.
- Catapult: repo6, verified1. https://www.dndbeyond.com/spells/2372-catapult
- Frostbite: repo5, verified0. https://www.dndbeyond.com/spells/2382-frostbite
- Thunderclap: repo3, verified0. https://www.dndbeyond.com/spells/2401-thunderclap
- Power Word Pain: repo4, verified7. https://media.wizards.com/2017/dnd/downloads/DnDXL2017_Spells.pdf

## Initial visual critique-and-fix pass (historical; revisions above supersede it)
Read inspected every generated source sheet, both final sheets at1×/2×, and unscaled crops including all24 sample icons plus all six cards. Archived first full sheets are in review/*-before.png.
1. Solid skull was unsuitable as a frame. Replaced it with an empty crest-ring, enlarged its skull so it does not read as a second conjuration ring, and moved the center effect below the crest.
2. Thin necrotic scratch/claw marks reduced to noise. Repainted as a broad sage/black-teal withered hand, clearly separated from acid chartreuse and poison emerald.
3. Simplified thunder from five concentric thin rings to three broad copper sound-wave strokes; less like another fire-orange burst at20px.
4. Deepened eye-arch/mask geometry so effects do not have to fit into a slit. Mask center is cleared when composing to keep the effect separate from its metal bridge.
5. Replaced beast-only summon paw with an amber orb emerging from a portal: applies to constructs, undead and objects too.
6. Removed neighboring-sprite fragments from cube/cone, restored full line/book bounds, and rechecked the final target/flag pieces.
7. Fixed mapping false positives: healing-prevention text in Chill Touch, travel-failure damage in Teleport/Dimension Door, immunity/condition mentions in protective spells, Haste saving-throw advantage, Disintegrate’s incidental object-cube description, and Animate Dead base target vs control mode.
8. Caught four incorrect source levels, verified externally, and disclosed review-only corrections without touching repo data.

## Honest remaining limitations
- Standalone frame silhouettes distinguish the eight categories at20px, but the skull/mask details still require familiarity. At20px, combined icons prioritize the effect; do not promise effortless simultaneous school/effect reading to new users.36/52px are substantially clearer.
- At16px use effect-only tiny assets. They encode category, not school, exact spell or every rider. Flags and target words keep labels/tooltips.
- These are categories, not unique spell portraits: Blight and Sapping Sting correctly share necromancy+necrotic; the latter’s prone rider is secondary data/text. Animate Dead is summon; Cause Fear is control.
- Target vocabulary deliberately folds cylinders into radius and cube/wall together, and has no separate point/location glyph. Exact geometry and target restrictions must remain in data/text.
- One primary glyph cannot exhaust multi-type/multi-mode spells.12 mappings explicitly retain choices.
- Color reinforces different shapes; never use color alone. Concentration crystal and ritual book remain learned conventions, so retain their text labels/tooltips.
- Keep normal strips to primary+target+one relevant cue. Detect Magic demonstrates the denser four-piece case, which fits but is less relaxed.

## Validation and reproduction
`python3 build_assets.py` extracts approved/new source pieces; then `python3 fix_pass.py` applies reviewed refinements. Both operate only in this folder.
`python3 make_manual_rules.py && python3 map_spells.py` refreshes mapping using /workspace/odm read-only.
`python3 render_set.py && node render.mjs` builds HTML/composites and renders with Puppeteer installed in the parent spell-glyphs folder, Chrome at /usr/bin/google-chrome.
`python3 validate.py && node validate_ui.mjs`: assets, alpha, approved hashes,510 names,8 schools/19 effects across24 samples, exact2× sheets, and real UI dimensions/no strip overflow.
Revision3 comparison: `python3 render_candidates.py && node render_candidates.mjs`. See revision3-notes.md for the final review.
Twelve previously approved pieces were retained byte-for-byte. No repository file changed; no PR or GitHub issue opened.
