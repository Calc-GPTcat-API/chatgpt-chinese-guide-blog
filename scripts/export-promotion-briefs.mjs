import fs from 'node:fs'
import path from 'node:path'

const siteUrl = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '')
const articles = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content-data/published-articles.json'), 'utf8'))

const outDir = path.join(process.cwd(), 'exports')
fs.mkdirSync(outDir, { recursive: true })

const top = articles.slice(0, 20).map((item) => ({
  title: item.title,
  url: `${siteUrl}/blog/${item.slug}/`,
  summary: item.description,
  zhihuSnippet: `${item.title}\n\n${item.description}\n\n阅读全文：${siteUrl}/blog/${item.slug}/`,
  bSiteSnippet: `${item.title}｜${item.description}`,
  anchorText: item.tags?.slice(0, 3) || []
}))

fs.writeFileSync(path.join(outDir, 'promotion-briefs.json'), JSON.stringify(top, null, 2))
fs.writeFileSync(path.join(outDir, 'promotion-briefs.txt'), top.map((item) => `${item.title}\n${item.summary}\n${item.url}\n`).join('\n---\n'))
console.log(`Wrote promotion briefs for ${top.length} core pages to exports/`)
