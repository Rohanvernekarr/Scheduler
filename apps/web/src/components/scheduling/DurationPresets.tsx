import { motion } from 'framer-motion';

export interface DurationOption {
  value: number;
  label: string;
}

export const DURATIONS: DurationOption[] = [
  { value: 15, label: '15m' },
  { value: 30, label: '30m' },
  { value: 45, label: '45m' },
  { value: 60, label: '1h' },
  { value: 90, label: '1.5h' },
  { value: 120, label: '2h' },
];

interface DurationPresetsProps {
  selected: number | 'custom';
  onSelect: (value: number | 'custom') => void;
}

export function DurationPresets({ selected, onSelect }: DurationPresetsProps) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
      {DURATIONS.map((dur) => (
        <button
          key={dur.value}
          type="button"
          onClick={() => onSelect(dur.value)}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
            selected === dur.value 
              ? 'bg-zinx-300 text-white shadow-sm' 
              : 'text-white/30 hover:text-white/60 hover:bg-white/5'
          }`}
        >
          {dur.label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onSelect('custom')}
        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
          selected === 'custom' 
            ? 'bg-zinx-300 text-white shadow-sm' 
            : 'text-white/30 hover:text-white/60 hover:bg-white/5'
        }`}
      >
        Custom
      </button>
    </div>
  );
}
