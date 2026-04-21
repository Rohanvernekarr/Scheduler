"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-24 bg-background border-t border-border relative overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute bottom-[-10%] left-0 select-none pointer-events-none z-0">
        <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap">
          Scheduler
        </span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <Link href="/" className="font-mono text-sm font-bold tracking-tighter uppercase mb-6 block">
              Scheduler<span className="text-accent">_Core</span>
            </Link>
            <p className="text-subtle text-sm max-w-sm mb-8 leading-relaxed">
              The technical standard for meeting coordination. 
              Built for precision, speed, and zero friction.
            </p>
          </div>

          <div>
            <span className="tech-label mb-6 block">Platform</span>
            <ul className="space-y-4 text-sm text-subtle">
              <li><Link href="/status" className="hover:text-white">System Status</Link></li>
              <li><Link href="/docs" className="hover:text-white">API Docs</Link></li>
              <li><Link href="/api" className="hover:text-white">Integration</Link></li>
            </ul>
          </div>

          <div>
            <span className="tech-label mb-6 block">Compliance</span>
            <ul className="space-y-4 text-sm text-subtle">
              <li><Link href="/privacy" className="hover:text-white">Privacy Protocol</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
              <li><Link href="/security" className="hover:text-white">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-border">
          <span className="tech-label text-[9px]">© 2026 Scheduler Core V1.0.4. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="tech-label text-[9px]">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
