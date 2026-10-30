---
name: verify-portfolio
description: Drive the Sahasawat portfolio web app the way a visitor does — launch the Vite dev server, open the page, and prove hero, gallery, contact, PDF, and Markdown download behavior. Use when a change touches the portfolio UI, resume rendering, nav downloads, or lightbox, and before calling that change done.
---

# Verify the Sahasawat portfolio

This is the scripted way to prove the portfolio in a browser. The app is one scrolling Vite + React page. Resume words come from `src/data/resume.json`. There is no account, database, or writable data directory.

Read [features/README.md](features/README.md) before driving, then follow the feature file for the behavior under test. A proof that uses one entry point does not cover entry points the map lists separately.

## Launch

From the repo root:

```bash
RUN_ID=verify-1 VERIFY_PORT=5173 .cursor/skills/verify-portfolio/bin/launch.sh
```

Pick a new `RUN_ID` for each run. If port 5173 is taken, set `VERIFY_PORT` to a free port and keep that value for doctor, drive, and cleanup. Launch refuses when that run already has a live pid, or when the port already has a listener. Do not kill a listener this run did not start.

Launch prints `ready` and then stays attached to that Vite process. Do not wait for the script to exit. Continue as soon as the ready line appears. Cleanup is what stops it. If this shell kills child processes when a command returns, run launch in a session that stays open.

Ready looks like:

```text
ready run=verify-1 pid=<pid> port=5173 url=http://127.0.0.1:5173/portfolio/?weather=clear&day=1
```

Ready means `http://127.0.0.1:<port>/portfolio/` contains the title `Sahasawat Uengwanitchaphan` and the `main.tsx` script URL from that HTML returns HTTP 200. A live port with a broken module is not ready. The app has no migrations or seed step. `pnpm install` is required only when `node_modules` or `node_modules/vite/bin/vite.js` is missing; launch says so and exits.

Open the printed `url`, not `http://127.0.0.1:<port>/`. Vite's `base` is `/portfolio/`. The query `weather=clear&day=1` freezes the backdrop so Open-Meteo cannot change the page during the proof.

Two runs can exist at once only with different `RUN_ID` and `VERIFY_PORT`. They both read the same `src/data/resume.json` and do not write it.

Tear down with cleanup when the proof is done, including after a failed drive. See Cleanup.

## Doctor

Run this first whenever the page looks wrong, the port is confusing, or a drive starts without a launch in this session:

```bash
.cursor/skills/verify-portfolio/bin/doctor.sh verify-1
```

A healthy instance prints one line:

```text
ok run=verify-1 pid=<pid> port=5173 url=http://127.0.0.1:5173/portfolio/ title=Sahasawat Uengwanitchaphan
```

Doctor checks that the recorded pid is alive, its command is this run's Vite process on the recorded port, that pid owns the listen socket, and the portfolio HTML still contains the title. Anything else: do not drive. Launch again or clean up the run you started.

## Drive

Use the Cursor IDE browser. Set a desktop viewport of 1280 by 800 before clicking. Below 640px the nav labels `Save as PDF` and `Download .md` are `display: none`, so those buttons have no accessible name. From 768px up, work history uses the desktop timeline; gallery button names stay the same at both widths.

Prefer accessible names over coordinates. Icons are `aria-hidden`. There are no `data-testid` hooks. Gallery thumbnails are `button` elements, but the accessibility snapshot does not give them a name and does not list `img` nodes. Before clicking, read each button's `img` alt in document order with `Runtime.evaluate`. With the current resume and oldest-first sort, the unnamed buttons are Bitkub 1, Bitkub 2, part-time Abbot 1, then part-time Abbot 2. Re-read the alts if the JSON changes. Do not click by position alone.

Stable names from the current `src/data/resume.json`:

