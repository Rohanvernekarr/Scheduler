import { useMemo } from 'react';
import { Button } from '@repo/ui';
import { getMeetings, getHostBookings } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Users, Clock } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { EventRow } from '../components/dashboard/EventRow';

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
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-black">Dashboard</h1>
          <p className="text-black/50 text-lg font-medium">Welcome back, here is your current schedule.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" size="md">Settings</Button>
          <Button size="md">Create Meeting</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => <StatsCard key={stat.label} {...stat} />)}
      </div>

      <section className="bg-white rounded-[24px] border-2 border-black p-8">
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="text-2xl font-black uppercase tracking-tight">Upcoming Schedule</h2>
          <button className="text-black font-black text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All</button>
        </div>
        <div className="space-y-4">
          {allEvents.length === 0 ? (
            <div className="p-20 text-center border-4 border-dashed border-black/10 rounded-[24px]">
              <p className="text-black/20 font-black uppercase tracking-widest">No events scheduled yet.</p>
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
      <div className="h-10 bg-white/5 w-1/4 rounded-xl" />
      <div className="grid grid-cols-3 gap-6">
        <div className="h-40 bg-white/5 rounded-3xl" />
        <div className="h-40 bg-white/5 rounded-3xl" />
        <div className="h-40 bg-white/5 rounded-3xl" />
      </div>
    </div>
  );
}
