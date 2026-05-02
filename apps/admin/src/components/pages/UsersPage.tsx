import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../shared/DataTable";
import { PageHeader } from "../shared/PageHeader";
import { Badge } from "../ui/badge";
import { ChevronRight } from "lucide-react";

import { API } from "../../lib/config";

interface User {
  id: string; name: string; email: string;
  role: string; emailVerified: boolean;
  createdAt: string; username?: string;
  company?: { name: string };
}

const COLUMNS = [
  {
    key: "user", label: "User",
    render: (u: User) => (
      <div>
        <p className="font-medium text-foreground">{u.name}</p>
        <p className="text-xs text-muted-foreground">{u.email}</p>
      </div>
    ),
  },
  {
    key: "username", label: "Username",
    render: (u: User) => (
      <span className="text-muted-foreground text-xs">
        {u.username ? `@${u.username}` : "—"}
      </span>
    ),
  },
  {
    key: "company", label: "Company",
    render: (u: User) => (
      <span className="text-sm">{u.company?.name ?? "—"}</span>
    ),
  },
  {
    key: "role", label: "Role",
    render: (u: User) => (
      <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>
        {u.role}
      </Badge>
    ),
  },
  {
    key: "status", label: "Status",
    render: (u: User) => (
      <Badge variant={u.emailVerified ? "success" : "outline"}>
        {u.emailVerified ? "Verified" : "Pending"}
      </Badge>
    ),
  },
  {
    key: "joined", label: "Joined",
    render: (u: User) => (
      <span className="text-xs text-muted-foreground">
        {new Date(u.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: "view", label: "",
    render: () => (
      <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    ),
  },
];

export function UsersPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await fetch(`${API}/admin/users`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return (await res.json()).data.users as User[];
    },
  });

  return (
    <div className="fade-in">
      <PageHeader title="Users" description="All registered platform members" count={data?.length} />
      <DataTable
        data={data} columns={COLUMNS} isLoading={isLoading} isError={isError}
        errorMessage={error instanceof Error ? error.message : undefined}
        rowKey={(u) => u.id}
        searchField={(u) => u.email}
        searchPlaceholder="Search by email…"
        onRowClick={(u) => navigate(`/users/${u.id}`)}
      />
    </div>
  );
}
