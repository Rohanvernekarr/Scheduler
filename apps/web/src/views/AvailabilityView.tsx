import { useState, useEffect } from 'react';
import { Card, Button } from '@repo/ui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAvailability, updateAvailability } from '../lib/api';
import { Clock, Plus, Trash2, CalendarDays, CheckCircle2 } from 'lucide-react';

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
    if (schedule) {
      setLocalSchedule(schedule);
    }
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

  const addSlot = (dayIndex: number) => {
    const next = [...localSchedule, { dayOfWeek: dayIndex, startTime: '09:00', endTime: '17:00' }];
    setLocalSchedule(next);
    setHasChanges(true);
  };

  const removeSlot = (index: number) => {
    const next = localSchedule.filter((_, i) => i !== index);
    setLocalSchedule(next);
    setHasChanges(true);
  };

  const updateSlot = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const next = [...localSchedule];
    next[index] = { ...next[index], [field]: value };
    setLocalSchedule(next);
    setHasChanges(true);
  };

  const handleSave = () => {
    mutation.mutate(localSchedule.map(s => ({
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      endTime: s.endTime
    })));
  };

  if (isLoading) return <div className="animate-pulse space-y-4">
    <div className="h-12 bg-white/5 rounded-2xl w-1/4" />
    <div className="h-64 bg-white/5 rounded-3xl w-full" />
  </div>;

  return (
    <div className="max-w-5xl">
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-black">Availability</h1>
          <p className="text-black/50 text-lg font-medium">Define when you are reachable for bookings.</p>
        </div>
        
        {showSuccess && (
          <div className="flex items-center gap-2 text-black bg-white border-2 border-black px-4 py-2 rounded-xl animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Saved Successfully</span>
          </div>
        )}
      </header>

      <div className="space-y-6">
        {DAYS.map((day, dayIdx) => {
          const slots = localSchedule.filter((s: any) => s.dayOfWeek === dayIdx);
          
          return (
            <Card key={day} className="p-0 overflow-hidden border-black bg-white hover:bg-black/5 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
                <div className="flex items-center gap-4 w-48">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black ${slots.length > 0 ? 'bg-black text-white' : 'bg-white text-black/20 border-black/10'}`}>
                    <CalendarDays size={20} />
                  </div>
                  <span className={`font-bold text-lg ${slots.length > 0 ? 'text-black' : 'text-black/20'}`}>{day}</span>
                </div>

                <div className="flex-1 space-y-3">
                  {slots.length === 0 ? (
                    <p className="text-black/20 italic text-sm py-2">Unavailable</p>
                  ) : (
                    slots.map((slot: any, idx: number) => {
                      const realIndex = localSchedule.indexOf(slot);
                      return (
                        <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-black group transition-all hover:shadow-md">
                          <Clock size={16} className="text-black" />
                          <input 
                            type="time" 
                            value={slot.startTime} 
                            onChange={(e) => updateSlot(realIndex, 'startTime', e.target.value)}
                            className="bg-transparent border-none text-black font-bold focus:ring-0 cursor-pointer"
                          />
                          <span className="text-black/30 font-black tracking-tighter">—</span>
                          <input 
                            type="time" 
                            value={slot.endTime} 
                            onChange={(e) => updateSlot(realIndex, 'endTime', e.target.value)}
                            className="bg-transparent border-none text-black font-bold focus:ring-0 cursor-pointer"
                          />
                          <button 
                            onClick={() => removeSlot(realIndex)}
                            className="ml-auto p-2 text-black/20 hover:text-black transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="sm:ml-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addSlot(dayIdx)}
                    className="gap-2 text-black border-2 border-black hover:bg-black hover:text-white transition-all rounded-xl"
                  >
                    <Plus size={16} />
                    Add Slot
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 flex justify-end sticky bottom-8">
        <Button 
          size="lg" 
          disabled={!hasChanges || mutation.isPending}
          onClick={handleSave}
          className={`px-12 rounded-xl border-4 border-black font-black uppercase tracking-widest transition-all ${hasChanges ? 'bg-black text-white' : 'bg-white text-black/20 border-black/10 opacity-50'}`}
        >
          {mutation.isPending ? 'Saving...' : 'Save Schedule'}
        </Button>
      </div>
    </div>

  );
}

