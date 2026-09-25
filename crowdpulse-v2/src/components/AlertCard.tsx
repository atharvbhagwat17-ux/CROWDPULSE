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

export default function AlertCard({ alert, compact = false, showStatus = false, onAcknowledge, onResolve, onViewZone }: AlertCardProps) {
  return (
    <div className="border border-border bg-panel2 rounded-sm p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RiskBadge risk={alert.severity} />
          <span className="text-xs font-medium">{alert.zoneName}</span>
          {showStatus && (
            <span className="text-2xs font-mono uppercase tracking-wider text-text-faint border border-border px-1.5 py-0.5 rounded-sm">
              {alert.status}
            </span>
          )}
        </div>
        <span className="text-2xs font-mono text-text-faint">{timeAgo(alert.timestamp)}</span>
      </div>

      <p className="text-xs text-text leading-snug">{alert.description}</p>

      {!compact && (
        <div className="text-2xs text-text-muted leading-snug space-y-1 pt-1 border-t border-border">
          <p>
            <span className="text-text-faint">Reason: </span>
            {alert.cause}
          </p>
          <p>
            <span className="text-text-faint">Recommendation: </span>
            {alert.recommendation}
          </p>
        </div>
      )}

      {(onAcknowledge || onResolve || onViewZone) && (
        <div className="flex gap-2 pt-1">
          {onAcknowledge && (
            <button
              onClick={onAcknowledge}
              disabled={alert.status !== "ACTIVE"}
              className="text-2xs px-2.5 py-1 rounded-sm border border-risk-medium/40 bg-risk-medium/10 text-risk-medium hover:bg-risk-medium/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Acknowledge
            </button>
          )}
          {onResolve && (
            <button
              onClick={onResolve}
              disabled={alert.status === "RESOLVED"}
              className="text-2xs px-2.5 py-1 rounded-sm border border-risk-low/40 bg-risk-low/10 text-risk-low hover:bg-risk-low/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Resolve
            </button>
          )}
          {onViewZone && (
            <button
              onClick={onViewZone}
              className="text-2xs px-2.5 py-1 rounded-sm border border-border text-text-muted hover:text-text hover:bg-panel transition-colors"
            >
              View Zone
            </button>
          )}
        </div>
      )}
    </div>
  );
}
