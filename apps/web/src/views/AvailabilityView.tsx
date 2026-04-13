import { useState, useEffect } from 'react';
import { Button } from '@repo/ui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAvailability, updateAvailability } from '../lib/api';
import { CheckCircle2 } from 'lucide-react';
import { DayRow } from '../components/availability/DayRow';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const USER_ID = 'cm9lndj6y0000ux3v8x9r9fzb';

export default function AvailabilityView() {
  const queryClient = useQueryClient();
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
    <div className="max-w-5xl">
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-black">Availability</h1>
          <p className="text-black/50 text-lg font-medium">Define when you are reachable for bookings.</p>
        </div>
        {showSuccess && <SuccessToast />}
      </header>

      <div className="space-y-6">
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

      <div className="mt-12 flex justify-end sticky bottom-8">
        <Button
          size="lg"
          disabled={!hasChanges || mutation.isPending}
          onClick={() => mutation.mutate(localSchedule)}
          className={`px-12 rounded-xl border-4 border-black font-black uppercase tracking-widest transition-all ${
            hasChanges ? 'bg-black text-white' : 'bg-white text-black/20 border-black/10 opacity-50'
          }`}
        >
          {mutation.isPending ? 'Saving...' : 'Save Schedule'}
        </Button>
      </div>
    </div>
  );
}

function SuccessToast() {
  return (
    <div className="flex items-center gap-2 text-black bg-white border-2 border-black px-4 py-2 rounded-xl animate-in fade-in slide-in-from-right-4">
      <CheckCircle2 size={18} />
      <span className="text-sm font-bold uppercase tracking-widest">Saved Successfully</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-white/5 rounded-2xl w-1/4" />
      <div className="h-64 bg-white/5 rounded-3xl w-full" />
    </div>
  );
}
