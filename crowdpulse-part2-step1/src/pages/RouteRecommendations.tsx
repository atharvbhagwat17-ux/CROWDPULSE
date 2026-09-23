import RecommendationCard from "../components/RecommendationCard";
import { recommendations } from "../data/predictiveData";

export default function RouteRecommendations() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Recommended Actions</h1>
        <p className="text-sm text-text-muted mt-0.5">
          Route and gate adjustments suggested in response to predicted congestion
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}
