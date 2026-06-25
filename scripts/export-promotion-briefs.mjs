import fs from 'node:fs'
import path from 'node:path'
import articles from '../content-data/published-articles.json' with { type: 'json' }
import { SITE_ORIGIN } from '../site.config.mjs'

const published = articles.filter((item) => item.status === 'published')
const outDir = path.resolve('exports')
fs.mkdirSync(outDir, { recursive: true })

const briefs = published.map((item) => ({
  title: item.title,
  url: `${SITE_ORIGIN}/blog/${item.slug}/`,
  summary: item.description,
  checked: item.checked || item.updated,
  anchorText: item.tags.slice(0, 3)
}))

fs.writeFileSync(
  path.join(outDir, 'promotion-briefs.json'),
  JSON.stringify(briefs, null, 2)
)
fs.writeFileSync(
  path.join(outDir, 'promotion-briefs.txt'),
  briefs.map((item) => `${item.title}\n${item.summary}\n${item.url}\n`).join('\n---\n')
)
console.log(`Wrote promotion briefs for ${briefs.length} reviewed pages`)
