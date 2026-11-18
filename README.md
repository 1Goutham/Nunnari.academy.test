# Nunnari Academy — Website

Next.js (App Router, TypeScript) site for Nunnari Academy — School of AI.
Light theme in the brand ink-violet tones, one brand violet. Workshop cards use dark line art; every other panel is a small interactive scene of the real thing (a lesson player, a 12-week tracker, partner figures, a calendar) built from the site's own data, and the home hero shows the Nunnari mark as a live network.

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
  ui/Art.tsx             illustration panel: line art (lib/art.ts) or a scene (ui/Vignette.tsx; names in lib/scenes.ts)
  templates/             ProgramPage, PartnerPage, LegalPage: pages of the same kind share one template
  sections/              home sections (Hero, WhyCards, WhoWeAre, Company, Impact, ProgramsCatalog …)
  events/                workshop card, carousel, list, spotlight, YouTube, add-to-calendar
  Header, Footer, Enquiry (contact form), Effects (scroll reveals, counters, workshop state)
lib/                     all content: site & nav, programs, partners, legal, testimonials, workshop loader
styles/theme.css         the whole design system (tokens at the top)
public/assets/           brand logos, partner college logos, illustrations
```

## Common edits

- **Programme content:** `lib/programs.ts`. All three programme pages and the home catalogue read from it.
- **Partner pages (offers, logos, stats, quotes):** `lib/partners.ts`.
- **Contact details, socials, navigation:** `lib/site.ts`.
- **Colours:** the tokens at the top of `styles/theme.css`.
- **Contact form:** posts to `app/api/enquiry/route.ts`. Set `ENQUIRY_WEBHOOK_URL` in Vercel to forward submissions to your CRM, Google Sheet, Zapier or Slack.
- **Brochures:** put the PDFs in `public/brochures/` and set their paths in `lib/programs.ts` (`brochures`).

## Performance

- Every page is static HTML. Native scrolling. No animation library.
- The hero background is a WebGL shader rendered at low resolution. It pauses off screen and falls back to CSS when WebGL is unavailable.
- Scenes are plain HTML and CSS; their small animations run only while on screen. The hero network is one 2D canvas that pauses off screen. Both hold still under reduced motion.
- Line-art animations pause off screen. All motion is off for visitors with `prefers-reduced-motion`.

## SEO

- **Page metadata**: every page calls `pageMeta()` (`lib/seo.ts`) for its title, description, canonical and social tags. Keep titles under ~60 characters and descriptions at 140–160.
- **Share images**: `opengraph-image.tsx` files render branded 1200×630 images at build time (`lib/og.tsx`). Add one to a route folder to give that page its own image, and list the path in `OWN_IMAGE` in `lib/seo.ts`.
- **Structured data**: `lib/schema.ts` builds schema.org data from the site's own content (Organization and WebSite on every page; Course, FAQPage and BreadcrumbList on program pages; EducationEvent on workshops). Update the content, not the schema.
- **Program URLs** come from `slug` in `lib/programs.ts` (use `programPath()`). If a slug changes, add a permanent redirect in `next.config.ts`.
- **Crawl files**: `app/sitemap.ts`, `app/robots.ts` and `/llms.txt` (`app/llms.txt/route.ts`, a plain-text brief for AI assistants) are generated from the same data.
- **After launch**: verify the domain in Google Search Console and Bing Webmaster Tools and submit `https://nunnari.academy/sitemap.xml`.
