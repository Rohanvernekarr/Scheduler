import { Card, Button } from '@repo/ui';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAvailability, updateAvailability } from '../lib/api';
import { Clock, Plus, Trash2, CalendarDays } from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const USER_ID = 'cm9lndj6y0000ux3v8x9r9fzb';

export default function AvailabilityView() {
  const queryClient = useQueryClient();
  const { data: schedule = [] } = useQuery({
    queryKey: ['availability', USER_ID],
    queryFn: () => getAvailability(USER_ID),
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => updateAvailability(USER_ID, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
    },
  });

  const addSlot = (dayIndex: number) => {
    const next = [...schedule, { dayOfWeek: dayIndex, startTime: '09:00', endTime: '17:00' }];
    mutation.mutate(next);
  };

  const removeSlot = (index: number) => {
    const next = schedule.filter((_: any, i: number) => i !== index);
    mutation.mutate(next);
  };

  return (
    <div className="max-w-5xl">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2">Availability</h1>
        <p className="text-slate-400 text-lg">Define when you are reachable for bookings.</p>
      </header>

      <div className="space-y-6">
        {DAYS.map((day, dayIdx) => {
          const slots = schedule.filter((s: any) => s.dayOfWeek === dayIdx);
          
          return (
            <Card key={day} className="p-0 overflow-hidden border-white/5 bg-slate-900/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
                <div className="flex items-center gap-4 w-48">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                    <CalendarDays size={20} />
                  </div>
                  <span className="font-bold text-lg">{day}</span>
                </div>

                <div className="flex-1 space-y-3">
                  {slots.length === 0 ? (
                    <p className="text-slate-500 italic text-sm py-2">Unavailable</p>
                  ) : (
                    slots.map((slot: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 group">
                        <Clock size={16} className="text-indigo-400" />
                        <input 
                          type="time" 
                          value={slot.startTime} 
                          className="bg-transparent border-none text-white font-bold focus:ring-0"
                          readOnly
                        />
                        <span className="text-slate-600">to</span>
                        <input 
                          type="time" 
                          value={slot.endTime} 
                          className="bg-transparent border-none text-white font-bold focus:ring-0"
                          readOnly
                        />
                        <button 
                          onClick={() => removeSlot(schedule.indexOf(slot))}
                          className="ml-auto p-2 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="sm:ml-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addSlot(dayIdx)}
                    className="gap-2 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300"
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

      <div className="mt-12 flex justify-end">
        <Button size="lg" className="px-12 shadow-2xl shadow-indigo-500/40">
          Save Schedule
        </Button>
      </div>
    </div>
  );
}
