import { motion, AnimatePresence } from 'framer-motion';

export function SettingsField({ label, icon, value, isEditing, onChange, prefix }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-zinc-600">{icon}</span>
        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{label}</label>
      </div>
      {isEditing ? (
        <div className="relative">
          {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold">{prefix}</span>}
          <input 
            value={value} 
            onChange={e => onChange(e.target.value)}
            className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all ${prefix ? 'pl-9' : ''}`}
          />
        </div>
      ) : (
        <p className="text-lg font-bold text-white px-1 flex items-center gap-1">
          {prefix && <span className="text-zinc-700">{prefix}</span>}
          {value || <span className="text-zinc-800 italic">Not set</span>}
        </p>
      )}
    </div>
  );
}

export function SettingsToggle({ label, description, active, onToggle }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all group">
      <div>
        <h4 className="text-white font-bold group-hover:text-white transition-colors">{label}</h4>
        <p className="text-zinc-500 text-xs mt-1">{description}</p>
      </div>
      <div 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${active ? 'bg-white' : 'bg-zinc-800'}`}
      >
        <div className={`w-4 h-4 rounded-full transition-all ${active ? 'bg-black translate-x-6' : 'bg-zinc-600'}`} />
      </div>
    </div>
  );
}

export function SettingsSelect({ label, icon, value, options }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-zinc-600">{icon}</span>
        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{label}</label>
      </div>
      <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white flex items-center justify-between cursor-pointer hover:bg-white/[0.08] transition-all">
        <span className="text-sm font-medium">{value}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
