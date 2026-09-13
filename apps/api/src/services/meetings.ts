import { prisma } from '@repo/db';
import type { CreateMeetingInput } from '../schemas/meetings.ts';
import { mailService } from './mail.js';
import { googleCalendarService } from './googleCalendar.js';

export class MeetingService {
  /**
   * Retrieves all meetings for a given user.
   */
  async getMeetingsByUserId(userId: string) {
    return prisma.meeting.findMany({
      where: {
        OR: [
          { hostId: userId },
          { participants: { some: { userId } } }
        ]
      },
      include: {
        participants: true,
      },
      orderBy: { startTime: 'asc' },
    });
  }

  /**
   * Creates a new meeting and adds participants.
   * Also sends email notifications to all participants.
   */
  async createMeeting(data: CreateMeetingInput) {
    const meeting = await prisma.meeting.create({
      data: {
        title: data.title,
        type: data.type,
        description: data.description ?? null,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        hostId: data.hostId,
        meetingLink: data.meetingLink ?? null,
        timeZone: data.timeZone ?? null,
        participants: {
          create: data.participants?.map((email) => ({
            email,
            status: 'PENDING',
          })) || [],
        },
      },
      include: {
        participants: true,
        host: true,
      },
    });

    let calendarSyncStatus: 'synced' | 'skipped' | 'failed' = 'skipped';
    let calendarEventId: string | null = null;
    let calendarSyncError: string | null = null;

    try {
      const calendarEvent = {
        userId: data.hostId,
        title: data.title,
        guestEmail: data.participants?.[0] ?? meeting.host.email,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      };

      const eventId = await googleCalendarService.createEvent({
        ...calendarEvent,
        ...(data.description ? { description: data.description } : {}),
        ...(data.timeZone ? { timeZone: data.timeZone } : {}),
        ...(data.participants?.length ? { attendees: data.participants.map((email) => ({ email })) } : {}),
      });

      if (eventId) {
        calendarSyncStatus = 'synced';
        calendarEventId = eventId;
        console.info('[MeetingService.createMeeting] Synced meeting to Google Calendar', {
          meetingId: meeting.id,
          eventId,
        });
      }
    } catch (error) {
      calendarSyncStatus = 'failed';
      calendarSyncError = error instanceof Error ? error.message : 'Unknown Google Calendar error';
      console.error('[MeetingService.createMeeting] Failed to sync meeting to Google Calendar:', error);
    }

    // Send emails to each participant
    if (data.participants && data.participants.length > 0) {
      await Promise.all(
        data.participants.map(email =>
          mailService.sendMeetingInvitation(email, meeting)
        )
      );
    }

    return {
      ...meeting,
      calendarSync: {
        status: calendarSyncStatus,
        eventId: calendarEventId,
        error: calendarSyncError,
      },
    };
  }
}

export const meetingService = new MeetingService();
