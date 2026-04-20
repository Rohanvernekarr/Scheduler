import { prisma } from '@repo/db';

export class InviteService {
  async createTargetedInvite(data: {
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
        hostId: data.hostId,
        guestEmail: data.guestEmail,
        inviteLink: data.inviteLink,
        meetingLink: data.meetingLink ?? null,
        slots: {
          create: data.slots.map(slot => {
             const [sh, sm] = slot.startTime.split(':').map(Number);
             const [eh, em] = slot.endTime.split(':').map(Number);
             
             const start = new Date(slot.date);
             start.setHours(sh ?? 0, sm ?? 0, 0, 0);
             
             const end = new Date(slot.date);
             end.setHours(eh ?? 0, em ?? 0, 0, 0);

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
    // The link ID is the last part of the inviteLink URL or the ID itself
    // In our case, the user generates links like /invite/{id}
    // So we search by the id directly if we save it as the id.
    return prisma.targetedInvite.findUnique({
      where: { id: inviteId },
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
}

export const inviteService = new InviteService();
