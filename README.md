# ChatGPT Chinese Guide — Optimized Release

这是经过内容治理、推广披露和 SEO 发布门槛整改的 VitePress 网站版本。

## 当前状态

- 正式主域名默认值：`https://www.chinachatgpt.com`
- 文章总数：60
- 已核验并公开：8
- 复核队列：52
- sitemap：23 个 URL
- RSS：8 篇已核验文章
- 复核稿：保留源文件，但设置 `noindex, follow`，且不进入博客列表、侧栏、RSS、sitemap、Bing 导出和 IndexNow

## 先运行

```powershell
npm install
npm run content:status
npm run verify
npm run preview
```

详细 Windows 检查、覆盖现有 Git 仓库、提交、推送、Vercel 验收和回滚步骤，请看：

- `UPLOAD_AND_CHECK_GUIDE.md`
- `OPTIMIZATION_REPORT.md`
- `content-plan/30-day-execution-plan.md`

## 发布新文章

不要只复制旧文章正文。新文必须通过：

```powershell
npm run verify
```

并在 `content-data/published-articles.json` 中明确设置：

```json
"status": "published"
```

未完成核验的文章应保留：

```json
"status": "review"
```

同时在文章 frontmatter 中保留：

```yaml
noindex: true
contentStatus: "review"
```


## conversion-optimized 版说明

本包在 optimized 版基础上强化代理转化：

- 增加全站文章顶部推荐入口；
- 强化首页转化文案；
- 新增 GPT Image 2、GPT 画图、ClaudeCode、Codex、API/Token 中转等长尾文章；
- 保留非官方声明、robots/sitemap 生产域名检查；
- 增加代理日常发文与转化工作流文档。
