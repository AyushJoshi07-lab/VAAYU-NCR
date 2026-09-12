import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceArea,
} from "recharts";
import {
  Wind, Thermometer, Droplets, Activity, AlertTriangle,
  ChevronRight, TrendingUp, TrendingDown, Layers, Info,
  ArrowUpRight, Zap,
} from "lucide-react";
import {
  CURRENT, FORECAST_72H, ATTRIBUTION, AQI_COLOR, AQI_LABEL,
} from "@/data/mockData";

const CHART_DATA = FORECAST_72H.map((d) => ({
  ...d,
  band: [d.lo, d.hi] as [number, number],
}));

function AQIRing({ aqi }: { aqi: number }) {
  const color = AQI_COLOR(aqi);
  const r = 52;
  const circ = 2 * Math.PI * r;
  const frac = Math.min(aqi / 500, 1);
  const dash = frac * circ;
  return (
    <div className="relative w-36 h-36 shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          {aqi}
        </span>
        <span className="text-[10px] font-semibold tracking-widest mt-0.5" style={{ color }}>
          {AQI_LABEL(aqi)}
        </span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const d = FORECAST_72H.find((x) => x.t === label);
  if (!d) return null;
  return (
    <div className="rounded border px-3 py-2 text-xs"
      style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.2)" }}>
      <p className="font-mono text-sky-400 mb-1.5">{label}</p>
      <p className="text-slate-300 mb-0.5">AQI: <span className="font-mono font-bold" style={{ color: AQI_COLOR(d.aqi) }}>{d.aqi}</span></p>
      <p className="text-slate-500">PM2.5: <span className="font-mono text-slate-300">{d.pm25} µg/m³</span></p>
      <p className="text-slate-500">Confidence: <span className="font-mono text-slate-300">{d.lo}–{d.hi}</span></p>
    </div>
  );
};

interface Props {
  onNavigate: (s: string) => void;
}

