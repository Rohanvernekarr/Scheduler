import type { ReactNode } from "react";

const FEATURES = [
  {
    title: "Schedule any meeting",
    desc: "Create interviews, syncs, check-ins, or workshops in seconds. Add participants, a meeting link, and agenda - invites fly out automatically.",
  },
  {
    title: "Let people book your time",
    desc: "Share your availability link. Visitors pick a slot from your open hours. No login, no friction - just a time picked and confirmed.",
  },
  {
    title: "Instant email confirmations",
    desc: "The moment a meeting is booked, everyone gets a professional email with the date, time, meeting link, and agenda attached.",
  },
  {
    title: "Full dashboard overview",
    desc: "See every upcoming meeting in one place - who's attending, what type it is, when it starts. Know your day at a glance.",
  },
];

export function Features(): ReactNode {
  return (
    <section id="features" style={{
      padding: "100px 0",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div className="container">
        <p style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
          marginBottom: "16px",
        }}>
          What you get
        </p>

        <h2 style={{
          fontSize: "clamp(28px, 5vw, 44px)",
          fontWeight: 900, letterSpacing: "-0.035em",
          color: "#f4f4f5", lineHeight: 1.1,
          marginBottom: "64px",
          maxWidth: "500px",
        }}>
          Two ways to run your schedule.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
          gap: "0",
        }}>
          {FEATURES.map(({ title, desc }, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={title}
                style={{
                  padding: "40px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderRight: isLeft ? "1px solid rgba(255,255,255,0.06)" : "none",
                  paddingRight: isLeft ? "56px" : "0",
                  paddingLeft: !isLeft ? "56px" : "0",
                }}
              >
                <h3 style={{
                  fontSize: "20px", fontWeight: 800, color: "#f4f4f5",
                  letterSpacing: "-0.025em", marginBottom: "12px", lineHeight: 1.2,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize: "14px", color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.75, maxWidth: "380px",
                }}>
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
