import { Calendar } from 'lucide-react';

interface CalendarPickerProps {
  days: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  availabilities: any[];
}

export function CalendarPicker({ days, selectedDate, onSelectDate, availabilities }: CalendarPickerProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
        <Calendar className="text-black" />
        1. Select Date
      </h2>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <div key={d} className="text-[10px] font-black text-black/40 text-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {days.map((date, i) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const hasSlots = availabilities.some((a: any) => a.dayOfWeek === date.getDay());

          return (
            <button
              key={i}
              disabled={!hasSlots}
              onClick={() => onSelectDate(date)}
              className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all border ${
                isSelected
                  ? 'bg-black border-black text-white shadow-lg'
                  : hasSlots
                    ? 'bg-white border-black text-black hover:bg-black/5'
                    : 'opacity-20 cursor-not-allowed border-transparent'
              }`}
            >
              <span className="text-[10px] font-black uppercase opacity-60 mb-1">
                {date.toLocaleDateString(undefined, { weekday: 'short' })}
              </span>
              <span className="text-lg font-black">{date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
