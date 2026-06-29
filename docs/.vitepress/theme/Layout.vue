<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HomePage from './components/HomePage.vue'
import BlogIndex from './components/BlogIndex.vue'
import ArticleMeta from './components/ArticleMeta.vue'
import AgentConversionStrip from './components/AgentConversionStrip.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <HomePage v-if="frontmatter.pageType === 'guide-home'" />
    </template>
    <template #doc-before>
      <BlogIndex v-if="frontmatter.pageType === 'blog-index'" />
      <template v-else-if="frontmatter.article">
        <ArticleMeta />
        <AgentConversionStrip v-if="frontmatter.conversion !== false" />
      </template>
    </template>
  </Layout>
</template>
