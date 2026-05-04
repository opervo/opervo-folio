import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Your Account — Opervo',
  description: 'How to delete your Opervo account and what data is removed or retained.',
  alternates: { canonical: 'https://www.opervo.io/delete-account' },
  robots: { index: true, follow: true },
};

export default function DeleteAccount() {
  return (
    <div style={{fontFamily:"'Barlow',sans-serif",background:"#F7F5F2",minHeight:"100vh",color:"#1a1a1a"}}>
      <header style={{background:"#fff",borderBottom:"1px solid #E8E4DE",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="https://www.opervo.io" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,color:"#0F0F0F",textDecoration:"none",letterSpacing:"-0.5px"}}>Opervo<span style={{color:"#F5620F"}}>.</span></a>
        <a href="https://www.opervo.io" style={{fontSize:14,color:"#6B6B6B",textDecoration:"none"}}>← Back to Opervo</a>
      </header>
      <div style={{maxWidth:760,margin:"0 auto",padding:"56px 24px 80px"}}>
        <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:36,color:"#0F0F0F",marginBottom:8,letterSpacing:"-1px"}}>Delete Your Account</h1>
        <p style={{fontSize:14,color:"#6B6B6B",marginBottom:48}}>You can delete your Opervo account and associated data at any time.</p>

        <div style={{background:"#fff",borderLeft:"3px solid #F5620F",borderRadius:"0 8px 8px 0",padding:"20px 24px",marginBottom:32,fontSize:15,color:"#2d2d2d"}}>
          Deleting your account is permanent. Your jobs, clients, invoices, estimates, and folio will be removed. Active subscriptions are cancelled.
        </div>

        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:20,color:"#0F0F0F",margin:"32px 0 12px"}}>Option 1 — Delete from inside the app</h2>
        <ol style={{fontSize:15,color:"#2d2d2d",paddingLeft:20,lineHeight:1.7}}>
          <li>Open Opervo on your phone or at <a href="https://app.opervo.io" style={{color:"#F5620F"}}>app.opervo.io</a></li>
          <li>Go to <strong>Settings → Account</strong></li>
          <li>Tap <strong>Delete Account</strong> and confirm</li>
        </ol>

        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:20,color:"#0F0F0F",margin:"40px 0 12px"}}>Option 2 — Email us</h2>
        <p style={{fontSize:15,color:"#2d2d2d",marginBottom:8}}>If you can&apos;t access your account, email <a href="mailto:help@opervo.io?subject=Delete%20My%20Account" style={{color:"#F5620F",fontWeight:600}}>help@opervo.io</a> from the address on file with the subject <em>&quot;Delete My Account&quot;</em>. We respond within 2 business days.</p>

        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:20,color:"#0F0F0F",margin:"40px 0 12px"}}>What gets deleted</h2>
        <ul style={{fontSize:15,color:"#2d2d2d",paddingLeft:20,lineHeight:1.7}}>
          <li>Your profile, business info, and login credentials</li>
          <li>All jobs, clients, estimates, invoices, payments, and recurring service plans</li>
          <li>Photos, files, and notes you uploaded</li>
          <li>Your folio (public portfolio) page</li>
          <li>Team member invitations and accounts you created</li>
          <li>Mileage logs, expense records, and tax reports</li>
        </ul>

        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:20,color:"#0F0F0F",margin:"40px 0 12px"}}>What we retain (and why)</h2>
        <ul style={{fontSize:15,color:"#2d2d2d",paddingLeft:20,lineHeight:1.7}}>
          <li><strong>Financial records</strong> — payment and invoice metadata is retained for 7 years to comply with US tax and accounting law (IRS recordkeeping requirements). Personally identifying details are minimized.</li>
          <li><strong>Anonymized analytics</strong> — aggregate, non-identifying usage events are retained for product improvement.</li>
          <li><strong>Backups</strong> — encrypted backups are purged on a 30-day rolling basis. After 30 days no copy of your data remains.</li>
        </ul>

        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:20,color:"#0F0F0F",margin:"40px 0 12px"}}>Active subscriptions</h2>
        <p style={{fontSize:15,color:"#2d2d2d",marginBottom:16}}>Deleting your account cancels your subscription immediately. You will not be charged for any future billing periods. Refunds for the current period are not automatic — email <a href="mailto:help@opervo.io" style={{color:"#F5620F"}}>help@opervo.io</a> if you believe a refund is owed.</p>

        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:20,color:"#0F0F0F",margin:"40px 0 12px"}}>Questions</h2>
        <p style={{fontSize:15,color:"#2d2d2d"}}>Email <a href="mailto:help@opervo.io" style={{color:"#F5620F",fontWeight:600}}>help@opervo.io</a>. See our <a href="/privacy" style={{color:"#F5620F"}}>Privacy Policy</a> for full details on how we handle your data.</p>
      </div>
      <footer style={{textAlign:"center",padding:"32px 24px",borderTop:"1px solid #E8E4DE",fontSize:13,color:"#9ca3af"}}>
        <p>2026 Opervo · <a href="/privacy" style={{color:"#9ca3af"}}>Privacy</a> · <a href="/tos" style={{color:"#9ca3af"}}>Terms of Service</a> · help@opervo.io</p>
      </footer>
    </div>
  );
}
