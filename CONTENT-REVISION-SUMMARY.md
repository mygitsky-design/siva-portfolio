# Content & IA revision — summary

Branch: `content-revision` (not merged to `main`; live site unchanged).
Scope: copy + heading + light-IA revision. No visual system, layout, animation, carousel,
navigation, footer, or image-path changes. No metrics, dates, roles, or evidence changed.

## Global decisions applied

- **Retired repetitive constructions:** "From X to Y" headings, "X, not Y" headings,
  "Five decisions that…", "core promise", "moment of truth", "defensible system",
  "platform-level thinking", "revolutionized", and the salesy closers
  ("Want this depth of platform thinking…", "Looking for a leader who scopes with conviction?").
- **Kept a few sharp editorial lines** per page (e.g., "Admins could only find errors after publishing",
  "Two initiatives I led end to end.", "Experiment without risk.").
- **Ownership language:** "I" for synthesis / recommendations / frameworks / alignment / design
  direction / documentation; "we" for engineering, delivery, validation, outcomes. On Accessibility,
  the vendor's audit role is now explicit.
- **Voice anchor:** the "I usually start by understanding where the complexity is coming from" paragraph
  (the secondary voice box in the brief was left blank).

---

## Home (`index.html`)
- **Renamed:** csf section H2 "I lead platform transformations." → "Two initiatives I led end to end.";
  "What I lead" intro dropped the "…not deliverables." construction; capability card title
  "Publish with confidence." → "Testing before publishing." Why: reduce slogan framing.
- **Rewritten (no structure change):** hero supporting paragraph (more personal/concrete, keeps enterprise
  SaaS + AI-native + product strategy + cross-functional + measurable outcomes); all six "What I lead"
  cards rewritten with varied sentence structure so each says what I do and why.
- **Added:** none (no new sections).
- **Merged / removed:** None.
- **Image placeholders:** None.
- **Claims to verify:** `<!-- VERIFY CONTENT -->` added at the flagship stats (−58% setup time, 2× monthly
  growth, 100+ programs migrated, Zero live disruptions).

## About (`about/index.html`)
- **Added:** "How I work — Starting with where the complexity comes from" section (3 first-person
  paragraphs). Why: brief asked to make About the most personal page. No new facts; drawn from the voice
  paragraph + existing verifiable material. No new image.
- **Rewritten:** intro lead (IC→leadership, Gainsight design-system founder, 15-person team) — facts unchanged.
- **Renamed / merged / removed:** None (résumé timeline, education, contact untouched).
- Small CSS: added a `.prose` utility to `styles.css` for the new section's paragraph spacing.
- **Claims to verify:** None new (15+ years, Gainsight design system, 15-person team already on site).

## Journey Orchestrator (`journey-orchestrator/index.html`)
- **Renamed:** "From research to launch, decisions were earned, not assumed" → "How the decisions were made";
  "From whiteboard to product vision" → "Turning workshop notes into a product direction";
  "From prioritized signal to validated design" → "Designing against the ranked problems";
  "An intuitive workspace that simplifies complexity" → "A workspace built around how admins actually work";
  "Revolutionized program building" → "What the rebuild changed for admins";
  "Revolutionized program building, and the numbers showed it" → "What the rebuild moved";
  eyebrows "From sketch to shipped" → "The design process", "From frustration to flow" → "The change for admins".
- **Rewritten:** "revolutionized/reimagine" language replaced with specific product improvements; the
  Versioning & Testing band and outcomes intro reworded.
- **Added:** relationship framing in the Versioning & Testing band — "Program Versioning and Program Testing
  were two of the most complex capabilities in this transformation… documented separately as deeper case
  studies," with links to both. Why: brief's cross-case-study relationship guidance. No new image.
- **Merged / removed:** None. Carousel ("Working Sessions with Admins") untouched — content, arrows, votes,
  avatars, divider, behaviour unchanged.
- **Claims to verify:** `<!-- VERIFY CONTENT -->` added at the Outcomes section (setup-time reduction, monthly
  growth, programs migrated, live disruptions).

## Program Versioning (`program-versioning/index.html`)
- **Renamed:** "Three systemic questions, answered at the platform level" → "Three problems the model had to
  solve"; "Five decisions that made the system trustworthy" → "Key decisions in the versioning model";
  "Publish as a moment of truth…" → "A publish summary before anything goes live";
  "Edit as a copy, not in-place" → "Editing happens on a copy";
  "Skip, don't delete…" → "Steps are skipped, not deleted";
  "From community signal to a defensible system" → "Designing the versioning model";
  "From draft creation to a fully edited flow" → "The edited flow, end to end";
  "Years of community demand, resolved" → "A long-requested capability, shipped";
  "Systems thinking across four state spaces at once" → "Designing across four state spaces at once";
  CTA "Want this depth of platform thinking on your team?" → "Interested in working together?".
