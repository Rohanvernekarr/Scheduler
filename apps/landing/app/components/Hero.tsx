"use client";

import { motion } from "framer-motion";
import { CalendarDemo } from "./CalendarDemo";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden border-b border-border">
      {/* Giant Background Text */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0">
        <span className="text-[25vw] font-black text-white/[0.01] tracking-tighter uppercase whitespace-nowrap">
          System
        </span>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-8 justify-center lg:justify-start"
            >
              <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
              <span className="tech-label">Operational v1.0.4</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold tracking-tight mb-8"
            >
              The technical standard <br />
              <span className="text-subtle">for meeting coordination.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-subtle max-w-xl mb-12"
            >
              Engineered for precision. Eliminate scheduling friction with 
              automated invites and real-time availability sync.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <a href="http://localhost:5174/" className="bg-white text-black px-8 py-3 rounded-md font-bold text-sm hover:bg-white/90 transition-all flex items-center gap-2">
                Deploy Now
                <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#features" className="tech-border text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-white/5 transition-all">
                Documentation
              </a>
            </motion.div>
          </div>

          <div className="flex-[2.1] w-full flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative w-full"
            >
              <CalendarDemo />
              
             
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
