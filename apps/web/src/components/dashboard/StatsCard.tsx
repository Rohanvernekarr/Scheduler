import { type LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

export function StatsCard({ label, value, icon: Icon }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden bg-[#111111] border border-white/[0.06] rounded-2xl p-6 group hover:border-white/10 transition-all duration-200">
      <div className="absolute top-0 right-0 p-4 opacity-[0.04] group-hover:opacity-[0.06] transition-opacity">
        <Icon size={72} />
      </div>
      <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-3">{label}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
      <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg w-fit border border-indigo-500/20">
        <ArrowUpRight size={11} />
        Live
      </div>
    </div>
  );
}
