// One-shot screenshot capture for the JC Air Pro Pro Site preview page.
// Captures real PNGs of every key section at 1280×800 viewport so the
// /preview/jc-air-pro page can show them instead of recreated mockups.
//
// Run: node scripts/capture-jc-air-pro.mjs
// Output: public/portfolio/jc-air-pro/screens/*.png
// Requires: JC Air Pro dev server running at http://localhost:3210

import puppeteer from 'puppeteer'
import { mkdir } from 'node:fs/promises'

const OUT_DIR = 'public/portfolio/jc-air-pro/screens'
const BASE = 'http://localhost:3210'

const captures = [
  { file: '01-homepage-hero.png',     url: '/',                    scrollTo: null,             waitMs: 800 },
  { file: '02-lead-form.png',         url: '/',                    scrollTo: '#quote',         waitMs: 600 },
  { file: '03-about.png',             url: '/',                    scrollTo: '#about',         waitMs: 600 },
  { file: '04-services-grid.png',     url: '/',                    scrollTo: '#services',      waitMs: 600 },
  { file: '05-reviews.png',           url: '/',                    scrollTo: '#reviews',       waitMs: 600 },
  { file: '06-service-area.png',      url: '/',                    scrollTo: '#service-area',  waitMs: 600 },
  { file: '07-faq.png',               url: '/',                    scrollTo: '#faq',           waitMs: 600 },
  { file: '08-contact.png',           url: '/',                    scrollTo: '#contact',       waitMs: 600 },
  { file: '09-service-page-ac.png',   url: '/services/ac-repair',  scrollTo: null,             waitMs: 800 },
  { file: '10-city-page-frisco.png',  url: '/dfw/frisco',          scrollTo: null,             waitMs: 800 },
]

await mkdir(OUT_DIR, { recursive: true })

const browser = await puppeteer.launch({
  headless: 'new',
  defaultViewport: { width: 1280, height: 800, deviceScaleFactor: 2 },
})

try {
  const page = await browser.newPage()
  for (const cap of captures) {
    const url = BASE + cap.url
    console.log(`→ ${cap.file}  ${url}${cap.scrollTo ? ' ' + cap.scrollTo : ''}`)
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
    if (cap.scrollTo) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel)
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
      }, cap.scrollTo)
    } else {
      await page.evaluate(() => window.scrollTo(0, 0))
    }
    await new Promise((r) => setTimeout(r, cap.waitMs))
    await page.screenshot({ path: `${OUT_DIR}/${cap.file}`, type: 'png' })
  }
  console.log(`\n✓ Captured ${captures.length} screens → ${OUT_DIR}/`)
} finally {
  await browser.close()
}
