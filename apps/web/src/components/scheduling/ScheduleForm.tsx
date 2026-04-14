import { useState } from 'react';
import { Button } from '@repo/ui';
import {
  Users,
  Calendar,
  Sparkles,
  Video,
  UserRound,
} from 'lucide-react';
import { DateTimeSection } from './DateTimeSection';
import { MeetingDetailsSection } from './MeetingDetailsSection';

interface ScheduleFormProps {
  onSubmit: (data: any) => void;
  isPending: boolean;
}

const MEETING_TYPES = [
  { value: 'Meeting', label: 'Meeting', icon: Users },
  { value: 'Interview', label: 'Interview', icon: UserRound },
  { value: 'Sync', label: 'Sync', icon: Sparkles },
  { value: 'Check-in', label: 'Check-in', icon: Calendar },
  { value: 'Workshop', label: 'Workshop', icon: Video },
];

const inputClass =
  'w-full bg-[#0d0d0d] border border-white/[0.08] rounded-xl h-12 pl-11 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-zinc-500/60 transition-all font-medium text-sm';
const labelClass = 'text-[11px] font-semibold text-white/35 uppercase tracking-wider px-1 block mb-2';

// Convert "YYYY-MM-DD" + "HH:MM" → ISO datetime string
function toISOString(date: string, time: string): string {
  if (!date || !time) return '';
  return new Date(`${date}T${time}:00`).toISOString();
}

/**
 * Calculates end date and time strings from start and duration
 */
function calculateEnd(startDate: string, startTime: string, durationMin: number) {
  if (!startDate || !startTime) return { date: '', time: '' };
  const d = new Date(`${startDate}T${startTime}:00`);
  d.setMinutes(d.getMinutes() + durationMin);
  
  const yyyy = d.getFullYear();
  const mm = (d.getMonth() + 1).toString().padStart(2, '0');
  const dd = d.getDate().toString().padStart(2, '0');
  const hh = d.getHours().toString().padStart(2, '0');
  const min = d.getMinutes().toString().padStart(2, '0');
  
  return {
    date: `${yyyy}-${mm}-${dd}`,
    time: `${hh}:${min}`
  };
}

export function ScheduleForm({ onSubmit, isPending }: ScheduleFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Meeting');
  const [meetingLink, setMeetingLink] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');

  // Start date/time
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');

  // End date/time
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  // Duration: number of mins or 'custom'
  const [duration, setDuration] = useState<number | 'custom'>(30);

  const updateEndFromStart = (sDate: string, sTime: string, dur: number | 'custom') => {
    if (sDate && sTime && typeof dur === 'number') {
      const result = calculateEnd(sDate, sTime, dur);
      setEndDate(result.date);
      setEndTime(result.time);
    }
  };

  const handleStartChange = (date: string, time: string) => {
    setStartDate(date);
    setStartTime(time);
    if (duration !== 'custom') {
      updateEndFromStart(date, time, duration);
    }
  };

  const handleDurationChange = (newDur: number | 'custom') => {
    setDuration(newDur);
    if (newDur !== 'custom') {
      updateEndFromStart(startDate, startTime, newDur);
    }
  };

  // When user manually picks end date/time, switch to custom
  const handleEndChange = (date: string, time: string) => {
    setEndDate(date);
    setEndTime(time);
    setDuration('custom');
  };

  const currentDuration = (() => {
    if (!startDate || !startTime || !endDate || !endTime) return null;
    const start = new Date(`${startDate}T${startTime}:00`);
    const end = new Date(`${endDate}T${endTime}:00`);
    return Math.round((end.getTime() - start.getTime()) / 60000);
  })();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      type,
      meetingLink,
      description,
      participants: participants.split(',').map((e) => e.trim()).filter(Boolean),
      startTime: toISOString(startDate, startTime),
      endTime: toISOString(endDate, endTime),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <DateTimeSection
        startDate={startDate}
        startTime={startTime}
        endDate={endDate}
        endTime={endTime}
        duration={duration}
        onStartChange={handleStartChange}
        onEndChange={handleEndChange}
        onDurationChange={handleDurationChange}
        currentDuration={currentDuration}
      />

      <MeetingDetailsSection
        title={title}
        setTitle={setTitle}
        type={type}
        setType={setType}
        meetingLink={meetingLink}
        setMeetingLink={setMeetingLink}
        participants={participants}
        setParticipants={setParticipants}
        description={description}
        setDescription={setDescription}
        meetingTypes={MEETING_TYPES}
        inputClass={inputClass}
        labelClass={labelClass}
      />

      <div className="flex items-center justify-between pt-1">
        <p className="text-white/25 text-xs">All participants will receive an email invite.</p>
        <Button size="lg" type="submit" disabled={isPending} className="px-6 gap-2 cursor-pointer">
          {isPending ? 'Scheduling...' : 'Schedule & Notify'}
        </Button>
      </div>
    </form>
  );
}
