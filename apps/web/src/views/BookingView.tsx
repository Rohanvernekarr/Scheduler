import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, Button } from '@repo/ui';
import { Calendar, Clock, Globe, ChevronRight, CheckCircle2, User } from 'lucide-react';
import { getUserProfile, createBooking } from '../lib/api';

export default function BookingView() {
  const { username } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['public-user', username],
    queryFn: () => getUserProfile(username!),
    enabled: !!username,
  });

  const bookingMutation = useMutation({
    mutationFn: (data: any) => createBooking(data),
    onSuccess: () => {
      setIsBooked(true);
    },
  });

  // Calculate available slots based on user.availabilities and selectedDate
  const availableSlots = useMemo(() => {
    if (!user || !user.availabilities) return [];
    
    const dayOfWeek = selectedDate.getDay();
    const dayAvailability = user.availabilities.filter((a: any) => a.dayOfWeek === dayOfWeek);
    
    if (dayAvailability.length === 0) return [];

    const slots: string[] = [];
    dayAvailability.forEach((period: any) => {
      let current = new Date(`2000-01-01T${period.startTime}:00`);
      const end = new Date(`2000-01-01T${period.endTime}:00`);
      
      while (current < end) {
        slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
        current.setMinutes(current.getMinutes() + 30); // 30 min duration
      }
    });
    
    return slots;
  }, [user, selectedDate]);

  const handleBooking = () => {
    if (!selectedTime || !guestEmail || !guestName) return;

    // Convert selectedDate + selectedTime to ISO string
    const [time, period] = selectedTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const startTime = new Date(selectedDate);
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);

    bookingMutation.mutate({
      hostId: user.id,
      guestEmail,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      title: `Meeting with ${guestName}`,
    });
  };

  if (isLoading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Profile...</p>
      </div>
    </div>
  );
  
  if (error || !user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500 font-bold">User Not Found</div>;

  if (isBooked) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-12 border-white/5 bg-slate-900/40 text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-black">Booking Confirmed!</h1>
          <p className="text-slate-400">You've successfully scheduled a meeting with <span className="text-white font-bold">{user.name}</span>.</p>
          <div className="bg-white/5 p-4 rounded-2xl text-left space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-indigo-400" />
              <span>{selectedDate.toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-indigo-400" />
              <span>{selectedTime} (30 mins)</span>
            </div>
          </div>
          <Button onClick={() => window.location.reload()} className="w-full h-14 rounded-2xl">Done</Button>
        </Card>
      </div>
    );
  }

  // Generate days for simple calendar (next 14 days)
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Side: Profile Info */}
        <Card className="lg:w-1/3 p-8 border-black bg-white sticky top-12 h-fit">
          <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center text-white text-3xl font-black mb-6 italic">
            {user.name[0]}
          </div>
          <h1 className="text-3xl font-black mb-2">{user.name}</h1>
          <p className="text-black/50 font-medium mb-8">@{user.username}</p>
          
          <div className="space-y-4 pt-6 border-t border-black">
            <div className="flex items-center gap-3 text-black/70">
              <Clock size={18} className="text-black" />
              <span className="text-sm font-semibold">30 Min Meeting</span>
            </div>
            <div className="flex items-center gap-3 text-black/70">
              <Globe size={18} className="text-black" />
              <span className="text-sm font-semibold">UTC (Greenwich Mean Time)</span>
            </div>
          </div>
        </Card>

        {/* Right Side: Booking Logic */}
        <div className="flex-1 space-y-8">
          <Card className="p-8 border-black bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Date Selection */}
              <div className="space-y-6">
                 <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                   <Calendar className="text-black" />
                   1. Select Date
                 </h2>
                 <div className="grid grid-cols-7 gap-2 mb-4">
                   {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[10px] font-black text-black/40 text-center">{d}</div>)}
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                   {days.map((date, i) => {
                     const isSelected = date.toDateString() === selectedDate.toDateString();
                     const hasSlots = user.availabilities.some((a: any) => a.dayOfWeek === date.getDay());
                     
                     return (
                       <button 
                         key={i} 
                         disabled={!hasSlots}
                         onClick={() => {
                           setSelectedDate(date);
                           setSelectedTime(null);
                         }}
                         className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all border ${
                           isSelected 
                           ? 'bg-black border-black text-white shadow-lg' 
                           : hasSlots 
                             ? 'bg-white border-black text-black hover:bg-black/5' 
                             : 'opacity-20 cursor-not-allowed border-transparent'
                         }`}
                       >
                         <span className="text-[10px] font-black uppercase opacity-60 mb-1">
                           {date.toLocaleDateString(undefined, { weekday: 'short' })}
                         </span>
                         <span className="text-lg font-black">{date.getDate()}</span>
                       </button>
                     );
                   })}
                 </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="text-black" />
                  2. Select Time
                </h2>
                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
                  {availableSlots.length > 0 ? (
                    availableSlots.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between group ${
                          selectedTime === time 
                          ? 'bg-black border-black text-white' 
                          : 'bg-white border-black text-black hover:bg-black/5'
                        }`}
                      >
                        <span className="font-bold">{time}</span>
                        <ChevronRight size={18} className={selectedTime === time ? 'text-white' : 'text-black/30 group-hover:text-black'} />
                      </button>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-black/30 space-y-4 py-12">
                      <Clock size={48} className="opacity-10" />
                      <p className="font-medium">No slots available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Guest Info & Confirm */}
          <AnimatePresence>
            {selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Card className="p-8 border-black bg-white">
                  <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <User className="text-black" />
                    3. Your Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-black/50 px-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Jane Doe"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-transparent border-2 border-black rounded-xl h-14 px-6 focus:outline-none focus:bg-black/5 transition-all font-bold placeholder:text-black/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-black/50 px-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="jane@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-transparent border-2 border-black rounded-xl h-14 px-6 focus:outline-none focus:bg-black/5 transition-all font-bold placeholder:text-black/20"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-black">
                    <div className="text-left">
                      <p className="text-black/40 text-sm">Review Selection</p>
                      <p className="font-bold">{selectedDate.toLocaleDateString(undefined, { dateStyle: 'medium' })} at {selectedTime}</p>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto px-12 h-16 text-lg rounded-xl"
                      disabled={!guestName || !guestEmail || bookingMutation.isPending}
                      onClick={handleBooking}
                    >
                      {bookingMutation.isPending ? 'Scheduling...' : 'Confirm'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>

  );
}

