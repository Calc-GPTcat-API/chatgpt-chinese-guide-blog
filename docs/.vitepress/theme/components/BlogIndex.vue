<script setup lang="ts">
import { computed, ref } from 'vue'
import articles from '../../../../content-data/published-articles.json'

const categories = ['全部文章', ...Array.from(new Set(articles.map((item) => item.category)))]
const active = ref('全部文章')
const filtered = computed(() => active.value === '全部文章' ? articles : articles.filter((item) => item.category === active.value))
const recommended = articles.filter((item) => item.featured).slice(0, 5)
const latest = [...articles].sort((a, b) => String(b.updated).localeCompare(String(a.updated))).slice(0, 6)

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
  <main class="blog-index premium-blog blog-format-locked">
    <header class="blog-hero-card blog-hero-card--compact">
      <div>
        <p class="eyebrow">教程博客</p>
        <h1>ChatGPT 与 AI 工具中文教程</h1>
        <p>
          这里是本站主要内容入口。先看 ChatGPT 官网入口、国内使用、中文版说明、Plus 支付和镜像站安全，再根据需要了解 ZEOGPT 第三方订阅。
        </p>
        <div class="blog-hero-links">
          <a href="/blog/chatgpt-official-entry-domestic-use/">ChatGPT 官网入口</a>
          <a href="/blog/chatgpt-chinese-entry-guide/">ChatGPT 中文版</a>
          <a href="/blog/chatgpt-website-not-working/">官网打不开排查</a>
          <a href="/blog/chatgpt-mirror-site-safety/">镜像站安全</a>
        </div>
      </div>
      <aside>
        <strong>阅读原则</strong>
        <span>教程优先，入口次之；先理解风险，再考虑第三方服务。</span>
      </aside>
    </header>

    <section class="blog-content-layout premium-blog-layout blog-content-first">
      <div class="blog-main">
        <section class="blog-main-panel">
          <div class="blog-panel-head">
            <div>
              <p class="eyebrow">文章列表</p>
              <h2>按问题查教程</h2>
            </div>
            <p>选择分类后，下面的文章列表会自动筛选。标题、摘要和标签都围绕真实搜索问题整理。</p>
          </div>

          <div class="filter-row premium-filter" aria-label="文章分类筛选">
            <button v-for="category in categories" :key="category" :class="{ active: active === category }" @click="active = category">{{ category }}</button>
          </div>

          <div id="article-list" class="article-list premium-list article-list--content-first">
            <article v-for="item in filtered" :key="item.slug">
              <div class="article-list__meta">
                <span>{{ item.category }}</span>
                <time :datetime="item.updated">{{ item.updated }}</time>
              </div>
              <h2><a :href="`/blog/${item.slug}/`">{{ item.title }}</a></h2>
              <p>{{ item.description }}</p>
              <div class="article-list__footer">
                <div>
                  <span v-for="tag in item.tags" :key="tag">#{{ tag }}</span>
                </div>
                <a :href="`/blog/${item.slug}/`">阅读全文 →</a>
              </div>
            </article>
          </div>
        </section>
      </div>

      <aside class="blog-sidebar premium-sidebar blog-sidebar--content-first">
        <section>
          <h2>推荐先读</h2>
          <a v-for="item in recommended" :key="item.slug" :href="`/blog/${item.slug}/`">
            {{ item.title }}
          </a>
        </section>

        <section>
          <h2>热门关键词</h2>
          <div class="sidebar-keywords">
            <a v-for="[keyword, link] in keywords" :key="keyword" :href="link">{{ keyword }}</a>
          </div>
        </section>

        <section>
          <h2>最新文章</h2>
          <a v-for="item in latest" :key="item.slug" :href="`/blog/${item.slug}/`">
            {{ item.title }}
          </a>
        </section>

        <section class="sidebar-warning">
          <h2>本站说明</h2>
          <p>本站不是 OpenAI 官方网站。ZEOGPT 为第三方服务介绍，账号、支付、隐私和稳定性请自行评估。</p>
        </section>
      </aside>
    </section>
  </main>
</template>
