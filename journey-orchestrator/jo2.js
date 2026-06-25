/* ============================================================
   Journey Orchestrator v2 — premium motion layer.
   Runs after /script.js. Progressive: if GSAP or motion is
   unavailable, all content is shown statically.
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showAll = () => {
    document.querySelectorAll(".jo2-bnode, .jo2-bconn").forEach((n) => n.classList.add("is-on"));
    document.querySelectorAll(".jo2-draw").forEach((p) => (p.style.strokeDashoffset = "0"));
  };

  if (reduce || !(window.gsap && window.ScrollTrigger)) { showAll(); return; }

  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- Parallax depth layers ---------- */
  gsap.utils.toArray("[data-jo2-parallax]").forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-jo2-parallax")) || 0.2; // -1..1
    gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  });

  /* ---------- Gentle ambient float ---------- */
  gsap.utils.toArray("[data-jo2-float]").forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 ? 14 : -14,
      duration: 4 + (i % 3),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.25,
    });
  });

  /* ---------- Signature build: pin + scrub node reveal ---------- */
  const build = document.querySelector("[data-jo2-build]");
  if (build) {
    const steps = gsap.utils.toArray(".jo2-bnode, .jo2-bconn", build);
    const stage = build.querySelector(".jo2-build__stage");
    const caps = gsap.utils.toArray("[data-jo2-cap]", build);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: build, start: "top top", end: "+=" + (steps.length * 320), scrub: 0.6, pin: stage || build, anticipatePin: 1 },
    });
    steps.forEach((s) => tl.to(s, { opacity: 1, y: 0, scale: 1, duration: 0.4, onStart: () => s.classList.add("is-on"), onReverseComplete: () => s.classList.remove("is-on") }, ">-0.1"));
    // swap captions across the scroll
    if (caps.length) {
      caps.forEach((c, i) => {
        ScrollTrigger.create({
          trigger: build, start: "top top", end: "+=" + (steps.length * 320),
          onUpdate: (self) => {
            const idx = Math.min(caps.length - 1, Math.floor(self.progress * caps.length));
            caps.forEach((cc, j) => (cc.style.opacity = j === idx ? "1" : "0"));
          },
        });
      });
    }
  }

  /* ---------- Adoption: draw the growth line on scroll ---------- */
  document.querySelectorAll(".jo2-draw").forEach((path) => {
    const len = path.getTotalLength ? path.getTotalLength() : 1000;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    const area = path.parentNode.querySelector(".jo2-adopt__area");
    gsap.to(path, {
      strokeDashoffset: 0, ease: "none",
      scrollTrigger: { trigger: path.closest("section"), start: "top 65%", end: "bottom 70%", scrub: 0.8 },
    });
    if (area) gsap.to(area, { opacity: 1, ease: "none", scrollTrigger: { trigger: path.closest("section"), start: "top 60%", end: "center 60%", scrub: 1 } });
  });

  /* ---------- Refresh after media settles ---------- */
  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
