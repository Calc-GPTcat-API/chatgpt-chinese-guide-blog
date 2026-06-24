import { SITE_DOMAIN, SITE_IS_PLACEHOLDER, SITE_ORIGIN } from '../site.config.mjs'
if (SITE_IS_PLACEHOLDER) {
  console.error('生产构建已停止：请在 site.config.mjs 中把“这里填新站域名”替换为正式域名，或设置 SITE_URL 环境变量。')
  process.exit(1)
}
try {
  const url = new URL(SITE_ORIGIN)
  if (url.protocol !== 'https:') throw new Error('生产域名必须使用 HTTPS')
  console.log(`域名检查通过：${url.origin}`)
} catch (error) {
  console.error(`域名配置无效：${SITE_DOMAIN}
${error.message}`)
  process.exit(1)
}
