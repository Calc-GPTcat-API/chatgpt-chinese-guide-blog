# 新项目结构说明

```text
chatgpt-chinese-guide-zeogpt-site/
├── package.json
├── package-lock.json
├── site.config.mjs                   # 域名、站名、外部链接唯一配置源
├── README.md
├── DEPLOYMENT.md
├── DELIVERY_MANIFEST.md
├── content-data/
│   └── published-articles.json       # 已发布文章列表
├── content-plan/
│   ├── article-matrix-60.csv
│   ├── article-matrix-60.json
│   ├── article-matrix-60.md
│   ├── ARTICLE_TEMPLATE.md
│   └── EDITORIAL_CHECKLIST.md
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts                # 导航、侧栏、SEO、sitemap、JSON-LD
│   │   ├── theme/
│   │   │   ├── Layout.vue
│   │   │   ├── custom.css
│   │   │   ├── index.ts
│   │   │   └── components/
│   │   │       ├── HomePage.vue
│   │   │       ├── BlogIndex.vue
│   │   │       ├── ArticleMeta.vue
│   │   │       ├── ZeogptCta.vue
│   │   │       └── RiskNotice.vue
│   │   └── dist/                     # 构建后静态站
│   ├── index.md                      # 首页数据
│   ├── blog/
│   │   ├── index.md
│   │   └── <slug>/index.md           # 8 篇重点文章
│   ├── zeogpt/index.md
│   ├── pricing-guide/index.md
│   ├── faq/index.md
│   ├── about/index.md
│   ├── privacy/index.md
│   ├── disclaimer/index.md
│   └── public/
│       ├── favicon.svg
│       ├── og-default.png
│       ├── robots.txt                # 构建前自动生成
│       └── feed.xml                  # 构建前自动生成
├── scripts/
│   ├── generate-public-seo.mjs
│   ├── check-domain.mjs
│   ├── audit-site.mjs
│   └── check-links.mjs
├── deploy/
│   ├── vercel.json
│   ├── netlify.toml
│   └── nginx.conf.example
└── reports/
    ├── PROJECT_AUDIT.md
    ├── PROJECT_STRUCTURE.md
    ├── ZEOGPT_PUBLIC_PAGE_ANALYSIS.md
    ├── REFERENCE_SITE_ANALYSIS.md
    ├── BING_INDEXING_GUIDE.md
    ├── CONTENT_COMPLIANCE_GUIDE.md
    └── BUILD_REPORT.md
```

## URL 规则

目录式英文 slug 用于生成稳定的静态 `index.html`：

```text
/blog/chatgpt-official-entry-domestic-use/
/blog/chatgpt-chinese-entry-guide/
/blog/zeogpt-pricing-comparison/
```

这种形式不依赖服务器自动处理 `.html`，适合常见静态主机，也便于统一尾斜杠 canonical。

## 页面渲染

- 首页和博客列表由 Vue 组件服务器端渲染为 HTML；
- 文章和专题页由 Markdown 预渲染；
- 分类按钮是渐进增强：初始 HTML 已包含全部文章链接；
- 文章目录、侧栏、面包屑与上一页/下一页均生成静态链接；
- 关键内容不依赖客户端请求后才出现。
