import { Badge } from "../ui/badge";
import { CheckCircle2, XCircle, AtSign, Building2 } from "lucide-react";
import type { UserDetail } from "./types";

interface Props {
  user: UserDetail;
}

export function UserProfileCard({ user }: Props) {
  const initials = user.name
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="rounded-lg border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
        <span className="text-lg font-bold text-foreground">{initials}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h1 className="text-lg font-semibold text-foreground">{user.name}</h1>
          <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
            {user.role}
          </Badge>
          {user.emailVerified
            ? <CheckCircle2 size={14} className="text-emerald-500" />
            : <XCircle size={14} className="text-amber-500" />}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{user.email}</span>
          {user.username && (
            <span className="flex items-center gap-1">
              <AtSign size={11} /> {user.username}
            </span>
          )}
          {user.company && (
            <span className="flex items-center gap-1">
              <Building2 size={11} /> {user.company.name}
            </span>
          )}
          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
