import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../shared/DataTable";
import { PageHeader } from "../shared/PageHeader";
import { Badge } from "../ui/badge";

import { API } from "../../lib/config";

interface Meeting {
  id: string; title: string; type: string;
  startTime: string; endTime: string;
  meetingLink?: string; createdAt: string;
  host: { id: string; name: string; email: string };
  participants: { id: string; email: string; status: string }[];
}

const COLUMNS = [
  {
    key: "title", label: "Meeting",
    render: (m: Meeting) => (
      <div>
        <p className="font-medium text-foreground">{m.title}</p>
        <p className="text-xs text-muted-foreground">{m.type}</p>
      </div>
    ),
  },
  {
    key: "host", label: "Host",
    render: (m: Meeting) => (
      <div>
        <p className="text-sm">{m.host.name}</p>
        <p className="text-xs text-muted-foreground">{m.host.email}</p>
      </div>
    ),
  },
  {
    key: "participants", label: "Participants",
    render: (m: Meeting) => (
      <span className="text-sm">{m.participants.length}</span>
    ),
  },
  {
    key: "start", label: "Start",
    render: (m: Meeting) => (
      <span className="text-xs text-muted-foreground">
        {new Date(m.startTime).toLocaleString()}
      </span>
    ),
  },
  {
    key: "end", label: "End",
    render: (m: Meeting) => (
      <span className="text-xs text-muted-foreground">
        {new Date(m.endTime).toLocaleString()}
      </span>
    ),
  },
  {
    key: "link", label: "Link",
    render: (m: Meeting) =>
      m.meetingLink ? (
        <a href={m.meetingLink} target="_blank" rel="noreferrer"
          className="text-xs text-foreground underline underline-offset-2 hover:text-muted-foreground">
          Open
        </a>
      ) : <Badge variant="secondary">None</Badge>,
  },
];

export function MeetingsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-meetings"],
    queryFn: async () => {
      const res = await fetch(`${API}/admin/meetings`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return (await res.json()).data.meetings as Meeting[];
    },
  });

  return (
    <div className="fade-in">
      <PageHeader title="Meetings" description="All scheduled meetings across the platform" count={data?.length} />
      <DataTable
        data={data} columns={COLUMNS} isLoading={isLoading} isError={isError}
        errorMessage={error instanceof Error ? error.message : undefined}
        rowKey={(m) => m.id}
        searchField={(m) => m.host.email}
        searchPlaceholder="Search by host email…"
      />
    </div>
  );
}
