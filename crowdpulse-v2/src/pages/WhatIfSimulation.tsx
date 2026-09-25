import { useState } from "react";
import VenueMap from "../components/VenueMap";
import RiskBadge from "../components/RiskBadge";
import PrototypeBadge from "../components/PrototypeBadge";
import { zones } from "../data/mockData";
import { runSimulation, scenarioLabels, defaultSimulationInputs } from "../data/simulationData";
import type { SimulationInputs, SimulationResult, SimulationScenario } from "../types";

const scenarios = Object.keys(scenarioLabels) as SimulationScenario[];

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-2xs uppercase tracking-wider text-text-muted">{label}</span>
        <span className="font-mono text-xs">{value}/min</span>
      </div>
      <input
        type="range"
        min={0}
        max={40}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#4C8DFF]"
      />
    </div>
  );
}

export default function WhatIfSimulation() {
  const [inputs, setInputs] = useState<SimulationInputs>(defaultSimulationInputs);
  const [result, setResult] = useState<SimulationResult | null>(null);

  function update<K extends keyof SimulationInputs>(key: K, value: SimulationInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const afterZones = result
    ? zones.map((z) => {
        const r = result.zoneResults.find((res) => res.zoneId === z.id);
        return r ? { ...z, risk: r.risk } : z;
      })
    : zones;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">What-If Simulation</h1>
          <p className="text-sm text-text-muted mt-0.5">
            Test how different crowd-management scenarios may affect venue congestion
          </p>
        </div>
        <PrototypeBadge label="Simplified Prototype Model" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-4 items-start">
        {/* controls */}
        <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-4">
          <div>
            <span className="text-2xs uppercase tracking-wider text-text-muted">Scenario</span>
            <div className="flex flex-col gap-1.5 mt-2">
              {scenarios.map((s) => (
                <button
                  key={s}
                  onClick={() => update("scenario", s)}
                  className={`text-left text-xs px-3 py-2 rounded-sm border transition-colors ${
                    inputs.scenario === s
                      ? "border-risk-info/40 bg-risk-info/10 text-text"
                      : "border-border text-text-muted hover:text-text hover:bg-panel2"
                  }`}
                >
                  {scenarioLabels[s]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-border">
            <Slider label="Gate A Inflow" value={inputs.gateAInflow} onChange={(v) => update("gateAInflow", v)} />
            <Slider label="Gate B Inflow" value={inputs.gateBInflow} onChange={(v) => update("gateBInflow", v)} />
            <Slider label="Gate C Inflow" value={inputs.gateCInflow} onChange={(v) => update("gateCInflow", v)} />
          </div>

          <button
            onClick={() => setResult(runSimulation(inputs))}
            className="text-xs font-medium px-3 py-2 rounded-sm border border-risk-info/40 bg-risk-info/10 text-risk-info hover:bg-risk-info/20 transition-colors"
          >
            Run Simulation
          </button>
          <p className="text-2xs text-text-faint leading-snug">
            This is a simplified frontend model for demonstration purposes, not a real crowd-flow physics
            simulation.
          </p>
        </div>

        {/* results */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-2xs uppercase tracking-wider text-text-muted">Before — Normal</span>
              <VenueMap zones={zones} height={320} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xs uppercase tracking-wider text-text-muted">After — Simulated</span>
              <VenueMap zones={afterZones} height={320} />
            </div>
          </div>

          <div className="border border-border bg-panel rounded-sm p-4 flex flex-col gap-3">
            <span className="text-2xs uppercase tracking-wider text-text-muted">Simulation Result</span>
            {!result && <p className="text-xs text-text-faint">Run a simulation to see results here.</p>}
            {result && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {result.zoneResults.map((r) => (
                    <div key={r.zoneId} className="flex items-center justify-between border border-border bg-panel2 rounded-sm px-3 py-2">
                      <span className="text-xs">{r.zoneName}</span>
                      <RiskBadge risk={r.risk} />
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <span className="text-2xs text-text-muted block">Potential Bottleneck</span>
                    <span className="text-sm text-risk-high font-medium">{result.bottleneckZoneName}</span>
                  </div>
                  <div>
                    <span className="text-2xs text-text-muted block">Recommended Action</span>
                    <span className="text-sm">{result.recommendation}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
