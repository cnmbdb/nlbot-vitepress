---
title: 快速开始
description: TelegramPress 项目的安装和部署指南
layout: doc
sidebar: true
aside: true
outline: [2, 3]
editLink: true
lastUpdated: true
head:
  - - meta
    - name: keywords
      content: install, deploy, docker, setup
---

# 快速开始

本指南将帮助您快速在服务器上部署 TelegramPress 系统。我们推荐使用 Docker Compose 进行部署，这是最简单且最稳定的方式。

## 环境准备

在开始之前，请确保您的服务器满足以下要求：

- **操作系统**：任意 Linux 发行版（推荐 Ubuntu 20.04+ / Debian 10+）
- **软件依赖**：
  - [Docker](https://docs.docker.com/get-docker/)
  - [Docker Compose](https://docs.docker.com/compose/install/)
- **硬件配置**：建议 2核 4G 内存及以上
- **网络**：服务器需能访问 Telegram API 和波场节点

## 部署步骤

### 1. 准备服务器和安装宝塔 (可选)

如果您习惯使用图形化面板，可以安装宝塔面板（建议使用纯净版）。
如果熟悉命令行，可以直接在终端操作。

### 2. 获取源码

将项目源码上传至服务器，或者直接克隆仓库（假设您有 Git）：

```bash
# 创建目录
mkdir -p /www/wwwroot/tgnl-admin
cd /www/wwwroot/tgnl-admin

# 上传源码文件到此目录，并解压
# 确保解压后的目录结构包含 docker-compose.yml
```

### 3. 文件权限设置

为了确保 Docker 容器内的服务能正常读写文件，建议设置权限：

```bash
# 设置目录权限
chmod -R 777 .
```

### 4. 配置环境变量

复制示例配置文件并进行修改：

```bash
# 复制环境变量文件
cp .env.example .env

# 编辑配置文件
vim .env
```

您需要修改 `.env` 文件中的关键信息（如数据库密码、端口等）。同时，也需要检查 `nl-2333/config.txt` (如果有) 或相关 Bot 配置文件。

### 5. 启动服务

使用 Docker Compose 构建并启动所有服务：

```bash
docker compose up -d --build
```

此命令将自动下载依赖、构建镜像并启动管理后台、数据库和机器人服务。

::: info 等待启动
首次构建可能需要几分钟时间，请耐心等待。
:::

### 6. 验证部署

查看容器运行状态：

```bash
docker compose ps
```

如果所有容器状态均为 `Up`，则说明启动成功。

访问管理面板：
- 打开浏览器访问：`http://服务器IP:35474` (端口默认为 35474，或您在 `.env` 中设置的端口)

## 初始设置

1. **登录后台**
   - 默认账号：`admin`
   - 默认密码：`admin123`
   
2. **授权激活**
   - 进入后台 -> 授权激活
   - 填写激活码（如果是开源版或测试版，可能有特定的激活方式，或者直接使用）

3. **配置机器人**
   - 进入后台 -> 机器人管理
   - 填写机器人 Token（从 [@BotFather](https://t.me/BotFather) 获取）
   - 填写管理员 TG ID
   - 点击保存并重启机器人

::: tip 恭喜
至此，您的 TelegramPress 系统已成功部署并运行！
:::
