import fs from 'node:fs'
import path from 'node:path'

const siteUrl = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '')
const articles = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content-data/published-articles.json'), 'utf8'))
const topSlugs = [
  'chatgpt-official-entry-domestic-use',
  'chatgpt-chinese-entry-guide',
  'chatgpt-website-not-working',
  'chatgpt-plus-china-payment-guide',
  'chatgpt-mirror-site-safety',
  'what-is-zeogpt',
  'zeogpt-register-guide',
  'zeogpt-pricing-comparison'
]

const urls = [
  `${siteUrl}/`,
  `${siteUrl}/blog/`,
  ...topSlugs.map((slug) => `${siteUrl}/blog/${slug}/`),
  ...articles.filter((item) => !topSlugs.includes(item.slug)).slice(0, 12).map((item) => `${siteUrl}/blog/${item.slug}/`)
]

const outDir = path.join(process.cwd(), 'exports')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'bing-submit-urls.txt'), urls.join('\n') + '\n')
console.log(`Wrote ${urls.length} URLs to exports/bing-submit-urls.txt`)
