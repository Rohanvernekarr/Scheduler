import { CalendarDays, Plus } from 'lucide-react';
import { Button } from '@repo/ui';
import { TimeSlot } from './TimeSlot';

interface DayRowProps {
  day: string;
  slots: any[];
  onAddSlot: () => void;
  onUpdateSlot: (index: number, field: 'startTime' | 'endTime', value: string) => void;
  onRemoveSlot: (index: number) => void;
}

export function DayRow({ day, slots, onAddSlot, onUpdateSlot, onRemoveSlot }: DayRowProps) {
  const isActive = slots.length > 0;

  return (
    <div className="bg-[#111111] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/10 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
        <div className="flex items-center gap-3 w-44 shrink-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
            isActive
              ? 'bg-zinc-500/15 border-zinc-500/25 text-zinc-50'
              : 'bg-white/[0.03] border-white/[0.06] text-white/20'
          }`}>
            <CalendarDays size={16} />
          </div>
          <span className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-white/25'}`}>{day}</span>
        </div>

        <div className="flex-1 space-y-2">
          {slots.length === 0 ? (
            <p className="text-white/20 text-sm italic py-1">Unavailable</p>
          ) : (
            slots.map((slot, idx) => (
              <TimeSlot
                key={idx}
                startTime={slot.startTime}
                endTime={slot.endTime}
                onUpdate={(field, value) => onUpdateSlot(slot.realIndex, field, value)}
                onRemove={() => onRemoveSlot(slot.realIndex)}
              />
            ))
          )}
        </div>

        <div className="sm:ml-4 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddSlot}
            className="gap-1.5 text-white/40 hover:text-white border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] rounded-xl text-xs"
          >
            <Plus size={14} />
            Add Slot
          </Button>
        </div>
      </div>
    </div>
  );
}
