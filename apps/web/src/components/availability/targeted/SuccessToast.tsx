import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface SuccessToastProps {
  inviteLink: string;
}

export function SuccessToast({ inviteLink }: SuccessToastProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-12 right-12 max-w-sm bg-white p-8 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] z-[100] text-black"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="font-black uppercase italic tracking-tighter text-xl">Protocol Active</h3>
      </div>
      <p className="text-xs font-bold text-black/50 mb-6 leading-relaxed">
        System sync successful. Distributions dispatched to guest emails.
      </p>
      <div className="bg-black/5 p-4 rounded-2xl border border-black/5 flex items-center justify-between gap-3">
        <code className="text-[10px] truncate font-mono font-bold opacity-30">{inviteLink}</code>
        <button 
          onClick={() => navigator.clipboard.writeText(inviteLink)} 
          className="bg-black text-white p-2 rounded-lg hover:scale-105 transition-transform"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
