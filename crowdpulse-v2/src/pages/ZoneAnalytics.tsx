import { useMemo, useState } from "react";
import { Users, Gauge, Wind, ArrowDownToLine, ArrowUpFromLine, Activity } from "lucide-react";
import KpiCard from "../components/KpiCard";
import MetricChart from "../components/MetricChart";
import FactorIndicator from "../components/FactorIndicator";
import RiskBadge from "../components/RiskBadge";
import { zones } from "../data/mockData";
import { generateSeries } from "../utils/generateSeries";
import type { PredictionFactor } from "../types";

export default function ZoneAnalytics() {
  const [zoneId, setZoneId] = useState(zones[0].id);
  const zone = zones.find((z) => z.id === zoneId)!;

  const series = useMemo(
    () =>
      generateSeries(24, {
        occupancy: zone.occupancy,
        density: zone.density,
        averageSpeed: zone.averageSpeed,
        inflow: zone.inflow,
        outflow: zone.outflow,
      }),
    [zone]
  );

  // Risk score derived from the same logic used across the app: occupancy
  // pressure + flow imbalance + slow movement. Deterministic, not random.
  const riskScore = Math.min(
    100,
    Math.round(zone.density * 0.6 + Math.max(0, zone.inflow - zone.outflow) * 2 + Math.max(0, 2 - zone.averageSpeed) * 15)
  );

  // Deterministic explanation factors based on this zone's actual numbers,
  // not canned text - occupancyRatio/speed/flow decide what's shown.
  const occupancyRatio = zone.occupancy / zone.capacity;
  const factors: PredictionFactor[] = [
    { label: `Occupancy at ${Math.round(occupancyRatio * 100)}% of capacity`, direction: "up", active: occupancyRatio > 0.6 },
    { label: `Average speed at ${zone.averageSpeed} m/s`, direction: "down", active: zone.averageSpeed < 1.0 },
    { label: `Inflow (${zone.inflow}/min) vs outflow (${zone.outflow}/min)`, direction: "up", active: zone.inflow > zone.outflow },
    { label: "Multiple crowd streams converging", direction: "up", active: zone.id === "main-corridor" },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Zone Analytics</h1>
          <p className="text-sm text-text-muted mt-0.5">Per-zone time-series metrics and risk breakdown</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {zones.map((z) => (
            <button
              key={z.id}
              onClick={() => setZoneId(z.id)}
              className={`text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                z.id === zoneId
                  ? "border-risk-info/40 bg-risk-info/10 text-text"
                  : "border-border text-text-muted hover:text-text hover:bg-panel2"
              }`}
            >
              {z.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard label="Occupancy" value={`${zone.occupancy}`} subValue={`/ ${zone.capacity}`} icon={Users} />
        <KpiCard label="Density" value={`${zone.density}%`} icon={Gauge} tone={zone.density > 75 ? "high" : zone.density > 50 ? "medium" : "low"} />
        <KpiCard label="Avg. Speed" value={`${zone.averageSpeed}`} subValue="m/s" icon={Wind} />
        <KpiCard label="Inflow" value={`${zone.inflow}`} subValue="/min" icon={ArrowDownToLine} />
        <KpiCard label="Outflow" value={`${zone.outflow}`} subValue="/min" icon={ArrowUpFromLine} />
        <KpiCard label="Risk Score" value={`${riskScore}`} icon={Activity} tone={riskScore > 65 ? "high" : riskScore > 40 ? "medium" : "low"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-2">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Occupancy Over Time</span>
          <MetricChart data={series} series={[{ dataKey: "occupancy", name: "Occupancy", color: "#4C8DFF" }]} />
        </div>
        <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-2">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Density Over Time</span>
          <MetricChart data={series} series={[{ dataKey: "density", name: "Density %", color: "#D9A441" }]} />
        </div>
        <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-2">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Average Speed Over Time</span>
          <MetricChart data={series} series={[{ dataKey: "averageSpeed", name: "Speed (m/s)", color: "#3FB579" }]} />
        </div>
        <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-2">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Inflow vs Outflow</span>
          <MetricChart
            data={series}
            series={[
              { dataKey: "inflow", name: "Inflow", color: "#4C8DFF" },
              { dataKey: "outflow", name: "Outflow", color: "#E5484D" },
            ]}
          />
        </div>
      </div>

      <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Why is this zone at risk?</span>
          <RiskBadge risk={zone.risk} size="md" />
        </div>
        <div className="flex flex-wrap gap-2">
          {factors.map((f) => (
            <FactorIndicator key={f.label} factor={f} />
          ))}
        </div>
      </div>
    </div>
  );
}
