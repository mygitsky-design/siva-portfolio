# sky — Design Leadership Portfolio

A hand-built, production-ready portfolio for a design leader. Rebuilt from a Framer
export with the goal of preserving every piece of content and the narrative structure,
while dramatically improving **maintainability, accessibility, SEO, and performance**.

No Framer. No Tailwind. No Bootstrap. No build step — just semantic HTML, modern CSS,
and a small progressive-enhancement layer with GSAP.

---

## Structure

```
project/
├── index.html        # Home — positioning, focus areas, selected work, metrics
├── about.html        # Leadership narrative, focus areas, approach
├── case-study.html   # Journey Orchestrator — the reusable case-study template
├── contact.html      # Contact methods
├── styles.css        # Design system + all component/page styles
├── script.js         # Progressive enhancement (reveals, nav, theme, counters)
├── assets/           # Optimized images (localized from the original export)
└── README.md
```

## Running locally

It's a static site — open `index.html` directly, or serve the folder:

```bash
cd project
python3 -m http.server 8000
# visit http://localhost:8000
```

## Design system

All tokens live at the top of `styles.css` under `:root`:

- **Typography** — system font stack (renders as SF Pro on Apple, Segoe on Windows)
  with a fluid `clamp()` type scale. Swap in Inter by adding a `@font-face` / Google
  Fonts link and putting it first in `--font-sans`.
- **Color** — near-black ink on warm off-white, a restrained iris accent, and full
  **light/dark** support (auto via `prefers-color-scheme` + a manual toggle persisted
  to `localStorage`). All text pairings target WCAG AA contrast.
- **Spacing** — 4px-based scale; section rhythm via `--section-y`.
- **Components** — buttons, eyebrows, cards, stats, pills, figures, nav, footer,
  plus case-study-specific patterns (opportunity cards, process steps, metrics band).

## Accessibility (target: WCAG AA)

- Skip link, semantic landmarks (`header`/`main`/`nav`/`footer`/`article`).
- One `<h1>` per page and a logical heading hierarchy.
- Descriptive `alt` text on every meaningful image; decorative SVGs are `aria-hidden`.
- Keyboard-operable nav, mobile menu (`aria-expanded`), and visible focus styles.
- `aria-current="page"` on the active nav item.
- Full `prefers-reduced-motion` support — all reveals/counters/progress disable and
  content shows immediately.

## Performance

- No render-blocking web fonts; CSS is a single file; JS is deferred.
- GSAP loads from CDN with `defer`; if it never loads, an `IntersectionObserver`
  fallback runs the reveals, and if JS is off entirely the content is fully visible.
- Images are resized/compressed and lazy-loaded (the LCP hero image is preloaded and
  eager). For an extra step, convert `assets/*` to AVIF/WebP and add `<picture>`.

## Animations

GSAP + ScrollTrigger power subtle, professional motion:

- Scroll-reveal fades with staggered children (`[data-stagger]` groups).
- Sticky, blur-backed navigation with a scroll-state border.
- A top scroll-progress bar and a sticky section-progress nav on the case study.
- Animated metric counters. Everything is gated behind reduced-motion.

## Reusing the case-study template

`case-study.html` is structured as a repeatable template: an overview/role block,
challenge + goal, research (stats + pain points), a vote-ranked opportunities list,
process steps, a solutions grid, and an outcomes/metrics section. To add a second
case study, copy the file, swap the content and `assets/`, and link it from
`index.html`'s "Selected work" section.

## Things to personalize before launch

- **Identity** — the site uses the **"sky"** brand. Replace with a full name in the
  `<title>`, headings, and JSON-LD if/when desired.
- **Links** — update the LinkedIn URL (currently a placeholder) and the canonical
  domain (`theskydesigns.com`) across the four pages.
- **Profile photo** — `assets/profile.jpg` came from the original export; swap in a
  current headshot.

## Content provenance

All copy and metrics are derived from the original **Journey Orchestrator** case study
and reframed to foreground design-leadership contributions. No achievements or numbers
were invented — figures (−58% setup time, +30% satisfaction, +12% adoption, −12%
tickets, 2%→4% monthly customer growth) are carried over verbatim from the source.
