import type { CrowdMetricPoint } from "../types";

// Produces a gently trending, gently noisy series so charts look like
// real sensor data instead of a straight line or pure random noise.
export function generateSeries(
  points: number,
  base: { occupancy: number; density: number; averageSpeed: number; inflow: number; outflow: number }
): CrowdMetricPoint[] {
  const series: CrowdMetricPoint[] = [];
  let { occupancy, density, averageSpeed, inflow, outflow } = base;

  const now = new Date();
  for (let i = points - 1; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60 * 1000);
    const label = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // small correlated drift so density/speed move in believable directions
    const drift = (Math.random() - 0.45) * 4;
    occupancy = Math.max(0, occupancy + drift);
    density = Math.min(100, Math.max(0, density + drift * 0.6));
    averageSpeed = Math.max(0.2, averageSpeed - drift * 0.02);
    inflow = Math.max(0, inflow + (Math.random() - 0.5) * 3);
    outflow = Math.max(0, outflow + (Math.random() - 0.5) * 3);

    series.push({
      time: label,
      occupancy: Math.round(occupancy),
      density: Math.round(density),
      averageSpeed: Number(averageSpeed.toFixed(1)),
      inflow: Math.round(inflow),
      outflow: Math.round(outflow),
    });
  }
  return series;
}
