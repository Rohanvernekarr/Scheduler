import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { CalendarDay } from './CalendarDay';
import type { CalendarEvent } from './types';

export function Calendar({ events }: { events: CalendarEvent[] }) {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[] | null>(null);
  const [selectedDateLabel, setSelectedDateLabel] = useState<string | null>(null);

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
    <div className="space-y-6 md:space-y-10">
      <div className="bg-[#0d0d0d] border border-white/[0.06] rounded-[2rem] md:rounded-[2.5rem] overflow-visible shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 md:p-8 bg-white/[0.01] border-b border-white/[0.06] gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
              {viewDate.toLocaleString('default', { month: 'long' })}
            </h2>
            <p className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-2 italic">{viewDate.getFullYear()} // Operational Window</p>
          </div>
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            <button onClick={() => { setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1)); setSelectedDayEvents(null); }} className="flex-1 sm:flex-none p-3 md:p-4 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all active:scale-95 group flex justify-center">
              <ChevronLeft size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
            </button>
            <button onClick={() => { setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1)); setSelectedDayEvents(null); }} className="flex-1 sm:flex-none p-3 md:p-4 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all active:scale-95 group flex justify-center">
              <ChevronRight size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 border-b border-white/[0.04]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="p-3 md:p-5 text-center text-[8px] md:text-[9px] font-black uppercase text-zinc-700 tracking-[0.1em] md:tracking-[0.3em] italic">
              <span className="hidden md:inline">{d}</span>
              <span className="md:hidden">{d[0]}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 bg-white/[0.01]">
          {days.map((day, i) => (
            <CalendarDay 
              key={i} 
              day={day} 
              colIndex={i % 7} 
              isSelected={selectedDateLabel === day.date.toDateString()}
              onSelect={() => {
                setSelectedDayEvents(day.events);
                setSelectedDateLabel(day.date.toDateString());
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile-only events list below the calendar */}
      {selectedDayEvents && (
        <div className="md:hidden space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black uppercase italic tracking-widest text-white/40">
              {new Date(selectedDateLabel!).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
            </h3>
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">{selectedDayEvents.length} Sessions</span>
          </div>
          
          <div className="space-y-2">
            {selectedDayEvents.length === 0 ? (
              <div className="bg-white/[0.02] border border-dashed border-white/5 rounded-2xl p-8 text-center">
                <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">No operational windows</p>
              </div>
            ) : (
              selectedDayEvents.map(event => (
                <div key={event.id} className="bg-[#111111] border border-white/[0.06] rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 shadow-[0_0_8px_rgba(113,113,122,0.4)]" />
                    <div>
                      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 italic">{event.category}</p>
                      <h4 className="text-sm font-black text-white uppercase italic tracking-tight leading-none">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-2 text-zinc-600">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold">
                          {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border ${
                    event.category === 'Internal' ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' :
                    event.category === 'External' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    Sync
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
