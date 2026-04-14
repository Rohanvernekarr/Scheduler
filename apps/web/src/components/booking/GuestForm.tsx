import { User } from 'lucide-react';
import { Button } from '@repo/ui';

interface GuestFormProps {
  guestName: string;
  setGuestName: (name: string) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  selectedDate: Date;
  selectedTime: string;
  isPending: boolean;
  onConfirm: () => void;
}

const inputClass = "w-full bg-[#0d0d0d] border border-white/[0.08] rounded-xl h-12 px-5 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/60 transition-all font-medium text-sm";

export function GuestForm({
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  selectedDate,
  selectedTime,
  isPending,
  onConfirm,
}: GuestFormProps) {
  return (
    <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest flex items-center gap-2 mb-6">
        <User size={14} className="text-indigo-400" />
        Your Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider px-1">Full Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-white/35 uppercase tracking-wider px-1">Email Address</label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-6 pt-5 border-t border-white/[0.06]">
        <div className="text-left">
          <p className="text-white/30 text-xs mb-0.5">Selected time</p>
          <p className="font-semibold text-sm text-white">
            {selectedDate.toLocaleDateString(undefined, { dateStyle: 'medium' })} at {selectedTime}
          </p>
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto px-10"
          disabled={!guestName || !guestEmail || isPending}
          onClick={onConfirm}
        >
          {isPending ? 'Scheduling...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
}
