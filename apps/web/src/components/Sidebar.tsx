import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarClock, BookOpen, Settings, User } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Overview', path: '/', icon: LayoutDashboard },
    { label: 'Availability', path: '/availability', icon: CalendarClock },
    { label: 'Bookings', path: '/bookings', icon: BookOpen },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed h-screen w-64 flex flex-col p-6 bg-slate-900/40 backdrop-blur-xl border-r border-white/5 z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 flex items-center justify-center font-black text-white italic">S</div>
        <span className="font-extrabold text-xl tracking-tight bg-white bg-clip-text text-transparent">Scheduler</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 font-bold shadow-sm' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto p-4 bg-white/3 rounded-[24px] border border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400">
            <User size={20} />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Admin</p>
            <p className="text-sm font-bold text-slate-100 mt-1">John Doe</p>
          </div>
        </div>
      </div>
    </div>
  );
};
