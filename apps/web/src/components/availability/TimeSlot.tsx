import { Clock, Trash2 } from 'lucide-react';

interface TimeSlotProps {
  startTime: string;
  endTime: string;
  onUpdate: (field: 'startTime' | 'endTime', value: string) => void;
  onRemove: () => void;
}

export function TimeSlot({ startTime, endTime, onUpdate, onRemove }: TimeSlotProps) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-black group transition-all hover:shadow-md">
      <Clock size={16} className="text-black" />
      <input
        type="time"
        value={startTime}
        onChange={(e) => onUpdate('startTime', e.target.value)}
        className="bg-transparent border-none text-black font-bold focus:ring-0 cursor-pointer"
      />
      <span className="text-black/30 font-black tracking-tighter">—</span>
      <input
        type="time"
        value={endTime}
        onChange={(e) => onUpdate('endTime', e.target.value)}
        className="bg-transparent border-none text-black font-bold focus:ring-0 cursor-pointer"
      />
      <button
        onClick={onRemove}
        className="ml-auto p-2 text-black/20 hover:text-black transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
