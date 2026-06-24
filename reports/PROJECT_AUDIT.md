# 原项目审计报告

审计日期：2026-06-22  
原始压缩包：`gpt-recharge-service-site.zip`  
线上站点：`https://chatgpt-buy.com/`

## 结论

压缩包包含完整源码、依赖锁文件、已有 `node_modules` 和 VitePress 构建产物，不是单纯的 HTML 导出包。源码首页的品牌、导航、GPTBuy 入口、页面结构和线上首页公开内容高度一致，因此可以基本确认它就是线上 `chatgpt-buy.com` 使用的这套项目或其直接工作副本。

这是基于文件与公开页面的内容匹配判断，不是服务器端哈希或部署记录鉴定。

## 原技术栈

| 项目 | 原版本 / 形式 |
| --- | --- |
| 静态站生成器 | VitePress 1.0.0-alpha.28 |
| 前端框架 | Vue 3.2.44 |
| 构建工具 | Vite 3.2.11 |
| 内容 | Markdown + Vue 自定义首页 |
| 包管理 | npm + package-lock.json |
| 构建输出 | `docs/.vitepress/dist` |

## 原关键目录

```text
docs/
├── .vitepress/
│   ├── config.ts                # 站点、导航、侧栏、全局 SEO
│   ├── theme/
│   │   ├── HomePage.vue         # 自定义首页
│   │   ├── custom.css           # 样式
│   │   └── index.ts             # 主题入口
│   └── dist/                    # 已有构建输出
├── articles/                    # 原文章目录
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── wechat-work-qr.png
├── index.md
├── buy.md
├── guide.md
├── faq.md
└── 其他充值页面
```

## 原项目关键问题

### 1. robots 与 sitemap 使用错误域名

原 `robots.txt` 和 `sitemap.xml` 指向 `https://gptchatguide.com/`，与线上 `chatgpt-buy.com` 不一致。这会向搜索引擎提供冲突的站点身份信号。

### 2. 缺少逐页 canonical

原配置没有根据页面路径生成 canonical，也缺少规范化的 `og:url`。若相同内容通过 `.html`、无后缀、不同尾斜杠或其他域名访问，容易出现重复 URL 信号。

### 3. 旧品牌残留

导航和正文大量使用 `gptbuys.com/?ref=LIJUN`，站点定位集中在 GPTBuy 充值，无法直接支持新的 ChatGPT / AI 教程博客策略。

### 4. VitePress 版本过旧

使用 alpha 版本，依赖链较旧。原项目在 Node v22.16.0、npm 10.9.2 下执行 `npm ci` 与 `npm run build` 能成功，但安装审计显示 4 个漏洞（3 个 moderate、1 个 high）。

### 5. SEO 信息粒度不足

原站有全局 title、description 和关键词，但缺少稳定的逐页 canonical、Article / FAQ / Breadcrumb 结构化数据、统一更新时间数据源和自动 sitemap。

### 6. 内容结构偏单一

原站围绕充值、卡密和 GPTBuy 展开，搜索意图覆盖窄，商业 CTA 密度偏高，不适合改造成以教程、问题解决和风险教育为主的长期内容站。

## 原构建结果

原项目在审计环境中：

- `npm ci`：成功；
- `npm run build`：成功；
- VitePress 构建耗时约 12.15 秒；
- 构建目录约 2.7 MB、133 个文件；
- npm 审计：4 个已知漏洞。

## 改造处理

- 不保留旧充值页面，避免重复内容和旧误导；
- 升级 VitePress、Vue 和 Vite；
- 建立新的英文目录 URL；
- 建立单一域名配置源；
- 增加占位域名安全 noindex；
- 增加逐页 SEO 和 JSON-LD；
- 用博客栏目、侧栏、目录、相关文章和内容矩阵扩展搜索意图；
- 将 ZEOGPT 作为明确标注的第三方服务介绍，而不是伪装成官方入口。
