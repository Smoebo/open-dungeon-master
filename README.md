# Hearth & Haven visual review

Original crafted-oak, amber and parchment treatment for Open Game Master.
Source: `codex/hearth-haven-theme`, implementation commit
`2b815657967915c4eaf222cd6242425bcd118298`, dependent on PR 962.

Captured 2026-11-14 with the repository's disposable browser fixture. All
campaigns and characters are fictional. The loopback join address in lobby
captures belongs only to the disposable local preview.

The development and production browser matrices each passed all 43 checks, including 320/390px phone
layouts, text at 125%, keyboard interactions, picker isolation, theme switching,
transparent decorative overlays and forced-colors hiding. Results are preserved
in `results-development.json` and `results-production.json`. The displayed images
are the final production captures; the preceding commit preserves the development
captures. This gallery is separate from application source.
Native app shells, real devices/mobile Safari and screen readers still need review.

## Picker

![Day picker](images/validation-picker-1360-light-1.png)
![Night picker](images/validation-picker-1360-dark-1.png)
![Hearth selected on 320px phone in day mode](images/validation-picker-hearth-320-light.png)
![Hearth selected on 320px phone in night mode](images/validation-picker-hearth-320-dark.png)

## Lobby

![Day lobby](images/validation-lobby-1360-light.png)
![Night lobby](images/validation-lobby-1360-dark.png)
![Phone day lobby](images/validation-lobby-390-light.png)
![Phone night lobby](images/validation-lobby-390-dark.png)

## Story and combat

![Day story, enlarged text](images/validation-story-1360-light-large.png)
![Night story, enlarged text](images/validation-story-1360-dark-large.png)
![Phone day story](images/validation-story-390-light-large.png)
![Phone night story](images/validation-story-390-dark-large.png)
![Day combat](images/validation-combat-1360-light-large.png)
![Night combat](images/validation-combat-1360-dark-large.png)
![Phone day combat](images/validation-combat-390-light-large.png)
![Phone night combat](images/validation-combat-390-dark-large.png)

## Enlarged map and dialogs

![Day enlarged map](images/validation-map-enlarged-1360-light.png)
![Night enlarged map](images/validation-map-enlarged.png)
![Phone day enlarged map](images/validation-map-enlarged-390-light.png)
![Phone night enlarged map](images/validation-map-enlarged-390-dark.png)
![Day dice dialog](images/validation-dice-light-large.png)
![Night dice dialog](images/validation-dice-dark-large.png)

The remaining images include the keyboard-selected combat card, phone hand and
four/six-choice layout fixtures. The theme adds no gameplay behavior or genre default.
