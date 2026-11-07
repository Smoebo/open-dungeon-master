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
