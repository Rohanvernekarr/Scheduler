import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PremiumDateTimePicker } from '@repo/ui';
import { DurationPresets } from './DurationPresets';

interface DateTimeSectionProps {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  duration: number | 'custom';
  onStartChange: (date: string, time: string) => void;
  onEndChange: (date: string, time: string) => void;
  onDurationChange: (dur: number | 'custom') => void;
  currentDuration: number | null;
}

export function DateTimeSection({
  startDate,
  startTime,
  endDate,
  endTime,
  duration,
  onStartChange,
  onEndChange,
  onDurationChange,
  currentDuration,
}: DateTimeSectionProps) {
  return (
    <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
          Schedule
        </p>
        
        <DurationPresets selected={duration} onSelect={onDurationChange} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Start */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-zinc-500/20 flex items-center justify-center text-zinc-100 text-[9px] font-bold">S</span>
            Start
          </p>
          <PremiumDateTimePicker
            expireDate={startDate}
            setExpireDate={(d) => onStartChange(d, startTime)}
            expireTime={startTime}
            setExpireTime={(t) => onStartChange(startDate, t)}
          />
        </div>

        <div className="hidden sm:block w-px bg-white/[0.06] self-stretch mt-6" />

        {/* End */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-zinc-500/20 flex items-center justify-center text-zinc-400 text-[9px] font-bold">E</span>
            End
          </p>
          <PremiumDateTimePicker
            expireDate={endDate}
            setExpireDate={(d) => onEndChange(d, endTime)}
            expireTime={endTime}
            setExpireTime={(t) => onEndChange(endDate, t)}
          />
        </div>
      </div>

      {/* Duration confirmation display */}
      {currentDuration !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-6 flex items-center gap-3 p-3 rounded-xl border ${
            currentDuration > 0 
              ? 'bg-zinc-500/5 border-zinc-500/10 text-zinc-100' 
              : 'bg-red-500/5 border-red-500/10 text-red-400'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden ${
            currentDuration > 0 ? 'bg-zinc-500/10' : 'bg-red-500/10'
          }`}>
             <Sparkles size={16} />
          </div>
          <div className="flex-1">
             <p className="text-[10px] uppercase font-bold tracking-wider opacity-50">
              {currentDuration > 0 ? 'Meeting Duration' : 'Invalid Duration'}
             </p>
             <p className="text-sm font-bold text-white">
                {currentDuration <= 0 ? 'End must be after start' : (
                  <>
                    {Math.floor(currentDuration / 60) > 0 && `${Math.floor(currentDuration / 60)}h `}
                    {currentDuration % 60 > 0 && `${currentDuration % 60}m`}
                    {currentDuration === 0 && '0m'}
                    <span className="text-white/20 mx-1">•</span> 
                    <span className="text-xs font-medium text-white/40 italic">
                      ends {new Date(`${endDate}T${endTime}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </>
                )}
             </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
