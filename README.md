# High Kingdoms visual review

Review-only evidence for the High Kingdoms appearance, code commit
`fbf856bb05bca89b02a34850f2a0efbb3f691662` on `codex/high-kingdoms-theme`.
The theme depends on draft PR 962. Captured November 14, 2026 (Toronto).
All campaigns, characters and room codes are disposable fictional fixtures.
No production databases, browser profiles or server logs are included.

The final development matrix passed 43 checks, followed by six picker checks
after adding image-decoding readiness to prevent incomplete cold captures.
The final production build passed the same 43 checks after correcting the
in-map hand label to use gilt ink in day mode. Development results precede
that final text-color correction. The gallery uses final
production captures; the JSON reports preserve both sets of geometry results.
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

Initial preview attempts encountered a Windows build-link permission failure
and a cold-compilation navigation timeout. The warmed full matrix passed twice,
including the final theme styling. Full-suite CI, native app-shell, real-phone
and screen-reader validation remain separate delivery checks.
