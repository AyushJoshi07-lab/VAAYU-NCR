import { useState } from "react";
import Sidebar, { type Screen } from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import NotificationPanel from "@/components/NotificationPanel";
import CommandCenter from "@/screens/CommandCenter";
import Forecast72H from "@/screens/Forecast72H";
import CouplingEngine from "@/screens/CouplingEngine";
import PollutionMap from "@/screens/PollutionMap";
import PlumeTracker from "@/screens/PlumeTracker";
import InversionMonitor from "@/screens/InversionMonitor";
import Hotspots from "@/screens/Hotspots";
import Alerts from "@/screens/Alerts";
import ModelValidation from "@/screens/ModelValidation";

const SCREENS: Record<Screen, React.ComponentType<{ onNavigate: (s: string) => void }>> = {
  command:    CommandCenter,
  forecast:   (props) => <Forecast72H />,
  coupling:   (props) => <CouplingEngine />,
  map:        (props) => <PollutionMap />,
  plume:      (props) => <PlumeTracker />,
  inversion:  (props) => <InversionMonitor />,
  hotspots:   (props) => <Hotspots />,
  alerts:     (props) => <Alerts />,
  validation: (props) => <ModelValidation />,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("command");
  const [notifOpen, setNotifOpen] = useState(false);

  const navigate = (s: string) => {
    if (s in SCREENS) {
      setScreen(s as Screen);
    }
  };

  const ScreenComponent = SCREENS[screen];

  return (
    <div className="h-full flex overflow-hidden" style={{ background: "#040c18" }}>
      <Sidebar active={screen} onSelect={setScreen} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="relative">
          <TopBar screen={screen} onBellClick={() => setNotifOpen((v) => !v)} />
          {notifOpen && (
            <NotificationPanel onClose={() => setNotifOpen(false)} />
          )}
        </div>

        <main className="flex-1 overflow-y-auto" style={{ background: "#060d1b" }}>
          <ScreenComponent onNavigate={navigate} />
        </main>
      </div>
    </div>
  );
}
