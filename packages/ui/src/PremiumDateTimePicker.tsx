"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface PremiumDateTimePickerProps {
  expireDate: string;
  setExpireDate: (date: string) => void;
  expireTime: string;
  setExpireTime: (time: string) => void;
  showTime?: boolean;
}

export function PremiumDateTimePicker({
  expireDate,
  setExpireDate,
  expireTime,
  setExpireTime,
  showTime = true,
}: PremiumDateTimePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
        setShowTimePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLocalDateString = (d: Date) =>
    `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;

  const localToday = getLocalDateString(new Date());

  const generateDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const handleDateSelect = (d: Date) => {
    const ds = getLocalDateString(d);
    setExpireDate(ds);
    if (ds === localToday && expireTime) {
      const now = new Date();
      const cur = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      if (expireTime < cur) setExpireTime(cur);
    }
    setShowDatePicker(false);
    if (showTime && !expireTime) setTimeout(() => setShowTimePicker(true), 100);
  };

  const parseTime = () => {
    const t = expireTime || "09:00";
    const [hStr = "0", mStr = "0"] = t.split(":");
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    const period = h >= 12 ? "PM" : "AM";
    const hr12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return { hr24: h, hr12, min: m, period };
  };

  const setTime = (hr12: number, min: number, period: string) => {
    let hr24 = hr12;
    if (period === "PM" && hr12 < 12) hr24 = hr12 + 12;
    if (period === "AM" && hr12 === 12) hr24 = 0;
    const t = `${hr24.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
    if (!expireDate || expireDate === localToday) {
      const now = new Date();
      const cur = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      if (t < cur) { setExpireTime(cur); return; }
    }
    setExpireTime(t);
  };

  const getDisplayTime = () => {
    if (!expireTime) return null;
    const { hr12, min, period } = parseTime();
    return `${hr12}:${min.toString().padStart(2, "0")} ${period}`;
  };

  const formatDate = (ds: string) => {
    if (!ds) return null;
    const d = new Date(ds + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const { hr12, min, period } = parseTime();

  // ── Shared inline styles ────────────────────────────────────────────────
  const grid4: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "6px",
  };
  const grid7: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "2px",
  };

  //  Cell base styles 
  const cellBase: React.CSSProperties = {
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "all 0.12s",
    width: "100%",
  };
  const cellActive: React.CSSProperties = {
    ...cellBase,
    background: "#a3a2b1ff",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(97, 96, 113, 0.4)",
  };
  const cellIdle: React.CSSProperties = {
    ...cellBase,
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.55)",
  };

  return (
    <div style={{ position: "relative" }}>
      {/* ── Trigger Row ── */}
      <div style={{ display: "flex", gap: "8px" }}>
        {/* Date trigger */}
        <button
          type="button"
          onClick={() => { setShowDatePicker(true); setShowTimePicker(false); }}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: expireDate ? "#fff" : "rgba(255,255,255,0.3)",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 500,
            transition: "all 0.15s",
            minWidth: 0,
          }}
        >
          <CalendarIcon size={14} color="rgba(255,255,255,0.3)" style={{ flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, textAlign: "left" }}>
            {expireDate ? formatDate(expireDate) : "Pick date"}
          </span>
          {expireDate && <Check size={12} color="#818cf8" style={{ flexShrink: 0 }} />}
        </button>

        {/* Time trigger */}
        {showTime && (
          <button
            type="button"
            onClick={() => { setShowTimePicker(true); setShowDatePicker(false); }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 12px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: expireTime ? "#fff" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
              transition: "all 0.15s",
              minWidth: 0,
            }}
          >
            <Clock size={14} color="rgba(255,255,255,0.3)" style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, textAlign: "left" }}>
              {getDisplayTime() ?? "Pick time"}
            </span>
            {expireTime && <Check size={12} color="#818cf8" style={{ flexShrink: 0 }} />}
          </button>
        )}
      </div>

      {/* ── Modal Backdrop ── */}
      <AnimatePresence>
        {(showDatePicker || showTimePicker) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowDatePicker(false); setShowTimePicker(false); }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 9998,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Date Modal ── */}
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            style={{
              position: "fixed",
              top: "30%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              zIndex: 9999,
              width: "380px",
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "16px 20px 20px 20px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "14px" }}>
               <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Date</span>
            </div>

            {/* Month nav */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <button
                type="button"
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                style={{ ...cellBase, width: "30px", height: "30px", background: "rgba(255,255,255,0.06)", color: "#fff" }}
              >
                <ChevronLeft size={14} />
              </button>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>
                {viewDate.toLocaleString("default", { month: "long" })} {viewDate.getFullYear()}
              </span>
              <button
                type="button"
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                style={{ ...cellBase, width: "30px", height: "30px", background: "rgba(255,255,255,0.06)", color: "#fff" }}
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Day headers */}
            <div style={grid7}>
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                <div key={d} style={{ textAlign: "center", fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Days */}
            <div style={{ ...grid7, marginTop: "6px" }}>
              {generateDays().map((d, i) => {
                if (!d) return <div key={i} />;
                const ds = getLocalDateString(d);
                const past = ds < localToday;
                const selected = ds === expireDate;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={past}
                    onClick={() => handleDateSelect(d)}
                    style={{
                      ...cellBase,
                      height: "32px",
                      borderRadius: "8px",
                      fontSize: "11px",
                      ...(selected ? { background: "#a2a2b5ff", color: "#fff" }
                        : past ? { background: "transparent", color: "rgba(255,255,255,0.1)", cursor: "not-allowed" }
                        : { background: "transparent", color: "rgba(255,255,255,0.8)" }),
                    }}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            <button
               type="button"
               onClick={() => setShowDatePicker(false)}
               style={{
                 width: "100%",
                 marginTop: "16px",
                 padding: "10px 0",
                 borderRadius: "10px",
                 background: "rgba(255,255,255,0.05)",
                 color: "rgba(255,255,255,0.5)",
                 fontSize: "11px",
                 fontWeight: 700,
                 border: "none",
                 cursor: "pointer",
                 textTransform: "uppercase",
                 letterSpacing: "0.05em"
               }}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Time Modal ── */}
      <AnimatePresence>
        {showTime && showTimePicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            style={{
              position: "fixed",
              top: "30%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              zIndex: 9999,
              width: "360px",
              background: "#121212",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "16px 20px 20px 20px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "14px" }}>
               <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Time</span>
            </div>

            {/* AM / PM toggle */}
            <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", padding: "4px", borderRadius: "10px", marginBottom: "14px" }}>
              {["AM", "PM"].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTime(hr12, min, p)}
                  style={{
                    flex: 1,
                    padding: "6px 0",
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    ...(period === p
                      ? { background: "#747589ff", color: "#fff" }
                      : { background: "transparent", color: "rgba(255,255,255,0.4)" }),
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Hours */}
            <div style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "6px", textAlign: "left", letterSpacing: "0.05em" }}>Hour</div>
            <div style={{ ...grid4, marginBottom: "12px", gap: "4px" }}>
              {HOURS.map(h => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setTime(h, min, period)}
                  style={{
                    ...hr12 === h ? { ...cellActive, background: "#7e7e90ff" } : cellIdle,
                    height: "30px",
                    fontSize: "11px"
                  }}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Minutes */}
            <div style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "6px", textAlign: "left", letterSpacing: "0.05em" }}>Minute</div>
            <div style={{ ...grid4, marginBottom: "16px", gap: "4px" }}>
              {MINUTES.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTime(hr12, m, period)}
                  style={{
                    ...min === m ? { ...cellActive, background: "#8b8ca4ff" } : cellIdle,
                    height: "30px",
                    fontSize: "11px"
                  }}
                >
                  {m.toString().padStart(2, "0")}
                </button>
              ))}
            </div>

            {/* Done */}
            <button
              type="button"
              onClick={() => setShowTimePicker(false)}
              style={{
                width: "100%",
                padding: "10px 0",
                borderRadius: "10px",
                background: "#696980ff",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.05em"
              }}
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
