# Conversion Pro 修改说明

本版目标：让搜索用户进入教程站后，更自然、更高频地点击 ZEOGPT。

## 已去掉

1. 首页大号“重要说明”横条。
2. 首页三枚胶囊标签：非 OpenAI 官方 / 教程与核验为主 / 第三方服务需自评风险。
3. 入口导航里的“先分清，再点击”。
4. 全站顶部小免责声明和文章右侧小免责声明。

## 已增强

1. 首页首屏主按钮改为“打开 ZEOGPT”。
2. 顶部导航右侧改为“打开 ZEOGPT”。
3. 首页入口导航第一项改为 ZEOGPT 多模型入口。
4. 全站新增右下角悬浮 ZEOGPT 快速入口。
5. 博客首页、专题页、文章页、FAQ、套餐页、ZEOGPT 页都加入靠前的转化 CTA。
6. ZeogptCta 组件文案从“风险提示型”改成“使用入口型”。
7. 后续用 `npm run import:rewrites` 批量导入精修文章时，如果正文没有 ZEOGPT CTA，会自动补一个。

## 保留

1. 免责声明、隐私说明、关于页仍然存在。
2. 外链使用 `sponsored nofollow noopener noreferrer`。
3. 套餐、额度、规则仍提示以 ZEOGPT 实时页面为准。
4. 不带 node_modules 和 package-lock.json。
