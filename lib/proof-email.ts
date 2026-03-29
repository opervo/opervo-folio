// Generates the HTML proof email sent to the customer after payment

const THEME_COLORS: Record<string, { accent: string; backBg: string }> = {
  Navy:   { accent: '#1A3A6B', backBg: '#1A3A6B' },
  Slate:  { accent: '#374151', backBg: '#374151' },
  Forest: { accent: '#1A5C3A', backBg: '#1A5C3A' },
  Rust:   { accent: '#C0392B', backBg: '#C0392B' },
  Gold:   { accent: '#92400E', backBg: '#92400E' },
  Black:  { accent: '#0F0F0F', backBg: '#0F0F0F' },
}

function businessCardHtml(order: {
  businessName: string; trade: string; phone: string; website: string; colorTheme: string
}) {
  const t = THEME_COLORS[order.colorTheme] || THEME_COLORS['Navy']
  const website = order.website?.replace(/^https?:\/\//, '') || ''

  return `
    <!-- Business Card Mockup -->
    <table width="300" cellpadding="0" cellspacing="0" style="margin:0 auto 8px;border-radius:8px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);border:1px solid #E8E4DE;">
      <tr><td style="background:#fff;padding:16px 20px 16px 24px;border-left:4px solid ${t.accent};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        <div style="font-weight:900;font-size:15px;color:#0F0F0F;text-transform:uppercase;letter-spacing:0.01em;line-height:1.1;">${order.businessName}</div>
        <div style="font-weight:700;font-size:10px;color:${t.accent};text-transform:uppercase;letter-spacing:0.08em;margin:4px 0 12px;">${order.trade}</div>
        <div style="font-size:10px;color:#4B5563;margin-bottom:3px;">&#9990; ${order.phone}</div>
        ${website ? `<div style="font-size:10px;color:#4B5563;">&#127760; ${website}</div>` : ''}
      </td></tr>
    </table>
    <div style="text-align:center;margin-bottom:4px;">
      <table width="300" cellpadding="0" cellspacing="0" style="margin:0 auto;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        <tr><td style="background:${t.backBg};padding:18px 20px;text-align:center;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <div style="font-weight:900;font-size:18px;color:#fff;text-transform:uppercase;letter-spacing:-0.5px;line-height:1.1;">${order.businessName}</div>
          <div style="width:32px;height:2px;background:rgba(255,255,255,0.4);margin:8px auto;border-radius:99px;"></div>
          <div style="font-size:10px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.1em;">${order.trade}</div>
        </td></tr>
      </table>
    </div>
  `
}

function doorHangerHtml(order: {
  businessName: string; trade: string; phone: string; colorTheme: string
}) {
  const t = THEME_COLORS[order.colorTheme] || THEME_COLORS['Navy']

  return `
    <!-- Door Hanger Mockup -->
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr valign="top">
        <td style="padding-right:12px;">
          <div style="font-size:10px;color:#6B6B6B;text-align:center;margin-bottom:6px;font-family:sans-serif;text-transform:uppercase;letter-spacing:0.08em;">Front</div>
          <table width="90" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);border:1px solid #E8E4DE;">
            <tr><td style="background:#fff;padding:20px 8px 12px;text-align:center;font-family:sans-serif;border-top:4px solid ${t.accent};">
              <div style="width:28px;height:28px;background:${t.accent};border-radius:6px;margin:0 auto 8px;line-height:28px;font-size:14px;">🏠</div>
              <div style="font-weight:900;font-size:8px;color:#0F0F0F;text-transform:uppercase;line-height:1.2;">${order.businessName}</div>
              <div style="font-size:6px;color:${t.accent};font-weight:700;text-transform:uppercase;margin:4px 0 12px;">${order.trade}</div>
              <div style="height:1px;background:#E8E4DE;margin-bottom:8px;"></div>
              <div style="font-size:7px;color:#374151;font-weight:700;">${order.phone}</div>
            </td></tr>
          </table>
        </td>
        <td>
          <div style="font-size:10px;color:#6B6B6B;text-align:center;margin-bottom:6px;font-family:sans-serif;text-transform:uppercase;letter-spacing:0.08em;">Back</div>
          <table width="90" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <tr><td style="background:${t.backBg};padding:20px 8px 12px;text-align:center;font-family:sans-serif;">
              <div style="font-weight:900;font-size:9px;color:#fff;text-transform:uppercase;line-height:1.2;">Free<br>Estimate</div>
              <div style="width:20px;height:1px;background:rgba(255,255,255,0.4);margin:8px auto;"></div>
              <div style="font-size:7px;color:rgba(255,255,255,0.8);line-height:1.4;">Call or text<br>anytime</div>
              <div style="margin-top:16px;font-size:7px;color:#fff;font-weight:700;">${order.phone}</div>
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  `
}

function yardSignHtml(order: {
  businessName: string; trade: string; phone: string; website: string; colorTheme: string
}) {
  const t = THEME_COLORS[order.colorTheme] || THEME_COLORS['Navy']
  const website = order.website?.replace(/^https?:\/\//, '') || ''

  return `
    <!-- Yard Sign Mockup -->
    <table width="340" cellpadding="0" cellspacing="0" style="margin:0 auto;border-radius:8px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.14);">
      <tr><td style="background:${t.backBg};padding:24px 28px;text-align:center;font-family:sans-serif;">
        <div style="font-weight:900;font-size:20px;color:#fff;text-transform:uppercase;letter-spacing:-0.5px;line-height:1.1;">${order.businessName}</div>
        <div style="width:40px;height:2px;background:rgba(255,255,255,0.4);margin:10px auto;border-radius:99px;"></div>
        <div style="font-size:11px;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">${order.trade}</div>
        <div style="font-size:16px;color:#fff;font-weight:700;">${order.phone}</div>
        ${website ? `<div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:4px;">${website}</div>` : ''}
      </td></tr>
    </table>
  `
}

export function buildProofEmail(order: {
  id: string
  approvalToken: string
  productTitle: string
  qty: number
  pricePaid: number
  businessName: string
  ownerName: string
  trade: string
  phone: string
  email: string
  website: string
  colorTheme: string
  notes: string
}) {
  const baseUrl = 'https://opervo.io'
  const approveUrl = `${baseUrl}/print/order/${order.approvalToken}?action=approve`
  const changesUrl = `${baseUrl}/print/order/${order.approvalToken}`

  let mockupHtml = ''
  const productLower = order.productTitle.toLowerCase()
  if (productLower.includes('business')) {
    mockupHtml = businessCardHtml(order)
  } else if (productLower.includes('door')) {
    mockupHtml = doorHangerHtml(order)
  } else if (productLower.includes('yard')) {
    mockupHtml = yardSignHtml(order)
  }

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F5F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5F2;padding:40px 16px;">
<tr><td>
<table width="580" cellpadding="0" cellspacing="0" style="margin:0 auto;max-width:580px;">

  <!-- Header -->
  <tr><td style="background:#0F0F0F;border-radius:12px 12px 0 0;padding:24px 32px;">
    <span style="font-size:22px;font-weight:900;color:#F7F5F2;text-transform:uppercase;letter-spacing:-0.5px;">
      Opervo<span style="color:#F5620F;">.</span>
    </span>
    <span style="font-size:12px;color:#6B6B6B;margin-left:12px;">Print</span>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#fff;padding:32px;border-left:1px solid #E8E4DE;border-right:1px solid #E8E4DE;">

    <p style="font-size:13px;font-weight:700;color:#F5620F;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Design Proof Ready</p>
    <h2 style="font-size:24px;font-weight:900;color:#0F0F0F;text-transform:uppercase;letter-spacing:-0.5px;margin:0 0 8px;">
      Your ${order.qty.toLocaleString()} ${order.productTitle}
    </h2>
    <p style="font-size:14px;color:#6B6B6B;margin:0 0 28px;line-height:1.5;">
      Hi ${order.ownerName} — here's a preview of your design based on the info you provided.
      Review the mockup below and approve it, or let us know what you'd like changed.
    </p>

    <!-- Order details strip -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5F2;border-radius:8px;margin-bottom:28px;">
      <tr>
        <td style="padding:14px 16px;font-size:12px;color:#6B6B6B;border-right:1px solid #E8E4DE;">
          <div style="font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;">Product</div>
          <div style="font-weight:600;color:#0F0F0F;">${order.qty.toLocaleString()} × ${order.productTitle}</div>
        </td>
        <td style="padding:14px 16px;font-size:12px;color:#6B6B6B;border-right:1px solid #E8E4DE;">
          <div style="font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;">Color Theme</div>
          <div style="font-weight:600;color:#0F0F0F;">${order.colorTheme || 'Navy'}</div>
        </td>
        <td style="padding:14px 16px;font-size:12px;color:#6B6B6B;">
          <div style="font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:2px;">Order Total</div>
          <div style="font-weight:600;color:#0F0F0F;">$${order.pricePaid.toFixed(2)}</div>
        </td>
      </tr>
    </table>

    <!-- Mockup -->
    <div style="background:#F7F5F2;border:1px solid #E8E4DE;border-radius:10px;padding:28px 16px;text-align:center;margin-bottom:28px;">
      <p style="font-size:11px;font-weight:700;color:#6B6B6B;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 20px;">Design Mockup</p>
      ${mockupHtml}
      <p style="font-size:11px;color:#6B6B6B;margin:16px 0 0;">
        This is a layout mockup. Your actual print file will be professionally designed at 300 DPI with bleed marks.
      </p>
    </div>

    ${order.notes ? `
    <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:14px 16px;margin-bottom:24px;">
      <p style="font-size:12px;font-weight:700;color:#92400E;margin:0 0 4px;">Your Notes to the Designer</p>
      <p style="font-size:13px;color:#1a1a1a;margin:0;">${order.notes}</p>
    </div>
    ` : ''}

    <!-- CTA buttons -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:8px;">
          <a href="${approveUrl}" style="display:block;background:#12a05c;color:#fff;text-align:center;font-size:14px;font-weight:700;padding:14px;border-radius:8px;text-decoration:none;text-transform:uppercase;letter-spacing:0.04em;">
            ✓ Approve Design
          </a>
        </td>
        <td style="padding-left:8px;">
          <a href="${changesUrl}" style="display:block;background:#F7F5F2;color:#0F0F0F;text-align:center;font-size:14px;font-weight:700;padding:14px;border-radius:8px;text-decoration:none;border:1px solid #E8E4DE;text-transform:uppercase;letter-spacing:0.04em;">
            Request Changes
          </a>
        </td>
      </tr>
    </table>

    <p style="font-size:12px;color:#6B6B6B;text-align:center;margin:20px 0 0;line-height:1.5;">
      Once approved, your order ships within 5–7 business days.<br>
      Questions? Reply to this email or contact <a href="mailto:help@opervo.io" style="color:#F5620F;">help@opervo.io</a>
    </p>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#F7F5F2;border:1px solid #E8E4DE;border-top:none;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
    <p style="font-size:11px;color:#6B6B6B;margin:0;">
      Opervo Print · <a href="https://opervo.io" style="color:#F5620F;">opervo.io</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>
  `
}
