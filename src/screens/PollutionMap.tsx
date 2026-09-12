import { memo, useState } from "react";
import { STATIONS, AQI_COLOR, AQI_LABEL, CURRENT } from "@/data/mockData";

type Pollutant = "aqi" | "pm25" | "pm10" | "o3" | "nox";
type MapLayer = "observed" | "forecast" | "plume" | "inversion" | "pbl";
type TimeSlot = "now" | "+24h" | "+48h" | "+72h";

const TIME_MULT: Record<TimeSlot, number> = { "now": 1, "+24h": 1.4, "+48h": 1.28, "+72h": 0.96 };

const POLL_LABEL: Record<Pollutant, string> = {
  aqi: "AQI", pm25: "PM2.5", pm10: "PM10", o3: "O₃", nox: "NOx",
};

const AREAS = [
  { name: "Central Delhi",  cx: 295, cy: 238, r: 48 },
  { name: "North Delhi",    cx: 300, cy: 192, r: 36 },
  { name: "South Delhi",    cx: 292, cy: 290, r: 38 },
  { name: "East Delhi",     cx: 355, cy: 228, r: 32 },
  { name: "West Delhi",     cx: 252, cy: 248, r: 34 },
];

export default function PollutionMap() {
  const [pollutant, setPollutant] = useState<Pollutant>("aqi");
  const [layer, setLayer] = useState<MapLayer>("observed");
  const [time, setTime] = useState<TimeSlot>("now");
  const [hovered, setHovered] = useState<string | null>(null);

  const mult = TIME_MULT[time];
  const layerModifier = layer === "forecast" ? mult : layer === "inversion" ? 1.1 : 1;

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <h1 className="text-xl font-semibold text-slate-100 tracking-tight">Delhi NCR Pollution Intelligence Map</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Spatial AQI analysis, hotspot detection, and forecast grid · DEMO / SIMULATED DATA
        </p>
      </div>

      <div className="flex-1 px-4 py-4 flex flex-col gap-4">

        {/* Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <ControlGroup label="POLLUTANT"
            options={["aqi", "pm25", "pm10", "o3", "nox"] as Pollutant[]}
            labelMap={POLL_LABEL}
            active={pollutant}
            onSelect={(v) => setPollutant(v as Pollutant)}
            colors={{ aqi: "#38bdf8", pm25: "#f97316", pm10: "#eab308", o3: "#22c55e", nox: "#a78bfa" }}
          />
          <ControlGroup label="TIME"
            options={["now", "+24h", "+48h", "+72h"] as TimeSlot[]}
            labelMap={{ "now": "Now", "+24h": "+24H", "+48h": "+48H", "+72h": "+72H" }}
            active={time}
            onSelect={(v) => setTime(v as TimeSlot)}
            colors={{ "now": "#38bdf8", "+24h": "#f97316", "+48h": "#ef4444", "+72h": "#a78bfa" }}
          />
          <ControlGroup label="LAYER"
            options={["observed", "forecast", "plume", "inversion", "pbl"] as MapLayer[]}
            labelMap={{ observed: "Observed", forecast: "Forecast", plume: "Plume", inversion: "Inversion", pbl: "PBL" }}
            active={layer}
            onSelect={(v) => setLayer(v as MapLayer)}
            colors={{ observed: "#38bdf8", forecast: "#a78bfa", plume: "#e879f9", inversion: "#9333ea", pbl: "#22d3ee" }}
          />
        </div>

        {/* Map + station list */}
        <div className="flex-1 grid gap-4" style={{ gridTemplateColumns: "1fr 240px" }}>

          {/* SVG Map */}
          <div className="rounded-lg border overflow-hidden relative"
            style={{ background: "#080f1e", borderColor: "rgba(56,189,248,0.12)" }}>

            {/* Legend */}
            <div className="absolute top-3 left-3 z-10">
              <div className="text-[9px] text-slate-500 tracking-wider mb-1">AQI SCALE</div>
              {[
                { label: "Good", color: "#22c55e" },
                { label: "Moderate", color: "#eab308" },
                { label: "Poor", color: "#f97316" },
                { label: "Very Poor", color: "#ef4444" },
                { label: "Severe", color: "#9333ea" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5 mb-0.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color, opacity: 0.7 }} />
                  <span className="text-[9px] text-slate-500">{label}</span>
                </div>
              ))}
            </div>

            {/* Layer badge */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <span className="text-[9px] px-2 py-1 rounded border font-mono"
                style={{
                  background: "rgba(56,189,248,0.08)",
                  borderColor: "rgba(56,189,248,0.2)",
                  color: "#38bdf8",
                  fontFamily: "JetBrains Mono, monospace",
                }}>
                {POLL_LABEL[pollutant]} · {time.toUpperCase()} · {layer.toUpperCase()}
              </span>
              <span className="text-[9px] px-2 py-1 rounded border font-mono text-yellow-400"
                style={{ background: "rgba(234,179,8,0.08)", borderColor: "rgba(234,179,8,0.2)" }}>
                DEMO
              </span>
            </div>

            <DelhiNCRMap
              pollutant={pollutant}
              layerModifier={layerModifier}
              layer={layer}
              hovered={hovered}
              onHover={setHovered}
            />

            {/* Hovered station tooltip */}
            {hovered && (() => {
              const st = STATIONS.find((s) => s.name === hovered);
              if (!st) return null;
              const aqi = Math.round(st.aqi * layerModifier);
              return (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded border text-xs"
                  style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.2)" }}>
                  <span className="text-slate-300 font-semibold mr-2">{hovered}</span>
                  <span className="font-mono" style={{ color: AQI_COLOR(aqi) }}>AQI {aqi} · {AQI_LABEL(aqi)}</span>
                </div>
              );
            })()}
          </div>

          {/* Station list */}
          <div className="rounded-lg border flex flex-col"
            style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="px-4 py-3 border-b text-[10px] text-slate-500 font-semibold tracking-widest"
              style={{ borderColor: "rgba(56,189,248,0.08)" }}>
              MONITORING STATIONS
            </div>
            <div className="flex-1 overflow-y-auto">
              {STATIONS.sort((a, b) => b.aqi - a.aqi).map(({ name, aqi }) => {
                const dispAqi = Math.round(aqi * layerModifier);
                const color = AQI_COLOR(dispAqi);
                return (
                  <button
                    key={name}
                    className="w-full flex items-center gap-3 px-4 py-2.5 border-b text-left transition-colors hover:bg-white/3"
                    style={{ borderColor: "rgba(56,189,248,0.05)" }}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}>
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-300 truncate">{name}</div>
                      <div className="text-[9px] mt-0.5" style={{ color: AQI_LABEL(dispAqi) === "SEVERE" ? "#9333ea" : "#4a6a80" }}>
                        {AQI_LABEL(dispAqi)}
                      </div>
                    </div>
                    <div className="text-sm font-bold font-mono shrink-0" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
                      {dispAqi}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-3 border-t text-center text-[10px] text-slate-600"
              style={{ borderColor: "rgba(56,189,248,0.08)" }}>
              {STATIONS.length} stations · DEMO data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlGroup<T extends string>({ label, options, labelMap, active, onSelect, colors }: {
  label: string;
  options: T[];
  labelMap: Record<T, string>;
  active: T;
  onSelect: (v: T) => void;
  colors: Record<T, string>;
}) {
  return (
    <div>
      <div className="text-[9px] text-slate-600 tracking-widest mb-1">{label}</div>
      <div className="flex items-center gap-1 p-1 rounded border"
        style={{ background: "#0c1624", borderColor: "rgba(56,189,248,0.1)" }}>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="px-2.5 py-1 rounded text-[10px] transition-all duration-150 font-mono"
            style={{
              background: active === opt ? `${colors[opt]}18` : "transparent",
              color: active === opt ? colors[opt] : "#4a6a80",
              border: active === opt ? `1px solid ${colors[opt]}40` : "1px solid transparent",
              fontFamily: "JetBrains Mono, monospace",
            }}>
            {labelMap[opt]}
          </button>
        ))}
      </div>
    </div>
  );
}

