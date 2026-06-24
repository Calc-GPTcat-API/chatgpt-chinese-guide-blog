<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: '风险提示' })
</script>
<template>
  <aside class="risk-notice"><strong>{{ title }}</strong><div><slot /></div></aside>
</template>
