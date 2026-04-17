import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function TermsPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="pt-40 pb-24">
        <div className="container">
          <div className="max-w-3xl">
            <span className="tech-label mb-4 block">Operation Parameters / 02</span>
            <h1 className="tech-heading text-5xl md:text-7xl mb-12">Terms of Service</h1>
            
            <div className="space-y-16">
              <div className="border-l-2 border-border pl-8 py-2">
                <p className="tech-label text-foreground mb-4">Effective: April 2026</p>
                <p className="text-foreground/60 text-lg leading-relaxed">
                  By interfacing with the <b>Scheduler</b> system, you agree to abide by the following operational parameters. Unauthorized bypass of system logic is prohibited.
                </p>
              </div>

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
                <div key={i} className="space-y-4">
                  <h2 className="tech-heading text-2xl text-foreground">
                    {String(i + 1).padStart(2, '0')} // {section.title}
                  </h2>
                  <p className="text-foreground/40 leading-relaxed text-sm md:text-md uppercase font-medium tracking-tight">
                    {section.content}
                  </p>
                </div>
              ))}

              <div className="pt-12 border-t border-border">
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
