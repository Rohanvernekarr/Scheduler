import { prisma } from 'db';
import type { CreateBookingInput } from '../schemas/bookings.js';

export class BookingService {
  /**
   * Creates a new booking if the host is available and has no conflicts.
   */
  async createBooking(data: CreateBookingInput) {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    const dayOfWeek = start.getUTCDay();
    const startTimeStr = start.toISOString().split('T')[1]?.substring(0, 5); // "HH:mm"
    const endTimeStr = end.toISOString().split('T')[1]?.substring(0, 5);     // "HH:mm"

    if (!startTimeStr || !endTimeStr) throw new Error('Invalid time format');

    // 1. Check Working Hours Availability
    const availability = await prisma.availability.findFirst({
      where: {
        userId: data.hostId,
        dayOfWeek,
        startTime: { lte: startTimeStr },
        endTime: { gte: endTimeStr }
      }
    });

    if (!availability) {
      throw new Error('Host is not available at this time/day');
    }

    // 2. Check for overlapping Meetings
    const overlapMeeting = await prisma.meeting.findFirst({
      where: {
        hostId: data.hostId,
        OR: [
          {
            startTime: { lt: end },
            endTime: { gt: start }
          }
        ]
      }
    });

    if (overlapMeeting) {
      throw new Error('Host has a conflicting meeting');
    }

    // 3. Check for overlapping Bookings
    const overlapBooking = await prisma.booking.findFirst({
      where: {
        hostId: data.hostId,
        status: 'CONFIRMED',
        OR: [
          {
            startTime: { lt: end },
            endTime: { gt: start }
          }
        ]
      }
    });

    if (overlapBooking) {
      throw new Error('Host already has a booking at this time');
    }

    return prisma.booking.create({
      data: {
        hostId: data.hostId,
        guestEmail: data.guestEmail,
        startTime: start,
        endTime: end,
        status: 'CONFIRMED'
      }
    });
  }

  /**
   * Retrieves bookings for a specific host
   */
  async getBookingsByHost(hostId: string) {
    return prisma.booking.findMany({
      where: { hostId },
      orderBy: { startTime: 'desc' }
    });
  }

  /**
   * Cancels a booking
   */
  async cancelBooking(id: string) {
    return prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });
  }
}

export const bookingService = new BookingService();
