import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { NonceStore } from "../lib/nonces.js";

const requestSchema = z.object({
  nodeId: z.string().min(1),
  ttlSeconds: z.number().int().min(10).max(10 * 60).optional(),
});

export function checkinRoutes(app: FastifyInstance, nonceStore: NonceStore) {
  app.post("/v1/checkin", async (req, reply) => {
    const parsed = requestSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        code: "BAD_REQUEST",
        issues: parsed.error.issues,
      });
    }

    const ttlSeconds = parsed.data.ttlSeconds ?? 120;
    const record = nonceStore.create({
      nodeId: parsed.data.nodeId,
      ttlMs: ttlSeconds * 1000,
    });

    return {
      ok: true,
      nonce: record.nonce,
      nodeId: record.nodeId,
      expiresAtMs: record.expiresAtMs,
    };
  });
}

