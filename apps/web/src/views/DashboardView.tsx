import { useMemo, useState } from 'react';
import { getMeetings, getHostBookings } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { Info, MoreHorizontal, CheckCircle2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventRow } from '../components/dashboard/EventRow';
import { Link } from 'react-router-dom';
import { useSession } from '@repo/auth/client';

export default function DashboardView() {
  const { data: session } = useSession();
  const userId = session?.user.id;
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

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const allEvents = useMemo(() => {
    return [
      ...meetings.map((m: any) => ({ ...m, type: m.type || 'Meeting' })),
      ...bookings.map((b: any) => ({
        ...b,
        title: `Booking: ${b.guestEmail}`,
        type: 'Booking',
        description: `External booking from ${b.guestEmail}`
      }))
    ];
  }, [meetings, bookings]);

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const filtered = allEvents.filter(event => {
      const isPast = new Date(event.startTime) < now;
      return activeTab === 'completed' ? isPast : !isPast;
    });

    // Ascending for upcoming (soonest first), Descending for completed (recent first)
    return filtered.sort((a, b) => {
      const timeA = new Date(a.startTime).getTime();
      const timeB = new Date(b.startTime).getTime();
      return activeTab === 'upcoming' ? timeA - timeB : timeB - timeA;
    });
  }, [allEvents, activeTab]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isLoading = (meetingsStatus === 'pending' || bookingsStatus === 'pending') && userId;

  if (isLoading && allEvents.length === 0) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            Dashboard
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-white/60">
              <CheckCircle2 size={12} className="text-emerald-500 md:w-[14px]" />
              <span>Active</span>
            </div>
            <span className="bg-white/5 text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest px-1 md:px-1.5 py-0.5 rounded border border-white/10 font-bold">
              Default
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link to="/schedule" className="flex-1 md:flex-none">
            <button className="w-full bg-white text-black text-[11px] md:text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95">
              <Plus size={14} />
              Schedule
            </button>
          </Link>
          <button className="bg-transparent border border-white/10 text-white p-2.5 rounded-xl hover:bg-white/5 transition-colors">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-2xl p-4 md:p-6 shadow-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <MetricItem 
            label="Events" 
            value={`${allEvents.length}`} 
            isLoading={isLoading && allEvents.length === 0} 
          />
          <MetricItem 
            label="Bookings" 
            value={bookings.length} 
            isLoading={isLoading && bookings.length === 0} 
          />
          <MetricItem 
            label="Internal" 
            value={meetings.length} 
            isLoading={isLoading && meetings.length === 0} 
          />
          <MetricItem 
            label="Network" 
            value="857.1 kB" 
          />
        </div>
      </div>

      <section className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
            <h2 className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] italic">Recent Activity</h2>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 w-fit">
              <button 
                onClick={() => { setActiveTab('upcoming'); setCurrentPage(1); }}
                className={`px-3 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${
                  activeTab === 'upcoming' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => { setActiveTab('completed'); setCurrentPage(1); }}
                className={`px-3 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${
                  activeTab === 'completed' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-white/20 uppercase">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="divide-y divide-white/[0.03]">
          {isLoading && filteredEvents.length === 0 ? (
            <div className="p-8 space-y-4">
              <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
              <div className="h-12 bg-white/5 rounded-xl animate-pulse w-3/4" />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-12 text-center text-white/20 text-sm italic">
              No {activeTab} activity detected.
            </div>
          ) : (
            paginatedEvents.map((event: any) => <EventRow key={event.id} event={event} />)
          )}
        </div>
      </section>
    </div>
  );
}

function MetricItem({ label, value, isLoading }: { label: string; value: string | number; isLoading?: boolean }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
        <Info size={10} className="text-white/20" />
      </div>
      {isLoading ? (
        <div className="h-7 w-20 bg-white/5 animate-pulse rounded" />
      ) : (
        <p className="text-lg font-bold text-white tracking-tight">{value}</p>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-white/5 w-1/4 rounded-xl" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-32 bg-white/5 rounded-2xl" />
        <div className="h-32 bg-white/5 rounded-2xl" />
        <div className="h-32 bg-white/5 rounded-2xl" />
      </div>
      <div className="h-64 bg-white/5 rounded-2xl" />
    </div>
  );
}
