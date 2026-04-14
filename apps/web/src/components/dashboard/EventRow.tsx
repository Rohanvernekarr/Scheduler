import { Clock, ExternalLink } from 'lucide-react';

interface EventRowProps {
  event: any;
}

export function EventRow({ event }: EventRowProps) {
  const date = new Date(event.startTime);
  const isBooking = event.type === 'Booking';

  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-all group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 ${
          isBooking
            ? 'bg-zinc-500/15 border border-zinc-500/20 text-zinc-300'
            : 'bg-white/5 border border-white/10 text-white/60'
        }`}>
          <span className="text-[9px] uppercase opacity-70 leading-none mb-0.5">
            {date.toLocaleString('default', { month: 'short' })}
          </span>
          <span className="text-base leading-none">{date.getDate()}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-semibold text-sm text-white">{event.title}</h4>
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${
              isBooking
                ? 'bg-zinc-500/15 text-zinc-100 border border-zinc-500/20'
                : 'bg-white/5 text-white/40 border border-white/10'
            }`}>
              {event.type}
            </span>
          </div>
          <p className="text-white/35 text-xs flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-white/15">•</span>
            <span>30 min</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white">
          <ExternalLink size={14} />
        </button>
        <span className={`px-3 py-1 text-[11px] font-semibold rounded-full uppercase tracking-wider ${
          event.status === 'CANCELLED'
            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          {event.status || 'Confirmed'}
        </span>
      </div>
    </div>
  );
}
