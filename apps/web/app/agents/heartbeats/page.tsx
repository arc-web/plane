import { useState, useEffect } from "react";

export default function HeartbeatsPage() {
  const [runs, setRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents/heartbeat-runs?limit=50")
      .then((r) => r.json())
      .then((data) => setRuns(Array.isArray(data) ? data : data.runs || []))
      .catch(() => setRuns([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-custom-text-200">Loading heartbeats...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-custom-text-100">Heartbeat Timeline</h1>
      {runs.length === 0 ? (
        <p className="text-custom-text-300">No heartbeat runs recorded yet.</p>
      ) : (
        <div className="space-y-2">
          {runs.map((run: any) => (
            <div key={run.id} className="flex items-center gap-4 rounded border border-custom-border-100 p-3">
              <div className={`h-2 w-2 rounded-full ${run.status === "success" ? "bg-green-500" : run.status === "error" ? "bg-red-500" : "bg-yellow-500"}`} />
              <span className="text-sm text-custom-text-200 w-32">{new Date(run.startedAt).toLocaleString()}</span>
              <span className="text-sm font-medium text-custom-text-100">{run.agentName}</span>
              <span className="text-xs text-custom-text-300">{run.durationMs ? `${(run.durationMs / 1000).toFixed(1)}s` : "running"}</span>
              {run.cost != null && <span className="text-xs text-custom-text-300">${run.cost.toFixed(4)}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
