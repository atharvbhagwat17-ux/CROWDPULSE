import { X } from "lucide-react";
import type { Zone, Prediction, Recommendation } from "../types";
import RiskBadge from "./RiskBadge";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-2xs uppercase tracking-wider text-text-muted">{label}</span>
      <span className="font-mono text-sm">{value}</span>
    </div>
  );
}

export default function ZoneDetailPanel({
  zone,
  prediction,
  recommendation,
  onClose,
}: {
  zone: Zone;
  prediction?: Prediction;
  recommendation?: Recommendation;
  onClose: () => void;
}) {
  return (
    <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-4 w-full xl:w-[320px] shrink-0">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-sm font-medium">{zone.name}</span>
          <div className="mt-1">
            <RiskBadge risk={zone.risk} />
          </div>
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-text">
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat label="Occupancy" value={`${zone.occupancy}`} />
        <Stat label="Capacity" value={`${zone.capacity}`} />
        <Stat label="Density" value={`${zone.density}%`} />
        <Stat label="Avg. Speed" value={`${zone.averageSpeed} m/s`} />
        <Stat label="Inflow" value={`${zone.inflow}/min`} />
        <Stat label="Outflow" value={`${zone.outflow}/min`} />
      </div>

      {prediction && (
        <div className="pt-3 border-t border-border flex flex-col gap-1.5">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Prediction</span>
          <p className="text-xs text-text-muted leading-snug">
            Predicted to reach{" "}
            <span className="text-text">{prediction.timeline[prediction.timeline.length - 1].risk}</span> within
            ~{prediction.etaSeconds}s ({prediction.confidence}% model confidence).
          </p>
        </div>
      )}

      {recommendation && (
        <div className="pt-3 border-t border-border flex flex-col gap-1.5">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Recommended Action</span>
          <p className="text-xs text-text leading-snug">{recommendation.actionTitle}</p>
        </div>
      )}
    </div>
  );
}
