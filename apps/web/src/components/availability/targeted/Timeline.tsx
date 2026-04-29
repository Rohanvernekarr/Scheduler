import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Link, Check, Clock } from 'lucide-react';
import type { AvailabilitySlot } from './types';
import { HOURS, INTERVALS, DURATIONS } from './types';

interface TimelineProps {
  selectedDate: string;
  slots: AvailabilitySlot[];
  dispatchedSlots: AvailabilitySlot[];
  pendingTime: string | null;
  setPendingTime: (time: string | null) => void;
  onAddSlot: (time: string, dur: number) => void;
  onRemoveSlot: (id: string, isDispatched: boolean) => void;
}

export function Timeline({
  selectedDate,
  slots,
  dispatchedSlots,
  pendingTime,
  setPendingTime,
  onAddSlot,
  onRemoveSlot,
}: TimelineProps) {
  const allSlotsForDate = [...slots, ...dispatchedSlots].filter(s => s.date === selectedDate);

  return (
    <div className="xl:col-span-8 bg-[#111111] border border-white/[0.06] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col h-[650px] md:h-[850px] shadow-2xl relative z-0">
      <div className="px-4 md:px-10 py-4 md:py-8 border-b border-white/[0.04] bg-black/40 flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-black text-white italic uppercase leading-none tracking-tighter">Timeline Analysis</h2>
          <p className="text-[8px] md:text-[10px] text-zinc-600 font-bold uppercase tracking-[0.15em] mt-2 md:mt-3">
            Active // {new Date(selectedDate).toLocaleDateString('en-GB', { weekday: 'long' })} Protocol
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[9px] font-black text-white uppercase tracking-widest">Clock Sync Active</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="relative min-h-[1440px] px-3 md:px-10 pt-4 md:pt-6 pb-20">
          {HOURS.map(hour => {
            const hourLabel = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
            
            return (
              <div key={hour} className="flex border-t border-white/[0.02] last:border-b transition-colors hover:bg-white/[0.01]">
                <div className="w-16 md:w-24 pr-4 md:pr-8 -mt-2.5 text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tabular-nums sticky left-0 bg-[#111111] z-10 py-1 transition-colors group-hover:text-zinc-600">
                  {hourLabel}
                </div>

                <div className="flex-1 space-y-1.5 py-2">
                  {INTERVALS.map(min => {
                    const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                    const isPending = pendingTime === time;
                    const startMs = new Date(selectedDate).setHours(hour, min, 0, 0);
                    
                    const coveringSlot = allSlotsForDate.find(s => {
                      const sStartMs = new Date(s.startTime).getTime();
                      const sEndMs = new Date(s.endTime).getTime();
                      return startMs >= sStartMs && startMs < sEndMs;
                    });

                    const isStartingSegment = coveringSlot && new Date(coveringSlot.startTime).getHours() === hour && new Date(coveringSlot.startTime).getMinutes() === min;

                    return (
                      <div key={min} className="h-10 relative group/row">
                        {!coveringSlot && (
                          <button 
                            onClick={() => setPendingTime(time)}
                            className="absolute inset-x-0 inset-y-0 rounded-xl transition-all hover:bg-white/[0.03] active:scale-[0.99]"
                          />
                        )}
                        
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.005] pointer-events-none" />

                        {isStartingSegment && (
                          <SlotBlock 
                            slot={coveringSlot} 
                            isDispatched={dispatchedSlots.some(ds => ds.id === coveringSlot.id)}
                            onRemove={() => onRemoveSlot(coveringSlot.id, dispatchedSlots.some(ds => ds.id === coveringSlot.id))}
                          />
                        )}

                        <AnimatePresence>
                          {isPending && (
                            <PendingBlock 
                              time={time} 
                              onAdd={(dur) => onAddSlot(time, dur)} 
                              onCancel={() => setPendingTime(null)} 
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-8 bg-black/60 border-t border-white/[0.04] backdrop-blur-md">
        <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.3em] italic text-center leading-relaxed">
          System Synchronized // Select any 15-minute operational block to initiate cluster allocation
        </p>
      </div>
    </div>
  );
}

function SlotBlock({ slot, isDispatched, onRemove }: { slot: any, isDispatched: boolean, onRemove: () => void }) {
  const isBooked = slot.status === 'booked' || slot.isBooked;
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (slot.inviteLink) {
      navigator.clipboard.writeText(slot.inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      style={{ height: `calc(${(slot.duration / 15) * 100}% + ${((slot.duration / 15) - 1) * 6}px)` }}
      className={`absolute inset-x-0 top-0 px-3 md:px-5 rounded-xl flex items-center justify-between shadow-2xl z-10 border-2 transition-all group/slot ${
        isBooked 
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          : isDispatched
            ? 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-600' 
            : 'bg-white text-black border-white'
      }`}
    >
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        <div className={`px-1.5 md:px-2 py-0.5 text-[8px] md:text-[9px] font-black uppercase italic rounded-md flex-shrink-0 ${
          isBooked ? 'bg-emerald-500 text-black' : isDispatched ? 'bg-zinc-900 text-zinc-600' : 'bg-black text-white'
        }`}>
          {slot.duration}M
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] md:text-sm font-black tracking-tighter uppercase italic truncate">
            {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} — {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <div className="flex items-center gap-1 md:gap-2">
            {isDispatched && (
              <span className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.2em] text-zinc-600 truncate">
                {slot.guestEmail || 'Dispatched Protocol'}
              </span>
            )}
            {isBooked && (
              <span className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.2em] text-emerald-500">Confirmed Booking</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {isDispatched && slot.inviteLink && (
          <button 
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-white/5 text-zinc-600 hover:text-white hover:bg-white/10 transition-all active:scale-90 flex items-center gap-2"
            title="Copy Invite Link"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Link size={12} />}
            <span className="hidden group-hover/slot:inline text-[8px] font-black uppercase tracking-widest">{copied ? 'Copied' : 'Link'}</span>
          </button>
        )}
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }} 
          className={`p-1.5 rounded-lg active:scale-90 transition-all ${
            isDispatched
              ? 'hover:bg-red-500/10 text-zinc-800 hover:text-red-500'
              : 'hover:bg-black/10'
          }`}
          title="Remove Slot"
        >
          <Trash2 size={14} className={isDispatched ? "" : "opacity-50 hover:opacity-100 transition-opacity"} />
        </button>
      </div>
    </motion.div>
  );
}

function PendingBlock({ time, onAdd, onCancel }: { time: string, onAdd: (dur: number) => void, onCancel: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="absolute inset-x-0 inset-y-0 bg-[#1a1a1a] border-2 border-white/20 rounded-xl flex items-center z-20 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="px-5 border-r border-white/10 h-full flex flex-col justify-center bg-black/40">
        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest whitespace-nowrap mb-0.5">Allocation</span>
        <span className="text-[11px] font-black text-emerald-400 tracking-tighter">@{time}</span>
      </div>
      <div className="flex-1 flex h-full">
        {DURATIONS.map(dur => (
          <button 
            key={dur}
            onClick={() => onAdd(dur)}
            className="flex-1 hover:bg-white hover:text-black text-white text-[11px] font-black uppercase tracking-widest transition-all p-1"
          >
            {dur}m
          </button>
        ))}
      </div>
      <button onClick={onCancel} className="px-5 text-white/20 hover:text-white transition-colors text-lg">✕</button>
    </motion.div>
  );
}
