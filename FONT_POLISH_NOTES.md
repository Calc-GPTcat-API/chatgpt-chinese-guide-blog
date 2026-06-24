# Font polish notes

本版本没有重做页面结构，保留原来的首页格式、卡片布局、按钮风格和绿色科技视觉，只做了字体与层级优化：

- 统一中文字体栈，优先使用系统中文字体。
- 降低超粗字重，减少“又粗又跳”的感觉。
- 缩小首页主标题、栏目标题和底部 CTA 的最大字号。
- 把 Start Here / Search Topics / Next Step 等英文小标签改成中文，避免中英文风格割裂。
- 保留 npm 兼容处理：不携带 node_modules 与 package-lock.json，默认使用国内 npm 镜像。
