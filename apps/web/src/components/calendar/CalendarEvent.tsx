import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type  { CalendarEvent } from './types';

export function CalendarEventItem({ event }: { event: CalendarEvent }) {
  const categoryColors = {
    Internal: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    External: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Availability: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <div className={`p-1 md:p-1.5 rounded-md md:rounded-lg border text-[8px] md:text-[9px] font-bold truncate mb-1 ${categoryColors[event.category]}`}>
      <span className="hidden md:inline">
        {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} 
      </span>
      <span className="md:ml-1">{event.title}</span>
    </div>
  );
}

export function EventTooltip({ event, align = 'left' }: { event: CalendarEvent; align?: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={`absolute bottom-full mb-3 z-[100] w-64 p-5 bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-none ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
    >
      <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-1 italic">{event.category}</p>
      <h4 className="text-xs font-black text-white uppercase italic leading-tight mb-2">{event.title}</h4>
      <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold mb-1">
        <Clock size={10} />
        {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}
      </div>
      {event.description && (
        <p className="text-[9px] text-zinc-400 leading-relaxed mt-2 border-t border-white/5 pt-2 ">
          {event.description}
        </p>
      )}
    </motion.div>
  );
}
