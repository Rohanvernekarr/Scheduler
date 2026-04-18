import { useMemo } from 'react';
import { getMeetings, getHostBookings } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { Info, MoreHorizontal, CheckCircle2, Plus } from 'lucide-react';
import { EventRow } from '../components/dashboard/EventRow';
import { Link } from 'react-router-dom';
import { useSession } from '@repo/auth/client';

export default function DashboardView() {
  const { data: session } = useSession();
  const userId = session?.user.id;

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
      ...meetings.map((m: any) => ({ ...m, type: m.type || 'Meeting' })),
      ...bookings.map((b: any) => ({
        ...b,
        title: `Booking: ${b.guestEmail}`,
        type: 'Booking',
        description: `External booking from ${b.guestEmail}`
      }))
    ];
    return combined.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [meetings, bookings]);

  const isPending = (meetingsStatus === 'pending' || bookingsStatus === 'pending') && userId;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header  */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Dashboard
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>active_session</span>
            </div>
            <span className="bg-white/5 text-white/40 text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/10 font-bold">
              Default
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/schedule">
            <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-zinc-200 transition-colors">
              <Plus size={14} />
              Schedule
            </button>
          </Link>
          <button className="bg-transparent border border-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="bg-[#111111] border border-white/5 rounded-xl p-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricItem 
            label="Events" 
            value={`${allEvents.length} scheduled`} 
            isLoading={!!isPending && allEvents.length === 0} 
          />
          <MetricItem 
            label="External Bookings" 
            value={bookings.length} 
            isLoading={!!isPending && bookings.length === 0} 
          />
          <MetricItem 
            label="Internal Syncs" 
            value={meetings.length} 
            isLoading={!!isPending && meetings.length === 0} 
          />
          <MetricItem 
            label="Network usage" 
            value="857.1 kB" 
          />
        </div>
      </div>



      {/* Recent Activity */}
      <section className="bg-[#111111] rounded-xl border border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Recent Activity</h2>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {isPending && allEvents.length === 0 ? (
            <div className="p-8 space-y-4">
              <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
              <div className="h-12 bg-white/5 rounded-xl animate-pulse w-3/4" />
            </div>
          ) : allEvents.length === 0 ? (
            <div className="p-12 text-center text-white/20 text-sm">No recent activity detected.</div>
          ) : (
            allEvents.slice(0, 5).map((event: any) => <EventRow key={event.id} event={event} />)
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
