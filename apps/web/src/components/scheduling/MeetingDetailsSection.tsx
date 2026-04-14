import { Calendar, Users, Link as LinkIcon, AlignLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MeetingType {
  value: string;
  label: string;
  icon: LucideIcon;
}

interface MeetingDetailsSectionProps {
  title: string;
  setTitle: (val: string) => void;
  type: string;
  setType: (val: string) => void;
  meetingLink: string;
  setMeetingLink: (val: string) => void;
  participants: string;
  setParticipants: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  meetingTypes: MeetingType[];
  inputClass: string;
  labelClass: string;
}

export function MeetingDetailsSection({
  title,
  setTitle,
  type,
  setType,
  meetingLink,
  setMeetingLink,
  participants,
  setParticipants,
  description,
  setDescription,
  meetingTypes,
  inputClass,
  labelClass,
}: MeetingDetailsSectionProps) {
  return (
    <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-5">
      <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
        Event Details
      </p>

      {/* Title */}
      <label className="block">
        <span className={labelClass}>Meeting Name</span>
        <div className="relative">
          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={15} />
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="e.g. Product Kickoff"
          />
        </div>
      </label>

      {/* Meeting Type – pill selector */}
      <div>
        <span className={labelClass}>Meeting Type</span>
        <div className="flex flex-wrap gap-2">
          {meetingTypes.map(({ value, label, icon: Icon }) => {
            const active = type === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  active
                    ? 'bg-zinc-600 border-zinc-500 text-white shadow-lg shadow-zinc-500/20'
                    : 'bg-white/[0.04] border-white/[0.06] text-white/45 hover:text-white hover:border-white/15'
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Meeting Link */}
      <label className="block">
        <span className={labelClass}>Meeting Link</span>
        <div className="relative">
          <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={15} />
          <input
            type="url"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            className={inputClass}
            placeholder="https://meet.google.com/abc-defg-hij"
          />
        </div>
      </label>

      {/* Participants */}
      <label className="block">
        <span className={labelClass}>Participants (comma-separated emails)</span>
        <div className="relative">
          <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" size={15} />
          <input
            required
            type="text"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className={inputClass}
            placeholder="jane@example.com, bob@example.com"
          />
        </div>
      </label>

      {/* Description */}
      <label className="block">
        <span className={labelClass}>Description</span>
        <div className="relative">
          <AlignLeft className="absolute left-3.5 top-3.5 text-white/25" size={15} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-white/[0.08] rounded-xl py-3 pl-11 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-zinc-500/60 transition-all font-medium text-sm min-h-[90px] resize-none"
            placeholder="Brief agenda or context..."
          />
        </div>
      </label>
    </div>
  );
}
