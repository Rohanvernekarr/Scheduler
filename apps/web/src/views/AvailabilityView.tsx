import { TargetedBooking } from '../components/availability/TargetedBooking';
import { motion } from 'framer-motion';

export default function AvailabilityView() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Scheduling Infrastructure // Targeted Sync</p>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Availability Builder</h1>
        <p className="text-white/30 text-sm mt-2 font-medium max-w-sm">
          Select specific windows from the system calendar to generate high-intent booking invitations. 
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
         <TargetedBooking />
      </motion.div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-16 bg-white/5 rounded-2xl w-1/3" />
      <div className="h-[500px] bg-white/5 rounded-[40px] w-full" />
    </div>
  );
}
