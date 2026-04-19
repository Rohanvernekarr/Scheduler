import { Clock, Languages } from 'lucide-react';
import { SettingsSelect } from '../ui/SettingsPrimitives';

export function PreferencesSection({ formData, setFormData }: any) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsSelect 
          label="System Timezone" icon={<Clock size={16} />} 
          value={formData.timezone}
          options={['UTC -5 (Eastern Time)', 'UTC +0 (Greenwich)', 'UTC +5:30 (India)']}
        />
        <SettingsSelect 
          label="Interface Language" icon={<Languages size={16} />} 
          value={formData.language}
          options={['English (US)', 'Spanish (ES)', 'French (FR)', 'Japanese (JP)']}
        />
      </div>

      <div className="space-y-6 pt-6">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Appearance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ThemeCard label="Dark" active />
          <ThemeCard label="Light" />
          <ThemeCard label="System" />
        </div>
      </div>
    </div>
  );
}

function ThemeCard({ label, active }: any) {
  return (
    <div className={`p-4 rounded-2xl border transition-all cursor-pointer text-center ${active ? 'border-white bg-white/5' : 'border-white/5 bg-transparent hover:border-white/20'}`}>
      <div className={`w-full h-20 rounded-xl mb-3 ${label === 'Dark' ? 'bg-zinc-900' : label === 'Light' ? 'bg-zinc-100' : 'bg-gradient-to-tr from-zinc-900 to-zinc-100'}`} />
      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-zinc-500'}`}>{label}</span>
    </div>
  );
}
