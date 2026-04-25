import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function TermsPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="pt-40 pb-24 relative overflow-hidden">
        {/*Background Text */}
        <div className="absolute top-[-90px] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.01]">
          <span className="text-[20vw] sm:text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap">
            Terms
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="tech-label mb-4 block">Operation Parameters / 02</span>
              <h1 className="tech-heading text-3xl md:text-6xl mb-6">Terms of Service</h1>
            </div>
            
            <div className="space-y-16">
              <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-lg text-center">
                <p className="tech-label text-accent mb-4">Effective: April 2026</p>
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                  By interfacing with the <b>Scheduler</b> system, you agree to abide by the following operational parameters. Unauthorized bypass of system logic is prohibited.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {[
                  {
                    title: "Access Authorization",
                    content: "Access to the scheduling engine is granted via authenticated tokens. Users are responsible for maintaining the security of their access credentials."
                  },
                  {
                    title: "Usage Constraints",
                    content: "The system must not be used for spamming, DDoS attacks, or the automated creation of ghost profiles. We monitor for anomalous request patterns."
                  },
                  {
                    title: "Platform Runtime",
                    content: "We provide the system 'as is'. While we aim for 99.9% uptime, we do not guarantee uninterrupted execution during critical system maintenance cycles."
                  },
                  {
                    title: "Liability Limitation",
                    content: "Scheduler is not responsible for missed meetings, temporal conflicts, or errors in human judgment resulting from schedule synchronization."
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
                <p className="tech-label">Operational Baseline Established</p>
                <p className="text-foreground/20 text-[10px] mt-4 tracking-[0.2em]">
                  SYSTEM_STATUS: OPERATIONAL
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