const DelhiNCRMap = memo(function DelhiNCRMap({ pollutant, layerModifier, layer, hovered, onHover }: {
  pollutant: Pollutant;
  layerModifier: number;
  layer: MapLayer;
  hovered: string | null;
  onHover: (n: string | null) => void;
}) {
  return (
    <svg viewBox="0 0 680 520" width="100%" height="100%" style={{ minHeight: 340 }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g id="base-map">
        <path d="M 60,80 L 200,60 L 240,160 L 220,300 L 180,360 L 80,340 L 40,240 Z"
          fill="#0a1422" stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
        <text x="90" y="200" fill="#1e3a57" fontSize="12" fontFamily="Inter">Haryana</text>
        <path d="M 440,80 L 600,80 L 620,300 L 560,400 L 420,380 L 390,280 L 410,180 Z"
          fill="#0a1422" stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
        <text x="490" y="220" fill="#1e3a57" fontSize="12" fontFamily="Inter">Uttar Pradesh</text>
        <path d="M 40,340 L 180,360 L 220,440 L 160,500 L 40,500 Z"
          fill="#080f1a" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
        <text x="70" y="430" fill="#14283c" fontSize="11" fontFamily="Inter">Rajasthan</text>
        <path d="M 220,140 L 370,130 L 420,180 L 420,300 L 360,370 L 220,370 L 175,280 L 180,180 Z"
          fill="#0d1a2c" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" />
        <text x="290" y="125" fill="rgba(56,189,248,0.5)" fontSize="10" fontFamily="Inter" fontWeight="600">
          DELHI NCR
        </text>
      </g>

      <g id="heat-overlay">
        {layer !== "pbl" && AREAS.map(({ name, cx, cy, r }, i) => {
          const baseAqi = [287, 278, 260, 355, 248][i];
          const aqi = Math.round(baseAqi * layerModifier);
          const color = AQI_COLOR(aqi);
          const radius = r * (0.8 + (aqi / 500) * 0.5);
          return (
            <circle key={name} cx={cx} cy={cy} r={radius}
              fill={color} fillOpacity={0.12}
              className="animate-plume"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          );
        })}
      </g>

      <g id="layer-overlay">
        {layer === "pbl" && (
          <>
            <rect x="175" y="140" width="245" height="230"
              fill="rgba(167,139,250,0.06)" stroke="rgba(167,139,250,0.3)" strokeWidth="1" strokeDasharray="5 3" />
            <text x="230" y="165" fill="#a78bfa" fontSize="9" fontFamily="JetBrains Mono">PBL: 420m (compressed)</text>
          </>
        )}
        {layer === "plume" && (
          <>
            <path d="M 60,100 Q 200,150 280,230"
              stroke="#e879f9" strokeWidth="2" fill="none" strokeDasharray="6 3"
              style={{ filter: "drop-shadow(0 0 4px rgba(232,121,249,0.6))" }}
            />
            <circle cx="60" cy="100" r="6" fill="#e879f9" fillOpacity={0.4} className="animate-pulse" />
            <text x="65" y="90" fill="#e879f9" fontSize="8" fontFamily="JetBrains Mono">NW source</text>
            <path d="M 272,222 L 280,238 L 288,222" fill="none" stroke="#e879f9" strokeWidth="2" />
          </>
        )}
        {layer === "inversion" && (
          <rect x="175" y="155" width="245" height="15"
            fill="rgba(147,51,234,0.25)" stroke="rgba(147,51,234,0.6)" strokeWidth="1" strokeDasharray="4 2" />
        )}
      </g>

      <g id="area-labels">
        <text x="410" y="172" fill="#2a4a65" fontSize="10" fontFamily="Inter" fontStyle="italic">Ghaziabad</text>
        <text x="390" y="260" fill="#2a4a65" fontSize="10" fontFamily="Inter" fontStyle="italic">Noida</text>
        <text x="194" y="305" fill="#2a4a65" fontSize="10" fontFamily="Inter" fontStyle="italic">Gurugram</text>
        <text x="325" y="355" fill="#2a4a65" fontSize="10" fontFamily="Inter" fontStyle="italic">Faridabad</text>
        <text x="268" y="255" fill="#2a4a65" fontSize="10" fontFamily="Inter" fontStyle="italic">Delhi</text>
      </g>

      <g id="station-markers">
        {STATIONS.map(({ name, aqi, cx, cy }) => {
          const dispAqi = Math.round(aqi * layerModifier);
          const color = AQI_COLOR(dispAqi);
          const isHov = hovered === name;
          return (
            <g key={name} style={{ cursor: "pointer" }}
              onMouseEnter={() => onHover(name)}
              onMouseLeave={() => onHover(null)}>
              {dispAqi > 350 && (
                <circle cx={cx} cy={cy} r="10" fill={color} fillOpacity={0.15} className="animate-pulse" />
              )}
              <circle cx={cx} cy={cy} r={isHov ? 7 : 5}
                fill={color} fillOpacity={0.9}
                stroke={isHov ? "#fff" : "#000"} strokeWidth={isHov ? 1.5 : 0.5}
                filter={dispAqi > 350 ? "url(#glow)" : undefined}
                style={{ transition: "r 0.15s" }}
              />
              {isHov && (
                <text x={cx + 9} y={cy + 4} fill={color} fontSize="9"
                  fontFamily="JetBrains Mono" fontWeight="600">
                  {name}: {dispAqi}
                </text>
              )}
            </g>
          );
        })}
      </g>

      <g id="wind-indicator">
        <text x="590" y="40" fill="#22d3ee" fontSize="9" fontFamily="JetBrains Mono">Wind</text>
        <text x="590" y="52" fill="#22d3ee" fontSize="9" fontFamily="JetBrains Mono">2.1m/s NW</text>
        <line x1="610" y1="58" x2="610" y2="80" stroke="#22d3ee" strokeWidth="1.5" />
        <path d="M 605 75 L 610 82 L 615 75" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
      </g>
    </svg>
  );
});
