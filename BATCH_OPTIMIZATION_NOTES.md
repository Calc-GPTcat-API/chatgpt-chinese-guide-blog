# 批量优化版说明

这版按 2-10 项做了批量改造：

2. `/blog/` 增加“热门搜索专题”。
3. 新增 7 个 `/topics/` 专题页。
4. 新增 IndexNow 提交脚本：`npm run indexnow`。
5. 新增 sitemap/feed/robots 生成脚本：`npm run seo:generate`，会读取文章 `updated` 作为 lastmod。
6. 首页主 CTA 继续优先指向教程博客，ZEOGPT 作为次级入口。
7. 前 20 篇标题继续增强为搜索型标题，但避开高风险承诺词。
8. 批量给文章加入“快速判断表”和“操作前检查清单”，后续可用写作系统精修正文。
9. 新增站外摘要导出：`npm run export:promotion`。
10. 新增 Bing Webmaster 执行清单和 URL 导出：`npm run export:bing`。

## 你的写作系统如何批量导入

1. 复制 `content-data/article-rewrites.example.json` 为 `content-data/article-rewrites.json`。
2. 每篇填 `slug/title/description/updated/body`。
3. 运行：
   `npm run import:rewrites`
4. 再运行：
   `npm run seo:generate`
5. 上线后运行：
   `npm run export:bing`

## 本版自查

- 文章数：60
- 专题页：7
- sitemap URL 数：75
- 批量插入检查清单文章数：60