export default function CommandCenter({ onNavigate }: Props) {
  const [explainOpen, setExplainOpen] = useState(false);
  const [advisoryOpen, setAdvisoryOpen] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Page header */}
      <div className="px-6 pt-5 pb-4 border-b flex items-start justify-between"
        style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <div>
          <h1 className="text-xl font-semibold text-slate-100 tracking-tight">
            Delhi NCR Atmospheric Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            72-hour coupled meteorology–chemistry forecast · DEMO / SIMULATED DATA
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded border text-xs"
          style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-400 font-semibold tracking-wide">SEVERE EVENT PREDICTED</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">

        {/* Row 1: AQI + Meteo | Forecast chart | Coupling */}
        <div className="grid gap-4" style={{ gridTemplateColumns: "220px 1fr 200px" }}>

          {/* === AQI + Atmospheric State Card === */}
          <div className="rounded-lg border flex flex-col gap-4 p-4"
            style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest">CURRENT STATE</div>
            <div className="flex justify-center">
              <AQIRing aqi={CURRENT.aqi} />
            </div>
            <div className="space-y-2">
              {[
                { label: "PM2.5", val: `${CURRENT.pm25} µg/m³`, color: AQI_COLOR(CURRENT.aqi) },
                { label: "PM10",  val: `${CURRENT.pm10} µg/m³`,  color: "#f97316" },
                { label: "O₃",   val: `${CURRENT.o3} µg/m³`,   color: "#eab308" },
                { label: "NOx",  val: `${CURRENT.nox} µg/m³`,  color: "#94a3b8" },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500">{label}</span>
                  <span className="text-[11px] font-mono font-medium" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3" style={{ borderColor: "rgba(56,189,248,0.1)" }}>
              <div className="text-[9px] text-slate-600 tracking-widest mb-2">ATMOSPHERIC STATE</div>
              {[
                { icon: Thermometer, label: "Temperature",  val: `${CURRENT.temperature}°C`,   color: "#f97316" },
                { icon: Droplets,    label: "Humidity",     val: `${CURRENT.humidity}%`,        color: "#38bdf8" },
                { icon: Wind,        label: "Wind",         val: `${CURRENT.windSpeed} m/s ${CURRENT.windDir}`, color: "#22d3ee" },
                { icon: Activity,    label: "PBL Height",   val: `${CURRENT.pblHeight} m`,      color: "#a78bfa" },
              ].map(({ icon: Icon, label, val, color }) => (
                <div key={label} className="flex items-center gap-2 py-1">
                  <Icon className="w-3 h-3 shrink-0" style={{ color }} />
                  <span className="text-[10px] text-slate-500 flex-1">{label}</span>
                  <span className="text-[10px] font-mono" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                    {val}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between mt-1 pt-2 border-t"
                style={{ borderColor: "rgba(56,189,248,0.08)" }}>
                <span className="text-[10px] text-slate-500">Inversion</span>
                <span className="text-[10px] font-bold text-red-400 font-mono">STRONG</span>
              </div>
            </div>
          </div>

          {/* === 72H Forecast chart === */}
          <div className="rounded-lg border flex flex-col p-4"
            style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="text-[10px] text-slate-500 font-semibold tracking-widest">72-HOUR COUPLED POLLUTION FORECAST</div>
                <div className="text-sm font-semibold text-slate-200 mt-0.5">Delhi NCR · PM2.5 / AQI Outlook</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500">Predicted peak</div>
                <div className="text-lg font-bold text-purple-400" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  AQI 428
                </div>
                <div className="text-[10px] text-slate-500">Tomorrow 07:00–10:00 · 87% conf.</div>
              </div>
            </div>

            {/* AQI band legend */}
            <div className="flex items-center gap-4 mb-2 mt-1">
              {[
                { label: "Moderate", color: "#eab308" },
                { label: "Poor",     color: "#f97316" },
                { label: "Very Poor",color: "#ef4444" },
                { label: "Severe",   color: "#9333ea" },
                { label: "Forecast CI", color: "#e879f9", dashed: true },
              ].map(({ label, color, dashed }) => (
                <div key={label} className="flex items-center gap-1">
                  <div className="w-4 h-0.5 rounded" style={{
                    background: dashed ? "transparent" : color,
                    border: dashed ? `1px dashed ${color}` : "none",
                  }} />
                  <span className="text-[9px] text-slate-600">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={CHART_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="ciGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e879f9" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#e879f9" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  {/* AQI band backgrounds */}
                  <ReferenceArea y1={0}   y2={200} fill="#22c55e" fillOpacity={0.04} />
                  <ReferenceArea y1={200} y2={300} fill="#f97316" fillOpacity={0.06} />
                  <ReferenceArea y1={300} y2={400} fill="#ef4444" fillOpacity={0.07} />
                  <ReferenceArea y1={400} y2={500} fill="#9333ea" fillOpacity={0.08} />

                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.07)" />
                  <XAxis dataKey="t" tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <YAxis domain={[150, 500]} tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <Tooltip content={<CustomTooltip />} />

                  {/* Confidence interval */}
                  <Area type="monotone" dataKey="hi" stroke="none" fill="url(#ciGrad)" strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="lo" stroke="#e879f9" strokeDasharray="4 2" strokeWidth={0.5}
                    fill="#040c18" fillOpacity={1} />

                  {/* Main forecast */}
                  <Area type="monotone" dataKey="aqi"
                    stroke="#38bdf8" strokeWidth={2}
                    fill="url(#aqiGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#38bdf8" }}
                  />

                  {/* Reference lines */}
                  <ReferenceLine y={200} stroke="#eab308" strokeDasharray="3 3" strokeOpacity={0.4} />
                  <ReferenceLine y={300} stroke="#f97316" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <ReferenceLine y={400} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <ReferenceLine x="+36H" stroke="#9333ea" strokeDasharray="4 2" strokeOpacity={0.6}
                    label={{ value: "PEAK", position: "top", fill: "#9333ea", fontSize: 9 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* WHY IS AQI RISING */}
            <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-semibold text-slate-400 tracking-widest">WHY IS AQI RISING?</div>
                <button
                  onClick={() => setExplainOpen(!explainOpen)}
                  className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                >
                  Explain Forecast <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-1.5">
                {ATTRIBUTION.map(({ driver, pct, color }) => (
                  <div key={driver} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-40 shrink-0 truncate">{driver}</span>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: color }} />
                    </div>
                    <span className="text-[10px] font-mono w-8 text-right shrink-0"
                      style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>
              {explainOpen && (
                <div className="mt-2 p-2.5 rounded text-[11px] text-slate-400 leading-relaxed"
                  style={{ background: "rgba(56,189,248,0.05)", borderLeft: "2px solid rgba(56,189,248,0.3)" }}>
                  Stable atmospheric conditions and a shallow planetary boundary layer are expected to restrict
                  vertical mixing. Weak winds may allow transported particulate matter to accumulate over Delhi NCR,
                  increasing near-surface PM2.5 during the morning period.
                </div>
              )}
            </div>
          </div>

          {/* === Coupling Status === */}
          <div className="rounded-lg border flex flex-col p-4"
            style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">ATMOSPHERIC COUPLING</div>

            <CouplingNode label="METEOROLOGY" items={["Temperature", "Wind", "PBL Height", "Humidity"]}
              color="#38bdf8" />
            <FlowArrow />
            <CouplingNode label="ATMO. STABILITY" items={["Very Stable", "Inv: STRONG"]}
              color="#a78bfa" highlight />
            <FlowArrow />
            <CouplingNode label="DISPERSION" items={["Restricted", "Vert. mix: LOW"]}
              color="#f97316" />
            <FlowArrow />
            <CouplingNode label="CHEMISTRY" items={["PM2.5/PM10", "O₃/NOx"]}
              color="#ef4444" />
            <FlowArrow />
            <CouplingNode label="AQI OUTPUT" items={["287 → 428 (↑49%)"]}
              color="#9333ea" highlight />

            {/* Feedback arrow */}
            <div className="mt-2 pt-2 border-t" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
              <div className="flex items-center gap-1.5 text-[9px] text-plume-mg"
                style={{ color: "#e879f9" }}>
                <span>↩</span>
                <span className="text-slate-600">Aerosol load → radiation → PBL mod.</span>
              </div>
            </div>

            <div className="mt-3 rounded p-2.5" style={{ background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.2)" }}>
              <div className="text-[9px] text-purple-400 tracking-widest font-semibold mb-1">COUPLING STATE</div>
              <div className="text-xs font-bold text-purple-300">HIGH POLLUTION TRAPPING</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: "89%" }} />
                </div>
                <span className="text-[10px] font-mono text-purple-400"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}>89%</span>
              </div>
              <div className="text-[9px] text-purple-600 mt-0.5">Confidence</div>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="rounded-lg border px-4 py-3 flex items-center gap-4"
          style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}>
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 animate-blink-alert" />
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-red-400 mr-2">SEVERE POLLUTION EVENT PREDICTED</span>
            <span className="text-xs text-slate-400">
              East Delhi + Ghaziabad · Tomorrow 05:00–11:00 · AQI 410–450 · 87% confidence
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => onNavigate("alerts")}
              className="text-[11px] px-2.5 py-1 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
              View Alert
            </button>
            <button onClick={() => setAdvisoryOpen(true)}
              className="text-[11px] px-2.5 py-1 rounded border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-colors">
              Generate Advisory
            </button>
            <button onClick={() => onNavigate("plume")}
              className="text-[11px] px-2.5 py-1 rounded border border-sky-500/30 text-sky-400 hover:bg-sky-500/10 transition-colors">
              Trace Cause
            </button>
          </div>
        </div>

        {/* Row 2: bottom cards */}
        <div className="grid grid-cols-3 gap-4">

          {/* Inversion Quick View */}
          <div className="rounded-lg border p-4"
            style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] text-slate-500 font-semibold tracking-widest">INVERSION MONITOR</div>
              <button onClick={() => onNavigate("inversion")}
                className="text-[10px] text-sky-400 flex items-center gap-0.5 hover:text-sky-300 transition-colors">
                Expand <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <InversionDiagram />
          </div>

          {/* Top Hotspots */}
          <div className="rounded-lg border p-4"
            style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] text-slate-500 font-semibold tracking-widest">TOP HOTSPOTS</div>
              <button onClick={() => onNavigate("hotspots")}
                className="text-[10px] text-sky-400 flex items-center gap-0.5 hover:text-sky-300 transition-colors">
                All <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: "Anand Vihar", cur: 365, fcast: 448, delta: 23, risk: "#9333ea" },
                { name: "Ghaziabad",   cur: 341, fcast: 421, delta: 19, risk: "#ef4444" },
                { name: "Wazirpur",    cur: 312, fcast: 381, delta: 22, risk: "#ef4444" },
              ].map(({ name, cur, fcast, delta, risk }) => (
                <div key={name} className="flex items-center gap-3 py-1.5 px-2 rounded"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: risk }} />
                  <span className="text-xs text-slate-300 flex-1">{name}</span>
                  <span className="text-[10px] font-mono text-slate-500">{cur}</span>
                  <ArrowUpRight className="w-3 h-3 text-red-400" />
                  <span className="text-[10px] font-mono font-bold" style={{ color: risk }}>{fcast}</span>
                  <span className="text-[9px] text-red-400">+{delta}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Plume Status */}
          <div className="rounded-lg border p-4"
            style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] text-slate-500 font-semibold tracking-widest">REGIONAL PLUME</div>
              <button onClick={() => onNavigate("plume")}
                className="text-[10px] text-sky-400 flex items-center gap-0.5 hover:text-sky-300 transition-colors">
                Track <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-orange-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-300">Punjab + Haryana</div>
                  <div className="text-[10px] text-slate-500">Crop residue burning activity detected</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Source", val: "NW" },
                  { label: "Direction", val: "→ SE" },
                  { label: "Arrival", val: "10–14H" },
                  { label: "Confidence", val: "78%" },
                ].map(({ label, val }) => (
                  <div key={label} className="rounded p-1.5" style={{ background: "rgba(56,189,248,0.05)" }}>
                    <div className="text-[9px] text-slate-600 mb-0.5">{label}</div>
                    <div className="text-xs font-mono text-fuchsia-300"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Modal */}
      {advisoryOpen && (
        <AdvisoryModal onClose={() => setAdvisoryOpen(false)} />
      )}
    </div>
  );
}

