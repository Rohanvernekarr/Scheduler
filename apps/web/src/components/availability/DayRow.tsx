import { CalendarDays, Plus } from 'lucide-react';
import { Card, Button } from '@repo/ui';
import { TimeSlot } from './TimeSlot';

interface DayRowProps {
  day: string;
  slots: any[];
  onAddSlot: () => void;
  onUpdateSlot: (index: number, field: 'startTime' | 'endTime', value: string) => void;
  onRemoveSlot: (index: number) => void;
}

export function DayRow({ day, slots, onAddSlot, onUpdateSlot, onRemoveSlot }: DayRowProps) {
  return (
    <Card className="p-0 overflow-hidden border-black bg-white hover:bg-black/5 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
        <div className="flex items-center gap-4 w-48">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-black ${
              slots.length > 0 ? 'bg-black text-white' : 'bg-white text-black/20 border-black/10'
            }`}
          >
            <CalendarDays size={20} />
          </div>
          <span className={`font-bold text-lg ${slots.length > 0 ? 'text-black' : 'text-black/20'}`}>{day}</span>
        </div>

        <div className="flex-1 space-y-3">
          {slots.length === 0 ? (
            <p className="text-black/20 italic text-sm py-2">Unavailable</p>
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

        <div className="sm:ml-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddSlot}
            className="gap-2 text-black border-2 border-black hover:bg-black hover:text-white transition-all rounded-xl"
          >
            <Plus size={16} />
            Add Slot
          </Button>
        </div>
      </div>
    </Card>
  );
}
