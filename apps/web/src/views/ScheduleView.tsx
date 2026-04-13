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
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black tracking-tight mb-2 text-black">Schedule Meeting</h1>
          <p className="text-black/50 text-xl font-medium">Create a new event and notify your team instantly.</p>
        </motion.div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ScheduleForm
          onSubmit={mutation.mutate}
          isPending={mutation.isPending}
        />
      </motion.div>
    </div>
  );
}
