# Baker Bros Wrestling website

Plain HTML/CSS/JS with no build step. Deploys to Vercel as-is.

## Files

| File | What it is |
|---|---|
| `site-data.js` | **Edit this one.** Camps, clinics, contact info, form ID |
| `index.html` | Home |
| `camps.html` | Camps & Clinics (list is built from `site-data.js`) |
| `lessons.html` | Private Lessons + request form |
| `about.html` | Coaches |
| `styles.css` | Colors and layout (brand colors at the top) |
| `main.js` | Shared header, footer, event list, form logic |

## Deploy to Vercel

1. Create a new GitHub repository and upload everything in this folder.
2. In Vercel: **Add New → Project**, then import that repository.
3. Framework preset: **Other**. Leave the build settings blank. Click **Deploy**.
4. To change the free address: **Project → Settings → Domains**, then edit the `.vercel.app` name.

Every change you push to GitHub redeploys the site automatically.

## Placeholders to replace

- `site-data.js`: event titles, dates, prices, descriptions (all samples)
- `index.html`: "[##]+ Years Coaching" stat, coach photo
- `lessons.html`: lesson prices and pack size
- `about.html`: bios, Nolan's accomplishments, photos
- `camps.html`: FAQ answers (refund, waiver, spectator policy)

Search the files for `[` to find every placeholder.

## Turning on camp registration

1. In Stripe, create a **Payment Link** for the event (add custom fields for athlete name, age and weight).
2. Paste the link into that event's `registerUrl` in `site-data.js`.
3. Change the event's `status` to `"open"`.

## Turning on the lesson request form

Until this is set up, the form opens the visitor's email app instead.

1. Create a free account at formspree.io and make a new form.
2. Copy the form ID (the part after `/f/`) into `formspreeId` in `site-data.js`.
3. Requests will now arrive in your inbox.

## Adding photos

Put image files in an `images/` folder and replace each
`<div class="photo-ph">…</div>` with
`<img src="images/your-photo.jpg" alt="Short description" style="border-radius:4px">`.
Get written parent permission before posting photos of minors.
