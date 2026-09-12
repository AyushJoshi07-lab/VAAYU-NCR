import {
  ComposedChart, Line, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Area,
} from "recharts";
import { VALIDATION } from "@/data/mockData";

const METRICS = [
  { name: "PM2.5 MAE",    val: "Demo metric",     unit: "µg/m³",    status: "demo" as const },
  { name: "PM2.5 RMSE",   val: "Demo metric",     unit: "µg/m³",    status: "demo" as const },
  { name: "AQI Corr.",    val: "Not evaluated",   unit: "",          status: "pending" as const },
  { name: "Forecast bias",val: "Not evaluated",   unit: "",          status: "pending" as const },
  { name: "24H skill",    val: "Not evaluated",   unit: "",          status: "pending" as const },
  { name: "48H skill",    val: "Not evaluated",   unit: "",          status: "pending" as const },
  { name: "72H skill",    val: "Not evaluated",   unit: "",          status: "pending" as const },
  { name: "Hit rate (>300)", val: "Not evaluated",unit: "",          status: "pending" as const },
];

const SCATTER_DATA = VALIDATION.map((d) => ({
  ...d,
  label: d.t,
}));

export default function ModelValidation() {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-100 tracking-tight">Forecast Verification</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Model performance diagnostics and observation–prediction comparison
            </p>
          </div>
          <div className="px-3 py-1.5 rounded border text-[10px] font-mono text-yellow-400"
            style={{ background: "rgba(234,179,8,0.08)", borderColor: "rgba(234,179,8,0.25)", fontFamily: "JetBrains Mono, monospace" }}>
            DEMO / SIMULATED — Not validated operationally
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">

        {/* Scientific integrity banner */}
        <div className="rounded-lg border px-4 py-3 flex items-start gap-3"
          style={{ background: "rgba(56,189,248,0.04)", borderColor: "rgba(56,189,248,0.15)" }}>
          <div className="w-4 h-4 rounded-full border-2 border-sky-400 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] text-sky-400 font-bold">i</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <span className="text-slate-200 font-semibold">Scientific integrity notice: </span>
            This prototype demonstrates the architecture and workflow of the coupled forecasting system.
            All validation metrics marked "Demo metric" or "Not evaluated" have not been computed against
            real observational data. Performance statistics will be populated when the system is connected
            to validated CPCB monitoring stations and operational IMD forecast fields.
          </p>
        </div>

        {/* Main charts row */}
        <div className="grid grid-cols-2 gap-4">

          {/* Forecast vs Observed time series */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-300">Forecast vs Observation (PM2.5)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Previous 72H · Simulated demonstration data</div>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1">
                  <span className="w-4 h-0.5 bg-sky-400 inline-block rounded" /> Observed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-0.5 bg-fuchsia-400 inline-block rounded border-dashed" /> Predicted
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={VALIDATION} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="obsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.06)" />
                <XAxis dataKey="t" tick={{ fill: "#4a6a80", fontSize: 9, fontFamily: "JetBrains Mono" }} />
                <YAxis tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }} domain={[180, 310]} />
                <Tooltip contentStyle={{ background: "#0c1624", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11 }}
                  formatter={(val: number, name: string) => [`${val} µg/m³`, name === "obs" ? "Observed" : "Predicted"]} />
                <Area type="monotone" dataKey="obs" stroke="#38bdf8" strokeWidth={2}
                  fill="url(#obsGrad)" dot={{ r: 3, fill: "#38bdf8" }} />
                <Line type="monotone" dataKey="pred" stroke="#e879f9" strokeWidth={1.5}
                  strokeDasharray="5 3" dot={{ r: 3, fill: "#e879f9" }} />
                <ReferenceLine x="Now" stroke="#22c55e" strokeDasharray="4 2"
                  label={{ value: "Now", position: "top", fill: "#22c55e", fontSize: 9 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter plot: Predicted vs Observed */}
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-300">Predicted vs Observed Scatter</div>
                <div className="text-[10px] text-slate-500 mt-0.5">1:1 line shows perfect forecast</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.06)" />
                <XAxis type="number" dataKey="obs" name="Observed" domain={[180, 300]}
                  tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  label={{ value: "Observed PM2.5", position: "insideBottom", offset: -2, fill: "#4a6a80", fontSize: 9 }} />
                <YAxis type="number" dataKey="pred" name="Predicted" domain={[180, 300]}
                  tick={{ fill: "#4a6a80", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  label={{ value: "Predicted", angle: -90, position: "insideLeft", fill: "#4a6a80", fontSize: 9 }} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{ background: "#0c1624", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: 11 }}
                  formatter={(val: number, name: string) => [`${val} µg/m³`, name === "obs" ? "Observed" : "Predicted"]} />
                {/* Perfect 1:1 reference */}
                <ReferenceLine segment={[{ x: 180, y: 180 }, { x: 300, y: 300 }]}
                  stroke="rgba(56,189,248,0.25)" strokeDasharray="5 3"
                  label={{ value: "1:1", position: "insideTopLeft", fill: "#38bdf8", fontSize: 9 }} />
                <Scatter data={SCATTER_DATA} dataKey="pred" fill="#e879f9" fillOpacity={0.8}
                  r={5} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics table */}
        <div className="rounded-lg border" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
          <div className="px-4 py-3 border-b text-[10px] text-slate-500 font-semibold tracking-widest"
            style={{ borderColor: "rgba(56,189,248,0.08)" }}>
            FORECAST SKILL METRICS
          </div>
          <div className="grid grid-cols-4 divide-x divide-y"
            style={{ borderColor: "rgba(56,189,248,0.06)" }}>
            {METRICS.map(({ name, val, unit, status }) => (
              <div key={name} className="px-4 py-3">
                <div className="text-[10px] text-slate-500 mb-1">{name}</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold font-mono"
                    style={{
                      color: status === "demo" ? "#eab308" : "#3d5a6e",
                      fontFamily: "JetBrains Mono, monospace",
                    }}>
                    {val}
                  </span>
                  {unit && <span className="text-[9px] text-slate-600">{unit}</span>}
                </div>
                <span className="text-[8px] px-1 py-0.5 rounded mt-1 inline-block font-mono"
                  style={{
                    background: status === "demo" ? "rgba(234,179,8,0.1)" : "rgba(56,189,248,0.06)",
                    color: status === "demo" ? "#eab308" : "#38bdf8",
                  }}>
                  {status === "demo" ? "DEMO" : "PENDING"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Model configuration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 tracking-widest mb-3">MODEL CONFIGURATION</div>
            <div className="space-y-2">
              {[
                { label: "Model framework",  val: "Coupled meteo-chemistry (concept)" },
                { label: "Spatial domain",   val: "Delhi NCR + 200km buffer" },
                { label: "Horizontal res.",  val: "~4 km (concept)" },
                { label: "Forecast horizon", val: "72 hours" },
                { label: "Ensemble size",    val: "Demo (single deterministic)" },
                { label: "PBL scheme",       val: "Conceptual (MYJ-type)" },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-start gap-2">
                  <span className="text-[10px] text-slate-500 w-36 shrink-0">{label}</span>
                  <span className="text-[10px] text-slate-400">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4" style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-slate-500 tracking-widest mb-3">VALIDATION ROADMAP</div>
            <div className="space-y-2">
              {[
                { step: "Connect CPCB station data API",     done: false },
                { step: "Ingest IMD NWP forecast fields",    done: false },
                { step: "Run hindcast: June–Sep 2025",       done: false },
                { step: "Compute PM2.5 MAE / RMSE",          done: false },
                { step: "Compute AQI correlation",           done: false },
                { step: "Bias correction calibration",       done: false },
                { step: "Cross-validation (k-fold)",         done: false },
                { step: "Operational deployment test",       done: false },
              ].map(({ step, done }) => (
                <div key={step} className="flex items-center gap-2 text-[10px]">
                  <div className="w-3 h-3 rounded border flex items-center justify-center shrink-0"
                    style={{ borderColor: done ? "#22c55e" : "rgba(56,189,248,0.2)", background: done ? "#22c55e15" : "transparent" }}>
                    {done && <span className="text-green-400 text-[7px]">✓</span>}
                  </div>
                  <span className={done ? "text-slate-300" : "text-slate-600"}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
