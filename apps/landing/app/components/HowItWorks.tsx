import type { ReactNode } from "react";

const STEPS = [
  {
    num: "01",
    title: "INITIATE",
    desc: "Pick a type, add participants, and set your agenda in seconds.",
  },
  {
    num: "02",
    title: "DISTRIBUTE",
    desc: "Share your availability link. No login, no friction - just booking.",
  },
  {
    num: "03",
    title: "SYNC",
    desc: "Automated invites fly out to everyone instantly. Zero ping-pong.",
  },
  {
    num: "04",
    title: "TRACK",
    desc: "Your monolithic dashboard keeps everything in one unified view.",
  },
];


export function HowItWorks(): ReactNode {
  return (
    <section id="how" className="py-24 bg-foreground/[0.02]">
      <div className="container">
        <div className="max-w-xl mb-24">
          <span className="tech-label mb-4 block">03 / Operation Manual</span>
          <h2 className="tech-heading text-4xl md:text-5xl leading-tight">
            The systematic <br />flow of scheduling.
          </h2>
        </div>

        <div className="flex flex-col gap-px bg-border border border-border">
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="bg-background flex flex-col md:flex-row items-center group transition-colors hover:bg-foreground/[0.1]">
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border min-w-[120px] flex justify-center">
                 <span className="tech-heading text-3xl text-white opacity-60 group-hover:text-foreground transition-colors">{num}</span>
              </div>
              <div className="flex-1 p-8 md:p-12">
                 <h3 className="tech-heading text-2xl mb-2">{title}</h3>
                 <p className="text-foreground/40 font-medium max-w-lg">{desc}</p>
              </div>
              <div className="p-8 md:p-12 text-white opacity-60 hidden lg:block">
                 <span className="tech-heading">ACTIVE_PROTOCOL</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-10 bg-foreground text-background p-10">
          <div>
            <h3 className="tech-heading text-3xl mb-2">Ready to deploy?</h3>
            <p className="font-bold opacity-60">No setup fees. No friction. Start now.</p>
          </div>
          <a href="/schedule" className="bg-background text-foreground tech-heading px-10 py-5 border border-background hover:bg-background/90 transition-all text-center w-full sm:w-auto">
            Get Your Link →
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer(): ReactNode {
  return (
    <footer className="border-t border-border py-20">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between gap-20">
          <div className="max-w-xs">
            <span className="tech-heading text-3xl mb-6 block">Scheduler</span>
            <p className="tech-label text-foreground/30 leading-relaxed uppercase">
              A systematic approach to meeting booking. Built for clarity and speed. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 xl:gap-24">
            {["SYSTEM", "NETWORK", "SOCIAL"].map(group => (
              <div key={group} className="flex flex-col gap-6">
                <span className="tech-label">{group}</span>
                <div className="flex flex-col gap-3">
                   {["Status", "Docs", "Twitter", "GitHub"].map((item, i) => (
                     <a key={i} href="#" className="tech-heading text-[12px] text-foreground/30 hover:text-foreground transition-colors">{item}</a>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="tech-label">
            © {new Date().getFullYear()} — SCHEDULER_CORE_V1
          </p>
          <div className="flex gap-8">
            {["PRIVACY", "TERMS"].map(l => (
              <a key={l} href="#" className="tech-label hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
