import { X, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { NOTIFICATIONS } from "@/data/mockData";

const ICONS = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};
const COLORS = {
  critical: "#ef4444",
  warning:  "#f97316",
  info:     "#38bdf8",
};

interface Props {
  onClose: () => void;
}

export default function NotificationPanel({ onClose }: Props) {
  return (
    <div className="absolute top-12 right-0 w-80 z-50 shadow-2xl border rounded-b animate-slide-in"
      style={{ background: "#080f1e", borderColor: "rgba(56,189,248,0.18)" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "rgba(56,189,248,0.1)" }}>
        <span className="text-xs font-semibold text-slate-200 tracking-wide">SYSTEM ALERTS</span>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-200 transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="divide-y" style={{ borderColor: "rgba(56,189,248,0.06)" }}>
        {NOTIFICATIONS.map((n) => {
          const Icon = ICONS[n.severity];
          const color = COLORS[n.severity];
          return (
            <div key={n.id} className="px-4 py-3 flex gap-3"
              style={{ background: n.read ? "transparent" : "rgba(56,189,248,0.03)" }}>
              <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-xs font-medium text-slate-200 truncate">{n.title}</span>
                  <span className="text-[10px] text-slate-600 shrink-0 font-mono">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{n.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2.5 border-t" style={{ borderColor: "rgba(56,189,248,0.1)" }}>
        <button className="text-[11px] text-sky-400 hover:text-sky-300 transition-colors">
          View all notifications →
        </button>
      </div>
    </div>
  );
}
