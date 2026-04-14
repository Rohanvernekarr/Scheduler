import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarClock, Clock, BookOpen, Settings, User } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/', icon: LayoutDashboard },
    { label: 'Schedule', path: '/schedule', icon: CalendarClock },
    { label: 'Availability', path: '/availability', icon: Clock },
    { label: 'Bookings', path: '/bookings', icon: BookOpen },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed h-screen w-64 flex flex-col p-5 bg-[#0d0d0d] border-r border-white/[0.06] z-50">
     
      <div className="flex items-center gap-3 mb-8 px-2 py-1">
        <span className="font-bold text-[25px] tracking-tight text-white">Scheduler</span>
      </div>

      <nav className="flex-1 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                isActive
                  ? 'bg-white/[0.08] text-white font-semibold'
                  : 'text-white/45 hover:bg-white/[0.05] hover:text-white/80 font-medium'
              }`}
            >
              <item.icon
                size={18}
                className={isActive ? 'text-zinc-50' : 'text-white/30 group-hover:text-white/60'}
              />
              <span className="text-sm">{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-zinc-50" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-3 bg-white/[0.04] rounded-xl border border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinx-300/20 border border-zinc-500/30 flex items-center justify-center text-zinc-50">
            <User size={15} />
          </div>
          <div>
            <p className="text-[11px] text-white/30 font-medium uppercase tracking-wider leading-none">Account</p>
            <p className="text-sm font-semibold text-white mt-0.5">John Doe</p>
          </div>
        </div>
      </div>
    </div>
  );
};
