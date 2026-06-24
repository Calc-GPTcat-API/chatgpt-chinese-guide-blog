<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HomePage from './components/HomePage.vue'
import BlogIndex from './components/BlogIndex.vue'
import ArticleMeta from './components/ArticleMeta.vue'

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
      <ArticleMeta v-else-if="frontmatter.article" />
    </template>
  </Layout>
</template>
