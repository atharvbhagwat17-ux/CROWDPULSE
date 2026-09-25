import { useMemo, useState } from "react";
import CameraFeedPanel from "../components/CameraFeedPanel";
import MetricChart from "../components/MetricChart";
import RiskBadge from "../components/RiskBadge";
import { cameras, zones } from "../data/mockData";
import { generateSeries } from "../utils/generateSeries";

export default function LiveMonitoring() {
  const [selectedCameraId, setSelectedCameraId] = useState(cameras[0].id);
  const camera = cameras.find((c) => c.id === selectedCameraId)!;
  const zone = zones.find((z) => z.id === camera.zoneId);

  const series = useMemo(
    () =>
      zone
        ? generateSeries(20, {
            occupancy: zone.occupancy,
            density: zone.density,
            averageSpeed: zone.averageSpeed,
            inflow: zone.inflow,
            outflow: zone.outflow,
          })
        : [],
    [zone]
  );

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Live Monitoring</h1>
        <p className="text-sm text-text-muted mt-0.5">Camera feeds and per-camera crowd readouts</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr_260px] gap-4 items-start">
        {/* camera selector */}
        <div className="flex xl:flex-col gap-1.5 overflow-x-auto xl:overflow-visible">
          {cameras.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCameraId(c.id)}
              className={`shrink-0 text-left px-3 py-2 rounded-sm border text-xs transition-colors ${
                c.id === selectedCameraId
                  ? "border-risk-info/40 bg-risk-info/10 text-text"
                  : "border-border bg-panel text-text-muted hover:text-text hover:bg-panel2"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${c.status === "ONLINE" ? "bg-risk-low" : "bg-text-faint"}`}
                />
                {c.name}
              </div>
            </button>
          ))}
        </div>

        {/* main feed */}
        <div className="flex flex-col gap-3">
          <CameraFeedPanel camera={camera} zone={zone} />
          <MetricChart
            data={series}
            series={[
              { dataKey: "occupancy", name: "Occupancy", color: "#4C8DFF" },
              { dataKey: "density", name: "Density %", color: "#D9A441" },
            ]}
          />
        </div>

        {/* info panel */}
        <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-3">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Camera</span>
          <span className="text-sm font-medium -mt-2">{camera.name}</span>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
            <div>
              <span className="text-2xs text-text-muted block">Status</span>
              <span className={`font-mono text-sm ${camera.status === "ONLINE" ? "text-risk-low" : "text-text-faint"}`}>
                {camera.status}
              </span>
            </div>
            <div>
              <span className="text-2xs text-text-muted block">People</span>
              <span className="font-mono text-sm">{camera.peopleDetected}</span>
            </div>
            <div>
              <span className="text-2xs text-text-muted block">Density</span>
              <span className="font-mono text-sm">{zone ? `${zone.density}%` : "—"}</span>
            </div>
            <div>
              <span className="text-2xs text-text-muted block">Avg. Speed</span>
              <span className="font-mono text-sm">{zone ? `${zone.averageSpeed} m/s` : "—"}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="text-2xs text-text-muted">Risk</span>
            <RiskBadge risk={camera.risk} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}
