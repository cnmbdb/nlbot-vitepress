---
title: 项目介绍
description: TGBOT-Ultra 系统功能与技术架构介绍
layout: doc
sidebar: true
aside: true
outline: [2, 3]
lastUpdated: true
---

# 项目介绍

**TGBot-Ultra** 是一套企业级的 Telegram 机器人综合管理系统。它采用前后端分离的微服务架构，专为高性能、高并发场景设计，支持多种业务模块的灵活组合。

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg> 核心业务模块

TGBot-Ultra 不仅仅是一个机器人，更是一个多功能的业务平台：

::: tip 模块化设计
系统采用模块化设计，您可以根据业务需求灵活启用或关闭特定功能。
:::

- **🔋 能量租赁 (Energy)**
    - 支持波场 (TRON) 能量自动租赁与回收。
    - 对接上游能量池，实现自动化调度。
- **💎 会员订阅 (Premium)**
    - Telegram Premium 会员代开/赠送业务。
    - 自动化订单处理与状态即时同步。
- **🛒 虚拟商城 (Shop)**
    - 支持卡密 (CD-Key) 自动发货。
    - 多种商品类型支持，库存自动管理。
- **👀 链上监控 (Monitor)**
    - 实时监控指定钱包地址的 USDT/TRX 变动。
    - 交易动账即时通知，资金流向一目了然。
- **💰 资金归集 (Collection)**
    - 多钱包资金自动归集系统。
    - 支持自定义归集策略与阈值。

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> 技术架构

系统基于现代化的微服务架构构建，确保高可用性与易维护性：

| 组件 | 技术栈 | 说明 |
| :--- | :--- | :--- |
| **Admin 服务** | **Laravel 9+** | 强大的 PHP 框架，提供稳健的后台管理 API 与界面。 |
| **Job 服务** | **Hyperf (Swoole)** | 高性能协程框架，处理高并发的 TG 消息与异步任务。 |
| **数据库** | **PostgreSQL** | 先进的关系型数据库，处理复杂业务数据。 |
| **缓存** | **Redis** | 高速缓存，用于队列、会话存储与瞬时数据。 |
| **容器化** | **Docker** | 全栈 Docker 化部署，环境一致性保障。 |

## <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="title-icon"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> 管理后台特色

- **可视化仪表盘**：直观展示订单趋势、资金流水与用户增长。
- **多机器人管理**：一套系统可同时管理多个 Bot 实例。
- **自定义键盘**：通过后台可视化配置 Bot 的菜单键盘与回复规则。
- **权限管理**：完善的角色与权限系统 (RBAC)，保障数据安全。
