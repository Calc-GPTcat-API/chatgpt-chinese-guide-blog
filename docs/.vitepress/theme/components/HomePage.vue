<script setup lang="ts">
import articles from '../../../../content-data/published-articles.json'

const registerUrl = 'https://www.zeogpt.com/register?ref=Ac3KbS3F'
const featured = articles.filter((item) => item.featured).slice(0, 6)

const entryCards = [
  {
    index: '01',
    label: '使用教程',
    title: 'ChatGPT 中文使用指南',
    text: '先看官网入口、中文使用、访问排查和 Plus 支付等常见问题。',
    link: '/blog/',
    action: '查看教程'
  },
  {
    index: '02',
    label: '方案比较',
    title: '官方入口与第三方方案',
    text: '比较官方 ChatGPT、镜像站和多模型聚合平台的差异。',
    link: '/blog/chatgpt-mirror-vs-official/',
    action: '查看区别'
  },
  {
    index: '03',
    label: '多模型入口',
    title: 'ZEOGPT 多模型方案',
    text: '已经确认需要第三方多模型入口时，可直接核对 ZEOGPT 注册与套餐。',
    link: registerUrl,
    action: '查看套餐',
    external: true
  }
]

const steps = [
  ['确认问题', '先判断你是在找 ChatGPT 官网入口、中文使用、Plus 支付，还是镜像站和多模型方案。'],
  ['阅读教程', '通过博客文章了解官方入口、第三方服务边界、付款和账号注意事项。'],
  ['比较方案', '如果官方入口不适合，再比较 ZEOGPT 等第三方多模型方案的套餐和模型。'],
  ['开始使用', '确认需求后，再进入对应入口完成注册、付款或继续使用。']
]

const checks = [
  '不复用 OpenAI、邮箱或支付账户密码',
  '确认套餐价格、额度、自动续费和退款规则',
  '不要把第三方镜像当成 OpenAI 官方服务',
  '敏感资料、验证码和付款信息先核验再提交'
]

const keywords = [
  ['ChatGPT 官网入口', '/blog/chatgpt-official-entry-domestic-use/'],
  ['ChatGPT 中文版', '/blog/chatgpt-chinese-entry-guide/'],
  ['ChatGPT 国内使用', '/blog/chatgpt-official-entry-domestic-use/'],
  ['ChatGPT Plus 国内充值', '/blog/chatgpt-plus-china-payment-guide/'],
  ['ChatGPT 官网打不开', '/blog/chatgpt-website-not-working/'],
  ['ChatGPT 镜像站安全吗', '/blog/chatgpt-mirror-site-safety/'],
  ['ZEOGPT 注册教程', '/blog/zeogpt-register-guide/'],
  ['ZEOGPT 套餐区别', '/blog/zeogpt-pricing-comparison/']
]
</script>

<template>
  <main class="premium-home">
    <section class="hero-section exact-old-hero">
      <div class="hero-copy">
        <p class="eyebrow">ChatGPT 中文使用指南 / 官网入口 / 多模型方案</p>
        <h1 class="hero-title">
          <span class="title-line title-main">ChatGPT</span>
          <span class="title-line title-sub">中文指南</span>
        </h1>
        <p class="subtitle">
          面向中文用户整理 ChatGPT 官网入口、中文使用、访问排查、Plus 支付、镜像站选择与多模型 AI 使用方案。
          先讲清楚入口、教程、方案比较和 ZEOGPT 注册套餐，确认适合后再进入对应页面。
        </p>

        <div class="hero-actions">
          <a class="primary-btn" href="/blog/">查看教程博客</a>
          <a class="secondary-btn" :href="registerUrl" target="_blank" rel="sponsored nofollow noopener noreferrer">查看 ZEOGPT 注册与套餐</a>
          <a class="ghost-btn" href="/pricing-guide/">先看套餐区别</a>
        </div>

        <div class="trust-row">
          <span>官网入口</span>
          <span>中文使用</span>
          <span>Plus 支付</span>
          <span>多模型方案</span>
        </div>
      </div>

      <div class="hero-panel conversion-card">
        <div class="status-pill">先判断，再选择</div>
        <h3>进入 ZEOGPT 前先确认</h3>
        <div class="flow-item">
          <span>1</span>
          <p>是否只是需要 ChatGPT 中文使用教程，还是确实需要第三方多模型入口</p>
        </div>
        <div class="flow-item">
          <span>2</span>
          <p>是否已经比较官网入口、镜像站和多模型聚合平台的差异</p>
        </div>
        <div class="flow-item">
          <span>3</span>
          <p>是否已经看清套餐、模型、额度、付款和售后规则</p>
        </div>
        <a class="panel-link" :href="registerUrl" target="_blank" rel="sponsored nofollow noopener noreferrer">查看 ZEOGPT 入口 →</a>
      </div>
    </section>
