import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertCard from "../components/AlertCard";
import { alerts as initialAlerts } from "../data/mockData";
import type { Alert, RiskLevel } from "../types";

const severityFilters: ("ALL" | RiskLevel)[] = ["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"];

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [severity, setSeverity] = useState<"ALL" | RiskLevel>("ALL");
  const navigate = useNavigate();

  const filtered = severity === "ALL" ? alerts : alerts.filter((a) => a.severity === severity);
  const active = filtered.filter((a) => a.status === "ACTIVE" || a.status === "ACKNOWLEDGED");
  const history = filtered.filter((a) => a.status === "RESOLVED");

  function updateStatus(id: string, status: Alert["status"]) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Alerts</h1>
          <p className="text-sm text-text-muted mt-0.5">Active alerts and alert history</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {severityFilters.map((opt) => (
            <button
              key={opt}
              onClick={() => setSeverity(opt)}
              className={`text-2xs font-mono uppercase tracking-wider px-2.5 py-1.5 rounded-sm border transition-colors ${
                severity === opt
                  ? "border-risk-info/40 bg-risk-info/10 text-risk-info"
                  : "border-border text-text-muted hover:text-text hover:bg-panel2"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Active Alerts</span>
          <span className="text-2xs font-mono text-text-faint">{active.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {active.length === 0 && (
            <p className="text-xs text-text-faint col-span-2">No active alerts match this filter.</p>
          )}
          {active.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              showStatus
              onAcknowledge={() => updateStatus(alert.id, "ACKNOWLEDGED")}
              onResolve={() => updateStatus(alert.id, "RESOLVED")}
              onViewZone={() => navigate("/venue-map")}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xs uppercase tracking-wider text-text-muted">Alert History</span>
          <span className="text-2xs font-mono text-text-faint">{history.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {history.length === 0 && (
            <p className="text-xs text-text-faint col-span-2">No resolved alerts yet.</p>
          )}
          {history.map((alert) => (
            <AlertCard key={alert.id} alert={alert} compact showStatus />
          ))}
        </div>
      </div>
    </div>
  );
}
