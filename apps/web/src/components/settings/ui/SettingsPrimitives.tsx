
export function SettingsField({ label, icon, value, isEditing, onChange, prefix }: any) {
  return (
    <div className="space-y-1.5 md:space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-zinc-600 scale-75 md:scale-100">{icon}</span>
        <label className="text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{label}</label>
      </div>
      {isEditing ? (
        <div className="relative">
          {prefix && <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold text-xs md:text-base">{prefix}</span>}
          <input 
            value={value} 
            onChange={e => onChange(e.target.value)}
            className={`w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-xs md:text-base text-white focus:outline-none focus:border-white/20 transition-all ${prefix ? 'pl-8' : ''}`}
          />
        </div>
      ) : (
        <p className="text-sm md:text-lg font-bold text-white px-1 flex items-center gap-1">
          {prefix && <span className="text-zinc-700">{prefix}</span>}
          {value || <span className="text-zinc-800 italic">Not set</span>}
        </p>
      )}
    </div>
  );
}

export function SettingsToggle({ label, description, active, onToggle }: any) {
  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl hover:bg-white/[0.04] transition-all group">
      <div>
        <h4 className="text-[12px] md:text-white font-bold group-hover:text-white transition-colors">{label}</h4>
        <p className="text-zinc-500 text-[10px] md:text-xs mt-0.5 md:mt-1">{description}</p>
      </div>
      <div 
        onClick={onToggle}
        className={`w-8 h-4.5 md:w-12 md:h-6 rounded-full p-0.5 md:p-1 transition-all cursor-pointer ${active ? 'bg-white' : 'bg-zinc-800'}`}
      >
        <div className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full transition-all ${active ? 'bg-black translate-x-3.5 md:translate-x-6' : 'bg-zinc-600'}`} />
      </div>
    </div>
  );
}

export function SettingsSelect({ label, icon, value, options, onChange }: any) {
  return (
    <div className="space-y-1.5 md:space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-zinc-600 scale-75 md:scale-100">{icon}</span>
        <label className="text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{label}</label>
      </div>
      <div className="relative group/select">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-[10px] md:text-sm font-medium appearance-none focus:outline-none focus:border-white/20 transition-all cursor-pointer"
        >
          {options.map((opt: string) => (
            <option key={opt} value={opt} className="bg-zinc-900 text-white">{opt}</option>
          ))}
        </select>
        <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/20 pointer-events-none group-hover/select:bg-white/40 transition-colors" />
      </div>
    </div>
  );
}
