/* ===========================================================
   SITE DATA — this is the only file you need to edit to update
   camps, clinics, contact info and links.
   =========================================================== */

window.SITE = {
  // --- Contact & links -----------------------------------------
  email: "bakerbroswrestling@gmail.com",
  phone: "",                       // e.g. "(815) 555-0123" — leave "" to hide
  instagram: "https://www.instagram.com/bakerbrosgrecoroman/",
  facebook: "https://www.facebook.com/profile.php?id=61585384074765",
  homeLocation: "The Forge — Rochelle, IL",

  // --- Private lesson request form -----------------------------
  // Create a free form at https://formspree.io, then paste its ID
  // here (the part after /f/ in the form URL, e.g. "xyzabcd").
  formspreeId: "mwlpokyq",
};

/* ------------------------------------------------------------
   CAMPS & CLINICS
   Add one block per event. Events automatically disappear from
   the site once their end date has passed.

   type:        "Camp" or "Clinic"
   start / end: "YYYY-MM-DD"  (end can equal start for one day)
   price:       number (dollars)
   registerUrl: your Stripe Payment Link. Leave "" to show
                "Registration opening soon".
   status:      "open", "full", or "soon"
   ------------------------------------------------------------ */
window.EVENTS = [
  {
    title: "Fall Greco Technique Clinic",          // PLACEHOLDER
    type: "Clinic",
    start: "2026-10-17",
    end: "2026-10-17",
    time: "9:00 AM – 12:00 PM",
    location: "The Forge — Rochelle, IL",
    ages: "Ages 8–18",
    price: 40,
    priceNote: "per athlete",
    spots: 30,
    status: "soon",
    registerUrl: "",
    description: "A focused three-hour session on Greco-Roman fundamentals: stance, hand fighting, body lock series and par terre defense.",
    includes: ["3 hours of mat time", "Technique handout", "Q&A with the coaches"],
  },
  {
    title: "Winter Break Mat Camp",                 // PLACEHOLDER
    type: "Camp",
    start: "2026-12-28",
    end: "2026-12-30",
    time: "9:00 AM – 3:00 PM daily",
    location: "The Forge — Rochelle, IL",
    ages: "Grades 3–12",
    price: 175,
    priceNote: "per athlete",
    spots: 40,
    status: "soon",
    registerUrl: "",
    description: "Three days of high-rep technique, live wrestling and conditioning to sharpen up for the second half of the folkstyle season.",
    includes: ["Two sessions per day", "Camp t-shirt", "Live wrestling by weight and skill"],
  },
  {
    title: "Spring Greco Camp",                      // PLACEHOLDER
    type: "Camp",
    start: "2027-04-10",
    end: "2027-04-11",
    time: "10:00 AM – 4:00 PM",
    location: "The Forge — Rochelle, IL",
    ages: "Ages 10–18",
    price: 125,
    priceNote: "per athlete",
    spots: 36,
    status: "soon",
    registerUrl: "",
    description: "Kick off the freestyle and Greco season with a two-day camp built around upper-body wrestling, throws and mat returns.",
    includes: ["Four sessions", "Film breakdown", "Camp t-shirt"],
  },
];
