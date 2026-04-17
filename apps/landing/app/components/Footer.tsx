"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer(): ReactNode {
  return (
    <footer className="border-t border-border py-20 overflow-hidden">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between gap-20"
        >
          <div className="max-w-xs">
            <span className="tech-heading text-3xl mb-6 block">Scheduler</span>
            <p className="tech-label text-foreground/30 leading-relaxed uppercase">
              A systematic approach to meeting booking. Built for clarity and speed. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 xl:gap-24">
            <div className="flex flex-col gap-6">
              <span className="tech-label">SYSTEM</span>
              <div className="flex flex-col gap-3">
                 <Link href="/status" className="tech-heading text-[12px] text-foreground/30 hover:text-foreground transition-colors">Status</Link>
                 <Link href="/docs" className="tech-heading text-[12px] text-foreground/30 hover:text-foreground transition-colors">Docs</Link>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <span className="tech-label">SOCIAL</span>
              <div className="flex flex-col gap-3">
                 <a href="https://x.com/Rohanvrnkr" target="_blank" rel="noopener noreferrer" className="tech-heading text-[12px] text-foreground/30 hover:text-foreground transition-colors">X</a>
                 <a href="https://github.com/rohanvernekarr" target="_blank" rel="noopener noreferrer" className="tech-heading text-[12px] text-foreground/30 hover:text-foreground transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-24 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="tech-label">
            © {new Date().getFullYear()} SCHEDULER_CORE_V1
          </p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="tech-label hover:text-foreground transition-colors">PRIVACY</Link>
            <Link href="/terms-of-service" className="tech-label hover:text-foreground transition-colors">TERMS</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}