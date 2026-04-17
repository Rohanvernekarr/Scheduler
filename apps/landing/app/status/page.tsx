import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function StatusPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <section className="pt-40 pb-24 flex-1">
        <div className="container">
          <div className="max-w-4xl">
            <span className="tech-label mb-4 block">System Logistics / 04</span>
            <div className="flex items-center gap-4 mb-12">
              <h1 className="tech-heading text-5xl md:text-7xl">System Status</h1>
              <div className="flex items-center gap-2 bg-foreground/5 px-3 py-1 rounded-sm border border-foreground/10 self-start mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="tech-label text-xs">All Systems Operational</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-16">
              {[
                { name: "Global Booking API", uptime: "99.99%", status: "Operational" },
                { name: "Database Clusters", uptime: "100.0%", status: "Operational" },
                { name: "Email Delivery Services", uptime: "99.98%", status: "Operational" },
                { name: "Client Dashboard UI", uptime: "100.0%", status: "Operational" }
              ].map((service) => (
                <div key={service.name} className="bg-background p-8 flex flex-col justify-between hover:bg-foreground/5 transition-colors">
                  <span className="tech-heading text-lg mb-6">{service.name}</span>
                  <div className="flex justify-between items-center">
                    <span className="tech-label text-foreground/40 text-xs">Uptime: {service.uptime}</span>
                    <span className="tech-label text-green-500">{service.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="tech-heading text-2xl border-b border-border pb-4">Incident Log</h2>
              <div className="text-foreground/50 text-sm font-medium">
                No active incidents reported in the last 30 days. System performance is nominal.
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
