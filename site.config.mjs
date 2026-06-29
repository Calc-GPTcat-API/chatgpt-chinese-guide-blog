/**
 * Single source of truth for production domain and ZEOGPT promotion.
 * Keep this file ASCII-safe to avoid Windows encoding corruption.
 */
export const SITE_DOMAIN = 'www.chinachatgpt.com'

export const SITE_IS_PLACEHOLDER = !SITE_DOMAIN || /example\.com|placeholder|your-domain|test-domain/i.test(SITE_DOMAIN)

function normalizeOrigin(value) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return withProtocol.replace(/\/+$/, '')
}

export const SITE_ORIGIN = normalizeOrigin(SITE_DOMAIN)

export const SITE_NAME = 'ChatGPT\u4e2d\u6587\u6307\u5357'

export const SITE_SUBTITLE = 'ChatGPT \u56fd\u5185\u4f7f\u7528\u3001AI \u5de5\u5177\u5165\u53e3\u3001GPT \u753b\u56fe\u3001Codex\u3001ClaudeCode \u4e0e\u7b2c\u4e09\u65b9\u5e73\u53f0\u6838\u9a8c\u6307\u5357'

export const ZEOGPT_REGISTER_URL = 'https://www.zeogpt.com/register?ref=Ac3KbS3F'

export const BUILD_DATE = new Date().toISOString()

export const PROMOTION_PRIMARY_NAME = 'ZEOGPT'

export const PROMOTION_PRIMARY_URL = ZEOGPT_REGISTER_URL

export const PROMOTION_PRIMARY_DESC = 'ZEOGPT third-party AI platform entry. Check live pricing, quota, privacy and refund rules before registration or payment.'

export const PROMOTION_SECONDARY_LINKS = []

