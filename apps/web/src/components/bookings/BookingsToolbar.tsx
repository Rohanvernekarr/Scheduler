import { Search } from 'lucide-react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function TabButton({ active, onClick, label }: TabButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
        active 
          ? 'bg-white text-black shadow-lg shadow-white/10' 
          : 'text-zinc-500 hover:text-zinc-300'
      }`}
    >
      {label}
    </button>
  );
}

interface BookingsToolbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function BookingsToolbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }: BookingsToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/[0.02] border border-white/5 p-2 rounded-2xl">
      <div className="flex gap-1">
        <TabButton active={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')} label="Upcoming" />
        <TabButton active={activeTab === 'past'} onClick={() => setActiveTab('past')} label="Past" />
        <TabButton active={activeTab === 'cancelled'} onClick={() => setActiveTab('cancelled')} label="Cancelled" />
      </div>
      
      <div className="relative w-full md:w-64 pr-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
        <input 
          type="text"
          placeholder="Search participant..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-black/40 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-700"
        />
      </div>
    </div>
  );
}
