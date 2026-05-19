import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN;
const SENTRY_ORG = process.env.SENTRY_ORG || "opervo";
const SENTRY_PROJECT = process.env.SENTRY_PROJECT || "javascript-react";

async function sf(path: string) {
  const r = await fetch(`https://sentry.io/api/0/${path}`, {
    headers: { Authorization: `Bearer ${SENTRY_AUTH_TOKEN}` },
  });
  if (!r.ok) throw new Error(`Sentry ${r.status}: ${await r.text()}`);
  return r.json();
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!SENTRY_AUTH_TOKEN) {
    return NextResponse.json(
      { error: "SENTRY_AUTH_TOKEN not set" },
      { status: 500 }
    );
  }

  const { id } = await params;

  try {
    const [issue, events, tags] = await Promise.all([
      sf(`issues/${id}/`),
      sf(`issues/${id}/events/?limit=10`),
      sf(`issues/${id}/tags/`),
    ]);

    // Extract stacktrace from latest event
    let stacktrace: string[] = [];
    let breadcrumbs: { category?: string; message?: string; timestamp?: string }[] = [];

    if (events.length > 0) {
      const latest = events[0];

      // Get stacktrace frames
      const exception = latest.entries?.find(
        (e: { type: string }) => e.type === "exception"
      );
      if (exception?.data?.values) {
        for (const exc of exception.data.values) {
          if (exc.stacktrace?.frames) {
            stacktrace = exc.stacktrace.frames
              .filter((f: { inApp?: boolean }) => f.inApp)
              .reverse()
              .slice(0, 15)
              .map(
                (f: {
                  filename?: string;
                  lineNo?: number;
                  colNo?: number;
                  function?: string;
                  context?: [number, string][];
                }) => {
                  const loc = `${f.filename || "?"}:${f.lineNo || "?"}:${f.colNo || "?"}`;
                  const fn = f.function || "(anonymous)";
                  const ctx =
                    f.context
                      ?.map(([, line]: [number, string]) => line)
                      .join("\n") || "";
                  return `${fn} at ${loc}${ctx ? "\n" + ctx : ""}`;
                }
              );
          }
        }
      }

      // Get breadcrumbs
      const crumbEntry = latest.entries?.find(
        (e: { type: string }) => e.type === "breadcrumbs"
      );
      if (crumbEntry?.data?.values) {
        breadcrumbs = crumbEntry.data.values
          .slice(-20)
          .map(
            (b: {
              category?: string;
              message?: string;
              timestamp?: string;
            }) => ({
              category: b.category,
              message: b.message,
              timestamp: b.timestamp,
            })
          );
      }
    }

    // Parse tags
    const tagSummary = (tags || []).map(
      (t: { key: string; topValues: { value: string; count: number }[] }) => ({
        key: t.key,
        values: (t.topValues || []).slice(0, 5).map((v) => ({
          value: v.value,
          count: v.count,
        })),
      })
    );

    return NextResponse.json({
      issue: {
        id: issue.id,
        title: issue.title,
        culprit: issue.culprit,
        level: issue.level,
        count: Number(issue.count),
        userCount: issue.userCount,
        firstSeen: issue.firstSeen,
        lastSeen: issue.lastSeen,
        permalink: issue.permalink,
        status: issue.status,
        platform: issue.platform,
        type: issue.type,
        metadata: issue.metadata,
      },
      stacktrace,
      breadcrumbs,
      tags: tagSummary,
      eventCount: events.length,
      events: events.slice(0, 5).map(
        (e: {
          eventID: string;
          dateCreated: string;
          user?: { email?: string; ip_address?: string };
          tags?: { key: string; value: string }[];
        }) => ({
          id: e.eventID,
          date: e.dateCreated,
          user: e.user?.email || e.user?.ip_address || null,
          browser:
            e.tags?.find((t) => t.key === "browser")?.value || null,
          os: e.tags?.find((t) => t.key === "os")?.value || null,
          url: e.tags?.find((t) => t.key === "url")?.value || null,
        })
      ),
    });
  } catch (err) {
    console.error("[admin/sentry/issue] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
