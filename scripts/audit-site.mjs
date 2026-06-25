import fs from 'node:fs'
import path from 'node:path'
import articles from '../content-data/published-articles.json' with { type: 'json' }
import { SITE_IS_PLACEHOLDER, SITE_ORIGIN } from '../site.config.mjs'

const root = path.resolve('docs/.vitepress/dist')
const failures = []
const published = articles.filter((item) => item.status === 'published')
const review = articles.filter((item) => item.status === 'review')
const highIntent = new Set([
  'what-is-zeogpt',
  'zeogpt-register-guide',
  'zeogpt-pricing-comparison'
])

if (!fs.existsSync(root)) {
  console.error('缺少构建目录，请先运行 npm run build。')
  process.exit(1)
}

if (articles.length !== 60) failures.push(`文章总数为 ${articles.length}，预期 60`)
if (published.length !== 8) failures.push(`公开文章为 ${published.length}，预期 8`)
if (review.length !== 52) failures.push(`复核队列为 ${review.length}，预期 52`)

const required = [
  'index.html',
  'blog/index.html',
  'zeogpt/index.html',
  'pricing-guide/index.html',
  'faq/index.html',
  'about/index.html',
  'editorial-policy/index.html',
  'privacy/index.html',
  'disclaimer/index.html',
  'robots.txt',
  'sitemap.xml',
  'feed.xml'
]
for (const item of articles) required.push(`blog/${item.slug}/index.html`)
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`缺少构建文件：${file}`)
}

const htmlFiles = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.html')) htmlFiles.push(full)
  }
}
walk(root)

const seenTitles = new Map()
const seenCanonicals = new Map()
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  const rel = path.relative(root, file)
  if (rel === '404.html') continue

  const title = html.match(/<title>([^<]{8,})<\/title>/)?.[1]
  if (!title) failures.push(`${rel} 缺少有效 title`)
  else {
    const list = seenTitles.get(title) || []
    list.push(rel)
    seenTitles.set(title, list)
  }

  if (!/<meta name="description" content="[^"]{30,}"/.test(html)) {
    failures.push(`${rel} 缺少有效 description`)
  }

  const canonical = html.match(/<link rel="canonical" href="(https?:\/\/[^"]+)"/)?.[1]
  if (!canonical) failures.push(`${rel} 缺少 canonical`)
  else {
    const list = seenCanonicals.get(canonical) || []
    list.push(rel)
    seenCanonicals.set(canonical, list)
  }

  if (!html.includes('application/ld+json')) failures.push(`${rel} 缺少 JSON-LD`)
  if (/example\.com|这里填新站域名|chatgpt-buy\.com|gptchatguide\.com|ref=LIJUN/i.test(html)) {
    failures.push(`${rel} 含占位域名、旧域名或旧推广参数`)
  }
  if (/承接流量|完成使用|持续内链|反复触达/.test(html)) {
    failures.push(`${rel} 暴露内部运营语言`)
  }
  if (html.includes('article-top-affiliate')) {
    failures.push(`${rel} 仍含首屏裸推广条`)
  }
}

for (const [title, files] of seenTitles) {
  if (files.length > 1) failures.push(`重复 title：${title} -> ${files.join(', ')}`)
}
for (const [canonical, files] of seenCanonicals) {
  if (files.length > 1) failures.push(`重复 canonical：${canonical} -> ${files.join(', ')}`)
}

for (const item of articles) {
  const source = path.resolve('docs/blog', item.slug, 'index.md')
  const sourceText = fs.readFileSync(source, 'utf8')
  const body = sourceText.replace(/^---[\s\S]*?\n---\s*/, '')
  const ctas = (body.match(/<ZeogptCta\b/g) || []).length
  const expectedCtas = highIntent.has(item.slug) ? 3 : 2
  if (ctas !== expectedCtas) failures.push(`${item.slug} CTA 数为 ${ctas}，预期 ${expectedCtas}`)
  if (/适合正在搜索“/.test(body)) failures.push(`${item.slug} 仍含后台关键词式句子`)
  if (body.includes('article-top-affiliate')) failures.push(`${item.slug} 仍含首屏裸推广条`)

  const tags = item.tags || []
  if (tags.length > 4) failures.push(`${item.slug} 标签超过 4 个`)
  if (new Set(tags.map((tag) => String(tag).toLowerCase())).size !== tags.length) {
    failures.push(`${item.slug} 标签重复`)
  }

  const built = fs.readFileSync(path.join(root, 'blog', item.slug, 'index.html'), 'utf8')
  const robots = built.match(/<meta name="robots" content="([^"]+)"/)?.[1] || ''
  if (item.status === 'published' && !robots.startsWith('index, follow')) {
    failures.push(`${item.slug} 公开文章 robots 异常：${robots}`)
  }
  if (item.status === 'review' && robots !== 'noindex, follow') {
    failures.push(`${item.slug} 复核文章 robots 异常：${robots}`)
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8')
const sitemapCount = (sitemap.match(/<url>/g) || []).length
if (sitemapCount !== 23) failures.push(`sitemap URL 数为 ${sitemapCount}，预期 23`)
if (!sitemap.includes(`${SITE_ORIGIN}/`)) failures.push('sitemap 未使用正式主域名')
for (const item of published) {
  if (!sitemap.includes(`/blog/${item.slug}/`)) failures.push(`sitemap 缺少公开文章：${item.slug}`)
}
for (const item of review) {
  if (sitemap.includes(`/blog/${item.slug}/`)) failures.push(`sitemap 错误包含复核文章：${item.slug}`)
}
if (sitemap.includes('/topics/ai-models-tools/')) failures.push('sitemap 错误包含复核中的 AI 模型专题')

const feed = fs.readFileSync(path.join(root, 'feed.xml'), 'utf8')
const feedCount = (feed.match(/<item>/g) || []).length
if (feedCount !== 8) failures.push(`RSS 文章数为 ${feedCount}，预期 8`)
for (const item of review) {
  if (feed.includes(`/blog/${item.slug}/`)) failures.push(`RSS 错误包含复核文章：${item.slug}`)
}

const robotsText = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8')
if (SITE_IS_PLACEHOLDER) {
  if (!robotsText.includes('Disallow: /')) failures.push('占位阶段 robots 未封锁')
} else {
  if (!robotsText.includes('Allow: /')) failures.push('正式站 robots 未允许抓取')
  if (!robotsText.includes(`${SITE_ORIGIN}/sitemap.xml`)) failures.push('robots sitemap 地址错误')
}

if (failures.length) {
  console.error(`站点审计失败（${failures.length} 项）：`)
  for (const item of failures) console.error(`- ${item}`)
  process.exit(1)
}

console.log(`站点审计通过：${htmlFiles.length} 个 HTML；8 篇公开、52 篇复核；sitemap 23 个 URL；RSS 8 篇。`)
