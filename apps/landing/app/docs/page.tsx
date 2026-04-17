import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function DocsPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <section className="pt-40 pb-24 flex-1">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-32 flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span className="tech-label text-foreground/40">GETTING STARTED</span>
                  <a href="#quickstart" className="text-sm font-bold hover:text-foreground/70 transition-colors">Quickstart</a>
                  <a href="#authentication" className="text-sm font-bold text-foreground/40 hover:text-foreground/70 transition-colors">Authentication</a>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="tech-label text-foreground/40">CORE CONCEPTS</span>
                  <a href="#events" className="text-sm font-bold text-foreground/40 hover:text-foreground/70 transition-colors">Event Types</a>
                  <a href="#webhooks" className="text-sm font-bold text-foreground/40 hover:text-foreground/70 transition-colors">Webhooks</a>
                  <a href="#endpoints" className="text-sm font-bold text-foreground/40 hover:text-foreground/70 transition-colors">API Endpoints</a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="max-w-3xl flex-1">
              <span className="tech-label mb-4 block">System Logistics / 05</span>
              <h1 className="tech-heading text-5xl md:text-6xl mb-8">Documentation</h1>
              <p className="text-foreground/60 text-lg leading-relaxed mb-16">
                Integrate Scheduler into your own system architecture. Establish programmatic booking links, query upcoming meetings, and listen to realtime scheduling webhooks.
              </p>

              <div id="quickstart" className="space-y-6 pt-12 border-t border-border">
                <h2 className="tech-heading text-3xl">Quickstart Integration</h2>
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                  The simplest way to embed Scheduler is via our high-performance Drop-in iframe. It handles all authentication, time zone arithmetic, and synchronization automatically.
                </p>
                <div className="bg-foreground/5 border border-border rounded-lg p-5 mt-4 overflow-x-auto">
                  <pre className="text-xs font-mono text-foreground/80">
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
              
              <div id="endpoints" className="space-y-6 pt-16">
                <h2 className="tech-heading text-3xl">REST Endpoints</h2>
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                  Create and manage meetings directly through our raw REST infrastructure. Provide your standard Bearer Token in the headers of any outgoing POST requests.
                </p>
                
                <div className="border border-border rounded-lg mt-4 divide-y divide-border overflow-hidden">
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-background">
                     <span className="bg-foreground text-background text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest self-start">GET</span>
                     <code className="text-sm font-mono text-foreground/70">/v1/schedules/availability</code>
                  </div>
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 bg-background">
                     <span className="bg-foreground text-background text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest self-start">POST</span>
                     <code className="text-sm font-mono text-foreground/70">/v1/bookings/create</code>
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
