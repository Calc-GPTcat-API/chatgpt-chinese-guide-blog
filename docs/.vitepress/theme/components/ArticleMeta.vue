<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <nav class="breadcrumbs" aria-label="面包屑导航">
    <a href="/">首页</a><span>›</span><a href="/blog/">教程博客</a><span>›</span>
    <span aria-current="page">{{ frontmatter.h1 || frontmatter.title }}</span>
  </nav>

  <div v-if="frontmatter.noindex || frontmatter.contentStatus === 'review'" class="editorial-review-notice">
    <strong>内容复核中</strong>
    <span>本页保留供编辑复核，目前不会进入站点地图、RSS 或博客公开列表。请勿仅修改日期后发布。</span>
  </div>

  <div class="article-meta" aria-label="文章信息">
    <span>首次发布：{{ frontmatter.date }}</span>
    <span>最近更新：{{ frontmatter.updated || frontmatter.date }}</span>
    <span v-if="frontmatter.checked">信息核验：{{ frontmatter.checked }}</span>
    <span>分类：{{ frontmatter.category }}</span>
    <span>编辑：<a href="/about/">ChatGPT中文指南编辑部</a></span>
  </div>

  <div v-if="frontmatter.tags?.length" class="tag-row" aria-label="文章标签">
    <span v-for="tag in frontmatter.tags.slice(0, 4)" :key="tag">{{ tag }}</span>
  </div>
</template>
