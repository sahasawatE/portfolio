# Portfolio verification map

This directory is the maintained source for verifying the Sahasawat portfolio as a visitor. Read this index, then use the matching feature file.

## Baseline preconditions

- Launch with `RUN_ID=<id> VERIFY_PORT=<free-port> .cursor/skills/verify-portfolio/bin/launch.sh`.
- Run `.cursor/skills/verify-portfolio/bin/doctor.sh <id>` and require the `ok` line for that same id, port, and title `Sahasawat Uengwanitchaphan`.
- Open the `url` file in `.cursor/skills/verify-portfolio/runs/<id>/url`. It is `http://127.0.0.1:<port>/portfolio/?weather=clear&day=1`.
- Use a 1280 by 800 viewport.
- Never drive a Vite process this run did not start.

## Driving conventions

- Start every recipe from the baseline URL unless its preconditions say otherwise.
- Prefer ARIA roles and accessible names over CSS selectors, coordinates, or tab order.
- Treat commands and names as literal. The only substitution is the `RUN_ID` and port printed by launch.
- Browser actions go through the Cursor IDE browser (`browser_navigate`, `browser_lock`, `browser_snapshot`, `browser_click`, `browser_press_key`, `browser_scroll`, `browser_take_screenshot`).
- HTTP checks for a linked file use `curl` against the href the page actually rendered.
- Keep proof artifacts. Cleanup removes the run directory only.

## Proof and skip reporting

- Capture the visitor action and the resulting state, not only the final screen.
- UI proof includes an accessibility snapshot and a screenshot with the portfolio identity visible.
- Download or PDF proof includes the response or file, not only the control that starts it.
- Record the feature id, entry point, `RUN_ID`, and port with every artifact.
- Report an unreachable path with the attempted action and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 and one paragraph, then exactly four H2 sections in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with verify-portfolio`, `Gotchas`.

## Features

- [Hero](./hero.md) covers the name, title, photo, and summary block at the top of the page.
- [Experience gallery](./experience-gallery.md) covers opening, stepping, and closing internship and part-time photos.
- [Save as PDF](./save-pdf.md) covers the nav link and the PDF file it points at.
- [Download Markdown](./download-markdown.md) covers the nav button and the downloaded resume file.
- [Contact](./contact.md) covers the contact list, its links, and the location row that is not a link.

Projects, education, and skills are on the page and are not mapped yet. Do not treat a hero or contact proof as coverage for them.
