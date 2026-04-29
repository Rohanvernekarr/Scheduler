import { useState } from 'react';
import type { DayData } from './types';
import { CalendarEventItem, EventTooltip } from './CalendarEvent';

export function CalendarDay({ 
  day, 
  colIndex,
  isSelected,
  onSelect
}: { 
  day: DayData; 
  colIndex: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const isToday = new Date().toDateString() === day.date.toDateString();
  const isRightSide = colIndex >= 5;
  const hasEvents = day.events.length > 0;

  return (
    <div 
      onClick={onSelect}
      className={`min-h-[80px] md:min-h-[120px] p-2 md:p-4 border-r border-b border-white/[0.04] transition-all hover:bg-white/[0.02] relative group/day cursor-pointer ${
        day.isCurrentMonth ? 'bg-transparent' : 'bg-white/[0.01] opacity-20 grayscale pointer-events-none'
      } ${isToday ? 'bg-emerald-500/[0.03]' : ''} ${isSelected ? 'ring-1 ring-inset ring-zinc-500/50 bg-white/[0.03]' : ''}`}>
      <div className="flex justify-between items-start mb-2 md:mb-4">
        <span className={`text-[9px] md:text-[11px] font-black italic tracking-tighter transition-colors ${
          isSelected ? 'text-white' : isToday ? 'text-emerald-400' : 'text-zinc-600 group-hover/day:text-zinc-400'
        }`}>
          {day.date.getDate().toString().padStart(2, '0')}
        </span>
        <div className="flex gap-1">
          {isToday && <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />}
          {/* Mobile event indicator dot */}
          {hasEvents && (
            <div className="md:hidden w-1 h-1 bg-zinc-500 rounded-full" />
          )}
        </div>
      </div>
      
      <div className="hidden md:block space-y-1">
        {day.events.map(event => (
          <div 
            key={event.id}
            onMouseEnter={() => setHoveredEventId(event.id)}
            onMouseLeave={() => setHoveredEventId(null)}
            className="relative"
          >
            <CalendarEventItem event={event} />
            {hoveredEventId === event.id && <EventTooltip event={event} align={isRightSide ? 'right' : 'left'} />}
          </div>
        ))}
      </div>
    </div>
  );
}
