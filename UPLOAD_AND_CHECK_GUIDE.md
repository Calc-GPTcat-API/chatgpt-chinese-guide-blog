# Windows 检查、覆盖现有仓库、上传与上线验收指南

本文件是本次优化包的主操作说明。不要用整个新文件夹替换现有 Git 仓库，也不要删除现有仓库里的 `.git`。

---

## 一、准备目录

下面示例假设：

```text
下载并解压后的新版本：
C:\Users\Administrator\Downloads\chatgpt-chinese-guide-blog-optimized

你一直在使用的 Git 仓库：
C:\Users\Administrator\Desktop\chatgpt-chinese-guide-blog-git-work
```

路径不同就替换为你的真实路径。

---

## 二、先备份当前线上版本

打开 PowerShell：

```powershell
cd "C:\Users\Administrator\Desktop\chatgpt-chinese-guide-blog-git-work"

git status --short
git branch --show-current
git rev-parse --short HEAD
```

如果 `git status --short` 有未提交文件，先不要覆盖。先确认这些文件是否需要保留。

创建本地备份分支：

```powershell
git branch backup-before-site-optimization-20260625
```

确认当前分支并拉取远端：

```powershell
git switch main
git pull --ff-only origin main
```

如果 `git pull --ff-only` 报错，停止，不要强制覆盖。

---

## 三、把优化版复制进现有 Git 仓库

不要复制 `.git`，也不要复制 `node_modules`、构建产物或本地环境变量。

复制下面整段：

```powershell
$src  = "C:\Users\Administrator\Downloads\chatgpt-chinese-guide-blog-optimized"
$dest = "C:\Users\Administrator\Desktop\chatgpt-chinese-guide-blog-git-work"

robocopy $src $dest /E /COPY:DAT /R:2 /W:1 `
  /XD ".git" "node_modules" "docs\.vitepress\dist" "docs\.vitepress\cache" ".vercel" `
  /XF ".env"

if ($LASTEXITCODE -ge 8) {
    throw "文件复制失败，Robocopy 退出码：$LASTEXITCODE"
}

Write-Host "文件复制完成。Robocopy 退出码：$LASTEXITCODE" -ForegroundColor Green
```

Robocopy 退出码 `0–7` 通常不是失败；`8` 及以上才按失败处理。

复制后确认 `.git` 仍然存在：

```powershell
cd "C:\Users\Administrator\Desktop\chatgpt-chinese-guide-blog-git-work"
Test-Path .git
```

正确结果：

```text
True
```

---

## 四、安装依赖并检查内容状态

```powershell
npm install
npm run content:status
```

应看到：

```text
Published: 8
Review queue: 52
```

这 52 篇没有删除，只是暂时不进入博客列表、RSS 和 sitemap，并设置为 `noindex, follow`。

---

## 五、执行完整构建验收

```powershell
npm run verify
```

该命令依次执行：

```text
1. 正式域名检查
2. SEO 文件生成
3. VitePress 构建
4. 内容与索引状态审计
5. 站内链接检查
```

成功时应包含类似结果：

```text
[seo] generated ... sitemap.xml (23 URLs) ... feed.xml (8 articles)
站点审计通过
站内链接检查通过
```

任何一项失败都不要上传。先根据红色错误修复。

辅助检查：

```powershell
git diff --check
git status --short
git diff --stat
```

`git diff --check` 没有输出是正常结果，表示没有明显空白符错误。

---

## 六、本地预览

```powershell
npm run preview
```

浏览器打开：

```text
http://localhost:4173/
http://localhost:4173/blog/
http://localhost:4173/robots.txt
http://localhost:4173/sitemap.xml
```

重点检查：

### 首页

- 不应出现“承接流量、完成使用、持续内链、反复触达”等内部运营文字；
- ZEOGPT 必须标明“第三方服务”和推广关系；
- 先提供教程入口，再提供第三方入口；
- 手机宽度下按钮、卡片和文字不应溢出。

### 博客

- 只展示 8 篇已核验文章；
- 标签每篇最多 4 个，没有重复的 `ChatGPT ChatGPT`；
- 不展示 52 篇复核稿；
- “热门关键词”已改成用户问题式入口。

### 公开文章

打开：

```text
http://localhost:4173/blog/chatgpt-official-entry-domestic-use/
http://localhost:4173/blog/chatgpt-mirror-site-safety/
http://localhost:4173/blog/zeogpt-register-guide/
```

页面源代码中应有：

```text
index, follow
```

### 复核文章

打开：

```text
http://localhost:4173/blog/chatgpt-mobile-use-guide/
```

页面顶部应显示“内容复核中”，页面源代码中应有：

```text
noindex, follow
```

复核页仍能被编辑和内部检查，但不会进入 sitemap、RSS 或公开博客列表。

按 `Ctrl + C` 停止预览。

---

## 七、检查正式域名和 SEO 文件

本地文件：

```powershell
Select-String -Path "docs\public\robots.txt" -Pattern "www.chinachatgpt.com"
Select-String -Path "docs\public\sitemap.xml" -Pattern "example.com|这里填新站域名"
```

