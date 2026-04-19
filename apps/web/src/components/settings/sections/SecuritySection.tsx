import { Shield, Monitor, Trash2 } from 'lucide-react';

export function SecuritySection() {
  return (
    <div className="space-y-10">
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] p-8 flex items-center gap-6">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
          <Shield size={24} />
        </div>
        <div>
          <h3 className="text-white font-bold">Two-Factor Authentication</h3>
          <p className="text-zinc-500 text-sm mt-1">Your account is secured with secondary verification.</p>
        </div>
        <button className="ml-auto px-4 py-2 bg-white text-black rounded-lg text-xs font-bold uppercase tracking-widest">Manage</button>
      </div>

      <div className="space-y-6">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Active Sessions</p>
        <div className="space-y-3">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/5 rounded-lg text-zinc-400"><Monitor size={16} /></div>
              <div>
                <p className="text-white text-sm font-bold">Chrome on Windows 11</p>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Current Session • 192.168.1.1</p>
              </div>
            </div>
            <button className="text-zinc-600 hover:text-white transition-colors"><Trash2 size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
