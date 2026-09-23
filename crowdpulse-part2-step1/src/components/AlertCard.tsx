import type { Alert } from "../types";
import RiskBadge from "./RiskBadge";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins === 1) return "1 min ago";
  return `${mins} min ago`;
}

export default function AlertCard({ alert, compact = false }: { alert: Alert; compact?: boolean }) {
  return (
    <div className="border border-border bg-panel2 rounded-sm p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RiskBadge risk={alert.severity} />
          <span className="text-xs font-medium">{alert.zoneName}</span>
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
    </div>
  );
}
