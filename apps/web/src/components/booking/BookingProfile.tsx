import { Clock, Globe } from 'lucide-react';

interface BookingProfileProps {
  user: {
    name: string;
    username: string;
  };
}

export function BookingProfile({ user }: BookingProfileProps) {
  return (
    <div className="lg:w-72 shrink-0 bg-[#111111] border border-white/[0.06] rounded-2xl p-6 sticky top-6 h-fit">
      <div className="w-16 h-16 rounded-2xl bg-zinc-600/20 border border-zinc-500/25 flex items-center justify-center text-zinc-300 text-2xl font-bold mb-5">
        {user.name[0]}
      </div>
      <h1 className="text-xl font-bold text-white mb-1">{user.name}</h1>
      <p className="text-white/35 text-sm mb-6">@{user.username}</p>

      <div className="space-y-3 pt-5 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 text-white/50">
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <Clock size={13} className="text-zinc-100" />
          </div>
          <span className="text-sm font-medium">30 Min Meeting</span>
        </div>
        <div className="flex items-center gap-3 text-white/50">
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <Globe size={13} className="text-zinc-100" />
          </div>
          <span className="text-sm font-medium">UTC (Greenwich)</span>
        </div>
      </div>
    </div>
  );
}
