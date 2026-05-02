import { Calendar, BookOpen, Clock } from "lucide-react";
import type { UserDetail } from "./types";

interface StatCardProps {
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  value: number;
  color: string;
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
      <div className={`p-2 rounded-md ${color}`}>
        <Icon size={15} className="text-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

interface Props {
  user: Pick<UserDetail, "meetingsAsHost" | "bookingsAsHost" | "availabilities">;
}

export function UserStatCards({ user }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard icon={Calendar} label="Meetings"    value={user.meetingsAsHost.length}  color="bg-blue-950/60" />
      <StatCard icon={BookOpen} label="Bookings"    value={user.bookingsAsHost.length}  color="bg-violet-950/60" />
      <StatCard icon={Clock}    label="Avail Slots" value={user.availabilities.length}  color="bg-emerald-950/60" />
    </div>
  );
}
