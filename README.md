# Nunnari Academy — Website

Next.js (App Router, TypeScript) site for Nunnari Academy — School of AI.
Designed with the Hallmark skill (theme: Grid, carrying the Nunnari brand): violet-tinted white paper, the brand ink, the brand violet as a flooded colour field, one vermilion mark for what is current, Radio Canada Big over Radio Canada, square corners and no boxed cards. Workshop cards keep their dark line art; programme and partner panels show interactive particle formations on the violet field.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every page is pre-built static HTML)
npm start          # serve the production build
npm run typecheck
```

Requires Node 22. Vercel detects it as a Next.js project automatically.

## Add a workshop (no code)

Workshops work like the Nunnari Labs blog: one markdown file per workshop in `content/workshops/`.

1. Copy `content/workshops/_TEMPLATE.md` and rename it, e.g. `intro-to-rag.md`. The file name becomes the page address: `/workshops/intro-to-rag`.
2. Fill in the details at the top: title, description, start and end time, mode, speaker, which line art to use, and `draft: false`.
3. Commit. The workshop appears on Home and Explore and gets its own page.

Before the start time the card shows **Register Now**. While the event is running it shows **Registration closed**. Afterwards it shows **Watch recording** or **View summary**. The state is checked in the visitor's browser, so it updates without a rebuild.

After the event, paste the YouTube link into `youtube:` and write the summary under the `---` (markdown). The workshop page then shows the recording followed by the summary.

## Structure

```
app/                     one folder per route; programs/layout.tsx adds the sticky "Still confused?" bar
  workshops/[slug]/      workshop pages, generated from content/workshops
content/workshops/       workshop markdown files
components/
  ui/Blocks.tsx          the shared page parts: PageHero, Head (section heading), Card, Cta
  ui/Art.tsx             illustration panel: line art (lib/art.ts) or particles (ui/Particles.tsx → lib/particles)
  templates/             ProgramPage, PartnerPage, LegalPage: pages of the same kind share one template
  sections/              home sections (Hero, WhyCards, WhoWeAre, Company, Impact, ProgramsCatalog …)
  events/                workshop card, carousel, list, spotlight, YouTube, add-to-calendar
  Header, Footer, Enquiry (contact form), Effects (scroll reveals, counters, workshop state)
lib/                     all content: site & nav, programs, partners, legal, testimonials, workshop loader
app/tokens.css           every colour, font and spacing token (Hallmark scaffold, brand values)
app/base.css             base rules (Hallmark scaffold)
styles/theme.css         the components
app/globals.css          the Hallmark stamp (decisions, waivers) and the imports
.hallmark/               Hallmark's build log; screenshots and before/after records stay local
public/assets/           brand logos, partner college logos, illustrations
```

## Common edits

- **Programme content:** `lib/programs.ts`. All three programme pages and the home catalogue read from it.
- **Partner pages (offers, logos, stats, quotes):** `lib/partners.ts`.
- **Contact details, socials, navigation:** `lib/site.ts`.
- **Colours, fonts, spacing:** `app/tokens.css`.
- **Design checks:** `node .claude/skills/hallmark/scripts/sloplint.mjs app components styles --genre editorial --render --url http://localhost:3000/` (the render tier needs `puppeteer-core` and Chrome).
- **Contact form:** posts to `app/api/enquiry/route.ts`. Set `ENQUIRY_WEBHOOK_URL` in Vercel to forward submissions to your CRM, Google Sheet, Zapier or Slack.
- **Brochures:** put the PDFs in `public/brochures/` and set their paths in `lib/programs.ts` (`brochures`).

## Performance

- Every page is static HTML. Native scrolling. No animation library.
- The hero background is a WebGL shader rendered at low resolution. It pauses off screen and falls back to CSS when WebGL is unavailable.
- Particle illustrations are one WebGL draw call each, load only near the viewport, rest while the page scrolls, and stop off screen. Without WebGL they draw once as a still image.
- Line-art animations pause off screen. All motion is off for visitors with `prefers-reduced-motion`.
