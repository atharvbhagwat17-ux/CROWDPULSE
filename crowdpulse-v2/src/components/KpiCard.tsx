import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  tone?: "default" | "low" | "medium" | "high";
}

const toneStyles = {
  default: "text-text",
  low: "text-risk-low",
  medium: "text-risk-medium",
  high: "text-risk-high",
};

export default function KpiCard({ label, value, subValue, icon: Icon, tone = "default" }: KpiCardProps) {
  return (
    <div className="bg-panel border border-border rounded-sm p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-2xs uppercase tracking-wider text-text-muted">{label}</span>
        <Icon size={15} className="text-text-faint" strokeWidth={1.75} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`font-mono text-2xl font-semibold ${toneStyles[tone]}`}>{value}</span>
        {subValue && <span className="text-2xs text-text-muted font-mono">{subValue}</span>}
      </div>
    </div>
  );
}
