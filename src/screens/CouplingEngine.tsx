import { useState } from "react";
import { CURRENT } from "@/data/mockData";

const MET_VARS = [
  { label: "Temperature",    val: `${CURRENT.temperature}°C`,  color: "#f97316", desc: "Surface air temperature" },
  { label: "Wind Speed",     val: `${CURRENT.windSpeed} m/s`,  color: "#22d3ee", desc: "10m wind magnitude" },
  { label: "Wind Dir",       val: CURRENT.windDir,             color: "#22d3ee", desc: "Dominant transport direction" },
  { label: "PBL Height",     val: `${CURRENT.pblHeight} m`,    color: "#a78bfa", desc: "Planetary boundary layer" },
  { label: "Humidity",       val: `${CURRENT.humidity}%`,      color: "#38bdf8", desc: "Relative humidity" },
  { label: "Pressure",       val: `${CURRENT.pressure} hPa`,   color: "#94a3b8", desc: "Surface pressure" },
];

const CHEM_VARS = [
  { label: "PM2.5",  val: `${CURRENT.pm25} µg/m³`,  color: "#ef4444" },
  { label: "PM10",   val: `${CURRENT.pm10} µg/m³`,  color: "#f97316" },
  { label: "O₃",    val: `${CURRENT.o3} µg/m³`,    color: "#22c55e" },
  { label: "NOx",   val: `${CURRENT.nox} µg/m³`,   color: "#a78bfa" },
  { label: "AQI",   val: `${CURRENT.aqi}`,          color: "#f97316" },
];

const PIPELINE_STAGES = [
  {
    id: "ingest", title: "DATA INGESTION", color: "#38bdf8",
    items: ["Ground monitoring (CPCB)", "IMD weather obs.", "NWP model fields", "Satellite remote sensing", "Regional fire activity", "Emission inventories"],
    status: "DEMO",
  },
  {
    id: "qc", title: "DATA PROCESSING", color: "#22d3ee",
    items: ["Quality control & flagging", "Missing value handling", "Spatial interpolation", "Temporal synchronization", "Unit normalization"],
    status: "DEMO",
  },
  {
    id: "coupling", title: "COUPLING ENGINE", color: "#a78bfa",
    items: ["Meteorology–chemistry coupling", "PBL parameterization", "Aerosol–radiation feedback", "Transport equations", "Vertical mixing schemes"],
    status: "DEMO",
  },
  {
    id: "forecast", title: "FORECAST ENGINE", color: "#f97316",
    items: ["72-hour AQI forecast", "PM2.5 / PM10 prediction", "O₃ / NOx projection", "Uncertainty quantification"],
    status: "DEMO",
  },
  {
    id: "analytics", title: "ANALYTICS LAYER", color: "#ef4444",
    items: ["Inversion detection", "Plume tracking", "Hotspot prediction", "Attribution analysis", "Forecast confidence"],
    status: "DEMO",
  },
  {
    id: "decision", title: "DECISION SUPPORT", color: "#22c55e",
    items: ["Early warning alerts", "AI-drafted advisories", "Spatial hotspot maps", "Role-based outputs"],
    status: "DEMO",
  },
];

const FEEDBACKS = [
  { from: "Aerosol loading", to: "Solar radiation", via: "optical depth", color: "#f97316" },
  { from: "Radiation change", to: "Surface heating", via: "energy balance", color: "#eab308" },
  { from: "Surface heating", to: "PBL height", via: "convective flux", color: "#a78bfa" },
  { from: "PBL modulation", to: "Vertical mixing", via: "turbulent transport", color: "#38bdf8" },
  { from: "Mixing change", to: "Pollutant dispersion", via: "concentration field", color: "#ef4444" },
];

