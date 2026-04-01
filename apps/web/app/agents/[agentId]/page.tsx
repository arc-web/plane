import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function AgentDetailPage() {
  const { agentId } = useParams();
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/agents/agents/${agentId}`)
      .then((r) => r.json())
      .then(setAgent)
      .catch(() => setAgent(null))
      .finally(() => setLoading(false));
  }, [agentId]);

  if (loading) return <div className="p-8 text-custom-text-200">Loading...</div>;
  if (!agent) return <div className="p-8 text-custom-text-300">Agent not found.</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-custom-text-100">{agent.name}</h1>
        <p className="text-sm text-custom-text-300">Adapter: {agent.adapter} | Status: {agent.status}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-custom-border-200 p-4">
          <h2 className="mb-3 font-medium text-custom-text-100">Configuration</h2>
          <pre className="text-xs text-custom-text-300 overflow-auto">
            {JSON.stringify(agent.config || {}, null, 2)}
          </pre>
        </div>

        <div className="rounded-lg border border-custom-border-200 p-4">
          <h2 className="mb-3 font-medium text-custom-text-100">Cost This Month</h2>
          <p className="text-3xl font-bold text-custom-text-100">
            ${(agent.totalCost || 0).toFixed(2)}
          </p>
          <p className="text-sm text-custom-text-300">of ${(agent.budgetMonthly || 50).toFixed(2)} budget</p>
        </div>
      </div>
    </div>
  );
}
