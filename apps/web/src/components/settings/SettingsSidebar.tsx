import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, Puzzle, LogOut } from 'lucide-react';

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

  return (
    <aside className="w-full md:w-64 space-y-8">
      <div>
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 ml-2">Configuration</p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-white/5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'group-hover:text-zinc-300'} />
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="active-pill" className="ml-auto w-1 h-4 bg-white rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-8 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/50 hover:text-red-500 hover:bg-red-500/5 transition-all text-sm font-bold">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
