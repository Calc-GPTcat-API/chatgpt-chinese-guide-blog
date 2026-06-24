import fs from 'node:fs'
import path from 'node:path'
import articles from '../content-data/published-articles.json' with { type: 'json' }
import { SITE_IS_PLACEHOLDER, SITE_ORIGIN } from '../site.config.mjs'

const root = path.resolve('docs/.vitepress/dist')
const failures = []
const required = [
  'index.html','blog/index.html','zeogpt/index.html','pricing-guide/index.html',
  'faq/index.html','robots.txt','sitemap.xml','feed.xml'
]
const topicRoutes = [
  'topics/chatgpt-official-entry/index.html',
  'topics/chatgpt-china-use/index.html',
  'topics/chatgpt-chinese-version/index.html',
  'topics/chatgpt-plus-payment/index.html',
  'topics/chatgpt-mirror-safety/index.html',
  'topics/zeogpt-guide/index.html',
  'topics/ai-models-tools/index.html'
]
for (const topic of topicRoutes) required.push(topic)
for (const article of articles) required.push(`blog/${article.slug}/index.html`)
for (const file of required) if (!fs.existsSync(path.join(root, file))) failures.push(`缺少构建文件：${file}`)

const htmlFiles = []
const seenTitles = new Map()
const seenCanonicals = new Map()
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.html')) htmlFiles.push(full)
  }
}
if (fs.existsSync(root)) walk(root)

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  const rel = path.relative(root, file)
  const titleMatch = html.match(/<title>([^<]{10,})<\/title>/)
  if (!titleMatch) failures.push(`${rel} 缺少有效 title`)
  else if (rel !== '404.html') {
    const list = seenTitles.get(titleMatch[1]) || []
    list.push(rel)
    seenTitles.set(titleMatch[1], list)
  }
  if (rel !== '404.html' && !/<meta name="description" content="[^"]{30,}"/.test(html)) failures.push(`${rel} 缺少有效 description`)
  const canonicalMatch = html.match(/<link rel="canonical" href="(https?:\/\/[^"]+)"/)
  if (!canonicalMatch && rel !== '404.html') failures.push(`${rel} 缺少 canonical`)
  else if (canonicalMatch && rel !== '404.html') {
    const list = seenCanonicals.get(canonicalMatch[1]) || []
    list.push(rel)
    seenCanonicals.set(canonicalMatch[1], list)
  }
  if (rel !== '404.html' && !html.includes('application/ld+json')) failures.push(`${rel} 缺少 JSON-LD`)
  if (/gptchatguide\.com|gptbuys\.com|chatgpt-buy\.com|ref=LIJUN/i.test(html)) failures.push(`${rel} 仍含旧域名或旧参数`)
  if (/ChatGPT 官方中文版|OpenAI 官方授权|国内官方入口|100% 可用|永久稳定|绝不封号|保证可用|100% 成功充值/.test(html)) failures.push(`${rel} 含站点禁用的误导性固定短语`)
}
for (const [title, files] of seenTitles) if (files.length > 1) failures.push(`重复 title：${title} -> ${files.join(', ')}`)
for (const [canonical, files] of seenCanonicals) if (files.length > 1) failures.push(`重复 canonical：${canonical} -> ${files.join(', ')}`)

for (const article of articles) {
  const source = path.resolve('docs/blog', article.slug, 'index.md')
  if (!fs.existsSync(source)) {
    failures.push(`缺少文章源文件：${article.slug}`)
    continue
  }
  const sourceText = fs.readFileSync(source, 'utf8')
  const body = sourceText.replace(/^---[\s\S]*?\n---\s*/, '')
  const cjk = (body.match(/[\u4e00-\u9fff]/g) || []).length
  const ctaComponents = (body.match(/<ZeogptCta\b/g) || []).length
  if (cjk < 1200 || cjk > 2000) failures.push(`${article.slug} 汉字数 ${cjk}，不在 1200–2000 范围`)
  if (ctaComponents !== 3) failures.push(`${article.slug} CTA 组件数为 ${ctaComponents}，应为 3`)
  if (!body.includes('[[toc]]')) failures.push(`${article.slug} 缺少目录标记`)
  if (!body.includes('免责声明')) failures.push(`${article.slug} 缺少免责声明`)
  const topAffiliateIndex = body.indexOf('class="article-top-affiliate"')
  const firstCtaIndex = body.indexOf('<ZeogptCta')
  const tocIndex = body.indexOf('[[toc]]')
  if (topAffiliateIndex === -1 || !body.includes('https://www.zeogpt.com/register?ref=Ac3KbS3F')) failures.push(`${article.slug} 首屏缺少 ZEOGPT 直达外部链接`)
  if (tocIndex !== -1 && (topAffiliateIndex > tocIndex || firstCtaIndex > tocIndex)) failures.push(`${article.slug} 首屏 ZEOGPT 入口必须放在目录前`)
  const builtPath = path.join(root, 'blog', article.slug, 'index.html')
  if (fs.existsSync(builtPath)) {
    const built = fs.readFileSync(builtPath, 'utf8')
    const affiliateHrefs = (built.match(/href="https:\/\/www\.zeogpt\.com\/register\?ref=Ac3KbS3F"/g) || []).length
    if (affiliateHrefs !== 5) failures.push(`${article.slug} 构建后外部链接数为 ${affiliateHrefs}，应为 5（首屏直达链接 + 3 个正文 CTA + 1 个顶部导航）`)
  }
}

const robotsPath = path.join(root, 'robots.txt')
const sitemapPath = path.join(root, 'sitemap.xml')
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8')
  if (SITE_IS_PLACEHOLDER && !/Disallow: \/\s/.test(robots)) failures.push('占位域名阶段 robots.txt 未阻止抓取')
  if (!SITE_IS_PLACEHOLDER && (!/Allow: \/\s/.test(robots) || !robots.includes(`${SITE_ORIGIN}/sitemap.xml`))) failures.push('正式域名 robots.txt 配置异常')
}
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8')
  if (!sitemap.includes(`${SITE_ORIGIN}/`)) failures.push('sitemap.xml 未使用当前 SITE_ORIGIN')
  const count = (sitemap.match(/<url>/g) || []).length
  const expectedSitemapCount = 8 + topicRoutes.length + articles.length
  if (count !== expectedSitemapCount) failures.push(`sitemap.xml URL 数为 ${count}，应为 ${expectedSitemapCount}`)
  if (sitemap.includes('404')) failures.push('sitemap.xml 不应包含 404 页面')
}

if (failures.length) {
  console.error(`站点审计失败（${failures.length} 项）：`)
  for (const item of failures) console.error(`- ${item}`)
  process.exit(1)
}
console.log(`站点审计通过：${htmlFiles.length} 个 HTML；关键页面、唯一 title/canonical、JSON-LD、文章字数、CTA、旧域名和禁用短语检查无异常。`)
