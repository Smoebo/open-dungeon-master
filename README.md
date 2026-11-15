# High Kingdoms visual review

Review-only evidence for the High Kingdoms appearance, code commit
`4374da3fd66d2d2e38b8b1743f22194df1b73ecf` on `codex/high-kingdoms-theme`.
This integrates draft PR 962 at `fccee2be4ace16f5b792032bc3292b6679ec5ac2`.
Captured November 14, 2026 (Toronto), for draft PR 973.
All campaigns, characters and room codes are disposable fictional fixtures.
No production databases, browser profiles or server logs are included.

The final production matrix passed all 59 checks, including 16 new title,
map-frame clearance and live material-variable checks. The visible moving
selection highlight responds to the shared chosen-color variable. Four extra
day/night and forced-colors action inspections passed. All 52 screenshots are
from the integrated production build. The first attempt passed 58 checks and
timed out on its first story navigation; its report is retained separately.
The warmed complete rerun passed 59/59. Older development, picker and original
43-check production reports are historical evidence, not reruns of this commit.
The two desktop lobby invite labels use a fictional example.invalid address
for publication; their QR images still point to the now-stopped disposable
local fixture. No live invitation is shown. Additional selected-theme captures
scroll High Kingdoms into view on phones. Phone captures use emulated viewports,
not a native app or physical device.

| Surface | Day | Night |
| --- | --- | --- |
| Desktop lobby | [Day](images/review-lobby-light.png) | [Night](images/review-lobby-dark.png) |
| Phone lobby | [Day](images/validation-lobby-390-light.png) | [Night](images/validation-lobby-390-dark.png) |
| Desktop story, enlarged text | [Day](images/validation-story-1360-light-large.png) | [Night](images/validation-story-1360-dark-large.png) |
| Phone story, enlarged text | [Day](images/validation-story-390-light-large.png) | [Night](images/validation-story-390-dark-large.png) |
| Desktop combat, enlarged text | [Day](images/validation-combat-1360-light-large.png) | [Night](images/validation-combat-1360-dark-large.png) |
| Phone combat, enlarged text | [Day](images/validation-combat-390-light-large.png) | [Night](images/validation-combat-390-dark-large.png) |
| Enlarged map desktop | [Day](images/validation-map-enlarged-1360-light.png) | [Night](images/validation-map-enlarged.png) |
| Enlarged map phone | [Day](images/validation-map-enlarged-390-light.png) | [Night](images/validation-map-enlarged-390-dark.png) |
| Picker desktop | [Day](images/validation-picker-1360-light-1.png) | [Night](images/validation-picker-1360-dark-1.png) |
| High Kingdoms selected, 320px | [Day](images/review-picker-320-light.png) | [Night](images/review-picker-320-dark.png) |
| Story title at 320px, enlarged text | [Day](images/validation-header-story-320-light-large.png) | [Night](images/validation-header-story-320-dark-large.png) |
| Combat title at 1024px, enlarged text | [Day](images/validation-header-combat-1024-light-large.png) | [Night](images/validation-header-combat-1024-dark-large.png) |
| Combat title at 1360px, enlarged text | [Day](images/validation-header-combat-1360-light-large.png) | [Night](images/validation-header-combat-1360-dark-large.png) |
| Map-frame clearance, phone | [Day](images/validation-frame-clearance-390-light.png) | [Night](images/validation-frame-clearance-390-dark.png) |
| Map-frame clearance, desktop | [Day](images/validation-frame-clearance-1360-light.png) | [Night](images/validation-frame-clearance-1360-dark.png) |
| Royal-blue action controls | [Day](images/review-actions-light.png) | [Night](images/review-actions-dark.png) |
| Forced-colors controls | [Day](images/review-actions-light-forced.png) | [Night](images/review-actions-dark-forced.png) |

The title and frame checks cover their stated bounds; they do not establish
usability of every pane. The 1024px/125% combat capture still shows a cramped
three-pane battle layout, which remains a shared-layout review item.

`ci-investigation.json` compares all 16 failures on the previous PR head with
the original shared base: each failed scenario already appears there. A focused
production rerun passes all three table-layout viewports and phone day-board
(4/9 total), while name-menu contrast, the desktop day-board gradient assertion
and hostile companion border differentiation still fail. These remain shared
delivery blockers; the 59/59 theme result does not replace full CI clearance.
Native app-shell, real-phone and screen-reader validation remain outstanding.
