import { Clock, ExternalLink, Calendar, User, Mail, Video, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventRowProps {
  event: any;
}

export function EventRow({ event }: EventRowProps) {
  const [showDetails, setShowDetails] = useState(false);
  const date = new Date(event.startTime);
  const isBooking = event.type === 'Booking';
  const isPast = date < new Date();
  
  const duration = event.duration || (event.endTime ? Math.round((new Date(event.endTime).getTime() - new Date(event.startTime).getTime()) / 60000) : 30);
  
  const statusText = event.status === 'CANCELLED' ? 'Cancelled' : isPast ? 'Completed' : 'Confirmed';
  const statusColors = {
    Cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    Completed: 'bg-white/5 text-white/40 border-white/10',
    Confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-all group cursor-pointer"
      >
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
                  ? 'bg-zinc-500/15 text-zinc-50 border border-zinc-500/20'
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
              <span>{duration} min</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white">
            <ExternalLink size={14} />
          </button>
          <span className={`px-3 py-1 text-[11px] font-semibold rounded-full uppercase tracking-wider border ${statusColors[statusText as keyof typeof statusColors]}`}>
            {statusText}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-2 italic">Operation Details</p>
                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{event.title}</h2>
                  </div>
                  <button onClick={() => setShowDetails(false)} className="p-2 hover:bg-white/5 rounded-xl text-white/20 hover:text-white transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-3xl space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Calendar size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Temporal Window</span>
                    </div>
                    <p className="text-sm font-bold text-white italic">{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-3xl space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Protocol Sync</span>
                    </div>
                    <p className="text-sm font-bold text-white italic">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &mdash; {duration}M</p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-600">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-0.5 italic">Authorized Participant</p>
                      <h4 className="text-lg font-black text-white uppercase italic tracking-tight">{event.guestName || event.guestEmail?.split('@')[0] || 'Internal Entity'}</h4>
                      <div className="flex items-center gap-2 text-zinc-500 mt-0.5">
                        <Mail size={11} />
                        <span className="text-[10px] font-bold tracking-wide">{event.guestEmail || 'system.internal'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {event.meetingLink && (
                  <button className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3">
                    <Video size={16} />
                    Establish Connection
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
