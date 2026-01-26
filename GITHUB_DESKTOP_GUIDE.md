# GitHub Desktop 推送指南

## 方法一：如果仓库已经在 GitHub Desktop 中

1. 打开 GitHub Desktop
2. 在左侧仓库列表中找到 `nlbot-vitepress` 仓库
3. 确保当前分支是 `main`
4. 点击右上角的 **"Publish repository"** 或 **"Push origin"** 按钮
5. 如果是首次推送，GitHub Desktop 会提示你选择要推送到的 GitHub 账户和仓库

## 方法二：如果仓库还没有添加到 GitHub Desktop

1. 打开 GitHub Desktop
2. 点击 **File** → **Add Local Repository**
3. 点击 **Choose...** 按钮
4. 选择路径：`/Users/a2333/tgnl-home/tgnl-admin/nlbot-vitepress`
5. 点击 **Add repository**
6. 如果提示需要发布，点击 **Publish repository**
7. 选择你的 GitHub 账户
8. 输入仓库名称：`nlbot-vitepress`
9. 选择是否公开（Public）或私有（Private）
10. 点击 **Publish repository**

## 方法三：通过命令行（如果你知道仓库地址）

如果你已经在 GitHub 上创建了 `nlbot-vitepress` 仓库，可以运行：

```bash
cd /Users/a2333/tgnl-home/tgnl-admin/nlbot-vitepress

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/nlbot-vitepress.git

# 推送代码
git push -u origin main
```

## 验证推送

推送成功后，访问你的 GitHub 仓库页面，应该能看到所有文件。

## 后续更新

以后每次更新文档后，在 GitHub Desktop 中：
1. 查看更改（Changes）
2. 填写提交信息（Summary）
3. 点击 **Commit to main**
4. 点击 **Push origin** 推送更改
