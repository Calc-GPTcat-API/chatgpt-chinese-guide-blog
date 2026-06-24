import { defineConfig } from 'vitepress'
import articles from '../../content-data/published-articles.json'
import {
  BUILD_DATE,
  SITE_IS_PLACEHOLDER,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_SUBTITLE
} from '../../site.config.mjs'

const staticDates: Record<string, string> = {
  '/': BUILD_DATE,
  '/blog/': BUILD_DATE,
  '/zeogpt/': BUILD_DATE,
  '/pricing-guide/': BUILD_DATE,
  '/faq/': BUILD_DATE,
  '/about/': BUILD_DATE,
  '/disclaimer/': BUILD_DATE,
  '/privacy/': BUILD_DATE
}
for (const article of articles) staticDates[`/blog/${article.slug}/`] = article.updated

function routeFromRelativePath(relativePath: string) {
  return `/${relativePath}`
    .replace(/index\.md$/, '')
    .replace(/\.md$/, '/')
    .replace(/\/+/g, '/')
}

function articleSidebar() {
  const pick = (slugs: string[]) =>
    slugs
      .map((slug) => articles.find((item) => item.slug === slug))
      .filter(Boolean)
      .map((item) => ({ text: item!.title, link: `/blog/${item!.slug}/` }))

  return [
    {
      text: '使用指南',
      collapsed: false,
      items: [
        { text: '博客文章', link: '/blog/' },
        { text: 'ChatGPT 官网入口', link: '/blog/chatgpt-official-entry-domestic-use/' },
        { text: 'ChatGPT 中文版', link: '/blog/chatgpt-chinese-entry-guide/' },
        { text: '官网打不开排查', link: '/blog/chatgpt-website-not-working/' },
        { text: '镜像站安全检查', link: '/blog/chatgpt-mirror-site-safety/' }
      ]
    },
    {
      text: 'ChatGPT 教程',
      collapsed: false,
      items: pick([
        'chatgpt-official-entry-domestic-use',
        'chatgpt-chinese-entry-guide',
        'chatgpt-website-not-working',
        'chatgpt-plus-china-payment-guide',
        'chatgpt-mirror-site-safety',
        'chatgpt-account-registration-guide',
        'chatgpt-mobile-use-guide',
        'chatgpt-free-vs-plus'
      ])
    },
    {
      text: 'AI 模型',
      collapsed: true,
      items: pick([
        'gemini-domestic-use-guide',
        'gemini-vs-chatgpt',
        'claude-domestic-use-guide',
        'claude-vs-chatgpt-chinese',
        'grok-domestic-use-guide',
        'deepseek-use-guide',
        'deepseek-vs-chatgpt',
        'choose-ai-model-guide'
      ])
    },
    {
      text: '多模型方案',
      collapsed: true,
      items: [
        { text: 'ZEOGPT 是什么', link: '/zeogpt/' },
        { text: '套餐选择', link: '/pricing-guide/' },
        ...pick([
          'what-is-zeogpt',
          'zeogpt-register-guide',
          'zeogpt-pricing-comparison',
          'zeogpt-supported-models'
        ])
      ]
    },
    {
      text: '站点说明',
      collapsed: true,
      items: [
        { text: '关于本站', link: '/about/' },
        { text: '免责声明', link: '/disclaimer/' },
        { text: '隐私说明', link: '/privacy/' }
      ]
    }
  ]
}

export default defineConfig({
  lang: 'zh-CN',
  title: SITE_NAME,
  titleTemplate: false,
  description: SITE_SUBTITLE,
  cleanUrls: false,
  lastUpdated: false,
  ignoreDeadLinks: false,
  markdown: {
    headers: { level: [2, 3] },
    theme: { light: 'github-light', dark: 'github-dark' }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: SITE_NAME, href: '/feed.xml' }],
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { name: 'author', content: 'ChatGPT中文指南编辑部' }],
    ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }]
  ],
  transformPageData(pageData) {
    if (pageData.relativePath === '404.md') return
    const route = routeFromRelativePath(pageData.relativePath)
    const canonical = `${SITE_ORIGIN}${route}`
    const fm = pageData.frontmatter
    const title = fm.title || pageData.title || SITE_NAME
    const description = fm.description || SITE_SUBTITLE
    const pageType = fm.article ? 'article' : 'website'
    const image = `${SITE_ORIGIN}/og-default.png`

    fm.head ??= []
    fm.head.push(
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:locale', content: 'zh_CN' }],
      ['meta', { property: 'og:site_name', content: SITE_NAME }],
      ['meta', { property: 'og:type', content: pageType }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }]
    )
    fm.head.push(['meta', {
      name: 'robots',
      content: SITE_IS_PLACEHOLDER
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }])

    const breadcrumbs: any[] = [
      { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_ORIGIN}/` }
    ]
    if (route.startsWith('/blog/')) {
      breadcrumbs.push({ '@type': 'ListItem', position: 2, name: '博客', item: `${SITE_ORIGIN}/blog/` })
      if (route !== '/blog/') breadcrumbs.push({
        '@type': 'ListItem', position: 3, name: fm.h1 || pageData.title, item: canonical
      })
    } else if (route !== '/') {
      breadcrumbs.push({ '@type': 'ListItem', position: 2, name: fm.h1 || pageData.title, item: canonical })
    }

    const graph: any[] = [
      {
        '@type': route === '/' ? 'WebSite' : route === '/blog/' ? 'CollectionPage' : fm.article ? 'Article' : 'WebPage',
        '@id': `${canonical}#primary`,
        url: canonical,
        name: fm.h1 || pageData.title,
        headline: fm.h1 || pageData.title,
        description,
        inLanguage: 'zh-CN',
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        ...(fm.article ? {
          datePublished: fm.date,
          dateModified: fm.updated || fm.date,
          author: { '@type': 'Organization', name: fm.author || 'ChatGPT中文指南编辑部' },
          publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_ORIGIN}/` },
          articleSection: fm.category,
          keywords: Array.isArray(fm.tags) ? fm.tags.join(',') : fm.tags
        } : {})
      },
      { '@type': 'BreadcrumbList', itemListElement: breadcrumbs }
    ]

    if (route === '/') {
      graph.push({
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        description: '中文 ChatGPT 与 AI 工具教程站，非 OpenAI 官方网站。'
      })
    }
    if (Array.isArray(fm.faqs) && fm.faqs.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: fm.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        }))
      })
    }
    fm.head.push(['script', { type: 'application/ld+json' },
      JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    ])
  },
  themeConfig: {
    siteTitle: 'ChatGPT中文指南',
    nav: [
      { text: '首页', link: '/' },
      { text: '教程博客', link: '/blog/' },
      { text: '免责声明', link: '/disclaimer/' },
      { text: 'ZEOGPT 注册', link: 'https://www.zeogpt.com/register?ref=Ac3KbS3F' }
    ],
    sidebar: {
      '/blog/': articleSidebar(),
      '/zeogpt/': articleSidebar(),
      '/pricing-guide/': articleSidebar(),
      '/topics/': articleSidebar()
    },
    outline: { level: [2, 3], label: '本文目录' },
    footer: {
      message: '本站不是 OpenAI 官方网站，仅提供 AI 工具教程与第三方服务介绍。ZEOGPT 为第三方服务，使用前请以实时页面为准。',
      copyright: '© 2026 ChatGPT中文指南 · 不承诺搜索引擎收录或排名'
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '栏目导航',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    externalLinkIcon: true
  }
})
