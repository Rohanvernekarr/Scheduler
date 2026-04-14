import { Calendar } from 'lucide-react';

interface CalendarPickerProps {
  days: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  availabilities: any[];
}

export function CalendarPicker({ days, selectedDate, onSelectDate, availabilities }: CalendarPickerProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest flex items-center gap-2">
        <Calendar size={14} className="text-zinc-50" />
        Select Date
      </h2>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-[10px] font-semibold text-white/25 text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {days.map((date, i) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const hasSlots = availabilities.some((a: any) => a.dayOfWeek === date.getDay());

          return (
            <button
              key={i}
              disabled={!hasSlots}
              onClick={() => onSelectDate(date)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all border text-sm ${
                isSelected
                  ? 'bg-zinx-300 border-zinc-500 text-white shadow-lg shadow-zinc-500/25'
                  : hasSlots
                    ? 'bg-white/[0.04] border-white/[0.06] text-white hover:bg-white/[0.08] hover:border-white/10'
                    : 'opacity-20 cursor-not-allowed border-transparent'
              }`}
            >
              <span className="text-[9px] uppercase opacity-60 mb-0.5 leading-none">
                {date.toLocaleDateString(undefined, { weekday: 'short' })}
              </span>
              <span className="font-semibold">{date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
