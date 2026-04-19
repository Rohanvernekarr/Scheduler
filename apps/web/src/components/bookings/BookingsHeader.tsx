interface StatBoxProps {
  label: string;
  count: number;
}

function StatBox({ label, count }: StatBoxProps) {
  return (
    <div className="bg-[#0d0d0d] border border-white/[0.08] px-6 py-3 rounded-2xl flex flex-col items-center justify-center min-w-[100px]">
      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{label}</span>
      <span className="text-xl font-black text-white">{count}</span>
    </div>
  );
}

interface BookingsHeaderProps {
  upcomingCount: number;
  completedCount: number;
}

export function BookingsHeader({ upcomingCount, completedCount }: BookingsHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row justify-between items-end gap-6 pb-10 border-b border-white/5">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Bookings</h1>
        <p className="text-white/30 text-sm mt-1 font-medium tracking-wide italic">
          Manage your scheduled interactions and external appointments.
        </p>
      </div>
      
      <div className="flex gap-4">
        <StatBox label="Upcoming" count={upcomingCount} />
        <StatBox label="Completed" count={completedCount} />
      </div>
    </header>
  );
}
