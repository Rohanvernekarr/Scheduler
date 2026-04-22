import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function StatusPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <section className="pt-40 pb-24 flex-1 relative overflow-hidden">
        {/* Giant Background Text */}
        <div className="absolute top-[-90] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.02]">
          <span className="text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap">
            Status
          </span>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-16 text-center">
              <span className="tech-label mb-4 block">System Logistics / 04</span>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <h1 className="tech-heading text-3xl md:text-6xl">System Status</h1>
                <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="tech-label text-[10px] text-green-500">All Systems Operational</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {[
                { name: "Global Booking API", uptime: "99.99%", status: "Operational", desc: "Core scheduling engine and slot management" },
                { name: "Database Clusters", uptime: "100.0%", status: "Operational", desc: "Neon PostgreSQL primary and replica nodes" },
                { name: "Email Delivery", uptime: "99.98%", status: "Operational", desc: "Resend infrastructure for notifications" },
                { name: "Client Dashboard", uptime: "100.0%", status: "Operational", desc: "Web interface and user settings access" }
              ].map((service) => (
                <div key={service.name} className="tech-border p-8 rounded-lg group hover:border-accent/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="tech-heading text-xl">{service.name}</span>
                    <span className="tech-label text-green-500 text-[10px] bg-green-500/5 px-2 py-1 rounded">{service.status}</span>
                  </div>
                  <p className="text-subtle text-xs mb-6 line-clamp-1">{service.desc}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="tech-label text-[9px]">Uptime: {service.uptime}</span>
                    <div className="flex gap-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className={`w-1 h-3 rounded-full ${i === 11 ? 'bg-green-500' : 'bg-green-500/40'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 text-center">
              <h2 className="tech-heading text-2xl border-b border-border pb-4 inline-block">Incident Log</h2>
              <div className="text-foreground/50 text-sm font-medium max-w-lg mx-auto">
                No active incidents reported in the last 30 days. System performance is nominal across all monitored zones.
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
