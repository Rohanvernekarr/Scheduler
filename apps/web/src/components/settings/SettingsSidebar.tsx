import { motion } from 'framer-motion';
import { User, Bell, Shield, Puzzle, LogOut } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { signOut } from '@repo/auth/client';


interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
  ];

  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      toast.success("Signed out successfully");
        window.location.href = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000' 
        : 'https://schedulers.app';
    } catch {
      toast.error("Failed to sign out");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-full md:w-64 space-y-4 md:space-y-8">
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        <p className="hidden md:block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 ml-2">Configuration</p>
        <nav className="flex md:flex-col gap-1 min-w-max md:min-w-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 md:gap-3 px-3 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-200 group whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-white/5 md:bg-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
              }`}
            >
              <item.icon size={14} className={`md:w-[18px] md:h-[18px] ${activeTab === item.id ? 'text-white' : 'group-hover:text-zinc-300'}`} />
              <span className="text-[10px] md:text-sm font-bold tracking-tight">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="active-pill" className="hidden md:block ml-auto w-1 h-4 bg-white rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="hidden md:block pt-8 border-t border-white/5">
        <button 
          onClick={handleSignOut}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/50 hover:text-red-500 hover:bg-red-500/5 transition-all text-sm font-bold"
        >
          <LogOut size={18} />
          {loggingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}
