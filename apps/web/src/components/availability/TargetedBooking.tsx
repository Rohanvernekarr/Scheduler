import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Mail, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

const DURATIONS = [15, 30, 45, 60];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function TargetedBooking() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState<number>(30);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [isSent, setIsSent] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  const handleSendInvite = () => {
    if (!selectedDate || !guestEmail) return;

    const inviteId = Math.random().toString(36).substring(2, 9);
    const inviteData = {
      id: inviteId,
      hostName: 'John Doe',
      date: selectedDate,
      duration,
      startTime,
      endTime,
      guestEmail
    };

    const existing = JSON.parse(localStorage.getItem('custom_invites') || '{}');
    existing[inviteId] = inviteData;
    localStorage.setItem('custom_invites', JSON.stringify(existing));

    setInviteLink(`${window.location.origin}/invite/${inviteId}`);
    setIsSent(true);

    setTimeout(() => {
      setIsSent(false);
      setGuestEmail('');
    }, 10000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Configuration */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon size={16} className="text-zinc-500" /> 1. Select Date
            </h2>
            <div className="flex items-center gap-2">
               <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"><ChevronLeft size={16} /></button>
               <span className="text-xs font-bold text-white/60">April 2026</span>
               <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-8">
            {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-center text-[10px] font-black text-white/20 mb-2">{d}</div>)}
            {Array.from({ length: 30 }, (_, i) => {
               const d = `2026-04-${(i+1).toString().padStart(2, '0')}`;
               const isSelected = selectedDate === d;
               return (
                 <button 
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`aspect-square rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                    isSelected ? 'bg-white text-black scale-110 shadow-xl' : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                 >
                   {i + 1}
                 </button>
               );
            })}
          </div>

          <div className="border-t border-white/[0.04] pt-8 space-y-8">
             <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-6">
                  <Clock size={16} className="text-zinc-500" /> 2. Set Time Window
                </h2>
                <div className="flex items-center gap-4">
                   <div className="flex-1">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2 block">Available From</label>
                      <input 
                        type="time" 
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                      />
                   </div>
                   <div className="h-px w-4 bg-white/10 mt-6" />
                   <div className="flex-1">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2 block">Available Until</label>
                      <input 
                        type="time" 
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                      />
                   </div>
                </div>
             </div>

             <div>
                <label className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4 block">Meeting Duration</label>
                <div className="grid grid-cols-4 gap-3">
                  {DURATIONS.map(mins => (
                    <button
                      key={mins}
                      onClick={() => setDuration(mins)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                        duration === mins 
                          ? 'bg-white text-black border-white' 
                          : 'bg-black border-white/10 text-white/50 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right: Mailer */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 h-full flex flex-col">
          <div className="flex-1 space-y-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail size={16} className="text-zinc-500" /> 3. Dispatch Invite
            </h2>
            
            <div>
              <label className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2 block">Guest Recipient</label>
              <input
                type="email"
                placeholder="guest@domain.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl space-y-3">
               <p className="text-xs text-white/40 leading-relaxed font-medium">
                The guest will receive a secure link to book a {duration}-minute slot between {startTime} and {endTime} on {new Date(selectedDate).toLocaleDateString('default', { month: 'long', day: 'numeric' })}.
               </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleSendInvite}
              disabled={!guestEmail || !selectedDate}
              className="w-full bg-zinc-100 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed text-black py-4 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all"
            >
              Confirm & Send Mail <ArrowRight size={16} />
            </button>
          </div>

          <AnimatePresence>
            {isSent && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} />
                  <span className="font-bold text-xs uppercase tracking-wider">Mail Dispatched</span>
                </div>
                <p className="text-[10px] opacity-80 mb-3">Single-use booking gateway active:</p>
                <code className="text-[9px] block bg-black/40 p-2 rounded border border-white/5 break-all font-mono">
                  {inviteLink}
                </code>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
