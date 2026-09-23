// Every risk-rated entity in CrowdPulse uses this same scale, so colors
// and badges stay consistent everywhere (KPI cards, zones, alerts, cameras).
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Zone {
  id: string;
  name: string;
  occupancy: number;
  capacity: number;
  density: number; // percentage, 0-100
  averageSpeed: number; // meters/second
  inflow: number; // people per minute entering
  outflow: number; // people per minute leaving
  risk: RiskLevel;
  // normalized 0-1 position on the schematic venue map, so the map
  // layout is data-driven rather than hard-coded per zone
  position: { x: number; y: number; w: number; h: number };
}

export interface Camera {
  id: string;
  name: string;
  zoneId: string;
  status: "ONLINE" | "OFFLINE";
  fps: number;
  peopleDetected: number;
  risk: RiskLevel;
}

export interface Alert {
  id: string;
  severity: RiskLevel;
  zoneId: string;
  zoneName: string;
  timestamp: string; // ISO string
  title: string;
  description: string;
  cause: string;
  recommendation: string;
  status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";
}

export interface CrowdMetricPoint {
  time: string; // e.g. "14:32"
  occupancy: number;
  density: number;
  averageSpeed: number;
  inflow: number;
  outflow: number;
}

export interface SystemStats {
  totalPeople: number;
  activeZones: number;
  totalZones: number;
  highRiskZones: number;
  camerasOnline: number;
  totalCameras: number;
  averageDensity: number;
  activeAlerts: number;
}

// ---- Part 2: Predictive Intelligence ----

// One point on a zone's forecast timeline (NOW, +10s, +20s, ...)
export interface ForecastPoint {
  label: string; // "NOW", "+10 SEC", "+20 SEC", "+30 SEC", "+60 SEC"
  offsetSeconds: number;
  risk: RiskLevel;
  riskScore: number; // 0-100, the underlying number a risk level is derived from
}

export interface PredictionFactor {
  label: string; // e.g. "Density increasing"
  direction: "up" | "down"; // whether this factor is trending up or down
  active: boolean; // whether this factor is currently contributing to the prediction
}

export interface Prediction {
  zoneId: string;
  zoneName: string;
  currentRisk: RiskLevel;
  timeline: ForecastPoint[];
  confidence: number; // 0-100, model confidence - never presented as certainty
  etaSeconds: number; // seconds until predicted congestion
  factors: PredictionFactor[];
}

export interface RouteStep {
  label: string; // e.g. "Entrance", "Gate A", "Main Hall"
}

export interface Recommendation {
  id: string;
  zoneId: string;
  issueTitle: string; // "Gate A is approaching congestion."
  actionTitle: string; // "Redirect incoming visitors toward Gate B."
  currentRoute: RouteStep[];
  recommendedRoute: RouteStep[];
  impact: {
    zoneId: string;
    zoneName: string;
    changePercent: number; // negative = load decreases, positive = increases, 0 = stable
  }[];
  status: "PENDING" | "APPLIED";
}

export type SimulationScenario =
  | "CLOSE_GATE_A"
  | "CLOSE_GATE_B"
  | "BLOCK_MAIN_CORRIDOR"
  | "INCREASE_GATE_A_INFLOW"
  | "INCREASE_GATE_B_INFLOW"
  | "REDUCE_CORRIDOR_CAPACITY";

export interface SimulationInputs {
  scenario: SimulationScenario;
  gateAInflow: number;
  gateBInflow: number;
  gateCInflow: number;
}

export interface SimulationZoneResult {
  zoneId: string;
  zoneName: string;
  risk: RiskLevel;
}

export interface SimulationResult {
  zoneResults: SimulationZoneResult[];
  bottleneckZoneName: string;
  recommendation: string;
}

export interface ComponentStatus {
  name: string; // "Computer Vision Model", "Video Processing", ...
  status: "ONLINE" | "OFFLINE" | "CONNECTED" | "DISCONNECTED" | "WARNING";
}
