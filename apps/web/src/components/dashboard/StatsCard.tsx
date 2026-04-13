import { Card } from '@repo/ui';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

export function StatsCard({ label, value, icon: Icon }: StatsCardProps) {
  return (
    <Card className="p-8 group relative overflow-hidden border-black bg-white">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-black">
        <Icon size={80} />
      </div>
      <p className="text-black/40 font-black uppercase tracking-widest text-[10px] mb-2">{label}</p>
      <p className="text-5xl font-black text-black">{value}</p>
      <div className="mt-4 flex items-center gap-1 text-[11px] font-black text-black bg-black/5 px-2 py-1 rounded-md w-fit border border-black/10">
        <ArrowUpRight size={12} />
        LIVE UPDATE
      </div>
    </Card>
  );
}
