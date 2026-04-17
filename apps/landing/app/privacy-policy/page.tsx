import type { ReactNode } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function PrivacyPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="pt-40 pb-24">
        <div className="container">
          <div className="max-w-3xl">
            <span className="tech-label mb-4 block">System Protocol / 01</span>
            <h1 className="tech-heading text-5xl md:text-7xl mb-12">Privacy Policy</h1>
            
            <div className="space-y-16">
              <div className="border-l-2 border-border pl-8 py-2">
                <p className="tech-label text-foreground mb-4">Last Updated: April 2026</p>
                <p className="text-foreground/60 text-lg leading-relaxed">
                  Your data integrity is a core system requirement. This protocol outlines how <b>Scheduler</b> handles information processing across our network.
                </p>
              </div>

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
