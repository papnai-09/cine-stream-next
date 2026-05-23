# CineStream Next.js Migration

CineStream migrated from a React/Vite client-side rendered app to a Next.js 15 App Router application with SSR-friendly movie discovery and SEO metadata.

## Features

- Next.js 15 App Router project bootstrapped with `create-next-app`
- Server Component fetch for initial TMDB popular movies
- File-based routes for `/`, `/favorites`, and `/movie/[id]`
- Dynamic SSR movie detail route with `generateMetadata`
- Client Components only for search, infinite scroll, and favorites state
- Browser-based favorites with `localStorage`

## Environment

Create `.env.local` in the project root:

```bash
TMDB_API_KEY=your_tmdb_api_key_here
```

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run lint
npm run build
```
