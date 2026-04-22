import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function DocsPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <section className="pt-40 pb-24 flex-1 relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute top-[-90px] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.01]">
          <span className="text-[20vw] sm:text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap">
            Docs
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center mb-16 text-center">
              <span className="tech-label mb-4 block">System Logistics / 05</span>
              <h1 className="tech-heading text-3xl md:text-6xl mb-6">Documentation</h1>
              <p className="text-subtle text-lg max-w-2xl leading-relaxed">
                Integrate Scheduler into your own system architecture. Establish programmatic booking links and listen to realtime webhooks.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              {/* Sidebar Navigation - Responsive */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="lg:sticky lg:top-32 flex flex-row lg:flex-col gap-8 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide border-b lg:border-0 border-white/5 px-2 lg:px-0">
                  <div className="flex flex-col gap-3 min-w-fit">
                    <span className="tech-label text-foreground/40 text-[9px]">GETTING STARTED</span>
                    <a href="#quickstart" className="text-xs font-bold hover:text-accent transition-colors">Quickstart</a>
                    <a href="#authentication" className="text-xs font-bold text-foreground/40 hover:text-accent transition-colors">Authentication</a>
                  </div>
                  <div className="flex flex-col gap-3 min-w-fit">
                    <span className="tech-label text-foreground/40 text-[9px]">CORE CONCEPTS</span>
                    <a href="#events" className="text-xs font-bold text-foreground/40 hover:text-accent transition-colors">Event Types</a>
                    <a href="#webhooks" className="text-xs font-bold text-foreground/40 hover:text-accent transition-colors">Webhooks</a>
                    <a href="#endpoints" className="text-xs font-bold text-foreground/40 hover:text-accent transition-colors">API Endpoints</a>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 space-y-24">
                <div id="quickstart" className="space-y-6 scroll-mt-40">
                  <h2 className="tech-heading text-2xl border-l-2 border-accent pl-6 py-1">Quickstart Integration</h2>
                  <p className="text-subtle text-sm md:text-base leading-relaxed">
                    The simplest way to embed Scheduler is via our high-performance Drop-in SDK. It handles all authentication and synchronization automatically.
                  </p>
                  <div className="tech-border rounded-lg p-5 mt-4 overflow-hidden">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                      <span className="tech-label text-[9px]">HTML / EMBED</span>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                      </div>
                    </div>
                    <pre className="text-[11px] font-mono text-foreground/80 overflow-x-auto whitespace-pre-wrap break-all md:whitespace-pre md:break-normal">
                      <code>
{`<script src="https://scheduler.dev/sdk.js"></script>

<div
  data-scheduler-target="pro-schedule"
  data-theme="monochrome"
></div>`}
                      </code>
                    </pre>
                  </div>
                </div>
                
                <div id="endpoints" className="space-y-6 scroll-mt-40">
                  <h2 className="tech-heading text-2xl border-l-2 border-accent pl-6 py-1">REST Endpoints</h2>
                  <p className="text-subtle text-sm md:text-base leading-relaxed">
                    Create and manage meetings directly through our raw REST infrastructure. Provide your standard Bearer Token in the headers.
                  </p>
                  
                  <div className="tech-border rounded-lg mt-4 divide-y divide-white/5 overflow-hidden">
                    <div className="p-4 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                       <div className="flex items-center gap-4">
                         <span className="text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-widest bg-white/10 text-white">GET</span>
                         <code className="text-xs font-mono text-subtle">/v1/schedules/availability</code>
                       </div>
                       <span className="tech-label text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                    </div>
                    <div className="p-4 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                       <div className="flex items-center gap-4">
                         <span className="text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-widest bg-accent text-white">POST</span>
                         <code className="text-xs font-mono text-subtle">/v1/bookings/create</code>
                       </div>
                       <span className="tech-label text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
