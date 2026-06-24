import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'

const root = process.cwd()
const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '')
const key = process.env.INDEXNOW_KEY || ''
const keyFile = process.env.INDEXNOW_KEY_FILE || ''

if (!siteUrl) {
  console.error('Missing SITE_URL, example: SITE_URL=https://example.com npm run indexnow')
  process.exit(1)
}

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

const articles = JSON.parse(fs.readFileSync(path.join(root, 'content-data/published-articles.json'), 'utf8'))
const urls = [
  `${siteUrl}/`,
  `${siteUrl}/blog/`,
  `${siteUrl}/faq/`,
  `${siteUrl}/topics/chatgpt-official-entry/`,
  `${siteUrl}/topics/chatgpt-china-use/`,
  `${siteUrl}/topics/chatgpt-chinese-version/`,
  `${siteUrl}/topics/chatgpt-plus-payment/`,
  `${siteUrl}/topics/chatgpt-mirror-safety/`,
  `${siteUrl}/topics/zeogpt-guide/`,
  `${siteUrl}/topics/ai-models-tools/`,
  ...articles.map((item) => `${siteUrl}/blog/${item.slug}/`)
]

const host = new URL(siteUrl).host
const body = JSON.stringify({
  host,
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
    console.log(`IndexNow status: ${res.statusCode}`)
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