function CouplingNode({ label, items, color, highlight }: {
  label: string; items: string[]; color: string; highlight?: boolean;
}) {
  return (
    <div className="rounded p-2" style={{
      background: highlight ? `${color}12` : "rgba(255,255,255,0.02)",
      border: `1px solid ${color}30`,
    }}>
      <div className="text-[9px] font-semibold tracking-wider mb-0.5" style={{ color }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-1">
        {items.map((it) => (
          <span key={it} className="text-[9px] text-slate-400 bg-white/5 px-1 py-0.5 rounded">{it}</span>
        ))}
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center my-0.5">
      <svg width="16" height="14" viewBox="0 0 16 14">
        <line x1="8" y1="0" x2="8" y2="10" stroke="#38bdf8" strokeWidth="1.5"
          strokeDasharray="4 3" className="flow-line" />
        <path d="M 4 9 L 8 14 L 12 9" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function InversionDiagram() {
  const layers = [
    { label: "Upper troposphere", temp: "~8°C",  color: "#1e3a57", h: 20 },
    { label: "Warm inversion layer 850m", temp: "23°C", color: "#7c3aed", h: 22 },
    { label: "─ ─ INVERSION LAYER ─ ─", temp: "",   color: "#7c3aed", h: 8, separator: true },
    { label: "Cold surface air (trapped PM2.5)", temp: "18°C", color: "#1e3a4a", h: 28 },
    { label: "Surface", temp: "",  color: "#0f1f36", h: 10 },
  ];
  return (
    <div className="space-y-0.5">
      {layers.map(({ label, temp, color, h, separator }) => (
        <div key={label}
          className="flex items-center gap-2 px-2 rounded text-[9px]"
          style={{
            background: color,
            height: h,
            border: separator ? "1px dashed rgba(147,51,234,0.5)" : "none",
          }}>
          <span className={separator ? "text-purple-400 tracking-widest" : "text-slate-400"}>
            {label}
          </span>
          {temp && <span className="ml-auto text-sky-400 font-mono">{temp}</span>}
        </div>
      ))}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[9px] text-red-400 font-bold">● STRONG INVERSION</span>
        <span className="text-[9px] text-slate-600 ml-auto">Δ5°C · PBL 420m</span>
      </div>
    </div>
  );
}

function AdvisoryModal({ onClose }: { onClose: () => void }) {
  const [approved, setApproved] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(4,12,24,0.85)" }}>
      <div className="w-[540px] rounded-xl border overflow-hidden animate-slide-in"
        style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.2)" }}>
        <div className="px-5 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "rgba(56,189,248,0.1)" }}>
          <div>
            <div className="text-sm font-semibold text-slate-200">AI-Generated Pollution Advisory</div>
            <div className="text-[10px] text-orange-400 mt-0.5">
              AI-generated draft — requires authorized review before publication.
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200 transition-colors text-lg">✕</button>
        </div>
        <div className="px-5 py-4 space-y-3 text-[11px] text-slate-400 leading-relaxed max-h-80 overflow-y-auto">
          <p><span className="text-slate-200 font-semibold">SUBJECT:</span> Air Quality Advisory — East Delhi / Ghaziabad NCR Region</p>
          <p><span className="text-slate-200 font-semibold">Forecast Window:</span> 01 Sep 2026, 05:00–11:00 IST</p>
          <p><span className="text-slate-200 font-semibold">Affected Region:</span> East Delhi, Ghaziabad, Noida</p>
          <p><span className="text-slate-200 font-semibold">Expected AQI:</span> 410–450 (SEVERE)</p>
          <p><span className="text-slate-200 font-semibold">Dominant Pollutants:</span> PM2.5 (240–265 µg/m³), PM10 (415–430 µg/m³)</p>
          <p><span className="text-slate-200 font-semibold">Atmospheric Conditions:</span> Strong temperature inversion at 850 hPa, PBL height compressed to 310–420 m, wind speed 1.8–2.1 m/s from NW.</p>
          <p><span className="text-slate-200 font-semibold">Contributing Factors:</span> (1) Temperature inversion suppressing vertical mixing; (2) Regional PM2.5 transport from crop residue burning in Punjab/Haryana; (3) Weak winds preventing dispersion; (4) High relative humidity (82%) enhancing aerosol growth.</p>
          <p><span className="text-slate-200 font-semibold">Confidence:</span> 87% (high)</p>
          <p><span className="text-slate-200 font-semibold">Recommended Actions:</span> Issue public health advisory; consider activating GRAP Stage III/IV restrictions; alert emergency health services; advise sensitive populations to remain indoors.</p>
          <p className="text-slate-600 text-[10px] italic">Prototype estimate — not an official emissions inventory or operational forecast.</p>
        </div>
        <div className="px-5 py-3 border-t flex items-center gap-2"
          style={{ borderColor: "rgba(56,189,248,0.1)" }}>
          <button className="px-3 py-1.5 rounded text-xs border border-slate-600 text-slate-400 hover:border-slate-400 transition-colors">Edit</button>
          <button
            onClick={() => setApproved(true)}
            className="px-3 py-1.5 rounded text-xs transition-colors font-semibold"
            style={{
              background: approved ? "#22c55e20" : "rgba(56,189,248,0.15)",
              border: `1px solid ${approved ? "#22c55e50" : "rgba(56,189,248,0.3)"}`,
              color: approved ? "#22c55e" : "#38bdf8",
            }}>
            {approved ? "✓ Approved" : "Approve"}
          </button>
          <button className="px-3 py-1.5 rounded text-xs border border-slate-600 text-slate-400 hover:border-slate-400 transition-colors">Export PDF</button>
          <button className="px-3 py-1.5 rounded text-xs border border-slate-600 text-slate-400 hover:border-slate-400 transition-colors">Share</button>
          <button onClick={onClose}
            className="ml-auto text-xs text-slate-600 hover:text-slate-400 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}
