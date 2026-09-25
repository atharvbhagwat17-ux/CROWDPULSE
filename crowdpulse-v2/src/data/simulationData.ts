import { zones } from "./mockData";
import { scoreToRisk } from "./predictiveData";
import type { SimulationInputs, SimulationResult, SimulationScenario } from "../types";

export const scenarioLabels: Record<SimulationScenario, string> = {
  CLOSE_GATE_A: "Close Gate A",
  CLOSE_GATE_B: "Close Gate B",
  BLOCK_MAIN_CORRIDOR: "Block Main Corridor",
  INCREASE_GATE_A_INFLOW: "Increase Gate A Inflow",
  INCREASE_GATE_B_INFLOW: "Increase Gate B Inflow",
  REDUCE_CORRIDOR_CAPACITY: "Reduce Corridor Capacity",
};

export const defaultSimulationInputs: SimulationInputs = {
  scenario: "CLOSE_GATE_A",
  gateAInflow: 18,
  gateBInflow: 11,
  gateCInflow: 8,
};

/**
 * Simplified, deterministic what-if model for demonstration purposes only.
 * This is NOT a physics-based crowd-flow simulation - it applies fixed,
 * explainable rules to the existing mock zone data so the same inputs
 * always produce the same outputs.
 */
export function runSimulation(inputs: SimulationInputs): SimulationResult {
  const baseDensity: Record<string, number> = {};
  zones.forEach((z) => (baseDensity[z.id] = z.density));

  // Slider deltas relative to each gate's baseline inflow, scaled down
  // so the effect is visible but not wild.
  const gateA = zones.find((z) => z.id === "gate-a")!;
  const gateB = zones.find((z) => z.id === "gate-b")!;
  const aDelta = (inputs.gateAInflow - gateA.inflow) * 1.5;
  const bDelta = (inputs.gateBInflow - gateB.inflow) * 1.5;

  switch (inputs.scenario) {
    case "CLOSE_GATE_A":
      baseDensity["gate-a"] = 5; // closed, effectively empty
      baseDensity["gate-b"] += 35; // rerouted traffic
      baseDensity["main-corridor"] += 20;
      break;
    case "CLOSE_GATE_B":
      baseDensity["gate-b"] = 5;
      baseDensity["gate-a"] += 30;
      baseDensity["main-corridor"] += 18;
      break;
    case "BLOCK_MAIN_CORRIDOR":
      baseDensity["main-corridor"] = 100;
      baseDensity["gate-a"] += 15;
      baseDensity["gate-b"] += 15;
      baseDensity["food-court"] += 10;
      break;
    case "INCREASE_GATE_A_INFLOW":
      baseDensity["gate-a"] += 25;
      baseDensity["main-corridor"] += 10;
      break;
    case "INCREASE_GATE_B_INFLOW":
      baseDensity["gate-b"] += 25;
      baseDensity["main-corridor"] += 10;
      break;
    case "REDUCE_CORRIDOR_CAPACITY":
      baseDensity["main-corridor"] += 30;
      baseDensity["north-exit"] += 8;
      break;
  }

  // Apply slider adjustments on top of the scenario effect.
  baseDensity["gate-a"] = (baseDensity["gate-a"] ?? 0) + aDelta;
  baseDensity["gate-b"] = (baseDensity["gate-b"] ?? 0) + bDelta;

  const zoneResults = zones.map((z) => {
    const score = Math.min(100, Math.max(0, Math.round(baseDensity[z.id] ?? z.density)));
    return { zoneId: z.id, zoneName: z.name, risk: scoreToRisk(score) };
  });

  const bottleneck = zoneResults.reduce((worst, current) => {
    const rank = { LOW: 0, MEDIUM: 1, HIGH: 2, CRITICAL: 3 };
    return rank[current.risk] > rank[worst.risk] ? current : worst;
  });

  const recommendationText =
    inputs.scenario === "CLOSE_GATE_A" || inputs.scenario === "CLOSE_GATE_B"
      ? "Increase utilization of the remaining open gate and add corridor signage to spread arrivals."
      : inputs.scenario === "BLOCK_MAIN_CORRIDOR"
        ? "Open an alternate corridor route and temporarily hold entry at both gates."
        : "Increase Gate B utilization and monitor Main Corridor for buildup.";

  return {
    zoneResults,
    bottleneckZoneName: bottleneck.zoneName,
    recommendation: recommendationText,
  };
}
