# 代理转化版维护工作流

这版在保留原有安全、SEO、免责声明和内容审核机制的基础上，增加了更强的转化结构：

- 所有文章顶部会出现推荐入口条；
- 高意图文章正文中保留 CTA；
- 首页首屏文案更偏“国内用户问题 → 推荐入口”；
- 新增 GPT 画图、GPT Image 2、ClaudeCode、Codex、API 中转、Token 中转等低竞争长尾文章；
- 保留非官方声明，避免把第三方入口写成官方入口。

## 每天发文流程

1. 选择一个低竞争关键词。
2. 用 `content-plan/ARTICLE_TEMPLATE.md` 或已发布文章复制结构。
3. 标题必须包含：年份 + 关键词 + 用户问题。
4. 开头 300 字内放一次推荐入口。
5. 正文中段放一次教程型 CTA。
6. 结尾 FAQ 前放一次总结型 CTA。
7. `npm run build` 本地构建。
8. `git add -A && git commit -m "Add new SEO article" && git push origin main`。
9. 等 Vercel Ready。
10. 检查 `/robots.txt` 和 `/sitemap.xml`。

## 推广链接原则

本项目只推广 ZEOGPT。不要在文章、首页、组件或计划文档中加入其他平台入口。

ZEOGPT 主链接：

`https://www.zeogpt.com/register?ref=Ac3KbS3F`

如后续老板更换推广链接，只改以下位置：

- `site.config.mjs` 里的 `ZEOGPT_REGISTER_URL`
- `docs/.vitepress/theme/components/ZeogptCta.vue`
- `docs/.vitepress/theme/components/AgentConversionStrip.vue`

不要逐篇文章手改链接。

## 内容红线

不要写：

- 官方中文版；
- 永久无限制；
- 保证不封号；
- 绝对稳定；
- 全网最低价；
- 任何情况都退款。

推荐写法：

- 中文页面方案；
- 第三方ZEOGPT 多模型入口；
- 以实时页面为准；
- 付款前核对套餐、额度、隐私和退款规则。

## 每周复盘指标

- 哪些文章进入 sitemap；
- Bing / 百度是否抓取；
- 哪些页面有点击；
- 推荐入口点击位置；
- 哪些关键词带来咨询；
- 哪些文章转化差，需要重写 CTA。
