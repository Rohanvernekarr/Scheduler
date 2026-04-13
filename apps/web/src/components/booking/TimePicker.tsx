import { Clock, ChevronRight } from 'lucide-react';

interface TimePickerProps {
  availableSlots: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimePicker({ availableSlots, selectedTime, onSelectTime }: TimePickerProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
        <Clock className="text-black" />
        2. Select Time
      </h2>
      <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
        {availableSlots.length > 0 ? (
          availableSlots.map(time => (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between group ${
                selectedTime === time
                  ? 'bg-black border-black text-white'
                  : 'bg-white border-black text-black hover:bg-black/5'
              }`}
            >
              <span className="font-bold">{time}</span>
              <ChevronRight
                size={18}
                className={selectedTime === time ? 'text-white' : 'text-black/30 group-hover:text-black'}
              />
            </button>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-black/30 space-y-4 py-12">
            <Clock size={48} className="opacity-10" />
            <p className="font-medium">No slots available</p>
          </div>
        )}
      </div>
    </div>
  );
}
