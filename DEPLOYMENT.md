# 部署说明

## 部署前必须完成

1. 在 `site.config.mjs` 填写正式 HTTPS 域名，或设置 `SITE_URL` 环境变量。
2. 在 Bing Webmaster Tools 获得站点验证文件、Meta 标签或 DNS 记录并完成验证。
3. 根据实际部署平台补充正式联系邮箱、隐私政策、统计工具说明。
4. 重新核验 ZEOGPT 的套餐、模型、付款和退款公开页面。
5. 执行生产构建与审计。

## 生产构建

```bash
npm ci
SITE_URL=https://your-domain.example npm run build:production
SITE_URL=https://your-domain.example npm run audit
SITE_URL=https://your-domain.example npm run check:links
```

静态输出位于 `docs/.vitepress/dist`。

## Vercel

- Framework Preset：Other
- Install Command：`npm ci`
- Build Command：`npm run build:production`
- Output Directory：`docs/.vitepress/dist`
- Environment Variable：`SITE_URL=https://your-domain.example`

可将 `deploy/vercel.json` 复制到项目根目录。

## Netlify

项目已提供 `deploy/netlify.toml`。将该文件复制到根目录，设置 `SITE_URL`，然后发布。

## Cloudflare Pages

- Build command：`npm run build:production`
- Build output：`docs/.vitepress/dist`
- Node version：18 或更高
- Environment variable：`SITE_URL`

## Nginx / 宝塔 / 静态服务器

1. 生产构建；
2. 上传 `docs/.vitepress/dist` 内全部文件；
3. 站点根目录指向上传目录；
4. 确保 `/blog/slug/` 可回源到相应 `index.html`；
5. 启用 HTTPS；
6. 参考 `deploy/nginx.conf.example`；
7. 访问 `/robots.txt`、`/sitemap.xml`、`/feed.xml` 验证。

## 上线后检查

```text
/
 /blog/
 /zeogpt/
 /pricing-guide/
 /faq/
 /blog/chatgpt-official-entry-domestic-use/
 /robots.txt
 /sitemap.xml
```

检查浏览器源代码中的 canonical 是否使用正式域名；检查 robots 是否为 `Allow: /`；检查 sitemap 是否包含 16 个当前首选 URL。

## 缓存建议

- 带哈希的 `/assets/`：缓存一年并标记 immutable；
- HTML、robots、sitemap：短缓存或不缓存；
- 更换域名或 title 后清理 CDN HTML 缓存；
- 不要长期缓存错误的 canonical 或 robots。

## 回滚

每次部署保留上一版本构建包。若发现错误 canonical、误导性内容、失效支付信息或严重页面异常，应立即回滚，并重新构建后再部署。
