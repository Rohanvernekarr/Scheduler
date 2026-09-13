import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserProfile, createBooking, getAvailableSlots } from '../lib/api';

import { BookingProfile } from '../components/booking/BookingProfile';
import { CalendarPicker } from '../components/booking/CalendarPicker';
import { TimePicker } from '../components/booking/TimePicker';
import { GuestForm } from '../components/booking/GuestForm';
import { BookingSuccess } from '../components/booking/BookingSuccess';

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function BookingView() {
  const { username } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['public-user', username],
    queryFn: () => getUserProfile(username!),
    enabled: !!username,
  });

  const { data: availableSlots = [], isLoading: isLoadingSlots } = useQuery({
    queryKey: ['available-slots', user?.id, formatDateKey(selectedDate), timeZone],
    queryFn: () => getAvailableSlots({
      hostId: user.id,
      date: formatDateKey(selectedDate),
      timeZone,
      duration: 30,
    }),
    enabled: !!user?.id,
  });

  const handleBooking = () => {
    if (!selectedTime || !guestEmail || !guestName) return;
    const slot = availableSlots.find((item: any) => item.startTime === selectedTime);
    if (!slot) return;

    bookingMutation.mutate({
      hostId: user.id,
      guestName,
      guestEmail,
      startTime: slot.startTime,
      endTime: slot.endTime,
      timeZone,
      title: `Meeting with ${guestName}`,
    });
  };

  const bookingMutation = useMutation({
    mutationFn: (data: any) => createBooking(data),
    onSuccess: () => setIsBooked(true),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !user) return <ErrorState />;
  if (isBooked) {
    const bookedSlot = availableSlots.find((item: any) => item.startTime === selectedTime);
    return <BookingSuccess userName={user.name} selectedDate={selectedDate} selectedTime={bookedSlot?.label || ''} />;
  }

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 selection:bg-zinc-500 selection:text-white">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        <BookingProfile user={user} />
        <div className="flex-1 space-y-5">
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <CalendarPicker
                days={days}
                selectedDate={selectedDate}
                onSelectDate={(d) => { setSelectedDate(d); setSelectedTime(null); }}
                availabilities={user.availabilities}
              />
              <TimePicker
                availableSlots={availableSlots}
                isLoading={isLoadingSlots}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
              />
            </div>
          </div>
          <AnimatePresence>
            {selectedTime && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                <GuestForm
                  guestName={guestName}
                  setGuestName={setGuestName}
                  guestEmail={guestEmail}
                  setGuestEmail={setGuestEmail}
                  selectedDate={selectedDate}
                  selectedTime={availableSlots.find((item: any) => item.startTime === selectedTime)?.label || selectedTime}
                  isPending={bookingMutation.isPending}
                  onConfirm={handleBooking}
                />
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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-zinc-500/30 border-t-zinc-500 rounded-full animate-spin" />
        <p className="text-white/30 text-xs font-semibold uppercase tracking-widest">Loading Profile...</p>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <p className="text-white/30 font-semibold">User not found.</p>
    </div>
  );
}
