# Tasks (prioritized)

This is the minimal build plan for a credible demo and a sane path to hardening.

## Milestone 0 — Repo baseline (now)

- [x] Root `README.md` + docs index
- [x] Minimal API scaffold for replay protection + ingestion
- [x] UI builds with wallet + provider wiring
- [x] `.env.example` files for UI and API
- [x] Remove tracked OS junk files; ignore `.DS_Store`

## Milestone 1 — MVP: discovery → check-in → submit

- [ ] Nodes dataset (seed JSON) and “nearby” query shape
- [ ] Check-in endpoint: single-use nonce with expiry + rate limits
- [ ] Submission endpoint: accept upload references + metadata; consume nonce
- [ ] Deterministic error codes for UX (`OUTSIDE_GEOFENCE`, `NONCE_EXPIRED`, `RATE_LIMIT`, …)
- [ ] Basic reputation counter (per user) and simple feature gate

## Milestone 2 — Hardening: “is this the right artwork?”

- [ ] Reference images per node (admin-only for now)
- [ ] Perceptual hash pipeline (server-side preferred to reduce client variability)
- [ ] Similarity thresholding + explainable verification status
- [ ] Human/artist confirm workflow for ambiguous cases

## Milestone 3 — Value loop (optional for demo)

- [ ] Tip receipt flow (wallet connect → tx → store receipt)
- [ ] “Pay-to-post” gate for public posts (only for high-trust users)
- [ ] Creator payouts strategy (off-chain rails like M-Pesa vs on-chain)

## Milestone 4 — Ops + scale

- [ ] Storage lifecycle policies (retention for raw uploads)
- [ ] Structured logs with redaction; basic dashboards
- [ ] Offline/low-connectivity UX paths (queued submission + retry)
