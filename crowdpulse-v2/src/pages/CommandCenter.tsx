import { useState } from "react";
import { Users, Grid3x3, AlertTriangle, Camera, Gauge, BellRing } from "lucide-react";
import KpiCard from "../components/KpiCard";
import VenueMap from "../components/VenueMap";
import AlertCard from "../components/AlertCard";
import { zones as initialZones, alerts, systemStats } from "../data/mockData";
import type { Zone } from "../types";

export default function CommandCenter() {
  const [zones] = useState<Zone[]>(initialZones);
  const activeAlerts = alerts.filter((a) => a.status === "ACTIVE");

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">CrowdPulse Command Center</h1>
        <p className="text-sm text-text-muted mt-0.5">Real-time crowd intelligence and operational awareness</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard label="Total People" value={systemStats.totalPeople.toLocaleString()} icon={Users} />
        <KpiCard
          label="Active Zones"
          value={`${systemStats.activeZones}`}
          subValue={`/ ${systemStats.totalZones}`}
          icon={Grid3x3}
        />
        <KpiCard
          label="High Risk Zones"
          value={`${systemStats.highRiskZones}`}
          icon={AlertTriangle}
          tone={systemStats.highRiskZones > 0 ? "high" : "low"}
        />
        <KpiCard
          label="Cameras Online"
          value={`${systemStats.camerasOnline}`}
          subValue={`/ ${systemStats.totalCameras}`}
          icon={Camera}
        />
        <KpiCard
          label="Avg. Density"
          value={`${systemStats.averageDensity}%`}
          icon={Gauge}
          tone={systemStats.averageDensity > 75 ? "high" : systemStats.averageDensity > 50 ? "medium" : "low"}
        />
        <KpiCard
          label="Active Alerts"
          value={`${systemStats.activeAlerts}`}
          icon={BellRing}
          tone={systemStats.activeAlerts > 0 ? "high" : "low"}
        />
      </div>

      {/* Venue map + alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Venue Overview</span>
          <VenueMap zones={zones} height={460} />
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-2xs uppercase tracking-wider text-text-muted">Live Alerts</span>
            <span className="text-2xs font-mono text-text-faint">{activeAlerts.length} active</span>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: 460 }}>
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
          <button className="mt-1 text-xs text-risk-info border border-risk-info/30 bg-risk-info/5 rounded-sm py-2 hover:bg-risk-info/10 transition-colors">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
