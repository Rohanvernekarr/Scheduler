import { useState } from 'react';
import { Button } from '@repo/ui';
import { Type, Link as LinkIcon, AlignLeft, Send, Calendar } from 'lucide-react';

interface ScheduleFormProps {
  onSubmit: (data: any) => void;
  isPending: boolean;
}

const MEETING_TYPES = ['Meeting', 'Interview', 'Sync', 'Check-in', 'Workshop'];

const inputClass = "w-full bg-[#0d0d0d] border border-white/[0.08] rounded-xl h-12 pl-12 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-[#111111] transition-all font-medium text-sm";
const labelClass = "text-[11px] font-semibold text-white/35 uppercase tracking-wider px-1";

export function ScheduleForm({ onSubmit, isPending }: ScheduleFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Meeting',
    meetingLink: '',
    description: '',
    participants: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      participants: formData.participants.split(',').map(e => e.trim()).filter(Boolean),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-5">

        {/* Meeting Name */}
        <label className="block space-y-2">
          <span className={labelClass}>Meeting Name</span>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
            <input
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className={inputClass}
              placeholder="Project Kickoff"
            />
          </div>
        </label>

        {/* Type + Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block space-y-2">
            <span className={labelClass}>Meeting Type</span>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className={`${inputClass} appearance-none cursor-pointer bg-[#0d0d0d]`}
                style={{ colorScheme: 'dark' }}
              >
                {MEETING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </label>

          <label className="block space-y-2">
            <span className={labelClass}>Meeting Link</span>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
              <input
                type="url"
                value={formData.meetingLink}
                onChange={e => setFormData({ ...formData, meetingLink: e.target.value })}
                className={inputClass}
                placeholder="https://meet.google.com/..."
              />
            </div>
          </label>
        </div>

        {/* Start + End Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block space-y-2">
            <span className={labelClass}>Start Time</span>
            <input
              required
              type="datetime-local"
              value={formData.startTime}
              onChange={e => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full bg-[#0d0d0d] border border-white/[0.08] rounded-xl h-12 px-5 text-white focus:outline-none focus:border-indigo-500/60 transition-all font-medium text-sm"
              style={{ colorScheme: 'dark' }}
            />
          </label>
          <label className="block space-y-2">
            <span className={labelClass}>End Time</span>
            <input
              required
              type="datetime-local"
              value={formData.endTime}
              onChange={e => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full bg-[#0d0d0d] border border-white/[0.08] rounded-xl h-12 px-5 text-white focus:outline-none focus:border-indigo-500/60 transition-all font-medium text-sm"
              style={{ colorScheme: 'dark' }}
            />
          </label>
        </div>

        {/* Participants */}
        <label className="block space-y-2">
          <span className={labelClass}>Participants (comma-separated emails)</span>
          <div className="relative">
            <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
            <input
              required
              type="text"
              value={formData.participants}
              onChange={e => setFormData({ ...formData, participants: e.target.value })}
              className={inputClass}
              placeholder="jane@example.com, bob@example.com"
            />
          </div>
        </label>

        {/* Description */}
        <label className="block space-y-2">
          <span className={labelClass}>Description</span>
          <div className="relative">
            <AlignLeft className="absolute left-4 top-4 text-white/25" size={16} />
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#0d0d0d] border border-white/[0.08] rounded-xl py-3.5 pl-12 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/60 focus:bg-[#111111] transition-all font-medium text-sm min-h-[100px] resize-none"
              placeholder="Discussing the Q3 roadmap..."
            />
          </div>
        </label>
      </div>

      <div className="flex justify-end">
        <Button size="lg" type="submit" disabled={isPending} className="px-10">
          {isPending ? 'Scheduling...' : 'Schedule & Notify'}
        </Button>
      </div>
    </form>
  );
}
