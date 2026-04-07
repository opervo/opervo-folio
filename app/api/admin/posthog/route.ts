import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.posthog.com";
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY; // personal API key (phx_...)

async function pq(query: string) {
  const r = await fetch(`${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${POSTHOG_API_KEY}`,
    },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
    next: { revalidate: 60 },
  });
  if (!r.ok) throw new Error(`PostHog ${r.status}: ${await r.text()}`);
  return r.json();
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    return NextResponse.json({
      configured: false,
      error: "POSTHOG_PROJECT_ID or POSTHOG_PERSONAL_API_KEY not set",
    });
  }
  try {
    // Three queries in parallel: events last 24h, unique users last 24h, top events last 7d
    const [events24h, users24h, topEvents] = await Promise.all([
      pq("SELECT count() FROM events WHERE timestamp >= now() - INTERVAL 1 DAY"),
      pq("SELECT count(DISTINCT distinct_id) FROM events WHERE timestamp >= now() - INTERVAL 1 DAY"),
      pq("SELECT event, count() AS c FROM events WHERE timestamp >= now() - INTERVAL 7 DAY AND event NOT LIKE '$%' GROUP BY event ORDER BY c DESC LIMIT 5"),
    ]);

    return NextResponse.json({
      configured: true,
      events24h: events24h.results?.[0]?.[0] ?? 0,
      uniqueUsers24h: users24h.results?.[0]?.[0] ?? 0,
      topEvents7d: (topEvents.results ?? []).map((row: [string, number]) => ({
        event: row[0],
        count: row[1],
      })),
    });
  } catch (e) {
    return NextResponse.json({ configured: true, error: String(e) }, { status: 500 });
  }
}
