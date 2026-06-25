# Optimization Report — 2026-06-25

## 已处理的主要问题

1. 正式域名从占位值改为 `https://www.chinachatgpt.com`；
2. 首页删除“承接流量、完成使用、持续内链、反复触达”等内部运营话术；
3. 删除所有文章首屏裸推广条；
4. ZEOGPT CTA 增加“第三方服务”和推广收益披露；
5. 标签去重并限制为最多 4 个；
6. 博客从 60 篇硬编码列表改为数据驱动组件；
7. 8 篇核心文章进入公开发布状态；
8. 52 篇高模板相似稿进入复核队列并 `noindex, follow`；
9. sitemap、RSS、Bing 导出和 IndexNow 只包含已核验内容；
10. 新增编辑政策、隐私说明、免责声明、作者与核验日期；
11. 增加自动构建审计，防止错误域名、内部话术、首屏裸推广或复核稿重新进入公开索引；
12. 添加 Vercel 根目录配置和详细 Windows 上传指南。

## 为什么没有删除 52 篇文章

这些文件仍有选题价值，也可能包含可复用的研究线索。直接删除会丢失工作成果；直接公开又会放大模板重复风险。因此本版本采用“保留源稿、停止索引、逐篇复核”的中间状态。

## 公开文章

- chatgpt-official-entry-domestic-use
- chatgpt-chinese-entry-guide
- chatgpt-website-not-working
- chatgpt-plus-china-payment-guide
- chatgpt-mirror-site-safety
- what-is-zeogpt
- zeogpt-register-guide
- zeogpt-pricing-comparison

## 验收指标

```text
Published: 8
Review queue: 52
Sitemap URLs: 23
RSS articles: 8
```
