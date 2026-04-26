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
    <div className="bg-[#0d0d0d] border border-white/[0.06] rounded-[2.5rem] overflow-visible shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between p-8 bg-white/[0.01] border-b border-white/[0.06]">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
            {viewDate.toLocaleString('default', { month: 'long' })}
          </h2>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-2 italic">{viewDate.getFullYear()} // Operational Window</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all active:scale-95 group">
            <ChevronLeft size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
          </button>
          <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))} className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all active:scale-95 group">
            <ChevronRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-white/[0.04]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="p-5 text-center text-[9px] font-black uppercase text-zinc-700 tracking-[0.3em] italic">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 bg-white/[0.01]">
        {days.map((day, i) => <CalendarDay key={i} day={day} />)}
      </div>
    </div>
  );
}
