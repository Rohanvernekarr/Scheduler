import { User } from 'lucide-react';
import { Card, Button } from '@repo/ui';

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
    <Card className="p-8 border-black bg-white">
      <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
        <User className="text-black" />
        3. Your Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-black/50 px-1">Full Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full bg-transparent border-2 border-black rounded-xl h-14 px-6 focus:outline-none focus:bg-black/5 transition-all font-bold placeholder:text-black/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-black/50 px-1">Email Address</label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="w-full bg-transparent border-2 border-black rounded-xl h-14 px-6 focus:outline-none focus:bg-black/5 transition-all font-bold placeholder:text-black/20"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-black">
        <div className="text-left">
          <p className="text-black/40 text-sm">Review Selection</p>
          <p className="font-bold">
            {selectedDate.toLocaleDateString(undefined, { dateStyle: 'medium' })} at {selectedTime}
          </p>
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto px-12 h-16 text-lg rounded-xl"
          disabled={!guestName || !guestEmail || isPending}
          onClick={onConfirm}
        >
          {isPending ? 'Scheduling...' : 'Confirm'}
        </Button>
      </div>
    </Card>
  );
}
