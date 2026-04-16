import type { ReactNode } from "react";
import { CalendarDemo } from "./CalendarDemo";

export function Hero(): ReactNode {
  return (
    <section className="pt-32 pb-24 border-b border-border">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
          <div className="flex-1 max-w-2xl">
            <span className="tech-label mb-6 block">01 / Modern Scheduling</span>

            <h1 className="tech-heading text-6xl md:text-7xl lg:text-8xl leading-none mb-10 text-foreground">
              Meetings.<br />
              <span className="text-foreground/20">Simplified.</span>
            </h1>

            <p className="text-lg text-foreground/50 leading-relaxed mb-12 max-w-xl font-medium">
              Schedule interviews, syncs, and check-ins in seconds. 
              Share your link and let people pick their own time. 
              Monolithic speed for modern workflows.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a href="/schedule" className="bg-foreground text-background tech-heading text-lg px-10 py-5 hover:bg-foreground/90 transition-all border border-foreground">
                Get Your Link →
              </a>
              <a href="#how" className="tech-label px-6 py-5 hover:text-foreground transition-all border border-border">
                Learn More
              </a>
            </div>

            <div className="mt-20 pt-10 border-t border-border flex items-center gap-12">
               <div>
                 <p className="tech-label mb-1">Total Meetings</p>
                 <p className="tech-heading text-2xl">2.4k+</p>
               </div>
               <div>
                 <p className="tech-label mb-1">Status</p>
                 <p className="tech-heading text-2xl text-green-500">Live</p>
               </div>
            </div>
          </div>

          <div className="hidden lg:block w-full max-w-md relative group">
            <div className="absolute -inset-4 bg-foreground/5 -z-10 group-hover:bg-foreground/10 transition-colors" />
            <div className="glass p-2">
               <CalendarDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
