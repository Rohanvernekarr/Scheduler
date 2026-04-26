import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarDay } from './CalendarDay';
import type { CalendarEvent } from './types';

export function Calendar({ events }: { events: CalendarEvent[] }) {
  const [viewDate, setViewDate] = useState(new Date());

  const days = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const prevMonthDays = new Date(year, month, 0).getDate();
    const result = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthDays - i);
      result.push({ date: d, isCurrentMonth: false, events: events.filter(e => new Date(e.startTime).toDateString() === d.toDateString()) });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      result.push({ date: d, isCurrentMonth: true, events: events.filter(e => new Date(e.startTime).toDateString() === d.toDateString()) });
    }

    return result;
  }, [viewDate, events]);

  return (
    <div className="bg-[#111111] border border-white/[0.06] rounded-[2.5rem] overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between p-8 border-b border-white/[0.06]">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
          {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 bg-white/[0.02]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="p-4 text-center text-[10px] font-black uppercase text-zinc-600 tracking-widest">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-l border-t border-white/[0.03]">
        {days.map((day, i) => <CalendarDay key={i} day={day} />)}
      </div>
    </div>
  );
}
