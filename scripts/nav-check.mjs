import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844 })
await page.goto('http://localhost:7100/guide', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1200))

const report = await page.evaluate(() => {
  const nav = document.querySelector('header nav')
  const logo = document.querySelector('header a')
  const out = { vw: document.documentElement.clientWidth, scrollW: document.documentElement.scrollWidth, items: [] }
  ;[logo, ...document.querySelectorAll('header nav > *')].forEach((el) => {
    const r = el.getBoundingClientRect()
    out.items.push({
      text: (el.textContent || '').trim().slice(0, 8),
      left: Math.round(r.left),
      right: Math.round(r.right),
      w: Math.round(r.width),
    })
  })
  return out
})
console.log(JSON.stringify(report, null, 1))
await browser.close()
