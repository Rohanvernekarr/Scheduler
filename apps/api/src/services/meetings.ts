import { prisma } from 'db';
import type { CreateMeetingInput } from '../schemas/meetings.ts';

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
   * Also queues the email job for the participants.
   */
  async createMeeting(data: CreateMeetingInput) {
    const meeting = await prisma.meeting.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        hostId: data.hostId,
        meetingLink: data.meetingLink ?? null,
        // Map simple email arrays to Participant models
        participants: {
          create: data.participants?.map((email) => ({
            email,
            status: 'PENDING',
          })) || [],
        },
      },
      include: {
        participants: true,
      },
    });

    // TODO: Dispatch email queue job to Upstash Redis here
    // e.g. await queueEmailJob({ meetingId: meeting.id, type: 'MEETING_INVITE' })

    return meeting;
  }
}

export const meetingService = new MeetingService();
