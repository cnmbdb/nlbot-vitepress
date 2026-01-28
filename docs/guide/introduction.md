---
title: 项目介绍
description: TelegramPress (TGNL Admin) 项目的详细介绍
layout: doc
sidebar: true
aside: true
outline: [2, 3]
editLink: true
lastUpdated: true
head:
  - - meta
    - name: keywords
      content: telegram, bot, tron, energy, leasing, admin
---

# 项目介绍

**TelegramPress (TGNL Admin)** 是一个基于 Telegram Bot 和 Web 管理面板的波场（Tron）能量租赁与自动发货系统。它集成了能量池管理、自动监控、用户自助购买等功能，旨在为波场生态用户提供便捷的能量获取服务。

## 🌟 核心功能

- **自动化能量租赁**：通过 Telegram Bot 实现全自动的能量租赁服务，用户自助下单，秒级到账。
- **Web 管理面板**：提供直观的 Web 界面（基于 Nuxt/Vue），方便管理员管理订单、用户、能量池和系统配置。
- **多能量池支持**：支持对接多个能量池，实现负载均衡和高可用性。
- **Docker 部署**：支持 Docker Compose 一键部署，简化环境配置和安装流程。
- **多语言与自定义**：支持多语言配置，可自定义 Bot 回复语和系统参数。

## 架构概览

项目主要由以下几个部分组成：

- **Bot 服务 (Python)**：负责处理 Telegram 消息、用户交互、订单处理和链上交互。
- **Web 服务 (Nuxt/Node.js)**：提供管理后台 API 和前端页面。
- **数据库 (MySQL/Redis)**：存储用户数据、订单记录和缓存队列。
- **Nginx**：作为反向代理服务器，处理 HTTP 请求。

## 适用场景

- **能量租赁商**：搭建自己的能量租赁平台，通过 TG 机器人自动售卖能量。
- **波场开发者**：集成能量租赁功能到自己的应用中。
- **社区运营者**：为社区成员提供低价能量租赁福利。

::: tip 提示
本项目开源版本仅供学习和研究使用，商业用途请遵守相关开源协议。
:::
