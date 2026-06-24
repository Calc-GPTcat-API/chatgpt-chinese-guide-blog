import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const siteUrl = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '')
const articles = JSON.parse(fs.readFileSync(path.join(root, 'content-data/published-articles.json'), 'utf8'))

const staticRoutes = [
  ['/', '2026-06-24', 'weekly', '1.0'],
  ['/blog/', '2026-06-24', 'weekly', '0.9'],
  ['/faq/', '2026-06-24', 'monthly', '0.8'],
  ['/zeogpt/', '2026-06-24', 'monthly', '0.7'],
  ['/pricing-guide/', '2026-06-24', 'monthly', '0.7'],
  ['/about/', '2026-06-24', 'monthly', '0.5'],
  ['/privacy/', '2026-06-24', 'yearly', '0.3'],
  ['/disclaimer/', '2026-06-24', 'yearly', '0.3'],
]

const topicRoutes = [
  '/topics/chatgpt-official-entry/',
  '/topics/chatgpt-china-use/',
  '/topics/chatgpt-chinese-version/',
  '/topics/chatgpt-plus-payment/',
  '/topics/chatgpt-mirror-safety/',
  '/topics/zeogpt-guide/',
  '/topics/ai-models-tools/',
].map((route) => [route, '2026-06-24', 'weekly', '0.85'])

const articleRoutes = articles.map((item) => [`/blog/${item.slug}/`, item.updated || item.date || '2026-06-24', 'monthly', '0.8'])
const routes = [...staticRoutes, ...topicRoutes, ...articleRoutes]

const publicDir = path.join(root, 'docs/public')
fs.mkdirSync(publicDir, { recursive: true })

const robots = siteUrl === 'https://example.com'
  ? `# 域名尚未配置：防止测试站误收录。\nUser-agent: *\nDisallow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(([route, lastmod, changefreq, priority]) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)

function rssDate(date) {
  const d = new Date(`${date || '2026-06-22'}T00:00:00Z`)
  return d.toUTCString()
}

const rssItems = articles.map((item) => `  <item>
    <title><![CDATA[${item.title}]]></title>
    <link>${siteUrl}/blog/${item.slug}/</link>
    <guid>${siteUrl}/blog/${item.slug}/</guid>
    <pubDate>${rssDate(item.date)}</pubDate>
    <description><![CDATA[${item.description || ''}]]></description>
  </item>`).join('\n')

const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>ChatGPT中文指南</title>\n  <link>${siteUrl}/</link>\n  <description>ChatGPT 官网入口、国内使用、中文版、镜像站安全与 AI 工具教程</description>\n  <language>zh-CN</language>\n${rssItems}\n</channel>\n</rss>\n`
fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed)

console.log(`Generated sitemap.xml, robots.txt and feed.xml for ${siteUrl}`)
console.log(`Total URLs: ${routes.length}`)
