# Curiosity Passport

*"Your curiosity is your experience."*

An interactive demo of the Curiosity Passport concept: students turn deep,
self-directed questions into a living portfolio of curiosity trails,
projects, and field notes that hiring teams can explore before ever seeing a
resume. Includes a gamified **Field Office** layer (XP, ranks, collectable
stamp achievements, weekly meetings, and side quests) with a persistent local
field log, plus a light/dark theme.

## Stack

React 19 + Vite, styled with a hand-rolled editorial design system
(`src/index.css`) in a heritage palette — forest green, warm cream,
explorer brass, sage. No router; views are React-state driven. No backend —
all persistence (field log, theme) is per-browser `localStorage`.

## Run locally

```bash
npm install
npm run dev        # dev server (Vite)
npm run build      # production build to dist/
npm run lint       # oxlint
```

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
    curiosityTrailData.js the 5 exploration trails
    gamificationData.js   rank ladder, XP table, stamp/meeting/quest catalogs
  hooks/
    useFieldLog.js        persistent localStorage field log (XP, stamps, streak,
                          attendance, notes, reviews, inquiries, shortlist, invites)
  components/             views + the Field Office, stamp collection, rank meter,
                          review prompt, rank-up ceremony, theme toggle
```

## Resetting the demo

Open the header's rank meter → **Stamp Collection** → **Reset Field Log** to
wipe the local XP/stamps/notes. Clearing site data (DevTools → Application →
Local Storage) does the same. The theme choice is stored separately under
`curiosity-passport-theme`.
