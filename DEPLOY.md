# 部署到 GitHub 和阿里云 Pages

## 步骤 1: 创建 GitHub 仓库

1. 在 GitHub 上创建新仓库，仓库名：`nlbot-vitepress`
2. 不要初始化 README、.gitignore 或 license（我们已经有了）

## 步骤 2: 连接本地仓库到 GitHub

```bash
cd /Users/a2333/tgnl-home/tgnl-admin/nlbot-vitepress

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/nlbot-vitepress.git

# 或者使用 SSH（推荐）
git remote add origin git@github.com:YOUR_USERNAME/nlbot-vitepress.git

# 推送代码到 GitHub
git push -u origin main
```

## 步骤 3: 配置阿里云 Pages

1. 登录阿里云控制台
2. 进入 Pages 服务
3. 创建新站点
4. 配置如下：
   - **源仓库**: 选择你的 GitHub 仓库 `nlbot-vitepress`
   - **构建命令**: `npm install && npm run build`
   - **输出目录**: `.vitepress/dist`
   - **Node 版本**: 18 或更高
5. 保存并部署

## 步骤 4: 更新配置（如果需要）

如果部署后路径有问题，可以修改 `.vitepress/config.ts` 中的 `base` 配置：

```typescript
export default defineConfig({
  base: '/',  // 如果部署在子路径，改为 '/your-path/'
  // ...
})
```

## 后续更新

每次更新文档后：

```bash
git add .
git commit -m "更新文档"
git push origin main
```

阿里云 Pages 会自动检测更新并重新部署。
