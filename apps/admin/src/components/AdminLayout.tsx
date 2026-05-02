import { useState } from "react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useSession, signOut } from "@repo/auth/client";
import { Users, Calendar, BookOpen, Clock, Settings, LogOut, Menu, X, LayoutGrid } from "lucide-react";

const NAV = [
  { to: "/",             icon: Users,    label: "Users"        },
  { to: "/meetings",     icon: Calendar, label: "Meetings"     },
  { to: "/bookings",     icon: BookOpen, label: "Bookings"     },
  { to: "/availability", icon: Clock,    label: "Availability" },
  { to: "/settings",     icon: Settings, label: "Settings"     },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut();
    window.location.href = import.meta.env.VITE_WEB_URL || "http://localhost:5173/login";
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-border">
      <div className="h-14 px-5 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-foreground" />
          <span className="font-semibold text-sm tracking-tight">Admin</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-muted-foreground hover:text-foreground p-1">
            <X size={16} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to} to={to} end={to === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-zinc-800 text-foreground font-medium"
                  : "text-muted-foreground hover:bg-zinc-900 hover:text-foreground"
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-2">
        <div className="px-3 py-2">
          <p className="text-xs font-medium text-foreground truncate">{session?.user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{session?.user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-zinc-900 hover:text-foreground transition-colors"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
     
      <aside className="hidden md:flex flex-col w-56 flex-shrink-0">
        <Sidebar />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-56 flex-shrink-0">
            <Sidebar onClose={() => setOpen(false)} />
          </div>
          <div className="flex-1 bg-black/60" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-14 border-b border-border flex items-center px-4 md:hidden bg-zinc-950">
          <button onClick={() => setOpen(true)} className="text-muted-foreground hover:text-foreground p-1 mr-3">
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <LayoutGrid size={14} />
            <span className="font-semibold text-sm">Admin</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
