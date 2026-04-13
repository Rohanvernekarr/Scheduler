import { Clock, ExternalLink } from 'lucide-react';

interface EventRowProps {
  event: any;
}

export function EventRow({ event }: EventRowProps) {
  const date = new Date(event.startTime);
  
  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-black hover:bg-black hover:text-white transition-all group">
      <div className="flex items-center gap-6">
        <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-black border-2 border-black group-hover:border-white ${
          event.type === 'Booking' 
            ? 'bg-black text-white' 
            : 'bg-white text-black group-hover:bg-white group-hover:text-black'
        }`}>
          <span className="text-[10px] uppercase opacity-60 leading-none mb-1">
            {date.toLocaleString('default', { month: 'short' })}
          </span>
          <span className="text-xl leading-none">{date.getDate()}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-black text-lg uppercase tracking-tight">{event.title}</h4>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border group-hover:border-white ${
              event.type === 'Booking' 
                ? 'bg-black text-white' 
                : 'bg-white text-black group-hover:bg-white group-hover:text-black'
            }`}>
              {event.type}
            </span>
          </div>
          <p className="text-black/50 group-hover:text-white/60 text-sm flex items-center gap-3 font-medium">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span>•</span>
            <span>30 min duration</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-white/20 rounded-lg text-white">
          <ExternalLink size={18} />
        </button>
        <span className="px-4 py-1 bg-black text-white group-hover:bg-white group-hover:text-black text-[11px] font-black rounded-full uppercase tracking-widest border border-black group-hover:border-white transition-colors">
          {event.status || 'Confirmed'}
        </span>
      </div>
    </div>
  );
}
