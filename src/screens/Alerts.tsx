import { useState } from "react";
import { AlertTriangle, AlertCircle, CheckCircle, Clock, Download, Share2, Eye } from "lucide-react";
import { NOTIFICATIONS } from "@/data/mockData";

type AlertSeverity = "critical" | "warning" | "info";

const ALERTS = [
  {
    id: 1, severity: "critical" as AlertSeverity,
    title: "SEVERE POLLUTION EVENT PREDICTED",
    area: "East Delhi + Ghaziabad + Noida",
    window: "01 Sep 2026 · 05:00–11:00 IST",
    aqi: "410–450 (SEVERE)",
    confidence: 87,
    status: "PRE-ALERT" as const,
    drivers: ["Strong temperature inversion", "Low PBL height (310m)", "Weak winds (<2 m/s)", "Regional PM2.5 transport"],
    issued: "20:30 IST",
    acknowledged: false,
  },
  {
    id: 2, severity: "warning" as AlertSeverity,
    title: "INVERSION INTENSIFICATION EXPECTED",
    area: "Delhi NCR region-wide",
    window: "31 Aug–01 Sep · 22:00–08:00 IST",
    aqi: "DETERIORATING",
    confidence: 82,
    status: "MONITORING" as const,
    drivers: ["PBL descent to 310m", "Surface cooling", "High humidity (82%)"],
    issued: "19:00 IST",
    acknowledged: true,
  },
  {
    id: 3, severity: "warning" as AlertSeverity,
    title: "REGIONAL PLUME APPROACHING",
    area: "Punjab/Haryana → Delhi NCR",
    window: "+10–14 hours",
    aqi: "Transport contribution +38%",
    confidence: 78,
    status: "MONITORING" as const,
    drivers: ["NW wind regime", "Active fire clusters (229 points)", "Estimated PM2.5: 85–120 µg/m³"],
    issued: "18:42 IST",
    acknowledged: false,
  },
];

const SEVERITY_CONFIG = {
  critical: { icon: AlertCircle, color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.3)" },
  warning:  { icon: AlertTriangle, color: "#f97316", bg: "rgba(249,115,22,0.06)", border: "rgba(249,115,22,0.25)" },
  info:     { icon: CheckCircle, color: "#38bdf8", bg: "rgba(56,189,248,0.06)", border: "rgba(56,189,248,0.2)" },
};

