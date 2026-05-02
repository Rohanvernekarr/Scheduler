import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../shared/DataTable";
import { PageHeader } from "../shared/PageHeader";

import { API } from "../../lib/config";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface AvailRecord {
  id: string; dayOfWeek: number;
  startTime: string; endTime: string;
  user: { id: string; name: string; email: string };
}

const COLUMNS = [
  {
    key: "user", label: "User",
    render: (a: AvailRecord) => (
      <div>
        <p className="font-medium text-foreground">{a.user.name}</p>
        <p className="text-xs text-muted-foreground">{a.user.email}</p>
      </div>
    ),
  },
  {
    key: "day", label: "Day",
    render: (a: AvailRecord) => (
      <span className="text-sm font-medium">{DAYS[a.dayOfWeek]}</span>
    ),
  },
  {
    key: "start", label: "Start",
    render: (a: AvailRecord) => (
      <span className="text-sm font-mono">{a.startTime}</span>
    ),
  },
  {
    key: "end", label: "End",
    render: (a: AvailRecord) => (
      <span className="text-sm font-mono">{a.endTime}</span>
    ),
  },
  {
    key: "duration", label: "Duration",
    render: (a: AvailRecord) => {
      const [sh, sm] = a.startTime.split(":").map(Number);
      const [eh, em] = a.endTime.split(":").map(Number);
      const mins = (eh * 60 + em) - (sh * 60 + sm);
      return (
        <span className="text-xs text-muted-foreground">
          {Math.floor(mins / 60)}h {mins % 60 > 0 ? `${mins % 60}m` : ""}
        </span>
      );
    },
  },
];

export function AvailabilityPage() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["admin-availability"],
    queryFn: async () => {
      const res = await fetch(`${API}/admin/availability`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return (await res.json()).data.availability as AvailRecord[];
    },
  });

  return (
    <div className="fade-in">
      <PageHeader title="Availability" description="User availability schedules across all accounts" count={data?.length} onRefresh={refetch} isRefetching={isRefetching} />
      <DataTable
        data={data} columns={COLUMNS} isLoading={isLoading} isError={isError}
        errorMessage={error instanceof Error ? error.message : undefined}
        rowKey={(a) => a.id}
      />
    </div>
  );
}
