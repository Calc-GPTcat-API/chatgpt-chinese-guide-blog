<script setup lang="ts">
import { computed, ref } from 'vue'
import articles from '../../../../content-data/published-articles.json'

const published = articles.filter((item) => item.status === 'published')
const categories = ['全部文章', ...Array.from(new Set(published.map((item) => item.category)))]
const active = ref('全部文章')
const filtered = computed(() =>
  active.value === '全部文章'
    ? published
    : published.filter((item) => item.category === active.value)
)
const recommended = published.filter((item) => item.featured).slice(0, 5)
const latest = [...published].sort((a, b) => String(b.updated).localeCompare(String(a.updated))).slice(0, 6)

const questions = [
  ['怎么确认 ChatGPT 官网？', '/blog/chatgpt-official-entry-domestic-use/'],
  ['ChatGPT 中文怎么用？', '/blog/chatgpt-chinese-entry-guide/'],
  ['官网打不开怎么排查？', '/blog/chatgpt-website-not-working/'],
  ['Plus 付款前检查什么？', '/blog/chatgpt-plus-china-payment-guide/'],
  ['镜像站有哪些风险？', '/blog/chatgpt-mirror-site-safety/'],
  ['ZEOGPT 是什么？', '/blog/what-is-zeogpt/'],
  ['ZEOGPT 怎么注册？', '/blog/zeogpt-register-guide/'],
  ['ZEOGPT 套餐怎么比较？', '/blog/zeogpt-pricing-comparison/']
]
</script>

<template>
  <main class="blog-index premium-blog blog-format-locked">
    <header class="blog-hero-card blog-hero-card--compact">
      <div>
        <p class="eyebrow">教程博客</p>
        <h1>按真实问题查找 ChatGPT 与 AI 教程</h1>
        <p>
          当前公开列表只展示已完成编辑核验的核心文章。其余草稿仍保留在项目中，
          但完成原创补充、事实核验和编辑验收前不会进入索引。
        </p>
        <div class="blog-hero-links">
          <a href="/blog/chatgpt-official-entry-domestic-use/">核对官网入口</a>
          <a href="/blog/chatgpt-chinese-entry-guide/">中文使用</a>
          <a href="/blog/chatgpt-website-not-working/">访问排查</a>
          <a href="/blog/chatgpt-mirror-site-safety/">第三方风险</a>
        </div>
      </div>
      <aside>
        <strong>内容标准</strong>
        <span>先回答问题，再提供选择；区分官方与第三方；易变信息标注核验日期。</span>
      </aside>
    </header>

    <section class="blog-content-layout premium-blog-layout blog-content-first">
      <div class="blog-main">
        <section class="blog-main-panel">
          <div class="blog-panel-head">
            <div>
              <p class="eyebrow">已核验文章</p>
              <h2>选择分类浏览</h2>
            </div>
            <p>每篇最多显示 4 个去重标签，避免把后台关键词清单直接暴露给读者。</p>
          </div>

          <div class="filter-row premium-filter" aria-label="文章分类筛选">
            <button v-for="category in categories" :key="category"
                    :class="{ active: active === category }"
                    @click="active = category">{{ category }}</button>
          </div>

          <div id="article-list" class="article-list premium-list article-list--content-first">
            <article v-for="item in filtered" :key="item.slug">
              <div class="article-list__meta">
                <span>{{ item.category }}</span>
                <time :datetime="item.updated">更新 {{ item.updated }}</time>
              </div>
              <h2><a :href="`/blog/${item.slug}/`">{{ item.title }}</a></h2>
              <p>{{ item.description }}</p>
              <div class="article-list__footer">
                <div>
                  <span v-for="tag in item.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
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
          <h2>常用问题</h2>
          <div class="sidebar-keywords">
            <a v-for="[question, link] in questions" :key="question" :href="link">{{ question }}</a>
          </div>
        </section>

        <section>
          <h2>最近核验</h2>
          <a v-for="item in latest" :key="item.slug" :href="`/blog/${item.slug}/`">
            {{ item.title }}
          </a>
        </section>

        <section class="sidebar-warning">
          <h2>编辑说明</h2>
          <p>本站不是 OpenAI 官方网站。ZEOGPT 为第三方服务；推广关系、账号、支付、隐私和稳定性请独立判断。</p>
          <a href="/editorial-policy/">查看编辑与更正政策 →</a>
        </section>
      </aside>
    </section>
  </main>
</template>
