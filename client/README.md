# UMTechnothon 2026 — Frontend

React frontend for **UM Technothon 2026**, built with Vite and Tailwind CSS.

## Prerequisites

- Node.js (latest LTS, e.g. v22)
- Backend running at `http://localhost:5000` when using the app (or set `VITE_API_URL` in root `.env`)

## Scripts

Run these from the **client** directory (`cd client`).

| Command | Description |
|--------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (Vite) — default: [http://localhost:3000](http://localhost:3000) |
| `npm start` | Same as `npm run dev` if configured |
| `npm run build` | Production build (output in `build/` or as configured) |

## Environment variables

The app reads env from the **project root** `.env`. Relevant variables (all optional for local dev):

- `VITE_API_URL` — API base URL (default: `http://localhost:5000/api`)
- `VITE_SUPABASE_URL` — Supabase project URL (if used in the client)
- `VITE_SUPABASE_ANON_KEY` — Supabase anon key (if used in the client)

## Development

- **Dev server:** `npm run dev` — hot reload at http://localhost:3000
- **API:** Ensure the backend is running from the `server/` folder so API requests succeed.

## Build & deploy

- **Build:** `npm run build`
- Deploy the built output (e.g. to Vercel, Netlify, or static hosting). Set `VITE_API_URL` (and any Supabase vars) to your production API/URLs when building for production.

---

Part of **UMTechnothon 2026**. Backend and full setup: see the [root README](../README.md).
