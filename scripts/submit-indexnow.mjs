import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import articles from '../content-data/published-articles.json' with { type: 'json' }
import { SITE_ORIGIN } from '../site.config.mjs'

const root = process.cwd()
const siteUrl = (process.env.SITE_URL || SITE_ORIGIN).replace(/\/$/, '')
const key = process.env.INDEXNOW_KEY || ''
const keyFile = process.env.INDEXNOW_KEY_FILE || ''

let actualKey = key
let keyLocation = ''
if (keyFile) {
  const filePath = path.isAbsolute(keyFile) ? keyFile : path.join(root, keyFile)
  actualKey = fs.readFileSync(filePath, 'utf8').trim()
  keyLocation = `${siteUrl}/${path.basename(filePath)}`
}
if (!actualKey) {
  console.error('Missing INDEXNOW_KEY or INDEXNOW_KEY_FILE')
  process.exit(1)
}

const published = articles.filter((item) => item.status === 'published')
const urls = [
  `${siteUrl}/`,
  `${siteUrl}/blog/`,
  `${siteUrl}/zeogpt/`,
  `${siteUrl}/pricing-guide/`,
  `${siteUrl}/faq/`,
  `${siteUrl}/topics/chatgpt-official-entry/`,
  `${siteUrl}/topics/chatgpt-china-use/`,
  `${siteUrl}/topics/chatgpt-chinese-version/`,
  `${siteUrl}/topics/chatgpt-plus-payment/`,
  `${siteUrl}/topics/chatgpt-mirror-safety/`,
  `${siteUrl}/topics/zeogpt-guide/`,
  ...published.map((item) => `${siteUrl}/blog/${item.slug}/`)
]

const body = JSON.stringify({
  host: new URL(siteUrl).host,
  key: actualKey,
  keyLocation: keyLocation || `${siteUrl}/${actualKey}.txt`,
  urlList: urls
})

const req = https.request({
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  }
}, (res) => {
  let data = ''
  res.on('data', (chunk) => data += chunk)
  res.on('end', () => {
    console.log(`IndexNow status: ${res.statusCode}; submitted ${urls.length} reviewed URLs`)
    if (data) console.log(data)
    if (res.statusCode >= 400) process.exit(1)
  })
})
req.on('error', (error) => {
  console.error(error)
  process.exit(1)
})
req.write(body)
req.end()
