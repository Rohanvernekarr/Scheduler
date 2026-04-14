import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createMeeting, DEFAULT_USER_ID } from '../lib/api';
import { ScheduleForm } from '../components/scheduling/ScheduleForm';
import { motion } from 'framer-motion';

export default function ScheduleView() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: any) => createMeeting({
      ...data,
      hostId: DEFAULT_USER_ID,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    }),
    onSuccess: () => {
      navigate('/');
    },
  });

  return (
    <div className="max-w-3xl">
      <header className="mb-10">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-2">New Event</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">Schedule Meeting</h1>
          <p className="text-white/40 text-sm mt-1">Create a new event and notify your team instantly.</p>
        </motion.div>
      </header>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <ScheduleForm onSubmit={mutation.mutate} isPending={mutation.isPending} />
      </motion.div>
    </div>
  );
}
