import { User, Camera, Mail, Shield, CheckCircle2, Calendar, Lock } from 'lucide-react';
import { SettingsField } from '../ui/SettingsPrimitives';

export function ProfileSection({ user, formData, setFormData, isEditing }: any) {
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'April 2024';

  return (
    <div className="space-y-10">
      
      <div className="bg-[#0d0d0d] border border-white/[0.08] rounded-[2.5rem] overflow-hidden shadow-2xl relative">
      
        <div className="h-32 bg-gradient-to-r from-zinc-900 via-[#111] to-zinc-900 border-b border-white/5 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        
        <div className="px-10 pb-10">
          <div className="flex flex-col md:flex-row gap-10 items-start -mt-12 relative z-10">
           
            <div className="flex flex-col items-center gap-4">
              <div className="relative group/avatar">
                <div className="absolute -inset-2 bg-black rounded-[2.2rem]" />
                <div className="relative w-36 h-36 rounded-[2rem] bg-[#151515] border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {user?.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={54} className="text-zinc-700" />
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
                      <Camera size={28} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white text-black p-2.5 rounded-2xl shadow-2xl border-4 border-black">
                  <Camera size={14} />
                </div>
              </div>
            </div>

          
            <div className="flex-1 pt-14 space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge icon={<CheckCircle2 size={10} />} label="Verified Identity" color="text-emerald-500 bg-emerald-500/5 border-emerald-500/10" />
                <Badge icon={<Calendar size={10} />} label={`Member since ${joinDate}`} color="text-zinc-400 bg-white/5 border-white/5" />
                <Badge icon={<Lock size={10} />} label="End-to-End Encrypted" color="text-blue-500 bg-blue-500/5 border-blue-500/10" />
              </div>

              <div className="max-w-md">
                <SettingsField 
                  label="Display Name" 
                  icon={<User size={14} />} 
                  value={formData.name} 
                  isEditing={isEditing}
                  onChange={(v: string) => setFormData((f: any) => ({ ...f, name: v }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 flex items-center justify-between group hover:border-white/10 transition-colors">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/[0.03] rounded-2xl text-zinc-500 group-hover:text-white transition-colors">
              <Mail size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em] mb-1">Primary Email</p>
              <p className="text-lg font-bold text-white/80">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 flex items-center gap-5">
          <div className="p-4 bg-emerald-500/5 rounded-2xl text-emerald-500">
            <Shield size={22} />
          </div>
          <div>
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em] mb-1">Account Protection</p>
            <p className="text-lg font-bold text-white/80">Active & Monitored</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ icon, label, color }: any) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest ${color}`}>
      {icon}
      {label}
    </div>
  );
}
