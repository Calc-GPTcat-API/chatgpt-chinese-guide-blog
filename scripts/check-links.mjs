import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve('docs/.vitepress/dist')
const htmlFiles = []
const failures = []
let checked = 0
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.html')) htmlFiles.push(full)
  }
}
function targetCandidates(pageFile, href) {
  const clean = href.split('#')[0].split('?')[0]
  if (!clean) return []
  let target = clean.startsWith('/')
    ? path.join(root, clean.slice(1))
    : path.resolve(path.dirname(pageFile), clean)
  if (clean.endsWith('/')) return [path.join(target, 'index.html')]
  if (path.extname(target)) return [target]
  return [target, `${target}.html`, path.join(target, 'index.html')]
}
if (!fs.existsSync(root)) {
  console.error('缺少构建目录，请先运行 npm run build。')
  process.exit(1)
}
walk(root)
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  const rel = path.relative(root, file)
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&')
    if (/^(?:https?:|mailto:|tel:|javascript:|data:|\/\/|#)/i.test(href)) continue
    const candidates = targetCandidates(file, href)
    if (!candidates.length) continue
    checked += 1
    if (!candidates.some((candidate) => fs.existsSync(candidate))) failures.push(`${rel} -> ${href}`)
  }
}
if (failures.length) {
  console.error(`站内链接检查失败（${failures.length} 项）：`)
  for (const item of failures) console.error(`- ${item}`)
  process.exit(1)
}
console.log(`站内链接检查通过：${htmlFiles.length} 个 HTML，${checked} 个站内链接引用。`)
