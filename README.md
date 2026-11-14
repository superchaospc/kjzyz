# 跨境资源站 · kjzyz.com

面向跨境电商从业者和出海创作者的中文工具导航与图文教程。首页按用途整理 AI 工具、海外社媒、邮箱、视频剪辑、网络服务、电商平台和跨境收款工具。[访问跨境资源站](https://kjzyz.com/)

## 图文指南

| 想做什么 | 从这里开始 |
| --- | --- |
| 注册邮箱 | [Gmail 注册指南](./public/gmail-guide.html) · [Outlook 注册指南](./public/outlook-guide.html) |
| 准备 iPhone 并注册 TikTok | [iPhone 设置图解](./public/tiktok-iphone-setup.html) · [TikTok 注册与登录](./public/tiktok-guide.html) |
| 开通 YouTube 或 WhatsApp | [YouTube 注册指南](./public/youtube-guide.html) · [WhatsApp 注册指南](./public/whatsapp-guide.html) |
| 配置网络客户端 | [使用教程](./public/setup.html) · [VPN 机场购买与使用](./public/airport-guide.html) · [美区 Apple ID 与 Shadowrocket（ReeGifts、KX Store）](./public/shadowrocket-apple-id.html) |
| 给 TikTok、Instagram、YouTube 主页加打赏链接 | [Ko-fi 与 Buy Me a Coffee 注册及分享指南](./public/creator-tips-guide.html) |

## 本地预览与测试

在仓库根目录运行静态服务器，然后在浏览器打开 <http://localhost:8000/index.html>。预览单篇教程时使用上表中的 HTML 文件名。

```sh
python3 -m http.server 8000 --directory public
```

使用 Node.js 运行首页资源卡片测试。

```sh
node --test tests/*.test.mjs
```

## 内容维护与部署

- 首页是 `public/index.html`，分类和资源卡片在 `public/assets/js/home.js`。各篇教程和站点地图位于 `public/`，截图与标识存放在 `public/assets/`。
- 新增公开教程时，在首页添加入口，并更新 `sitemap.xml`。修改已有教程时，同步更新站点地图中的修改日期。
- Cloudflare Pages 使用 `main` 分支，构建命令留空，仅发布 `public/` 目录。`wrangler.toml` 中的 `pages_build_output_dir` 为 `public`。
- `public/_headers` 定义响应头。`functions/_middleware.js` 将 www 域名重定向至主域名，并为已下架的 AI 订阅攻略返回 HTTP 410。要在本地验证这些 Pages 行为，可在根目录运行 `npx wrangler pages dev public`。
