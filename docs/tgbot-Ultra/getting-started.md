---
title: 部署指南
description: TGBot-Ultra 系统部署与环境配置
layout: doc
sidebar: true
aside: true
outline: [2, 3]
lastUpdated: true
---

# 部署指南

本指南将帮助您快速在服务器上部署 **TGBot-Ultra** 系统。

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg> 环境准备

在开始之前，请确保服务器满足以下要求：
1.  **操作系统**：Linux (推荐 Ubuntu 20.04+ / Debian 10+)
2.  **基础软件**：已安装宝塔面板（可选，推荐新手使用）或熟悉命令行操作。
3.  **容器环境**：已安装 Docker 和 Docker Compose。

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> 部署步骤

### 1. 获取源码

请前往 GitHub Releases 页面下载最新版本的源码包：

<a href="https://github.com/cnmbdb/tgbot-Ultra-v1/releases" target="_blank" class="vp-button-green">
  <svg height="20" viewBox="0 0 16 16" version="1.1" width="20" aria-hidden="true" style="margin-right: 8px; fill: currentColor;"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
  下载源码
</a>

下载后将文件上传至服务器目录（例如 `/www/wwwroot/tgbot-ultra`），并解压。

::: warning 权限设置
请务必将解压后的文件目录权限设置为 **777**，以确保容器能正常读写数据。
```bash
chmod -R 777 /www/wwwroot/tgbot-ultra
```
:::

### 2. 配置环境变量

系统包含两个核心服务：**Admin**（后台管理）和 **Job**（任务处理），它们共享相同的数据库和缓存层，但各自拥有独立的运行环境。

#### <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg> 配置文件说明

项目根目录提供 `.env.example` 作为配置模板，服务启动时会自动加载环境变量。

::: tip 推荐做法
首次配置时，建议从 `.env.example` 复制并重命名为 `.env`：

```bash
# 在项目根目录执行
cp .env.example .env
```

:::

#### <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> 关键配置项说明

| 配置项 | 说明 | 示例值 |
| :--- | :--- | :--- |
| `APP_NAME` | 应用名称 | `TGBot Ultra` |
| `APP_URL` | 站点访问地址（需与实际域名一致） | `https://your-domain.com` |
| `DB_HOST` | 数据库主机（Docker 内部网络） | `postgres` |
| `DB_DATABASE` | 数据库名称 | `tgbot` |
| `DB_USERNAME` | 数据库用户名 | `root` |
| `DB_PASSWORD` | 数据库密码 | `your_password` |
| `REDIS_HOST` | Redis 主机（Docker 内部网络） | `redis` |
| `TIMEZONE` | 系统时区 | `Asia/Shanghai` |
| `ADMIN_PORT` | 后台管理端口（宿主机映射） | `8080` |
| `JOB_PORT` | Job 服务端口（宿主机映射） | `9501` |

### 3. 启动服务

完成配置后，在项目根目录（包含 `docker-compose.yml` 的目录）执行以下命令启动所有服务：

```bash
# 构建并启动所有容器
docker compose up -d --build

# 查看容器运行状态
docker compose ps
```

#### 服务组件说明

| 容器名称 | 服务说明 | 默认端口 |
| :--- | :--- | :--- |
| **admin** | Laravel 后台管理系统 | 8080 |
| **job** | Hyperf 异步任务处理服务 | 9501 |
| **postgres** | PostgreSQL 数据库 | 5432 |
| **redis** | Redis 缓存与消息队列 | 6379 |
| **cloudflared** | Cloudflare Tunnel 隧道服务 | - |

---

### 4. 访问系统

容器启动成功后，您可以通过以下地址访问系统：

<div class="access-cards">
  <div class="access-card">
    <div class="card-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
    </div>
    <div class="card-content">
      <h4>管理后台</h4>
      <code>http://服务器IP:8080/admin/login</code>
    </div>
  </div>
  <div class="access-card">
    <div class="card-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </div>
    <div class="card-content">
      <h4>Bot 接口</h4>
      <code>http://服务器IP:9501</code>
    </div>
  </div>
</div>

::: info 默认账号
首次访问管理后台时，请使用以下凭据登录（建议首次登录后立即修改密码）：
- **账号**: `trxadmin` 或 `admin`
- **密码**: `password`（或 `123456`，具体以系统提示为准）
:::

::: warning 安全提醒
- 首次部署后请立即修改默认密码
- 建议通过 Cloudflare Tunnel 或 Nginx 反向代理访问，避免直接暴露端口
- 记得在服务器防火墙/安全组中放行必要端口（8080, 9501, 5432, 6379）
:::

<style scoped>
.access-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.access-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
}

.access-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.card-content h4 {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-content code {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
