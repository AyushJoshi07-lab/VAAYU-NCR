import { useState } from "react";
import {
  ComposedChart, AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea, Legend,
  BarChart,
} from "recharts";
import { FORECAST_72H, SCENARIOS, ATTRIBUTION, AQI_COLOR, AQI_LABEL } from "@/data/mockData";

const POLLUTANT_KEYS: Record<string, { key: keyof typeof FORECAST_72H[0]; label: string; unit: string; color: string }> = {
  aqi:  { key: "aqi",  label: "AQI",    unit: "",         color: "#38bdf8" },
  pm25: { key: "pm25", label: "PM2.5",  unit: "µg/m³",    color: "#f97316" },
  pm10: { key: "pm10", label: "PM10",   unit: "µg/m³",    color: "#eab308" },
  o3:   { key: "o3",   label: "O₃",     unit: "µg/m³",    color: "#22c55e" },
  nox:  { key: "nox",  label: "NOx",    unit: "µg/m³",    color: "#a78bfa" },
};

const SCENARIO_DATA = FORECAST_72H.map((d, i) => ({
  t: d.t,
  "Scenario A": d.aqi,
  "Scenario B": Math.round(d.aqi * (i >= 4 ? 0.82 : 0.92)),
  "Scenario C": Math.round(d.aqi * (i >= 4 ? 1.095 : 1.03)),
  "Scenario D": Math.round(d.aqi * (i >= 4 ? 1.055 : 1.02)),
}));

