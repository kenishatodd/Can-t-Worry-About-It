# Leadership Capacity Blog Hub

Build a lightweight SEO content hub that attracts high-achieving women and leaders to CWAI through search, then guides them into the app.

## What we're building

- `/blog` — index of articles, optimized for leadership + capacity + stress-at-work keywords.
- 3 launch articles targeting the strongest search opportunities from Semrush:
  1. "How to Reduce Stress at Work" (high volume, broad problem-aware)
  2. "How to Manage Anxiety at Work" (solid volume, overlaps with CWAI's calm tools)
  3. "What Is Emotional Capacity?" (niche, easy to own, directly branded to CWAI)
- Article pages at `/blog/:slug` with clean editorial styling matching the CWAI brand.
- Navigation link to the hub from the main nav and bottom nav.
- SEO metadata in `index.html` plus per-article Helmet tags.

## Why these articles

Semrush shows strong demand for work-stress and work-anxiety queries, while "emotional capacity" has almost no competition. The hub captures both: high-volume problem searches and low-competition branded-positioning searches.

## Technical approach

- Store articles as a typed array in `src/data/blogPosts.ts` (no backend needed for launch).
- Use `react-helmet-async` for per-article `<title>`, `<meta name="description">`, canonical, and Open Graph tags.
- Wrap the app in `HelmetProvider` in `src/main.tsx`.
- Remove the static canonical from `index.html` so each route owns it.
- Keep the existing visual brand: Warm Ivory, Black, CWAI Yellow; Playfair Display, Inter, Caveat.
- Each article ends with a CTA to the Capacity Checker or Guide.

## Out of scope

- No CMS/backend for posts (can be added later if publishing becomes regular).
- No comments or social sharing widgets.
- No new images beyond the existing brand assets.

## Success check

- Build passes.
- `/blog` renders the article list with an H1.
- Each article page has unique title/description in the head.
- Navigation links work on desktop and mobile.
