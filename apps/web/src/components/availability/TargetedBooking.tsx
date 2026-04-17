import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  CheckCircle2, 
  Mail,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { PremiumDateTimePicker } from '@repo/ui';
import { sendTargetedInvite } from '../../lib/api';

interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
}

const DURATIONS = [15, 30, 45, 60];
const INTERVALS = [0, 15, 30, 45];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function TargetedBooking() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activeTime, setActiveTime] = useState<string>('09:00');
  
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [dispatchedSlots, setDispatchedSlots] = useState<AvailabilitySlot[]>([]);
  
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [pendingTime, setPendingTime] = useState<string | null>(null);

  useEffect(() => {
    const savedPending = localStorage.getItem('pending_slots');
    const savedDispatched = localStorage.getItem('dispatched_slots');
    if (savedPending) setSlots(JSON.parse(savedPending));
    if (savedDispatched) setDispatchedSlots(JSON.parse(savedDispatched));
  }, []);

  useEffect(() => {
    localStorage.setItem('pending_slots', JSON.stringify(slots));
    localStorage.setItem('dispatched_slots', JSON.stringify(dispatchedSlots));
  }, [slots, dispatchedSlots]);

  const handleAddSlot = (time: string, dur: number) => {
    const [h, m] = time.split(':').map(Number);
    const startObj = new Date(selectedDate);
    startObj.setHours(h, m, 0, 0);
    const startMs = startObj.getTime();
    
    const endObj = new Date(startObj);
    endObj.setMinutes(m + dur);
    const endMs = endObj.getTime();

    const allCurrent = [...slots, ...dispatchedSlots].filter(s => s.date === selectedDate);
    const isOverlapping = allCurrent.some(s => {
      const [sh, sm] = s.startTime.split(':').map(Number);
      const sStart = new Date(selectedDate);
      sStart.setHours(sh, sm, 0, 0);
      const sStartMs = sStart.getTime();
      const sEndMs = sStartMs + (s.duration * 60000);
      return (startMs < sEndMs && endMs > sStartMs);
    });

    if (isOverlapping) return;

    const endTimeStr = endObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const newSlot: AvailabilitySlot = {
      id: Math.random().toString(36).substring(2, 9),
      date: selectedDate,
      startTime: time,
      endTime: endTimeStr,
      duration: dur
    };
    setSlots([...slots, newSlot]);
    setPendingTime(null);
  };

  const removeSlot = (id: string, isDispatched = false) => {
    if (isDispatched) {
      setDispatchedSlots(dispatchedSlots.filter(s => s.id !== id));
    } else {
      setSlots(slots.filter(s => s.id !== id));
    }
  };

  const handleSendInvite = async () => {
    if (slots.length === 0 || !guestEmail) return;
    setIsSending(true);
    
    try {
      const inviteId = Math.random().toString(36).substring(2, 9);
      const generatedLink = `${window.location.origin}/invite/${inviteId}`;
      
      const existingInvites = JSON.parse(localStorage.getItem('custom_invites') || '{}');
      existingInvites[inviteId] = { id: inviteId, hostName: 'John Doe', slots, guestEmail };
      localStorage.setItem('custom_invites', JSON.stringify(existingInvites));

      await sendTargetedInvite({
        hostName: 'John Doe',
        guestEmail,
        inviteLink: generatedLink,
        slots
      });

      setInviteLink(generatedLink);
      setIsSent(true);
      
      setDispatchedSlots([...dispatchedSlots, ...slots]);
      setSlots([]);
      setGuestEmail('');
      
      setTimeout(() => setIsSent(false), 8000);
    } catch (error) {
      console.error('Failed to send invite:', error);
    } finally {
      setIsSending(false);
    }
  };

  const slotsForDate = useMemo(() => slots.filter(s => s.date === selectedDate), [slots, selectedDate]);
  const dispForDate = useMemo(() => dispatchedSlots.filter(s => s.date === selectedDate), [dispatchedSlots, selectedDate]);
  const allSlotsForDate = useMemo(() => [...slotsForDate, ...dispForDate], [slotsForDate, dispForDate]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative z-10">
      
      {/* LEFT: Calendar & Configuration */}
      <div className="xl:col-span-4 space-y-6">
        <div className="bg-[#111111] border border-white/[0.06] rounded-3xl p-6 shadow-2xl">
           <div className="mb-6">
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                {new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </h2>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-1 italic leading-none">Global Synchronization Mode</p>
           </div>

           <div className="relative z-50">
              <PremiumDateTimePicker
                expireDate={selectedDate}
                setExpireDate={(d) => { setSelectedDate(d); setPendingTime(null); }}
                expireTime={activeTime}
                setExpireTime={setActiveTime}
                showTime={false}
              />
           </div>
           
           <div className="mt-8 pt-8 border-t border-white/[0.04] space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1 block">Recipient Credentials</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="name@organization.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-zinc-500 focus:outline-none transition-all placeholder:text-zinc-800"
                  />
                  <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-800" />
                </div>
              </div>

              <button
                onClick={handleSendInvite}
                disabled={slots.length === 0 || !guestEmail || isSending}
                className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 group shadow-xl shadow-white/5"
              >
                {isSending ? (
                  <>Dispatching... <Loader2 size={14} className="animate-spin" /></>
                ) : (
                  <>Distribute Invite <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
           </div>
        </div>

        {/* Marked Slots Queue */}
        <div className="space-y-3">
          {slots.length > 0 && <p className="text-[10px] font-black text-zinc-500 uppercase px-2 mb-2 tracking-[0.2em]">Deployment Queue</p>}
          <AnimatePresence initial={false}>
            {slots.map(s => (
              <motion.div 
                key={s.id} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#111111] border border-white/[0.04] rounded-2xl p-4 flex items-center justify-between group hover:border-white/10 transition-all"
              >
                 <div>
                    <p className="text-xs font-black text-white italic uppercase tracking-tight">{new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 opacity-50">{s.startTime} — {s.endTime} // {s.duration}m Cluster</p>
                 </div>
                 <button onClick={() => removeSlot(s.id)} className="p-2 text-zinc-800 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                 </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Timeline */}
      <div className="xl:col-span-8 bg-[#111111] border border-white/[0.06] rounded-[2.5rem] overflow-hidden flex flex-col h-[850px] shadow-2xl relative z-0">
         <div className="p-10 border-b border-white/[0.04] bg-black/40 flex items-center justify-between">
            <div>
               <h2 className="text-xl font-black text-white italic uppercase leading-none tracking-tighter">Timeline Analysis</h2>
               <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.15em] mt-3">Active // {new Date(selectedDate).toLocaleDateString('en-GB', { weekday: 'long' })} Protocol</p>
            </div>
            <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Clock Sync Active</span>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="relative min-h-[1440px] px-10 pt-6 pb-20">
               {HOURS.map(hour => {
                  const hourLabel = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
                  
                  return (
                    <div key={hour} className="flex border-t border-white/[0.02] last:border-b transition-colors hover:bg-white/[0.01]">
                       {/* Labels */}
                       <div className="w-24 pr-8 -mt-2.5 text-[10px] font-black text-zinc-400 uppercase tabular-nums sticky left-0 bg-[#111111] z-10 py-1 transition-colors group-hover:text-zinc-600">
                          {hourLabel}
                       </div>

                       <div className="flex-1 space-y-1.5 py-2">
                          {INTERVALS.map(min => {
                             const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                             const isPending = pendingTime === time;
                             
                             const startMs = new Date(selectedDate).setHours(hour, min, 0, 0);
                             
                             const coveringSlot = allSlotsForDate.find(s => {
                               const [sh, sm] = s.startTime.split(':').map(Number);
                               const sStart = new Date(selectedDate).setHours(sh, sm, 0, 0);
                               const sEnd = sStart + (s.duration * 60000);
                               return startMs >= sStart && startMs < sEnd;
                             });

                             // Only show  visual block on the STARTING segment of a slot
                             const isStartingSegment = coveringSlot && coveringSlot.startTime === time;

                             return (
                               <div key={min} className="h-10 relative group/row">
                                  {!coveringSlot && (
                                    <button 
                                      onClick={() => setPendingTime(time)}
                                      className="absolute inset-x-0 inset-y-0 rounded-xl transition-all hover:bg-white/[0.03] active:scale-[0.99]"
                                    />
                                  )}
                                  
                                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.005] pointer-events-none" />

                                  {isStartingSegment && (
                                    <motion.div 
                                      initial={{ opacity: 0, scale: 0.95 }} 
                                      animate={{ opacity: 1, scale: 1 }}
                                      style={{ height: `calc(${(coveringSlot.duration / 15) * 100}% + ${((coveringSlot.duration / 15) - 1) * 6}px)` }}
                                      className={`absolute inset-x-0 top-0 px-5 rounded-xl flex items-center justify-between shadow-2xl z-10 border-2 ${
                                        dispatchedSlots.some(ds => ds.id === coveringSlot.id)
                                          ? 'bg-zinc-950 border-zinc-800 text-zinc-500' 
                                          : 'bg-white text-black border-white'
                                      }`}
                                    >
                                       <div className="flex items-center gap-4">
                                          <div className={`px-2 py-0.5 text-[9px] font-black uppercase italic rounded-md ${
                                            dispatchedSlots.some(ds => ds.id === coveringSlot.id) 
                                              ? 'bg-zinc-900 text-zinc-600' 
                                              : 'bg-black text-white'
                                          }`}>
                                             {coveringSlot.duration}M
                                          </div>
                                          <div className="flex flex-col">
                                             <span className="text-sm font-black tracking-tighter uppercase italic">{coveringSlot.startTime} — {coveringSlot.endTime}</span>
                                             {dispatchedSlots.some(ds => ds.id === coveringSlot.id) && (
                                                <span className="text-[7px] font-black uppercase tracking-[0.2em] text-emerald-500/50">Dispatched Protocol</span>
                                             )}
                                          </div>
                                       </div>
                                       <button 
                                         onClick={(e) => {
                                           e.stopPropagation();
                                           removeSlot(coveringSlot.id, dispatchedSlots.some(ds => ds.id === coveringSlot.id));
                                         }} 
                                         className={`p-1.5 rounded-lg active:scale-90 transition-all ${
                                           dispatchedSlots.some(ds => ds.id === coveringSlot.id)
                                             ? 'hover:bg-white/5 text-zinc-800 hover:text-white'
                                             : 'hover:bg-black/10'
                                         }`}
                                       >
                                          <Trash2 size={14} className={dispatchedSlots.some(ds => ds.id === coveringSlot.id) ? "" : "opacity-50 hover:opacity-100 transition-opacity"} />
                                       </button>
                                    </motion.div>
                                  )}

                                  <AnimatePresence>
                                     {isPending && (
                                       <motion.div 
                                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                         animate={{ opacity: 1, y: 0, scale: 1 }}
                                         exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                         className="absolute inset-x-0 inset-y-0 bg-[#1a1a1a] border-2 border-white/20 rounded-xl flex items-center z-20 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                                       >
                                          <div className="px-5 border-r border-white/10 h-full flex flex-col justify-center bg-black/40">
                                             <span className="text-[9px] font-black text-white/20 uppercase tracking-widest whitespace-nowrap mb-0.5">Allocation</span>
                                             <span className="text-[11px] font-black text-emerald-400 tracking-tighter">@{time}</span>
                                          </div>
                                          <div className="flex-1 flex h-full">
                                             {DURATIONS.map(dur => {
                                               return (
                                                 <button 
                                                   key={dur}
                                                   onClick={() => handleAddSlot(time, dur)}
                                                   className="flex-1 hover:bg-white hover:text-black text-white text-[11px] font-black uppercase tracking-widest transition-all p-1"
                                                 >
                                                   {dur}m
                                                 </button>
                                               );
                                             })}
                                          </div>
                                          <button onClick={() => setPendingTime(null)} className="px-5 text-white/20 hover:text-white transition-colors text-lg">✕</button>
                                       </motion.div>
                                     )}
                                  </AnimatePresence>
                               </div>
                             );
                          })}
                       </div>
                    </div>
                  );
               })}
            </div>
         </div>
         
         <div className="p-8 bg-black/60 border-t border-white/[0.04] backdrop-blur-md">
            <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.3em] italic text-center leading-relaxed">System Synchronized // Select any 15-minute operational block to initiate cluster allocation</p>
         </div>
      </div>

      <AnimatePresence>
        {isSent && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-12 right-12 max-w-sm bg-white p-8 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] z-[100] text-black"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="font-black uppercase italic tracking-tighter text-xl">Protocol Active</h3>
            </div>
            <p className="text-xs font-bold text-black/50 mb-6 leading-relaxed">System sync successful. Distributions dispatched to guest emails.</p>
            <div className="bg-black/5 p-4 rounded-2xl border border-black/5 flex items-center justify-between gap-3">
               <code className="text-[10px] truncate font-mono font-bold opacity-30">{inviteLink}</code>
               <button onClick={() => navigator.clipboard.writeText(inviteLink)} className="bg-black text-white p-2 rounded-lg hover:scale-105 transition-transform">
                  <ChevronRight size={14} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
