import { randomUUID } from "node:crypto";

export type CheckinNonce = {
  nonce: string;
  nodeId: string;
  expiresAtMs: number;
  usedAtMs?: number;
};

export class NonceStore {
  private nonces = new Map<string, CheckinNonce>();

  create({ nodeId, ttlMs }: { nodeId: string; ttlMs: number }): CheckinNonce {
    const nonce = randomUUID();
    const record: CheckinNonce = {
      nonce,
      nodeId,
      expiresAtMs: Date.now() + ttlMs,
    };
    this.nonces.set(nonce, record);
    return record;
  }

  consume(
    nonce: string
  ): { ok: true; record: CheckinNonce } | { ok: false; code: string } {
    const record = this.nonces.get(nonce);
    if (!record) return { ok: false, code: "NONCE_NOT_FOUND" };
    if (record.expiresAtMs <= Date.now()) return { ok: false, code: "NONCE_EXPIRED" };
    if (record.usedAtMs) return { ok: false, code: "NONCE_ALREADY_USED" };
    record.usedAtMs = Date.now();
    this.nonces.set(nonce, record);
    return { ok: true, record };
  }

  gc(): number {
    const now = Date.now();
    let removed = 0;
    for (const [nonce, record] of this.nonces.entries()) {
      if (record.expiresAtMs + 5 * 60_000 < now) {
        this.nonces.delete(nonce);
        removed += 1;
      }
    }
    return removed;
  }
}

