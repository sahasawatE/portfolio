# Experience gallery

Experience gallery lets a visitor open a job photo, step to the next photo, and close the enlarged view.

## Sub-features

- `gallery-open` enlarges the thumbnail the visitor chose.
- `gallery-next` shows the next photo in that job, wrapping at the ends.
- `gallery-escape` closes the enlarged photo with the keyboard.
- `gallery-backdrop` closes the enlarged photo by clicking outside it.

## How to get to it (user POV)

- Scroll to `Work Experiences` and choose a thumbnail on a job that has photos.
- Bitkub intern photos are the buttons `UX/UI Designer (intern) at Bitkub 1` and `UX/UI Designer (intern) at Bitkub 2`.
- Part-time Abbot photos are the buttons `Frontend Developer (part-time) at Abbot Technology 1` and `Frontend Developer (part-time) at Abbot Technology 2`.

## Driving it with verify-portfolio

Preconditions:

- Doctor prints `ok` for this run.
- The browser is on the launch URL at 1280 by 800.
- The Bitkub buttons are present. If they are not, stop and report that the resume JSON no longer has those images.

- **Resolve the button.** Read thumbnail alts in document order. Call `Runtime.evaluate` for `button img` alt and src. The Bitkub 1 button is the one whose alt is `UX/UI Designer (intern) at Bitkub 1`. Map it to the unnamed snapshot button at that same index.
- **Open.** Scroll that button into view and click its snapshot ref. `document.body.style.overflow` becomes `hidden`. One `.fixed.inset-0` element exists. Its `img` alt is `UX/UI Designer (intern) at Bitkub 1`, its src contains `bitkub.jpg`, and `naturalWidth` is greater than 0. The thumbnail with the same alt is still 256px wide.
- **Next.** Press the right arrow. Call `browser_press_key` with key `ArrowRight`. The enlarged `img` alt is `UX/UI Designer (intern) at Bitkub 2` and its src contains `figma.jpg`. The first thumbnail remains.
- **Escape.** Press Escape. Call `browser_press_key` with key `Escape`. `.fixed.inset-0` is gone, body overflow is empty, and both Bitkub images are the 256px thumbnails.
- **Backdrop.** Open Bitkub 1 again. Take a screenshot, then call `browser_mouse_click_xy` on the dimmed overlay, not the photo. The click target is `div.fixed.inset-0`. The overlay is gone afterward. Clicking the enlarged photo does not close it.
- **Other job.** Open the button whose alt is `Frontend Developer (part-time) at Abbot Technology 1`. The enlarged src contains `abbot1.jpg`. Close it with Escape. This entry is separate from the Bitkub proof. Do not mark it done because Bitkub worked.
- **Proof.** Save the ArrowRight screenshot of `.fixed.inset-0 img` to `.cursor/skills/verify-portfolio/artifacts/experience-gallery/next.png` and the Bitkub certificate screenshot to `.cursor/skills/verify-portfolio/artifacts/experience-gallery/open.png`. Save the open and closed notes, including the DOM image list, to `open.aria.txt` and `closed.aria.txt` in that same directory.

## Gotchas

- Thumbnail buttons have no aria-label. The alt is on the inner `img` (`<role> at <company> <n>`, n starting at 1). The accessibility snapshot still shows those buttons with no name, and it does not list the images. Resolve the ref from the alt before clicking.
- `browser_mouse_click_xy` requires a screenshot taken immediately before that click. Other browser calls clear the coordinate cache.
- Jobs without an `images` array have no gallery. Frontend Developer at Abbot Technology and Automation Tester at Playtorium Solution are not gallery entry points.
- The page sorts jobs by start date, newest first. Project Manager is the first work card. Bitkub (Jun 2021) is the last.
- Right arrow on the last photo wraps to the first. Left arrow on the first photo wraps to the last.
- Lenis may leave the thumbnail off screen. Scroll it into view, then click. A click that hits nothing is a failed drive, not a missing gallery.
- Escape is listened for on `window` only while a photo is open.
