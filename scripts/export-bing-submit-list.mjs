import fs from 'node:fs'
import path from 'node:path'
import articles from '../content-data/published-articles.json' with { type: 'json' }
import { SITE_ORIGIN } from '../site.config.mjs'

const published = articles.filter((item) => item.status === 'published')
const urls = [
  `${SITE_ORIGIN}/`,
  `${SITE_ORIGIN}/blog/`,
  `${SITE_ORIGIN}/zeogpt/`,
  `${SITE_ORIGIN}/pricing-guide/`,
  ...published.map((item) => `${SITE_ORIGIN}/blog/${item.slug}/`)
]

const outDir = path.resolve('exports')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'bing-submit-urls.txt'), urls.join('\n') + '\n')
console.log(`Wrote ${urls.length} reviewed URLs to exports/bing-submit-urls.txt`)
