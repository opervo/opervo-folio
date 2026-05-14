import { NextResponse } from "next/server";

// opervo.io/s/:code → app.opervo.io/s/:code (short share-link redirect).
//
// SMS short URLs go out as app.opervo.io/s/AB12CD today, but recipients
// who type "opervo.io/s/AB12CD" by mistake (or share the link by saying
// it out loud) should still land in the right place. This forwards them
// to the app's ShareRedirect route, which looks up the code and renders
// the right public estimate / invoice / report.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const clean = (code || "").toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 16);
  const target = clean ? `https://app.opervo.io/s/${clean}` : "https://app.opervo.io/go";
  return NextResponse.redirect(target, 302);
}
