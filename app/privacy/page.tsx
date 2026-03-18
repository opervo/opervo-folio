export default function PrivacyPolicy() {
  return (
    <div style={{fontFamily:"'Barlow',sans-serif",background:"#F7F5F2",minHeight:"100vh",color:"#1a1a1a"}}>
      <header style={{background:"#fff",borderBottom:"1px solid #E8E4DE",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="https://opervo.io" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,color:"#0F0F0F",textDecoration:"none",letterSpacing:"-0.5px"}}>Opervo<span style={{color:"#F5620F"}}>.</span></a>
        <a href="https://opervo.io" style={{fontSize:14,color:"#6B6B6B",textDecoration:"none"}}>← Back to Opervo</a>
      </header>
      <div style={{maxWidth:760,margin:"0 auto",padding:"56px 24px 80px"}}>
        <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:36,color:"#0F0F0F",marginBottom:8,letterSpacing:"-1px"}}>Privacy Policy</h1>
        <p style={{fontSize:14,color:"#6B6B6B",marginBottom:48}}>Effective date: March 18, 2026</p>
        <div style={{background:"#fff",borderLeft:"3px solid #F5620F",borderRadius:"0 8px 8px 0",padding:"20px 24px",marginBottom:48,fontSize:15,color:"#2d2d2d"}}>
          This Privacy Policy explains how Opervo collects, uses, and protects your information when you use our service.
        </div>
        {[
          ["1. What We Collect","Name, email, business name, job and client data you enter, payment info (processed by Stripe, not stored by us), and device/browser info for analytics."],
          ["2. How We Use It","To provide and improve the service, send transactional emails (welcome, invoices, notifications), and respond to support requests. We do not sell your data."],
          ["3. Data Storage","Data stored securely via Supabase on AWS servers in the US. Encrypted in transit (HTTPS) and at rest."],
          ["4. Third Parties","Stripe (payments), Google Calendar (scheduling sync), Resend (email delivery). Each has their own privacy policy. We share only what's needed to provide the service."],
          ["5. Your Client Data","You are responsible for any client data you enter. We process it on your behalf only to provide the service."],
          ["6. Data Retention","We keep your data while your account is active. On cancellation, data is retained for 30 days then deleted. You can request deletion at any time by emailing help@opervo.io."],
          ["7. Your Rights","Access, correct, export, or delete your data at any time. Email help@opervo.io."],
          ["8. Cookies","We use essential cookies only for authentication and session management. No advertising or tracking cookies."],
          ["9. Children","Opervo is not intended for users under 18."],
          ["10. Changes","We will notify you of material changes by email at least 14 days before they take effect."],
          ["11. Contact","help@opervo.io · opervo.io · Austin, Texas"],
        ].map(([title, body]) => (
          <div key={title}>
            <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:18,color:"#0F0F0F",margin:"40px 0 12px",paddingBottom:8,borderBottom:"1px solid #E8E4DE"}}>
              <span style={{display:"inline-block",background:"#F5620F",color:"white",fontSize:11,fontWeight:900,padding:"2px 8px",borderRadius:4,marginRight:8}}>{title.split(".")[0]}</span>
              {title.split(". ")[1]}
            </h2>
            <p style={{fontSize:15,color:"#2d2d2d",marginBottom:16}}>{body}</p>
          </div>
        ))}
      </div>
      <footer style={{textAlign:"center",padding:"32px 24px",borderTop:"1px solid #E8E4DE",fontSize:13,color:"#9ca3af"}}>
        <p>2026 Opervo · <a href="/tos" style={{color:"#9ca3af"}}>Terms of Service</a> · help@opervo.io</p>
      </footer>
    </div>
  );
}