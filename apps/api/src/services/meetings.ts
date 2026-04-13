import { prisma } from 'db';
import type { CreateMeetingInput } from '../schemas/meetings.ts';
import { mailService } from './mail.js';

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

    // Send emails to each participant
    if (data.participants && data.participants.length > 0) {
      await Promise.all(
        data.participants.map(email => 
          mailService.sendMeetingInvitation(email, meeting)
        )
      );
    }

    return meeting;
  }
}

export const meetingService = new MeetingService();
