import cron from 'node-cron';
import { notificationService } from './notifications.js';

export const initCronJobs = () => {
  console.log('[Cron] Initializing background jobs...');

  // 1. Every minute: Check for meeting reminders starting in 15 mins
  cron.schedule('* * * * *', async () => {
    try {
      await notificationService.sendMeetingReminders();
    } catch (error) {
      console.error('[Cron] Error in meeting reminder job:', error);
    }
  });

  // 2. Every Monday at 8:00 AM: Send weekly digests
  cron.schedule('0 8 * * 1', async () => {
    try {
      await notificationService.sendWeeklyDigest();
    } catch (error) {
      console.error('[Cron] Error in weekly digest job:', error);
    }
  });

  console.log('[Cron] Background jobs scheduled.');
};
