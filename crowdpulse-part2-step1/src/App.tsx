import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import CommandCenter from "./pages/CommandCenter";
import LiveMonitoring from "./pages/LiveMonitoring";
import VenueMapPage from "./pages/VenueMapPage";
import ZoneAnalytics from "./pages/ZoneAnalytics";
import Alerts from "./pages/Alerts";
import CongestionForecast from "./pages/CongestionForecast";
import RouteRecommendations from "./pages/RouteRecommendations";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-base">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <TopBar />
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<CommandCenter />} />
              <Route path="/monitoring" element={<LiveMonitoring />} />
              <Route path="/venue-map" element={<VenueMapPage />} />
              <Route path="/analytics" element={<ZoneAnalytics />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/forecast" element={<CongestionForecast />} />
              <Route path="/recommendations" element={<RouteRecommendations />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
