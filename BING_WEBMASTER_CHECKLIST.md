# Bing Webmaster Tools 上线清单

## 上线后第一天

1. 验证域名所有权。
2. 提交 `https://你的域名/sitemap.xml`。
3. 手动提交首页、`/blog/`、7 个专题页和前 20 篇核心文章。
4. 用 URL Inspection 检查首页、博客页、核心文章是否可抓取。
5. 检查 robots.txt 是否允许抓取。
6. 检查 sitemap 中是否只有正式域名，不要出现 `example.com` 或测试域名。

## 更新文章后

1. 修改文章 frontmatter 的 `updated` 日期。
2. 运行 `npm run seo:generate` 重新生成 sitemap。
3. 运行 `npm run export:bing` 导出需要提交的 URL。
4. 有 IndexNow key 时运行 `npm run indexnow`。

## 观察指标

- URL Inspection 是否能看到页面。
- Sitemap 报告是否有错误。
- Site Explorer 是否能看到 `/blog/`、`/topics/` 和文章路径。
- 搜索结果标题是否按预期展示。
- 哪些页面被抓取但没有收录，优先精修这些页面。
