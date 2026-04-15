import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const VERCEL_TEAM_ID = "team_lqDtIwNF4TpPg8jCNvFE64jm";
const VERCEL_PROJECT_ID = "prj_95HHHgVNcIN5b3377pZlwrqrqB1S";

export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vercelToken = process.env.VERCEL_TOKEN;
  if (!vercelToken) {
    return NextResponse.json({
      configured: false,
      error: "VERCEL_TOKEN not set. Get one from vercel.com/account/tokens.",
      logs: [],
    });
  }

  const url = new URL(req.url);
  const environment = url.searchParams.get("environment") || "production";
  const level = url.searchParams.get("level") || "";
  const limit = Math.min(Number(url.searchParams.get("limit") || 50), 200);

  try {
    // Use Vercel's runtime logs API
    const params = new URLSearchParams({
      projectId: VERCEL_PROJECT_ID,
      teamId: VERCEL_TEAM_ID,
      limit: String(limit),
      ...(environment && { environment }),
    });

    const res = await fetch(
      `https://api.vercel.com/v1/projects/${VERCEL_PROJECT_ID}/runtime-logs?${params}`,
      {
        headers: { Authorization: `Bearer ${vercelToken}` },
      }
    );

    if (!res.ok) {
      // Fall back to deployment events if runtime logs API fails
      const deploymentsRes = await fetch(
        `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&teamId=${VERCEL_TEAM_ID}&limit=5`,
        { headers: { Authorization: `Bearer ${vercelToken}` } }
      );

      if (!deploymentsRes.ok) {
        return NextResponse.json({
          configured: true,
          error: `Vercel API error: ${res.status}`,
          logs: [],
        });
      }

      const deploys = await deploymentsRes.json();
      const latestDeploy = deploys.deployments?.[0];
      if (!latestDeploy) {
        return NextResponse.json({ configured: true, logs: [] });
      }

      // Get build logs for latest deployment
      const buildRes = await fetch(
        `https://api.vercel.com/v2/deployments/${latestDeploy.uid}/events?teamId=${VERCEL_TEAM_ID}`,
        { headers: { Authorization: `Bearer ${vercelToken}` } }
      );

      if (!buildRes.ok) {
        return NextResponse.json({ configured: true, error: "Could not fetch logs", logs: [] });
      }

      const events = await buildRes.json();
      const logs = (events || []).slice(-limit).map((e: Record<string, unknown>, i: number) => ({
        id: String(i),
        timestamp: e.created ? new Date(e.created as number).toISOString() : new Date().toISOString(),
        level: (e.type as string) === "error" ? "error" : "info",
        message: (e.text as string) || (e.payload as Record<string, unknown>)?.text || JSON.stringify(e),
        source: "build",
      }));

      return NextResponse.json({ configured: true, logs, source: "build-events" });
    }

    const data = await res.json();
    const logs = (data.logs || data || []).slice(0, limit).map((l: Record<string, unknown>, i: number) => ({
      id: (l.id as string) || String(i),
      timestamp: l.timestamp || l.createdAt || new Date().toISOString(),
      level: (l.level as string) || "info",
      message: (l.message as string) || JSON.stringify(l),
      source: (l.source as string) || "runtime",
      requestPath: l.path || l.requestPath,
      statusCode: l.statusCode,
    }));

    // Filter by level if specified
    const filtered = level
      ? logs.filter((l: { level: string }) => l.level === level)
      : logs;

    return NextResponse.json({ configured: true, logs: filtered });
  } catch (e) {
    return NextResponse.json({ configured: true, error: String(e), logs: [] }, { status: 500 });
  }
}
