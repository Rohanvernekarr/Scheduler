import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createMeeting, DEFAULT_USER_ID } from '../lib/api';
import { ScheduleForm } from '../components/scheduling/ScheduleForm';
import { motion } from 'framer-motion';
import { CalendarClock, Zap, Bell, Globe } from 'lucide-react';

export default function ScheduleView() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: any) =>
      createMeeting({
        ...data,
        hostId: DEFAULT_USER_ID,
      }),
    onSuccess: () => {
      navigate('/');
    },
  });

  const highlights = [
    { icon: Zap, label: 'Instant invites', desc: 'All participants notified via email immediately' },
    { icon: Bell, label: 'Smart reminders', desc: '24h and 1h before the event' },
    { icon: Globe, label: 'Timezone aware', desc: 'Shown in each attendee\'s local time' },
  ];

  return (
    <div className="max-w-7xl flex flex-col xl:flex-row gap-8">

      {/* ── Left: Form ── */}
      <div className="flex-1 min-w-0">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">
            New Event
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">Schedule a Meeting</h1>
          <p className="text-white/35 text-sm mt-1">
            Fill in the details below — invites go out the moment you hit schedule.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
        >
          <ScheduleForm onSubmit={mutation.mutate} isPending={mutation.isPending} />
        </motion.div>
      </div>

      {/* ── Right: Info Panel ── */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="xl:w-72 shrink-0 space-y-4"
      >
        {/* Hero card */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-5">
            <CalendarClock size={22} />
          </div>
          <h2 className="text-base font-bold text-white mb-1">Smart Scheduling</h2>
          <p className="text-white/35 text-sm leading-relaxed">
            Scheduler automatically handles invites, reminders, and timezone conversions for all attendees.
          </p>
        </div>

        {/* Highlights */}
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.04]">
          {highlights.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 p-4 hover:bg-white/[0.02] transition-colors">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <Icon size={14} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips box */}
        <div className="bg-indigo-950/40 border border-indigo-500/15 rounded-2xl p-5">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Tip</p>
          <p className="text-white/40 text-xs leading-relaxed">
            Add a video link (Google Meet, Zoom, Teams) so attendees can join with a single click from their invite.
          </p>
        </div>
      </motion.aside>
    </div>
  );
}
