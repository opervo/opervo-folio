import { NextResponse } from "next/server";

// opervo.io/go → app.opervo.io/go (manual share-code entry page).
//
// The SMS fallback line in app.opervo.io's share flow says
//   "Or enter code AB12CD at opervo.io/go"
// because the marketing domain is shorter and more trustworthy in SMS.
// Recipients hit opervo.io/go and we hand them off to the app where the
// code-entry page actually lives.
export async function GET() {
  return NextResponse.redirect("https://app.opervo.io/go", 302);
}
