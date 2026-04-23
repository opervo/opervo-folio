import { NextResponse } from "next/server";

// opervo.io/r/:code → redirect to opervo.io/?ref=:code so the referee lands
// on the marketing page with the "Invited by {Business}" banner visible,
// then clicks through to signup themselves (CTAs carry ref through).
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const cleanCode = (code || "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16);
  const origin = new URL(req.url).origin;
  const target = cleanCode ? `${origin}/?ref=${cleanCode}` : origin;
  return NextResponse.redirect(target, 302);
}
