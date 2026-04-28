import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeetings, getHostBookings } from '../lib/api';
import { useSession } from '@repo/auth/client';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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
    return [
      ...meetings.map((m: any) => ({ 
        ...m, 
        title: m?.title || 'Internal Sync',
        category: 'Internal',
        startTime: m?.startTime || new Date().toISOString()
      })),
      ...bookings.map((b: any) => ({
        ...b,
        title: b?.title || `External Booking`,
        category: 'External',
        startTime: b?.startTime || new Date().toISOString(),
        description: `Meeting with ${b?.guestName || b?.guestEmail || 'Guest'}`
      }))
    ];
  }, [meetings, bookings]);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const query = searchQuery?.toLowerCase() || '';

    const filtered = allEvents.filter(event => {
      if (!event?.startTime) return false;
      const eventDate = new Date(event.startTime);
      const isPast = eventDate < now;
      const isCancelled = event.status === 'CANCELLED';

      if (activeTab === 'cancelled') return isCancelled;
      if (isCancelled) return false;
      if (activeTab === 'past') return isPast;
      if (activeTab === 'upcoming') return !isPast;
      
      return true;
    }).filter(event => 
      (event.title?.toLowerCase() || '').includes(query) ||
      (event.guestEmail?.toLowerCase() || '').includes(query) ||
      (event.guestName?.toLowerCase() || '').includes(query) ||
      (event.participants?.some((p: any) => (p?.email || p || '').toLowerCase().includes(query)))
    );

    return filtered.sort((a, b) => {
      const timeA = new Date(a.startTime).getTime();
      const timeB = new Date(b.startTime).getTime();
      return activeTab === 'upcoming' ? timeA - timeB : timeB - timeA;
    });
  }, [allEvents, activeTab, searchQuery]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isLoading = (meetingsStatus === 'pending' || bookingsStatus === 'pending') && userId;
  if (isLoading && filteredEvents.length === 0) return <LoadingState />;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <BookingsHeader 
          upcomingCount={allEvents.filter(e => new Date(e.startTime) > new Date() && e.status !== 'CANCELLED').length}
          completedCount={allEvents.filter(e => new Date(e.startTime) <= new Date() && e.status !== 'CANCELLED').length}
        />
        
        {totalPages > 1 && (
          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-2xl mb-2">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white disabled:opacity-10 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white disabled:opacity-10 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <BookingsToolbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setCurrentPage(1); }} 
        searchQuery={searchQuery} 
        setSearchQuery={(q) => { setSearchQuery(q); setCurrentPage(1); }} 
      />

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {paginatedEvents.length === 0 ? (
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
            paginatedEvents.map((event) => (
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
