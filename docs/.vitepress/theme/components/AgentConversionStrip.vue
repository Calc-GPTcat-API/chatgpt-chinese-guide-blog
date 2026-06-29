<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
}>(), {
  title: '国内用户更省事的 ZEOGPT 入口',
  subtitle: '如果你不想反复处理官网访问、海外付款、模型切换和中文页面问题，可以先查看 ZEOGPT；注册或付款前仍应核对实时价格、额度、隐私与退款规则。',
  primaryLabel: '查看 ZEOGPT 推荐入口',
  primaryHref: 'https://www.zeogpt.com/register?ref=Ac3KbS3F'
})

function external(href: string) {
  return /^https?:\/\//.test(href)
}
</script>

<template>
  <aside class="agent-conversion-strip" aria-label="ZEOGPT 推荐入口">
    <div class="agent-conversion-strip__copy">
      <span class="agent-conversion-strip__eyebrow">推荐入口 · ZEOGPT 推广链接</span>
      <strong>{{ title }}</strong>
      <p>{{ subtitle }}</p>
      <small>本站为独立教程站；ZEOGPT 为第三方服务，并非 OpenAI、Anthropic、Google 或 xAI 官方服务。</small>
    </div>
    <div class="agent-conversion-strip__actions agent-conversion-strip__actions--single">
      <a class="agent-conversion-strip__primary"
         :href="primaryHref"
         :target="external(primaryHref) ? '_blank' : undefined"
         :rel="external(primaryHref) ? 'sponsored nofollow noopener noreferrer' : undefined">{{ primaryLabel }}</a>
    </div>
  </aside>
</template>
