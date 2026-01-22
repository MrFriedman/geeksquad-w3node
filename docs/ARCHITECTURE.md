# Architecture

## Intent

Grounded Art is a “proof-of-presence” discovery product: art is anchored to physical places, and meaningful interactions (unlocking lore, posting, tipping) should be harder to fake than a normal social post—without forcing heavy identity or collecting invasive location histories.

This means the core system is not “a map UI” or “an NFT marketplace”; it’s a verification pipeline that:

- lets anyone discover nodes with low friction,
- allows on-site actions with credible, privacy-minimizing proof,
- translates verified actions into reputation and optional value routing.

## System overview

Core components:

- `grounded-art-ui/` (client): map + discovery + check-in/capture UX.
- `grounded-art-api/` (server): replay protection, verification orchestration, rate limits, submission ingestion, reputation updates.
- Storage (object store): encrypted or access-controlled media (captures, voice notes, references).
- DB (Postgres recommended): nodes, artists, submissions, verifications, reputation, audit-lite events.
- Chain (optional in MVP): registry + receipts (tips, mints, endorsements) with minimal on-chain surface.

## Core entities (domain)

- **Node / Artwork**: a real-world artwork anchored to a location geometry (radius/polygon), with references (images, metadata), and an owner/manager (artist/org).
- **Submission**: a user’s attempt to prove they were on-site (capture + metadata).
- **Verification**: the server’s assessment of a submission (pass/fail + reason codes + scores).
- **Reputation**: an evolving score/tier used for gating privileges (posting, creating nodes, moderation weight).

## Core flows

### 1) Discover nearby nodes (low friction)

1. UI fetches a coarse list of nearby nodes (bounded tiles / geo-buckets).
2. UI renders nodes with limited metadata (title, distance bucket, preview).

Design goal: discovery should work without wallet connect and without storing trails.

### 2) Check-in (server-issued challenge)

1. UI requests a `checkin` challenge for `{nodeId}` and the user’s coarse location bucket.
2. API returns a short-lived, single-use nonce/challenge (and server timestamp), bound to:
   - nodeId,
   - expiry,
   - (optionally) a session/user identifier.

Design goal: prevent replay and farming. This is the minimum server “trust anchor”.

### 3) Capture + submit (evidence upload + claim)

1. UI captures photo (and optional voice note), uploads to object storage via a pre-signed URL.
2. UI submits a payload referencing the uploaded objects + the check-in nonce.
3. API validates:
   - nonce exists, not expired, not reused,
   - per-node/per-user/per-day rate limits,
   - payload schema and sizes.

### 4) Verify (layered signals, not a single “magic check”)

Verification should be layered and explainable:

- Geofence pass: distance-to-node geometry within threshold.
- Time window: submission within N minutes of check-in.
- Media similarity: perceptual hash similarity to node references and/or to recent verified captures.
- Abuse heuristics: burst patterns, repeated near-identical uploads, suspicious device/user agent patterns.
- Human/artist confirmation (upgrade): raise trust for ambiguous cases.

Output should be deterministic and UX-friendly: `status`, `codes[]`, `score`, and next actions.

## Trust, threats, and why “server first” matters

Threats you should assume:

- GPS spoofing and mock locations.
- Photo replay (uploading an old/online image).
- Scripted farming (many check-ins/submissions across nodes).
- Sybil wallets (wallet != identity).

Best-practice stance for MVP:

- Don’t pretend you can fully prevent spoofing on the web.
- Do prevent cheap replay/farming with nonces, expiry, and rate limits.
- Do design for progressive hardening: reputation + human review + stronger proofs later.

## Privacy model (what we store, what we avoid)

Avoid:

- long-lived raw GPS trails,
- storing exact lat/lng alongside wallet and image identifiers in logs,
- collecting unique device identifiers.

Prefer:

- coarse geo-buckets (e.g., geohash precision 5–7, depending on city density),
- short-lived check-in tokens,
- strict retention windows for raw uploads (keep only what’s needed for the product).

## On-chain design (optional, “quiet blockchain”)

Use chain only where it provides real value:

- creator registration / ownership signals,
- receipts: tips, unlock purchases, endorsements,
- public provenance for the claim (“this node exists”) rather than for private user location data.

Never put precise location proofs on-chain in MVP.

## Recommended first implementation choices

- API: Fastify + Zod + Postgres (Supabase/Neon) when you outgrow in-memory.
- Storage: S3-compatible (R2/Supabase Storage).
- Verification: start with geofence + time window + nonce; add pHash as a second hardening step.
- Observability: structured logs with redaction + a small error-code taxonomy.