<section class="premium-section">
      <div class="premium-section__head">
        <div>
          <p class="eyebrow">新手路径</p>
          <h2>新手路径</h2>
        </div>
        <p>先确认自己遇到的是入口、中文使用、Plus 支付还是镜像站问题，再根据需求选择官方入口或第三方多模型方案。</p>
      </div>
      <div class="path-grid">
        <a v-for="(step, index) in steps" :key="step[0]" class="path-card" :href="index === 3 ? '/zeogpt/' : '/blog/'">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ step[0] }}</h3>
          <p>{{ step[1] }}</p>
        </a>
      </div>
    </section>

    <section class="premium-section twin-panel">
      <div class="glass-panel feature-panel">
        <p class="eyebrow">多模型方案</p>
        <h2>想快速使用多模型 AI，可以直接核对 ZEOGPT</h2>
        <p>
          ZEOGPT 是第三方多模型服务入口，页面展示 ChatGPT 镜像以及 GPT、Claude、Gemini、Grok、DeepSeek 等模型方案。
        </p>
        <ul class="check-list">
          <li v-for="item in checks" :key="item">{{ item }}</li>
        </ul>
        <div class="panel-actions panel-actions--conversion">
          <a :href="registerUrl" target="_blank" rel="sponsored nofollow noopener noreferrer">立即查看 ZEOGPT 注册与套餐</a>
          <a href="/pricing-guide/">查看套餐怎么选</a>
          <a href="/blog/zeogpt-register-guide/">注册教程</a>
        </div>
      </div>
      <div class="comparison-board">
        <div>
          <span>搜索教程</span>
          <strong>承接流量</strong>
          <p>用 ChatGPT 官网入口、中文版、Plus 充值等文章承接 Bing 搜索用户。</p>
        </div>
        <div>
          <span>ZEOGPT 入口</span>
          <strong>完成使用</strong>
          <p>当用户需要多模型、镜像体验或更方便的使用入口时，引导查看 ZEOGPT。</p>
        </div>
        <div>
          <span>持续内链</span>
          <strong>反复触达</strong>
          <p>首页、博客页、专题页、文章页、FAQ 和入口按钮共同指向 ZEOGPT。</p>
        </div>
      </div>
    </section>

    <section class="premium-section">
      <div class="premium-section__head">
        <div>
          <p class="eyebrow">推荐教程</p>
          <h2>优先冲 Bing 的核心文章</h2>
        </div>
        <a class="section-link" href="/blog/">全部文章 →</a>
      </div>
      <div class="premium-article-grid">
        <article v-for="article in featured" :key="article.slug" class="premium-article-card">
          <div class="article-topline">
            <span>{{ article.category }}</span>
            <time :datetime="article.updated">{{ article.updated }}</time>
          </div>
          <h3><a :href="`/blog/${article.slug}/`">{{ article.title }}</a></h3>
          <p>{{ article.description }}</p>
          <a class="read-more" :href="`/blog/${article.slug}/`">阅读全文 →</a>
        </article>
      </div>
    </section>

    <section class="premium-section keyword-panel">
      <div>
        <p class="eyebrow">热门搜索</p>
        <h2>热门搜索入口</h2>
        <p>围绕用户真实搜索词建立内链，让首页、博客页和核心文章互相支撑。</p>
      </div>
      <div class="keyword-cloud premium-keywords">
        <a v-for="item in keywords" :key="item[0]" :href="item[1]">{{ item[0] }}</a>
      </div>
    </section>

    <section class="final-cta">
      <div>
        <p class="eyebrow">下一步</p>
        <h2>下一步怎么选？</h2>
        <p>如果你已经确认需要第三方多模型入口，可以直接核对 ZEOGPT 注册与套餐；如果还不确定，继续阅读教程和套餐说明。</p>
      </div>
      <div class="premium-actions">
        <a class="premium-btn premium-btn--primary" :href="registerUrl" target="_blank" rel="sponsored nofollow noopener noreferrer">立即查看 ZEOGPT 注册与套餐</a>
        <a class="premium-btn premium-btn--light" href="/blog/">继续看教程</a>
      </div>
    </section>
  </main>
</template>
