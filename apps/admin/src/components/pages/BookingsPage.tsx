import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../shared/DataTable";
import { PageHeader } from "../shared/PageHeader";
import { Badge } from "../ui/badge";

import { API } from "../../lib/config";

interface Booking {
  id: string; guestEmail: string;
  startTime: string; endTime: string;
  status: "CONFIRMED" | "CANCELLED"; createdAt: string;
  host: { id: string; name: string; email: string };
}

const COLUMNS = [
  {
    key: "id", label: "ID",
    render: (b: Booking) => (
      <span className="text-xs font-mono text-muted-foreground">{b.id.slice(0, 8)}…</span>
    ),
  },
  {
    key: "guest", label: "Guest",
    render: (b: Booking) => (
      <span className="text-sm">{b.guestEmail}</span>
    ),
  },
  {
    key: "host", label: "Host",
    render: (b: Booking) => (
      <div>
        <p className="text-sm">{b.host.name}</p>
        <p className="text-xs text-muted-foreground">{b.host.email}</p>
      </div>
    ),
  },
  {
    key: "start", label: "Start",
    render: (b: Booking) => (
      <span className="text-xs text-muted-foreground">
        {new Date(b.startTime).toLocaleString()}
      </span>
    ),
  },
  {
    key: "end", label: "End",
    render: (b: Booking) => (
      <span className="text-xs text-muted-foreground">
        {new Date(b.endTime).toLocaleString()}
      </span>
    ),
  },
  {
    key: "status", label: "Status",
    render: (b: Booking) => (
      <Badge variant={b.status === "CONFIRMED" ? "success" : "destructive"}>
        {b.status}
      </Badge>
    ),
  },
  {
    key: "booked", label: "Booked At",
    render: (b: Booking) => (
      <span className="text-xs text-muted-foreground">
        {new Date(b.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

export function BookingsPage() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const res = await fetch(`${API}/admin/bookings`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return (await res.json()).data.bookings as Booking[];
    },
  });

  return (
    <div className="fade-in">
      <PageHeader title="Bookings" description="All confirmed and cancelled bookings" count={data?.length} onRefresh={refetch} isRefetching={isRefetching} />
      <DataTable
        data={data} columns={COLUMNS} isLoading={isLoading} isError={isError}
        errorMessage={error instanceof Error ? error.message : undefined}
        rowKey={(b) => b.id}
        searchField={(b) => b.host.email}
        searchPlaceholder="Search by host email…"
      />
    </div>
  );
}
