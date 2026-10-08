import type { RiskLevel } from "../types";

const riskStyles: Record<RiskLevel, string> = {
  LOW: "text-risk-low border-risk-low/35 bg-risk-low/[0.10] shadow-[inset_0_0_12px_rgba(63,181,121,0.07)]",
  MEDIUM: "text-risk-medium border-risk-medium/40 bg-risk-medium/[0.11] shadow-[inset_0_0_12px_rgba(217,164,65,0.08)]",
  HIGH: "text-risk-high border-risk-high/45 bg-risk-high/[0.12] shadow-[inset_0_0_12px_rgba(229,72,77,0.09)]",
  CRITICAL: "text-risk-high border-risk-high/70 bg-risk-high/[0.18] shadow-[inset_0_0_14px_rgba(229,72,77,0.14)]",
};

export default function RiskBadge({ risk, size = "sm" }: { risk: RiskLevel; size?: "sm" | "md" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-mono font-semibold tracking-wide ${riskStyles[risk]} ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${risk === "CRITICAL" ? "animate-pulse-dot" : ""}`} />
      {risk}
    </span>
  );
}
