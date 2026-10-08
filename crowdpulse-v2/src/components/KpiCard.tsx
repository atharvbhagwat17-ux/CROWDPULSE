import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  tone?: "default" | "low" | "medium" | "high";
}

const toneStyles = {
  default: {
    value: "text-text",
    accent: "bg-risk-info",
    icon: "border-risk-info/25 bg-risk-info/10 text-risk-info",
    glow: "rgba(76,141,255,0.08)",
  },
  low: {
    value: "text-risk-low",
    accent: "bg-risk-low",
    icon: "border-risk-low/25 bg-risk-low/10 text-risk-low",
    glow: "rgba(63,181,121,0.08)",
  },
  medium: {
    value: "text-risk-medium",
    accent: "bg-risk-medium",
    icon: "border-risk-medium/25 bg-risk-medium/10 text-risk-medium",
    glow: "rgba(217,164,65,0.09)",
  },
  high: {
    value: "text-risk-high",
    accent: "bg-risk-high",
    icon: "border-risk-high/25 bg-risk-high/10 text-risk-high",
    glow: "rgba(229,72,77,0.10)",
  },
};

export default function KpiCard({ label, value, subValue, icon: Icon, tone = "default" }: KpiCardProps) {
  const styles = toneStyles[tone];
  return (
    <div
      data-command-light-card
      data-light-tone={tone === "default" ? "info" : tone}
      className="command-glass-panel command-light-card group relative isolate flex min-h-[132px] flex-col justify-between gap-4 overflow-hidden rounded-xl border border-white/[0.12] p-4"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
        style={{ background: `radial-gradient(ellipse at 100% 0%, ${styles.glow}, transparent 62%)` }}
      />
      <div className={`absolute inset-x-0 top-0 z-[1] h-0.5 ${styles.accent} opacity-90`} />
      <div className="relative z-[1] flex items-start justify-between gap-2">
        <div>
          <span className="block pt-1 text-2xs font-semibold uppercase tracking-[0.12em] text-text-muted">{label}</span>
          <span className="mt-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-text-faint">
            <span className={`h-1 w-1 rounded-full ${styles.accent} opacity-90`} />
            Live signal
          </span>
        </div>
        <span className={`kpi-icon-orbit relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${styles.icon}`}>
          <span className="absolute inset-1 rounded-full border border-current opacity-20" />
          <Icon size={17} strokeWidth={1.9} />
        </span>
      </div>
      <div className="relative z-[1] flex items-end justify-between gap-2">
        <div className="flex items-baseline gap-2">
        <span className={`font-mono text-3xl font-bold leading-none tracking-tight ${styles.value}`}>{value}</span>
        {subValue && <span className="font-mono text-xs text-text-muted">{subValue}</span>}
        </div>
        <span className={`kpi-signal-bars ${tone}`} aria-hidden="true"><i /><i /><i /><i /><i /></span>
      </div>
    </div>
  );
}
