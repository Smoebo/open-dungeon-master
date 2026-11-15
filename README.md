# High Kingdoms visual review

Production evidence for source commit `3d92137e032048a86a44cad00caef0ad99ca8ecf`, integrating draft PR 962
at `cab3070dc96c895a1d8aae8d6dd34b05c1a6ef65` into draft PR 973. Captured November 15, 2026 (Toronto).

All 59 theme browser checks and four additional day/night and forced-colors
action inspections passed. The frame and corner artwork still paints after the
shared ornament-container visibility change. All 52 screenshots are refreshed
from this production build. The selected shared browser regression run passed
26/26 cases, including all three table-layout widths. See `ci-followup.json`.
The six targeted suites, production build, TypeScript and bundle budgets passed;
lint reports zero errors and 313 warnings. Shared CSS is 107.7 KiB and rulebook
CSS is 114.3 KiB. The prior Windows fight-opening timeout did not reproduce in
an isolated local rerun (13 checks passed); final-head CI remains required.

All campaigns, characters and room codes are disposable fictional fixtures.
No production databases, browser profiles or server logs are included. Desktop
lobby invite labels use example.invalid; their QR images point to the stopped
local fixture. Phone captures use emulated viewports, not physical devices.

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


The 1024px/125% combat capture still shows a cramped three-pane layout. Passing
title bounds does not establish usability of every pane. Native app-shell,
physical-phone and screen-reader validation remain outstanding.

`ci-investigation.json`, `results-shared-first-attempt.json`,
`results-development.json`, `results-picker.json` and
`results-production-original.json` are historical reports from earlier source
commits. Their old failures are not current results. The five shared failures
from the first integration all pass in the current selected regression run.
The theme matrix and selected regression run do not replace full CI clearance.
