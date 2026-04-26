import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetings, getHostBookings } from '../lib/api';
import { useSession } from '@repo/auth/client';
import { Calendar } from '../components/calendar/Calendar';
import type { CalendarEvent } from '../components/calendar/types';
import { motion } from 'framer-motion';

import { Calendar as CalendarIcon } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto space-y-10 relative">

      <motion.header 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
            <CalendarIcon size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] leading-none">System Infrastructure</p>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase  mt-1">Calendar Sync</h1>
          </div>
        </div>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <Calendar events={allEvents} />
      </motion.div>
    </div>
  );
}
