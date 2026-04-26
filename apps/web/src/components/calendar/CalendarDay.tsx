import { useState } from 'react';
import type { DayData } from './types';
import { CalendarEventItem, EventTooltip } from './CalendarEvent';

export function CalendarDay({ day }: { day: DayData }) {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const isToday = new Date().toDateString() === day.date.toDateString();

  return (
    <div className={`min-h-[120px] p-4 border-r border-b border-white/[0.04] transition-all hover:bg-white/[0.02] relative group/day ${
      day.isCurrentMonth ? 'bg-transparent' : 'bg-white/[0.01] opacity-20 grayscale pointer-events-none'
    } ${isToday ? 'bg-emerald-500/[0.03]' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[11px] font-black italic tracking-tighter transition-colors ${
          isToday ? 'text-emerald-400' : 'text-zinc-600 group-hover/day:text-zinc-400'
        }`}>
          {day.date.getDate().toString().padStart(2, '0')}
        </span>
        {isToday && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />}
      </div>
      
      <div className="space-y-1">
        {day.events.map(event => (
          <div 
            key={event.id}
            onMouseEnter={() => setHoveredEventId(event.id)}
            onMouseLeave={() => setHoveredEventId(null)}
            className="relative"
          >
            <CalendarEventItem event={event} />
            {hoveredEventId === event.id && <EventTooltip event={event} />}
          </div>
        ))}
      </div>
    </div>
  );
}
