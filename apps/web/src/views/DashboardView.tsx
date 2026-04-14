import { useMemo } from 'react';
import { Button } from '@repo/ui';
import { getMeetings, getHostBookings } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Users, Clock, Plus } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { EventRow } from '../components/dashboard/EventRow';
import { Link } from 'react-router-dom';

const USER_ID = 'cm9lndj6y0000ux3v8x9r9fzb';

export default function DashboardView() {
  const { data: meetings = [], isLoading: isLoadingMeetings } = useQuery({
    queryKey: ['meetings', USER_ID],
    queryFn: () => getMeetings(USER_ID),
  });

  const { data: bookings = [], isLoading: isLoadingBookings } = useQuery({
    queryKey: ['bookings', USER_ID],
    queryFn: () => getHostBookings(USER_ID),
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

  if (isLoadingMeetings || isLoadingBookings) return <DashboardSkeleton />;

  const stats = [
    { label: 'Total Events', value: allEvents.length, icon: Calendar },
    { label: 'External Bookings', value: bookings.length, icon: Clock },
    { label: 'Internal Meetings', value: meetings.length, icon: Users },
  ];

  return (
    <div className="max-w-6xl">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <p className="text-xs font-semibold text-zinc-100 uppercase tracking-widest mb-2">Overview</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Welcome back — here's your current schedule.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="md">Settings</Button>
          <Link to="/schedule">
            <Button size="md" className="gap-2">
              <Plus size={16} />
              New Meeting
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => <StatsCard key={stat.label} {...stat} />)}
      </div>

      <section className="bg-[#111111] rounded-2xl border border-white/[0.06] overflow-hidden">
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest">Upcoming Schedule</h2>
          <button className="text-zinc-100 font-semibold text-xs uppercase tracking-widest hover:text-zinc-300 transition-colors">
            View All
          </button>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {allEvents.length === 0 ? (
            <div className="p-20 text-center">
              <Calendar size={32} className="text-white/10 mx-auto mb-4" />
              <p className="text-white/20 font-medium text-sm">No events scheduled yet.</p>
            </div>
          ) : (
            allEvents.map((event: any) => <EventRow key={event.id} event={event} />)
          )}
        </div>
      </section>
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
