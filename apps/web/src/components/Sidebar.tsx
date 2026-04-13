import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarClock, BookOpen, Settings, User, Clock } from 'lucide-react';

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
    <div className="fixed h-screen w-64 flex flex-col p-6 bg-white border-r border-black z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center font-black text-white italic">S</div>
        <span className="font-black text-xl tracking-tighter text-black uppercase">Scheduler</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-black text-white font-black' 
                  : 'text-black/60 hover:bg-black/5 hover:text-black font-bold'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-white' : 'text-black/40 group-hover:text-black'} />
              <span className="text-sm tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto p-4 bg-transparent rounded-2xl border-2 border-black">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div>
            <p className="text-[10px] text-black/40 font-black uppercase tracking-widest leading-none">Account</p>
            <p className="text-sm font-black text-black mt-1">John Doe</p>
          </div>
        </div>
      </div>
    </div>

  );
};
