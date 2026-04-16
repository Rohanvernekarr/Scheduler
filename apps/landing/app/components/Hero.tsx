import type { ReactNode } from "react";
import { CalendarDemo } from "./CalendarDemo";

export function Hero(): ReactNode {
  return (
    <section style={{ paddingTop: "130px", paddingBottom: "100px" }}>
      <div className="container">
        <p style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
          marginBottom: "28px",
        }}>
          Modern scheduling
        </p>

        <div style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "60px",
        }}>
          <div style={{ flex: "1 1 380px", maxWidth: "520px" }}>
            <h1 style={{
              fontSize: "clamp(38px, 6.5vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              color: "#f4f4f5",
              marginBottom: "24px",
            }}>
              Book meetings<br />
              <span style={{ color: "rgba(255,255,255,0.28)" }}>without the chaos.</span>
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.75,
              marginBottom: "40px",
              maxWidth: "440px",
            }}>
              Schedule interviews, syncs, and check-ins in seconds.
              Or share your availability link - let people pick their own time.
              Either way, everyone gets instant email invites.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <a href="/schedule" style={{
                background: "#f4f4f5", color: "#0a0a0a",
                fontWeight: 800, fontSize: "14px",
                padding: "13px 30px", borderRadius: "11px",
                letterSpacing: "-0.01em",
              }}>
                Start scheduling
              </a>
              <a href="#how" style={{
                color: "rgba(255,255,255,0.4)", fontSize: "14px",
                fontWeight: 600, padding: "13px 4px",
              }}>
                See how it works
              </a>
            </div>

            <p style={{
              marginTop: "40px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.22)",
            }}>
              2,400+ meetings scheduled this month · zero spam
            </p>
          </div>

          <div style={{ flex: "1 1 340px", maxWidth: "400px" }}>
            <p style={{
              fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.22)",
              textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: "20px",
            }}>
              Live preview - try it
            </p>
            <CalendarDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
