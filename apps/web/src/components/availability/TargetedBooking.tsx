import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { sendTargetedInvite } from '../../lib/api';
import type { AvailabilitySlot } from './targeted/types';
import { Sidebar } from './targeted/Sidebar';
import { Timeline } from './targeted/Timeline';
import { SuccessToast } from './targeted/SuccessToast';
import { useSession } from '@repo/auth/client';

export function TargetedBooking() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activeTime, setActiveTime] = useState<string>('09:00');
  
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [dispatchedSlots, setDispatchedSlots] = useState<AvailabilitySlot[]>([]);
  
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [meetingLink, setMeetingLink] = useState<string>('');
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

  const { data: session } = useSession();

  const handleSendInvite = async () => {
    if (slots.length === 0 || !guestEmail) return;
    setIsSending(true);
    
    try {
      const inviteId = Math.random().toString(36).substring(2, 9);
      const generatedLink = `${window.location.origin}/invite/${inviteId}`;
      const hostName = session?.user.name || session?.user.email?.split('@')[0] || 'Host';
      
      const existingInvites = JSON.parse(localStorage.getItem('custom_invites') || '{}');
      existingInvites[inviteId] = { id: inviteId, hostName, slots, guestEmail };
      localStorage.setItem('custom_invites', JSON.stringify(existingInvites));

      await sendTargetedInvite({
        hostId: session?.user.id || '',
        hostName,
        guestEmail,
        meetingLink,
        inviteLink: generatedLink,
        slots
      });

      setInviteLink(generatedLink);
      setIsSent(true);
      
      setDispatchedSlots([...dispatchedSlots, ...slots]);
      setSlots([]);
      setGuestEmail('');
      setMeetingLink('');
      
      setTimeout(() => setIsSent(false), 8000);
    } catch (error) {
      console.error('Failed to send invite:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative z-10">
      
      <Sidebar 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        activeTime={activeTime}
        setActiveTime={setActiveTime}
        guestEmail={guestEmail}
        setGuestEmail={setGuestEmail}
        meetingLink={meetingLink}
        setMeetingLink={setMeetingLink}
        isSending={isSending}
        slots={slots}
        onSendInvite={handleSendInvite}
        onRemoveSlot={(id) => removeSlot(id)}
        setPendingTime={setPendingTime}
      />

      <Timeline 
        selectedDate={selectedDate}
        slots={slots}
        dispatchedSlots={dispatchedSlots}
        pendingTime={pendingTime}
        setPendingTime={setPendingTime}
        onAddSlot={handleAddSlot}
        onRemoveSlot={removeSlot}
      />

      <AnimatePresence>
        {isSent && (
          <SuccessToast inviteLink={inviteLink} />
        )}
      </AnimatePresence>

    </div>
  );
}