第二条应没有结果。

统计 sitemap URL：

```powershell
([regex]::Matches((Get-Content "docs\public\sitemap.xml" -Raw), "<url>")).Count
```

正确结果：

```text
23
```

统计 RSS 文章：

```powershell
([regex]::Matches((Get-Content "docs\public\feed.xml" -Raw), "<item>")).Count
```

正确结果：

```text
8
```

---

## 八、提交到 GitHub

先查看变更：

```powershell
git status --short
git diff --stat
```

确认没有 `.env`、`node_modules`、`.vercel` 和 `docs/.vitepress/dist`。

提交：

```powershell
git add -A
git diff --cached --check
git commit -m "Improve editorial quality, disclosure and SEO controls"
git push origin main
```

确认远端：

```powershell
git log -1 --oneline
git status
```

正确状态应包含：

```text
Your branch is up to date with 'origin/main'
nothing to commit, working tree clean
```

---

## 九、Vercel 设置

进入 Vercel 项目：

```text
Project → Settings → Build and Deployment
```

使用：

```text
Framework Preset: Other
Root Directory: 留空
Install Command: npm install
Build Command: npm run build:production
Output Directory: docs/.vitepress/dist
Node.js Version: 20
Production Branch: main
```

项目根目录已有 `vercel.json`，会固定同样的构建命令和输出目录。

可选环境变量：

```text
SITE_URL = https://www.chinachatgpt.com
```

推送后进入：

```text
Project → Deployments
```

最新生产部署应为：

```text
Ready
```

构建日志应出现：

```text
域名检查通过
sitemap.xml (23 URLs)
feed.xml (8 articles)
```

---

## 十、线上验收

部署完成后逐个打开：

```text
https://www.chinachatgpt.com/
https://www.chinachatgpt.com/blog/
https://www.chinachatgpt.com/about/
https://www.chinachatgpt.com/editorial-policy/
https://www.chinachatgpt.com/disclaimer/
https://www.chinachatgpt.com/privacy/
https://www.chinachatgpt.com/robots.txt
https://www.chinachatgpt.com/sitemap.xml
https://www.chinachatgpt.com/feed.xml
```

PowerShell 批量检查 HTTP 状态：

```powershell
$urls = @(
  "https://www.chinachatgpt.com/",
  "https://www.chinachatgpt.com/blog/",
  "https://www.chinachatgpt.com/about/",
  "https://www.chinachatgpt.com/editorial-policy/",
  "https://www.chinachatgpt.com/disclaimer/",
  "https://www.chinachatgpt.com/privacy/",
  "https://www.chinachatgpt.com/robots.txt",
  "https://www.chinachatgpt.com/sitemap.xml",
  "https://www.chinachatgpt.com/feed.xml"
)

foreach ($url in $urls) {
  try {
    $r = Invoke-WebRequest -Uri $url -Method Head -MaximumRedirection 5
    "{0}  {1}" -f $r.StatusCode, $url
  } catch {
    "ERROR  $url  $($_.Exception.Message)"
  }
}
```

目标是全部返回 `200`，或者主域名规范化时先 `301/308` 再到 `200`。

线上检查 robots：

```powershell
(Invoke-WebRequest "https://www.chinachatgpt.com/robots.txt").Content
```

应包含：

```text
User-agent: *
Allow: /
Sitemap: https://www.chinachatgpt.com/sitemap.xml
```

线上检查 sitemap 数量：

```powershell
$sitemap = (Invoke-WebRequest "https://www.chinachatgpt.com/sitemap.xml").Content
([regex]::Matches($sitemap, "<url>")).Count
```

应为：

```text
23
```

---

## 十一、搜索引擎提交

只提交已公开 URL，不要提交 52 篇复核页。

生成 Bing 提交清单：

```powershell
npm run export:bing
notepad exports\bing-submit-urls.txt
```

提交 sitemap：

```text
https://www.chinachatgpt.com/sitemap.xml
```

IndexNow 只在新页面、实质更新或删除后使用，不要重复轰炸相同 URL。

---

## 十二、以后如何发布复核稿

一篇复核稿完成原创补充和事实核验后：

1. 修改正文；
2. 在文章 frontmatter 中：
   - 删除 `noindex: true`
   - 把 `contentStatus: "review"` 改为 `contentStatus: "published"`
   - 添加或更新 `checked: "YYYY-MM-DD"`
3. 在 `content-data/published-articles.json` 中：
   - 把 `"status": "review"` 改为 `"status": "published"`
   - 标签去重并限制为最多 4 个；
4. 运行：

```powershell
npm run verify
```

5. 预览并人工检查；
6. 提交 Git；
7. 只提交这次新增或实质更新的 URL。

---

## 十三、回滚方法

如果线上出现问题，先不要删除仓库。

查看提交：

```powershell
git log --oneline -10
```

使用之前创建的备份分支恢复：

```powershell
git switch backup-before-site-optimization-20260625
```

或在 `main` 上撤销本次提交：

```powershell
git switch main
git revert <本次提交哈希>
git push origin main
```

推荐 `git revert`，不要使用 `git push --force`。
