---
title: 配置指南
description: 详细的系统配置说明
layout: doc
sidebar: true
aside: true
outline: [2, 3]
editLink: true
lastUpdated: true
head:
  - - meta
    - name: keywords
      content: config, env, settings, parameters
---

# 配置指南

TelegramPress 的配置主要分为三部分：环境变量配置 (`.env`)、Cloudflare 安全配置、以及机器人应用配置 (`al.py` / `config.txt`)。

## 环境变量 (.env)

`.env` 文件控制着 Docker 容器的基础设置，如数据库连接、端口映射、安全验证和隧道连接等。

### 数据库配置

```bash
# ================== 数据库配置 ==================
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=tgnl
MYSQL_USER=tgnl_user
MYSQL_PASSWORD=your_db_password

# Web 服务端口
PORT=35474

# 其他系统配置...
```

### Cloudflare Turnstile 配置

Cloudflare Turnstile 是一种隐私友好的验证码服务，用于保护您的网站免受机器人攻击。

::: details 如何获取 Cloudflare Turnstile 的 Site Key 和 Secret Key

1. **访问 Cloudflare Dashboard**
   登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)，选择您的域名或创建一个站点。

2. **进入 Turnstile 设置**
   - 在左侧菜单中选择 "Security" → "Turnstile"
   - 点击 "Add a subdomain" 或 "Add site"

3. **创建 Turnstile 站点**
   - **Site Name**: 输入您的站点名称（如：`tgnl-admin`）
   - **Domain**: 输入您的域名（如：`example.com`，不要加 `https://`）
   - **Widget Type**: 选择 `Managed`（托管式）或 `Invisible`（隐形）
   - 点击 "Create"

4. **获取密钥**
   创建成功后，您会看到：
   - **Site Key**: 用于前端代码中（如 `0x4AAAAAAA...`）
   - **Secret Key**: 用于后端验证（如 `1x00000000...`）

::: tip 提示
请妥善保管您的 Secret Key，不要在前端代码中暴露。
:::

5. **在 .env 中配置**

```bash
# ================== Cloudflare Turnstile ==================
TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=1x00000000xxxxxxxxxxxxxxxx
```

6. **在前端使用**

将 `TURNSTILE_SITE_KEY` 添加到前端配置文件中（通常是 `vite.config.ts` 或环境变量），以便在页面中加载 Turnstile 小部件。

:::

### Cloudflare Tunnel 配置

Cloudflare Tunnel（也称为 `cloudflared`）允许您将本地服务安全地暴露到互联网，无需公网 IP 或复杂的防火墙配置。

::: details 如何获取 Cloudflare Tunnel 的 Tunnel ID 和 Token

1. **安装 cloudflared**
   在您的服务器上安装 Cloudflare Tunnel 客户端：

   ```bash
   # Debian/Ubuntu
   curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb -o cloudflared.deb
   sudo dpkg -i cloudflared.deb

   # 或者使用其他方式安装，详见官方文档
   ```

2. **登录 Cloudflare 账号**

   ```bash
   cloudflared tunnel login
   ```

   这会打开一个浏览器窗口，让您授权 Cloudflare 访问您的账号。

3. **创建隧道**

   ```bash
   cloudflared tunnel create tgnl-admin-tunnel
   ```

   成功后会显示您的 **Tunnel ID**（类似于 `a1b2c3d4-5678-90ab-cdef-1234567890ab`）

4. **获取 Tunnel Token**

   创建隧道后，您需要获取 Token 来运行隧道：

   ```bash
   # 查看隧道列表
   cloudflared tunnel list

   # 运行隧道（使用 Token）
   cloudflared tunnel run --token <YOUR_TOKEN>
   ```

   或者在 Cloudflare Zero Trust Dashboard 中：
   - 进入 "Networks" → "Tunnels"
   - 点击您的隧道名称
   - 在 "Connections" 标签页中查看或创建新的 Token

5. **在 .env 中配置**

```bash
# ================== Cloudflare Tunnel ==================
CFTUN_TUNNEL_ID=a1b2c3d4-5678-90ab-cdef-1234567890ab
CFTUN_TOKEN=eyJhIjoiNjk5OTk5OTktOTk5OS05OTk5LTAwMDAtMDAwMD
```

6. **配置 DNS 路由**

   在 Cloudflare 的 DNS 设置中，添加一条 CNAME 记录指向您的隧道：

   | Type | Name | Target | Proxy status |
   | :--- | :--- | :--- | :--- |
   | CNAME | admin | `a1b2c3d4-5678-90ab-cdef-1234567890ab` | Proxied |

:::

::: warning 安全警告
- 请务必修改默认的数据库密码，防止被暴力破解。
- Tunnel Token 是敏感信息，请勿泄露或提交到公共代码仓库。
- 建议使用环境变量文件（`.env`）来管理这些敏感配置，并确保该文件被 `.gitignore` 忽略。
:::

### 完整 .env 配置示例

以下是包含所有配置项的完整示例：

```bash
# ================== 数据库配置 ==================
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=tgnl
MYSQL_USER=tgnl_user
MYSQL_PASSWORD=your_db_password

# ================== 服务端口 ==================
PORT=35474

# ================== Cloudflare Turnstile ==================
TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=1x00000000xxxxxxxxxxxxxxxx

# ================== Cloudflare Tunnel ==================
CFTUN_TUNNEL_ID=a1b2c3d4-5678-90ab-cdef-1234567890ab
CFTUN_TOKEN=eyJhIjoiNjk5OTk5OTktOTk5OS05OTk5LTAwMDAtMDAwMD
```

## 机器人配置

机器人逻辑的核心配置通常位于 `nl-2333/al.py` 头部或同级目录下的配置文件中。

### 关键参数说明

| 参数名 | 说明 | 示例 |
| :--- | :--- | :--- |
| `api_key` | 能量池 API Key | `your_api_key` |
| `privateKey` | 出款钱包私钥 | `xxxxxxxx` (注意保密) |
| `control_address` | 收款钱包地址 | `TRX_Address...` |
| `username` | API 账户名 | `HFTGID` |
| `CUSTOMER_SERVICE_ID` | 客服 TG 链接/ID | `https://t.me/service` |

### 价格配置

您可以设置不同时长的能量租赁单价：

- `hour_price`: 1小时单价
- `day_price`: 1天单价
- `three_day_price`: 3天单价
- `yucun_price`: 预存单价

## 后台配置

登录 Web 管理后台后，您还可以进行动态配置：

1. **机器人管理**：设置 Token、管理员 ID。
2. **能量池配置**：添加和管理对接的能量池节点。
3. **商品管理**：上架或下架能量租赁套餐。

::: tip 提示
修改 `.env` 或代码级配置后，通常需要重启容器才能生效：
`docker compose restart`
:::
