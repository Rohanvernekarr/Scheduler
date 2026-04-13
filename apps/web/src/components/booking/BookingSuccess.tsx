import { CheckCircle2, Calendar, Clock } from 'lucide-react';
import { Card, Button } from '@repo/ui';

interface BookingSuccessProps {
  userName: string;
  selectedDate: Date;
  selectedTime: string;
  onDone: () => void;
}

export function BookingSuccess({ userName, selectedDate, selectedTime, onDone }: BookingSuccessProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-12 border-white/5 bg-slate-900/40 text-center space-y-6">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-3xl font-black">Booking Confirmed!</h1>
        <p className="text-slate-400">
          You've successfully scheduled a meeting with <span className="text-white font-bold">{userName}</span>.
        </p>
        <div className="bg-white/5 p-4 rounded-2xl text-left space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-indigo-400" />
            <span>{selectedDate.toLocaleDateString(undefined, { dateStyle: 'full' })}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock size={16} className="text-indigo-400" />
            <span>{selectedTime} (30 mins)</span>
          </div>
        </div>
        <Button onClick={onDone} className="w-full h-14 rounded-2xl">
          Done
        </Button>
      </Card>
    </div>
  );
}
