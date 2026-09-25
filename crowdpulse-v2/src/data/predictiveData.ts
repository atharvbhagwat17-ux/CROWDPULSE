import { zones } from "./mockData";
import type { Prediction, Recommendation, ComponentStatus, RiskLevel } from "../types";

// Converts a 0-100 risk score into the same RiskLevel scale used everywhere
// else in the app, so forecasts and current-state badges always agree.
export function scoreToRisk(score: number): RiskLevel {
  if (score >= 85) return "CRITICAL";
  if (score >= 65) return "HIGH";
  if (score >= 40) return "MEDIUM";
  return "LOW";
}

// Builds a forecast timeline for a zone. The trend is derived from the
// zone's real inflow/outflow/speed so a converging, slow-moving,
// inflow-heavy zone always trends toward higher risk - never randomly.
function buildTimeline(baseScore: number, trendPerStep: number) {
  const offsets = [0, 10, 20, 30, 60];
  const labels = ["NOW", "+10 SEC", "+20 SEC", "+30 SEC", "+60 SEC"];
  return offsets.map((offsetSeconds, i) => {
    const riskScore = Math.min(100, Math.max(0, Math.round(baseScore + trendPerStep * i)));
    return {
      label: labels[i],
      offsetSeconds,
      risk: scoreToRisk(riskScore),
      riskScore,
    };
  });
}

function trendFor(zoneId: string) {
  const z = zones.find((z) => z.id === zoneId)!;
  const flowImbalance = z.inflow - z.outflow; // positive = filling up
  const speedPenalty = (2 - z.averageSpeed) * 4; // slower speed = more risk
  return flowImbalance * 0.9 + speedPenalty;
}

export const predictions: Prediction[] = [
  {
    zoneId: "gate-a",
    zoneName: "Gate A",
    currentRisk: "MEDIUM",
    timeline: buildTimeline(55, trendFor("gate-a")),
    confidence: 87,
    etaSeconds: 20,
    factors: [
      { label: "Density increasing", direction: "up", active: true },
      { label: "Average speed decreasing", direction: "down", active: true },
      { label: "Inflow exceeding outflow", direction: "up", active: true },
      { label: "Crowd streams converging", direction: "up", active: true },
    ],
  },
  {
    zoneId: "gate-b",
    zoneName: "Gate B",
    currentRisk: "LOW",
    timeline: buildTimeline(35, trendFor("gate-b")),
    confidence: 91,
    etaSeconds: 60,
    factors: [
      { label: "Density increasing", direction: "up", active: false },
      { label: "Average speed decreasing", direction: "down", active: false },
      { label: "Inflow exceeding outflow", direction: "up", active: true },
      { label: "Crowd streams converging", direction: "up", active: false },
    ],
  },
  {
    zoneId: "main-corridor",
    zoneName: "Main Corridor",
    currentRisk: "MEDIUM",
    timeline: buildTimeline(48, trendFor("main-corridor")),
    confidence: 82,
    etaSeconds: 30,
    factors: [
      { label: "Density increasing", direction: "up", active: true },
      { label: "Average speed decreasing", direction: "down", active: true },
      { label: "Inflow exceeding outflow", direction: "up", active: true },
      { label: "Crowd streams converging", direction: "up", active: true },
    ],
  },
  {
    zoneId: "north-exit",
    zoneName: "North Exit",
    currentRisk: "HIGH",
    timeline: buildTimeline(70, trendFor("north-exit")),
    confidence: 89,
    etaSeconds: 10,
    factors: [
      { label: "Density increasing", direction: "up", active: true },
      { label: "Average speed decreasing", direction: "down", active: true },
      { label: "Inflow exceeding outflow", direction: "down", active: false },
      { label: "Crowd streams converging", direction: "up", active: false },
    ],
  },
];

export const recommendations: Recommendation[] = [
  {
    id: "rec-1",
    zoneId: "gate-a",
    issueTitle: "Gate A is approaching congestion.",
    actionTitle: "Redirect incoming visitors toward Gate B.",
    currentRoute: [{ label: "Entrance" }, { label: "Gate A" }, { label: "Main Hall" }],
    recommendedRoute: [{ label: "Entrance" }, { label: "Gate B" }, { label: "Main Hall" }],
    impact: [
      { zoneId: "gate-a", zoneName: "Gate A load", changePercent: -32 },
      { zoneId: "gate-b", zoneName: "Gate B load", changePercent: 14 },
      { zoneId: "main-corridor", zoneName: "Main Corridor", changePercent: 0 },
    ],
    status: "PENDING",
  },
  {
    id: "rec-2",
    zoneId: "north-exit",
    issueTitle: "North Exit outflow is bottlenecked.",
    actionTitle: "Open auxiliary exit gate N2 and direct traffic away from South Exit.",
    currentRoute: [{ label: "Main Hall" }, { label: "North Exit" }],
    recommendedRoute: [{ label: "Main Hall" }, { label: "North Exit" }, { label: "Auxiliary Gate N2" }],
    impact: [
      { zoneId: "north-exit", zoneName: "North Exit load", changePercent: -24 },
      { zoneId: "south-exit", zoneName: "South Exit load", changePercent: 6 },
    ],
    status: "PENDING",
  },
];

export const cameraSystemStatus: ComponentStatus[] = [
  { name: "Computer Vision Model", status: "ONLINE" },
  { name: "Video Processing", status: "ONLINE" },
  { name: "Backend API", status: "CONNECTED" },
  { name: "Database", status: "CONNECTED" },
];
