import { useState } from "react";
import VenueMap from "../components/VenueMap";
import ZoneDetailPanel from "../components/ZoneDetailPanel";
import { zones } from "../data/mockData";
import { predictions, recommendations } from "../data/predictiveData";
import type { RiskLevel, Zone } from "../types";

const filterOptions: ("ALL" | RiskLevel)[] = ["ALL", "LOW", "MEDIUM", "HIGH"];

export default function VenueMapPage() {
  const [filter, setFilter] = useState<"ALL" | RiskLevel>("ALL");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const filteredZones = filter === "ALL" ? zones : zones.filter((z) => z.risk === filter);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Venue Map</h1>
          <p className="text-sm text-text-muted mt-0.5">Full venue schematic with live zone status</p>
        </div>
        <div className="flex gap-1.5">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`text-2xs font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-sm border transition-colors ${
                filter === opt
                  ? "border-risk-info/40 bg-risk-info/10 text-risk-info"
                  : "border-border text-text-muted hover:text-text hover:bg-panel2"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 items-start">
        <div className="flex-1 min-w-0 w-full">
          <VenueMap zones={filteredZones} onSelectZone={setSelectedZone} height={560} />
        </div>

        {selectedZone && (
          <ZoneDetailPanel
            zone={selectedZone}
            prediction={predictions.find((p) => p.zoneId === selectedZone.id)}
            recommendation={recommendations.find((r) => r.zoneId === selectedZone.id)}
            onClose={() => setSelectedZone(null)}
          />
        )}
      </div>
    </div>
  );
}
