export const Sidebar = () => {
  const navItems = [
    { label: 'Overview', active: true },
    { label: 'My Meetings', active: false },
    { label: 'Availability', active: false },
    { label: 'Bookings', active: false },
    { label: 'Settings', active: false },
  ];

  return (
    <div className="fixed h-screen w-64 flex flex-col p-6 bg-slate-900/40 backdrop-blur-xl border-r border-white/5">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20" />
        <span className="font-extrabold text-xl tracking-tight">SCHEDULER</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              item.active 
                ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      
      <div className="mt-auto p-4 bg-white/3 rounded-2xl border border-white/5">
        <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Logged in as</p>
        <p className="text-sm font-bold text-slate-100 mt-1">John Doe</p>
      </div>
    </div>
  );
};
