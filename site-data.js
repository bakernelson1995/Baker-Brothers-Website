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

  // Skool community — leave "" to hide the nav tab
  performancePlatform: "https://www.skool.com/baker-bros-greco-roman-4869",

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
];
