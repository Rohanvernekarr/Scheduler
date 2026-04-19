import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetings, getHostBookings } from '../lib/api';
import { useSession } from '@repo/auth/client';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingsHeader } from '../components/bookings/BookingsHeader';
import { BookingsToolbar } from '../components/bookings/BookingsToolbar';
import { BookingRow } from '../components/bookings/BookingRow';

type BookingStatus = 'upcoming' | 'past' | 'cancelled';

export default function BookingsView() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: meetings = [], status: meetingsStatus } = useQuery({
    queryKey: ['meetings', userId],
    queryFn: () => getMeetings(userId!),
    enabled: !!userId,
  });

  const { data: bookings = [], status: bookingsStatus } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => getHostBookings(userId!),
    enabled: !!userId,
  });

  const allEvents = useMemo(() => {
    const combined = [
      ...meetings.map((m: any) => ({ ...m, category: 'Internal' })),
      ...bookings.map((b: any) => ({
        ...b,
        title: `External Booking`,
        category: 'External',
        description: `Meeting with ${b.guestName || b.guestEmail}`
      }))
    ];
    
    return combined.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [meetings, bookings]);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    return allEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      const isPast = eventDate < now;
      const isCancelled = event.status === 'CANCELLED';

      if (activeTab === 'cancelled') return isCancelled;
      if (isCancelled) return false;
      if (activeTab === 'past') return isPast;
      if (activeTab === 'upcoming') return !isPast;
      
      return true;
    }).filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.guestEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.guestName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allEvents, activeTab, searchQuery]);

  if (meetingsStatus === 'pending' || bookingsStatus === 'pending') return <LoadingState />;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <BookingsHeader 
        upcomingCount={allEvents.filter(e => new Date(e.startTime) > new Date() && e.status !== 'CANCELLED').length}
        completedCount={allEvents.filter(e => new Date(e.startTime) <= new Date() && e.status !== 'CANCELLED').length}
      />

      <BookingsToolbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]"
            >
              <div className="w-16 h-16 bg-white/5 rounded-3xl mx-auto flex items-center justify-center text-white/10 mb-4">
                <Calendar size={32} />
              </div>
              <p className="text-white/20 font-bold uppercase tracking-widest text-xs">No bookings found in this category</p>
            </motion.div>
          ) : (
            filteredEvents.map((event) => (
              <BookingRow key={event.id} event={event} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-pulse">
      <div className="h-32 bg-white/5 rounded-[3rem]" />
      <div className="h-16 bg-white/5 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-24 bg-white/5 rounded-[2.5rem]" />
        <div className="h-24 bg-white/5 rounded-[2.5rem]" />
      </div>
    </div>
  );
}
