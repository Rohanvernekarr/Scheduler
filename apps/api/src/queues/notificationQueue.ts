import { Queue } from 'bullmq';
import { redisConnection } from '../lib/redis.js';

/**
 * The main notification queue.
 */
export const notificationQueue = new Queue('notification-queue', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3, // Retry up to 3 times
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
  },
});

/**
 * Helper to add jobs to the queue.
 */
export const addNotificationJob = async (type: string, data: any, options?: any) => {
  return notificationQueue.add(type, data, options);
};
