import { prisma } from '@repo/db';
import { addNotificationJob } from '../queues/notificationQueue.js';

export class NotificationService {
  /**
   * Scans for meetings starting in 15 mins and queues reminders.
   */
  async sendMeetingReminders() {
    const now = new Date();
    const reminderTime = new Date(now.getTime() + 15 * 60000);
    const reminderWindowStart = new Date(reminderTime.getTime() - 30000);
    const reminderWindowEnd = new Date(reminderTime.getTime() + 30000);

    const meetings = await prisma.meeting.findMany({
      where: {
        startTime: {
          gte: reminderWindowStart,
          lte: reminderWindowEnd,
        },
      },
    });

    for (const meeting of meetings) {
      await addNotificationJob('meeting-reminder', { meetingId: meeting.id });
    }
  }

  /**
   * Queues weekly digests for all users who have it enabled.
   */
  async sendWeeklyDigest() {
    const users = await prisma.user.findMany({
      where: {
        notificationSettings: {
          weeklyDigest: true,
        },
      },
    });

    for (const user of users) {
      await addNotificationJob('weekly-digest', { userId: user.id });
    }
  }

  /**
   * Queues an alert when a new booking is created.
   */
  async sendNewBookingAlert(bookingId: string) {
    await addNotificationJob('new-booking-alert', { bookingId });
  }

  /**
   * Broadcasts a newsletter to all opted-in users.
   */
  async broadcastNewsletter(subject: string, content: string) {
    const subscribers = await prisma.user.findMany({
      where: {
        notificationSettings: {
          newsletter: true,
        },
      },
      select: { email: true },
    });

    console.log(`[NotificationService] Broadcasting newsletter to ${subscribers.length} subscribers.`);

    for (const sub of subscribers) {
      await addNotificationJob('newsletter-broadcast', {
        email: sub.email,
        subject,
        content,
      });
    }

    return { sentCount: subscribers.length };
  }

  /**
   * Fetches notification settings for a user.
   */
  async getSettings(userId: string) {
    let settings = await prisma.notificationSettings.findUnique({
      where: { userId },
    });

    if (!settings) {
      settings = await prisma.notificationSettings.create({
        data: { userId },
      });
    }

    return settings;
  }

  /**
   * Updates notification settings for a user.
   */
  async updateSettings(userId: string, data: any) {
    return prisma.notificationSettings.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  }
}

export const notificationService = new NotificationService();
