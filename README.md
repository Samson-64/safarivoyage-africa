# SafariVoyage Africa

A luxury African travel front-end for browsing destinations, curated guided tours, and wildlife guides — with a complete client-side booking flow. Built as a single-page React application; no backend required.

## Features

- **Hero carousel** — auto-playing showcase of ten African destinations (Serengeti, Victoria Falls, Giza, Okavango Delta, Kilimanjaro, Sossusvlei, Bwindi, Zanzibar, Marrakech, Cape Town)
- **Search & filtering** — full-text search, region pills, activity type, duration buckets, difficulty, max-budget slider, and multiple sort options
- **Guided tour packages** — day-by-day itineraries, inclusions/exclusions, group size, guide languages, and per-tour pricing
- **4-step booking flow** — dates/tier/guests, optional add-ons, traveler details, and a printable boarding-pass confirmation with `.ics` calendar export
- **My Bookings portal** — lists confirmed expeditions saved in the browser
- **Big Five wildlife spotter** — interactive field dossiers for lion, leopard, elephant, rhino, and buffalo
- **Editorial stories** — conservation and community impact storytelling sections
- **Localization** — English, French, Kiswahili, Spanish, German, and Arabic UI strings (`src/utils/translations.ts`)
- **Multi-currency pricing** — USD, EUR, GBP, KES, ZAR, EGP with fixed display rates
- **Ambient soundscape** — procedurally synthesized savanna audio via the Web Audio API (no audio files)

Bookings and newsletter signups are stored in `localStorage` only — this is a demo front-end with no server integration.

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite 6](https://vite.dev) | Dev server & bundler |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling (via `@tailwindcss/vite`) |
| [Motion](https://motion.dev) | Animations & transitions |
| [Lucide](https://lucide.dev) | Icon set |

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open the URL printed in the terminal (defaults to `http://localhost:5173`).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check only (`tsc --noEmit`) |

## Project Structure

```
├── index.html                      # Entry HTML (fonts, meta tags)
├── vite.config.ts                  # Vite config (React, Tailwind, @ alias)
├── tsconfig.json
└── src/
    ├── main.tsx                    # React root
    ├── App.tsx                     # Layout, state, filtering logic
    ├── index.css                   # Tailwind theme, fonts, scrollbar styles
    ├── types.ts                    # Shared domain types
    ├── data/
    │   └── africanData.ts          # Destinations, tours, add-ons, wildlife, stories
    ├── utils/
    │   ├── translations.ts         # i18n strings, currency rates & formatting
    │   └── soundscape.ts           # Web Audio savanna ambience generator
    └── components/
        ├── Navbar.tsx              # Fixed header, language/currency pickers
        ├── HeroCarousel.tsx        # Autoplaying destination hero
        ├── SparkleButton.tsx       # Animated star-fill CTA button
        ├── SearchFilterBar.tsx     # Search, region, and advanced filters
        ├── FeaturedDestinations.tsx
        ├── GuidedToursSection.tsx
        ├── WildlifeSpotterGuide.tsx
        ├── EditorialStorytelling.tsx
        ├── TourDetailsModal.tsx
        ├── BookingModal.tsx        # 4-step booking wizard
        ├── MyBookingsModal.tsx
        └── Footer.tsx              # Newsletter signup + site links
```

## Notes

- **Path alias:** `@/*` maps to the project root (configured in both `vite.config.ts` and `tsconfig.json`).
- **HMR override:** setting `DISABLE_HMR=true` disables hot reload and file watching (used by automated editing tools).
- **Currency rates** in `src/utils/translations.ts` are static display rates, not live exchange data.
- **Images** are loaded from Unsplash CDN URLs defined in `src/data/africanData.ts`.
