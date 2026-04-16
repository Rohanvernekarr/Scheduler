"use client";

import type { ReactNode } from "react";

export function Nav(): ReactNode {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center border-b border-border glass bg-background/50">
      <div className="container flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <span className="tech-heading text-2xl">Scheduler</span>
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
            className="bg-foreground text-background tech-heading text-sm px-6 py-2 rounded-none hover:bg-foreground/90 transition-all"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
