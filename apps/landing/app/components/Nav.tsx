"use client";

import type { ReactNode } from "react";

export function Nav(): ReactNode {
  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      height: "68px",
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(10,10,10,0.80)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <span style={{
            width: "26px", height: "26px",
            background: "#f4f4f5", borderRadius: "7px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 900, color: "#0a0a0a",
          }}>S</span>
          <span style={{ fontWeight: 800, fontSize: "25px", letterSpacing: "-0.02em" }}>Scheduler</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <a href="#features" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", padding: "7px 12px", borderRadius: "8px", transition: "color .15s" }}>
            Features
          </a>
          <a href="#how" style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", padding: "7px 12px", borderRadius: "8px", transition: "color .15s" }}>
            How it works
          </a>
          <a
            href="/schedule"
            style={{
              marginLeft: "8px",
              background: "#f4f4f5",
              color: "#0a0a0a",
              fontWeight: 700,
              fontSize: "13px",
              padding: "7px 18px",
              borderRadius: "9px",
            }}
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
