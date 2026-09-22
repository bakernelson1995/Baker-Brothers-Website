/* Shared header, footer, event list and lesson form logic. */
(function () {
  const S = window.SITE || {};
  const page = document.body.dataset.page || "";

  /* ---------- header ---------- */
  const links = [
    ["index.html", "Home", "home"],
    ["camps.html", "Camps & Clinics", "camps"],
    ["lessons.html", "Private Lessons", "lessons"],
    ["about.html", "About", "about"],
  ];
  if (S.performancePlatform) links.push(["performance-platform.html", "Performance Platform", "performance"]);
  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <div class="container nav">
        <a class="logo" href="index.html" aria-label="Baker Bros Wrestling home">
          <img src="images/logo-white.png" alt="Baker Bros Wrestling" width="600" height="601">
        </a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">&#9776;</button>
        <ul class="nav-links">
          ${links.map(([href, label, key]) => {
            const external = href.startsWith("http");
            return `<li><a href="${href}" class="${key === page ? "active" : ""}"${external ? ' target="_blank" rel="noopener"' : ""}>${label}</a></li>`;
          }).join("")}
          <li><a class="btn" href="lessons.html#request">Book a Lesson</a></li>
        </ul>
      </div>`;
    const toggle = header.querySelector(".nav-toggle");
    const menu = header.querySelector(".nav-links");
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.innerHTML = open ? "&times;" : "&#9776;";
    });
  }

  /* ---------- footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    const social = [
      S.instagram && `<li><a href="${S.instagram}" target="_blank" rel="noopener">Instagram</a></li>`,
      S.facebook && `<li><a href="${S.facebook}" target="_blank" rel="noopener">Facebook</a></li>`,
    ].filter(Boolean).join("");
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="logo logo-footer" href="index.html" aria-label="Baker Bros Wrestling home"><img src="images/logo-white.png" alt="Baker Bros Wrestling" width="600" height="601"></a>
            <p class="muted" style="margin-top:14px;max-width:340px">Camps, clinics and private lessons from state-champion coaches. Based in Rochelle, Illinois.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>${links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:${S.email}">${S.email}</a></li>
              ${S.phone ? `<li><a href="tel:${S.phone.replace(/[^\d+]/g, "")}">${S.phone}</a></li>` : ""}
              <li class="muted">${S.homeLocation || ""}</li>
              ${social}
            </ul>
          </div>
        </div>
        <div class="copyright">© ${new Date().getFullYear()} Baker Bros Wrestling. All rights reserved.</div>
      </div>`;
  }

  /* ---------- events ---------- */
  const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const today = new Date(); today.setHours(0, 0, 0, 0);

  function upcoming() {
    return (window.EVENTS || [])
      .filter((e) => parse(e.end || e.start) >= today)
      .sort((a, b) => parse(a.start) - parse(b.start));
  }

  function dayRange(e) {
    const s = parse(e.start), en = parse(e.end || e.start);
    if (+s === +en) return String(s.getDate());
    if (s.getMonth() === en.getMonth()) return `${s.getDate()}–${en.getDate()}`;
    return `${s.getDate()}+`;
  }
  function fullDate(e) {
    const opt = { weekday: "short", month: "short", day: "numeric" };
    const s = parse(e.start), en = parse(e.end || e.start);
    return +s === +en ? s.toLocaleDateString("en-US", opt)
      : `${s.toLocaleDateString("en-US", opt)} – ${en.toLocaleDateString("en-US", opt)}`;
  }

  function cta(e) {
    if (e.status === "full") return `<span class="btn disabled">Sold Out</span>`;
    if (e.status === "open" && e.registerUrl)
      return `<a class="btn" href="${e.registerUrl}" target="_blank" rel="noopener">Register</a>`;
    return `<span class="btn disabled">Opening Soon</span>`;
  }

  function eventHTML(e, compact) {
    const s = parse(e.start);
    const cls = e.type.toLowerCase() === "clinic" ? "event clinic" : "event";
    return `
      <article class="${cls}">
        <div class="event-date">
          <span class="m">${MONTHS[s.getMonth()]}</span>
          <span class="d">${dayRange(e)}</span>
          <span class="y">${s.getFullYear()}</span>
        </div>
        <div>
          <span class="tag">${e.type}</span>
          <h3>${e.title}</h3>
          <div class="meta">
            <span><b>When:</b> ${fullDate(e)}${e.time ? ", " + e.time : ""}</span>
            <span><b>Where:</b> ${e.location}</span>
            <span><b>Who:</b> ${e.ages}</span>
          </div>
          ${compact ? "" : `<p class="muted" style="margin:10px 0 8px">${e.description || ""}</p>
          ${e.includes && e.includes.length ? `<div class="meta">${e.includes.map((i) => `<span>✓ ${i}</span>`).join("")}</div>` : ""}`}
        </div>
        <div class="event-cta">
          <div class="price">$${e.price}<small>${e.priceNote || ""}</small></div>
          ${cta(e)}
          ${e.spots && e.status !== "full" ? `<div class="spots">Limited to ${e.spots} athletes</div>` : ""}
        </div>
      </article>`;
  }

  const list = document.getElementById("event-list");
  if (list) {
    const limit = Number(list.dataset.limit || 0);
    const compact = list.dataset.compact === "true";
    let filter = "all";
    const render = () => {
      let evs = upcoming();
      if (filter !== "all") evs = evs.filter((e) => e.type.toLowerCase() === filter);
      if (limit) evs = evs.slice(0, limit);
      list.innerHTML = evs.length
        ? evs.map((e) => eventHTML(e, compact)).join("")
        : `<div class="empty">Camps and clinics coming soon — follow us on Instagram <a href="${S.instagram}" target="_blank" rel="noopener">@bakerbrosgrecoroman</a> for dates.</div>`;
    };
    document.querySelectorAll(".filter").forEach((btn) =>
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filter = btn.dataset.filter;
        render();
      }));
    render();
  }

  /* ---------- lesson request form ---------- */
  const form = document.getElementById("lesson-form");
  if (form) {
    const status = document.getElementById("form-status");
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      status.className = "form-status";
      if (form.querySelector(".hp input").value) return; // spam bot
      const data = new FormData(form);

      // No form service connected yet: fall back to opening an email.
      if (!S.formspreeId) {
        const body = [...data.entries()]
          .filter(([k]) => k !== "_gotcha")
          .map(([k, v]) => `${k}: ${v}`).join("\n");
        window.location.href = `mailto:${S.email}?subject=${encodeURIComponent("Private Lesson Request")}&body=${encodeURIComponent(body)}`;
        return;
      }

      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const res = await fetch(`https://formspree.io/f/${S.formspreeId}`, {
          method: "POST", body: data, headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error();
        form.reset();
        status.textContent = "Request received. We'll reach out within 48 hours to set up a time.";
        status.className = "form-status ok";
      } catch {
        status.innerHTML = `Something went wrong. Please email us at <a href="mailto:${S.email}">${S.email}</a>.`;
        status.className = "form-status err";
      } finally {
        btn.disabled = false; btn.textContent = "Send Request";
      }
    });
  }
})();
