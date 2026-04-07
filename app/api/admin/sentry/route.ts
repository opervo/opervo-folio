import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN;
const SENTRY_ORG = process.env.SENTRY_ORG || "opervo";
const SENTRY_PROJECT = process.env.SENTRY_PROJECT || "javascript-react";

async function sf(path: string) {
  const r = await fetch(`https://sentry.io/api/0/${path}`, {
    headers: { Authorization: `Bearer ${SENTRY_AUTH_TOKEN}` },
    next: { revalidate: 120 },
  });
  if (!r.ok) throw new Error(`Sentry ${r.status}: ${await r.text()}`);
  return r.json();
}

interface SentryIssue {
  id: string;
  title: string;
  count: string;
  userCount: number;
  level: string;
  firstSeen: string;
  lastSeen: string;
  permalink: string;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!SENTRY_AUTH_TOKEN) {
    return NextResponse.json({
      configured: false,
      error: "SENTRY_AUTH_TOKEN not set",
    });
  }
  try {
    // Issues from the last 24 hours, sorted by frequency
    const issues = (await sf(
      `projects/${SENTRY_ORG}/${SENTRY_PROJECT}/issues/?statsPeriod=24h&query=is:unresolved&sort=freq&limit=10`
    )) as SentryIssue[];

    const totalErrors = issues.reduce((sum, i) => sum + Number(i.count || 0), 0);
    const affectedUsers = issues.reduce((sum, i) => sum + (i.userCount || 0), 0);

    return NextResponse.json({
      configured: true,
      totalErrors24h: totalErrors,
      uniqueIssues24h: issues.length,
      affectedUsers24h: affectedUsers,
      topIssues: issues.slice(0, 5).map((i) => ({
        id: i.id,
        title: i.title,
        count: Number(i.count),
        userCount: i.userCount,
        level: i.level,
        permalink: i.permalink,
      })),
    });
  } catch (e) {
    return NextResponse.json({ configured: true, error: String(e) }, { status: 500 });
  }
}
