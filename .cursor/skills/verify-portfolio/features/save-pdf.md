# Save as PDF

Save as PDF downloads the generated A4 resume, not a screenshot of the page.

## Sub-features

- `pdf-open` exposes the PDF from the nav.
- `pdf-file` returns that same file as a PDF response.

## How to get to it (user POV)

- Choose `Save as PDF` in the frosted nav.

## Driving it with verify-portfolio

Preconditions:

- Doctor prints `ok` for this run.
- The viewport is at least 1280 by 800 so the link name is `Save as PDF`.
- `public/resume.pdf` exists. If it does not, stop. The unmet precondition is that `pnpm pdf` has not been run. Do not treat the link as verified.

- **See the link.** Open the launch URL and snapshot the nav. Call `browser_snapshot`. A link named `Save as PDF` is visible and its href ends with `/portfolio/resume.pdf`.
- **Fetch the file.** Request that href with curl. From the repo root, `curl -sI "http://127.0.0.1:<port>/portfolio/resume.pdf"`. The status is 200 and the content type contains `application/pdf`. Then `curl -fsS -o .cursor/skills/verify-portfolio/artifacts/save-pdf/resume.pdf "http://127.0.0.1:<port>/portfolio/resume.pdf"`. The saved file starts with `%PDF`.
- **Proof.** Save the nav snapshot to `.cursor/skills/verify-portfolio/artifacts/save-pdf/nav.aria.txt` and a screenshot of the nav link to `.cursor/skills/verify-portfolio/artifacts/save-pdf/nav.png`.

## Gotchas

- `pnpm dev` does not build the PDF. `pnpm pdf` writes `public/resume.pdf`. A 404 on the href is a failed proof.
- The href is under `/portfolio/` because Vite `base` is `/portfolio/`. Curling `/resume.pdf` on the dev host is the wrong URL.
- The PDF is a separate render from the on-page cards. This feature does not prove that every page sentence is in the PDF.
- Below 640px the words `Save as PDF` are hidden and the link has no accessible name. Widen the viewport instead of clicking the icon by coordinates.
