import { prisma } from '@repo/db';

export class InviteService {
  async createTargetedInvite(data: {
    id?: string;
    hostId: string;
    guestEmail: string;
    inviteLink: string;
    meetingLink?: string;
    slots: Array<{
      date: string;
      startTime: string;
      endTime: string;
      duration: number;
    }>;
  }) {
    return prisma.targetedInvite.create({
      data: {
        id: data.id,
        hostId: data.hostId,
        guestEmail: data.guestEmail,
        inviteLink: data.inviteLink,
        meetingLink: data.meetingLink ?? null,
        slots: {
          create: data.slots.map(slot => {
            let start: Date;
            let end: Date;

            if (slot.startTime.includes('T')) {
              start = new Date(slot.startTime);
              end = new Date(slot.endTime);
            } else {
              const [sh, sm] = slot.startTime.split(':').map(Number);
              const [eh, em] = slot.endTime.split(':').map(Number);
              
              start = new Date(slot.date);
              start.setHours(sh ?? 0, sm ?? 0, 0, 0);
              
              end = new Date(slot.date);
              end.setHours(eh ?? 0, em ?? 0, 0, 0);
            }

            return {
              startTime: start,
              endTime: end,
              duration: slot.duration
            };
          })
        }
      },
      include: {
        slots: true
      }
    });
  }

  async getInviteByLinkId(inviteId: string) {
    return prisma.targetedInvite.findFirst({
      where: {
        OR: [
          { id: inviteId },
          { inviteLink: inviteId }
        ]
      },
      include: {
        slots: true,
        host: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
  }

  async bookSlot(slotId: string, guestName: string, guestEmail: string) {
    const slot = await prisma.targetedSlot.findUnique({
      where: { id: slotId },
      include: { invite: true }
    });

    if (!slot) throw new Error('Slot not found');
    if (slot.isBooked) throw new Error('Slot already booked');

    // Update slot status
    await prisma.targetedSlot.update({
      where: { id: slotId },
      data: {
        isBooked: true,
        bookedAt: new Date(),
        bookedByEmail: guestEmail,
        bookedByName: guestName
      }
    });

    // Also create a formal Booking record so it shows up in the host's schedule
    return prisma.booking.create({
      data: {
        hostId: slot.invite.hostId,
        guestEmail: guestEmail,
        startTime: slot.startTime,
        endTime: slot.endTime,
        status: 'CONFIRMED'
      }
    });
  }

  async getInvitesByHostId(hostId: string) {
    return prisma.targetedInvite.findMany({
      where: { hostId },
      include: {
        slots: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}

export const inviteService = new InviteService();
