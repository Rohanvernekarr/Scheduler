import { Worker, Job } from 'bullmq';
import { redisConnection } from '../lib/redis.js';
import { mailService } from '../services/mail.js';
import { prisma } from '@repo/db';

/**
 * Worker to process notification jobs.
 */
export const initNotificationWorker = () => {
  const worker = new Worker(
    'notification-queue',
    async (job: Job) => {
      console.log(`[Worker] Processing job ${job.id} of type ${job.name}`);

      try {
        switch (job.name) {
          case 'meeting-reminder':
            await handleMeetingReminder(job.data);
            break;
          case 'weekly-digest':
            await handleWeeklyDigest(job.data);
            break;
          case 'new-booking-alert':
            await handleNewBookingAlert(job.data);
            break;
          case 'newsletter-broadcast':
            await handleNewsletter(job.data);
            break;
          default:
            console.warn(`[Worker] Unknown job type: ${job.name}`);
        }
      } catch (error) {
        console.error(`[Worker] Error processing job ${job.id}:`, error);
        throw error; // Re-throw to trigger BullMQ retry
      }
    },
    { connection: redisConnection }
  );

  worker.on('completed', (job) => {
    console.log(`[Worker] Job ${job.id} completed.`);
  });

  worker.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job?.id || 'unknown'} failed with error:`, err);
  });

  console.log('[Worker] Notification worker initialized.');
};

/**
 * Specific handlers for each job type
 */

async function handleMeetingReminder(data: { meetingId: string }) {
  const meeting = await prisma.meeting.findUnique({
    where: { id: data.meetingId },
    include: {
      host: { include: { notificationSettings: true } },
    },
  });

  if (meeting && meeting.host.notificationSettings?.meetingReminders) {
    const body = `
      <h2>Meeting Reminder: ${meeting.title}</h2>
      <p>Your meeting is starting in 15 minutes.</p>
      <p><strong>Time:</strong> ${meeting.startTime.toLocaleString()}</p>
      <p><strong>Link:</strong> <a href="${meeting.meetingLink}">${meeting.meetingLink}</a></p>
    `;
    await mailService.sendEmail(meeting.host.email, `Reminder: ${meeting.title}`, body);
  }
}

async function handleNewBookingAlert(data: { bookingId: string }) {
  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
    include: {
      host: { include: { notificationSettings: true } },
    },
  });

  if (booking && booking.host.notificationSettings?.newBookingAlerts) {
    const body = `
      <h2>New Booking Received!</h2>
      <p>Someone has booked a slot with you.</p>
      <p><strong>Guest:</strong> ${booking.guestEmail}</p>
      <p><strong>Time:</strong> ${booking.startTime.toLocaleString()}</p>
    `;
    await mailService.sendEmail(booking.host.email, 'New Booking Alert', body);
  }
}

async function handleNewsletter(data: { email: string, subject: string, content: string }) {
  const body = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
      ${data.content}
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        You received this because you are subscribed to our newsletter. 
        You can unsubscribe in your account settings.
      </p>
    </div>
  `;
  await mailService.sendEmail(data.email, data.subject, body);
}

async function handleWeeklyDigest(data: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: data.userId },
    include: { notificationSettings: true },
  });

  if (!user || !user.notificationSettings?.weeklyDigest) return;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const meetingsCount = await prisma.meeting.count({
    where: { hostId: user.id, startTime: { gte: oneWeekAgo } },
  });

  const bookingsCount = await prisma.booking.count({
    where: { hostId: user.id, startTime: { gte: oneWeekAgo } },
  });

  if (meetingsCount > 0 || bookingsCount > 0) {
    const body = `
      <h2>Your Weekly Scheduler Digest</h2>
      <p>Here is a summary of your activity over the last 7 days:</p>
      <ul>
        <li><strong>Total Meetings:</strong> ${meetingsCount}</li>
        <li><strong>Total Bookings:</strong> ${bookingsCount}</li>
      </ul>
      <p>Keep up the great work!</p>
    `;
    await mailService.sendEmail(user.email, 'Your Weekly Digest', body);
  }
}
