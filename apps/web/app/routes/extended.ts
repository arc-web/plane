/**
 * ClawForge Agent Routes
 * These routes are additive to Plane's core routes.
 * The extendedRoutes array is merged with coreRoutes in routes.ts.
 */

import { route, index, layout } from "@react-router/dev/routes";
import type { RouteConfigEntry } from "@react-router/dev/routes";

export const extendedRoutes: RouteConfigEntry[] = [
  route(":workspaceSlug/agents", "./agents/layout.tsx", [
    index("./agents/page.tsx"),
    route(":agentId", "./agents/[agentId]/page.tsx"),
    route("budgets", "./agents/budgets/page.tsx"),
    route("heartbeats", "./agents/heartbeats/page.tsx"),
    route("org-chart", "./agents/org-chart/page.tsx"),
  ]),
];
