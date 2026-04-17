import { useState, useEffect } from 'react';
import { Button } from '@repo/ui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAvailability, updateAvailability } from '../lib/api';
import { CheckCircle2, Clock, Zap } from 'lucide-react';
import { DayRow } from '../components/availability/DayRow';
import { TargetedBooking } from '../components/availability/TargetedBooking';
import { motion, AnimatePresence } from 'framer-motion';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const USER_ID = 'cm9lndj6y0000ux3v8x9r9fzb';

export default function AvailabilityView() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'recurring' | 'one-off'>('recurring');
  const [localSchedule, setLocalSchedule] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: schedule = [], isLoading } = useQuery({
    queryKey: ['availability', USER_ID],
    queryFn: () => getAvailability(USER_ID),
  });

  useEffect(() => {
    if (schedule) setLocalSchedule(schedule);
  }, [schedule]);

  const mutation = useMutation({
    mutationFn: (newData: any) => updateAvailability(USER_ID, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
      setHasChanges(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
  });

  const updateSlot = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const next = [...localSchedule];
    next[index] = { ...next[index], [field]: value };
    setLocalSchedule(next);
    setHasChanges(true);
  };

  const removeSlot = (index: number) => {
    setLocalSchedule(localSchedule.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const addSlot = (dayIdx: number) => {
    setLocalSchedule([...localSchedule, { dayOfWeek: dayIdx, startTime: '09:00', endTime: '17:00' }]);
    setHasChanges(true);
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Scheduling Infrastructure</p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Availability</h1>
          <p className="text-white/30 text-sm mt-2 font-medium max-w-sm">
            Configure system uptime and dispatch targeted one-off booking links to clients.
          </p>
        </div>
        
        {/* Modern Tab Switcher */}
        <div className="flex p-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl relative">
          {[
            { id: 'recurring', label: 'Recurring', icon: Clock },
            { id: 'one-off', label: 'One-off Syncs', icon: Zap }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2.5 transition-colors z-10 ${
                activeTab === tab.id ? 'text-black' : 'text-white/40 hover:text-white/60'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-white rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'recurring' ? (
          <motion.div
            key="recurring"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-[#111111] border border-white/[0.06] rounded-3xl p-8">
               <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/[0.04]">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1 uppercase tracking-tight italic">Default Service Hours</h2>
                    <p className="text-white/30 text-xs font-medium">Your global weekly availability baseline.</p>
                  </div>
                  {showSuccess && <SuccessToast />}
               </div>
               
               <div className="space-y-3">
                {DAYS.map((day, dayIdx) => (
                  <DayRow
                    key={day}
                    day={day}
                    slots={localSchedule
                      .map((s, i) => ({ ...s, realIndex: i }))
                      .filter((s) => s.dayOfWeek === dayIdx)}
                    onAddSlot={() => addSlot(dayIdx)}
                    onUpdateSlot={updateSlot}
                    onRemoveSlot={removeSlot}
                  />
                ))}
              </div>

              <div className="mt-12 flex justify-end">
                <Button
                  size="lg"
                  disabled={!hasChanges || mutation.isPending}
                  onClick={() => mutation.mutate(localSchedule)}
                  className="px-12 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[11px] rounded-2xl py-6 h-auto transition-all shadow-xl shadow-white/5 active:scale-95"
                >
                  {mutation.isPending ? 'Propagating...' : 'Sync Schedule'}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="one-off"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
             <TargetedBooking />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessToast() {
  return (
    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl animate-in fade-in slide-in-from-right-4">
      <CheckCircle2 size={14} />
      <span className="text-[10px] font-black uppercase tracking-widest leading-none">Baseline Synced</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-16 bg-white/5 rounded-2xl w-1/3" />
      <div className="h-[500px] bg-white/5 rounded-[40px] w-full" />
    </div>
  );
}
