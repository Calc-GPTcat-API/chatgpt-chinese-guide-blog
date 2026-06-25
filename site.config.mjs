export const SITE_NAME = 'ChatGPT中文指南'

export const SITE_SUBTITLE = 'ChatGPT 中文教程、Plus 开通、支付问题、AI 工具与 ZEOGPT 使用指南'

export const SITE_DOMAIN = 'www.chinachatgpt.com'

function normalizeOrigin(domain) {
  const value = String(domain || '').trim().replace(/\/+$/, '')
  if (!value) return 'https://example.com'
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  return `https://${value}`
}

export const SITE_IS_PLACEHOLDER =
  !SITE_DOMAIN ||
  SITE_DOMAIN === 'example.com' ||
  SITE_DOMAIN.includes('example.com') ||
  SITE_DOMAIN.includes('placeholder') ||
  SITE_DOMAIN.includes('这里填')

export const SITE_ORIGIN = normalizeOrigin(SITE_DOMAIN)

export const BUILD_DATE = new Date().toISOString()
