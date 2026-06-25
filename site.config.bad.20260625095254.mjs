/**
 * 鍏ㄧ珯鍞竴鍩熷悕閰嶇疆婧愩€?
 * 鏂瑰紡涓€锛氭妸鈥滆繖閲屽～鏂扮珯鍩熷悕鈥濇浛鎹㈡垚姝ｅ紡鍩熷悕锛堝惈 https://锛夈€?
 * 鏂瑰紡浜岋細鏋勫缓鏃惰缃?SITE_URL=https://your-domain.example銆?
 */
export const SITE_DOMAIN = 'www.chinachatgpt.com'
export const SITE_IS_PLACEHOLDER = SITE_DOMAIN === '杩欓噷濉柊绔欏煙鍚?

function normalizeOrigin(value) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  return withProtocol.replace(/\/+$/, '')
}

// 鍗犱綅闃舵浣跨敤 IANA 淇濈暀鍩熷悕锛岄伩鍏嶆棫鍩熷悕鎴栭敊璇煙鍚嶈繘鍏?canonical銆?
export const SITE_ORIGIN = SITE_IS_PLACEHOLDER
  ? 'https://example.com'
  : normalizeOrigin(SITE_DOMAIN)

export const SITE_NAME = 'ChatGPT涓枃鎸囧崡'
export const SITE_SUBTITLE = 'ChatGPT 鍥藉唴浣跨敤鏁欑▼涓?ZEOGPT 闀滃儚璁㈤槄璇存槑'
export const ZEOGPT_REGISTER_URL = 'https://www.zeogpt.com/register?ref=Ac3KbS3F'
export const BUILD_DATE = '2026-06-24'

