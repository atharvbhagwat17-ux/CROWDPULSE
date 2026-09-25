import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import type { Recommendation } from "../types";

function RouteRow({ label, steps }: { label: string; steps: { label: string }[] }) {
  return (
    <div>
      <span className="text-2xs uppercase tracking-wider text-text-muted">{label}</span>
      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-1 border border-border bg-panel2 rounded-sm">{step.label}</span>
            {i < steps.length - 1 && <ArrowRight size={13} className="text-text-faint" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const [status, setStatus] = useState(recommendation.status);

  return (
    <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-2xs uppercase tracking-wider text-risk-medium">Current Issue</span>
          <p className="text-sm mt-0.5">{recommendation.issueTitle}</p>
        </div>
        <span className="shrink-0 text-2xs font-mono uppercase tracking-wider text-risk-info border border-risk-info/40 bg-risk-info/10 px-1.5 py-0.5 rounded-sm">
          Recommended
        </span>
      </div>

      <div>
        <span className="text-2xs uppercase tracking-wider text-risk-low">Recommended Action</span>
        <p className="text-sm mt-0.5">{recommendation.actionTitle}</p>
      </div>

      <div className="flex flex-col gap-3 py-3 border-y border-border">
        <RouteRow label="Current" steps={recommendation.currentRoute} />
        <RouteRow label="Recommended" steps={recommendation.recommendedRoute} />
      </div>

      <div>
        <span className="text-2xs uppercase tracking-wider text-text-muted">Estimated Impact</span>
        <div className="flex flex-wrap gap-4 mt-2">
          {recommendation.impact.map((imp) => (
            <div key={imp.zoneName} className="flex flex-col">
              <span className="text-2xs text-text-muted">{imp.zoneName}</span>
              <span
                className={`font-mono text-sm font-semibold ${
                  imp.changePercent < 0 ? "text-risk-low" : imp.changePercent > 0 ? "text-risk-medium" : "text-text-muted"
                }`}
              >
                {imp.changePercent === 0 ? "Stable" : `${imp.changePercent > 0 ? "+" : ""}${imp.changePercent}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => setStatus("APPLIED")}
          disabled={status === "APPLIED"}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-sm border transition-colors ${
            status === "APPLIED"
              ? "border-risk-low/40 bg-risk-low/10 text-risk-low cursor-default"
              : "border-risk-info/40 bg-risk-info/10 text-risk-info hover:bg-risk-info/20"
          }`}
        >
          {status === "APPLIED" && <Check size={13} />}
          {status === "APPLIED" ? "Applied" : "Apply Recommendation"}
        </button>
        <button className="text-xs px-3 py-1.5 rounded-sm border border-border text-text-muted hover:text-text hover:bg-panel2 transition-colors">
          View Route
        </button>
      </div>
    </div>
  );
}
