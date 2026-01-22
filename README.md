# Grounded Art

Grounded Art is a location-based art discovery app with on-site verification and artist-first attribution. Users discover nearby artworks (“nodes”), check in on location, and submit a capture that can be verified and used to unlock content and (optionally) route value to creators.

## Repo layout

- `grounded-art-ui/` — Next.js UI (map, discovery, geofence UX, wallet connect scaffolding)
- `grounded-art-api/` — minimal API scaffold (nonce/replay protection primitives; expands into verification + submissions)
- `docs/` — product + system docs

## Quick start

UI:
- `npm --prefix grounded-art-ui install`
- `cp grounded-art-ui/.env.example grounded-art-ui/.env.local`
- `npm run dev:ui`

API:
- `npm --prefix grounded-art-api install`
- `cp grounded-art-api/.env.example grounded-art-api/.env`
- `npm run dev:api`

## Docs

- `docs/README.md`
- `docs/ARCHITECTURE.md`
- `docs/TASKS.md`

