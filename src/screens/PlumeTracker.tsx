import { memo, useState } from "react";
import { Wind, Flame } from "lucide-react";

type TimeStep = 0 | 1 | 2 | 3 | 4;
const TIME_LABELS: Record<TimeStep, string> = { 0: "NOW", 1: "+6H", 2: "+12H", 3: "+24H", 4: "+48H" };

// Plume positions at each time step (SVG path data for animated plume)
const PLUME_STATES: Record<TimeStep, { cx: number; cy: number; rx: number; ry: number; opacity: number }[]> = {
  0: [
    { cx: 195, cy: 185, rx: 40, ry: 25, opacity: 0.55 },
    { cx: 240, cy: 210, rx: 25, ry: 18, opacity: 0.35 },
  ],
  1: [
    { cx: 185, cy: 192, rx: 42, ry: 26, opacity: 0.6 },
    { cx: 250, cy: 228, rx: 30, ry: 20, opacity: 0.4 },
    { cx: 295, cy: 248, rx: 18, ry: 12, opacity: 0.25 },
  ],
  2: [
    { cx: 175, cy: 195, rx: 44, ry: 28, opacity: 0.65 },
    { cx: 255, cy: 238, rx: 35, ry: 22, opacity: 0.48 },
    { cx: 315, cy: 268, rx: 24, ry: 15, opacity: 0.32 },
    { cx: 350, cy: 280, rx: 14, ry: 10, opacity: 0.18 },
  ],
  3: [
    { cx: 165, cy: 198, rx: 46, ry: 30, opacity: 0.68 },
    { cx: 248, cy: 245, rx: 38, ry: 24, opacity: 0.52 },
    { cx: 320, cy: 278, rx: 30, ry: 18, opacity: 0.4 },
    { cx: 375, cy: 298, rx: 22, ry: 14, opacity: 0.28 },
    { cx: 415, cy: 308, rx: 14, ry: 9, opacity: 0.15 },
  ],
  4: [
    { cx: 155, cy: 200, rx: 50, ry: 32, opacity: 0.7 },
    { cx: 240, cy: 248, rx: 42, ry: 26, opacity: 0.55 },
    { cx: 315, cy: 280, rx: 34, ry: 20, opacity: 0.42 },
    { cx: 380, cy: 304, rx: 26, ry: 16, opacity: 0.3 },
    { cx: 440, cy: 316, rx: 20, ry: 12, opacity: 0.2 },
    { cx: 485, cy: 325, rx: 14, ry: 8, opacity: 0.12 },
  ],
};

const FIRE_CLUSTERS = [
  { cx: 165, cy: 130, label: "Amritsar area",    active: true },
  { cx: 210, cy: 155, label: "Ludhiana area",    active: true },
  { cx: 248, cy: 175, label: "Hisar / Haryana",  active: true },
  { cx: 190, cy: 195, label: "Sirsa area",       active: false },
];

interface RegionalMapProps {
  timeStep: TimeStep;
  plumeEllipses: { cx: number; cy: number; rx: number; ry: number; opacity: number }[];
}

