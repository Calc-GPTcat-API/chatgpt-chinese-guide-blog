# ChatGPT中文指南

**副标题：** ChatGPT 国内使用教程与 ZEOGPT 镜像订阅说明

这是一个基于 VitePress 1.6.4 的中文静态教程博客。站点围绕 ChatGPT 官网入口、中文使用、国内用户常见问题、Plus 支付、镜像站安全、ZEOGPT 注册与套餐，以及 Claude、Gemini、Grok、DeepSeek 等多模型内容进行规划。

> 本站不是 OpenAI 官方网站。ZEOGPT 是第三方 AI 模型订阅与镜像服务。项目中的外部链接含参数，注册或付款前应核验实时价格、额度、隐私、退款与稳定性。

## 交付内容

- 原创响应式首页 `/`
- 教程博客首页 `/blog/`
- ZEOGPT 介绍页 `/zeogpt/`
- 套餐说明页 `/pricing-guide/`
- 常见问题页 `/faq/`
- 8 篇完整重点文章
- 60 篇内容矩阵（CSV、JSON、Markdown）
- 逐页 title、description、canonical、Open Graph、Twitter Card、JSON-LD
- 自动生成 sitemap.xml、robots.txt、RSS
- 左侧栏目、右侧目录、面包屑、标签、上一篇/下一篇、相关阅读
- 生产域名校验、SEO 审计和站内链接检查
- Vercel、Netlify、Nginx 部署示例
- 原项目审计、ZEOGPT 公共页面分析、参考站分析与 Bing 提交指南

## 第一步：填写正式域名

新域名尚未提供。请采用以下任一方式：

### 方式 A：编辑配置

打开根目录 `site.config.mjs`，将：

```js
export const SITE_DOMAIN = process.env.SITE_URL || '这里填新站域名'
```

中的占位文字替换为完整 HTTPS 域名。

### 方式 B：设置环境变量

```bash
SITE_URL=https://your-domain.example npm run build:production
```

Vercel、Netlify、Cloudflare Pages 等平台可在项目环境变量中设置：

```text
SITE_URL=https://your-domain.example
```

占位域名阶段，构建会安全输出 `noindex, nofollow` 和 `Disallow: /`，避免测试站或错误 canonical 被搜索引擎收录。生产构建命令会在域名未填写时主动失败。

## 本地运行

要求 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

开发服务器默认会显示终端中的本地地址。

## 构建与检查

普通测试构建：

```bash
npm run test
```

该命令会依次执行：

1. 生成 robots.txt 和 RSS；
2. 构建静态 HTML；
3. 检查 title、description、canonical、JSON-LD、文章字数、CTA、旧域名与误导性固定短语；
4. 检查所有站内链接。

正式域名构建：

```bash
SITE_URL=https://your-domain.example npm run build:production
SITE_URL=https://your-domain.example npm run audit
SITE_URL=https://your-domain.example npm run check:links
```

输出目录：

```text
docs/.vitepress/dist
```

## 重要配置

| 用途 | 文件 |
| --- | --- |
| 域名、站名、外部链接 | `site.config.mjs` |
| VitePress、导航、侧栏、SEO | `docs/.vitepress/config.mts` |
| 首页组件 | `docs/.vitepress/theme/components/HomePage.vue` |
| 博客首页组件 | `docs/.vitepress/theme/components/BlogIndex.vue` |
| 全局样式 | `docs/.vitepress/theme/custom.css` |
| 已发布文章数据 | `content-data/published-articles.json` |
| 60 篇内容矩阵 | `content-plan/article-matrix-60.*` |
| robots / RSS 生成 | `scripts/generate-public-seo.mjs` |
| SEO 审计 | `scripts/audit-site.mjs` |
| 站内链接检查 | `scripts/check-links.mjs` |

## 发布文章的建议流程

1. 从 `content-plan/article-matrix-60.csv` 选择一个搜索意图；
2. 使用英文 slug 建立 `docs/blog/<slug>/index.md`；
3. 编写唯一 title、description、H1 和正文；
4. 至少加入 3 条相关内链；
5. 只在商业意图自然的位置加入 ZEOGPT CTA；
6. 对价格、模型、地区、政策等变化信息注明核验日期；
7. 更新 `content-data/published-articles.json` 与侧栏；
8. 运行 `npm run test`；
9. 使用正式域名重新生产构建；
10. 部署后提交 sitemap，并用 Bing URL Inspection 核验。

## 免责声明

规范的静态 HTML、原创内容、内链、sitemap 和持续更新可提高搜索引擎发现、抓取与理解页面的概率，但不能保证 Bing 或其他搜索引擎必定收录、展示指定标题或摘要、获得首页排名。
