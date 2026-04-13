import { Card, Button } from '@repo/ui';
import { getMeetings } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Users, Clock, ArrowUpRight } from 'lucide-react';

export default function DashboardView() {
  const { data: meetings = [] } = useQuery({
    queryKey: ['meetings'],
    queryFn: getMeetings,
  });

  const stats = [
    { label: 'Total Meetings', value: meetings.length, icon: Calendar, color: 'text-indigo-400' },
    { label: 'Upcoming Bookings', value: '4', icon: Clock, color: 'text-purple-400' },
    { label: 'Active Participants', value: '28', icon: Users, color: 'text-emerald-400' },
  ];

  return (
    <div className="max-w-6xl">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Dashboard</h1>
          <p className="text-slate-400 text-lg">Welcome back, here is what is happening today.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" size="md">Settings</Button>
          <Button size="md">Create Meeting</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-8 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform ${stat.color}`}>
              <stat.icon size={80} />
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">{stat.label}</p>
            <p className="text-5xl font-black bg-white bg-clip-text text-transparent">{stat.value}</p>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full w-fit">
              <ArrowUpRight size={12} />
              +12.5% vs last month
            </div>
          </Card>
        ))}
      </div>

      <section className="bg-slate-900/40 backdrop-blur-3xl rounded-[32px] border border-white/5 p-8">
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="text-2xl font-bold">Upcoming Schedule</h2>
          <button className="text-indigo-400 font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {meetings.length === 0 ? (
            <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-slate-500">No meetings scheduled yet.</p>
            </div>
          ) : (
            meetings.map((meeting: any) => (
              <div key={meeting.id} className="flex items-center justify-between p-6 bg-white/3 rounded-2xl border border-white/5 hover:border-indigo-500/30 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xl">
                    {new Date(meeting.startTime).getDate()}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{meeting.title}</h4>
                    <p className="text-slate-500 text-sm">
                      {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • 1 hour
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[11px] font-bold rounded-full uppercase tracking-widest border border-emerald-500/20">
                    Confirmed
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
