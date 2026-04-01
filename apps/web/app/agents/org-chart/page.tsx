import { useState, useEffect } from "react";

export default function OrgChartPage() {
  const [chart, setChart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents/org-chart")
      .then((r) => r.json())
      .then(setChart)
      .catch(() => setChart(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-custom-text-200">Loading org chart...</div>;

  if (!chart || !chart.agents || chart.agents.length === 0) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-semibold text-custom-text-100">Agent Org Chart</h1>
        <p className="text-custom-text-300">No agents in the org chart yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-custom-text-100">Agent Org Chart</h1>
      <div className="flex flex-wrap gap-6">
        {chart.agents.map((agent: any) => (
          <div key={agent.id} className="rounded-lg border border-custom-border-200 p-4 min-w-[200px]">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${agent.status === "online" ? "bg-green-500" : "bg-gray-400"}`} />
              <h3 className="font-medium text-custom-text-100">{agent.name}</h3>
            </div>
            <p className="mt-1 text-xs text-custom-text-300">{agent.role || agent.adapter}</p>
            {agent.reportsTo && <p className="mt-1 text-xs text-custom-text-400">Reports to: {agent.reportsTo}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
