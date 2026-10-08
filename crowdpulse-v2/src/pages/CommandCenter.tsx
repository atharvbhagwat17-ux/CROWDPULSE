import { useEffect, useRef, useState } from "react";
import { Users, Grid3x3, AlertTriangle, Camera, Gauge, BellRing } from "lucide-react";
import KpiCard from "../components/KpiCard";
import VenueMap from "../components/VenueMap";
import AlertCard from "../components/AlertCard";
import { zones as initialZones, alerts, systemStats } from "../data/mockData";
import type { Zone } from "../types";

export default function CommandCenter() {
  const [zones] = useState<Zone[]>(initialZones);
  const commandCenterRef = useRef<HTMLDivElement>(null);
  const activeAlerts = alerts.filter((a) => a.status === "ACTIVE");

  useEffect(() => {
    const container = commandCenterRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!container || !finePointer.matches || reducedMotion.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (event.target instanceof Element) {
        const lightCard = event.target.closest<HTMLElement>("[data-command-light-card]");
        if (lightCard) {
          const cardBounds = lightCard.getBoundingClientRect();
          lightCard.style.setProperty("--command-light-x", `${event.clientX - cardBounds.left}px`);
          lightCard.style.setProperty("--command-light-y", `${event.clientY - cardBounds.top}px`);
        }
      }
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div ref={commandCenterRef} className="command-center-surface relative isolate flex flex-col gap-6 overflow-hidden p-5 md:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-0 z-0 h-[34rem] w-[54rem] max-w-full"
        style={{
          background:
            "radial-gradient(ellipse at 55% 42%, rgba(35,158,205,0.09), transparent 68%), radial-gradient(ellipse at 0% 100%, rgba(64,126,210,0.055), transparent 62%)",
        }}
      />

      <div data-command-light-card data-light-tone="info" className="command-glass-panel command-light-card command-hero relative z-20 overflow-hidden rounded-xl border border-risk-info/30 px-5 py-5 md:px-7 md:py-6">
        <div aria-hidden="true" className="command-hero-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="command-hero-ring pointer-events-none absolute -right-8 -top-24 h-64 w-64 rounded-full border border-risk-info/15"
        />
        <div
          aria-hidden="true"
          className="command-hero-ring command-hero-ring-inner pointer-events-none absolute -right-1 -top-16 h-48 w-48 rounded-full border border-risk-info/10"
        />
        <div className="relative z-[1] flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.2em] text-risk-info">
              <span className="h-1.5 w-1.5 rounded-full bg-risk-info shadow-[0_0_10px_rgba(76,141,255,0.8)]" />
              Crowd intelligence platform
            </div>
            <h1 className="text-2xl font-bold tracking-[-0.035em] text-text md:text-3xl xl:text-4xl">CrowdPulse <span className="text-risk-info">Command Center</span></h1>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">Real-time crowd intelligence and operational awareness</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden border-r border-white/10 pr-4 text-right lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">Operations mode</p>
              <p className="mt-1 text-xs font-medium tracking-wide text-text-muted">VENUE / LIVE</p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-risk-info/35 bg-risk-info/[0.10] px-3.5 py-2 text-2xs font-semibold uppercase tracking-[0.14em] text-risk-info shadow-[0_0_24px_rgba(84,169,245,0.10),inset_0_1px_0_rgba(226,247,255,0.12)]">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-risk-info shadow-[0_0_9px_rgba(84,169,245,0.8)]" />
              Live monitoring
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="command-hero-signal relative z-[1] mt-6 flex items-center gap-2">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <i />
        </div>
      </div>

      {/* KPI row */}
      <div className="relative z-20 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Total People" value={systemStats.totalPeople.toLocaleString()} icon={Users} />
        <KpiCard
          label="Active Zones"
          value={`${systemStats.activeZones}`}
          subValue={`/ ${systemStats.totalZones}`}
          icon={Grid3x3}
        />
        <KpiCard
          label="High Risk Zones"
          value={`${systemStats.highRiskZones}`}
          icon={AlertTriangle}
          tone={systemStats.highRiskZones > 0 ? "high" : "low"}
        />
        <KpiCard
          label="Cameras Online"
          value={`${systemStats.camerasOnline}`}
          subValue={`/ ${systemStats.totalCameras}`}
          icon={Camera}
          tone="low"
        />
        <KpiCard
          label="Avg. Density"
          value={`${systemStats.averageDensity}%`}
          icon={Gauge}
          tone={systemStats.averageDensity > 75 ? "high" : systemStats.averageDensity > 50 ? "medium" : "low"}
        />
        <KpiCard
          label="Active Alerts"
          value={`${systemStats.activeAlerts}`}
          icon={BellRing}
          tone={systemStats.activeAlerts > 0 ? "high" : "low"}
        />
      </div>

      {/* Venue map + alerts */}
      <div className="relative z-20 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-3 px-1">
            <div>
              <p className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.18em] text-risk-info">
                <span className="h-px w-5 bg-risk-info/70" />
                Spatial intelligence
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-text">Venue Overview</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 border-r border-white/10 pr-3 font-mono text-[10px] uppercase tracking-wider text-text-faint lg:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-risk-low shadow-[0_0_8px_rgba(66,201,138,0.6)]" />
                Sensor mesh active
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-risk-info/25 bg-risk-info/[0.06] px-3 py-1.5 text-2xs font-medium text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-risk-info" />
                Live floor plan
              </span>
            </div>
          </div>
          <VenueMap zones={zones} height={460} />
        </div>

        <div data-command-light-card data-light-tone="info" className="command-glass-panel command-light-card relative isolate flex min-w-0 flex-col gap-3 overflow-hidden rounded-xl border border-risk-info/20 p-3.5 md:p-4">
          <div className="flex items-center justify-between gap-3 px-0.5">
            <div>
              <p className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-[0.18em] text-risk-info">
                <span className="h-px w-4 bg-risk-info/70" />
                Operations feed
              </p>
              <h2 className="mt-1 flex items-center gap-2 text-base font-semibold tracking-tight text-text">
                Live Alerts
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-risk-high" />
              </h2>
            </div>
            <span className="rounded-full border border-risk-high/25 bg-risk-high/[0.08] px-2.5 py-1 font-mono text-2xs font-medium text-risk-high">
              {activeAlerts.length} active
            </span>
          </div>
          <div className="flex flex-col gap-2.5 overflow-y-auto pr-1" style={{ maxHeight: 460 }}>
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
          <button className="mt-0.5 rounded-lg border border-risk-info/30 bg-risk-info/[0.06] py-2.5 text-xs font-medium text-risk-info transition-colors hover:border-risk-info/50 hover:bg-risk-info/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-risk-info/60">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
