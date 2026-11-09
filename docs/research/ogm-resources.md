# OGM open-source resources

These are free programs, credits, and infrastructure OGM (Open Game Master, formerly Open Dungeon Master) can apply for. They make the project cheaper and more trustworthy to run: signed releases, faster CI, crash visibility, and more distribution channels. They don't bring in players by themselves.

Last updated 9 Nov 2026. This file is refreshed after each weekly scan.

**Repo snapshot (9 Nov 2026):** the repos are now [`Lebbitheplow/open-game-master`](https://github.com/Lebbitheplow/open-game-master) and [`Lebbitheplow/open-game-master-client`](https://github.com/Lebbitheplow/open-game-master-client) (old `open-dungeon-master` URLs redirect), and the site is [opengamemaster.com](https://opengamemaster.com). The server repo has 76 stars, 36 forks, and 12 contributors. It's MIT-licensed, and v0.33.0 was released on 7 Nov. FUNDING.yml lists `Lebbitheplow` and Ko-fi, but there's still no live GitHub Sponsors profile, so the Sponsor button only shows Ko-fi.

**Naming:** Wizards of the Coast trademarks "Dungeon Master," so the product is now OGM, Open Game Master. The GitHub repos were renamed by 9 Nov. Any program form already filed under the ODM name or old URLs should be updated.

## Fix first: no LICENSE file in the client repo

`open-game-master-client` has no LICENSE file (still missing on 9 Nov). `package.json` says MIT, but GitHub shows no license, and SignPath and the Android repos check for one.

1. Add an MIT LICENSE file to the client repo, matching `package.json`.
2. Remove the duplicate v0.23.0 release assets that are still named `open-dungeon-master-client`.
3. Check whether the `odm://` link scheme should change with the rename.

## Distribution (added 2 Nov)

| Program | What we get | What it needs | When |
|---|---|---|---|
| [SignPath Foundation](https://signpath.org/) | A signed Windows installer, so Windows stops showing the "unknown publisher" warning | The LICENSE file, plus a code signing policy section on the download page. Lebbi applies. | Now, once the LICENSE is in |
| [IzzyOnDroid](https://izzyondroid.org/faq/) | A listing in an F-Droid-compatible repo that serves the APK from GitHub releases | The LICENSE file, then an issue to apply. Lebbi should agree first. | Now, once the LICENSE is in |
| [F-Droid](https://f-droid.org/en/docs/Inclusion_Policy/) | A listing in the main Android open-source app store | A build from source plus Fastlane metadata | Later |
| [Flathub](https://docs.flathub.org/docs/for-app-authors/requirements) | A listing in the Linux app store | An offline build with bundled npm dependencies, a metainfo file, and some release history. Flathub also has strict rules on AI-written code and submissions. | Later. Lebbi should read the AI rules first. |

## New on 9 Nov

| Program | What we get | What it needs | Who acts |
|---|---|---|---|
| [Neon Open Source Program](https://neon.com/programs/open-source) | A monthly cash sponsorship for a six-month renewable term, paid through GitHub Sponsors, plus optional Neon and AI Gateway credits up to $5k each. The project doesn't need to use Neon. | An OSI license, active development, and a live GitHub Sponsors profile. In return, a labeled Neon logo in one place, such as the README. | Lebbi, after turning on GitHub Sponsors |
| [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted-data/blob/master/CONTRIBUTING.md) listing | A spot in the Games section of the main self-hosted software list, which fits the Docker server | First release must be more than four months old. Ours was 25 Jul, so it qualifies after 25 Nov. Working install instructions. | Albert or Lebbi opens the PR after 25 Nov |

## Apply now (found 27 Oct)

| Program | What we get | Why it helps | Who acts |
|---|---|---|---|
| [SignPath Foundation](https://signpath.org/apply.html) | Free code signing with a hardware-backed certificate | Signed Windows builds | Lebbi |
| [Docker-Sponsored Open Source](https://www.docker.com/community/open-source/application/) | A Hub badge, no pull rate limits, and free Team seats | Covers the Docker Hub image | Lebbi |
| [1Password for Open Source](https://github.com/1Password/for-open-source) | Free 1Password Teams | A shared place for project secrets and SSH keys | Lebbi sets up Teams, invites Albert, then applies |
| [JetBrains OSS license](https://www.jetbrains.com/community/opensource/) | The All Products Pack free for a year, renewable | IDEs for core contributors | Lebbi and/or Albert |
| [Blacksmith](https://www.blacksmith.sh/pricing) | Faster free GitHub Actions runners, macOS included | Faster CI | Lebbi |
| [Greptile for Open Source](https://www.greptile.com/open-source) | Free AI pull request review | The project is already past the 50-star minimum | Lebbi, as admin, installs it |
| [Sentry for Open Source](https://sentry.io/for/open-source/) | Free error monitoring | Crash visibility on desktop, Android, and server | Lebbi |
| [Fastly Fast Forward](https://www.fastly.com/fast-forward) | A free CDN | Faster site and download delivery | Lebbi |
| Cloudflare Project Alexandria | Credits and plan upgrades | Only worth it if we want Cloudflare in front of the site | Lebbi |

## Still open from the 27 Oct brief

| Program | What we get | Status | Who acts |
|---|---|---|---|
| GitHub Actions macOS runners | Free macOS CI for public repos | CI runs on Linux and Windows only. It needs a macOS smoke-test workflow. | Any contributor, by PR |
| GitHub Sponsors | Recurring donations, and it unlocks the Neon program above | FUNDING.yml is set up, but there's no live Sponsors profile | Lebbi turns it on |
| [Codex for Open Source](https://openai.com/index/codex-for-open-source/) | ChatGPT Pro, Codex access, and API credits | Open to apply now | Lebbi |
| [Codex Open Source Fund](https://openai.com/form/codex-open-source-fund/) | Up to $25k in API credits | Separate form, open on a rolling basis | Lebbi |
| TestingBot / BrowserStack OSS | Free testing on real devices and browsers | Usually requires a README mention | Albert drafts, Lebbi submits |

## Hold for later

- **Anthropic Claude for Open Source:** needs 20 outside authors with merged PRs in the last 12 months. We had about 9 at the 27 Oct check.
- **AMD AI Developer Program:** $100 in GPU credits. Worth it once AMD GPU testing is real work.
- **MacStadium Open Source:** waitlist only.
- **GitHub Secure Open Source Fund:** a weak fit for a young end-user app at our size.
- **Hugging Face ZeroGPU:** needs a hosted demo on Spaces first.
- **NLnet Restack (2nd call):** grants of 5k to 50k euro, deadline 3 Jan 2027. It funds open internet infrastructure, so a game app is a weak fit.
- **Weblate Libre / Crowdin for Open Source:** free translation hosting, worth it once the app has translatable strings. There's no i18n setup yet.

Creator and streamer outreach is on hold until the app is more polished. Issue [#562](https://github.com/Lebbitheplow/open-game-master/issues/562) on the main repo tracks the star request. The in-app GitHub link fix shipped in client 0.22.0; Lebbi has put the star ask on hold while deciding how to ask.
