<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>
<template>
  <nav class="breadcrumbs" aria-label="面包屑导航">
    <a href="/">首页</a><span>›</span><a href="/blog/">教程博客</a><span>›</span><span aria-current="page">{{ frontmatter.h1 || frontmatter.title }}</span>
  </nav>
  <div class="article-meta" aria-label="文章信息">
    <span>更新时间：{{ frontmatter.updated }}</span>
    <span>分类：{{ frontmatter.category }}</span>
    <span>作者：{{ frontmatter.author || 'ChatGPT中文指南编辑部' }}</span>
  </div>
  <div v-if="frontmatter.tags?.length" class="tag-row" aria-label="文章标签">
    <span v-for="tag in frontmatter.tags" :key="tag">{{ tag }}</span>
  </div>
</template>
