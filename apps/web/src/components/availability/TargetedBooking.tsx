import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { sendTargetedInvite, getHostInvites } from '../../lib/api';
import { useQuery } from '@tanstack/react-query';
import type { AvailabilitySlot } from './targeted/types';
import { Sidebar } from './targeted/Sidebar';
import { Timeline } from './targeted/Timeline';
import { SuccessToast } from './targeted/SuccessToast';
import { useSession } from '@repo/auth/client';
import toast from 'react-hot-toast';

export function TargetedBooking() {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  const [activeTime, setActiveTime] = useState<string>('09:00');
  
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [dispatchedSlots, setDispatchedSlots] = useState<AvailabilitySlot[]>([]);
  
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [pendingTime, setPendingTime] = useState<string | null>(null);

  const { data: session } = useSession();
  const userId = session?.user.id;

  // Persistence: Fetch existing invites from backend
  const { data: existingInvites = [], refetch: refetchInvites } = useQuery({
    queryKey: ['targeted-invites', userId],
    queryFn: () => getHostInvites(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    const savedPending = localStorage.getItem('pending_slots');
    if (savedPending) {
      try {
        const parsed = JSON.parse(savedPending);
        // Clean up old data format (ensure startTime is a full ISO string/date)
        const valid = parsed.filter((s: any) => {
          const d = new Date(s.startTime);
          return !isNaN(d.getTime()) && s.startTime.includes('T');
        });
        setSlots(valid);
      } catch (e) {
        setSlots([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pending_slots', JSON.stringify(slots));
  }, [slots]);

  // Derive dispatched slots from backend data
  useEffect(() => {
    if (existingInvites) {
      const allDispatched = existingInvites.flatMap((inv: any) => 
        inv.slots.map((s: any) => {
          const d = new Date(s.startTime);
          const localDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          
          return {
            ...s,
            date: localDate,
            guestEmail: inv.guestEmail,
            inviteLink: inv.inviteLink ? `${window.location.origin}/invite/${inv.inviteLink}` : undefined,
            status: s.isBooked ? 'booked' : 'open'
          };
        })
      );
      setDispatchedSlots(allDispatched);
    }
  }, [existingInvites]);

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
      const sStartMs = new Date(s.startTime).getTime();
      const sEndMs = new Date(s.endTime).getTime();
      return (startMs < sEndMs && endMs > sStartMs);
    });

    if (isOverlapping) return;

    const newSlot: AvailabilitySlot = {
      id: Math.random().toString(36).substring(2, 9),
      date: selectedDate,
      startTime: startObj.toISOString(),
      endTime: endObj.toISOString(),
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
    
    let backendSuccessCount = 0;
    try {
      const emails = guestEmail.split(',').map(e => e.trim()).filter(e => e);
      if (emails.length === 0) {
        toast.error('Please enter at least one valid email');
        return;
      }
      
      for (const email of emails) {
        const inviteId = Math.random().toString(36).substring(2, 9);
        const generatedLink = `${window.location.origin}/invite/${inviteId}`;
        const hostName = session?.user.name || session?.user.email?.split('@')[0] || 'Host';
        
        // 1. Local Persistence Fallback (Instant availability)
        const existingLocal = JSON.parse(localStorage.getItem('custom_invites') || '{}');
        existingLocal[inviteId] = { id: inviteId, hostName, slots, guestEmail: email };
        localStorage.setItem('custom_invites', JSON.stringify(existingLocal));

        // 2. Backend Synchronization
        try {
          await sendTargetedInvite({
            id: inviteId,
            hostId: userId || undefined,
            hostName,
            guestEmail: email,
            meetingLink,
            inviteLink: generatedLink,
            slots
          });
          backendSuccessCount++;
        } catch (apiError) {
          console.error(`Backend sync failed for ${email}:`, apiError);
          // We don't throw here so other emails can be processed and local fallback remains active
        }

        setInviteLink(generatedLink);
      }

      setIsSent(true);
      setSlots([]);
      setGuestEmail('');
      setMeetingLink('');
      
      if (backendSuccessCount === 0 && emails.length > 0) {
        toast('Invite generated locally (Sync Pending)', { icon: '⚠️' });
      } else {
        toast.success(`Invite${emails.length > 1 ? 's' : ''} dispatched and synchronized`);
      }
      
      refetchInvites();
      setTimeout(() => setIsSent(false), 8000);
    } catch (error) {
      console.error('Critical failure during invite distribution:', error);
      toast.error('Failed to generate invites. Please check your connection.');
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
