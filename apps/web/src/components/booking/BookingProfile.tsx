import { Card } from '@repo/ui';
import { Clock, Globe } from 'lucide-react';

interface BookingProfileProps {
  user: {
    name: string;
    username: string;
  };
}

export function BookingProfile({ user }: BookingProfileProps) {
  return (
    <Card className="lg:w-1/3 p-8 border-black bg-white sticky top-12 h-fit">
      <div className="w-20 h-20 rounded-2xl bg-black flex items-center justify-center text-white text-3xl font-black mb-6 italic">
        {user.name[0]}
      </div>
      <h1 className="text-3xl font-black mb-2">{user.name}</h1>
      <p className="text-black/50 font-medium mb-8">@{user.username}</p>
      
      <div className="space-y-4 pt-6 border-t border-black">
        <div className="flex items-center gap-3 text-black/70">
          <Clock size={18} className="text-black" />
          <span className="text-sm font-semibold">30 Min Meeting</span>
        </div>
        <div className="flex items-center gap-3 text-black/70">
          <Globe size={18} className="text-black" />
          <span className="text-sm font-semibold">UTC (Greenwich Mean Time)</span>
        </div>
      </div>
    </Card>
  );
}
