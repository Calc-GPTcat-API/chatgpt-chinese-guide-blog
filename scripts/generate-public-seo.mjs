import fs from 'node:fs'
import path from 'node:path'
import articles from '../content-data/published-articles.json' with { type: 'json' }
import { BUILD_DATE, SITE_IS_PLACEHOLDER, SITE_NAME, SITE_ORIGIN } from '../site.config.mjs'

const publicDir = path.resolve('docs/public')
fs.mkdirSync(publicDir, { recursive: true })

const robots = SITE_IS_PLACEHOLDER
  ? `# 域名尚未配置：防止测试站误收录。\nUser-agent: *\nDisallow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`
  : `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots)

const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (c) => ({
  '<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'
}[c]))

const staticRoutes = [
  { path: '/', lastmod: BUILD_DATE, changefreq: 'weekly', priority: '1.0' },
  { path: '/blog/', lastmod: BUILD_DATE, changefreq: 'weekly', priority: '0.9' },
  { path: '/zeogpt/', lastmod: BUILD_DATE, changefreq: 'monthly', priority: '0.8' },
  { path: '/pricing-guide/', lastmod: BUILD_DATE, changefreq: 'monthly', priority: '0.8' },
  { path: '/faq/', lastmod: BUILD_DATE, changefreq: 'monthly', priority: '0.8' },
  { path: '/about/', lastmod: BUILD_DATE, changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy/', lastmod: BUILD_DATE, changefreq: 'yearly', priority: '0.3' },
  { path: '/disclaimer/', lastmod: BUILD_DATE, changefreq: 'yearly', priority: '0.3' }
]

const topicRoutes = [
  '/topics/chatgpt-official-entry/',
  '/topics/chatgpt-china-use/',
  '/topics/chatgpt-chinese-version/',
  '/topics/chatgpt-plus-payment/',
  '/topics/chatgpt-mirror-safety/',
  '/topics/zeogpt-guide/',
  '/topics/ai-models-tools/'
].map((route) => ({ path: route, lastmod: BUILD_DATE, changefreq: 'weekly', priority: '0.85' }))

const articleRoutes = articles.map((item) => ({
  path: `/blog/${item.slug}/`,
  lastmod: item.updated,
  changefreq: 'monthly',
  priority: '0.8'
}))

const routes = [...staticRoutes, ...topicRoutes, ...articleRoutes]

const sitemapUrls = routes.map((route) => `  <url>
    <loc>${escapeXml(`${SITE_ORIGIN}${route.path}`)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)

const items = articles.map((item) => `  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${SITE_ORIGIN}/blog/${item.slug}/</link>
    <guid>${SITE_ORIGIN}/blog/${item.slug}/</guid>
    <pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>
    <description>${escapeXml(item.description)}</description>
  </item>`).join('\n')
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${SITE_NAME}</title>
  <link>${SITE_ORIGIN}/</link>
  <description>ChatGPT 国内使用教程与 ZEOGPT 镜像订阅说明</description>
  <language>zh-CN</language>
${items}
</channel>
</rss>
`
fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss)

console.log(`[seo] robots.txt, sitemap.xml (${routes.length} URLs) and feed.xml generated for ${SITE_ORIGIN}${SITE_IS_PLACEHOLDER ? ' (placeholder/noindex)' : ''}`)
