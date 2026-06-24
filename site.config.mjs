/**
 * 全站唯一域名配置源。
 * 方式一：把“这里填新站域名”替换成正式域名（含 https://）。
 * 方式二：构建时设置 SITE_URL=https://your-domain.example。
 */
export const SITE_DOMAIN = process.env.SITE_URL || '这里填新站域名'
export const SITE_IS_PLACEHOLDER = SITE_DOMAIN === '这里填新站域名'

function normalizeOrigin(value) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return withProtocol.replace(/\/+$/, '')
}

// 占位阶段使用 IANA 保留域名，避免旧域名或错误域名进入 canonical。
export const SITE_ORIGIN = SITE_IS_PLACEHOLDER
  ? 'https://example.com'
  : normalizeOrigin(SITE_DOMAIN)

export const SITE_NAME = 'ChatGPT中文指南'
export const SITE_SUBTITLE = 'ChatGPT 国内使用教程与 ZEOGPT 镜像订阅说明'
export const ZEOGPT_REGISTER_URL = 'https://www.zeogpt.com/register?ref=Ac3KbS3F'
export const BUILD_DATE = '2026-06-24'