const RegionalMapSVG = memo(function RegionalMapSVG({ timeStep, plumeEllipses }: RegionalMapProps) {
  return (
    <svg viewBox="0 0 680 440" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="fireGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g id="state-regions">
        <path d="M 30,20 L 280,20 L 320,60 L 290,145 L 200,175 L 80,180 L 30,130 Z"
          fill="#0a1828" stroke="rgba(56,189,248,0.18)" strokeWidth="1" />
        <text x="120" y="90" fill="#1e3a57" fontSize="13" fontFamily="Inter" fontWeight="500">Punjab</text>
        <path d="M 30,130 L 80,180 L 200,175 L 240,185 L 280,260 L 250,340 L 120,360 L 30,320 Z"
          fill="#0a1525" stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
        <text x="75" y="260" fill="#1e3a57" fontSize="13" fontFamily="Inter" fontWeight="500">Haryana</text>
        <path d="M 280,260 L 420,250 L 460,310 L 430,380 L 310,390 L 260,350 L 245,295 Z"
          fill="#0d1a2e" stroke="rgba(56,189,248,0.35)" strokeWidth="1.5" />
        <text x="318" y="325" fill="rgba(56,189,248,0.5)" fontSize="11" fontFamily="Inter" fontWeight="600">Delhi NCR</text>
        <path d="M 420,60 L 650,60 L 660,420 L 450,420 L 435,385 L 460,310 L 420,250 L 390,155 L 420,60 Z"
          fill="#080f1a" stroke="rgba(56,189,248,0.12)" strokeWidth="0.8" />
        <text x="530" y="220" fill="#14283c" fontSize="13" fontFamily="Inter">Uttar Pradesh</text>
        <path d="M 30,320 L 120,360 L 250,340 L 270,420 L 30,420 Z"
          fill="#080e18" stroke="rgba(56,189,248,0.1)" strokeWidth="0.8" />
        <text x="65" y="400" fill="#14283c" fontSize="11" fontFamily="Inter">Rajasthan</text>
        <path d="M 280,20 L 420,20 L 420,60 L 390,80 L 320,60 L 290,40 Z"
          fill="#090f1c" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
        <text x="310" y="45" fill="#14283c" fontSize="9" fontFamily="Inter">Uttarakhand</text>
      </g>

      <g id="plume-layer">
        {plumeEllipses.map((e, i) => (
          <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry}
            fill="#e879f9" fillOpacity={e.opacity * (timeStep === 0 ? 1 : 0.9)}
            className="animate-plume"
            style={{ animationDelay: `${i * 0.3}s`, filter: "blur(2px)" }}
          />
        ))}
        <path d="M 190,170 Q 300,225 370,285 Q 420,318 480,332"
          stroke="#e879f9" strokeWidth="2" fill="none" strokeDasharray="8 4"
          strokeOpacity={0.6}
          style={{ filter: "drop-shadow(0 0 4px rgba(232,121,249,0.5))" }}
        />
        {([[230, 195], [290, 228], [345, 262], [400, 292]] as [number, number][]).map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(140)`}>
            <path d="M -4,0 L 4,0 L 0,-8" fill="#22d3ee" fillOpacity={0.6} />
          </g>
        ))}
      </g>

      <g id="fire-markers">
        {FIRE_CLUSTERS.map(({ cx, cy, label, active }) => (
          <g key={label}>
            <circle cx={cx} cy={cy} r={active ? 8 : 5}
              fill={active ? "#f97316" : "#6b2200"} fillOpacity={active ? 0.25 : 0.15}
              className={active ? "animate-pulse" : ""}
            />
            <circle cx={cx} cy={cy} r={active ? 4 : 2.5}
              fill={active ? "#f97316" : "#6b2200"} filter="url(#fireGlow)"
            />
            <text x={cx + 6} y={cy - 5} fill={active ? "#f97316" : "#6b2200"}
              fontSize="7.5" fontFamily="JetBrains Mono">
              {active ? "🔥" : "•"} {label}
            </text>
          </g>
        ))}
      </g>

      <g id="receptors-labels">
        <circle cx="355" cy="318" r="10" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="355" cy="318" r="4" fill="#38bdf8" fillOpacity={0.7} />
        <text x="368" y="316" fill="#38bdf8" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600">
          Delhi receptor
        </text>
        <text x="420" y="268" fill="#2a4a65" fontSize="9" fontFamily="Inter" fontStyle="italic">Anand Vihar</text>
        <text x="436" y="320" fill="#2a4a65" fontSize="9" fontFamily="Inter" fontStyle="italic">Noida</text>
        <text x="268" y="372" fill="#2a4a65" fontSize="9" fontFamily="Inter" fontStyle="italic">Gurugram</text>
      </g>

      <g id="timestamp">
        <rect x="8" y="8" width="72" height="20" rx="3" fill="rgba(8,15,30,0.8)" />
        <text x="14" y="22" fill="#38bdf8" fontSize="9" fontFamily="JetBrains Mono">
          {TIME_LABELS[timeStep]}
        </text>
      </g>
    </svg>
  );
});

export default function PlumeTracker() {
  const [timeStep, setTimeStep] = useState<TimeStep>(2);
  const [tracing, setTracing] = useState(false);
  const [showTrace, setShowTrace] = useState(false);

  const handleTrace = () => {
    setTracing(true);
    setTimeout(() => {
      setTracing(false);
      setShowTrace(true);
    }, 1200);
  };

  const plumeEllipses = PLUME_STATES[timeStep];

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <h1 className="text-xl font-semibold text-slate-100 tracking-tight">Regional Pollution Plume Tracker</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Wind-driven transport from Punjab/Haryana crop residue burning · DEMO / SIMULATED
        </p>
      </div>

      <div className="flex-1 px-4 py-4 grid gap-4" style={{ gridTemplateColumns: "1fr 270px" }}>

        {/* Map */}
        <div className="flex flex-col gap-3">

          {/* Summary row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Source Region",    val: "Punjab + Haryana", color: "#e879f9" },
              { label: "Plume Direction",  val: "SE →",             color: "#f97316" },
              { label: "NCR Arrival",      val: "10–14 hours",      color: "#eab308" },
              { label: "Confidence",       val: "78%",              color: "#22c55e" },
            ].map(({ label, val, color }) => (
              <div key={label} className="rounded-lg border p-3"
                style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.1)" }}>
                <div className="text-[9px] text-slate-600 mb-1">{label}</div>
                <div className="text-xs font-semibold font-mono" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* Regional map */}
          <div className="flex-1 rounded-lg border overflow-hidden relative"
            style={{ background: "#060d1a", borderColor: "rgba(56,189,248,0.12)", minHeight: 340 }}>
            <RegionalMapSVG timeStep={timeStep} plumeEllipses={plumeEllipses} />
          </div>

          {/* Timeline slider */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] text-slate-500 font-semibold tracking-widest">PLUME POSITION TIMELINE</div>
              <span className="text-[10px] font-mono text-fuchsia-400"
                style={{ fontFamily: "JetBrains Mono, monospace" }}>
                {TIME_LABELS[timeStep]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {([0, 1, 2, 3, 4] as TimeStep[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeStep(t)}
                  className="flex-1 py-2 rounded text-xs text-center transition-all duration-200 font-mono border"
                  style={{
                    background: timeStep === t ? "rgba(232,121,249,0.15)" : "rgba(255,255,255,0.02)",
                    borderColor: timeStep === t ? "rgba(232,121,249,0.4)" : "rgba(255,255,255,0.04)",
                    color: timeStep === t ? "#e879f9" : "#4a6a80",
                    fontFamily: "JetBrains Mono, monospace",
                  }}>
                  {TIME_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel: trace + source info */}
        <div className="space-y-4">

          {/* Trace button */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">POLLUTION SOURCE TRACE</div>
            <button
              onClick={handleTrace}
              disabled={tracing}
              className="w-full py-2.5 rounded text-sm font-semibold transition-all duration-200"
              style={{
                background: tracing ? "rgba(232,121,249,0.08)" : "rgba(232,121,249,0.15)",
                border: "1px solid rgba(232,121,249,0.4)",
                color: tracing ? "#9333ea" : "#e879f9",
              }}>
              {tracing ? "Tracing…" : "TRACE POLLUTION SOURCE"}
            </button>

            {showTrace && (
              <div className="mt-3 space-y-1.5 animate-slide-in">
                {[
                  { step: "Delhi NCR PM2.5 elevated",       color: "#ef4444" },
                  { step: "Regional transport detected",     color: "#f97316" },
                  { step: "Upwind source region identified", color: "#eab308" },
                  { step: "Punjab/Haryana emission cluster", color: "#e879f9" },
                  { step: "Wind trajectory confirmed",       color: "#a78bfa" },
                  { step: "NCR arrival: 10–14H",             color: "#22c55e" },
                ].map(({ step, color }, i) => (
                  <div key={step} className="flex items-center gap-2 text-[10px]"
                    style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                    <span className="text-slate-400">{step}</span>
                  </div>
                ))}

                <div className="mt-3 pt-2 border-t" style={{ borderColor: "rgba(56,189,248,0.1)" }}>
                  <div className="text-[9px] text-slate-500 tracking-widest mb-2">SOURCE CONTRIBUTION</div>
                  {[
                    { src: "Local emissions", pct: 46, color: "#38bdf8" },
                    { src: "Regional transport", pct: 38, color: "#e879f9" },
                    { src: "Background", pct: 16, color: "#4a6a80" },
                  ].map(({ src, pct, color }) => (
                    <div key={src} className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] text-slate-500 w-28 shrink-0">{src}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/5">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                      </div>
                      <span className="text-[9px] font-mono w-7 text-right shrink-0" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                        {pct}%
                      </span>
                    </div>
                  ))}
                  <p className="text-[9px] text-slate-600 mt-2 italic">
                    Prototype estimate — not an official emissions inventory.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Fire activity */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <div className="text-[10px] text-slate-500 font-semibold tracking-widest">CROP RESIDUE BURNING</div>
            </div>
            <div className="space-y-2">
              {[
                { region: "Punjab (Amritsar belt)", count: 142, trend: "↑" },
                { region: "Haryana (Hisar dist.)", count: 87,  trend: "↑" },
                { region: "Haryana (Sirsa dist.)", count: 43,  trend: "→" },
              ].map(({ region, count, trend }) => (
                <div key={region} className="flex items-center gap-2 py-1.5 border-b"
                  style={{ borderColor: "rgba(56,189,248,0.06)" }}>
                  <Flame className="w-3 h-3 text-orange-400 shrink-0" />
                  <span className="text-[10px] text-slate-400 flex-1">{region}</span>
                  <span className="text-[10px] font-mono text-orange-400" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {count} pts
                  </span>
                  <span className="text-[10px]" style={{ color: trend === "↑" ? "#ef4444" : "#94a3b8" }}>
                    {trend}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[9px] text-slate-600">
              Satellite fire detection estimate · DEMO data
            </div>
          </div>

          {/* Plume properties */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Wind className="w-3.5 h-3.5 text-sky-400" />
              <div className="text-[10px] text-slate-500 font-semibold tracking-widest">PLUME PROPERTIES</div>
            </div>
            <div className="space-y-1.5">
              {[
                { label: "Transport vector",  val: "NW→SE at 2.1 m/s" },
                { label: "Plume height",      val: "~850 m AGL" },
                { label: "PM2.5 conc.",        val: "85–120 µg/m³" },
                { label: "Dispersion coeff.", val: "σy = 4.2 km" },
                { label: "Arrival spread",    val: "±2 hours (1σ)" },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[10px] text-slate-500">{label}</span>
                  <span className="text-[10px] font-mono text-sky-400"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
