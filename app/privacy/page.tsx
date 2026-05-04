export default function PrivacyPolicy() {
  return (
    <div style={{fontFamily:"'Barlow',sans-serif",background:"#F7F5F2",minHeight:"100vh",color:"#1a1a1a"}}>
      <header style={{background:"#fff",borderBottom:"1px solid #E8E4DE",padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="https://www.opervo.io" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:900,fontSize:22,color:"#0F0F0F",textDecoration:"none",letterSpacing:"-0.5px"}}>Opervo<span style={{color:"#F5620F"}}>.</span></a>
        <a href="https://www.opervo.io" style={{fontSize:14,color:"#6B6B6B",textDecoration:"none"}}>← Back to Opervo</a>
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
          ["3. Data Storage & Protection","Your data is stored securely via Supabase on AWS servers in the US. All data is encrypted in transit using TLS/HTTPS and encrypted at rest using AES-256. Access to production systems is restricted to authorized personnel using multi-factor authentication. We perform regular security reviews and follow industry-standard practices to protect sensitive data from unauthorized access, alteration, disclosure, or destruction."],
          ["4. Third Parties & Data Sharing","We share data only with third-party services required to operate Opervo: Stripe (payment processing), Google Calendar (scheduling sync), Telnyx (SMS notifications), and Resend (email delivery). Each provider receives only the minimum data necessary to perform their function and is governed by their own privacy policy. We do not sell, rent, trade, or otherwise transfer your personal data to any third party for marketing, advertising, or any purpose unrelated to providing the Opervo service."],
          ["4a. SMS / Text Messaging","If you provide your mobile phone number — through a quote request form, when a service professional enters it on your behalf, or when setting up your own Opervo account — you may receive automated SMS messages from Opervo on behalf of the service business you are working with. Message types include appointment reminders, on-my-way alerts, job completion updates, invoice delivery, and account notifications. Message frequency varies based on service activity. Message and data rates may apply. Reply STOP to any message to opt out, or HELP for assistance. We will not share or sell your mobile information (including phone numbers and opt-in data) with third parties or affiliates for promotional or marketing purposes. Mobile information is used solely to deliver the messages you have consented to receive and is shared only with Telnyx, our SMS delivery provider, as necessary to transmit those messages."],
          ["5. Google User Data","Opervo's use of Google Calendar data is limited to reading and writing calendar events for job scheduling sync. We do not share, transfer, or disclose Google user data to any third party. Google data is stored only in your Opervo account and is not used for advertising or any purpose other than providing the scheduling feature you authorized. You can revoke access at any time via your Google Account settings. Opervo's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements."],
          ["6. Your Client Data","You are responsible for any client data you enter. We process it on your behalf only to provide the service."],
          ["7. Data Retention","We keep your data while your account is active. On cancellation, data is retained for 30 days then deleted. You can request deletion at any time by emailing help@opervo.io."],
          ["8. Your Rights","Access, correct, export, or delete your data at any time. Email help@opervo.io."],
          ["9. Cookies","We use essential cookies only for authentication and session management. No advertising or tracking cookies."],
          ["10. Children","Opervo is not intended for users under 18."],
          ["11. Changes","We will notify you of material changes by email at least 14 days before they take effect."],
          ["12. Contact","help@opervo.io · opervo.io · Austin, Texas"],
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