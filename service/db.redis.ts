import Redis from "ioredis";
const redis = new Redis({
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379, // Convert to number or default to 6379
  host: process.env.REDIS_HOST || "127.0.0.1", // Default to localhost if undefined
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

export default redis;
