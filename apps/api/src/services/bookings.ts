import { prisma } from '@repo/db';
import { notificationService } from './notifications.js';
import { googleCalendarService } from './googleCalendar.js';
import type { AvailableSlotsQueryInput, CreateBookingInput } from '../schemas/bookings.js';

type BusyRange = {
  start: Date;
  end: Date;
};

type AvailabilityPeriod = {
  startTime: string;
  endTime: string;
};

type AvailableSlot = {
  label: string;
  startTime: string;
  endTime: string;
};

function overlaps(start: Date, end: Date, busyStart: Date, busyEnd: Date) {
  return start < busyEnd && end > busyStart;
}

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    hourCycle: 'h23',
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );

  return asUtc - date.getTime();
}

function zonedTimeToUtc(date: string, time: string, timeZone: string) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const utcGuess = new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1, hour ?? 0, minute ?? 0));
  const offset = getTimeZoneOffsetMs(utcGuess, timeZone);

  return new Date(utcGuess.getTime() - offset);
}

function getDayOfWeek(date: string, timeZone: string) {
  const noonUtc = zonedTimeToUtc(date, '12:00', timeZone);
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
  }).format(noonUtc);

  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday);
}

function formatDateInZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.year}-${values.month}-${values.day}`;
}

function formatSlotLabel(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export class BookingService {
  async getAvailableSlots(query: AvailableSlotsQueryInput) {
    const dayOfWeek = getDayOfWeek(query.date, query.timeZone);
    const dayStart = zonedTimeToUtc(query.date, '00:00', query.timeZone);
    const dayEnd = zonedTimeToUtc(query.date, '23:59', query.timeZone);

    const availability = await prisma.availability.findMany({
      where: {
        userId: query.hostId,
        dayOfWeek,
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    const [meetings, bookings] = await Promise.all([
      prisma.meeting.findMany({
        where: {
          hostId: query.hostId,
          startTime: { lt: dayEnd },
          endTime: { gt: dayStart },
        },
        select: {
          startTime: true,
          endTime: true,
        },
      }),
      prisma.booking.findMany({
        where: {
          hostId: query.hostId,
          status: 'CONFIRMED',
          startTime: { lt: dayEnd },
          endTime: { gt: dayStart },
        },
        select: {
          startTime: true,
          endTime: true,
        },
      }),
    ]);

    let googleBusy: BusyRange[] = [];
    try {
      const ranges = await googleCalendarService.getBusyRanges(query.hostId, dayStart, dayEnd);
      googleBusy = ranges.map((range) => ({
        start: new Date(range.start),
        end: new Date(range.end),
      }));
    } catch (error) {
      console.error('[BookingService.getAvailableSlots] Google free/busy failed:', error);
    }

    const busyRanges: BusyRange[] = [
      ...meetings,
      ...bookings,
      ...googleBusy,
    ];

    return (availability as AvailabilityPeriod[]).flatMap((period) => {
      const slots: AvailableSlot[] = [];
      let cursor = zonedTimeToUtc(query.date, period.startTime, query.timeZone);
      const periodEnd = zonedTimeToUtc(query.date, period.endTime, query.timeZone);

      while (cursor.getTime() + query.duration * 60_000 <= periodEnd.getTime()) {
        const start = new Date(cursor);
        const end = new Date(cursor.getTime() + query.duration * 60_000);
        const isBusy = busyRanges.some((range) => overlaps(start, end, range.start, range.end));

        if (!isBusy && start > new Date()) {
          slots.push({
            label: formatSlotLabel(start, query.timeZone),
            startTime: start.toISOString(),
            endTime: end.toISOString(),
          });
        }

        cursor = new Date(cursor.getTime() + query.duration * 60_000);
      }

      return slots;
    });
  }

  /**
   * Creates a new booking if the host is available and has no conflicts.
   */
  async createBooking(data: CreateBookingInput) {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    const timeZone = data.timeZone || 'UTC';
    const date = formatDateInZone(start, timeZone);

    const availableSlots = await this.getAvailableSlots({
      hostId: data.hostId,
      date,
      timeZone,
      duration: Math.round((end.getTime() - start.getTime()) / 60_000),
    });

    const isAvailable = availableSlots.some((slot: AvailableSlot) => slot.startTime === start.toISOString() && slot.endTime === end.toISOString());
    if (!isAvailable) {
      throw new Error('Selected time is no longer available');
    }

    const title = data.title || `Meeting with ${data.guestName}`;

    const booking = await prisma.booking.create({
      data: {
        hostId: data.hostId,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        title,
        timeZone,
        startTime: start,
        endTime: end,
        status: 'CONFIRMED'
      }
    });

    try {
      const externalCalendarEventId = await googleCalendarService.createEvent({
        userId: data.hostId,
        title,
        guestEmail: data.guestEmail,
        guestName: data.guestName,
        startTime: start,
        endTime: end,
        timeZone,
      });

      if (externalCalendarEventId) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { externalCalendarEventId },
        });
      }
    } catch (error) {
      console.error('[BookingService] Failed to create Google Calendar event:', error);
    }

    try {
      await notificationService.sendNewBookingAlert(booking.id);
    } catch (error) {
      console.error('[BookingService] Failed to send booking alert:', error);
    }

    return booking;
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
