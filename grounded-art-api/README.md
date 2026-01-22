# grounded-art-api

Minimal API scaffold to support check-in nonces (replay protection) and submission ingestion.

- `POST /v1/checkin` → issue a short-lived, single-use nonce for a node.
- `POST /v1/submissions` → consume nonce + accept a submission payload.

Run:

- `npm install`
- `cp .env.example .env`
- `npm run dev`

