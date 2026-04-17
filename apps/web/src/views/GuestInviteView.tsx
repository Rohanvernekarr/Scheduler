import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar as CalendarIcon, CheckCircle2, User } from 'lucide-react';
import { createBooking } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import { BookingSuccess } from '../components/booking/BookingSuccess';

export default function GuestInviteView() {
  const { inviteId } = useParams();
  const navigate = useNavigate();
  
  const [invite, setInvite] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('custom_invites') || '{}');
    if (existing[inviteId || '']) {
      setInvite(existing[inviteId || '']);
    } else {
      navigate('/');
    }
  }, [inviteId, navigate]);

  const bookingMutation = useMutation({
    mutationFn: (data: any) => createBooking(data),
    onSuccess: () => setIsBooked(true),
  });

  const availableSlots = useMemo(() => {
    if (!invite) return [];
    const slots: string[] = [];
    
    let current = new Date(`2000-01-01T${invite.startTime}:00`);
    const end = new Date(`2000-01-01T${invite.endTime}:00`);
    
    while (current < end) {
      slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
      current.setMinutes(current.getMinutes() + invite.duration);
    }
    return slots;
  }, [invite]);

  const handleBooking = () => {
    if (!selectedTime || !guestName || !invite) return;
    
    // Parse selected time back to a full date string
    const [time, period] = selectedTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const startTime = new Date(invite.date);
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + invite.duration);

    // Normally this would go to a real API endpoint, using the dummy user ID below
    bookingMutation.mutate({
      hostId: "cm9lndj6y0000ux3v8x9r9fzb", // Dummy system host
      guestEmail: invite.guestEmail,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      title: `Private Meeting with ${guestName}`
    });
  };

  if (!invite) return <div className="min-h-screen bg-[#0a0a0a]" />;

  if (isBooked) {
    return (
      <BookingSuccess 
        userName={invite.hostName} 
        selectedDate={new Date(invite.date)} 
        selectedTime={selectedTime!} 
        onDone={() => navigate('/')} 
      />
    );
  }

  const formattedDate = new Date(invite.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 selection:bg-zinc-500 selection:text-white flex justify-center items-center">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8">
        
        {/* Left: Event Profile */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="sticky top-12 space-y-6">
            <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
              <User size={32} className="text-zinc-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-500 mb-1">Targeted Invitation</p>
              <h1 className="text-2xl font-bold text-white mb-4">Meeting with {invite.hostName}</h1>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-400 font-medium">
                  <Clock size={18} />
                  <span>{invite.duration} Minutes</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400 font-medium text-left">
                  <CalendarIcon size={18} />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Picker */}
        <div className="flex-1 space-y-6">
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Select a Slot</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                    selectedTime === time 
                      ? 'bg-white text-black border-white' 
                      : 'bg-black border-white/10 text-white/70 hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {selectedTime && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-6">Confirm Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block uppercase tracking-wider">Your Email (Pre-filled)</label>
                    <input
                      type="email"
                      readOnly
                      value={invite.guestEmail}
                      className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-white/50 cursor-not-allowed"
                    />
                  </div>
                  
                  <button
                    onClick={handleBooking}
                    disabled={!guestName || bookingMutation.isPending}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white disabled:opacity-50 text-black py-4 rounded-xl font-bold transition-all mt-4"
                  >
                    {bookingMutation.isPending ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
