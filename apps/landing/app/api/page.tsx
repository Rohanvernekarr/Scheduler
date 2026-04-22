import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Calendar, Video, Webhook, Zap, Shield, Cpu } from "lucide-react";

export default function IntegrationPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      <section className="pt-40 pb-24 flex-1 relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute top-[-90px] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.01]">
          <span className="text-[20vw] sm:text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap">
            Connect
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-16 text-center">
              <span className="tech-label mb-4 block">System Interconnect / 03</span>
              <h1 className="tech-heading text-3xl md:text-6xl mb-6">Integrations</h1>
              <p className="text-subtle text-lg max-w-2xl leading-relaxed">
                Connect Scheduler with your existing ecosystem. We provide deep, low-latency synchronization with the tools you use every day.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {[
                { 
                  name: "Calendar Sync", 
                  icon: <Calendar className="w-5 h-5" />, 
                  desc: "Real-time bidirectional sync with Google Calendar, Outlook, and iCloud.",
                  features: ["Conflict Detection", "Multi-calendar Support"]
                },
                { 
                  name: "Video Infrastructure", 
                  icon: <Video className="w-5 h-5" />, 
                  desc: "Automated meeting link generation for Zoom, Meet, and Teams.",
                  features: ["Auto-join Links", "Recording Integration"]
                },
                { 
                  name: "Automation Hub", 
                  icon: <Zap className="w-5 h-5" />, 
                  desc: "Connect your scheduling events to 5,000+ apps via Zapier and Make.",
                  features: ["No-code Workflows", "Custom Triggers"]
                },
                { 
                  name: "Developer API", 
                  icon: <Cpu className="w-5 h-5" />, 
                  desc: "Full REST access to schedules, bookings, and user metadata.",
                  features: ["Bearer Authentication", "Rate-limited Edge"]
                },
                { 
                  name: "Webhook Engine", 
                  icon: <Webhook className="w-5 h-5" />, 
                  desc: "Receive real-time payloads for booking events directly to your server.",
                  features: ["Retrying Logic", "Secure Payloads"]
                },
                { 
                  name: "Security Protocols", 
                  icon: <Shield className="w-5 h-5" />, 
                  desc: "Enterprise-grade OAuth 2.0 and SAML SSO for secure system access.",
                  features: ["Identity Management", "Audit Logs"]
                }
              ].map((item) => (
                <div key={item.name} className="tech-border p-8 rounded-lg group hover:border-accent/50 transition-all duration-300 bg-white/[0.01]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-accent/10 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="tech-heading text-xl">{item.name}</span>
                  </div>
                  <p className="text-subtle text-sm mb-8 leading-relaxed">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.features.map(f => (
                      <span key={f} className="tech-label text-[8px] bg-white/5 px-2 py-1 rounded border border-white/5">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-8 md:p-12 text-center">
              <h2 className="tech-heading text-2xl mb-4">Build Custom Solutions</h2>
              <p className="text-subtle text-sm mb-8 max-w-lg mx-auto leading-relaxed">
                Need a specific integration or custom enterprise workflow? Our core architecture is built for extensibility.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/docs" className="tech-label bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/80 transition-colors">
                  Read API Docs
                </a>
                <a href="mailto:support@scheduler.core" className="tech-label border border-white/10 px-8 py-3 rounded-full hover:bg-white/5 transition-colors">
                  Contact Protocol
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
