# 阿里云 Pages 配置说明

## 问题解决

根据构建错误信息，阿里云 Pages 找不到构建输出文件。已修复配置。

## 关键配置

### 1. 输出目录设置

在阿里云 Pages 控制台中，**输出目录**必须设置为：

```
docs/.vitepress/dist
```

**重要**：这是 VitePress 的默认输出路径，不要修改为其他路径。

### 2. 构建命令

标准构建命令：

```bash
npm install && npm run build
```

### 3. Node 版本

建议使用 Node.js 18 或更高版本。

## 配置步骤

1. 登录阿里云控制台
2. 进入 **边缘安全加速 ESA** → **边缘计算** → **函数和 Pages**
3. 找到你的 `nlbot-vitepress` 项目
4. 点击 **编辑** 或 **部署代码版本**
5. 配置以下参数：
   - **构建命令**: `npm install && npm run build`
   - **输出目录**: `docs/.vitepress/dist`
   - **Node 版本**: 18 或更高
6. 点击 **保存** 或 **重新构建**

## 验证构建

构建成功后，你应该看到：
- ✓ building client + server bundles...
- ✓ rendering pages...
- build complete in X.XXs.

不应该看到：
- ❌ Assets directory not set
- ❌ Function file not found
- ❌ Failed to copy build artifacts

## 如果仍然失败

如果配置正确后仍然失败，尝试：

1. **清除缓存并重新构建**
   - 在阿里云 Pages 控制台点击 **重新构建**

2. **检查构建日志**
   - 查看完整的构建日志
   - 确认 `npm install` 和 `npm run build` 都成功执行

3. **验证输出目录**
   - 构建成功后，检查 `docs/.vitepress/dist` 目录是否存在
   - 确认目录中有 `index.html` 和 `assets` 文件夹

4. **联系支持**
   - 如果问题持续，联系阿里云技术支持

## 当前配置状态

✅ `.vitepress/config.ts` - 已创建并配置
✅ `package.json` - 构建脚本已配置
✅ `.gitignore` - 已更新，排除构建产物
✅ 所有文档文件已就绪

现在可以推送到 GitHub，然后在阿里云 Pages 中重新构建。
