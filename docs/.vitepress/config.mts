import { defineConfig } from 'vitepress'
import articles from '../../content-data/published-articles.json'
import {
  BUILD_DATE,
  SITE_IS_PLACEHOLDER,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_SUBTITLE
} from '../../site.config.mjs'

const publishedArticles = articles.filter((item) => item.status === 'published')

function routeFromRelativePath(relativePath: string) {
  return `/${relativePath}`
    .replace(/index\.md$/, '')
    .replace(/\.md$/, '/')
    .replace(/\/+/g, '/')
}

function articleSidebar() {
  const pick = (slugs: string[]) =>
    slugs
      .map((slug) => publishedArticles.find((item) => item.slug === slug))
      .filter(Boolean)
      .map((item) => ({ text: item!.title, link: `/blog/${item!.slug}/` }))

  return [
    {
      text: '核心指南',
      collapsed: false,
      items: [
        { text: '全部已核验文章', link: '/blog/' },
        ...pick([
          'chatgpt-official-entry-domestic-use',
          'chatgpt-chinese-entry-guide',
          'chatgpt-website-not-working',
          'chatgpt-plus-china-payment-guide',
          'chatgpt-mirror-site-safety'
        ])
      ]
    },
    {
      text: 'ZEOGPT 第三方服务',
      collapsed: false,
      items: [
        { text: '第三方服务总览', link: '/zeogpt/' },
        { text: '套餐核验方法', link: '/pricing-guide/' },
        ...pick([
          'what-is-zeogpt',
          'zeogpt-register-guide',
          'zeogpt-pricing-comparison'
        ])
      ]
    },
    {
      text: '站点与编辑说明',
      collapsed: true,
      items: [
        { text: '关于本站', link: '/about/' },
        { text: '编辑与更正政策', link: '/editorial-policy/' },
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
    const isReview = fm.noindex === true || fm.contentStatus === 'review'
    const shouldIndex = !SITE_IS_PLACEHOLDER && !isReview

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
      ['meta', { name: 'twitter:image', content: image }],
      ['meta', {
        name: 'robots',
        content: shouldIndex
          ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          : 'noindex, follow'
      }]
    )

    const breadcrumbs: any[] = [
      { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_ORIGIN}/` }
    ]
    if (route.startsWith('/blog/')) {
      breadcrumbs.push({ '@type': 'ListItem', position: 2, name: '博客', item: `${SITE_ORIGIN}/blog/` })
      if (route !== '/blog/') {
        breadcrumbs.push({
          '@type': 'ListItem',
          position: 3,
          name: fm.h1 || pageData.title,
          item: canonical
        })
      }
    } else if (route !== '/') {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: fm.h1 || pageData.title,
        item: canonical
      })
    }

    const graph: any[] = [
      {
        '@type': route === '/'
          ? 'WebSite'
          : route === '/blog/'
            ? 'CollectionPage'
            : fm.article
              ? 'Article'
              : 'WebPage',
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
          author: {
            '@type': 'Organization',
            name: fm.author || 'ChatGPT中文指南编辑部',
            url: `${SITE_ORIGIN}/about/`
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: `${SITE_ORIGIN}/`
          },
          articleSection: fm.category,
          keywords: Array.isArray(fm.tags) ? fm.tags.slice(0, 4).join(',') : fm.tags
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
        description: '独立中文 ChatGPT 与 AI 工具教程站，非 OpenAI 官方网站。'
      })
    }

    if (shouldIndex && Array.isArray(fm.faqs) && fm.faqs.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: fm.faqs.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        }))
      })
    }

    fm.head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    ])
  },
  themeConfig: {
    siteTitle: 'ChatGPT中文指南',
    nav: [
      { text: '首页', link: '/' },
      { text: '教程博客', link: '/blog/' },
      { text: '内容标准', link: '/editorial-policy/' },
      {
        text: 'ZEOGPT 推荐入口（第三方）',
        link: 'https://www.zeogpt.com/register?ref=Ac3KbS3F'
      }
    ],
    sidebar: {
      '/blog/': articleSidebar(),
      '/zeogpt/': articleSidebar(),
      '/pricing-guide/': articleSidebar(),
      '/topics/': articleSidebar()
    },
    outline: { level: [2, 3], label: '本文目录' },
    footer: {
      message: '本站不是 OpenAI 官方网站。ZEOGPT 为第三方服务，相关链接可能属于推广链接；使用前请核对实时规则。',
      copyright: '© 2026 ChatGPT中文指南 · 不承诺搜索引擎收录、排名或第三方服务可用性'
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
