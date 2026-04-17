import type { ReactNode } from "react";
import Link from "next/link";


export function Footer(): ReactNode {
  return (
    <footer className="border-t border-border py-20">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between gap-20">
          <div className="max-w-xs">
            <span className="tech-heading text-3xl mb-6 block">Scheduler</span>
            <p className="tech-label text-foreground/30 leading-relaxed uppercase">
              A systematic approach to meeting booking. Built for clarity and speed. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 xl:gap-24">
            {["SYSTEM", "NETWORK", "SOCIAL"].map(group => (
              <div key={group} className="flex flex-col gap-6">
                <span className="tech-label">{group}</span>
                <div className="flex flex-col gap-3">
                   {["Status", "Docs", "Twitter", "GitHub"].map((item, i) => (
                     <a key={i} href="#" className="tech-heading text-[12px] text-foreground/30 hover:text-foreground transition-colors">{item}</a>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="tech-label">
            © {new Date().getFullYear()} SCHEDULER_CORE_V1
          </p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="tech-label hover:text-foreground transition-colors">PRIVACY</Link>
            <Link href="/terms-of-service" className="tech-label hover:text-foreground transition-colors">TERMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}