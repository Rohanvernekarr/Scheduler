import { prisma } from 'db';
import type { CreateEventInput } from '../schemas/events.js';

export class EventService {
  async createEvent(data: CreateEventInput) {
    return prisma.event.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        hostId: data.hostId,
        meetingLink: data.meetingLink ?? null,
        participants: {
          create: data.participants?.map(email => ({
            email,
            status: 'PENDING'
          })) || []
        }
      },
      include: {
        participants: true
      }
    });
  }

  async getEventsByHost(hostId: string) {
    return prisma.event.findMany({
      where: { hostId },
      include: { participants: true },
      orderBy: { startTime: 'asc' }
    });
  }
}

export const eventService = new EventService();
