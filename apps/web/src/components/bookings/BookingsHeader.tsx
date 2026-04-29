interface StatBoxProps {
  label: string;
  count: number;
}

function StatBox({ label, count }: StatBoxProps) {
  return (
    <div className="bg-[#0d0d0d] border border-white/[0.08] px-2 md:px-6 py-3 md:py-4 rounded-2xl flex flex-col items-center justify-center min-w-[100px]">
      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{label}</span>
      <span className="text-sm md:text-xl font-black text-white">{count}</span>
    </div>
  );
}

interface BookingsHeaderProps {
  upcomingCount: number;
  completedCount: number;
}

export function BookingsHeader({ upcomingCount, completedCount }: BookingsHeaderProps) {
  return (
    <header className="flex flex-row justify-between items-start gap-6 pb-8 md:pb-10 border-b border-white/5">
      <div className="w-full md:w-auto">
        <h1 className="text-xl md:text-4xl font-black tracking-tighter text-white uppercase">Bookings</h1>
        <p className="text-white/30 text-[10px] md:text-sm mt-1 font-medium tracking-wide max-w-sm">
          Manage your scheduled interactions and external appointments.
        </p>
      </div>
      
      <div className="flex gap-3 md:gap-4 w-full md:w-auto">
        <StatBox label="Upcoming" count={upcomingCount} />
        <StatBox label="Completed" count={completedCount} />
      </div>
    </header>
  );
}
