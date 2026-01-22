import Fastify from "fastify";
import cors from "@fastify/cors";
import { getEnv } from "./env.js";
import { NonceStore } from "./lib/nonces.js";
import { healthRoutes } from "./routes/health.js";
import { checkinRoutes } from "./routes/checkin.js";
import { submissionRoutes } from "./routes/submissions.js";

const env = getEnv();
const app = Fastify({
  logger: { level: env.LOG_LEVEL },
});

await app.register(cors, {
  origin: env.CORS_ORIGIN,
});

const nonceStore = new NonceStore();
setInterval(() => nonceStore.gc(), 60_000).unref();

await app.register(healthRoutes);
checkinRoutes(app, nonceStore);
submissionRoutes(app, nonceStore);

await app.listen({ port: env.PORT, host: "0.0.0.0" });

