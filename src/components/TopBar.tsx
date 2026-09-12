import { useState, useEffect } from "react";
import { Bell, User, ChevronDown, Wifi } from "lucide-react";
import { NOTIFICATIONS } from "@/data/mockData";
import type { Screen } from "./Sidebar";

const SCREEN_LABELS: Record<Screen, string> = {
  command:    "Command Center",
  forecast:   "72H Forecast",
  coupling:   "Coupling Engine",
  map:        "Pollution Map",
  plume:      "Plume Tracker",
  inversion:  "Inversion Monitor",
  hotspots:   "Hotspot Prediction",
  alerts:     "Early Warning Center",
  validation: "Model Validation",
};

interface Props {
  screen: Screen;
  onBellClick: () => void;
}

export default function TopBar({ screen, onBellClick }: Props) {
  const [time, setTime] = useState(() => new Date());
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (d: Date) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-4 border-b"
      style={{ background: "#060d1c", borderColor: "rgba(56,189,248,0.1)" }}>

      {/* Left: location + screen */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-sky-400">
          <span className="text-xs font-semibold tracking-wide">Delhi NCR</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </div>
        <span className="text-slate-700 text-xs">›</span>
        <span className="text-xs text-slate-400">{SCREEN_LABELS[screen]}</span>
      </div>

      {/* Center: time + demo badge */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          <span className="text-slate-500">{fmtDate(time)}</span>
          <span className="text-sky-400">{fmt(time)} IST</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border animate-blink-alert"
          style={{
            background: "rgba(234,179,8,0.08)",
            borderColor: "rgba(234,179,8,0.3)",
          }}>
          <Wifi className="w-3 h-3 text-yellow-400" />
          <span className="text-[10px] font-semibold tracking-wider text-yellow-400"
            style={{ fontFamily: "JetBrains Mono, monospace" }}>
            DEMO MODE
          </span>
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-2">
        <button
          onClick={onBellClick}
          className="relative w-8 h-8 flex items-center justify-center rounded hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-200"
        >
          <Bell className="w-4 h-4" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-[8px] text-white flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors">
          <div className="w-6 h-6 rounded-full bg-sky-800/60 border border-sky-700/50 flex items-center justify-center">
            <User className="w-3 h-3 text-sky-400" />
          </div>
          <span className="text-xs text-slate-400">Gov. User</span>
        </button>
      </div>
    </header>
  );
}
