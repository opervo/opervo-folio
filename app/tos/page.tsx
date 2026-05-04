export default function TermsOfService() {
  return (
    <div style={{fontFamily:"'Barlow',sans-serif",background:"#F7F5F2",minHeight:"100vh",color:"#1a1a1a"}}>
      <header style={{background:"#fff",borderBottom:"1px solid #E8E4DE",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="https://www.opervo.io" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,color:"#0F0F0F",textDecoration:"none"}}>Opervo<span style={{color:"#F5620F"}}>.</span></a>
        <a href="https://www.opervo.io" style={{fontSize:14,color:"#6B6B6B",textDecoration:"none"}}>Back to Opervo</a>
      </header>
      <div style={{maxWidth:760,margin:"0 auto",padding:"56px 24px 80px"}}>
        <h1 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:36,color:"#0F0F0F",marginBottom:8}}>Terms of Service</h1>
        <p style={{fontSize:14,color:"#6B6B6B",marginBottom:48}}>Effective date: March 18, 2026</p>
        <div style={{background:"#fff",borderLeft:"3px solid #F5620F",borderRadius:"0 8px 8px 0",padding:"20px 24px",marginBottom:48,fontSize:15,color:"#2d2d2d"}}>
          Please read these Terms carefully before using Opervo. By creating an account you agree to these terms.
        </div>
        {[
          ["1","About Opervo","Opervo is a SaaS platform for home service trade operators — job scheduling, client management, invoicing, estimates, and payment processing at app.opervo.io. Operated as a sole proprietorship in Austin, Texas."],
          ["2","Acceptance","By using Opervo you confirm you are 18+, have legal authority to agree, will use the service lawfully, and have read our Privacy Policy."],
          ["3","Your Account","You are responsible for account security and all activity under your account. Notify us at help@opervo.io of any unauthorized access."],
          ["4","Subscription and Billing","Solo Plan: $24.99/month. Team Plan: $54.99/month. 14-day free trial, no credit card required. Monthly auto-renewing billing. 30 days notice for price changes. Payments via Stripe or Square."],
          ["5","Refunds","7-day money-back guarantee on your first paid month. Email help@opervo.io within 7 days for a full refund. After 7 days charges are final."],
          ["6","Acceptable Use","Do not violate laws, infringe IP, transmit malware, gain unauthorized access, scrape, or misrepresent your identity."],
          ["7","Your Data","You own all content you input. We do not sell your data. Request a data export within 30 days of account termination."],
          ["8","Client Payments","You are solely responsible for disputes between you and your clients. Comply with all payment and tax laws."],
          ["9","Intellectual Property","All Opervo content and the Opervo name/logo are our property. No copying or distribution without permission."],
          ["10","Third-Party Services","Integrates with Stripe, Google Calendar, Resend. Subject to their own terms."],
          ["11","Disclaimers","Provided as-is. No warranty of uptime or error-free service."],
          ["12","Limitation of Liability","Not liable for indirect or consequential damages. Liability capped at 3 months of fees paid."],
          ["13","Indemnification","You indemnify Opervo from claims arising from your use or violations."],
          ["14","Termination","Cancel anytime. We may suspend for violations or with 30 days notice."],
          ["15","Governing Law","Texas law. Arbitration in Austin TX under AAA rules. Class action waiver."],
          ["16","Changes","14 days notice of material changes."],
          ["17","SMS Terms","By providing your phone number to a business using Opervo, you consent to receive automated SMS notifications including appointment reminders, on-my-way alerts, job completion updates, and invoice delivery. Message frequency varies based on service activity. Message and data rates may apply. Reply STOP to any message to opt out. Reply HELP for assistance. Carriers are not liable for delayed or undelivered messages. For questions, contact help@opervo.io."],
          ["18","Contact","help@opervo.io · opervo.io · Austin, Texas"],
        ].map(([num, title, body]) => (
          <div key={num}>
            <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:800,fontSize:18,color:"#0F0F0F",margin:"40px 0 12px",paddingBottom:8,borderBottom:"1px solid #E8E4DE"}}>
              <span style={{display:"inline-block",background:"#F5620F",color:"white",fontSize:11,fontWeight:900,padding:"2px 8px",borderRadius:4,marginRight:8}}>{num}</span>
              {title}
            </h2>
            <p style={{fontSize:15,color:"#2d2d2d",marginBottom:16}}>{body}</p>
          </div>
        ))}
      </div>
      <footer style={{textAlign:"center",padding:"32px 24px",borderTop:"1px solid #E8E4DE",fontSize:13,color:"#9ca3af"}}>
        <p>2026 Opervo · <a href="/privacy" style={{color:"#9ca3af"}}>Privacy Policy</a> · help@opervo.io</p>
      </footer>
    </div>
  );
}