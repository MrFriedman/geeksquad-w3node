import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { NonceStore } from "../lib/nonces.js";

const submissionSchema = z.object({
  nonce: z.string().uuid(),
  nodeId: z.string().min(1),
  capturedAtMs: z.number().int().min(0),
  location: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      accuracyM: z.number().min(0).max(10_000).optional(),
    })
    .optional(),
  media: z.object({
    photoUrl: z.string().url().optional(),
    photoSha256: z.string().min(16).optional(),
  }),
});

export function submissionRoutes(app: FastifyInstance, nonceStore: NonceStore) {
  app.post("/v1/submissions", async (req, reply) => {
    const parsed = submissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.code(400).send({
        ok: false,
        code: "BAD_REQUEST",
        issues: parsed.error.issues,
      });
    }

    const consumed = nonceStore.consume(parsed.data.nonce);
    if (!consumed.ok) {
      return reply.code(409).send({ ok: false, code: consumed.code });
    }
    if (consumed.record.nodeId !== parsed.data.nodeId) {
      return reply.code(409).send({ ok: false, code: "NONCE_NODE_MISMATCH" });
    }

    return reply.code(201).send({
      ok: true,
      status: "RECEIVED",
      submissionId: `sub_${parsed.data.nonce}`,
    });
  });
}

