# 🌐 跨境资源站

[![Website](https://img.shields.io/badge/Website-kjzyz.com-0066cc?style=flat-square)](https://kjzyz.com/)
[![GitHub](https://img.shields.io/badge/GitHub-superchaospc%2Fkjzyz-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/superchaospc/kjzyz)
[![Deploy](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Static HTML](https://img.shields.io/badge/Static-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](./index.html)

`kjzyz.com` 是一个面向跨境业务和海外工具使用场景的静态导航页，集中整理跨境社媒、邮箱、跨境收款、搜索引擎、AI 工具、科学上网客户端、机场、VPS、住宅 IP、指纹浏览器和 Apple ID 相关资源。

## ✨ 项目内容

- 📱 跨境社媒：TikTok、Instagram、Facebook、WhatsApp、YouTube、LinkedIn、X
- 📮 跨境邮箱：Gmail、Outlook
- 💳 跨境收款：派安盈、西联支付、PayPal、Stripe
- 🔎 搜索引擎&浏览器：Google、Chrome
- 🤖 AI 工具：ChatGPT、Gemini、Claude、即梦、HeyGen、ElevenLabs
- 🧰 科学上网工具：NekoBox、v2rayNG、v2rayN、Clash Verge、Clash Meta、FlClash、Clash Party
- 🧭 跨境基础服务：机场推荐、VPS 自建专线、住宅 IP 节点、指纹浏览器、Apple ID

## 📁 文件结构

```text
.
├── assets/       # 本地工具 Logo
├── index.html   # 主站页面
├── setup.html   # 备用/说明页面
├── robots.txt
├── sitemap.xml
├── _headers     # Cloudflare Pages 响应头
├── wrangler.toml
└── README.md
```

## 🚀 本地预览

这是一个纯静态网页，不需要安装依赖。

直接用浏览器打开：

```text
index.html
```

也可以使用任意静态服务器预览。

## ☁️ 部署

当前项目通过 GitHub 仓库连接 Cloudflare Pages 自动部署：

1. 修改 `index.html`
2. 提交并推送到 GitHub `main` 分支
3. Cloudflare Pages 自动触发构建并更新线上网站

Cloudflare Pages 构建设置：

```text
Framework preset: None
Build command: 留空
Build output directory: /
Root directory: /
```

## ⚠️ 说明

本站内容仅供学习研究、跨境电商运营、海外业务推广等合法用途参考。请遵守所在地法律法规，不得用于任何违法活动。
