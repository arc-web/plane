import { useState, useEffect } from "react";

interface Agent {
  id: string;
  name: string;
  status: string;
  adapter: string;
  totalCost?: number;
  lastHeartbeat?: string;
}

export default function AgentRegistryPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents/agents")
      .then((r) => r.json())
      .then((data) => setAgents(Array.isArray(data) ? data : data.agents || []))
      .catch(() => setAgents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-custom-text-200">Loading agents...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-custom-text-100">Agent Registry</h1>
        <span className="text-sm text-custom-text-300">{agents.length} agents</span>
      </div>

      {agents.length === 0 ? (
        <div className="rounded-lg border border-custom-border-200 p-8 text-center">
          <p className="text-custom-text-300">No agents registered yet.</p>
          <p className="mt-2 text-sm text-custom-text-400">Agents will appear here once registered in Paperclip.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <a
              key={agent.id}
              href={`agents/${agent.id}`}
              className="rounded-lg border border-custom-border-200 p-4 transition hover:border-custom-primary-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    agent.status === "online" ? "bg-green-500" : agent.status === "busy" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                />
                <h3 className="font-medium text-custom-text-100">{agent.name}</h3>
              </div>
              <div className="mt-3 space-y-1 text-sm text-custom-text-300">
                <p>Adapter: {agent.adapter}</p>
                {agent.totalCost != null && <p>Cost this month: ${agent.totalCost.toFixed(2)}</p>}
                {agent.lastHeartbeat && (
                  <p>Last heartbeat: {new Date(agent.lastHeartbeat).toLocaleTimeString()}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
