# Download Markdown

Download Markdown saves a Markdown resume built from the same JSON the page uses.

## Sub-features

- `md-download` saves the file from the nav button.
- `md-name` uses the slug of the resume name plus `-resume.md`.

## How to get to it (user POV)

- Choose `Download .md` in the frosted nav.

## Driving it with verify-portfolio

Preconditions:

- Doctor prints `ok` for this run.
- The viewport is at least 1280 by 800 so the button name is `Download .md`.

- **Download.** Open the launch URL and choose `Download .md`. Call `browser_click` on the button named `Download .md`. The browser downloads `sahasawat-uengwanitchaphan-resume.md`.
- **Read the file.** The file starts with `# Sahasawat Uengwanitchaphan` and contains `Frontend Developer`, `Bitkub`, and `Chulalongkorn University`. Copy it to `.cursor/skills/verify-portfolio/artifacts/download-markdown/sahasawat-uengwanitchaphan-resume.md`.
- **Proof.** Save the nav snapshot to `.cursor/skills/verify-portfolio/artifacts/download-markdown/nav.aria.txt` and a screenshot to `.cursor/skills/verify-portfolio/artifacts/download-markdown/nav.png`.

## Gotchas

- If the browser tooling cannot read the download, report `md-download` as unverified and include the error. Do not call `toMarkdown` or `downloadMarkdown` and present that as this proof.
- The filename comes from the resume name: lower case, spaces become hyphens, then `-resume.md`. The current name produces `sahasawat-uengwanitchaphan-resume.md`.
- Below 640px the words `Download .md` are hidden and the button has no accessible name.
- The Markdown lists work newest first, the same order as the page. A matching order is not a failure of this download proof.
