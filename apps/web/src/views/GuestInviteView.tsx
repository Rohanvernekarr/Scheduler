import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar as CalendarIcon, CheckCircle2, User, ChevronRight, Mail } from 'lucide-react';
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
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('custom_invites') || '{}');
    const data = existing[inviteId || ''];
    if (data) {
      setInvite(data);
    } else {
      // In a real app we'd fetch this from DB
      // navigate('/');
    }
  }, [inviteId, navigate]);

  const bookingMutation = useMutation({
    mutationFn: (data: any) => createBooking(data),
    onSuccess: () => setIsBooked(true),
  });

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
      title: `Private Meeting: ${data.hostName} × ${guestName}`
    });
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
        selectedTime={`${selectedSlot!.startTime} &ndash; ${selectedSlot!.endTime}`} 
        onDone={() => navigate('/')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 selection:bg-white selection:text-black flex justify-center items-center font-sans">
      <div className="max-w-5xl w-full flex flex-col xl:flex-row gap-12">
        
        {/* Left: Host Context */}
        <div className="xl:w-96 flex-shrink-0">
          <div className="sticky top-12 space-y-8">
            <div className="w-24 h-24 bg-white text-black rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500">
               <User size={40} className="opacity-80" />
            </div>

            <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-3 italic">Priority Distribution v1</p>
              <h1 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter leading-tight">
                Session with <span className="block text-zinc-500">{invite.hostName}</span>
              </h1>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/60 font-black uppercase tracking-widest text-[10px]">
                   <div className="w-8 h-px bg-white/10" />
                   <span>Secured Protocol</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                  Select one of the prioritized availability clusters below to synchronize your session with the host.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-zinc-500">
                 <Mail size={14} />
                 <span className="text-xs font-bold">{invite.guestEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Picker Grid */}
        <div className="flex-1 space-y-8">
          <div className="bg-[#111111] border border-white/[0.06] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
               <CalendarIcon size={200} />
            </div>

            <div className="flex items-center justify-between mb-10">
               <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Prioritized Windows</h2>
               <span className="bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-black text-white/30 uppercase tracking-[0.2em] border border-white/5">
                  {invite.slots.length} Options Found
               </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {invite.slots.map((slot: SlotData) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`relative group/slot p-6 rounded-3xl transition-all border text-left overflow-hidden ${
                    selectedSlotId === slot.id 
                      ? 'bg-white text-black border-white shadow-[0_20px_40px_rgba(255,255,255,0.1)]' 
                      : 'bg-black/40 border-white/5 text-white/70 hover:border-white/20 hover:bg-black/60'
                  }`}
                >
                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${selectedSlotId === slot.id ? 'text-black/30' : 'text-zinc-600'}`}>
                    {new Date(slot.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="text-xl font-black italic tracking-tighter uppercase mb-4">
                     {slot.startTime} — {slot.endTime}
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedSlotId === slot.id ? 'bg-black text-white' : 'bg-white/5 text-zinc-500'} px-3 py-1 rounded-lg`}>
                       {slot.duration}M Cluster
                    </span>
                    {selectedSlotId === slot.id && <CheckCircle2 size={16} className="text-black" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {selectedSlotId && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white text-black rounded-[2.5rem] p-10 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-xl font-black uppercase italic tracking-tighter">Identity Verification</h2>
                   <div className="px-4 py-1.5 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-widest">Step 02 // Finalize</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] px-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter legal name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-black/20 focus:outline-none focus:border-black/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] px-1">Email Authorization</label>
                    <div className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 text-sm font-bold text-black/40 cursor-not-allowed overflow-hidden truncate">
                       {invite.guestEmail}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!guestName || bookingMutation.isPending}
                  className="w-full h-16 bg-black text-white hover:bg-zinc-800 disabled:opacity-20 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all mt-8 flex items-center justify-center gap-3 group shadow-2xl"
                >
                  {bookingMutation.isPending ? 'Syncing...' : (
                    <>Establish Session <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
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
