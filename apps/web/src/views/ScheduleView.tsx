import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createMeeting, getMeetings, getHostBookings } from '../lib/api';
import { ScheduleForm } from '../components/scheduling/ScheduleForm';
import { motion } from 'framer-motion';
import { CalendarClock, Zap, Bell, Globe } from 'lucide-react';
import { useSession } from '@repo/auth/client';
import toast from 'react-hot-toast';

export default function ScheduleView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: (data: any) =>
      createMeeting({
        ...data,
        hostId: userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
      toast.success('Protocol established successfully');
      navigate('/');
    },
  });

  const handleSchedule = (data: any) => {
    const newStart = new Date(data.startTime).getTime();
    const newEnd = new Date(data.endTime).getTime();

    const allEvents = [...meetings, ...bookings];
    const overlap = allEvents.find(e => {
      if (e.status === 'CANCELLED') return false;
      const eStart = new Date(e.startTime).getTime();
      const eEnd = new Date(e.endTime).getTime();
      return (newStart < eEnd && newEnd > eStart);
    });

    if (overlap) {
      const oStart = new Date(overlap.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const oEnd = new Date(overlap.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      toast.error(`Overlap detected: Conflict with "${overlap.title}" (${oStart} - ${oEnd})`, {
        style: { border: '1px solid rgba(239, 68, 68, 0.2)' },
        duration: 5000
      });
      return;
    }

    mutation.mutate(data);
  };

  const highlights = [
    { icon: Zap, label: 'Instant invites', desc: 'All participants notified via email immediately' },
    { icon: Bell, label: 'Smart reminders', desc: '24h and 1h before the event' },
    { icon: Globe, label: 'Timezone aware', desc: 'Shown in each attendee\'s local time' },
  ];

  return (
    <div className="max-w-7xl flex flex-col xl:flex-row gap-8 md:gap-10">

      <div className="flex-1 min-w-0">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 md:mb-3 italic">
            Initialization // New Event
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">Schedule a Meeting</h1>
          <p className="text-white/30 text-xs md:text-sm mt-3 font-medium max-w-2xl">
            Configure your operational parameters below. Automated invites and synchronization protocols will propagate upon confirmation.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          className="space-y-6"
        >
          <ScheduleForm onSubmit={handleSchedule} isPending={mutation.isPending} />
        </motion.div>
      </div>

      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="w-full xl:w-72 shrink-0 space-y-4 md:space-y-6"
      >
       
        <div className="bg-[#111111] border border-white/[0.06] rounded-[2rem] p-6 md:p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-zinc-500/5 border border-zinc-500/20 flex items-center justify-center text-white mb-6">
            <CalendarClock size={20} />
          </div>
          <h2 className="text-base font-black uppercase italic tracking-tighter text-white mb-2">Smart Scheduling</h2>
          <p className="text-white/30 text-xs leading-relaxed font-medium">
            Scheduler automatically handles invites, reminders, and timezone conversions for all attendees globally.
          </p>
        </div>

       
        <div className="bg-[#111111] border border-white/[0.06] rounded-[2rem] overflow-hidden divide-y divide-white/[0.04]">
          {highlights.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors">
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Icon size={14} />
              </div>
              <div>
                <p className="text-xs font-black uppercase italic tracking-tight text-white">{label}</p>
                <p className="text-[10px] text-zinc-500 font-medium mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      
        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 italic">Pro Tip</p>
          <p className="text-zinc-500 text-[11px] leading-relaxed font-medium">
            Add a video link (Google Meet, Zoom, Teams) so attendees can join with a single click from their invite protocol.
          </p>
        </div>
      </motion.aside>
    </div>
  );
}
