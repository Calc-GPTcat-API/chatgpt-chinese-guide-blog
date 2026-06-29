<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  text?: string
  label?: string
  href?: string
  secondaryLabel?: string
  secondaryHref?: string
  variant?: 'soft' | 'card' | 'compact' | 'conversion' | 'agent'
}>(), {
  title: '想省事使用多模型 AI？',
  text: '如果你需要中文页面、快速体验、多模型切换或国内付款方式，可以先查看第三方入口；付款前请核对实时套餐、模型、额度和退款规则。',
  label: '打开推荐入口',
  href: 'https://www.zeogpt.com/register?ref=Ac3KbS3F',
  secondaryLabel: '先看套餐核验方法',
  secondaryHref: '/pricing-guide/',
  variant: 'agent'
})
const isExternal = props.href.startsWith('http')
const secondaryExternal = props.secondaryHref.startsWith('http')
</script>

<template>
  <aside class="zeogpt-cta" :class="`zeogpt-cta--${variant}`" aria-label="第三方服务说明与入口">
    <div>
      <span class="zeogpt-cta__label">第三方服务 · 推广链接</span>
      <strong>{{ title }}</strong>
      <p>{{ text }}</p>
      <small>
        ZEOGPT 不是 OpenAI 官方服务。本站可能从符合条件的注册或购买中获得推广收益；
        这不会改变你的成交价格，也不构成稳定性、可用性或退款承诺。
      </small>
    </div>
    <div class="zeogpt-cta__actions">
      <a :href="href"
         :target="isExternal ? '_blank' : undefined"
         :rel="isExternal ? 'sponsored nofollow noopener noreferrer' : undefined">{{ label }}</a>
      <a class="zeogpt-cta__secondary"
         :href="secondaryHref"
         :target="secondaryExternal ? '_blank' : undefined"
         :rel="secondaryExternal ? 'sponsored nofollow noopener noreferrer' : undefined">{{ secondaryLabel }}</a>
    </div>
  </aside>
</template>