export default function CouplingEngine() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>("coupling");

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <h1 className="text-xl font-semibold text-slate-100 tracking-tight">Coupling Engine</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Atmospheric meteorology–chemistry bidirectional coupling model · Concept demonstration
        </p>
      </div>

      <div className="flex-1 px-4 py-4 grid gap-4" style={{ gridTemplateColumns: "1fr 320px" }}>

        {/* Left: full pipeline */}
        <div className="space-y-3">

          {/* Coupling state banner */}
          <div className="rounded-lg border px-4 py-3 flex items-center gap-4"
            style={{ background: "rgba(147,51,234,0.08)", borderColor: "rgba(147,51,234,0.3)" }}>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-purple-300">HIGH POLLUTION TRAPPING — COUPLING ACTIVE</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Two-way aerosol–meteorology feedback detected. Inversion suppressing vertical mixing.
              </div>
            </div>
            <div className="text-center shrink-0">
              <div className="text-xl font-bold font-mono text-purple-300" style={{ fontFamily: "JetBrains Mono, monospace" }}>89%</div>
              <div className="text-[9px] text-slate-600">Confidence</div>
            </div>
          </div>

          {/* Core coupling diagram */}
          <div className="rounded-lg border p-5" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-4">ATMOSPHERIC COUPLING MECHANISM</div>
            <div className="flex gap-6">

              {/* Meteorology column */}
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-sky-400 tracking-widest mb-2">METEOROLOGY</div>
                <div className="space-y-1.5">
                  {MET_VARS.map(({ label, val, color, desc }) => (
                    <div key={label}
                      className="flex items-center justify-between rounded px-2.5 py-1.5 border group cursor-default"
                      style={{ background: "rgba(56,189,248,0.04)", borderColor: "rgba(56,189,248,0.1)" }}
                      title={desc}>
                      <span className="text-[11px] text-slate-400">{label}</span>
                      <span className="text-[11px] font-mono font-medium" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center coupling arrows */}
              <div className="flex flex-col items-center justify-center gap-2 shrink-0 w-28">
                <CouplingArrow label="Drives dispersion" dir="right" color="#a78bfa" />
                <div className="text-center rounded-lg p-3 border"
                  style={{ background: "rgba(147,51,234,0.15)", borderColor: "rgba(147,51,234,0.4)" }}>
                  <div className="text-[8px] font-semibold text-purple-400 tracking-widest">COUPLING</div>
                  <div className="text-[8px] font-semibold text-purple-400 tracking-widest">ENGINE</div>
                  <div className="text-[10px] text-purple-300 mt-1 font-mono">v2.1-β</div>
                </div>
                <CouplingArrow label="Aerosol feedback" dir="left" color="#e879f9" />
              </div>

              {/* Chemistry column */}
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-orange-400 tracking-widest mb-2">CHEMISTRY</div>
                <div className="space-y-1.5">
                  {CHEM_VARS.map(({ label, val, color }) => (
                    <div key={label}
                      className="flex items-center justify-between rounded px-2.5 py-1.5 border"
                      style={{ background: "rgba(249,115,22,0.04)", borderColor: "rgba(249,115,22,0.1)" }}>
                      <span className="text-[11px] text-slate-400">{label}</span>
                      <span className="text-[11px] font-mono font-medium" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback chain */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
              <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-2">TWO-WAY FEEDBACK CHAIN</div>
              <div className="flex items-center gap-0 overflow-x-auto">
                {FEEDBACKS.map(({ from, to, via, color }, i) => (
                  <div key={from} className="flex items-center gap-0 shrink-0">
                    <div
                      className="rounded px-2 py-1 text-center cursor-pointer transition-all duration-150"
                      style={{
                        background: hovered === from ? `${color}20` : "rgba(255,255,255,0.03)",
                        border: `1px solid ${color}30`,
                        minWidth: 88,
                      }}
                      onMouseEnter={() => setHovered(from)}
                      onMouseLeave={() => setHovered(null)}>
                      <div className="text-[9px] font-semibold" style={{ color }}>{from}</div>
                    </div>
                    {i < FEEDBACKS.length - 1 && (
                      <div className="flex flex-col items-center mx-1 shrink-0">
                        <div className="text-[8px] text-slate-600 mb-0.5">{via}</div>
                        <svg width="24" height="10" viewBox="0 0 24 10">
                          <line x1="0" y1="5" x2="20" y2="5" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
                          <path d="M 17 2 L 22 5 L 17 8" fill="none" stroke={color} strokeWidth="1" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data pipeline */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">
              DATA → COUPLING → FORECAST → DECISION PIPELINE
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PIPELINE_STAGES.map(({ id, title, color, items, status }) => (
                <button
                  key={id}
                  onClick={() => setActiveStage(activeStage === id ? null : id)}
                  className="text-left rounded p-3 border transition-all duration-150"
                  style={{
                    background: activeStage === id ? `${color}10` : "rgba(255,255,255,0.02)",
                    borderColor: activeStage === id ? `${color}40` : "rgba(255,255,255,0.05)",
                  }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] font-semibold tracking-widest" style={{ color }}>{title}</div>
                    <span className="text-[8px] px-1 py-0.5 rounded font-mono text-yellow-500 bg-yellow-500/10">
                      {status}
                    </span>
                  </div>
                  {activeStage === id && (
                    <div className="space-y-0.5">
                      {items.map((item) => (
                        <div key={item} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
                          <span className="text-[10px] text-slate-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeStage !== id && (
                    <div className="text-[10px] text-slate-600">{items.length} components</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: atmospheric stability profile */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">ATMOSPHERIC STABILITY</div>
            <StabilityProfile />
          </div>

          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">CAUSAL CHAIN</div>
            <div className="space-y-1">
              {[
                { step: "Strong inversion",          color: "#7c3aed", active: true },
                { step: "↓ Low PBL height (420m)",   color: "#a78bfa", active: true },
                { step: "↓ Weak vertical mixing",    color: "#f97316", active: true },
                { step: "↓ Pollutants trapped",      color: "#ef4444", active: true },
                { step: "↓ PM2.5 accumulation",      color: "#ef4444", active: true },
                { step: "↓ Aerosol loading ↑",       color: "#e879f9", active: true },
                { step: "↓ Radiation modified",      color: "#f97316", active: false },
                { step: "↓ PBL further suppressed",  color: "#9333ea", active: false },
                { step: "↓ Dispersion worsens",      color: "#9333ea", active: false },
              ].map(({ step, color, active }, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: color, opacity: active ? 1 : 0.4 }} />
                  <span className="text-[10px]" style={{ color: active ? color : "#3d5a6e" }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 rounded text-[9px] text-slate-600"
              style={{ background: "rgba(56,189,248,0.04)", border: "1px solid rgba(56,189,248,0.08)" }}>
              Feedback loop estimated to contribute ~18% additional AQI increase above linear dispersion model.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CouplingArrow({ label, dir, color }: { label: string; dir: "left" | "right"; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[8px] text-center" style={{ color }}>{label}</span>
      <svg width="60" height="12" viewBox="0 0 60 12">
        {dir === "right" ? (
          <>
            <line x1="2" y1="6" x2="56" y2="6" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" className="flow-line" />
            <path d="M 52 3 L 59 6 L 52 9" fill="none" stroke={color} strokeWidth="1.5" />
          </>
        ) : (
          <>
            <line x1="4" y1="6" x2="58" y2="6" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" className="flow-line" />
            <path d="M 8 3 L 1 6 L 8 9" fill="none" stroke={color} strokeWidth="1.5" />
          </>
        )}
      </svg>
    </div>
  );
}

function StabilityProfile() {
  const altitudes = [
    { alt: "3000m", temp: "3°C",  label: "Free troposphere",        color: "#1a3050", w: "55%" },
    { alt: "1500m", temp: "10°C", label: "Residual layer",          color: "#1a2a48", w: "62%" },
    { alt: "850m",  temp: "23°C", label: "Warm cap (inversion)",    color: "#4c1d95", w: "72%", highlight: true },
    { alt: "600m",  temp: "21°C", label: "Inversion base",          color: "#3b0764", w: "68%", separator: true },
    { alt: "420m",  temp: "20°C", label: "PBL top — trapped",       color: "#1e1047", w: "64%", pblTop: true },
    { alt: "200m",  temp: "19°C", label: "Mixed layer (PM trapped)",color: "#0f172a", w: "58%" },
    { alt: "0m",    temp: "18°C", label: "Surface",                 color: "#0a0f1a", w: "52%" },
  ];
  return (
    <div className="space-y-0.5">
      {altitudes.map(({ alt, temp, label, color, highlight, separator, pblTop }) => (
        <div key={alt}
          className="flex items-center gap-2 px-2 rounded text-[10px]"
          style={{
            background: color,
            height: 26,
            border: pblTop ? "1px dashed rgba(147,51,234,0.6)" : separator ? "1px dashed rgba(232,121,249,0.5)" : "none",
          }}>
          <span className="font-mono text-slate-600 w-10 shrink-0">{alt}</span>
          <span className={`flex-1 ${highlight ? "text-purple-300 font-semibold" : "text-slate-500"}`}>
            {label}
          </span>
          <span className="font-mono text-sky-400 shrink-0">{temp}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 mt-2 text-[9px]">
        <span className="text-purple-400 font-semibold">● INVERSION STRENGTH +5°C</span>
        <span className="ml-auto text-slate-600">Conf: 89%</span>
      </div>
    </div>
  );
}
