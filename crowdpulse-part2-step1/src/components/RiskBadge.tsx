import type { RiskLevel } from "../types";

const riskStyles: Record<RiskLevel, string> = {
  LOW: "text-risk-low border-risk-low/40 bg-risk-low/10",
  MEDIUM: "text-risk-medium border-risk-medium/40 bg-risk-medium/10",
  HIGH: "text-risk-high border-risk-high/40 bg-risk-high/10",
  CRITICAL: "text-risk-high border-risk-high bg-risk-high/20",
};

export default function RiskBadge({ risk, size = "sm" }: { risk: RiskLevel; size?: "sm" | "md" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-sm font-mono font-medium tracking-wide ${riskStyles[risk]} ${
        size === "sm" ? "text-2xs px-1.5 py-0.5" : "text-xs px-2 py-1"
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {risk}
    </span>
  );
}
