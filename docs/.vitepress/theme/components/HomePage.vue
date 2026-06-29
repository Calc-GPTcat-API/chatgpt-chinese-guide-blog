<script setup lang="ts">
import articles from '../../../../content-data/published-articles.json'

const registerUrl = 'https://www.zeogpt.com/register?ref=Ac3KbS3F'
const published = articles.filter((item) => item.status === 'published')
const featured = published.filter((item) => item.featured).slice(0, 6)

const steps = [
  ['核对入口', '先确认官方域名、页面主体和服务状态，避免只凭标题或 Logo 判断。'],
  ['解决问题', '按注册、登录、中文使用、Plus 支付或故障类型查找对应教程。'],
  ['比较边界', '区分 OpenAI 官方服务、镜像站、代充和第三方多模型平台。'],
  ['再做选择', '涉及注册或付款时，重新核对实时价格、额度、续费、退款和隐私规则。']
]

const checks = [
  '不复用邮箱、OpenAI 或支付账户密码',
  '付款前确认周期、额度、续费和退款规则',
  '第三方中文界面不等于 OpenAI 官方中文版',
  '敏感资料、验证码和公司文件不随意上传'
]
</script>

<template>
  <main class="premium-home">
    <section class="hero-section exact-old-hero">
      <div class="hero-copy">
        <p class="eyebrow">入口核验 / 中文教程 / 付款与安全</p>
        <h1 class="hero-title">
          <span class="title-line title-main">ChatGPT</span>
          <span class="title-line title-sub">中文指南</span>
        </h1>
        <p class="subtitle">
          面向国内用户整理 ChatGPT 中文使用、GPT 画图、Codex、ClaudeCode、API 中转和多模型平台选择。
          先用教程解决问题，再用清晰入口完成注册、体验或购买决策。
        </p>
        <div class="hero-actions">
          <a class="primary-btn" href="/blog/">按问题查教程</a>
          <a class="ghost-btn" href="/editorial-policy/">查看内容标准</a>
          <a class="secondary-btn" :href="registerUrl" target="_blank"
             rel="sponsored nofollow noopener noreferrer">查看ZEOGPT 推荐入口</a>
        </div>
        <p class="hero-disclosure">
          推荐入口属于第三方服务推广链接；进入前请核对实时套餐、模型、额度、隐私和退款规则。
        </p>
      </div>

      <div class="hero-panel conversion-card">
        <div class="status-pill">先核验，再操作</div>
        <h3>使用任何 AI 服务前检查</h3>
        <div class="flow-item"><span>1</span><p>完整域名、运营主体和官方来源是否一致</p></div>
        <div class="flow-item"><span>2</span><p>账号、付款、隐私、自动续费和退款规则是否清楚</p></div>
        <div class="flow-item"><span>3</span><p>页面上的价格、模型和额度是否为当前实时信息</p></div>
        <a class="panel-link" href="/blog/chatgpt-mirror-site-safety/">查看安全核验清单 →</a>
      </div>
    </section>

    <section class="premium-section">
      <div class="premium-section__head">
        <div><p class="eyebrow">使用路径</p><h2>从搜索问题进入，用推荐入口完成转化</h2></div>
        <p>先解决用户的真实问题，再在合适位置给出清晰、显眼但不过度承诺的推荐入口。</p>
      </div>
      <div class="path-grid">
        <a v-for="(step, index) in steps" :key="step[0]" class="path-card" href="/blog/">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ step[0] }}</h3>
          <p>{{ step[1] }}</p>
        </a>
      </div>
    </section>

    <section class="premium-section twin-panel">
      <div class="glass-panel feature-panel">
        <p class="eyebrow">第三方服务边界</p>
        <h2>需要ZEOGPT 多模型入口时，先读清楚风险与规则</h2>
        <p>第三方平台可能提供中文界面、本地付款或多模型聚合，但它有独立账号体系、服务条款、隐私政策和稳定性风险。</p>
        <ul class="check-list"><li v-for="item in checks" :key="item">{{ item }}</li></ul>
        <div class="panel-actions panel-actions--conversion">
          <a href="/blog/what-is-zeogpt/">先了解 ZEOGPT 是什么</a>
          <a href="/pricing-guide/">查看套餐核验方法</a>
          <a :href="registerUrl" target="_blank" rel="sponsored nofollow noopener noreferrer">打开第三方实时页面</a>
        </div>
      </div>

      <div class="comparison-board">
        <div><span>查教程</span><strong>按问题定位</strong><p>入口、中文、支付、访问或安全问题分别处理，不把所有需求都导向同一产品。</p></div>
        <div><span>比方案</span><strong>核对官方与第三方</strong><p>比较账号归属、数据处理、模型来源、价格和售后，而不是只看宣传标题。</p></div>
        <div><span>做决定</span><strong>以实时规则为准</strong><p>价格、模型、额度和地区支持会变化，购买前回到产品公开页面再次确认。</p></div>
      </div>
    </section>

    <section class="premium-section">
      <div class="premium-section__head">
        <div><p class="eyebrow">已核验内容</p><h2>推荐先读的核心文章</h2></div>
        <a class="section-link" href="/blog/">查看全部公开文章 →</a>
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

    <section class="final-cta">
      <div>
        <p class="eyebrow">仍不确定？</p>
        <h2>先阅读教程，再处理注册或付款</h2>
        <p>本站不会把第三方服务描述成 OpenAI 官方入口，也不承诺长期稳定、无限额度或一定退款。</p>
      </div>
      <div class="premium-actions">
        <a class="premium-btn premium-btn--primary" href="/blog/">继续看教程</a>
        <a class="premium-btn premium-btn--light" href="/disclaimer/">查看免责声明</a>
      </div>
    </section>
  </main>
</template>
