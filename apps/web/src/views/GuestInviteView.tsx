import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar as CalendarIcon, CheckCircle2, User, ChevronRight, Mail, ChevronLeft } from 'lucide-react';
import { createBooking } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import { BookingSuccess } from '../components/booking/BookingSuccess';

interface SlotData {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export default function GuestInviteView() {
  const { inviteId } = useParams();
  const navigate = useNavigate();
  
  const [invite, setInvite] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('custom_invites') || '{}');
    const data = existing[inviteId || ''];
    if (data) {
      setInvite(data);
      // Auto-select first available date
      if (data.slots?.length > 0) {
        setSelectedDate(data.slots[0].date);
      }
    }
  }, [inviteId]);

  const bookingMutation = useMutation({
    mutationFn: (data: any) => createBooking(data),
    onSuccess: () => setIsBooked(true),
  });

  const slotsByDate = useMemo(() => {
    if (!invite?.slots) return {};
    const grouped: Record<string, SlotData[]> = {};
    invite.slots.forEach((s: SlotData) => {
      if (!grouped[s.date]) grouped[s.date] = [];
      grouped[s.date].push(s);
    });
    return grouped;
  }, [invite]);

  const activeDates = useMemo(() => Object.keys(slotsByDate), [slotsByDate]);

  const selectedSlot = useMemo(() => 
    invite?.slots?.find((s: SlotData) => s.id === selectedSlotId), 
    [invite, selectedSlotId]
  );

  const handleBooking = () => {
    if (!selectedSlot || !guestName || !invite) return;
    
    const [startH, startM] = selectedSlot.startTime.split(':').map(Number);
    const startTime = new Date(selectedSlot.date);
    startTime.setHours(startH, startM, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + selectedSlot.duration);

    bookingMutation.mutate({
      hostId: "cm9lndj6y0000ux3v8x9r9fzb", 
      guestEmail: invite.guestEmail,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      title: `Private Meeting: ${invite.hostName} × ${guestName}`
    });
  };

  // Mini Calendar Logic
  const getLocalDateString = (d: Date) =>
    `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;

  const generateDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  if (!invite) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
       <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
    </div>
  );

  if (isBooked) {
    return (
      <BookingSuccess 
        userName={invite.hostName} 
        selectedDate={new Date(selectedSlot!.date)} 
        selectedTime={`${selectedSlot!.startTime} - ${selectedSlot!.endTime}`} 
        onDone={() => navigate('/')} 
      />
    );
  }

  const currentSlots = selectedDate ? (slotsByDate[selectedDate] || []) : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 selection:bg-white selection:text-black flex justify-center items-center font-sans">
      <div className="max-w-6xl w-full flex flex-col xl:flex-row gap-12 items-start">
        
        {/* Left: Info Section */}
        <div className="xl:w-80 flex-shrink-0 space-y-10">
           <div className="space-y-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black shadow-2xl">
                 <User size={32} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-3 italic">Authorized Link</p>
                 <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Meeting with <span className="text-zinc-500 block">{invite.hostName}</span></h1>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-xs font-medium">
                 Your host has curated specific operational windows for this session. Choose your preferred slot below.
              </p>
           </div>

           <div className="bg-white/5 border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                 <Mail size={14} className="text-zinc-600" />
                 <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest truncate">{invite.guestEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                 <Clock size={14} className="text-zinc-600" />
                 <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Multi-Slot Protocol</span>
              </div>
           </div>
        </div>

        {/* Center: Calendar Picker */}
        <div className="flex-1 bg-[#111111] border border-white/[0.06] rounded-[3rem] p-10 shadow-2xl space-y-10 overflow-hidden relative">
           <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <CalendarIcon size={240} />
           </div>

           <div className="flex flex-col md:flex-row gap-12 relative z-10">
              
              {/* Mini Calendar */}
              <div className="flex-shrink-0 w-full md:w-72">
                 <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-sm font-black uppercase italic text-white/40 tracking-widest">
                       {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div className="flex gap-1">
                       <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                          <ChevronLeft size={16} />
                       </button>
                       <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                          <ChevronRight size={16} />
                       </button>
                    </div>
                 </div>

                 <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S','M','T','W','T','F','S'].map(d => (
                       <div key={d} className="h-8 flex items-center justify-center text-[9px] font-black text-zinc-700 uppercase">{d}</div>
                    ))}
                 </div>
                 <div className="grid grid-cols-7 gap-1">
                    {generateDays().map((d, i) => {
                       if (!d) return <div key={i} />;
                       const ds = getLocalDateString(d);
                       const hasSlots = activeDates.includes(ds);
                       const selected = selectedDate === ds;
                       return (
                          <button
                            key={i}
                            disabled={!hasSlots}
                            onClick={() => { setSelectedDate(ds); setSelectedSlotId(null); }}
                            className={`h-10 flex flex-col items-center justify-center rounded-xl text-xs font-black transition-all relative ${
                               selected ? 'bg-white text-black' : 
                               hasSlots ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'text-zinc-800 opacity-20 cursor-not-allowed'
                            }`}
                          >
                             {d.getDate()}
                             {hasSlots && !selected && <div className="absolute bottom-1.5 w-1 h-1 bg-emerald-500 rounded-full" />}
                          </button>
                       );
                    })}
                 </div>
              </div>

              {/* Slot Picker */}
              <div className="flex-1 space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-black italic tracking-tighter uppercase">
                       {selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }) : 'Choose Date'}
                    </h2>
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{currentSlots.length} Available</span>
                 </div>
                 
                 <div className="space-y-3 max-h-[340px] overflow-y-auto custom-scrollbar pr-2">
                    {currentSlots.length === 0 && (
                       <div className="h-32 flex items-center justify-center border border-dashed border-white/5 rounded-3xl text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">
                          No windows for this date
                       </div>
                    )}
                    {currentSlots.map(slot => (
                       <button
                         key={slot.id}
                         onClick={() => setSelectedSlotId(slot.id)}
                         className={`w-full p-5 rounded-2xl flex items-center justify-between border transition-all ${
                            selectedSlotId === slot.id ? 'bg-white text-black border-white shadow-xl' : 'bg-black/40 border-white/5 text-zinc-400 hover:border-white/10 hover:text-white'
                         }`}
                       >
                          <div className="flex items-center gap-4">
                             <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${selectedSlotId === slot.id ? 'bg-black text-white' : 'bg-white/5 text-zinc-500'}`}>
                                {slot.duration}M
                             </div>
                             <span className="text-base font-black italic tracking-tight uppercase leading-none">{slot.startTime} &mdash; {slot.endTime}</span>
                          </div>
                          {selectedSlotId === slot.id && <CheckCircle2 size={16} />}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Confirmation Area */}
           <AnimatePresence>
             {selectedSlotId && (
               <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="mt-12 pt-12 border-t border-white/[0.04] space-y-8 relative z-10"
               >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Visitor Identity</label>
                        <input
                           type="text"
                           placeholder="Enter your name"
                           value={guestName}
                           onChange={(e) => setGuestName(e.target.value)}
                           className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm font-black italic uppercase tracking-tight focus:outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-800"
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Destination Credentials</label>
                        <div className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-5 text-sm font-black text-zinc-700 italic flex items-center gap-3">
                           <Mail size={14} className="opacity-30" />
                           <span className="truncate">{invite.guestEmail}</span>
                        </div>
                     </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={!guestName || bookingMutation.isPending}
                    className="w-full h-18 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl py-6"
                  >
                    {bookingMutation.isPending ? 'Propagating System Sync...' : (
                       <>Finalize Session Establishment <ChevronRight size={18} /></>
                    )}
                  </button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
