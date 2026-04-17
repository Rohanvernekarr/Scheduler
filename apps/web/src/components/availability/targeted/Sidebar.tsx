import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, Loader2, ChevronRight } from 'lucide-react';
import { PremiumDateTimePicker } from '@repo/ui';
import type { AvailabilitySlot } from './types';

interface SidebarProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  activeTime: string;
  setActiveTime: (time: string) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  isSending: boolean;
  slots: AvailabilitySlot[];
  onSendInvite: () => void;
  onRemoveSlot: (id: string) => void;
  setPendingTime: (time: string | null) => void;
}

export function Sidebar({
  selectedDate,
  setSelectedDate,
  activeTime,
  setActiveTime,
  guestEmail,
  setGuestEmail,
  isSending,
  slots,
  onSendInvite,
  onRemoveSlot,
  setPendingTime,
}: SidebarProps) {
  return (
    <div className="xl:col-span-4 space-y-6">
      <div className="bg-[#111111] border border-white/[0.06] rounded-3xl p-6 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            {new Date(selectedDate).toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric' 
            })}
          </h2>
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-1 italic leading-none">
            Global Synchronization Mode
          </p>
        </div>

        <div className="relative z-50">
          <PremiumDateTimePicker
            expireDate={selectedDate}
            setExpireDate={(d) => { 
              setSelectedDate(d); 
              setPendingTime(null); 
            }}
            expireTime={activeTime}
            setExpireTime={setActiveTime}
            showTime={false}
          />
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/[0.04] space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1 block">
              Recipient Credentials
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@organization.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-sm text-white focus:border-zinc-500 focus:outline-none transition-all placeholder:text-zinc-800"
              />
              <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-800" />
            </div>
          </div>

          <button
            onClick={onSendInvite}
            disabled={slots.length === 0 || !guestEmail || isSending}
            className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 group shadow-xl shadow-white/5"
          >
            {isSending ? (
              <>Dispatching... <Loader2 size={14} className="animate-spin" /></>
            ) : (
              <>Distribute Invite <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Marked Slots Queue */}
      <div className="space-y-3">
        {slots.length > 0 && (
          <p className="text-[10px] font-black text-zinc-500 uppercase px-2 mb-2 tracking-[0.2em]">
            Deployment Queue
          </p>
        )}
        <AnimatePresence initial={false}>
          {slots.map(s => (
            <motion.div 
              key={s.id} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111111] border border-white/[0.04] rounded-2xl p-4 flex items-center justify-between group hover:border-white/10 transition-all"
            >
               <div>
                  <p className="text-xs font-black text-white italic uppercase tracking-tight">
                    {new Date(s.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 opacity-50">
                    {s.startTime} — {s.endTime} // {s.duration}m Cluster
                  </p>
               </div>
               <button 
                 onClick={() => onRemoveSlot(s.id)} 
                 className="p-2 text-zinc-800 hover:text-red-400 transition-colors"
               >
                  <Trash2 size={14} />
               </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
