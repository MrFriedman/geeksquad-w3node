# Docs

## What this repo is

Grounded Art is a location-based art discovery app. Users see starter nodes on a map. When they physically enter a node’s geofence, they can submit a photo verification of the artwork. Verified submissions increase reputation and tier, unlocking more nodes and features. Posting publicly requires artist credit fields and may optionally require an on-chain tip receipt later.

## Core pillars

- Verified capture: prove you were on-site and took the photo.
- Attribution + consent: bind captures to an artist/artwork record with clear rights defaults.
- Discovery: map-first UX (feed later) surfacing nearby art + verified content.
- Value loop: route value to artists (tips, unlocks, licenses) without heavy friction.
- Trust + anti-abuse: layered verification + reputation without mandatory identity.

## Hackathon constraints (product bar)

- Polished, intuitive interface requiring no explanation; professional accessibility.
- Production-ready code with clean architecture; handles edge cases; performance on mid-range phones.
- Clearly defined African problem fit: low cost, low bandwidth, literacy-friendly; integrates with local rails (e.g. M-Pesa) when applicable.

## Key docs

- `docs/ARCHITECTURE.md` — system design, trust model, core flows
- `docs/TASKS.md` — prioritized build plan

## Local dev

- UI: `npm run dev:ui`
- API: `npm run dev:api`

## Practices (non-negotiables)

- Log hygiene: never log wallet + precise location + image identifiers together.
- Replay protection: nonce must be single-use + expiry enforced server-side.
- Rate limits with intent: per-artwork/per-marker/per-day caps to prevent farming.
- Privacy minimization: store coarse geo-buckets, not raw GPS trails.
- Deterministic error taxonomy: standardized failure codes for UX + analytics.
- Test mid-range phones: performance regressions won’t show on a laptop.
