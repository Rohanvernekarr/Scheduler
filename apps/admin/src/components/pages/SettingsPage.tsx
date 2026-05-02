import { useSession } from "@repo/auth/client";
import { PageHeader } from "../shared/PageHeader";
import { Badge } from "../ui/badge";
import { Shield, User, Globe, Server } from "lucide-react";

function Row({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value ?? "—"}</span>
    </div>
  );
}

function Section({ icon: Icon, title, children }: {
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={15} className="text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="fade-in space-y-6 max-w-2xl">
      <PageHeader title="Settings" description="Platform configuration and session details" />

      <Section icon={User} title="Admin Account">
        <Row label="Name"  value={session?.user.name} />
        <Row label="Email" value={session?.user.email} />
        <Row label="Role"  value={session?.user.role} />
        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-sm text-muted-foreground">Verified</span>
          <Badge variant={session?.user.emailVerified ? "success" : "outline"}>
            {session?.user.emailVerified ? "Yes" : "No"}
          </Badge>
        </div>
      </Section>

      <Section icon={Shield} title="Session">
        <Row label="User ID"    value={session?.user.id} />
        <Row label="Session ID" value={session?.session?.id} />
        <Row label="Expires"    value={session?.session?.expiresAt
          ? new Date(session.session.expiresAt).toLocaleString() : undefined} />
      </Section>

      <Section icon={Globe} title="Environment">
        <Row label="API URL"     value={import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"} />
        <Row label="Web URL"     value={import.meta.env.VITE_WEB_URL || "http://localhost:5173"} />
        <Row label="Admin Port"  value="5174" />
      </Section>

      <Section icon={Server} title="Platform">
        <Row label="Version"     value="1.0.0" />
        <Row label="Auth"        value="Better Auth" />
        <Row label="Database"    value="PostgreSQL (Prisma)" />
        <Row label="API"         value="Express.js" />
      </Section>
    </div>
  );
}
