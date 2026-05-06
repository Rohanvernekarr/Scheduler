import { Redis } from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

/**
 * Shared Redis connection for BullMQ.
 * BullMQ requires maxRetriesPerRequest to be null.
 */
export const redisConnection = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: REDIS_URL.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
});

redisConnection.on('error', (err) => {
  console.error('[Redis] Connection Error:', err);
});

redisConnection.on('connect', () => {
  console.log('[Redis] Connected successfully.');
});
