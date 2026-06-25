# Deployment

本项目部署目标为 Vercel，配置已写入根目录 `vercel.json`。

## Vercel 配置

```text
Framework Preset: Other
Install Command: npm install
Build Command: npm run build:production
Output Directory: docs/.vitepress/dist
Root Directory: 留空
Node.js: 20
Production Branch: main
```

可选环境变量：

```text
SITE_URL=https://www.chinachatgpt.com
```

即使不设置，项目也默认使用该正式主域名。

## 发布前

```powershell
npm install
npm run content:status
npm run verify
```

## 发布后

检查：

```text
https://www.chinachatgpt.com/
https://www.chinachatgpt.com/blog/
https://www.chinachatgpt.com/robots.txt
https://www.chinachatgpt.com/sitemap.xml
https://www.chinachatgpt.com/feed.xml
```

完整步骤见 `UPLOAD_AND_CHECK_GUIDE.md`。
