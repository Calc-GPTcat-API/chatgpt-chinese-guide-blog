import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const input = process.argv[2] || 'content-data/article-rewrites.json'
const inputPath = path.isAbsolute(input) ? input : path.join(root, input)

if (!fs.existsSync(inputPath)) {
  console.error(`Rewrite file not found: ${input}`)
  console.error('Copy content-data/article-rewrites.example.json to content-data/article-rewrites.json first.')
  process.exit(1)
}

const rewrites = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
const dataPath = path.join(root, 'content-data/published-articles.json')
const articles = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
const map = new Map(articles.map((item) => [item.slug, item]))

let count = 0

for (const item of rewrites) {
  const current = map.get(item.slug)
  if (!current) {
    console.warn(`Skip unknown slug: ${item.slug}`)
    continue
  }

  if (item.title) current.title = item.title
  if (item.description) current.description = item.description
  if (item.updated) current.updated = item.updated
  if (item.date) current.date = item.date
  if (item.category) current.category = item.category
  if (item.tags) current.tags = item.tags

  const dir = path.join(root, 'docs/blog', item.slug)
  fs.mkdirSync(dir, { recursive: true })
  const file = path.join(dir, 'index.md')
  const oldText = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  const oldBody = oldText.startsWith('---') ? oldText.split('---').slice(2).join('---').trim() : oldText.trim()
  let body = item.body || oldBody || `# ${current.title}\n\n正文待补充。`
  const conversionCta = `<ZeogptCta variant="agent" title="想直接使用 ZEOGPT 多模型 AI？" text="阅读教程了解问题后，如果你需要 ChatGPT 镜像和多模型入口，可以直接打开 ZEOGPT 注册页查看实时套餐。" label="立即打开 ZEOGPT" />`
  const bottomConversionCta = `## 下一步：直接打开 ZEOGPT\n\n<ZeogptCta variant="agent" title="教程看完了，下一步就是打开 ZEOGPT" text="如果你已经确认需要 ChatGPT 镜像和多模型 AI 入口，可以直接进入 ZEOGPT 注册页查看实时套餐、模型和额度。" label="立即打开 ZEOGPT" />`
  if (!body.includes('<ZeogptCta')) {
    if (body.includes('[[toc]]')) body = body.replace('[[toc]]', `[[toc]]\n\n${conversionCta}\n`)
    else body = `${conversionCta}\n\n${body}`
  }
  if (!body.includes('## 下一步：直接打开 ZEOGPT')) {
    body = `${body.trim()}\n\n${bottomConversionCta}\n`
  }

  const fm = `---
title: "${(current.title + ' | ChatGPT中文指南').replace(/"/g, '\\"')}"
description: "${(current.description || '').replace(/"/g, '\\"')}"
h1: "${current.title.replace(/"/g, '\\"')}"
article: true
author: "ChatGPT中文指南编辑部"
date: "${current.date || current.updated || '2026-06-22'}"
updated: "${current.updated || current.date || '2026-06-22'}"
category: "${current.category || '常见问题'}"
tags: [${(current.tags || []).map((tag) => JSON.stringify(tag)).join(', ')}]
outline: [2, 3]
---
`

  fs.writeFileSync(file, `${fm.trim()}\n\n${body.trim()}\n`)
  count += 1
}

fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2))
console.log(`Imported ${count} rewritten article(s).`)
console.log('Next: npm run seo:generate')