- **Rewritten (light IA):** the challenge intro now states the evolution explicitly — direct live-editing
  first considered → participant-state/analytics risk surfaced in engineering discussion → copy-based draft
  model. (This is the "what changed as we learned" reasoning, kept inline per the brief's "light changes" note.)
- **Added:** relationship sentence + backlink in the intro ("developed as part of the broader Journey
  Orchestrator transformation").
- **Merged / removed:** None.
- **Image placeholders:** None. (A pre-existing `<!-- TODO -->` comment at the concept-diagram figure was
  left as-is; the figure already has a real asset.)
- **Claims to verify:** 100+ tickets, three phases, zero active-program disruptions (existing figures — flagged, not changed).

## Program Testing (`program-testing/index.html`)
- **Renamed toward the 6-section flow** (context → MVP → design → constraints → shipped → outcomes) —
  achieved by renaming headings rather than physically reordering, to preserve every screenshot, error-state
  mock, and the `cs-progress` anchor map (#overview/#problem/#vision/#process/#decisions/#screens/#outcomes):
  "Publishing was a costly, irreversible experiment" → "Admins could only find errors after publishing";
  "PRD-first, prototype-first" → "Designing the test experience";
  "Five decisions that protected the core promise" → "Key decisions that shaped the test experience";
  "Separate view, not an overlay" → "A separate view instead of an overlay";
  "Real participants, not synthetic data" → "Testing with real participants";
  "Removing auto-sync, a trust decision" → "Removing auto-sync";
  "QA partnership, every state is a designed state" → "QA partnership on every state";
  "From entry to snapshot, the shipped flow" → "The shipped test flow";
  "Evidence of design leadership, not just execution" → "Where I led, and where the team delivered";
  "Prototype-first, before engineering POC" → "Prototyping before the engineering POC";
  CTA "Looking for a leader who scopes with conviction?" → "Interested in working together?".
- **Rewritten:** the "core promise / wasn't a failure / defensible" scoping copy → plain reasoning
  (deliberate scoping against the release window, rest documented for a later phase). Leadership-reflection line reworded.
- **Added:** relationship sentence + backlink in the intro.
- **Merged / removed:** No sections removed. The five decisions and all PRD/prototype/QA/error-state/test-mode
  content are preserved.
- **Claims to verify:** 50 tickets, ~4 months, "Released Nov 2025", GE-200868, 13 QA dimensions (existing — flagged, not changed).

## Accessibility Program (`accessibility-1/index.html`)
- **Renamed:** "Scattered signals, one missing strategy" → "Scattered signals, no owned strategy";
  "An audit revealed predictable violations" → "The vendor audit revealed predictable violations";
  "An operating model, not a list of bugs" → "Turning findings into an operating model";
  "From ambiguous to announced" → "Communicating the change to customers";
  "Component governance over one-off fixes" → "Fixing it at the component level";
  "Specified, not inferred" → "Specifying the accessible behaviour";
  "From periodic detection to embedded feedback" → "Building accessibility into the workflow";
  "Turning a churn risk into a trust signal" → "What it changed for customers";
  "The shift was predictability, not just polish" → "What actually changed";
  "Leading it, not just fixing it" → "Where I led the program"; eyebrow "From signals to a mandate" →
  "Making it a funded initiative"; CTA "Want accessibility built into the system, not bolted on?" →
  "Interested in working together?".
- **Ownership clarified:** the audit-section body now states the external vendor conducted the formal audit
  and documented the violations; my role (initiate, secure exec support, define scope, select/enable vendor,
  create architecture/documentation, establish governance) is unchanged.
- **Added / merged / removed:** None (structure and operational detail preserved).
- **Claims to verify:** VPAT documentation obtained, WCAG figures, high-ARR account retained (existing — flagged, not changed).

---

## Files changed
`index.html`, `about/index.html`, `journey-orchestrator/index.html`, `program-versioning/index.html`,
`program-testing/index.html`, `accessibility-1/index.html`, `styles.css` (added `.prose` utility only),
plus this summary.

## Not changed (as required)
Navigation, footer, image paths, carousels, the JO working-sessions carousel, scroll/reveal/sticky effects,
section anchors, layouts, responsive behaviour, and every metric/date/role/phase/outcome on the site.
