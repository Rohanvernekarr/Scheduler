import { Clock, Video, User, MoreHorizontal, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingRowProps {
  event: any;
}

export function BookingRow({ event }: BookingRowProps) {
  const date = new Date(event.startTime);
  const isPast = date < new Date();
  const participantName = event.guestName || event.guestEmail?.split('@')[0] || 'Team Participant';
  const participantEmail = event.guestEmail || 'Internal Sync';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-[#0d0d0d] border border-white/[0.06] hover:border-white/20 rounded-[2.5rem] p-6 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row items-center gap-10">
        
        <div className="flex items-center gap-6 shrink-0">
          <div className="w-16 h-16 rounded-[1.5rem] bg-white text-black flex flex-col items-center justify-center shadow-2xl">
            <span className="text-[10px] font-black uppercase tracking-tighter leading-none">{date.toLocaleString('default', { month: 'short' })}</span>
            <span className="text-2xl font-black leading-none mt-1">{date.getDate()}</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-500">
              <Clock size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-white font-bold text-lg leading-none italic">{date.toLocaleString('default', { weekday: 'long' })}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-5 w-full bg-white/[0.02] border border-white/5 rounded-[1.8rem] p-4 group-hover:bg-white/[0.04] transition-all">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-600 group-hover:text-zinc-400 transition-colors">
            <User size={24} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-0.5 leading-none italic">Booked With</p>
            <h4 className="text-xl font-black text-white tracking-tight truncate uppercase italic">{participantName}</h4>
            <div className="flex items-center gap-2 text-zinc-500 mt-1">
              <Mail size={11} />
              <span className="text-[10px] font-bold truncate tracking-wide">{participantEmail}</span>
            </div>
          </div>
        </div>

        <div className="min-w-[180px] space-y-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${
              event.category === 'External' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-white/5 text-white/40 border-white/10'
            }`}>
              {event.category}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white/60 line-clamp-1">{event.title}</h3>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
          {!isPast && event.status !== 'CANCELLED' && (
            <button className="flex-1 lg:flex-none px-6 py-3.5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5 group/btn">
              <Video size={14} className="group-hover/btn:scale-110 transition-transform" />
              Join Call
            </button>
          )}
          <button className="p-3.5 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
            <MoreHorizontal size={20} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
