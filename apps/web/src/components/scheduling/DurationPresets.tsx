import { DURATIONS } from './constants';

interface DurationPresetsProps {
  selected: number | 'custom';
  onSelect: (value: number | 'custom') => void;
}

export function DurationPresets({ selected, onSelect }: DurationPresetsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06] w-full sm:w-auto">
      {DURATIONS.map((dur) => (
        <button
          key={dur.value}
          type="button"
          onClick={() => onSelect(dur.value)}
          className={`flex-1 sm:flex-none px-2.5 md:px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-tight transition-all text-center whitespace-nowrap ${
            selected === dur.value 
              ? 'bg-white text-black shadow-lg scale-105' 
              : 'text-white/30 hover:text-white/60 hover:bg-white/5'
          }`}
        >
          {dur.label}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onSelect('custom')}
        className={`flex-1 sm:flex-none px-2.5 md:px-3 py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-tight transition-all text-center whitespace-nowrap ${
          selected === 'custom' 
            ? 'bg-white text-black shadow-lg scale-105' 
            : 'text-white/30 hover:text-white/60 hover:bg-white/5'
        }`}
      >
        Custom
      </button>
    </div>
  );
}
