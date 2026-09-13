import { Clock, ChevronRight } from 'lucide-react';

interface TimePickerProps {
  availableSlots: Array<{
    label: string;
    startTime: string;
    endTime: string;
  }>;
  isLoading?: boolean;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimePicker({ availableSlots, isLoading, selectedTime, onSelectTime }: TimePickerProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest flex items-center gap-2">
        <Clock size={14} className="text-zinc-50" />
        Select Time
      </h2>

      <div className="max-h-[320px] overflow-y-auto pr-1 space-y-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-white/20 space-y-3 py-10">
            <div className="w-8 h-8 border-2 border-zinc-500/30 border-t-zinc-500 rounded-full animate-spin" />
            <p className="text-sm font-medium">Checking availability</p>
          </div>
        ) : availableSlots.length > 0 ? (
          availableSlots.map(slot => (
            <button
              key={slot.startTime}
              onClick={() => onSelectTime(slot.startTime)}
              className={`w-full p-3.5 rounded-xl border transition-all flex items-center justify-between group text-sm font-medium ${
                selectedTime === slot.startTime
                  ? 'bg-zinc-300/10 border-zinc-500 text-white shadow-lg shadow-zinc-500/20'
                  : 'bg-white/[0.04] border-white/[0.06] text-white/60 hover:bg-white/[0.07] hover:text-white hover:border-white/10'
              }`}
            >
              <span>{slot.label}</span>
              <ChevronRight
                size={15}
                className={selectedTime === slot.startTime ? 'text-white/70' : 'text-white/20 group-hover:text-white/40'}
              />
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-white/20 space-y-3 py-10">
            <Clock size={36} className="opacity-20" />
            <p className="text-sm font-medium">No slots available</p>
          </div>
        )}
      </div>
    </div>
  );
}
