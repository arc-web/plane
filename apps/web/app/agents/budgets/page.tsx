import { useState, useEffect } from "react";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents/budget-policies")
      .then((r) => r.json())
      .then((data) => setBudgets(Array.isArray(data) ? data : data.policies || []))
      .catch(() => setBudgets([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-custom-text-200">Loading budgets...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-custom-text-100">Agent Budgets</h1>
      {budgets.length === 0 ? (
        <p className="text-custom-text-300">No budget policies configured yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-custom-border-200 text-left text-custom-text-300">
                <th className="p-3">Agent</th>
                <th className="p-3">Monthly Limit</th>
                <th className="p-3">Spent</th>
                <th className="p-3">Remaining</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((b: any) => (
                <tr key={b.id} className="border-b border-custom-border-100">
                  <td className="p-3 text-custom-text-100">{b.agentName}</td>
                  <td className="p-3">${(b.limitCents / 100).toFixed(2)}</td>
                  <td className="p-3">${(b.spentCents / 100).toFixed(2)}</td>
                  <td className="p-3">${((b.limitCents - b.spentCents) / 100).toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`rounded px-2 py-1 text-xs ${b.spentCents >= b.limitCents ? "bg-red-100 text-red-700" : b.spentCents >= b.limitCents * 0.8 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {b.spentCents >= b.limitCents ? "Paused" : b.spentCents >= b.limitCents * 0.8 ? "Warning" : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
