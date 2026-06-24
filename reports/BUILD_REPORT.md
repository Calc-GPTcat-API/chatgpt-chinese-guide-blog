# 构建测试报告

本文件将在最终构建后写入精确结果。

计划检查：

- Node 与 npm 版本；
- VitePress、Vue、Vite 锁定版本；
- `npm install` / `npm ci`；
- 静态构建；
- 关键页面与 sitemap；
- title、description、canonical、JSON-LD；
- 8 篇文章正文汉字数与 3 处 CTA；
- 旧域名与误导性固定短语；
- 站内链接；
- npm 依赖漏洞；
- 占位域名 noindex；
- 测试正式域名 index / Allow / canonical；
- 生产域名缺失时主动阻止构建。
