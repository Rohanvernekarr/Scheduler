import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@repo/ui';
import { getUserProfile, createBooking } from '../lib/api';

import { BookingProfile } from '../components/booking/BookingProfile';
import { CalendarPicker } from '../components/booking/CalendarPicker';
import { TimePicker } from '../components/booking/TimePicker';
import { GuestForm } from '../components/booking/GuestForm';
import { BookingSuccess } from '../components/booking/BookingSuccess';

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
    onSuccess: () => setIsBooked(true),
  });

  const availableSlots = useMemo(() => {
    if (!user?.availabilities) return [];
    const dayOfWeek = selectedDate.getDay();
    const dayAvailability = user.availabilities.filter((a: any) => a.dayOfWeek === dayOfWeek);
    const slots: string[] = [];
    dayAvailability.forEach((period: any) => {
      let current = new Date(`2000-01-01T${period.startTime}:00`);
      const end = new Date(`2000-01-01T${period.endTime}:00`);
      while (current < end) {
        slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
        current.setMinutes(current.getMinutes() + 30);
      }
    });
    return slots;
  }, [user, selectedDate]);

  const handleBooking = () => {
    if (!selectedTime || !guestEmail || !guestName) return;
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

  if (isLoading) return <LoadingSpinner />;
  if (error || !user) return <ErrorState />;
  if (isBooked) return <BookingSuccess userName={user.name} selectedDate={selectedDate} selectedTime={selectedTime!} onDone={() => window.location.reload()} />;

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12 selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <BookingProfile user={user} />
        <div className="flex-1 space-y-8">
          <Card className="p-8 border-black bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <CalendarPicker days={days} selectedDate={selectedDate} onSelectDate={(d) => { setSelectedDate(d); setSelectedTime(null); }} availabilities={user.availabilities} />
              <TimePicker availableSlots={availableSlots} selectedTime={selectedTime} onSelectTime={setSelectedTime} />
            </div>
          </Card>
          <AnimatePresence>
            {selectedTime && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                <GuestForm guestName={guestName} setGuestName={setGuestName} guestEmail={guestEmail} setGuestEmail={setGuestEmail} selectedDate={selectedDate} selectedTime={selectedTime} isPending={bookingMutation.isPending} onConfirm={handleBooking} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Profile...</p>
      </div>
    </div>
  );
}

function ErrorState() {
  return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500 font-bold">User Not Found</div>;
}

