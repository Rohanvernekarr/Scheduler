import { useMemo } from 'react';
import { Card, Button } from '@repo/ui';
import { getMeetings, getHostBookings } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Users, Clock, ArrowUpRight, ExternalLink } from 'lucide-react';

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
      ...meetings.map((m: any) => ({ ...m, type: 'Meeting' })),
      ...bookings.map((b: any) => ({ 
        ...b, 
        title: `Booking: ${b.guestEmail}`, 
        type: 'Booking',
        description: `External booking from ${b.guestEmail}`
      }))
    ];
    
    return combined.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [meetings, bookings]);

  const stats = [
    { label: 'Total Events', value: allEvents.length, icon: Calendar, color: 'text-indigo-400' },
    { label: 'External Bookings', value: bookings.length, icon: Clock, color: 'text-purple-400' },
    { label: 'Internal Meetings', value: meetings.length, icon: Users, color: 'text-emerald-400' },
  ];

  if (isLoadingMeetings || isLoadingBookings) return (
    <div className="animate-pulse space-y-8">
      <div className="h-10 bg-white/5 w-1/4 rounded-xl" />
      <div className="grid grid-cols-3 gap-6">
        <div className="h-40 bg-white/5 rounded-3xl" />
        <div className="h-40 bg-white/5 rounded-3xl" />
        <div className="h-40 bg-white/5 rounded-3xl" />
      </div>
    </div>
  );

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
        {stats.map((stat) => (
          <Card key={stat.label} className="p-8 group relative overflow-hidden border-black bg-white">
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-black`}>
              <stat.icon size={80} />
            </div>
            <p className="text-black/40 font-black uppercase tracking-widest text-[10px] mb-2">{stat.label}</p>
            <p className="text-5xl font-black text-black">{stat.value}</p>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-black text-black bg-black/5 px-2 py-1 rounded-md w-fit border border-black/10">
              <ArrowUpRight size={12} />
              LIVE UPDATE
            </div>
          </Card>
        ))}
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
            allEvents.map((event: any) => (
              <div key={event.id} className="flex items-center justify-between p-6 bg-white rounded-xl border border-black hover:bg-black hover:text-white transition-all group">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-black border-2 border-black group-hover:border-white ${event.type === 'Booking' ? 'bg-black text-white' : 'bg-white text-black group-hover:bg-white group-hover:text-black'}`}>
                    <span className="text-[10px] uppercase opacity-60 leading-none mb-1">{new Date(event.startTime).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-xl leading-none">{new Date(event.startTime).getDate()}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-black text-lg uppercase tracking-tight">{event.title}</h4>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border group-hover:border-white ${event.type === 'Booking' ? 'bg-black text-white' : 'bg-white text-black group-hover:bg-white group-hover:text-black'}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-black/50 group-hover:text-white/60 text-sm flex items-center gap-3 font-medium">
                      <span className="flex items-center gap-1"><Clock size={14} /> {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>•</span>
                      <span>30 min duration</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-white/20 rounded-lg text-white">
                    <ExternalLink size={18} />
                  </button>
                  <span className="px-4 py-1 bg-black text-white group-hover:bg-white group-hover:text-black text-[11px] font-black rounded-full uppercase tracking-widest border border-black group-hover:border-white transition-colors">
                    {event.status || 'Confirmed'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>

  );
}

