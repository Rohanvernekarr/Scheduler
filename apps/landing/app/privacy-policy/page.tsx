import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function PrivacyPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="pt-40 pb-24 relative overflow-hidden">
        {/* Giant Background Text */}
        <div className="absolute top-[-90] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.01]">
          <span className="text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap">
            Privacy
          </span>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="tech-label mb-4 block">System Protocol / 01</span>
              <h1 className="tech-heading text-3xl md:text-6xl mb-6">Privacy Policy</h1>
            </div>
            
            <div className="space-y-16">
              <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-lg text-center">
                <p className="tech-label text-accent mb-4">Last Updated: April 2026</p>
                <p className="text-foreground/60 text-lg md:text-xl leading-relaxed">
                  Your data integrity is a core system requirement. This protocol outlines how <b>Scheduler</b> handles information processing across our network.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {[
                  {
                    title: "Data Acquisition",
                    content: "We collect only the essential metadata required for scheduling: email addresses, calendar availability, and meeting parameters. No unnecessary telemetry is stored."
                  },
                  {
                    title: "Logic Processing",
                    content: "Your data is used exclusively to facilitate automated booking. We do not sell your information to third-party entities. Our algorithms are designed for efficiency, not surveillance."
                  },
                  {
                    title: "Security Architecture",
                    content: "Encryption is applied at rest and in transit. Access to production databases is strictly monitored and gated through multi-layered authentication protocols."
                  },
                  {
                    title: "User Control",
                    content: "Users maintain full read/write/delete permissions over their data. Account termination results in a complete system wipe of your specific data identifiers within 30 solar days."
                  }
                ].map((section, i) => (
                  <div key={i} className="space-y-4 text-center md:text-left md:flex md:gap-12 md:items-start group">
                    <h2 className="tech-heading text-4xl text-white/10 group-hover:text-accent/20 transition-colors shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </h2>
                    <div className="space-y-2">
                      <h3 className="tech-label text-white text-sm tracking-widest">{section.title}</h3>
                      <p className="text-foreground/40 leading-relaxed text-sm md:text-base uppercase font-medium tracking-tight">
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-white/5 text-center">
                <p className="tech-label">End of Document</p>
                <p className="text-foreground/20 text-[10px] mt-4 tracking-[0.2em]">
                  ENCRYPTED_TRANSMISSION_SECURED
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
