import type { Alert } from "../types";
import RiskBadge from "./RiskBadge";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins === 1) return "1 min ago";
  return `${mins} min ago`;
}

interface AlertCardProps {
  alert: Alert;
  compact?: boolean;
  showStatus?: boolean;
  onAcknowledge?: () => void;
  onResolve?: () => void;
  onViewZone?: () => void;
}

const severityStyle = {
  LOW: "border-l-risk-low hover:border-risk-low/60",
  MEDIUM: "border-l-risk-medium hover:border-risk-medium/60",
  HIGH: "border-l-risk-high hover:border-risk-high/70",
  CRITICAL: "border-l-risk-high hover:border-risk-high",
} as const;

export default function AlertCard({ alert, compact = false, showStatus = false, onAcknowledge, onResolve, onViewZone }: AlertCardProps) {
  return (
    <div
      data-command-light-card
      data-light-tone={alert.severity.toLowerCase()}
      className={`command-glass-panel command-light-card command-light-panel group relative isolate overflow-hidden rounded-lg border border-white/[0.12] border-l-[3px] p-3.5 ${severityStyle[alert.severity]}`}
    >
      <div className="relative z-[1] flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <RiskBadge risk={alert.severity} />
            <span className="truncate text-xs font-semibold text-text">{alert.zoneName}</span>
            {showStatus && (
              <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-2xs uppercase tracking-wider text-text-faint">
                {alert.status}
              </span>
            )}
          </div>
          <span className="shrink-0 rounded-full border border-white/[0.10] bg-black/20 px-2.5 py-1 font-mono text-[10px] text-text-muted">
            {timeAgo(alert.timestamp)}
          </span>
        </div>

        <p className="text-[13px] font-medium leading-snug text-text">{alert.description}</p>

        {!compact && (
          <div className="space-y-2 border-t border-border/80 pt-2.5 text-2xs leading-relaxed text-text-muted">
            <p>
              <span className="font-semibold uppercase tracking-wider text-text-faint">Reason</span>
              <span className="mx-1.5 text-border">/</span>
              {alert.cause}
            </p>
            <p>
              <span className="font-semibold uppercase tracking-wider text-risk-info">Recommended</span>
              <span className="mx-1.5 text-border">/</span>
              {alert.recommendation}
            </p>
          </div>
        )}

        {(onAcknowledge || onResolve || onViewZone) && (
          <div className="flex flex-wrap gap-2 border-t border-border/70 pt-2.5">
            {onAcknowledge && (
              <button
                onClick={onAcknowledge}
                disabled={alert.status !== "ACTIVE"}
                className="rounded-md border border-risk-medium/40 bg-risk-medium/10 px-2.5 py-1 text-2xs text-risk-medium transition-colors hover:bg-risk-medium/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Acknowledge
              </button>
            )}
            {onResolve && (
              <button
                onClick={onResolve}
                disabled={alert.status === "RESOLVED"}
                className="rounded-md border border-risk-low/40 bg-risk-low/10 px-2.5 py-1 text-2xs text-risk-low transition-colors hover:bg-risk-low/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Resolve
              </button>
            )}
            {onViewZone && (
              <button
                onClick={onViewZone}
                className="rounded-md border border-border px-2.5 py-1 text-2xs text-text-muted transition-colors hover:bg-panel hover:text-text"
              >
                View Zone
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
