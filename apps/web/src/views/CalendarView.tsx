import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetings, getHostBookings } from '../lib/api';
import { useSession } from '@repo/auth/client';
import { Calendar } from '../components/calendar/Calendar';
import type { CalendarEvent } from '../components/calendar/types';
import { motion } from 'framer-motion';

export default function CalendarView() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { data: meetings = [] } = useQuery({
    queryKey: ['meetings', userId],
    queryFn: () => getMeetings(userId!),
    enabled: !!userId,
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => getHostBookings(userId!),
    enabled: !!userId,
  });

  const allEvents = useMemo(() => {
    const combined: CalendarEvent[] = [
      ...meetings.map((m: any) => ({
        id: m.id,
        title: m.title || 'Meeting',
        startTime: m.startTime,
        endTime: m.endTime,
        category: 'Internal' as const,
        description: m.description,
      })),
      ...bookings.map((b: any) => ({
        id: b.id,
        title: `Booking: ${b.guestName || b.guestEmail}`,
        startTime: b.startTime,
        endTime: b.endTime,
        category: 'External' as const,
        description: `External booking from ${b.guestEmail}`,
      })),
    ];

    // Add availability slots from localStorage if any
    try {
      const customInvites = JSON.parse(localStorage.getItem('custom_invites') || '{}');
      Object.values(customInvites).forEach((invite: any) => {
        invite.slots.forEach((slot: any) => {
          combined.push({
            id: slot.id,
            title: `Slot: ${invite.guestEmail || 'Open'}`,
            startTime: `${slot.date}T${slot.startTime}`,
            endTime: `${slot.date}T${slot.endTime}`,
            category: 'Availability' as const,
            description: `Availability for ${invite.guestEmail}`,
          });
        });
      });
    } catch (e) { /* ignore */ }

    return combined;
  }, [meetings, bookings]);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3 italic">System Calendar // Global Sync</p>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">My Calendar</h1>
      </motion.header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Calendar events={allEvents} />
      </motion.div>
    </div>
  );
}
