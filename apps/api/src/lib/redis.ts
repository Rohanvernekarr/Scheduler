import { Redis } from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisConnection = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
  tls: REDIS_URL.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined,
  // Stop retrying after 3 failures to prevent terminal spam when limits are exceeded
  retryStrategy: (times) => {
    if (times > 3) {
      console.error(' [Redis] Max retries reached. Stopping reconnection attempts.');
      return null; 
    }
    return Math.min(times * 100, 3000);
  }
});

redisConnection.on('error', (err) => {
  if (err.message.includes('max requests limit exceeded')) {
    console.error(' [CRITICAL] Redis limit reached on Upstash. Disconnecting to stop terminal spam.');
    redisConnection.disconnect(); // Force disconnect to stop the reconnection loop
  } else {
    console.error('[Redis] Connection Error:', err);
  }
});

redisConnection.on('connect', () => {
  console.log('[Redis] Connected successfully.');
});
