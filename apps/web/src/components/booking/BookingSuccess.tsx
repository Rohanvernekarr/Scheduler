import { CheckCircle2, Calendar, Clock } from 'lucide-react';
import { Button } from '@repo/ui';

interface BookingSuccessProps {
  userName: string;
  selectedDate: Date;
  selectedTime: string;
  onDone: () => void;
}

export function BookingSuccess({ userName, selectedDate, selectedTime, onDone }: BookingSuccessProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#111111] border border-white/[0.06] rounded-2xl p-10 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-white/40 text-sm">
            You've scheduled a meeting with{' '}
            <span className="text-white font-semibold">{userName}</span>.
          </p>
        </div>

        <div className="bg-white/[0.04] border border-white/[0.06] p-4 rounded-xl text-left space-y-3">
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Calendar size={14} className="text-zinc-100" />
            <span>{selectedDate.toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <Clock size={14} className="text-zinc-100" />
            <span>{selectedTime} (30 mins)</span>
          </div>
        </div>

        <Button onClick={onDone} className="w-full h-12 rounded-xl">
          Done
        </Button>
      </div>
    </div>
  );
}
