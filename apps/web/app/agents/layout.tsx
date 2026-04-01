import { Outlet, Link, useParams } from "react-router";

export default function AgentsLayout() {
  const { workspaceSlug } = useParams();
  const base = `/${workspaceSlug}/agents`;

  return (
    <div className="flex h-full">
      <aside className="w-56 shrink-0 border-r border-custom-border-200 bg-custom-sidebar-background-100 p-4">
        <h2 className="mb-4 text-lg font-semibold text-custom-text-100">Agents</h2>
        <nav className="flex flex-col gap-1">
          <Link to={base} className="rounded px-3 py-2 text-sm text-custom-text-200 hover:bg-custom-sidebar-background-80">
            Registry
          </Link>
          <Link to={`${base}/budgets`} className="rounded px-3 py-2 text-sm text-custom-text-200 hover:bg-custom-sidebar-background-80">
            Budgets
          </Link>
          <Link to={`${base}/heartbeats`} className="rounded px-3 py-2 text-sm text-custom-text-200 hover:bg-custom-sidebar-background-80">
            Heartbeats
          </Link>
          <Link to={`${base}/org-chart`} className="rounded px-3 py-2 text-sm text-custom-text-200 hover:bg-custom-sidebar-background-80">
            Org Chart
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
