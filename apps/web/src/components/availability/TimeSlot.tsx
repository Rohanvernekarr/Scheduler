import { Clock, Trash2 } from 'lucide-react';

interface TimeSlotProps {
  startTime: string;
  endTime: string;
  onUpdate: (field: 'startTime' | 'endTime', value: string) => void;
  onRemove: () => void;
}

export function TimeSlot({ startTime, endTime, onUpdate, onRemove }: TimeSlotProps) {
  return (
    <div className="flex items-center gap-3 bg-white/[0.04] px-3 py-2.5 rounded-lg border border-white/[0.06] group hover:border-white/10 transition-all">
      <Clock size={13} className="text-zinc-100 shrink-0" />
      <input
        type="time"
        value={startTime}
        onChange={(e) => onUpdate('startTime', e.target.value)}
        className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 cursor-pointer outline-none"
        style={{ colorScheme: 'dark' }}
      />
      <span className="text-white/20 font-medium">—</span>
      <input
        type="time"
        value={endTime}
        onChange={(e) => onUpdate('endTime', e.target.value)}
        className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 cursor-pointer outline-none"
        style={{ colorScheme: 'dark' }}
      />
      <button
        onClick={onRemove}
        className="ml-auto p-1.5 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}
