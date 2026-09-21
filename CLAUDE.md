# Baker Bros Wrestling website

Static marketing site for Baker Bros Wrestling (camps, clinics, private lessons) in Rochelle, IL.
Plain HTML/CSS/JS, no build step, no framework. Hosted on Vercel, which redeploys automatically
on every push to `main`.

Live site: https://baker-brothers-website.vercel.app/

## How to work in this repo

**After every change: commit and push to `main` without asking.** The owner wants edits live
automatically. Use a short, plain-English commit message that says what changed
(e.g. "Update Fall Greco Clinic price to $45"). Then tell the owner in one or two sentences what
changed and that it will be live in about a minute.

Before pushing:
- Run `git pull --rebase` first so you never overwrite changes made elsewhere.
- Re-read the edited section to confirm nothing else changed by accident.
- Never force-push. Never rewrite history.

Ask first (don't just do it) if a request would:
- delete a page or a large section
- change the site's overall design, colors or layout
- add a new external service, script or tracking code
- touch anything involving payments beyond pasting a Stripe Payment Link

## Where things live

| File | Contains |
|---|---|
| `site-data.js` | **Most edits go here.** Contact email, phone, social links, Formspree form ID, and the `EVENTS` list (every camp and clinic) |
| `index.html` | Home page (hero, stats strip, "three ways to train", upcoming events preview) |
| `camps.html` | Camps & Clinics page + FAQ (refund, waiver, spectator policy) |
| `lessons.html` | Private lessons: pricing cards, how-it-works, request form |
| `about.html` | Coach bios (Nelson and Nolan Baker) and coaching philosophy |
| `styles.css` | All styling. Brand colors are CSS variables at the top (`--accent` red, `--accent-2` gold) |
| `main.js` | Shared header/footer, renders events from `site-data.js`, lesson form logic. Rarely needs editing |

The header and footer are injected by `main.js`, so nav links and footer contact info change in one
place, not on every page.

## Common edits

**Add or change a camp/clinic:** edit the `EVENTS` array in `site-data.js`. Each event has
`title`, `type` ("Camp" or "Clinic"), `start`/`end` (YYYY-MM-DD), `time`, `location`, `ages`,
`price` (number), `priceNote`, `spots`, `status`, `registerUrl`, `description`, `includes`.
Past events hide themselves automatically, so no need to delete old ones.

**Open registration for an event:** paste the Stripe Payment Link into `registerUrl` and set
`status: "open"`. Use `"full"` when sold out, `"soon"` before registration opens.

**Social links, phone, email:** the `SITE` object at the top of `site-data.js`. Leaving a value as
`""` hides it.

**Photos:** put image files in an `images/` folder and replace the matching
`<div class="photo-ph">…</div>` placeholder with an `<img>` that has descriptive `alt` text.
Never add photos of minors unless the owner confirms written parent consent is on file.

**Placeholders:** anything in `[square brackets]` is placeholder text waiting for real content.

## Style rules

- Keep the dark, bold look. Headings are Oswald uppercase; body is Inter.
- Match existing wording tone: direct, confident, parent-friendly, no hype.
- Keep it working on phones. No horizontal scrolling at 390px wide.
- Don't add frameworks, build tools or npm dependencies.
