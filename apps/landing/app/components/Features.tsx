import type { ReactNode } from "react";

const FEATURES = [
  {
    num: "01",
    title: "Global Scheduling",
    desc: "Create interviews, syncs, or check-ins in seconds with automated invites.",
  },
  {
    num: "02",
    title: "One-Click Booking",
    desc: "Share your availability link and let others book without back-and-forth emails.",
  },
  {
    num: "03",
    title: "Instant Integration",
    desc: "Everyone gets a professional calendar invite with zero manual configuration.",
  },
  {
    num: "04",
    title: "Real-time Dashboard",
    desc: "Track every upcoming and past meeting in one unified monolithic view.",
  },
];

export function Features(): ReactNode {
  return (
    <section id="features" className="py-24 border-b border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <span className="tech-label mb-4 block">02 / System Capabilities</span>
            <h2 className="tech-heading text-4xl md:text-5xl leading-tight text-foreground">
              A robust architecture <br />for your time.
            </h2>
          </div>
          <p className="text-foreground/40 max-w-xs text-md font-medium">
            Designed for high-density information and zero-friction scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border">
          {FEATURES.map(({ num, title, desc }) => (
            <div
              key={title}
              className="p-10 border-b md:border-b-0 md:border-r border-border hover:bg-foreground/5 transition-all group"
            >
              <p className="tech-label text-foreground/20 mb-10 group-hover:text-foreground transition-colors">
                {num} —
              </p>
              <h3 className="tech-heading text-lg text-foreground mb-4">
                {title}
              </h3>
              <p className="text-sm text-foreground/40 leading-relaxed font-medium">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
