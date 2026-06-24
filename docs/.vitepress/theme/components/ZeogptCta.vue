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
  title: '需要第三方多模型入口？',
  text: '如果你的目标是 ChatGPT 镜像或多模型 AI 统一入口，ZEOGPT 可作为第三方方案对比；进入后先核对实时套餐、模型和付款规则。',
  label: '查看 ZEOGPT 注册与套餐',
  href: 'https://www.zeogpt.com/register?ref=Ac3KbS3F',
  secondaryLabel: '先看套餐区别',
  secondaryHref: '/pricing-guide/',
  variant: 'agent'
})
const isExternal = props.href.startsWith('http')
const secondaryExternal = props.secondaryHref.startsWith('http')
</script>

<template>
  <aside class="zeogpt-cta" :class="`zeogpt-cta--${variant}`" aria-label="ZEOGPT 推荐入口">
    <div>
      <strong>{{ title }}</strong>
      <p>{{ text }}</p>
      <small>ZEOGPT 为第三方服务，价格、额度和规则以实时页面为准。</small>
    </div>
    <div class="zeogpt-cta__actions">
      <a :href="href" :target="isExternal ? '_blank' : undefined" :rel="isExternal ? 'sponsored nofollow noopener noreferrer' : undefined">{{ label }}</a>
      <a class="zeogpt-cta__secondary" :href="secondaryHref" :target="secondaryExternal ? '_blank' : undefined" :rel="secondaryExternal ? 'sponsored nofollow noopener noreferrer' : undefined">{{ secondaryLabel }}</a>
    </div>
  </aside>
</template>
