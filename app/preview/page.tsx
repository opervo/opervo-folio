export default function PreviewPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Opervo — The app built for solo trade operators</title>
<meta name="description" content="Run your jobs, invoice clients, and share a portfolio that wins you more business. Built by a solo operator for solo operators. 30 days free.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">

<style>
/* ─── RESET & TOKENS ─── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --orange: #F5620F;
  --orange-dim: #d94e08;
  --orange-glow: rgba(245,98,15,0.30);
  --orange-pale: rgba(245,98,15,0.08);
  --black: #0F0F0F;
  --ink: #1a1a1a;
  --off: #F7F5F2;
  --warm: #EDE9E3;
  --rule: #E0DBD4;
  --muted: #7a7269;
  --white: #ffffff;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Barlow', sans-serif;
  background: var(--off);
  color: var(--ink);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.hero {
  min-height: 100vh;
  padding: 100px 28px 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.phone-wrap { position: relative; width: 280px; filter: drop-shadow(0 40px 80px rgba(15,15,15,0.18)); }
.hero-right { position: relative; display: flex; justify-content: center; align-items: center; }

nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: 58px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px;
  background: rgba(247,245,242,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #E0DBD4;
}
.nav-logo { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 900; color: #0F0F0F; text-decoration: none; }
.nav-logo span { color: #F5620F; }
.nav-cta { background: #F5620F; color: #fff; font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; padding: 9px 22px; border-radius: 8px; text-decoration: none; }
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a { font-size: 13px; font-weight: 600; color: #7a7269; text-decoration: none; }

.hero-h1 { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(54px,7vw,88px); font-weight: 900; line-height: .95; letter-spacing: -0.02em; text-transform: uppercase; color: #0F0F0F; margin-bottom: 22px; }
.line-orange { color: #F5620F; }
.line-stroke { -webkit-text-stroke: 2px #0F0F0F; color: transparent; }
.hero-sub { font-size: 17px; color: #7a7269; line-height: 1.65; max-width: 460px; margin-bottom: 32px; }
.hero-sub strong { color: #1a1a1a; font-weight: 600; }
.btn-primary { background: #F5620F; color: #fff; font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 6px 24px rgba(245,98,15,0.3); }
.btn-secondary { background: transparent; color: #1a1a1a; font-size: 14px; font-weight: 600; padding: 13px 22px; border-radius: 8px; border: 1.5px solid #E0DBD4; text-decoration: none; display: inline-flex; align-items: center; gap: 7px; }
.hero-ctas { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
.hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(245,98,15,0.08); border: 1px solid rgba(245,98,15,0.2); border-radius: 4px; padding: 5px 12px; font-family: 'DM Mono',monospace; font-size: 11px; font-weight: 500; color: #F5620F; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 22px; display: block; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

.ticker-wrap { overflow: hidden; background: #0F0F0F; padding: 13px 0; }
.ticker-track { display: flex; animation: ticker 28s linear infinite; width: max-content; }
.ti { display: flex; align-items: center; gap: 8px; padding: 0 28px; font-family: 'Barlow Condensed',sans-serif; font-size: 13px; font-weight: 700; color: rgba(255,255,255,.35); text-transform: uppercase; letter-spacing: .06em; white-space: nowrap; }
.ti-dot { width: 4px; height: 4px; background: #F5620F; border-radius: 50%; flex-shrink: 0; }
.ti.hl { color: #F5620F; }
@keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes up { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

section { padding: 100px 28px; max-width: 1200px; margin: 0 auto; }
.full-bleed-inner { max-width: 1200px; margin: 0 auto; padding: 0 28px; }
.sec-eyebrow { font-family: 'DM Mono',monospace; font-size: 11px; font-weight: 500; color: #F5620F; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 16px; }
.sec-title { font-family: 'Barlow Condensed',sans-serif; font-size: clamp(36px,5vw,58px); font-weight: 900; text-transform: uppercase; letter-spacing: -.01em; line-height: .95; color: #0F0F0F; margin-bottom: 18px; }
.sec-title .o { color: #F5620F; }
.sec-title .stroke { -webkit-text-stroke: 2px #0F0F0F; color: transparent; }
.sec-sub { font-size: 16px; color: #7a7269; line-height: 1.65; max-width: 520px; }

.problem-section { background: #0F0F0F; padding: 90px 0; }
.problem-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; border: 1px solid rgba(255,255,255,.06); border-radius: 18px; overflow: hidden; margin-top: 52px; background: rgba(255,255,255,.04); }
.prob-card { background: #0e0e0e; padding: 36px 32px; }
.prob-num { font-family: 'DM Mono',monospace; font-size: 11px; color: #F5620F; margin-bottom: 18px; }
.prob-text { font-family: 'Barlow Condensed',sans-serif; font-size: 22px; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,.8); line-height: 1.3; margin-bottom: 12px; }
.prob-body { font-size: 13px; color: rgba(255,255,255,.35); line-height: 1.6; }
.prob-cross { color: rgba(255,255,255,.15); text-decoration: line-through; text-decoration-color: rgba(245,98,15,.4); }

.folio-section { background: #F7F5F2; padding: 100px 0; }
.folio-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.folio-device { position: relative; display: flex; justify-content: center; }
.folio-phone { width: 280px; background: #1a1a2e; border-radius: 44px; border: 1.5px solid rgba(255,255,255,.1); padding: 14px; box-shadow: 0 40px 80px rgba(15,15,15,.25); }
.folio-screen { background: #0d0d1a; border-radius: 32px; overflow: hidden; aspect-ratio: 9/19.5; display: flex; flex-direction: column; }
.fp-bar { padding: 28px 14px 10px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,.05); }
.fp-powered { font-size: 7px; color: rgba(255,255,255,.3); display: flex; align-items: center; gap: 4px; }
.fp-mark { width: 13px; height: 13px; background: #F5620F; border-radius: 3px; font-size: 7px; font-weight: 900; color: #fff; display: flex; align-items: center; justify-content: center; font-family: 'Barlow Condensed',sans-serif; }
.fp-vpro { font-size: 6px; font-weight: 700; color: #F5620F; background: rgba(245,98,15,.12); border: 1px solid rgba(245,98,15,.25); padding: 2px 7px; border-radius: 10px; }
.fp-hero { padding: 16px 14px; text-align: center; border-bottom: 1px solid rgba(255,255,255,.05); }
.fp-av { width: 44px; height: 44px; border-radius: 13px; background: linear-gradient(135deg,#F5620F,#d94e08); color: #fff; font-size: 15px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-family: 'Barlow Condensed',sans-serif; }
.fp-trade { font-size: 6px; font-weight: 700; color: #F5620F; background: rgba(245,98,15,.12); padding: 2px 9px; border-radius: 10px; display: inline-block; margin-bottom: 5px; letter-spacing: .04em; text-transform: uppercase; }
.fp-biz { font-family: 'Barlow Condensed',sans-serif; font-size: 14px; font-weight: 800; color: #fff; display: block; text-transform: uppercase; }
.fp-loc { font-size: 6.5px; color: rgba(255,255,255,.35); margin-top: 3px; }
.fp-stars { display: flex; align-items: center; justify-content: center; gap: 2px; margin-top: 8px; }
.fp-star { font-size: 9px; color: #F5620F; }
.fp-st { font-size: 6.5px; color: rgba(255,255,255,.35); margin-left: 4px; }
.fp-ctas { padding: 10px 12px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 5px; background: #fff; }
.fp-cp { background: #F5620F; color: #fff; font-size: 7px; font-weight: 800; border-radius: 7px; height: 26px; display: flex; align-items: center; justify-content: center; font-family: 'Barlow Condensed',sans-serif; letter-spacing: .04em; text-transform: uppercase; }
.fp-cs { background: #f4f5f7; color: #0e1120; font-size: 6.5px; font-weight: 600; border-radius: 7px; height: 26px; display: flex; align-items: center; justify-content: center; }
.fp-notif { position: absolute; left: -50px; bottom: 100px; background: #fff; border-radius: 12px; padding: 9px 13px; box-shadow: 0 8px 28px rgba(0,0,0,.15); display: flex; align-items: center; gap: 9px; white-space: nowrap; animation: bob 4s ease-in-out infinite 1s; }
.fpn-icon { width: 30px; height: 30px; background: rgba(245,98,15,.12); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.fpn-main { font-size: 12px; font-weight: 700; color: #0e1120; display: block; }
.fpn-sub { font-size: 10px; color: #8a93a6; display: block; margin-top: 1px; }

.folio-features { display: flex; flex-direction: column; gap: 28px; margin-top: 44px; }
.ff { display: flex; gap: 16px; align-items: flex-start; }
.ff-ic { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.ff-o { background: rgba(245,98,15,.1); border: 1px solid rgba(245,98,15,.15); }
.ff-g { background: rgba(18,160,92,.08); border: 1px solid rgba(18,160,92,.12); }
.ff-b { background: rgba(37,88,240,.08); border: 1px solid rgba(37,88,240,.12); }
.ff-title { font-family: 'Barlow Condensed',sans-serif; font-size: 18px; font-weight: 800; text-transform: uppercase; color: #0F0F0F; margin-bottom: 5px; }
.ff-body { font-size: 13px; color: #7a7269; line-height: 1.6; }
.ff-only { display: inline-block; margin-top: 8px; font-family: 'DM Mono',monospace; font-size: 10px; color: #F5620F; background: rgba(245,98,15,.08); border: 1px solid rgba(245,98,15,.2); border-radius: 4px; padding: 3px 9px; text-transform: uppercase; }

.social-section { background: #EDE9E3; padding: 90px 0; }
.t-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 52px; }
.t-card { background: #fff; border: 1px solid #E0DBD4; border-radius: 18px; padding: 28px 24px; position: relative; overflow: hidden; }
.t-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #F5620F; }
.t-stars { display: flex; gap: 3px; margin-bottom: 16px; }
.t-star { color: #F5620F; font-size: 14px; }
.t-quote { font-family: 'Barlow Condensed',sans-serif; font-size: 19px; font-weight: 700; color: #0F0F0F; line-height: 1.3; margin-bottom: 20px; text-transform: uppercase; }
.t-body { font-size: 13px; color: #7a7269; line-height: 1.65; margin-bottom: 20px; }
.t-author { display: flex; align-items: center; gap: 10px; padding-top: 16px; border-top: 1px solid #E0DBD4; }
.t-av { width: 38px; height: 38px; border-radius: 10px; font-size: 13px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.t-name { font-size: 13px; font-weight: 700; color: #0F0F0F; }
.t-trade { font-size: 11px; color: #7a7269; margin-top: 1px; }

.features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 56px; }
.feat-card { background: #fff; border: 1px solid #E0DBD4; border-radius: 16px; padding: 28px 24px; position: relative; overflow: hidden; }
.feat-ic { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 18px; }
.fi-o{background:rgba(245,98,15,.1)} .fi-g{background:rgba(18,160,92,.1)} .fi-b{background:rgba(37,88,240,.1)} .fi-p{background:rgba(124,58,237,.1)} .fi-t{background:rgba(20,184,166,.1)} .fi-r{background:rgba(224,62,62,.1)}
.feat-title { font-family: 'Barlow Condensed',sans-serif; font-size: 18px; font-weight: 800; text-transform: uppercase; color: #0F0F0F; margin-bottom: 9px; }
.feat-body { font-size: 13px; color: #7a7269; line-height: 1.65; }
.feat-only { display: inline-block; margin-top: 12px; font-family: 'DM Mono',monospace; font-size: 9px; color: #F5620F; background: rgba(245,98,15,.08); border: 1px solid rgba(245,98,15,.2); border-radius: 4px; padding: 2px 8px; text-transform: uppercase; }
.feat-new { display: inline-block; margin-top: 12px; font-family: 'DM Mono',monospace; font-size: 9px; color: #065f46; background: #d1fae5; border: 1px solid #a7f3d0; border-radius: 4px; padding: 2px 8px; text-transform: uppercase; }

.vs-section { background: #0F0F0F; padding: 90px 0; }
.vs-table { margin-top: 52px; border: 1px solid rgba(255,255,255,.08); border-radius: 18px; overflow: hidden; background: #0e0e0e; }
.vs-hdr { display: grid; grid-template-columns: 2.2fr 1fr 1fr 1fr; padding: 18px 28px; border-bottom: 1px solid rgba(255,255,255,.06); }
.vs-col { font-size: 12px; font-weight: 700; color: rgba(255,255,255,.3); text-align: center; }
.vs-col.me { color: #F5620F; background: rgba(245,98,15,.08); border: 1px solid rgba(245,98,15,.2); border-radius: 6px; padding: 5px 10px; font-size: 13px; }
.vs-col:first-child { text-align: left; }
.vs-row { display: grid; grid-template-columns: 2.2fr 1fr 1fr 1fr; padding: 15px 28px; border-bottom: 1px solid rgba(255,255,255,.04); align-items: center; }
.vs-row:last-child { border-bottom: none; }
.vs-name { font-size: 14px; font-weight: 500; color: rgba(255,255,255,.65); }
.vsc { text-align: center; font-size: 14px; }
.vy { color: #4ade80; font-size: 16px; }
.vn { color: rgba(255,255,255,.1); font-size: 16px; }
.vp { color: #fbbf24; font-size: 11px; font-weight: 700; }

.pricing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 780px; margin: 52px auto 0; }
.price-card { background: #fff; border: 1px solid #E0DBD4; border-radius: 20px; padding: 32px 28px; position: relative; overflow: hidden; }
.price-card.featured { border-color: #F5620F; box-shadow: 0 0 0 1px rgba(245,98,15,.2), 0 20px 60px rgba(245,98,15,.1); }
.price-card.featured::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #F5620F; }
.price-pop { display: inline-block; font-family: 'Barlow Condensed',sans-serif; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; background: #F5620F; color: #fff; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; }
.price-name { font-family: 'DM Mono',monospace; font-size: 11px; color: #7a7269; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 10px; }
.price-amt { display: flex; align-items: flex-start; gap: 2px; margin-bottom: 6px; }
.price-dol { font-family: 'DM Mono',monospace; font-size: 22px; font-weight: 700; color: #0F0F0F; margin-top: 6px; }
.price-num { font-family: 'Barlow Condensed',sans-serif; font-size: 56px; font-weight: 900; color: #0F0F0F; line-height: 1; letter-spacing: -.02em; }
.price-per { font-size: 14px; color: #7a7269; align-self: flex-end; margin-bottom: 8px; }
.price-trial { font-size: 12px; color: #065f46; font-weight: 600; margin-bottom: 24px; display: flex; align-items: center; gap: 6px; }
.price-div { height: 1px; background: #E0DBD4; margin-bottom: 22px; }
.price-feats { display: flex; flex-direction: column; gap: 11px; margin-bottom: 26px; }
.pf { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #7a7269; line-height: 1.4; }
.pf-check { width: 17px; height: 17px; border-radius: 50%; background: rgba(245,98,15,.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 9px; color: #F5620F; }
.price-cta-p { display: block; text-align: center; padding: 14px; border-radius: 10px; font-family: 'Barlow Condensed',sans-serif; font-size: 16px; font-weight: 800; text-transform: uppercase; text-decoration: none; background: #F5620F; color: #fff; }
.price-cta-s { display: block; text-align: center; padding: 14px; border-radius: 10px; font-family: 'Barlow Condensed',sans-serif; font-size: 16px; font-weight: 800; text-transform: uppercase; text-decoration: none; background: rgba(245,98,15,.08); color: #F5620F; border: 1.5px solid rgba(245,98,15,.2); }
.price-note { text-align: center; font-size: 12px; color: #7a7269; margin-top: 20px; line-height: 1.6; }
.transfer-strip { max-width: 780px; margin: 18px auto 0; background: #EDE9E3; border: 1px solid #E0DBD4; border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; gap: 14px; }
.ts-icon { width: 42px; height: 42px; border-radius: 10px; background: #fff; border: 1px solid #E0DBD4; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.ts-text { flex: 1; }
.ts-title { font-size: 14px; font-weight: 700; color: #0F0F0F; margin-bottom: 3px; }
.ts-body { font-size: 12px; color: #7a7269; line-height: 1.5; }
.ts-badge { background: #d1fae5; color: #065f46; font-family: 'DM Mono',monospace; font-size: 10px; padding: 5px 12px; border-radius: 20px; border: 1px solid #a7f3d0; white-space: nowrap; flex-shrink: 0; }

.final-cta-section { background: #0F0F0F; padding: 120px 28px; text-align: center; position: relative; overflow: hidden; }
.final-cta-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(245,98,15,.08) 0%, transparent 65%); pointer-events: none; }
.final-h2 { font-family: 'Barlow Condensed',sans-serif; font-size: clamp(48px,8vw,88px); font-weight: 900; text-transform: uppercase; letter-spacing: -.02em; line-height: .95; color: #fff; margin-bottom: 22px; }
.final-h2 .o { color: #F5620F; }
.final-h2 .stroke { -webkit-text-stroke: 2px rgba(255,255,255,.5); color: transparent; }
.final-sub { font-size: 17px; color: rgba(255,255,255,.45); max-width: 480px; margin: 0 auto 40px; line-height: 1.65; }
.final-ctas { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.final-checks { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap; }
.final-check { display: flex; align-items: center; gap: 5px; font-size: 12px; color: rgba(255,255,255,.35); }

footer { background: #0F0F0F; border-top: 1px solid rgba(255,255,255,.06); padding: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
.footer-logo { font-family: 'Barlow Condensed',sans-serif; font-size: 20px; font-weight: 900; color: #fff; text-decoration: none; }
.footer-logo span { color: #F5620F; }
.footer-links { display: flex; gap: 22px; }
.footer-link { font-size: 12px; color: rgba(255,255,255,.3); text-decoration: none; }
.footer-copy { font-size: 12px; color: rgba(255,255,255,.2); }

.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease-out, transform .6s ease-out; }
.reveal.vis { opacity: 1; transform: translateY(0); }
svg.ic { display: inline-block; vertical-align: middle; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

.notif { position: absolute; background: #fff; border-radius: 12px; padding: 8px 12px; box-shadow: 0 8px 32px rgba(15,15,15,.14); display: flex; align-items: center; gap: 8px; white-space: nowrap; z-index: 10; }
.notif-1 { right: -30px; top: 80px; animation: bob 4s ease-in-out infinite; }
.notif-2 { left: -45px; top: 200px; animation: bob 5s ease-in-out infinite 1.5s; }
.notif-3 { right: -20px; bottom: 130px; animation: bob 4.5s ease-in-out infinite 3s; }
.ni { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.ni-o{background:rgba(245,98,15,.12)} .ni-g{background:rgba(18,160,92,.1)} .ni-b{background:rgba(37,88,240,.1)}
.nib-top { font-size: 12px; font-weight: 700; color: #0e1120; display: block; line-height: 1.2; }
.nib-sub { font-size: 10px; color: #8a93a6; display: block; margin-top: 1px; }

.trust-avs { display: flex; margin-bottom: 8px; }
.tav { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #F7F5F2; font-size: 10px; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; margin-left: -8px; }
.tav:first-child { margin-left: 0; }
.tav1{background:#2d6a4f} .tav2{background:#1d3557} .tav3{background:#7b2d8b} .tav4{background:#c05621}
.trust-text { font-size: 12px; color: #7a7269; line-height: 1.4; }
.trust-text strong { color: #1a1a1a; }
.hero-trust { display: flex; align-items: center; gap: 10px; margin-top: 20px; }
</style>
</head>
<body>
<nav>
  <a href="/" class="nav-logo">Opervo<span>.</span></a>
  <ul class="nav-links"><li><a href="#features">Features</a></li><li><a href="#folio">Folio</a></li><li><a href="#pricing">Pricing</a></li></ul>
  <a href="https://app.opervo.io" class="nav-cta">Start free trial</a>
</nav>
<section class="hero" style="padding-top:110px">
  <div>
    <div class="hero-eyebrow">● Built for solo trade operators</div>
    <h1 class="hero-h1">Do the<br><span class="line-orange">work.</span><br><span class="line-stroke">Look pro.</span><br>Get paid.</h1>
    <p class="hero-sub">Jobs, invoices, scheduling, and a <strong>live portfolio page that wins you new clients</strong> — one app, built for the one-person crew.</p>
    <div class="hero-ctas">
      <a href="https://app.opervo.io" class="btn-primary">Start free — 30 days →</a>
      <a href="#folio" class="btn-secondary">▶ See Folio live</a>
    </div>
    <div class="hero-trust">
      <div class="trust-avs"><div class="tav tav1">MP</div><div class="tav tav2">JR</div><div class="tav tav3">TK</div><div class="tav tav4">AL</div></div>
      <div class="trust-text">Trusted by <strong>solo operators</strong><br>in pressure washing, window cleaning &amp; more</div>
    </div>
  </div>
  <div class="hero-right">
    <div class="notif notif-1"><div class="ni ni-g">✓</div><div><span class="nib-top">Invoice paid · $175</span><span class="nib-sub">Just now</span></div></div>
    <div class="notif notif-2"><div class="ni ni-b">👁</div><div><span class="nib-top">14 Folio views today</span><span class="nib-sub">opervo.io/solar-wash-atx</span></div></div>
    <div class="notif notif-3"><div class="ni ni-o">★</div><div><span class="nib-top">New 5-star review</span><span class="nib-sub">"Amazing work as always!"</span></div></div>
    <div class="phone-wrap">
      <div style="border-radius:44px;overflow:hidden;box-shadow:0 0 0 1.5px rgba(255,255,255,0.08),0 40px 80px rgba(15,15,15,0.22);background:#0F0F0F;">
        <img src="/screenshots/dashboard.png" alt="Opervo app dashboard" style="width:100%;display:block;border-radius:44px;" />
      </div>
    </div>
  </div>
</section>
<div class="ticker-wrap"><div class="ticker-track"><div class="ti"><div class="ti-dot"></div>Pressure Washing</div><div class="ti"><div class="ti-dot"></div>Window Cleaning</div><div class="ti"><div class="ti-dot"></div>Lawn Care</div><div class="ti"><div class="ti-dot"></div>Auto Detailing</div><div class="ti hl"><div class="ti-dot"></div>Folio — Only on Opervo</div><div class="ti"><div class="ti-dot"></div>Invoice in 60 seconds</div><div class="ti"><div class="ti-dot"></div>30-day free trial</div><div class="ti hl"><div class="ti-dot"></div>$24.99/mo Solo — $54.99/mo Team</div><div class="ti"><div class="ti-dot"></div>Pressure Washing</div><div class="ti"><div class="ti-dot"></div>Window Cleaning</div><div class="ti"><div class="ti-dot"></div>Lawn Care</div><div class="ti"><div class="ti-dot"></div>Auto Detailing</div><div class="ti hl"><div class="ti-dot"></div>Folio — Only on Opervo</div><div class="ti"><div class="ti-dot"></div>Invoice in 60 seconds</div><div class="ti"><div class="ti-dot"></div>30-day free trial</div><div class="ti hl"><div class="ti-dot"></div>$24.99/mo Solo — $54.99/mo Team</div></div></div>
<div class="problem-section reveal"><div class="full-bleed-inner"><div class="sec-eyebrow" style="color:rgba(245,98,15,.7)">The problem</div><h2 class="sec-title" style="color:#fff">Every other app was built<br>for companies with <span class="o">crews</span>.</h2><p class="sec-sub" style="color:rgba(255,255,255,.4)">You’re one person and a truck. You don’t need fleet dispatch. You need to look pro, get paid fast, and win more work.</p><div class="problem-grid"><div class="prob-card"><div class="prob-num">01 / 03</div><div class="prob-text">Priced for teams<br>you don’t have</div><div class="prob-body">Jobber starts at <span class="prob-cross">$49/mo</span>, Housecall Pro at <span class="prob-cross">$65/mo</span>. You pay for seats you’ll never fill.</div></div><div class="prob-card"><div class="prob-num">02 / 03</div><div class="prob-text">Photo apps that<br>don’t invoice</div><div class="prob-body">CompanyCam charges <span class="prob-cross">$29/user</span> for photos only. You still need separate apps for invoicing, CRM, scheduling.</div></div><div class="prob-card"><div class="prob-num">03 / 03</div><div class="prob-text">No one turns your<br>work into clients</div><div class="prob-body">None of them build a live portfolio that wins new business automatically. That idea doesn’t exist — except Opervo.</div></div></div></div></div>
<div class="folio-section reveal" id="folio"><div class="full-bleed-inner"><div class="folio-inner"><div class="folio-device"><div class="folio-phone"><div class="folio-screen"><div class="fp-bar"><div class="fp-powered"><div class="fp-mark">O</div>Powered by Opervo</div><div class="fp-vpro">✓ Verified Pro</div></div><div class="fp-hero"><div class="fp-av">SW</div><span class="fp-trade">Solar Panel Washing</span><span class="fp-biz">Solar Wash ATX</span><div class="fp-loc">📍 Austin, TX</div><div class="fp-stars"><span class="fp-star">★</span><span class="fp-star">★</span><span class="fp-star">★</span><span class="fp-star">★</span><span class="fp-star">★</span><span class="fp-st">5.0 · 1 review</span></div></div><div class="fp-ctas"><div class="fp-cp">Get a Free Quote</div><div class="fp-cs">📞 Call</div><div class="fp-cs">💬 Text</div></div><div style="padding:10px 12px;flex:1;background:#f4f5f7;display:flex;flex-direction:column;gap:7px;"><div style="background:#fff;border-radius:10px;border:1.5px solid rgba(245,98,15,0.2);padding:10px 11px;"><div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><div style="width:6px;height:6px;background:#1A6BF0;border-radius:50%;"></div><span style="font-size:6.5px;font-weight:700;color:#1A6BF0;text-transform:uppercase;">LIVE PAGE</span></div><div style="font-size:9px;font-weight:700;color:#0e1120;margin-bottom:2px;">Your Folio is Active</div><div style="font-family:'DM Mono',monospace;font-size:6px;color:#8a93a6;margin-bottom:6px;">opervo.io/solar-wash-atx</div><div style="display:flex;gap:14px;"><div><div style="font-family:'DM Mono',monospace;font-size:11px;font-weight:700;color:#0e1120;">—</div><div style="font-size:5.5px;color:#8a93a6;">Quote Reqs</div></div><div><div style="font-family:'DM Mono',monospace;font-size:11px;font-weight:700;color:#0e1120;">5.0</div><div style="font-size:5.5px;color:#8a93a6;">Avg Rating</div></div><div><div style="font-family:'DM Mono',monospace;font-size:11px;font-weight:700;color:#0e1120;">1</div><div style="font-size:5.5px;color:#8a93a6;">Reviews</div></div></div></div></div></div></div><div class="fp-notif"><div class="fpn-icon">🔔</div><div><span class="fpn-main">New quote request</span><span class="fpn-sub">via your Folio · 2 min ago</span></div></div></div><div><div class="sec-eyebrow">Folio — Only on Opervo</div><h2 class="sec-title">Your work.<br>Your page.<br><span class="o">Your clients.</span></h2><p class="sec-sub">Every job you finish auto-builds a live public page that does the selling while you work.</p><div class="folio-features"><div class="ff"><div class="ff-ic ff-o">🖥</div><div><div class="ff-title">A real page clients actually visit</div><div class="ff-body">opervo.io/yourbusiness — your link in bio, your quote page, your proof of work. Auto-updates every job.</div><span class="ff-only">Zero competitors have this</span></div></div><div class="ff"><div class="ff-ic ff-g">📸</div><div><div class="ff-title">Before &amp; after in one tap</div><div class="ff-body">Mark job done, snap photos — Opervo pairs them as a before/after card instantly. No Canva. No extra apps.</div></div></div><div class="ff"><div class="ff-ic ff-b">📤</div><div><div class="ff-title">Post to TikTok &amp; Instagram instantly</div><div class="ff-body">Auto-formatted before/after cards with a trade-specific caption. One tap to share.</div></div></div></div></div></div></div></div>
<div class="social-section reveal"><div class="full-bleed-inner"><div class="sec-eyebrow">Early operators</div><h2 class="sec-title">Real operators.<br><span class="o">Real results.</span></h2><div class="t-grid"><div class="t-card"><div class="t-stars"><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span></div><div class="t-quote">“Replaced Jobber and CompanyCam both.”</div><div class="t-body">My Folio page brought in 3 new clients this month. Same features, half the price. I’m not going back.</div><div class="t-author"><div class="t-av" style="background:#2d6a4f">MP</div><div><div class="t-name">Mike P.</div><div class="t-trade">Pressure Washing · Austin, TX</div></div></div></div><div class="t-card"><div class="t-stars"><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span></div><div class="t-quote">“Set up in 2 minutes. First invoice sent before I left the app.”</div><div class="t-body">Nothing else comes close for a solo operator. I sent my first invoice before I even finished onboarding.</div><div class="t-author"><div class="t-av" style="background:#1d3557">JR</div><div><div class="t-name">Jamie R.</div><div class="t-trade">Window Cleaning · Denver, CO</div></div></div></div><div class="t-card"><div class="t-stars"><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span><span class="t-star">★</span></div><div class="t-quote">“I post to Instagram after every single job.”</div><div class="t-body">The before/after card posts straight from the app. I get DMs for quotes every single week from those posts.</div><div class="t-author"><div class="t-av" style="background:#7b2d8b">TK</div><div><div class="t-name">Taylor K.</div><div class="t-trade">Lawn Care · Nashville, TN</div></div></div></div></div></div></div>
<section class="reveal" id="features"><div class="sec-eyebrow">Everything you need</div><h2 class="sec-title">One app.<br><span class="o">Your whole</span> <span class="stroke">operation.</span></h2><p class="sec-sub">Every tool a solo operator needs. Nothing you’ll never use.</p><div class="features-grid"><div class="feat-card"><div class="feat-ic fi-o">💳</div><div class="feat-title">Instant Invoicing</div><div class="feat-body">Create and send a professional invoice in under 60 seconds. Clients pay before you leave the driveway.</div></div><div class="feat-card"><div class="feat-ic fi-g">📸</div><div class="feat-title">Folio Portfolio</div><div class="feat-body">Your live public page with before/afters, reviews, and a quote button. Builds automatically as you work.</div><span class="feat-only">Only on Opervo</span></div><div class="feat-card"><div class="feat-ic fi-b">📅</div><div class="feat-title">Job Scheduling</div><div class="feat-body">See your whole day at a glance. Schedule jobs, set reminders, stay on time — from your phone.</div></div><div class="feat-card"><div class="feat-ic fi-p">👤</div><div class="feat-title">Client Management</div><div class="feat-body">Every client’s full history, contact info, and notes — one tap away. Never lose a client.</div></div><div class="feat-card"><div class="feat-ic fi-t">📈</div><div class="feat-title">Profit Tracking</div><div class="feat-body">Know exactly what you made this month. Your numbers, always clear — tax season sorted.</div></div><div class="feat-card"><div class="feat-ic fi-r">⭐</div><div class="feat-title">Review Automation</div><div class="feat-body">Job paid? Opervo automatically asks your client for a Google review. More 5-stars, zero effort.</div><span class="feat-new">Auto-sends</span></div></div></section>
<div class="vs-section reveal"><div class="full-bleed-inner"><div class="sec-eyebrow" style="color:rgba(245,98,15,.7)">The honest comparison</div><h2 class="sec-title" style="color:#fff">Why operators<br>choose <span class="o">Opervo</span>.</h2><div class="vs-table"><div class="vs-hdr"><div class="vs-col" style="text-align:left;color:rgba(255,255,255,.35);">Feature</div><div class="vs-col me">Opervo</div><div class="vs-col">Jobber</div><div class="vs-col">CompanyCam</div></div><div class="vs-row"><div class="vs-name">30-day free trial</div><div class="vsc vy">✓</div><div class="vsc vn">✕</div><div class="vsc vn">✕</div></div><div class="vs-row"><div class="vs-name">Built for solo operators</div><div class="vsc vy">✓</div><div class="vsc vp">Partial</div><div class="vsc vn">✕</div></div><div class="vs-row"><div class="vs-name">Live portfolio page (Folio)</div><div class="vsc vy">✓</div><div class="vsc vn">✕</div><div class="vsc vn">✕</div></div><div class="vs-row"><div class="vs-name">One-tap social share</div><div class="vsc vy">✓</div><div class="vsc vn">✕</div><div class="vsc vn">✕</div></div><div class="vs-row"><div class="vs-name">Invoicing + payments</div><div class="vsc vy">✓</div><div class="vsc vy">✓</div><div class="vsc vn">✕</div></div><div class="vs-row"><div class="vs-name">Mobile-first PWA</div><div class="vsc vy">✓</div><div class="vsc vp">Partial</div><div class="vsc vp">Partial</div></div><div class="vs-row"><div class="vs-name">Starting price</div><div class="vsc" style="color:#F5620F;font-weight:700;">$24.99</div><div class="vsc" style="color:rgba(255,255,255,.3);">$49/mo</div><div class="vsc" style="color:rgba(255,255,255,.3);">$19/user</div></div></div></div></div>
<section class="reveal" id="pricing" style="background:#EDE9E3;max-width:none;padding:90px 28px"><div style="max-width:1200px;margin:0 auto;text-align:center"><div class="sec-eyebrow">Simple pricing</div><h2 class="sec-title" style="margin:0 auto 14px">Start free.<br><span class="o">Pay when</span> you’re ready.</h2><p class="sec-sub" style="margin:0 auto">30 days free on every plan. No credit card. No demo call. Cancel any time.</p><div class="pricing-grid"><div class="price-card featured"><div class="price-pop">Most popular</div><div class="price-name">Solo</div><div class="price-amt"><span class="price-dol">$</span><span class="price-num">24</span><span class="price-per">.99/mo</span></div><div class="price-trial">✓ 30 days free — no card needed</div><div class="price-div"></div><div class="price-feats"><div class="pf"><div class="pf-check">✓</div>Unlimited jobs &amp; invoices</div><div class="pf"><div class="pf-check">✓</div>Live Folio portfolio page</div><div class="pf"><div class="pf-check">✓</div>Client management</div><div class="pf"><div class="pf-check">✓</div>Google Calendar sync</div><div class="pf"><div class="pf-check">✓</div>Review automation</div><div class="pf"><div class="pf-check">✓</div>Recurring jobs</div></div><a href="https://app.opervo.io" class="price-cta-p">Start 30-day free trial</a></div><div class="price-card"><div style="height:36px"></div><div class="price-name">Team</div><div class="price-amt"><span class="price-dol">$</span><span class="price-num">54</span><span class="price-per">.99/mo</span></div><div class="price-trial">✓ 30 days free — no card needed</div><div class="price-div"></div><div class="price-feats"><div class="pf"><div class="pf-check">✓</div>Everything in Solo</div><div class="pf"><div class="pf-check">✓</div>Up to 5–20 team members</div><div class="pf"><div class="pf-check">✓</div>Role-based permissions</div><div class="pf"><div class="pf-check">✓</div>Team scheduling view</div><div class="pf"><div class="pf-check">✓</div>Priority support</div></div><a href="https://app.opervo.io" class="price-cta-s">Start 30-day free trial</a></div></div><p class="price-note">Both plans include a full 30-day free trial — <strong>no credit card required.</strong><br>Cancel before day 30 and you’ll never be charged.</p><div class="transfer-strip"><div class="ts-icon">📂</div><div class="ts-text"><div class="ts-title">Already on Jobber or Housecall Pro?</div><div class="ts-body">Import your entire client list in 2 minutes — upload a CSV and every contact transfers instantly.</div></div><div class="ts-badge">Free transfer</div></div></div></section>
<div class="final-cta-section reveal"><div style="position:relative;max-width:700px;margin:0 auto"><h2 class="final-h2">Your business<br>deserves to<br><span class="o">look this</span> <span class="stroke">good.</span></h2><p class="final-sub">Set up in 90 seconds. No credit card. No demo call. Just you and your next job.</p><div class="final-ctas"><a href="https://app.opervo.io" class="btn-primary" style="font-size:18px;padding:16px 34px">Start free — it’s instant →</a></div><div class="final-checks"><div class="final-check">✓ No credit card</div><div class="final-check">✓ No demo call</div><div class="final-check">✓ 30 days free</div><div class="final-check">✓ Live in 90 seconds</div></div></div></div>
<footer><a href="/" class="footer-logo">Opervo<span>.</span></a><div class="footer-links"><a href="/privacy" class="footer-link">Privacy</a><a href="/tos" class="footer-link">Terms</a><a href="mailto:help@opervo.io" class="footer-link">Contact</a></div><div class="footer-copy">© 2026 Opervo. Built for the trades.</div></footer>
<script>
const obs = new IntersectionObserver((entries) => { entries.forEach((e,i) => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('vis'),i*100); obs.unobserve(e.target); } }); }, {threshold:0.08,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const navEl=document.querySelector('nav');
window.addEventListener('scroll',()=>{navEl.style.boxShadow=window.scrollY>20?'0 1px 20px rgba(15,15,15,0.08)':'none';});
</script>
</body>
</html>`
      }}
    />
  );
}
