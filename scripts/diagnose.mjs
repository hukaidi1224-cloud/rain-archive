/* 诊断：找出导致横向溢出的元素 */
import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
})
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844 })
await page.goto('http://localhost:7100/', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1500))

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth
  const offenders = []
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.width > vw + 1) {
      offenders.push({
        tag: el.tagName,
        cls: (el.className && el.className.toString().slice(0, 90)) || '',
        width: Math.round(r.width),
      })
    }
  })
  return { vw, scrollW: document.documentElement.scrollWidth, offenders: offenders.slice(0, 15) }
})
console.log(JSON.stringify(report, null, 1))

await page.screenshot({ path: '/tmp/rain-mobile3.png' })
await browser.close()
