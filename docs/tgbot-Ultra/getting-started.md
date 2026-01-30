---
title: 部署指南
description: Telegram 五合一机器人部署教程
layout: doc
sidebar: true
aside: true
outline: [2, 3]
lastUpdated: true
---

# 部署指南

本指南将帮助您从零开始部署 Telegram 五合一全能机器人。

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg> 环境准备

1.  **服务器**：一台海外服务器（建议配置 2核4G 以上）。
2.  **域名**：一个已解析到服务器 IP 的域名。
3.  **宝塔面板**：建议安装宝塔面板以简化环境配置。

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> 部署流程

### 1. 基础环境安装
在宝塔面板中安装以下软件：
- Nginx 1.20+
- MySQL 5.7+
- PHP 7.4+ (需安装 Redis、fileinfo 扩展)
- Redis 6.0+

### 2. 创建网站
在宝塔中添加一个新站点，绑定您的域名，并创建一个新的 MySQL 数据库。

### 3. 上传源码
将购买的源码包上传至网站根目录，并解压。

### 4. 导入数据库
将源码包中的 `database.sql` 文件导入到刚刚创建的数据库中。

### 5. 修改配置
编辑网站根目录下的 `config/database.php`，填入您的数据库信息。

### 6. 配置伪静态
在网站设置中，选择 `ThinkPHP` 伪静态规则并保存。

### 7. 启动机器人
在终端进入网站目录，执行启动命令：

```bash
cd /www/wwwroot/您的域名
php think swoole start
```

::: tip 守护进程
建议使用 Supervisor 或 Systemd 将启动命令配置为守护进程，以保证机器人长期稳定运行。
:::