export default function Forecast72H() {
  const [selected, setSelected] = useState("aqi");
  const [activeTime, setActiveTime] = useState<number | null>(null);
  const poll = POLLUTANT_KEYS[selected];

  const chartData = FORECAST_72H.map((d) => ({
    ...d,
    val: d[poll.key] as number,
  }));

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <h1 className="text-xl font-semibold text-slate-100 tracking-tight">72-Hour Coupled Pollution Forecast</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Atmospheric chemistry–meteorology coupled model · <span className="text-yellow-500">DEMO / SIMULATED FORECAST</span>
        </p>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">

        {/* Pollutant selector + summary */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 rounded-lg border"
            style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            {Object.entries(POLLUTANT_KEYS).map(([k, { label, color }]) => (
              <button
                key={k}
                onClick={() => setSelected(k)}
                className="px-3 py-1.5 rounded text-xs transition-all duration-150 font-mono"
                style={{
                  background: selected === k ? `${color}20` : "transparent",
                  color: selected === k ? color : "#6b90a8",
                  border: selected === k ? `1px solid ${color}40` : "1px solid transparent",
                  fontFamily: "JetBrains Mono, monospace",
                }}>
                {label}
              </button>
            ))}
          </div>

          {/* Peak summary */}
          <div className="ml-auto flex items-center gap-6">
            {[
              { label: "Current",     val: `${FORECAST_72H[0][poll.key]} ${poll.unit}`, sub: AQI_LABEL(FORECAST_72H[0].aqi), color: AQI_COLOR(FORECAST_72H[0].aqi) },
              { label: "Peak (+36H)", val: `${FORECAST_72H[6][poll.key]} ${poll.unit}`, sub: "Tomorrow 07:00–10:00", color: "#9333ea" },
              { label: "+72H Outlook",val: `${FORECAST_72H[12][poll.key]} ${poll.unit}`, sub: "Forecast", color: AQI_COLOR(FORECAST_72H[12].aqi) },
            ].map(({ label, val, sub, color }) => (
              <div key={label} className="text-center">
                <div className="text-[10px] text-slate-500">{label}</div>
                <div className="text-sm font-bold font-mono mt-0.5" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                  {val}
                </div>
                <div className="text-[9px] text-slate-600">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main forecast chart */}
        <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-slate-300">
              {poll.label} Forecast with Confidence Interval
            </div>
            <div className="flex items-center gap-3 text-[10px] text-slate-600">
              <span className="flex items-center gap-1"><span style={{ color: poll.color }}>—</span> Forecast</span>
              <span className="flex items-center gap-1"><span className="text-fuchsia-400">- -</span> Confidence bound</span>
              <span className="flex items-center gap-1"><span className="w-4 h-1.5 rounded-full bg-purple-500/20 inline-block" /> SEVERE</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="pollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={poll.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={poll.color} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              {selected === "aqi" && (
                <>
                  <ReferenceArea y1={0}   y2={200} fill="#22c55e" fillOpacity={0.04} />
                  <ReferenceArea y1={200} y2={300} fill="#f97316" fillOpacity={0.05} />
                  <ReferenceArea y1={300} y2={400} fill="#ef4444" fillOpacity={0.07} />
                  <ReferenceArea y1={400} y2={600} fill="#9333ea" fillOpacity={0.09} />
                </>
              )}
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.06)" />
              <XAxis dataKey="t" tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }} />
              <YAxis tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }} />
              <Tooltip
                contentStyle={{ background: "#0c1624", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11 }}
                labelFormatter={(label, payload) => {
                  const h = payload?.[0]?.payload?.h;
                  return (
                    <span>
                      {label}
                      {h !== undefined && (
                        <span style={{ color: "#38bdf8", fontFamily: "JetBrains Mono, monospace", marginLeft: 8 }}>
                          +{h}hr
                        </span>
                      )}
                    </span>
                  );
                }}
                formatter={(value: number, name: string) => {
                  if (name === "val") return [`${value}${poll.unit ? " " + poll.unit : ""}`, poll.label];
                  if (name === "hi")  return [value, "CI Upper"];
                  if (name === "lo")  return [value, "CI Lower"];
                  return [value, name];
                }}
              />
              <Area type="monotone" dataKey="hi" stroke="none" fill="#e879f9" fillOpacity={0.08} />
              <Area type="monotone" dataKey="lo"
                stroke="#e879f9" strokeDasharray="4 2" strokeWidth={0.8}
                fill="#040c18" fillOpacity={1} />
              <Area type="monotone" dataKey="val"
                stroke={poll.color} strokeWidth={2.5}
                fill="url(#pollGrad)"
                dot={false}
                activeDot={{ r: 5, fill: poll.color, stroke: "#040c18", strokeWidth: 2 }}
              />
              <ReferenceLine x="+36H" stroke="#9333ea" strokeDasharray="4 2" strokeOpacity={0.7}
                label={{ value: "PEAK", position: "insideTopRight", fill: "#9333ea", fontSize: 9 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline selector + Why rising */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">FORECAST TIMELINE</div>
            <div className="grid grid-cols-3 gap-2">
              {FORECAST_72H.filter((_, i) => [0, 2, 4, 6, 8, 10, 12].includes(i)).map((d) => (
                <button
                  key={d.t}
                  onClick={() => setActiveTime(activeTime === d.h ? null : d.h)}
                  className="rounded p-2 text-center transition-all duration-150 border"
                  style={{
                    background: activeTime === d.h ? `${AQI_COLOR(d.aqi)}15` : "rgba(255,255,255,0.02)",
                    borderColor: activeTime === d.h ? `${AQI_COLOR(d.aqi)}50` : "rgba(255,255,255,0.04)",
                  }}>
                  <div className="text-[10px] font-mono text-slate-500">{d.t}</div>
                  <div className="text-sm font-bold font-mono mt-0.5" style={{ color: AQI_COLOR(d.aqi), fontFamily: "JetBrains Mono, monospace" }}>
                    {d.aqi}
                  </div>
                  <div className="text-[9px] mt-0.5" style={{ color: AQI_COLOR(d.aqi) }}>
                    {AQI_LABEL(d.aqi)}
                  </div>
                </button>
              ))}
            </div>
            {activeTime !== null && (() => {
              const d = FORECAST_72H.find((x) => x.h === activeTime)!;
              return (
                <div className="mt-3 p-3 rounded text-[11px]"
                  style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.1)" }}>
                  <div className="font-semibold text-slate-200 mb-1">{d.t} — AQI {d.aqi} · {AQI_LABEL(d.aqi)}</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-slate-500">
                    <span>PM2.5: <span className="text-orange-400 font-mono">{d.pm25} µg/m³</span></span>
                    <span>PM10: <span className="text-yellow-400 font-mono">{d.pm10} µg/m³</span></span>
                    <span>O₃: <span className="text-green-400 font-mono">{d.o3} µg/m³</span></span>
                    <span>NOx: <span className="text-purple-400 font-mono">{d.nox} µg/m³</span></span>
                    <span>CI low: <span className="text-fuchsia-400 font-mono">{d.lo}</span></span>
                    <span>CI high: <span className="text-fuchsia-400 font-mono">{d.hi}</span></span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Forecast drivers */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 font-semibold tracking-widest mb-3">FORECAST DRIVERS</div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={ATTRIBUTION} layout="vertical" margin={{ left: 12, right: 40, top: 0, bottom: 0 }}>
                <XAxis type="number" domain={[0, 40]} tick={{ fill: "#4a6a80", fontSize: 9 }} />
                <YAxis type="category" dataKey="driver" width={130}
                  tick={{ fill: "#6b90a8", fontSize: 10, fontFamily: "Inter" }} />
                <CartesianGrid horizontal={false} stroke="rgba(56,189,248,0.05)" />
                <Tooltip contentStyle={{ background: "#0c1624", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11 }} />
                <Bar dataKey="pct" radius={[0, 3, 3, 0]} label={{ position: "right", fill: "#6b90a8", fontSize: 9, formatter: (v: number) => `${v}%` }}>
                  {ATTRIBUTION.map(({ driver, color }) => (
                    <rect key={driver} fill={color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-slate-600 leading-relaxed mt-2">
              Stable atmospheric conditions and shallow PBL are expected to restrict vertical mixing.
              Weak winds may allow transported PM to accumulate over NCR during early morning.
            </p>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-slate-300">What-If Scenario Analysis</div>
              <div className="text-[10px] text-slate-600 mt-0.5">
                Scenario outputs are model estimates for decision support, not official forecasts.
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {SCENARIOS.map(({ name, label, peak, color }) => (
              <div key={name} className="rounded p-3 border"
                style={{ background: `${color}08`, borderColor: `${color}30` }}>
                <div className="text-[9px] font-mono text-slate-600 mb-0.5">{name}</div>
                <div className="text-[10px] text-slate-400 mb-2">{label}</div>
                <div className="text-xl font-bold font-mono" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                  {peak}
                </div>
                <div className="text-[9px] text-slate-600">AQI peak · +36H</div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <ComposedChart data={SCENARIO_DATA} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.06)" />
              <XAxis dataKey="t" tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }} />
              <YAxis tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }} domain={[200, 520]} />
              <Tooltip contentStyle={{ background: "#0c1624", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#6b90a8" }} />
              {SCENARIOS.map(({ name, color }) => (
                <Area key={name} type="monotone" dataKey={name} stroke={color} strokeWidth={1.5}
                  fill={name === "Scenario A" ? `${color}12` : "none"}
                  dot={false} />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
