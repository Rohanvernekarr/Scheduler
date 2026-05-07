import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, CalendarClock, Clock, BookOpen, Settings, User, LogOut, Menu, X } from 'lucide-react';
import { useSession, signOut } from '@repo/auth/client';
import toast from 'react-hot-toast';

export const Sidebar = () => {
  const location = useLocation();
  const { data: session, isPending } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Overview', path: '/', icon: LayoutDashboard },
    { label: 'Schedule', path: '/schedule', icon: CalendarClock },
    { label: 'Availability', path: '/availability', icon: Clock },
    { label: 'My Calendar', path: '/calendar', icon: Calendar },
    { label: 'Bookings', path: '/bookings', icon: BookOpen },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

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

  const landingUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://schedulers.app';

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] p-3 bg-[#0d0d0d] border border-white/10 rounded-xl text-white lg:hidden shadow-2xl active:scale-90 transition-transform"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed h-screen w-64 flex flex-col p-5 bg-[#0d0d0d] border-r border-white/[0.06] z-[55] transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
       
        <div className="mb-8 px-2 py-1 mt-12 lg:mt-0">
          <a 
            href={landingUrl} 
            className="font-bold text-[25px] tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            Scheduler
          </a>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto custom-scrollbar">
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
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              {session?.user.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name} 
                  className="w-8 h-8 rounded-full border border-white/10 flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-zinc-300/10 border border-white/10 flex items-center justify-center text-zinc-400 flex-shrink-0">
                  <User size={15} />
                </div>
              )}
              <div className="overflow-hidden min-w-0">
                <p className="text-[11px] text-white/30 font-medium uppercase tracking-wider leading-none truncate">
                  {isPending ? 'Loading...' : session?.user.email || 'Guest'}
                </p>
                <p className="text-sm font-semibold text-white mt-0.5 truncate">
                  {isPending 
                    ? '...' 
                    : session?.user.name || session?.user.email?.split('@')[0] || 'User'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              disabled={loggingOut}
              className={`p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all flex-shrink-0 ${
                loggingOut ? 'opacity-50 cursor-not-allowed animate-pulse' : ''
              }`}
              title="Sign Out"
            >
              <LogOut size={16} className={loggingOut ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