export default function Alerts() {
  const [selected, setSelected] = useState(0);
  const [advisoryOpen, setAdvisoryOpen] = useState(false);
  const [ackd, setAckd] = useState(new Set<number>([2]));

  const alert = ALERTS[selected];
  const cfg = SEVERITY_CONFIG[alert.severity];

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-100 tracking-tight">Early Warning Center</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated pollution event forecasting and advisory generation
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-blink-alert" />
            <span className="text-xs font-semibold text-red-400">
              {ALERTS.filter((a) => !ackd.has(a.id)).length} ACTIVE ALERTS
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 grid gap-4" style={{ gridTemplateColumns: "1fr 300px" }}>

        {/* Alert list */}
        <div className="space-y-3">
          {ALERTS.map((a, i) => {
            const c = SEVERITY_CONFIG[a.severity];
            const Icon = c.icon;
            const isSelected = selected === i;
            const isAckd = ackd.has(a.id);
            return (
              <button
                key={a.id}
                onClick={() => setSelected(i)}
                className="w-full text-left rounded-lg border p-4 transition-all duration-150"
                style={{
                  background: isSelected ? c.bg : "#0c1624",
                  borderColor: isSelected ? c.border : "rgba(56,189,248,0.1)",
                  opacity: isAckd ? 0.75 : 1,
                }}>
                <div className="flex items-start gap-3">
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: c.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold" style={{ color: c.color }}>{a.title}</span>
                      {!isAckd && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold">
                          NEW
                        </span>
                      )}
                      <span className="ml-auto text-[9px] px-2 py-0.5 rounded font-bold"
                        style={{ background: `${c.color}15`, color: c.color }}>
                        {a.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-0.5 text-[10px] text-slate-500">
                      <span>Area: <span className="text-slate-300">{a.area}</span></span>
                      <span>Window: <span className="text-slate-300">{a.window}</span></span>
                      <span>AQI: <span className="font-mono" style={{ color: c.color }}>{a.aqi}</span></span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-600">Confidence</span>
                        <div className="w-20 h-1.5 rounded-full bg-white/5">
                          <div className="h-full rounded-full" style={{ width: `${a.confidence}%`, background: c.color }} />
                        </div>
                        <span className="text-[9px] font-mono" style={{ color: c.color, fontFamily: "JetBrains Mono, monospace" }}>
                          {a.confidence}%
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Issued {a.issued}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Notification log */}
          <div className="rounded-lg border mt-2" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.1)" }}>
            <div className="px-4 py-2.5 border-b text-[10px] text-slate-500 font-semibold tracking-widest"
              style={{ borderColor: "rgba(56,189,248,0.08)" }}>
              SYSTEM NOTIFICATION LOG
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(56,189,248,0.05)" }}>
              {NOTIFICATIONS.map((n) => {
                const color = n.severity === "critical" ? "#ef4444" : n.severity === "warning" ? "#f97316" : "#38bdf8";
                return (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-2.5">
                    <span className="text-[8px] mt-0.5" style={{ color }}>●</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="text-[11px] text-slate-300">{n.title}</span>
                        <span className="text-[9px] font-mono text-slate-600 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-relaxed">{n.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4"
            style={{ background: "#0c1624", borderColor: `${cfg.border}` }}>
            <div className="flex items-center gap-2 mb-1">
              <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} />
              <span className="text-xs font-bold" style={{ color: cfg.color }}>{alert.status}</span>
            </div>
            <div className="text-sm font-semibold text-slate-200 mb-4">{alert.title}</div>

            <div className="space-y-2 mb-4">
              {[
                { label: "Area",       val: alert.area },
                { label: "Window",     val: alert.window },
                { label: "Expected",   val: alert.aqi },
                { label: "Confidence", val: `${alert.confidence}%` },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-start gap-2">
                  <span className="text-[10px] text-slate-500 w-20 shrink-0">{label}</span>
                  <span className="text-[10px] text-slate-300 font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-slate-500 tracking-widest mb-2">KEY DRIVERS</div>
            <div className="space-y-1.5 mb-4">
              {alert.drivers.map((d, i) => (
                <div key={d} className="flex items-center gap-2 text-[10px]">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: cfg.color }} />
                  <span className="text-slate-400">{d}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="space-y-1.5">
              <button
                onClick={() => setAdvisoryOpen(true)}
                className="w-full py-2 rounded text-xs font-semibold"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>
                Generate Advisory
              </button>
              <button className="w-full py-2 rounded text-xs font-semibold"
                style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8" }}>
                <Eye className="w-3 h-3 inline mr-1" />View Impact Zone
              </button>
              <button
                onClick={() => setAckd((prev) => { const n = new Set(prev); n.add(alert.id); return n; })}
                className="w-full py-2 rounded text-xs transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#6b90a8" }}>
                {ackd.has(alert.id) ? "✓ Acknowledged" : "Acknowledge"}
              </button>
            </div>
          </div>

          {/* Data quality */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.1)" }}>
            <div className="text-[10px] text-slate-500 tracking-widest mb-3">DATA PROVENANCE</div>
            <div className="space-y-1.5">
              {[
                { src: "Ground monitoring", status: "demo", ts: "DEMO" },
                { src: "NWP fields (WRF)",   status: "demo", ts: "DEMO" },
                { src: "Fire detection",     status: "demo", ts: "DEMO" },
                { src: "Emission inventory", status: "demo", ts: "DEMO" },
              ].map(({ src, status, ts }) => (
                <div key={src} className="flex items-center gap-2 text-[10px]">
                  <span className="text-yellow-500">●</span>
                  <span className="text-slate-500 flex-1">{src}</span>
                  <span className="font-mono text-yellow-500" style={{ fontFamily: "JetBrains Mono, monospace" }}>{ts}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 rounded text-[9px] text-yellow-600"
              style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)" }}>
              DEMO MODE: Interface uses simulated/sample data. Production deployment will connect validated
              meteorological, air-quality and emissions datasets.
            </div>
          </div>
        </div>
      </div>

      {advisoryOpen && <AdvisoryModal onClose={() => setAdvisoryOpen(false)} alert={alert} />}
    </div>
  );
}

function AdvisoryModal({ onClose, alert }: { onClose: () => void; alert: typeof ALERTS[0] }) {
  const [approved, setApproved] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(4,12,24,0.9)" }}>
      <div className="w-[540px] max-h-[85vh] flex flex-col rounded-xl border overflow-hidden animate-slide-in"
        style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.2)" }}>
        <div className="px-5 py-4 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: "rgba(56,189,248,0.1)" }}>
          <div>
            <div className="text-sm font-semibold text-slate-200">AI-Generated Pollution Advisory</div>
            <div className="text-[10px] text-orange-400 mt-0.5">
              AI-generated draft — requires authorized review before publication.
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200">✕</button>
        </div>
        <div className="px-5 py-4 space-y-3 text-[11px] text-slate-400 leading-relaxed overflow-y-auto">
          <p><span className="text-slate-200 font-semibold">SUBJECT:</span> Air Quality Advisory — {alert.area}</p>
          <p><span className="text-slate-200 font-semibold">Forecast Window:</span> {alert.window}</p>
          <p><span className="text-slate-200 font-semibold">Expected AQI:</span> {alert.aqi}</p>
          <p><span className="text-slate-200 font-semibold">Dominant Pollutants:</span> PM2.5 (240–265 µg/m³), PM10 (415–430 µg/m³)</p>
          <p><span className="text-slate-200 font-semibold">Atmospheric Conditions:</span> Strong temperature inversion, PBL height 310–420 m, wind speed 1.8–2.1 m/s NW.</p>
          <p><span className="text-slate-200 font-semibold">Contributing Factors:</span> {alert.drivers.join("; ")}.</p>
          <p><span className="text-slate-200 font-semibold">Confidence:</span> {alert.confidence}%</p>
          <p><span className="text-slate-200 font-semibold">Recommended Actions:</span> Issue public health advisory; activate GRAP Stage III/IV restrictions; alert emergency health services; advise sensitive populations to remain indoors; restrict open burning activities.</p>
          <p className="text-slate-600 text-[10px] italic">Prototype estimate — not an official forecast.</p>
        </div>
        <div className="px-5 py-3 border-t flex items-center gap-2 shrink-0"
          style={{ borderColor: "rgba(56,189,248,0.1)" }}>
          <button className="px-3 py-1.5 rounded text-xs border border-slate-600 text-slate-400 hover:border-slate-400">Edit</button>
          <button
            onClick={() => setApproved(true)}
            className="px-3 py-1.5 rounded text-xs font-semibold"
            style={{
              background: approved ? "#22c55e20" : "rgba(56,189,248,0.15)",
              border: `1px solid ${approved ? "#22c55e50" : "rgba(56,189,248,0.3)"}`,
              color: approved ? "#22c55e" : "#38bdf8",
            }}>
            {approved ? "✓ Approved" : "Approve"}
          </button>
          <button className="px-3 py-1.5 rounded text-xs border border-slate-600 text-slate-400 flex items-center gap-1">
            <Download className="w-3 h-3" /> Export PDF
          </button>
          <button className="px-3 py-1.5 rounded text-xs border border-slate-600 text-slate-400 flex items-center gap-1">
            <Share2 className="w-3 h-3" /> Share
          </button>
          <button onClick={onClose} className="ml-auto text-xs text-slate-600 hover:text-slate-400">Close</button>
        </div>
      </div>
    </div>
  );
}
