import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSession, signOut } from '@repo/auth/client';
import { LogOut, Users, Settings } from 'lucide-react';

export function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        window.location.href = import.meta.env.VITE_WEB_URL || 'http://localhost:5173/login';
      } else if (session.user?.role !== 'ADMIN') {
        window.location.href = import.meta.env.VITE_WEB_URL || 'http://localhost:5173/';
      }
    }
  }, [isPending, session]);

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return <div className="flex min-h-screen items-center justify-center">Redirecting...</div>;
  }

  const handleSignOut = async () => {
    await signOut();
    window.location.href = import.meta.env.VITE_WEB_URL || 'http://localhost:5173/login';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <aside className="w-64 bg-white/60 backdrop-blur-xl border-r border-slate-200/60 flex-col hidden md:flex shadow-sm z-10 relative">
        <div className="h-16 flex items-center px-6 border-b border-slate-200/60 font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          Nexus Admin
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg font-medium transition-all shadow-sm ring-1 ring-indigo-100">
            <Users size={18} className="text-indigo-600" /> Users
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg font-medium transition-all">
            <Settings size={18} /> Settings
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200/60 bg-white/40">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-100/40 blur-3xl -z-10 pointer-events-none" />
        
        <header className="h-16 bg-white/60 backdrop-blur-xl border-b border-slate-200/60 flex items-center px-6 md:px-8 justify-between sticky top-0 z-10">
          <h1 className="font-semibold text-lg md:hidden bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Nexus Admin</h1>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-slate-700">{session.user.name}</div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white">
              {session.user.name?.[0] || 'A'}
            </div>
          </div>
        </header>
        <div className="p-6 md:p-10 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
