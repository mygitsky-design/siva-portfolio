/* =============================================================
   sky — Portfolio interactions
   Progressive enhancement: the site is fully usable without JS.
   GSAP + ScrollTrigger drive reveals; everything degrades.
   ============================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme toggle ---------- */
  (function theme() {
    const KEY = "sky-theme";
    const btn = document.querySelector("[data-theme-toggle]");
    const saved = localStorage.getItem(KEY);
    if (saved) root.setAttribute("data-theme", saved);

    function current() {
      const set = root.getAttribute("data-theme");
      if (set) return set;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    function sync() {
      if (btn) btn.dataset.mode = current();
    }
    sync();
    if (btn) {
      btn.addEventListener("click", () => {
        const next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem(KEY, next);
        sync();
      });
    }
  })();

  /* ---------- Mobile menu ---------- */
  (function menu() {
    const burger = document.querySelector("[data-burger]");
    const links = document.querySelector("[data-nav-links]");
    if (!burger || !links) return;

    function close() {
      links.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
    burger.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) close();
    });
  })();

  /* ---------- Nav border on scroll ---------- */
  (function navScroll() {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  })();

  /* ---------- Top scroll-progress bar ---------- */
  (function progressBar() {
    const bar = document.querySelector("[data-scroll-progress]");
    if (!bar || prefersReduced) return;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
  })();

  /* ---------- Reveal animations (GSAP if present, IO fallback) ---------- */
  (function reveal() {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length || prefersReduced) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const hasGSAP = window.gsap && window.ScrollTrigger;
    if (!hasGSAP) {
      root.classList.add("no-gsap");
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
      );
      els.forEach((el) => io.observe(el));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Group children of [data-stagger] for staggered entrances.
    const staggerGroups = new Set(
      Array.from(document.querySelectorAll("[data-stagger]"))
    );

    staggerGroups.forEach((group) => {
      const items = group.querySelectorAll("[data-reveal]");
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: "top 82%" },
        onStart: () => items.forEach((i) => i.classList.add("is-in")),
      });
    });

    els.forEach((el) => {
      if (el.closest("[data-stagger]")) return; // handled above
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onStart: () => el.classList.add("is-in"),
      });
    });
  })();

  /* ---------- Case-study section progress nav ---------- */
  (function sectionNav() {
    const links = Array.from(document.querySelectorAll("[data-section-link]"));
    if (!links.length) return;
    const map = new Map();
    links.forEach((l) => {
      const id = l.getAttribute("href").slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, l);
    });
    if (!map.size) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove("is-active"));
            const link = map.get(entry.target);
            if (link) link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    map.forEach((_, sec) => io.observe(sec));
  })();

  /* ---------- Animated metric counters ---------- */
  (function counters() {
    const nums = Array.from(document.querySelectorAll("[data-count]"));
    if (!nums.length) return;
    if (prefersReduced) {
      nums.forEach((n) => (n.textContent = n.dataset.count));
      return;
    }
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const dur = 1200;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toString();
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toString();
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((n) => io.observe(n));
  })();

  /* ---------- Carousels: arrow visibility + locked-divider alignment ---------- */
  (function carousels() {
    document.querySelectorAll("[data-carousel]").forEach((track) => {
      const wrap = track.closest("[data-carousel-wrap]") || track.parentElement;
      const prev = wrap.querySelector("[data-carousel-prev]");
      const next = wrap.querySelector("[data-carousel-next]");

      const step = () => {
        const card = track.querySelector(":scope > *");
        const gap = parseFloat(getComputedStyle(track).columnGap || "16") || 16;
        return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
      };
      const update = () => {
        if (!prev || !next) return;
        const max = track.scrollWidth - track.clientWidth - 2;
        prev.disabled = track.scrollLeft <= 2;       // hidden at the start
        next.disabled = track.scrollLeft >= max;     // hidden at the end
      };
      if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
      if (next) next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));

      // Equalize each card's top section so the dotted divider locks to the same Y.
      const equalize = () => {
        const cards = Array.from(track.querySelectorAll(".session-card"));
        if (!cards.length) return;
        const heads = [], bodies = [];
        cards.forEach((c) => {
          const h = c.querySelector(".session-card__head");
          const b = h && h.nextElementSibling;        // the lead + details block
          if (h) { h.style.minHeight = "0"; heads.push(h); }
          if (b) { b.style.minHeight = "0"; bodies.push(b); }
        });
        let mh = 0, mb = 0;
        heads.forEach((h) => (mh = Math.max(mh, h.getBoundingClientRect().height)));
        bodies.forEach((b) => (mb = Math.max(mb, b.getBoundingClientRect().height)));
        heads.forEach((h) => (h.style.minHeight = Math.ceil(mh) + "px"));
        bodies.forEach((b) => (b.style.minHeight = Math.ceil(mb) + "px"));
      };

      const refresh = () => { equalize(); update(); };
      track.addEventListener("scroll", update, { passive: true });

      let t;
      window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(refresh, 120); }, { passive: true });
      window.addEventListener("load", refresh);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
      refresh();
    });
  })();

  /* ---------- Current year ---------- */
  (function year() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  })();
})();
