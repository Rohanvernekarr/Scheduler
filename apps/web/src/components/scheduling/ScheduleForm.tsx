import { useState } from 'react';
import { Card, Button } from '@repo/ui';
import { Type, Link as LinkIcon, AlignLeft, Send, Calendar } from 'lucide-react';

interface ScheduleFormProps {
  onSubmit: (data: any) => void;
  isPending: boolean;
}

const MEETING_TYPES = ['Meeting', 'Interview', 'Sync', 'Check-in', 'Workshop'];

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
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-8 border-black bg-white space-y-6">
        <label className="block space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-black/40 px-1">Meeting Name</span>
          <div className="relative">
             <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={20} />
             <input
               required
               value={formData.title}
               onChange={e => setFormData({ ...formData, title: e.target.value })}
               className="w-full bg-white border-2 border-black rounded-xl h-14 pl-12 pr-6 focus:outline-none focus:bg-black/5 transition-all font-bold"
               placeholder="Project Kickoff"
             />
          </div>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-black/40 px-1">Meeting Type</span>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={20} />
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-white border-2 border-black rounded-xl h-14 pl-12 pr-6 focus:outline-none focus:bg-black/5 transition-all font-bold appearance-none cursor-pointer"
              >
                {MEETING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </label>

          <label className="block space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-black/40 px-1">Meeting Link</span>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={20} />
              <input
                type="url"
                value={formData.meetingLink}
                onChange={e => setFormData({ ...formData, meetingLink: e.target.value })}
                className="w-full bg-white border-2 border-black rounded-xl h-14 pl-12 pr-6 focus:outline-none focus:bg-black/5 transition-all font-bold"
                placeholder="https://meet.google.com/abc-defg-hij"
              />
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-black/40 px-1">Start Time</span>
            <input
              required
              type="datetime-local"
              value={formData.startTime}
              onChange={e => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full bg-white border-2 border-black rounded-xl h-14 px-6 focus:outline-none focus:bg-black/5 transition-all font-bold"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-black/40 px-1">End Time</span>
            <input
              required
              type="datetime-local"
              value={formData.endTime}
              onChange={e => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full bg-white border-2 border-black rounded-xl h-14 px-6 focus:outline-none focus:bg-black/5 transition-all font-bold"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-black/40 px-1">Participants (Comma Separated Emails)</span>
          <div className="relative">
            <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={20} />
            <input
              required
              type="text"
              value={formData.participants}
              onChange={e => setFormData({ ...formData, participants: e.target.value })}
              className="w-full bg-white border-2 border-black rounded-xl h-14 pl-12 pr-6 focus:outline-none focus:bg-black/5 transition-all font-bold"
              placeholder="jane@example.com, bob@example.com"
            />
          </div>
        </label>

        <label className="block space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-black/40 px-1">Description</span>
          <div className="relative">
            <AlignLeft className="absolute left-4 top-6 text-black/20" size={20} />
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white border-2 border-black rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:bg-black/5 transition-all font-bold min-h-[120px]"
              placeholder="Discussing the Q3 roadmap..."
            />
          </div>
        </label>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          size="lg"
          type="submit"
          disabled={isPending}
          className="h-16 px-16 rounded-xl border-4 border-black text-lg font-black uppercase tracking-widest"
        >
          {isPending ? 'Scheduling...' : 'Schedule & Notify'}
        </Button>
      </div>
    </form>
  );
}
