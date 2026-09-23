import { useState } from "react";
import RiskBadge from "../components/RiskBadge";
import ForecastChart from "../components/ForecastChart";
import FactorIndicator from "../components/FactorIndicator";
import { predictions } from "../data/predictiveData";

export default function CongestionForecast() {
  const [selectedZoneId, setSelectedZoneId] = useState(predictions[0].zoneId);
  const selected = predictions.find((p) => p.zoneId === selectedZoneId)!;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Congestion Forecast</h1>
        <p className="text-sm text-text-muted mt-0.5">
          Short-term congestion predictions generated from live density, speed, and flow trends
        </p>
      </div>

      {/* Timeline summary strip - one row per zone */}
      <div className="border border-border rounded-sm overflow-hidden">
        <div className="grid grid-cols-[160px_repeat(5,1fr)] bg-panel2 text-2xs uppercase tracking-wider text-text-muted">
          <div className="px-3 py-2">Zone</div>
          {predictions[0].timeline.map((p) => (
            <div key={p.label} className="px-3 py-2 text-center">
              {p.label}
            </div>
          ))}
        </div>
        {predictions.map((pred) => (
          <button
            key={pred.zoneId}
            onClick={() => setSelectedZoneId(pred.zoneId)}
            className={`grid grid-cols-[160px_repeat(5,1fr)] w-full text-left border-t border-border transition-colors ${
              pred.zoneId === selectedZoneId ? "bg-panel2" : "bg-panel hover:bg-panel2"
            }`}
          >
            <div className="px-3 py-2.5 text-sm font-medium">{pred.zoneName}</div>
            {pred.timeline.map((p) => (
              <div key={p.label} className="px-3 py-2.5 flex justify-center">
                <RiskBadge risk={p.risk} />
              </div>
            ))}
          </button>
        ))}
      </div>

      {/* Detail panel for the selected zone */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
        <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{selected.zoneName} — Risk Score Trend</span>
            <RiskBadge risk={selected.currentRisk} size="md" />
          </div>
          <ForecastChart prediction={selected} />
        </div>

        <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-3">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Model Confidence</span>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-2xl font-semibold">{selected.confidence}%</span>
          </div>
          <div className="h-1.5 bg-panel2 rounded-full overflow-hidden">
            <div className="h-full bg-risk-info" style={{ width: `${selected.confidence}%` }} />
          </div>
          <p className="text-2xs text-text-faint leading-snug">
            This is a model confidence estimate, not a guarantee. Treat forecasts as decision support.
          </p>

          <div className="pt-2 mt-1 border-t border-border">
            <span className="text-2xs uppercase tracking-wider text-text-muted">Predicted congestion in</span>
            <div className="font-mono text-xl font-semibold text-risk-high mt-1">~{selected.etaSeconds}s</div>
          </div>
        </div>
      </div>

      {/* Explanation section */}
      <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-3">
        <span className="text-sm font-medium">Why is congestion predicted?</span>
        <p className="text-xs text-text-muted leading-relaxed">
          {selected.zoneName} is predicted to reach {selected.timeline[selected.timeline.length - 1].risk}{" "}
          congestion within approximately {selected.etaSeconds} seconds, based on the following factors:
        </p>
        <div className="flex flex-wrap gap-2">
          {selected.factors.map((f) => (
            <FactorIndicator key={f.label} factor={f} />
          ))}
        </div>
      </div>
    </div>
  );
}
