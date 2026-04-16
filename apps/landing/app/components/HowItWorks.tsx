import type { ReactNode } from "react";

const STEPS = [
  {
    num: "01",
    title: "You schedule a meeting",
    desc: "Pick a type - interview, sync, check-in. Add the participants, time, and agenda. Hit send. Done.",
  },
  {
    num: "02",
    title: "Or share your availability",
    desc: "Set your open hours. Share your personal booking link. Let people pick a time that works for them.",
  },
  {
    num: "03",
    title: "Invites go out instantly",
    desc: "Everyone gets a professional email with the meeting link, date, time, and agenda. No manual follow-up.",
  },
  {
    num: "04",
    title: "Track it all in one place",
    desc: "Your dashboard shows every meeting - upcoming, past, who's attending. Always know what's next.",
  },
];


export function HowItWorks(): ReactNode {
  return (
    <section id="how" style={{
      padding: "100px 0",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div className="container">
        <p style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
          marginBottom: "64px",
        }}>
          How it works
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "48px 40px",
        }}>
          {STEPS.map(({ num, title, desc }) => (
            <div key={num}>
              <p style={{
                fontSize: "48px", fontWeight: 900, color: "#353535ac",
                letterSpacing: "-0.05em", lineHeight: 1, marginBottom: "16px",
              }}>
                {num}
              </p>
              <h3 style={{
                fontSize: "18px", fontWeight: 800, color: "#f4f4f5",
                letterSpacing: "-0.025em", marginBottom: "10px",
              }}>
                {title}
              </h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.36)", lineHeight: 1.7 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "80px", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <a href="/schedule" style={{
            background: "#f4f4f5", color: "#0a0a0a",
            fontWeight: 800, fontSize: "14px",
            padding: "13px 30px", borderRadius: "11px",
          }}>
            Get your free link →
          </a>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)" }}>
            No credit card. No setup fee. Yours in 60 seconds.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer(): ReactNode {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "36px 0",
    }}>
      <div className="container" style={{
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "22px", height: "22px", background: "#f4f4f5", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900, color: "#0a0a0a" }}>S</span>
          <span style={{ fontWeight: 800, fontSize: "23px", letterSpacing: "-0.02em" }}>Scheduler</span>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.22)" }}>
          © {new Date().getFullYear()} Scheduler - made for people who hate email ping-pong.
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", transition: "color .15s" }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