- Page title and hero `h1`: `Sahasawat Uengwanitchaphan`
- Hero title text: `Frontend Web Developer`
- Hero photo alt: `Sahasawat Uengwanitchaphan`
- Nav brand link: `<Sahasawat />` pointing at `#top`
- Nav link: `Save as PDF` (href ends with `/portfolio/resume.pdf`)
- Nav button: `Download .md`
- Section headings: `Work Experiences`, `Selected Projects`, `Education`, `Skills`, `Contact`
- Bitkub gallery buttons: `UX/UI Designer (intern) at Bitkub 1` and `UX/UI Designer (intern) at Bitkub 2`
- Part-time Abbot gallery buttons: `Frontend Developer (part-time) at Abbot Technology 1` and `Frontend Developer (part-time) at Abbot Technology 2`
- Contact email link: `mailto:hoklok3@gmail.com`, visible text `hoklok3@gmail.com`
- Contact phone link: `tel:+66 92-363-5365`
- Contact GitHub link: `https://github.com/sahasawatE`, visible text `github.com/sahasawatE`

The page scrolls with Lenis. Scroll a control into view before clicking it. Do not assert spring animations. `MotionConfig` follows the OS reduced-motion setting.

Drive steps for each feature live in that feature's file. Start from the launch URL unless the feature says otherwise.

## Evidence

Write proof under `.cursor/skills/verify-portfolio/artifacts/<feature-id>/`. Cleanup must not delete that directory.

For a UI proof, save both:

- an accessibility snapshot taken after the action
- a screenshot that shows the portfolio identity (the `<Sahasawat />` brand, the hero name, or the visitor's name on the opened photo) and the resulting state

The gallery snapshot will not mention the enlarged image. Also save the enlarged `img` alt, `src`, and rendered size. A screenshot taken while the lightbox is still animating can be an empty blur. Wait until `naturalWidth` is greater than 0, then shoot again. Shooting `.fixed.inset-0 img` shows the photo itself.

Also record the feature id, the entry point used, the `RUN_ID`, the port, and the command or browser action that produced the state. Capture the action and the result, not only the final screen.

PDF proof includes the nav link's href and an HTTP response for that same URL: status 200 and a PDF body. Markdown download proof includes the click on `Download .md` and the downloaded file `sahasawat-uengwanitchaphan-resume.md`. If the browser cannot read the download, report that entry point as unverified. Do not substitute a direct `toMarkdown` call for the button.

Exercise the visitor path. Do not set React state, call `toMarkdown` or `downloadMarkdown`, or hit a test-only route. `?weather=clear&day=1` is a visitor-visible query the app already understands; it is not a test endpoint. Side effects to check: the lightbox image is in the accessibility tree, `public/resume.pdf` is the URL the nav link opens, and a Markdown download is a real file. The page does not write resume data. Live weather is skipped on the launch URL; confirm that by the absence of a footer `Outside:` temperature line, rather than by trusting the query name.

## Cleanup

```bash
.cursor/skills/verify-portfolio/bin/cleanup.sh verify-1
```

Cleanup kills only the pid recorded for that `RUN_ID`, and only when that process is still Vite on the recorded port. It then deletes `.cursor/skills/verify-portfolio/runs/<RUN_ID>/`. It leaves `.cursor/skills/verify-portfolio/artifacts/` in place. Run it after every attempt, including failed ones, so ports and processes do not linger. Never `pkill` Vite or kill by process name.

## Helpers

- `.cursor/skills/verify-portfolio/bin/launch.sh` starts Vite. `RUN_ID=verify-1 VERIFY_PORT=5173 .cursor/skills/verify-portfolio/bin/launch.sh`
- `.cursor/skills/verify-portfolio/bin/doctor.sh` checks a run. `.cursor/skills/verify-portfolio/bin/doctor.sh verify-1`
- `.cursor/skills/verify-portfolio/bin/cleanup.sh` stops that run. `.cursor/skills/verify-portfolio/bin/cleanup.sh verify-1`

All three are executable bash scripts. Paths with spaces must stay quoted; the scripts do that themselves.

## Maintenance

When the page changes, update the feature map with `/maintain-verification-skill`.
