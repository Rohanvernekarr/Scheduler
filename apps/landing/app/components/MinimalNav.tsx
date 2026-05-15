"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";

export function MinimalNav() {
  return (
    <nav className="fixed top-10 left-0 right-0 z-50 flex justify-center px-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 sm:gap-10 px-4 sm:px-10"
      >
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          <span className="text-sm sm:text-lg font-black tracking-tighter uppercase">Scheduler</span>
        </Link>

        <div className="h-4 sm:h-6 w-[1px] bg-border" />

        <Link 
          href="/" 
          className="tech-label hover:text-white transition-colors text-[10px] sm:text-[12px] flex items-center gap-2"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Home
        </Link>
      </motion.div>
    </nav>
  );
}
