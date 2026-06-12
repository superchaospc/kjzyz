# 搬瓦工 VPS 卡片实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 kjzyz.com 首页 VPS 分组新增使用官方 Logo 和指定推广链接的搬瓦工卡片。

**Architecture:** 沿用 `index.html` 中 `PRODUCTS` 数据驱动的卡片渲染方式，只增加一个 VPS 数据对象。官方横向 Logo 保存到现有 `assets/logos/` 目录，并使用已有 `logoWide` 展示规则。

**Tech Stack:** 静态 HTML、CSS、原生 JavaScript、PNG 资源、Node.js 断言、浏览器响应式验证。

---

### Task 1: 增加自动化内容断言

**Files:**
- Test: `index.html`
- Test: `assets/logos/bandwagonhost.png`

- [x] **Step 1: 运行缺失功能断言**

```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
if (!html.includes(\"id: 'bandwagonhost'\")) throw new Error('missing bandwagonhost product');
if (!html.includes(\"affiliateUrl: 'https://bandwagonhost.com/aff.php?aff=70948'\")) throw new Error('missing affiliate URL');
if (!html.includes(\"logoUrl: 'assets/logos/bandwagonhost.png'\")) throw new Error('missing logo reference');
if (!fs.existsSync('assets/logos/bandwagonhost.png')) throw new Error('missing logo file');
"
```

Expected: FAIL with `missing bandwagonhost product`.

### Task 2: 添加官方 Logo 和产品数据

**Files:**
- Create: `assets/logos/bandwagonhost.png`
- Modify: `index.html:910-975`

- [x] **Step 1: 保存官网 Logo**

从 `https://bandwagonhost.com/templates/organicbandwagon/images/logo4.png` 下载官网当前使用的图片，保存为 `assets/logos/bandwagonhost.png`。

- [x] **Step 2: 增加产品对象**

在 VPS 数据项末尾加入：

```js
{
  id: 'bandwagonhost', symbol: 'BW', name: '搬瓦工', slogan: '老牌 VPS',
  description: '老牌 VPS 服务商，适合搭建海外网络节点',
  color: '#d71920', scenes: ['vps'],
  logoUrl: 'assets/logos/bandwagonhost.png',
  logoWide: true,
  recommended: false, badge: null,
  affiliateUrl: 'https://bandwagonhost.com/aff.php?aff=70948'
},
```

同时将 VPS 分组注释数量更新为 8。

- [x] **Step 3: 重跑自动化断言**

运行 Task 1 的命令。

Expected: PASS，退出码为 0。

### Task 3: 页面验证与发布

**Files:**
- Verify: `index.html`
- Verify: `assets/logos/bandwagonhost.png`

- [x] **Step 1: 验证静态文件与差异**

```bash
file assets/logos/bandwagonhost.png
git diff --check -- index.html assets/logos/bandwagonhost.png
git diff -- index.html
```

Expected: Logo 为有效 PNG，`git diff --check` 无输出。

- [x] **Step 2: 浏览器验证**

启动本地静态服务器，在桌面和 390px 手机宽度下确认卡片内容、Logo、推广链接和布局，并检查控制台没有新增错误。

- [ ] **Step 3: 提交并推送**

只暂存本计划、`index.html` 和 `assets/logos/bandwagonhost.png`，创建功能提交，然后推送当前分支到 `origin`。
