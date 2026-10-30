# Contact

Contact lists email, phone, location, and GitHub. Email, phone, and GitHub navigate. Location does not.

## Sub-features

- `contact-email` opens a mailto link.
- `contact-phone` opens a tel link.
- `contact-location` shows the place with no link.
- `contact-github` opens the GitHub profile in a new tab.

## How to get to it (user POV)

- Scroll to the `Contact` heading at the bottom of the page.

## Driving it with verify-portfolio

Preconditions:

- Doctor prints `ok` for this run.
- The browser is on the launch URL at 1280 by 800.

- **Reach the list.** Scroll until the heading `Contact` is in view. Call `browser_snapshot`. Under that heading, the email value `hoklok3@gmail.com` is a link to `mailto:hoklok3@gmail.com`, the phone value `+66 92-363-5365` is a link to `tel:+66 92-363-5365`, the location value `Bangkok, Thailand` is text with no href, and `github.com/sahasawatE` is a link to `https://github.com/sahasawatE` with `target="_blank"`.
- **Proof.** Save the snapshot to `.cursor/skills/verify-portfolio/artifacts/contact/contact.aria.txt` and a screenshot to `.cursor/skills/verify-portfolio/artifacts/contact/contact.png`. Both show the `Contact` heading and `hoklok3@gmail.com`.

## Gotchas

- The hero repeats these values as chips. Prove the rows under the `Contact` heading, not the chips under the `h1`.
- Location has no chevron and no href. Email, phone, and GitHub do.
- Do not follow the GitHub link as proof of the portfolio. The proof is the href on the contact row.
- An empty contact list renders nothing, including no `Contact` heading. The current JSON has rows; a missing heading is a failure, not an empty state to skip.
