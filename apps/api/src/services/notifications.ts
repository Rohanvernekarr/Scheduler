import { prisma } from '@repo/db';
import { mailService } from './mail.js';

export class NotificationService {
 
  async sendMeetingReminders() {
    const now = new Date();
    const reminderTime = new Date(now.getTime() + 15 * 60000);
    const reminderWindowStart = new Date(reminderTime.getTime() - 30000); // 30 sec window
    const reminderWindowEnd = new Date(reminderTime.getTime() + 30000);

    console.log(`[NotificationService] Checking for meetings starting around ${reminderTime.toISOString()}`);

    const meetings = await prisma.meeting.findMany({
      where: {
        startTime: {
          gte: reminderWindowStart,
          lte: reminderWindowEnd,
        },
      },
      include: {
        host: {
          include: {
            notificationSettings: true,
          },
        },
        participants: true,
      },
    });

    for (const meeting of meetings) {
      if (meeting.host.notificationSettings?.meetingReminders) {
        console.log(`[NotificationService] Sending reminder for meeting: ${meeting.title} to ${meeting.host.email}`);
        
        const body = `
          <h2>Meeting Reminder: ${meeting.title}</h2>
          <p>Your meeting is starting in 15 minutes.</p>
          <p><strong>Time:</strong> ${meeting.startTime.toLocaleString()}</p>
          <p><strong>Link:</strong> <a href="${meeting.meetingLink}">${meeting.meetingLink}</a></p>
        `;
        
        await mailService.sendEmail(meeting.host.email, `Reminder: ${meeting.title}`, body);
      }
    }
  }

 
  async sendWeeklyDigest() {
    console.log('[NotificationService] Generating weekly digests...');
    
    const users = await prisma.user.findMany({
      where: {
        notificationSettings: {
          weeklyDigest: true,
        },
      },
      include: {
        notificationSettings: true,
      },
    });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    for (const user of users) {
      const meetingsCount = await prisma.meeting.count({
        where: {
          hostId: user.id,
          startTime: { gte: oneWeekAgo },
        },
      });

      const bookingsCount = await prisma.booking.count({
        where: {
          hostId: user.id,
          startTime: { gte: oneWeekAgo },
        },
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
  }

 
  async sendNewBookingAlert(bookingId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        host: {
          include: {
            notificationSettings: true,
          },
        },
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
