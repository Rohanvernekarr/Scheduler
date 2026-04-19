import { Clock, Languages } from 'lucide-react';
import { SettingsSelect } from '../ui/SettingsPrimitives';

const TIMEZONES = [
  'UTC -12:00 (International Date Line West)',
  'UTC -11:00 (Midway Island, Samoa)',
  'UTC -10:00 (Hawaii)',
  'UTC -09:00 (Alaska)',
  'UTC -08:00 (Pacific Time - US & Canada)',
  'UTC -07:00 (Mountain Time - US & Canada)',
  'UTC -06:00 (Central Time - US & Canada)',
  'UTC -05:00 (Eastern Time - US & Canada)',
  'UTC -04:00 (Atlantic Time - Canada)',
  'UTC -03:00 (Buenos Aires, Georgetown)',
  'UTC +00:00 (Dublin, London, Lisbon)',
  'UTC +01:00 (Berlin, Paris, Rome, Madrid)',
  'UTC +02:00 (Cairo, Johannesburg)',
  'UTC +03:00 (Moscow, Nairobi, Riyadh)',
  'UTC +04:00 (Abu Dhabi, Muscat, Baku)',
  'UTC +05:00 (Islamabad, Karachi, Tashkent)',
  'UTC +05:30 (Mumbai, Kolkata, New Delhi)',
  'UTC +07:00 (Bangkok, Hanoi, Jakarta)',
  'UTC +08:00 (Beijing, Singapore, Perth)',
  'UTC +09:00 (Tokyo, Seoul, Osaka)',
  'UTC +10:00 (Sydney, Melbourne, Guam)',
  'UTC +12:00 (Auckland, Wellington)',
];

const LANGUAGES = [
  'English (US)',
  'English (UK)',
  'Spanish (Español)',
  'French (Français)',
  'German (Deutsch)',
  'Mandarin (普通话)',
  'Hindi (हिन्दी)',
  'Arabic (العربية)',
  'Portuguese (Português)',
  'Russian (Русский)',
  'Japanese (日本語)',
  'Korean (한국어)',
  'Italian (Italiano)',
  'Turkish (Türkçe)',
  'Vietnamese (Tiếng Việt)',
];

export function PreferencesSection({ formData, setFormData }: any) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsSelect 
          label="System Timezone" 
          icon={<Clock size={16} />} 
          value={formData.timezone}
          options={TIMEZONES}
          onChange={(v: string) => setFormData((f: any) => ({ ...f, timezone: v }))}
        />
        <SettingsSelect 
          label="Interface Language" 
          icon={<Languages size={16} />} 
          value={formData.language}
          options={LANGUAGES}
          onChange={(v: string) => setFormData((f: any) => ({ ...f, language: v }))}
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
