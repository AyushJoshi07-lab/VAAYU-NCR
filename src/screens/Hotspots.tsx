import { useState } from "react";
import { ArrowUpRight, MapPin, Info } from "lucide-react";
import { HOTSPOTS, AQI_COLOR, AQI_LABEL } from "@/data/mockData";

const RISK_COLORS: Record<string, string> = {
  "SEVERE":    "#9333ea",
  "VERY POOR": "#ef4444",
  "POOR":      "#f97316",
};

export default function Hotspots() {
  const [selected, setSelected] = useState<number>(0);
  const selectedSpot = HOTSPOTS[selected];

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-6 pt-5 pb-4 border-b" style={{ borderColor: "rgba(56,189,248,0.08)" }}>
        <h1 className="text-xl font-semibold text-slate-100 tracking-tight">Emerging Pollution Hotspots</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Ranked by predicted deterioration — not current AQI · DEMO / SIMULATED FORECAST
        </p>
      </div>

      <div className="flex-1 px-4 py-4 grid gap-4" style={{ gridTemplateColumns: "1fr 300px" }}>

        {/* Hotspot list */}
        <div className="space-y-3">
          <div className="text-[10px] text-slate-600 px-1 flex items-center gap-2">
            <Info className="w-3 h-3 text-sky-400" />
            Rankings reflect predicted 24-hour AQI change relative to current conditions.
          </div>

          {HOTSPOTS.map((spot, i) => {
            const isSelected = selected === i;
            const riskColor = RISK_COLORS[spot.risk] ?? "#f97316";
            return (
              <button
                key={spot.name}
                onClick={() => setSelected(i)}
                className="w-full text-left rounded-lg border p-4 transition-all duration-150"
                style={{
                  background: isSelected ? `${riskColor}0a` : "#0c1624",
                  borderColor: isSelected ? `${riskColor}40` : "rgba(56,189,248,0.1)",
                }}>
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div className="text-2xl font-bold font-mono shrink-0 w-10 text-center leading-none mt-0.5"
                    style={{ color: isSelected ? riskColor : "#1e3a57", fontFamily: "JetBrains Mono, monospace" }}>
                    {String(spot.rank).padStart(2, "0")}
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-200">{spot.name}</span>
                      <span className="text-[9px] text-slate-600 flex items-center gap-0.5">
                        <MapPin className="w-2.5 h-2.5" /> {spot.zone}
                      </span>
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: `${riskColor}15`, color: riskColor }}>
                        {spot.risk}
                      </span>
                    </div>

                    {/* AQI bars */}
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">Now</span>
                        <div className="flex items-center gap-1">
                          <div className="h-5 rounded" style={{
                            width: `${(spot.aqi / 500) * 90}px`,
                            background: AQI_COLOR(spot.aqi),
                            opacity: 0.7,
                            minWidth: 30,
                          }} />
                          <span className="text-sm font-bold font-mono" style={{ color: AQI_COLOR(spot.aqi), fontFamily: "JetBrains Mono, monospace" }}>
                            {spot.aqi}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-red-400 shrink-0" />
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">24H forecast</span>
                        <div className="flex items-center gap-1">
                          <div className="h-5 rounded" style={{
                            width: `${(spot.fcast / 500) * 90}px`,
                            background: AQI_COLOR(spot.fcast),
                            minWidth: 30,
                          }} />
                          <span className="text-sm font-bold font-mono" style={{ color: AQI_COLOR(spot.fcast), fontFamily: "JetBrains Mono, monospace" }}>
                            {spot.fcast}
                          </span>
                        </div>
                      </div>
                      <span className="ml-auto text-sm font-bold text-red-400 font-mono"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        +{spot.delta}%
                      </span>
                    </div>

                    {/* Drivers */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] text-slate-600">Drivers:</span>
                      {spot.drivers.map((d) => (
                        <span key={d} className="text-[9px] px-1.5 py-0.5 rounded-full text-slate-400"
                          style={{ background: "rgba(255,255,255,0.05)" }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Why these locations note */}
          <div className="rounded-lg border p-4 mt-2"
            style={{ background: "rgba(56,189,248,0.04)", borderColor: "rgba(56,189,248,0.12)" }}>
            <div className="text-[10px] text-sky-400 font-semibold tracking-widest mb-1.5">WHY THESE LOCATIONS?</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Predicted hotspots depend on local emissions inventory, meteorological trapping potential
              (PBL height + stability class), regional transport contribution, and atmospheric mixing efficiency.
              Locations near industrial clusters or high-traffic corridors are weighted higher when dispersion
              conditions are suppressed.
            </p>
          </div>
        </div>

        {/* Right: selected hotspot detail */}
        <div className="space-y-4">
          <div className="rounded-lg border p-4 sticky top-0"
            style={{ background: "#0c1624", borderColor: `${RISK_COLORS[selectedSpot.risk] ?? "#f97316"}40` }}>
            <div className="text-[9px] text-slate-600 tracking-widest mb-2">SELECTED LOCATION</div>
            <div className="text-lg font-semibold text-slate-200 mb-0.5">{selectedSpot.name}</div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mb-4">
              <MapPin className="w-3 h-3" /> {selectedSpot.zone}
            </div>

            {/* AQI comparison */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="rounded p-3 text-center border"
                style={{ background: `${AQI_COLOR(selectedSpot.aqi)}10`, borderColor: `${AQI_COLOR(selectedSpot.aqi)}30` }}>
                <div className="text-[9px] text-slate-600 mb-1">Current AQI</div>
                <div className="text-2xl font-bold font-mono" style={{ color: AQI_COLOR(selectedSpot.aqi), fontFamily: "JetBrains Mono, monospace" }}>
                  {selectedSpot.aqi}
                </div>
                <div className="text-[9px] mt-0.5" style={{ color: AQI_COLOR(selectedSpot.aqi) }}>
                  {AQI_LABEL(selectedSpot.aqi)}
                </div>
              </div>
              <div className="rounded p-3 text-center border"
                style={{ background: `${AQI_COLOR(selectedSpot.fcast)}10`, borderColor: `${AQI_COLOR(selectedSpot.fcast)}30` }}>
                <div className="text-[9px] text-slate-600 mb-1">24H Forecast</div>
                <div className="text-2xl font-bold font-mono" style={{ color: AQI_COLOR(selectedSpot.fcast), fontFamily: "JetBrains Mono, monospace" }}>
                  {selectedSpot.fcast}
                </div>
                <div className="text-[9px] mt-0.5" style={{ color: AQI_COLOR(selectedSpot.fcast) }}>
                  {AQI_LABEL(selectedSpot.fcast)}
                </div>
              </div>
            </div>

            {/* Change indicator */}
            <div className="flex items-center gap-3 mb-4 rounded p-2.5"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <ArrowUpRight className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-lg font-bold text-red-400 font-mono"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  +{selectedSpot.delta}%
                </div>
                <div className="text-[9px] text-slate-500">Predicted deterioration</div>
              </div>
              <div className="ml-auto px-2 py-1 rounded text-xs font-bold"
                style={{
                  background: `${RISK_COLORS[selectedSpot.risk] ?? "#f97316"}15`,
                  color: RISK_COLORS[selectedSpot.risk] ?? "#f97316",
                }}>
                {selectedSpot.risk}
              </div>
            </div>

            {/* Primary drivers */}
            <div className="text-[10px] text-slate-500 tracking-widest mb-2">PRIMARY DRIVERS</div>
            <div className="space-y-1.5">
              {selectedSpot.drivers.map((d, i) => (
                <div key={d} className="flex items-center gap-2 text-[10px]">
                  <span className="font-mono text-slate-600">{i + 1}.</span>
                  <span className="text-slate-400">{d}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 space-y-1.5">
              <button className="w-full py-2 rounded text-xs font-semibold transition-colors"
                style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)", color: "#38bdf8" }}>
                View on Map
              </button>
              <button className="w-full py-2 rounded text-xs font-semibold transition-colors"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}>
                Generate Advisory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
