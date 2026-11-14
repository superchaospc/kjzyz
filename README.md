# 跨境资源站 · kjzyz.com

面向跨境电商从业者和出海创作者的中文工具导航与图文教程，涵盖海外社媒、邮箱、AI 工具、视频剪辑、网络服务、电商平台和跨境收款。

[访问网站](https://kjzyz.com/) · [版本发布](https://github.com/superchaospc/kjzyz/releases) · [v1.3.0](https://github.com/superchaospc/kjzyz/releases/tag/v1.3.0)

## 图文指南

| 想做什么 | 从这里开始 |
| --- | --- |
| 注册邮箱 | [Gmail 注册指南](./public/gmail-guide.html) · [Outlook 注册指南](./public/outlook-guide.html) |
| 准备 iPhone 并注册 TikTok | [iPhone 设置图解](./public/tiktok-iphone-setup.html) · [TikTok 注册与登录](./public/tiktok-guide.html) |
| 开通 YouTube 或 WhatsApp | [YouTube 注册指南](./public/youtube-guide.html) · [WhatsApp 注册指南](./public/whatsapp-guide.html) |
| 配置网络客户端 | [使用教程](./public/setup.html) · [VPN 机场购买与使用](./public/airport-guide.html) |
| 准备美区 Apple ID 和小火箭 | [购买与使用指南（ReeGifts、KX Store）](./public/shadowrocket-apple-id.html) |
| 在安卓手机安装海外 App | [APKPure 下载与安装图解](./public/android-app-guide.html) |
| 订阅或充值 ChatGPT | [iPhone 礼品卡订阅与第三方充值指南](./public/chatgpt-recharge.html) |
| 给创作者主页加打赏链接 | [Ko-fi 与 Buy Me a Coffee 注册及分享指南](./public/creator-tips-guide.html) |

## v1.3.0 · 2026-11-14

- 新增安卓海外 App 安装图解、ChatGPT 充值指南，补充 YouTube 的 iPhone 下载步骤和相关准备说明。
- 新增 vidIQ 工具入口与 YouTube 研究分类，更新 Suno 等首页资源。
- 机场推荐统一为：**Bitz Net → 狗狗加速 → 白月光 → 宝可梦 → YKKCLOUD → TAG**，首页与三篇相关教程保持一致；宝可梦使用自制红白精灵球导航图标。
- Apple ID 购买入口统一为 **ReeGifts（睿礼果号）→ KX Store**；相关购买说明明确第三方关系和客服责任。
- 机场免责声明统一放在对应机场链接的**下方**。首页不显示机场或 Apple ID 说明框；ChatGPT 充值、客户端配置、Gmail、Outlook、YouTube 教程中已移除重复的 Apple ID 说明框。
- 网站发布目录调整为 `public/`，首页及教程脚本拆分到独立文件，完善响应头、旧路径处理与移动端导航。

## 项目结构

网站使用原生 HTML、CSS 和 JavaScript，无需前端构建步骤；Cloudflare Pages Functions 处理重定向、旧路径与响应头。

```text
public/
  index.html                 # 首页与教程入口
  *-guide.html               # 各类图文指南
  assets/
    js/home.js               # 资源数据、分类与首页交互
    js/guide.js              # 教程交互
    js/setup.js              # 客户端配置页交互
    css/apple-id-notice.css  # 第三方购买说明与机场声明的共用样式
    logos/                   # 本地图标
  _headers                   # 静态资源响应头
  sitemap.xml                # 站点地图
  robots.txt
functions/
  _middleware.js             # www 跳转、旧路径处理和安全响应头
  csp-report.js              # CSP 观察模式报告处理
tests/                      # 首页资源卡片测试
wrangler.toml                # Cloudflare Pages 配置
```

## 本地预览与检查

需要 Python 3 和支持 `node --test` 的 Node.js。在仓库根目录启动静态服务：

```sh
python3 -m http.server 8000 --directory public
```

打开 <http://localhost:8000/index.html>。本地预览教程时使用实际 HTML 文件名，例如 `/airport-guide.html`。该静态服务器不执行 Pages Functions。

```sh
node --test tests/*.test.mjs
node --check public/assets/js/home.js
git diff --check
```

测试目前覆盖部分首页资源卡片，不能替代浏览器检查。发布前应检查受影响页面的手机与桌面布局，以及链接地址、排序和图片显示。

如需验证 Pages Functions、重定向与响应头：

```sh
npx wrangler pages dev public
```

## 内容维护约定

- 首页资源卡片及其排序在 `public/assets/js/home.js` 中维护；首页教程入口在 `public/index.html` 中维护。
- 修改机场名单时，同步更新 `airport-guide.html`、`tiktok-guide.html` 和 `tiktok-iphone-setup.html`；保留完整注册参数和邀请码，更新数量文案，免责声明放在链接下方。
- Apple ID 购买链接保持 ReeGifts 在前、KX Store 在后。说明框按现有页面位置维护，不向首页或普通 App 下载步骤重复添加。
- 自制图标与官方标识应明确区分；不要添加未经核实的价格、节点数量、稳定性或效果保证。
- 修改首页脚本后，同步更新 `index.html` 中 `home.js` 的版本参数。修改教程后，同步更新 `sitemap.xml` 的修改日期；新增页面还需补齐首页入口和站点地图。

## 部署与发布

Cloudflare Pages 跟踪 `main` 分支，构建命令留空，发布目录为 **`public`**；不要将仓库根目录作为发布目录。

- `www.kjzyz.com` 自动跳转至主域名。
- 已下架的 AI 订阅攻略返回 HTTP 410；旧部署可能缓存的仓库配置及源码路径返回 HTTP 404。
- 响应头包含 HSTS、禁止嵌入的 CSP，以及用于观察资源兼容性的 CSP Report-Only。观察模式不等同于完整阻断策略。
- 推送后检查 Cloudflare Pages 发布状态，并核对线上页面；Git 推送成功不代表网站已更新。
- 发布版本时更新 README、执行检查，提交并推送 `main`，再创建对应的 Git 标签与 GitHub Release。Release 应描述相对上一个版本的最终变化。
