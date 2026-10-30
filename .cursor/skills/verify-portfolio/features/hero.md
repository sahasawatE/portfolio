# Hero

Hero shows the visitor who the portfolio belongs to: name, role, photo, and the same contact chips that appear again in the contact list.

## Sub-features

- `hero-name` shows the resume name as the page heading.
- `hero-title` shows the resume title under the name.
- `hero-photo` shows the profile photo, or nothing if that image fails to load.
- `hero-contacts` repeats email, phone, location, and GitHub as chips under the summary.

## How to get to it (user POV)

- Open the site. The hero is the first block, at `#top`.
- Choose the `<Sahasawat />` brand in the frosted nav. It scrolls to `#top`.

## Driving it with verify-portfolio

Preconditions:

- Doctor prints `ok` for this run.
- The browser is on the launch URL at 1280 by 800.

- **First screen.** Open the launch URL. Call `browser_navigate` with that URL, then `browser_lock` lock, then `browser_snapshot`. The `h1` is `Sahasawat Uengwanitchaphan`. The text `Frontend Web Developer` is visible. An image named `Sahasawat Uengwanitchaphan` is visible. The footer does not contain `Outside:`.
- **Brand return.** Scroll down until `Work Experiences` is in view, then choose `<Sahasawat />`. Call `browser_click` on the link named `<Sahasawat />`. The `h1` is back in view.
- **Proof.** Save the first-screen snapshot to `.cursor/skills/verify-portfolio/artifacts/hero/hero.aria.txt` and a screenshot to `.cursor/skills/verify-portfolio/artifacts/hero/hero.png`. Both show the name `Sahasawat Uengwanitchaphan`.

## Gotchas

- The hero contact chips are not the contact section. Email and GitHub also appear under the `Contact` heading. A hero snapshot does not prove the contact list.
- If `public/profile.jpg` fails to load, the photo is removed. Report a missing photo as a failure of `hero-photo`; do not crop it out of the proof.
- `basics.summary` in the current JSON is empty, so no summary paragraph is part of this proof.
- The brand link is the text `<Sahasawat />`, including the angle brackets.
