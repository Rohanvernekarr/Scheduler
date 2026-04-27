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
      className="group bg-[#0d0d0d] border border-white/[0.06] hover:border-white/20 rounded-3xl p-4 transition-all duration-300"
    >
      <div className="flex flex-col lg:flex-row items-center gap-6">
        
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex flex-col items-center justify-center shadow-xl">
            <span className="text-[10px] font-black uppercase tracking-tighter leading-none">{date.toLocaleString('default', { month: 'short' })}</span>
            <span className="text-xl font-black leading-none mt-0.5">{date.getDate()}</span>
          </div>
          
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-zinc-500">
              <Clock size={10} />
              <span className="text-[12px] font-black uppercase tracking-widest leading-none">
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-white/60 font-bold text-md leading-none italic">{date.toLocaleString('default', { weekday: 'long' })}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 w-full bg-white/[0.01] border border-white/5 rounded-2xl p-3 group-hover:bg-white/[0.03] transition-all">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-600 group-hover:text-zinc-400 transition-colors">
            <User size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-0.5 leading-none italic">Booked With</p>
            <h4 className="text-md font-black text-white tracking-tight truncate uppercase">{participantName}</h4>
            <div className="flex items-center gap-1.5 text-emerald-500/60 mt-0.5 font-bold">
              <Mail size={10} />
              <span className="text-[11px] truncate tracking-wide">{participantEmail}</span>
            </div>
          </div>
        </div>

        <div className="min-w-[150px] space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
              event.category === 'External' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-white/40 border-white/10'
            }`}>
              {event.category}
            </span>
          </div>
          <h3 className="text-md font-bold text-white/40 line-clamp-1 italic">{event.title}</h3>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
          {!isPast && event.status !== 'CANCELLED' && (
            <button className="flex-1 lg:flex-none px-4 py-2.5 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 group/btn">
              <Video size={12} className="group-hover/btn:scale-110 transition-transform" />
              Join
            </button>
          )}
          <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
            <MoreHorizontal size={16} />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
