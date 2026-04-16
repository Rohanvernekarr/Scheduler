"use client";

import type { ReactNode } from "react";

export function Nav(): ReactNode {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center border-b border-border glass bg-background/50">
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <span className="text-3xl font-black uppercase tracking-tight text-foreground transition-opacity hover:opacity-70">Scheduler</span>
        </a>

        <div className="hidden md:flex items-center gap-4">
          <a href="#features" className="tech-label hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how" className="tech-label hover:text-foreground transition-colors">
            How it works
          </a>
          <div className="w-px h-4 bg-border mx-2" />
          <a
            href="/schedule"
            className="bg-foreground text-background px-4 sm:px-6 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-foreground/10"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
