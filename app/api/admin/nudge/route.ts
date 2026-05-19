import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdmin } from "@/lib/admin-auth";

const RESEND_KEY = process.env.RESEND_API_KEY;

const TEMPLATES: Record<string, { subject: string; body: (name: string) => string }> = {
  profile: {
    subject: "Finish setting up your Opervo account",
    body: (name) =>
      `Hey ${name},\n\nYou signed up for Opervo but haven't finished setting up your business profile yet. It takes about 2 minutes and unlocks everything: invoicing, scheduling, your public portfolio page, and more.\n\nLog in and finish setup: https://app.opervo.io/settings\n\nQuestions? Just reply to this email.\n\n- Max, Founder of Opervo`,
  },
  first_job: {
    subject: "Create your first job in Opervo",
    body: (name) =>
      `Hey ${name},\n\nYour Opervo account is set up. The next step is creating your first job. You can add a client, schedule it, and even send an invoice when it's done.\n\nCreate a job: https://app.opervo.io/jobs/new\n\nNeed help? Reply here and I'll walk you through it.\n\n- Max, Founder of Opervo`,
  },
  first_invoice: {
    subject: "Send your first invoice with Opervo",
    body: (name) =>
      `Hey ${name},\n\nYou've been creating jobs in Opervo. Ready to get paid through the app? Send a professional invoice in under a minute. Your clients can pay with card, Apple Pay, or Google Pay.\n\nSend an invoice: https://app.opervo.io/invoices/new\n\nReply if you need anything.\n\n- Max, Founder of Opervo`,
  },
  first_payment: {
    subject: "Get paid faster with Opervo",
    body: (name) =>
      `Hey ${name},\n\nYou've sent invoices through Opervo. Once you connect a payment processor (Stripe or Square), your clients can pay online instantly. Most operators get paid the same day.\n\nConnect payments: https://app.opervo.io/settings/payments\n\nHappy to help if you have questions.\n\n- Max, Founder of Opervo`,
  },
  general: {
    subject: "How's Opervo working for you?",
    body: (name) =>
      `Hey ${name},\n\nJust checking in. You signed up for Opervo recently and I wanted to see if everything's working for you. If you're stuck on anything, hit reply and I'll personally help you get set up.\n\nLog in: https://app.opervo.io\n\n- Max, Founder of Opervo`,
  },
};

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!RESEND_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const { userId, template: templateKey } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile } = await supabase
      .from("profiles")
      .select("owner_name, business_name, email")
      .eq("user_id", userId)
      .single();

    let email = profile?.email;
    if (!email) {
      const { data: authData } = await supabase.auth.admin.getUserById(userId);
      email = authData?.user?.email;
    }

    if (!email) {
      return NextResponse.json(
        { error: "Could not find email for user" },
        { status: 404 }
      );
    }

    const name =
      profile?.owner_name?.split(" ")[0] ||
      profile?.business_name ||
      email.split("@")[0];

    const tmpl = TEMPLATES[templateKey] || TEMPLATES.general;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({
        from: "Max from Opervo <welcome@opervo.io>",
        to: email,
        subject: tmpl.subject,
        text: tmpl.body(name),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[admin/nudge] Resend error:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    const result = await res.json();
    return NextResponse.json({ ok: true, emailId: result.id, to: email });
  } catch (err) {
    console.error("[admin/nudge] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
