import { useState } from 'react';
import type { DayData } from './types';
import { CalendarEventItem, EventTooltip } from './CalendarEvent';

export function CalendarDay({ day }: { day: DayData }) {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const isToday = new Date().toDateString() === day.date.toDateString();

  return (
    <div className={`min-h-[100px] p-2 border-r border-b border-white/[0.03] transition-colors ${
      day.isCurrentMonth ? 'bg-transparent' : 'bg-white/[0.01] opacity-30'
    } ${isToday ? 'bg-white/[0.02]' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-black italic tracking-tighter ${
          isToday ? 'text-white' : 'text-zinc-600'
        }`}>
          {day.date.getDate()}
        </span>
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
