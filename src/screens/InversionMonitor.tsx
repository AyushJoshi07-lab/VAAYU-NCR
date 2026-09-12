import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea,
} from "recharts";
import { INVERSION_SERIES, CURRENT } from "@/data/mockData";

export default function InversionMonitor() {
  const peakWindow = INVERSION_SERIES.filter((d) => d.peak);
  const peakStr = Math.max(...INVERSION_SERIES.map((d) => d.str));

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <h1 className="text-xl font-semibold text-slate-100 tracking-tight">Atmospheric Inversion Monitor</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Temperature inversion detection and PBL height tracking · DEMO DATA
        </p>
      </div>

      <div className="flex-1 px-4 py-4 grid gap-4" style={{ gridTemplateColumns: "280px 1fr" }}>

        {/* Left: vertical atmospheric profile */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">
              VERTICAL TEMPERATURE PROFILE
            </div>
            <AtmosphericProfile />

            <div className="mt-4 space-y-2">
              {[
                { label: "Surface temp",      val: `${CURRENT.surfaceTemp}°C`,   color: "#38bdf8" },
                { label: "850m temperature",  val: `${CURRENT.temp850m}°C`,     color: "#f97316" },
                { label: "Inversion strength",val: `+${CURRENT.invStrength}°C`, color: "#9333ea" },
                { label: "PBL height",        val: `${CURRENT.pblHeight} m`,    color: "#a78bfa" },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex items-center justify-between rounded px-2.5 py-1.5 border"
                  style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.04)" }}>
                  <span className="text-[11px] text-slate-500">{label}</span>
                  <span className="text-[11px] font-mono font-semibold" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg p-3 border"
              style={{ background: "rgba(147,51,234,0.1)", borderColor: "rgba(147,51,234,0.3)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-blink-alert" />
                <span className="text-xs font-bold text-red-400">STRONG INVERSION</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed">
                Temperature increases with altitude, suppressing convection and trapping pollutants near the surface.
              </p>
            </div>
          </div>

          {/* Stability classification */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">STABILITY CLASSIFICATION</div>
            {[
              { label: "Pasquill Stability",  val: "Class F", color: "#9333ea", desc: "Very stable" },
              { label: "Richardson Number",   val: "> 0.25", color: "#ef4444", desc: "Subcritical turbulence" },
              { label: "Monin–Obukhov L",    val: "14 m", color: "#f97316", desc: "Strongly stable" },
              { label: "Mixing height",       val: "420 m", color: "#a78bfa", desc: "Severely restricted" },
            ].map(({ label, val, color, desc }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b last:border-0"
                style={{ borderColor: "rgba(56,189,248,0.06)" }}>
                <div>
                  <div className="text-[10px] text-slate-400">{label}</div>
                  <div className="text-[9px] text-slate-600">{desc}</div>
                </div>
                <span className="text-[11px] font-mono font-semibold" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: time series charts */}
        <div className="space-y-4">

          {/* Inversion strength time series */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-300">Inversion Strength vs Time</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Temperature differential at inversion layer · 24H observed + 12H forecast
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500">Peak trapping window</div>
                <div className="text-sm font-bold text-red-400" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  05:00–09:00
                </div>
                <div className="text-[10px] text-slate-500">Forecast intensity: {peakStr}°C</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={INVERSION_SERIES} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                {/* Observed period */}
                <ReferenceArea x1="00:00" x2="22:00" fill="rgba(56,189,248,0.03)" />
                {/* Forecast period */}
                <ReferenceArea x1="+00:00" x2="+12:00" fill="rgba(147,51,234,0.05)" />
                {/* Peak window */}
                <ReferenceArea x1="+04:00" x2="+06:00" fill="rgba(239,68,68,0.1)"
                  label={{ value: "PEAK", position: "top", fill: "#ef4444", fontSize: 9 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.06)" />
                <XAxis dataKey="t" tick={{ fill: "#4a6a80", fontSize: 9, fontFamily: "JetBrains Mono" }} interval={2} />
                <YAxis tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }} domain={[0, 8]}
                  label={{ value: "°C", angle: -90, position: "insideLeft", fill: "#4a6a80", fontSize: 9 }} />
                <Tooltip
                  contentStyle={{ background: "#0c1624", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11 }}
                  formatter={(val: number, name: string) => [
                    name === "str" ? `${val}°C` : `${val} m`,
                    name === "str" ? "Inversion strength" : "PBL height"
                  ]}
                />
                <Area type="monotone" dataKey="str" stroke="#9333ea" strokeWidth={2}
                  fill="url(#invGrad)" dot={false} />
                <ReferenceLine y={5} stroke="#ef4444" strokeDasharray="4 2" strokeOpacity={0.4}
                  label={{ value: "Current", position: "right", fill: "#ef4444", fontSize: 9 }} />
                {/* Forecast portion dashed */}
                <Line type="monotone" dataKey="str"
                  stroke="#9333ea" strokeWidth={0}
                  dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* PBL height time series */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-300">Planetary Boundary Layer Height</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Mixed layer depth constraining vertical pollutant transport
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500">Forecast minimum</div>
                <div className="text-sm font-bold text-purple-400" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  310 m
                </div>
                <div className="text-[10px] text-slate-500">05:00 tomorrow</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <ComposedChart data={INVERSION_SERIES} margin={{ top: 4, right: 8, left: -4, bottom: 0 }}>
                <defs>
                  <linearGradient id="pblGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <ReferenceArea y1={0} y2={500} fill="rgba(239,68,68,0.05)"
                  label={{ value: "High trapping risk", position: "insideTopRight", fill: "#ef4444", fontSize: 8 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.06)" />
                <XAxis dataKey="t" tick={{ fill: "#4a6a80", fontSize: 9, fontFamily: "JetBrains Mono" }} interval={2} />
                <YAxis tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  label={{ value: "m", angle: -90, position: "insideLeft", fill: "#4a6a80", fontSize: 9 }} />
                <Tooltip contentStyle={{ background: "#0c1624", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11 }} />
                <Area type="monotone" dataKey="pbl" stroke="#a78bfa" strokeWidth={2}
                  fill="url(#pblGrad)" dot={false} />
                <ReferenceLine y={500} stroke="#f97316" strokeDasharray="4 2" strokeOpacity={0.5}
                  label={{ value: "Moderate risk threshold", position: "right", fill: "#f97316", fontSize: 8 }} />
                <ReferenceLine y={420} stroke="#ef4444" strokeDasharray="4 2" strokeOpacity={0.6}
                  label={{ value: "Current PBL", position: "right", fill: "#ef4444", fontSize: 8 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Impact summary */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">INVERSION IMPACT ON POLLUTION</div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "PM2.5 accumulation rate",  val: "+12% /hr",  color: "#ef4444", desc: "During peak inversion" },
                { label: "Effective mixing depth",    val: "420 m",      color: "#9333ea", desc: "vs 1200m normal" },
                { label: "Transport blocking",        val: "HIGH",       color: "#f97316", desc: "Vertical exchange suppressed" },
              ].map(({ label, val, color, desc }) => (
                <div key={label} className="rounded p-3 border text-center"
                  style={{ background: `${color}08`, borderColor: `${color}25` }}>
                  <div className="text-[10px] text-slate-500 mb-1">{label}</div>
                  <div className="text-sm font-bold font-mono mb-0.5" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                    {val}
                  </div>
                  <div className="text-[9px] text-slate-600">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AtmosphericProfile() {
  return (
    <div className="relative" style={{ height: 200 }}>
      <svg viewBox="0 0 240 200" width="100%" height="100%">
        {/* Background gradient suggesting sky */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1628" />
            <stop offset="45%" stopColor="#0f1d2e" />
            <stop offset="55%" stopColor="#2e1065" />
            <stop offset="65%" stopColor="#1e1047" />
            <stop offset="100%" stopColor="#0a0f1a" />
          </linearGradient>
        </defs>
        <rect width="240" height="200" fill="url(#skyGrad)" rx="4" />

        {/* Altitude labels */}
        {[
          { y: 10, alt: "3000m" },
          { y: 60, alt: "1500m" },
          { y: 100, alt: "850m" },
          { y: 130, alt: "420m" },
          { y: 180, alt: "0m" },
        ].map(({ y, alt }) => (
          <text key={alt} x="8" y={y + 4} fill="#3d6b87" fontSize="8" fontFamily="JetBrains Mono">
            {alt}
          </text>
        ))}

        {/* Altitude tick lines */}
        {[10, 60, 100, 130, 180].map((y) => (
          <line key={y} x1="40" y1={y} x2="240" y2={y} stroke="rgba(56,189,248,0.08)" strokeWidth="0.5" strokeDasharray="3 3" />
        ))}

        {/* Temperature profile line (hotter = more right) */}
        {/* Normal lapse rate (dashed) */}
        <path d="M 160,10 L 80,180" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        {/* Actual profile with inversion */}
        <path d="M 120,10 L 110,58 L 170,105 L 120,132 L 80,180"
          stroke="#f97316" strokeWidth="2.5"
          fill="none"
          style={{ filter: "drop-shadow(0 0 4px rgba(249,115,22,0.5))" }}
        />
        {/* Actual profile dots */}
        {[
          { cx: 120, cy: 10, label: "3°C" },
          { cx: 110, cy: 58, label: "10°C" },
          { cx: 170, cy: 105, label: "23°C" },
          { cx: 120, cy: 132, label: "20°C" },
          { cx: 80,  cy: 180, label: "18°C" },
        ].map(({ cx, cy, label }) => (
          <g key={label}>
            <circle cx={cx} cy={cy} r="3" fill="#f97316" />
            <text x={cx + 5} y={cy + 3} fill="#f97316" fontSize="8" fontFamily="JetBrains Mono">{label}</text>
          </g>
        ))}

        {/* Inversion layer band */}
        <rect x="40" y="92" width="200" height="18" fill="rgba(147,51,234,0.18)"
          stroke="rgba(147,51,234,0.5)" strokeWidth="0.5" strokeDasharray="4 3" />
        <text x="44" y="103" fill="#a78bfa" fontSize="8" fontFamily="JetBrains Mono">
          INVERSION LAYER
        </text>

        {/* PBL height */}
        <rect x="40" y="122" width="200" height="58" fill="rgba(239,68,68,0.05)" />
        <text x="44" y="165" fill="#ef4444" fontSize="7.5" fontFamily="JetBrains Mono">
          PM2.5 particles trapped
        </text>

        {/* PM2.5 particles representation */}
        {[55, 80, 105, 130, 155, 175, 70, 115, 145].map((x, i) => {
          const y = 135 + (i % 3) * 10;
          return (
            <circle key={i} cx={x} cy={y} r={1.5}
              fill="#ef4444" fillOpacity={0.4 + (i % 3) * 0.15}
              className="animate-plume"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          );
        })}

        {/* Warm label */}
        <text x="175" y="102" fill="#f97316" fontSize="7.5" fontFamily="JetBrains Mono">Warm cap</text>
      </svg>
    </div>
  );
}
