"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "@repo/auth/client";
import { Calendar } from "lucide-react";

export function Nav() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-10 left-0 right-0 z-50 flex justify-center px-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=" flex items-center gap-4 sm:gap-10 px-4 sm:px-10"
      >
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          <span className="text-sm sm:text-lg font-black tracking-tighter uppercase">Scheduler</span>
        </Link>

        <div className="h-4 sm:h-6 w-[1px] bg-border" />

        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="#features" className="tech-label hover:text-white transition-colors text-[10px] sm:text-[12px]">Features</Link>
          <Link href="#how" className="tech-label hover:text-white transition-colors text-[10px] sm:text-[12px]">Process</Link>
        </div>

        <div className="h-4 sm:h-6 w-[1px] bg-border" />

        <Link 
          href={session ? "http://localhost:5174/" : "/login"} 
          className="tech-label hover:text-white transition-colors text-[10px] sm:text-[12px]"
        >
          {session ? "Dashboard" : "Login"}
        </Link>
      </motion.div>
    </nav>
  );
}



