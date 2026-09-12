import {
  LayoutDashboard, TrendingUp, Cpu, Map, Wind, Waves,
  Flame, Bell, FlaskConical, Database, Settings, Radio,
  ChevronRight,
} from "lucide-react";

export type Screen =
  | "command"
  | "forecast"
  | "coupling"
  | "map"
  | "plume"
  | "inversion"
  | "hotspots"
  | "alerts"
  | "validation";

const NAV: {
  group: string;
  items: { id: Screen; label: string; icon: React.ElementType; badge?: string }[];
}[] = [
  {
    group: "MONITOR",
    items: [
      { id: "command",   label: "Command Center",    icon: LayoutDashboard },
      { id: "forecast",  label: "72H Forecast",      icon: TrendingUp },
      { id: "coupling",  label: "Coupling Engine",   icon: Cpu },
    ],
  },
  {
    group: "SPATIAL",
    items: [
      { id: "map",       label: "Pollution Map",     icon: Map },
      { id: "plume",     label: "Plume Tracker",     icon: Wind },
    ],
  },
  {
    group: "ANALYSIS",
    items: [
      { id: "inversion", label: "Inversion Monitor", icon: Waves },
      { id: "hotspots",  label: "Hotspots",          icon: Flame },
      { id: "alerts",    label: "Alerts",            icon: Bell, badge: "3" },
    ],
  },
  {
    group: "SCIENCE",
    items: [
      { id: "validation", label: "Model Validation", icon: FlaskConical },
    ],
  },
];

interface Props {
  active: Screen;
  onSelect: (s: Screen) => void;
}

export default function Sidebar({ active, onSelect }: Props) {
  return (
    <aside className="w-56 shrink-0 flex flex-col h-full border-r"
      style={{ background: "#060d1c", borderColor: "rgba(56,189,248,0.1)" }}>

      {/* Logo */}
      <div className="px-4 py-5 border-b flex items-center gap-3"
        style={{ borderColor: "rgba(56,189,248,0.1)" }}>
        <div className="relative w-8 h-8 shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-sky-400"
            style={{ borderStyle: "solid" }} />
          <div className="absolute inset-1 rounded-full bg-sky-400/20" />
          <Radio className="absolute inset-0 m-auto w-4 h-4 text-sky-400" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-widest text-sky-300"
            style={{ fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.12em" }}>
            VAAYU NCR
          </div>
          <div className="text-[9px] text-slate-500 tracking-wider mt-0.5">
            COUPLED AIR INTELLIGENCE
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV.map(({ group, items }) => (
          <div key={group} className="mb-4">
            <div className="px-2 mb-1 text-[9px] font-semibold tracking-widest text-slate-600">
              {group}
            </div>
            {items.map(({ id, label, icon: Icon, badge }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-all duration-150 group relative"
                  style={{
                    background: isActive ? "rgba(56,189,248,0.1)" : "transparent",
                    color: isActive ? "#38bdf8" : "#6b90a8",
                  }}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r"
                      style={{ background: "#38bdf8" }} />
                  )}
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="flex-1 text-left" style={{ fontWeight: isActive ? 500 : 400 }}>
                    {label}
                  </span>
                  {badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono">
                      {badge}
                    </span>
                  )}
                  {!isActive && (
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer status */}
      <div className="px-3 py-3 border-t space-y-2"
        style={{ borderColor: "rgba(56,189,248,0.1)" }}>
        <StatusRow icon="●" label="Data Status" value="DEMO" color="#eab308" />
        <StatusRow icon="◉" label="Model Status" value="ACTIVE" color="#22c55e" />
        <StatusRow icon="⏱" label="Last Update" value="20:42 IST" color="#38bdf8" />
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-slate-500 hover:text-slate-300 transition-colors mt-1">
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

function StatusRow({ icon, label, value, color }: {
  icon: string; label: string; value: string; color: string;
}) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-1.5">
        <span className="text-[8px]" style={{ color }}>{icon}</span>
        <span className="text-[10px] text-slate-600">{label}</span>
      </div>
      <span className="text-[9px] font-mono" style={{ color, fontFamily: "JetBrains Mono, monospace" }}>
        {value}
      </span>
    </div>
  );
}
