# Curiosity Passport

*"Your curiosity is your experience."*

An interactive demo of the Curiosity Passport concept: students turn deep,
self-directed questions into a living portfolio of curiosity trails,
projects, and field notes that hiring teams can explore before ever seeing a
resume. Includes a gamified **Field Office** layer (XP, ranks, collectable
stamp achievements, weekly meetings, and side quests) with a persistent local
field log, plus a light/dark theme.

**In the demo:** 9 exploration trails across a 3-student cohort, a "you"
passport with a live trail ledger and an open-question writer, an employer
discovery view with a shortlist and a Sent → Replied → Interview → Offer
invite pipeline, a 90-second guided tour for first-time visitors, a weekly
Field Office cycle with re-attendance, and — from the stamp collection — a
one-click **demo portfolio** seed plus export / import of your field log as
JSON and a printable one-page **Curiosity Report**.

## Stack

React 19 + Vite, styled with a hand-rolled editorial design system
(`src/index.css`) in a heritage palette — forest green, warm cream,
explorer brass, sage. No router; views are React-state driven. No backend —
all persistence (field log, theme) is per-browser `localStorage`.

## Run locally

```bash
npm install
npm run dev        # dev server (Vite)
npm run build      # production build to dist/ (also runs the data check)
npm run test       # vitest suite for the gamification engine
npm run lint       # oxlint
npm run check:data # trail data consistency check (studentsData ↔ curiosityTrailData)
```

The `check:data` script fails the build if the two trail data files drift
(a trail referenced but not defined, a milestone count that no longer matches
the trail's node count, or a trail with no owner).

## Deploy to Cloudflare Pages

The project builds to `dist/` and is configured for Cloudflare Pages via
`wrangler.jsonc` (build output = `dist`, no server-side redirects needed).

### Option A — Wrangler CLI (from this folder)

```bash
npm run deploy          # build + upload dist/ to the "curiosity-passport" project
```

First run opens a browser OAuth flow: log in, allow access, and confirm the
account. After that, `npm run deploy` is repeatable.

Useful one-offs:

```bash
npx wrangler pages project create curiosity-passport   # only if the project doesn't exist yet
npx wrangler pages deploy dist --branch main            # deploy to the main (published) branch
npx wrangler pages secret create CLOUDFLARE_API_TOKEN   # optional token for CI
```

### Option B — Dashboard / Git integration (continuous deploys)

1. Push this folder to a Git repo.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command: `npm run build` (or just `vite build`)
4. Build output directory: `dist`
5. Framework preset: **Vite**

Every push then builds and deploys automatically.

## Project structure

```
src/
  App.jsx                 view router, field log, toasts, theme
  data/
    studentsData.js       the cohort (Alex, Priya, Marcus + the "you" record)
    curiosityTrailData.js the 9 exploration trails + derived switcher list
    gamificationData.js   rank ladder, XP table, stamp/meeting/quest catalogs
  hooks/
    useFieldLog.js        persistent localStorage field log (XP, stamps, streak,
                          attendance, notes, reviews, inquiries, shortlist, invites,
                          week cycle, tour, export/import, demo seed)
    useModalBehavior.js   accessible-dialog behavior (focus, Escape, labelled)
  lib/
    scrollToTop.js        smooth-scroll that honors prefers-reduced-motion
  components/             views + the Field Office, stamp collection, rank meter,
                          review prompt, rank-up ceremony, theme toggle, tour card,
                          Curiosity Report, demo-seed control
scripts/
  check-trail-consistency.mjs   build-time guard against trail-data drift
test/
  useFieldLog.test.js / gamificationData.test.js   vitest suite for the engine
```

## Resetting / carrying the demo

Open the header's rank meter → **Stamp Collection** to:
- **Load demo portfolio** — one click fills the log with a rich sample
  portfolio (9 trails, a full meeting week, filed quests, a review, an
  open question, and a pipeline with an offer).
- **Export / Import** — download or restore the field log as JSON.
- **Curiosity Report** — the printable one-page career artifact.
- **Reset Field Log** — wipe the local XP/stamps/notes.

Clearing site data (DevTools → Application → Local Storage) also wipes the
log. The theme choice is stored separately under `curiosity-passport-theme`.
