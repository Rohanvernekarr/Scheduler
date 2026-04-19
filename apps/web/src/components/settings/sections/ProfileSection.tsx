import { User, Camera, Mail, Shield, Monitor, AtSign } from 'lucide-react';
import { SettingsField } from '../ui/SettingsPrimitives';

export function ProfileSection({ user, formData, setFormData, isEditing }: any) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[2rem] bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl relative">
            {user?.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700">
                <User size={48} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <Camera size={24} className="text-white" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-xl shadow-xl">
            <Camera size={12} />
          </div>
        </div>

        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <SettingsField 
            label="Display Name" icon={<User size={14} />} 
            value={formData.name} isEditing={isEditing}
            onChange={(v: string) => setFormData((f: any) => ({ ...f, name: v }))}
          />
          <div className="md:col-span-2">
            <SettingsField 
              label="Bio / Description" icon={<Monitor size={14} />} 
              value={formData.bio} isEditing={isEditing}
              onChange={(v: string) => setFormData((f: any) => ({ ...f, bio: v }))}
            />
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-white/5 space-y-6">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Email Management</p>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-xl text-zinc-500">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-white font-bold">{user?.email}</p>
              <p className="text-xs text-zinc-500 mt-0.5">Primary address for login and notifications.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">Verified</span>
        </div>
      </div>
    </div>
  );
}
