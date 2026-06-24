# frontmatter 修复说明

本版修复了上个包里部分 Markdown 文件开头出现的格式错误。

错误形式：

```md
---title: "..."
```

正确形式：

```md
---
title: "..."
```

同时也修复了 closing frontmatter 和正文标题粘在一起的问题：

```md
---# 标题
```

改为：

```md
---

# 标题
```

这个问题会导致 VitePress / gray-matter 报错：

`gray-matter engine ... is not registered`

原因不是 npm 安装问题，而是 Markdown frontmatter 语法问题。
