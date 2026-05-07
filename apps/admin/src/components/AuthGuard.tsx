import { useEffect } from "react";
import type { ReactNode } from "react";
import { useSession } from "@repo/auth/client";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      window.location.href = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/login' 
        : 'https://schedulers.app/login';
    } else if (session.user?.role !== "ADMIN") {
      window.location.href = window.location.hostname === 'localhost' 
        ? 'http://localhost:5173/' 
        : 'https://dashboard.schedulers.app/';
    }
  }, [isPending, session]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Authenticating…</span>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-sm text-muted-foreground">Redirecting…</span>
      </div>
    );
  }

  return <>{children}</>;
}
