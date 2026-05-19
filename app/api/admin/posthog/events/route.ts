import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.posthog.com";
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;

async function pq(query: string) {
  const r = await fetch(
    `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${POSTHOG_API_KEY}`,
      },
      body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
    }
  );
  if (!r.ok) throw new Error(`PostHog ${r.status}: ${await r.text()}`);
  return r.json();
}

export async function GET(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    return NextResponse.json({
      configured: false,
      error: "PostHog not configured",
    });
  }

  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const period = url.searchParams.get("period") || "7d";

  try {
    const interval = period === "24h" ? "1 DAY" : period === "30d" ? "30 DAY" : "7 DAY";

    const queries: Promise<unknown>[] = [
      // Feature adoption: which custom events are most used
      pq(
        `SELECT event, count() AS c, count(DISTINCT distinct_id) AS users
         FROM events
         WHERE timestamp >= now() - INTERVAL ${interval}
           AND event NOT LIKE '$%'
         GROUP BY event
         ORDER BY c DESC
         LIMIT 20`
      ),
      // Daily active users trend
      pq(
        `SELECT toDate(timestamp) AS day, count(DISTINCT distinct_id) AS users
         FROM events
         WHERE timestamp >= now() - INTERVAL ${interval}
         GROUP BY day
         ORDER BY day`
      ),
      // Top pages
      pq(
        `SELECT properties.$current_url AS url, count() AS views
         FROM events
         WHERE timestamp >= now() - INTERVAL ${interval}
           AND event = '$pageview'
         GROUP BY url
         ORDER BY views DESC
         LIMIT 15`
      ),
    ];

    // If userId provided, also get their event stream
    if (userId) {
      queries.push(
        pq(
          `SELECT event, timestamp, properties.$current_url AS url
           FROM events
           WHERE distinct_id = '${userId.replace(/'/g, "''")}'
             AND timestamp >= now() - INTERVAL ${interval}
           ORDER BY timestamp DESC
           LIMIT 50`
        )
      );
    }

    const results = await Promise.allSettled(queries);

    const featureAdoption =
      results[0].status === "fulfilled"
        ? ((results[0].value as { results?: string[][] }).results ?? []).map(
            (r: string[]) => ({
              event: r[0],
              count: Number(r[1]),
              users: Number(r[2]),
            })
          )
        : [];

    const dauTrend =
      results[1].status === "fulfilled"
        ? ((results[1].value as { results?: string[][] }).results ?? []).map(
            (r: string[]) => ({
              day: r[0],
              users: Number(r[1]),
            })
          )
        : [];

    const topPages =
      results[2].status === "fulfilled"
        ? ((results[2].value as { results?: string[][] }).results ?? []).map(
            (r: string[]) => ({
              url: r[0],
              views: Number(r[1]),
            })
          )
        : [];

    let userEvents: { event: string; timestamp: string; url: string }[] = [];
    if (userId && results[3]?.status === "fulfilled") {
      userEvents = (
        (results[3].value as { results?: string[][] }).results ?? []
      ).map((r: string[]) => ({
        event: r[0],
        timestamp: r[1],
        url: r[2] || "",
      }));
    }

    return NextResponse.json({
      configured: true,
      period,
      featureAdoption,
      dauTrend,
      topPages,
      userEvents: userId ? userEvents : undefined,
    });
  } catch (err) {
    console.error("[admin/posthog/events] Error:", err);
    return NextResponse.json(
      { configured: true, error: String(err) },
      { status: 500 }
    );
  }
}
