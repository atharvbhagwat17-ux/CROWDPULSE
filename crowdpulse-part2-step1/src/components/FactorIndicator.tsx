import { ArrowUp, ArrowDown } from "lucide-react";
import type { PredictionFactor } from "../types";

export default function FactorIndicator({ factor }: { factor: PredictionFactor }) {
  const Icon = factor.direction === "up" ? ArrowUp : ArrowDown;
  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-sm border text-xs ${
        factor.active ? "border-risk-high/30 bg-risk-high/5 text-text" : "border-border bg-panel2 text-text-faint"
      }`}
    >
      <Icon size={13} strokeWidth={2} className={factor.active ? "text-risk-high" : "text-text-faint"} />
      {factor.label}
    </div>
  );
}
