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

  /* ---------- Performance Platform (Skool) links ---------- */
  // Single source of truth: site-data.js. The href in the HTML is only a fallback
  // for the no-JS case, so changing the link in site-data.js is enough.
  if (S.performancePlatform) {
    document.querySelectorAll("a[data-skool]").forEach((a) => {
      a.href = S.performancePlatform;
      a.target = "_blank";
      a.rel = "noopener";
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
    const btn = form.querySelector("button[type=submit]");
    const $ = (id) => document.getElementById(id);
    const val = (id) => $(id).value.trim();
    const isSmallGroup = () => /small group/i.test($("type").value);
    const MIN_FILL_MS = 3000;
    let firstFocusAt = 0;
    let sending = false;

    // Each rule returns an error message, or "" when the field is fine.
    const rules = {
      parent: () => val("parent") ? "" : "Please enter your name so we know who to contact.",
      email: () => {
        const v = val("email");
        if (!v) return "Please enter your email so we can reply.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "That email doesn't look right. Please check it (example: name@gmail.com).";
      },
      phone: () => {
        const v = val("phone");
        if (!v) return "Please enter a phone number we can reach you at.";
        let digits = v.replace(/\D/g, "");
        if (digits.length === 11 && digits[0] === "1") digits = digits.slice(1);
        const ok = /^[\d\s().+-]+$/.test(v) && /^[2-9]\d{9}$/.test(digits);
        return ok ? "" : "Please enter a phone number we can reach you at, with area code (example: 815-555-0123).";
      },
      athlete: () => val("athlete") ? "" : "Please enter your athlete's name.",
      age: () => {
        const el = $("age");
        if (el.validity.badInput) return "Please enter your athlete's age as a number.";
        if (!val("age")) return "Please enter your athlete's age.";
        const n = Number(val("age"));
        return Number.isInteger(n) && n >= 4 && n <= 20 ? "" : "Lessons are for athletes ages 4 to 20. Please check the age.";
      },
      weight: () => {
        const el = $("weight");
        if (el.validity.badInput) return "Please enter weight as a number of pounds, or leave it blank.";
        if (!val("weight")) return "";
        const n = Number(val("weight"));
        return n >= 30 && n <= 400 ? "" : "Please enter a weight between 30 and 400 lbs, or leave it blank.";
      },
      partner: () => isSmallGroup() && !val("partner")
        ? "Small group lessons need a training partner of similar size. Please enter their name and weight." : "",
    };

    const showError = (id, msg) => {
      const el = $(id), err = $(id + "-error");
      err.textContent = msg;
      if (msg) el.setAttribute("aria-invalid", "true");
      else el.removeAttribute("aria-invalid");
    };
    const check = (id) => { const msg = rules[id](); showError(id, msg); return !msg; };

    // Pressing Send blurs the current field. Skip that blur check so a new error line
    // doesn't shift the button out from under the mouse and swallow the click.
    let pressingSend = false;
    btn.addEventListener("pointerdown", () => { pressingSend = true; });
    document.addEventListener("pointerup", () => setTimeout(() => { pressingSend = false; }));

    Object.keys(rules).forEach((id) => {
      const el = $(id);
      el.addEventListener("blur", () => { if (!pressingSend) check(id); });
      // Once a field is flagged, re-check as they type so the error clears the moment it's fixed.
      el.addEventListener("input", () => { if (el.getAttribute("aria-invalid")) check(id); });
    });
    $("type").addEventListener("change", () => {
      if (!isSmallGroup() || $("partner").getAttribute("aria-invalid")) check("partner");
    });
    form.addEventListener("focusin", () => { if (!firstFocusAt) firstFocusAt = Date.now(); });

    const setStatus = (html, cls) => { status.innerHTML = html; status.className = "form-status" + (cls ? " " + cls : ""); };
    const resetButton = () => { sending = false; btn.disabled = false; btn.textContent = "Send Request"; };

    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (sending) return;
      setStatus("", "");

      const invalid = Object.keys(rules).filter((id) => !check(id));
      if (invalid.length) { $(invalid[0]).focus(); return; }

      if (form.querySelector(".hp input").value) return; // spam bot
      if (!firstFocusAt || Date.now() - firstFocusAt < MIN_FILL_MS) {
        setStatus("Please take a moment to double-check your details, then press Send Request again.", "err");
        return;
      }

      sending = true;
      btn.disabled = true; btn.textContent = "Sending…";
      form.querySelectorAll("input:not([type=number]), textarea").forEach((el) => { el.value = el.value.trim(); });
      const data = new FormData(form);

      // No form service connected yet: fall back to opening an email.
      if (!S.formspreeId) {
        const body = [...data.entries()]
          .filter(([k]) => k !== "_gotcha")
          .map(([k, v]) => `${k}: ${v}`).join("\n");
        window.location.href = `mailto:${S.email}?subject=${encodeURIComponent("Private Lesson Request")}&body=${encodeURIComponent(body)}`;
        resetButton();
        return;
      }

      try {
        const res = await fetch(`https://formspree.io/f/${S.formspreeId}`, {
          method: "POST", body: data, headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error();
        const done = document.createElement("div");
        done.className = "form-success";
        done.setAttribute("role", "status");
        done.tabIndex = -1;
        done.innerHTML = `
          <h3>Request received</h3>
          <p>Thanks! Your lesson request came through. Nelson will follow up within 48 hours to confirm a time.</p>
          <p class="muted">Payment is due before the session by cash, check or Venmo. Questions in the meantime? Email <a href="mailto:${S.email}">${S.email}</a>.</p>`;
        form.replaceWith(done);
        done.focus();
      } catch {
        setStatus(`Sorry, your request didn't go through. Your answers are still here, so please try again, or email us directly at <a href="mailto:${S.email}">${S.email}</a>.`, "err");
        resetButton();
      }
    });
  }
})();
