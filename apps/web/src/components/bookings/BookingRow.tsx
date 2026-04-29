import { Clock, Video, User, MoreHorizontal, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingRowProps {
  event: any;
}

export function BookingRow({ event }: BookingRowProps) {
  const date = new Date(event.startTime);
  const isPast = date < new Date();
  const participantEmails = (event.participants || []).map((p: any) => p.email);
  const firstEmail = participantEmails[0] || 'Team Sync';
  
  const participantName = event.guestName || (participantEmails.length > 0 ? firstEmail.split('@')[0] : 'Internal Meeting');
  const participantEmail = event.guestEmail || (participantEmails.length > 0 ? participantEmails.join(', ') : 'No participants invited');

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-[#0d0d0d] border border-white/[0.04] hover:border-white/10 rounded-2xl md:rounded-[2rem] p-3 md:p-5 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-8">
        
        <div className="flex items-center justify-between md:justify-start gap-3 md:gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-white text-black flex flex-col items-center justify-center shadow-lg md:shadow-xl shrink-0">
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-tighter leading-none">{date.toLocaleString('default', { month: 'short' })}</span>
              <span className="text-sm md:text-xl font-black leading-none mt-0.5">{date.getDate()}</span>
            </div>
            
            <div className="space-y-0 md:space-y-0.5">
              <div className="flex items-center gap-1 text-zinc-600 md:text-zinc-500 mb-2">
                <Clock size={9} className="md:w-3 md:h-3" />
                <span className="text-[9px] md:text-[12px] font-black uppercase tracking-widest leading-none">
                  {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-white/40 md:text-white/60 font-bold text-xs md:text-md leading-none italic">{date.toLocaleString('default', { weekday: 'long' })}</p>
            </div>
          </div>

          <div className="md:hidden">
             <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border ${
              event.category === 'External' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-white/40 border-white/10'
            }`}>
              {event.category}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-3 md:gap-4 w-full bg-white/[0.01] border border-white/5 rounded-xl md:rounded-2xl p-2 md:p-3 group-hover:bg-white/[0.03] transition-all overflow-hidden">
          <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0">
            <User size={14} className="md:w-[18px]" />
          </div>
          <div className="min-w-0">
            <p className="hidden md:block text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-0.5 leading-none italic">Booked With</p>
            <h4 className="text-xs md:text-md font-black text-white tracking-tight truncate uppercase leading-tight">{participantName}</h4>
            <div className="flex items-center gap-1.5 text-emerald-500/60 mt-0.5 font-bold">
              <Mail size={9} className="md:w-[10px]" />
              <span className="text-[8px] md:text-[11px] truncate tracking-wide">{participantEmail}</span>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:min-w-[150px] shrink-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-black uppercase tracking-widest border ${
              event.category === 'External' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-white/40 border-white/10'
            }`}>
              {event.category}
            </span>
          </div>
          <h3 className="text-[10px] md:text-md font-bold text-white/40 line-clamp-1 italic">{event.title}</h3>
        </div>

        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto shrink-0 mt-1 md:mt-0">
          {!isPast && event.status !== 'CANCELLED' && (
            <button className="flex-1 md:flex-none px-3 py-2 md:px-4 md:py-2.5 bg-white text-black rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 group/btn">
              <Video size={10} className="md:w-3" />
              Join
            </button>
          )}
          <button className="p-2 md:p-2.5 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
            <MoreHorizontal size={14} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
