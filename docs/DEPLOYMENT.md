# 部署指南

本指南将帮助您部署 AI Trading Journal 项目到不同的平台。

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 3. 构建生产版本

```bash
npm run build
```

构建文件将生成在 `dist` 目录中。

## 部署到 Vercel

### 1. 安装 Vercel CLI

```bash
npm i -g vercel
```

### 2. 登录 Vercel

```bash
vercel login
```

### 3. 部署

```bash
vercel
```

或者直接推送到 GitHub，Vercel 会自动部署。

### 4. 环境变量

在 Vercel 控制台中设置必要的环境变量：

- `VITE_API_URL` - API 地址
- `VITE_APP_TITLE` - 应用标题

## 部署到 Netlify

### 1. 构建项目

```bash
npm run build
```

### 2. 上传到 Netlify

将 `dist` 目录拖拽到 Netlify 的部署区域。

### 3. 配置构建设置

- 构建命令：`npm run build`
- 发布目录：`dist`

### 4. 环境变量

在 Netlify 控制台中设置环境变量。

## 部署到 GitHub Pages

### 1. 安装 gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. 添加部署脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. 构建并部署

```bash
npm run build
npm run deploy
```

### 4. 配置 GitHub Pages

在仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支。

## 部署到 Docker

### 1. 创建 Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. 构建镜像

```bash
docker build -t ai-trading-journal .
```

### 3. 运行容器

```bash
docker run -p 80:80 ai-trading-journal
```

## 环境变量配置

创建 `.env` 文件：

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=AI Trading Journal
VITE_APP_VERSION=1.0.0
```

## 性能优化

### 1. 代码分割

使用 React.lazy 进行代码分割：

```tsx
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
```

### 2. 图片优化

- 使用 WebP 格式
- 实现懒加载
- 压缩图片

### 3. 缓存策略

配置适当的缓存头：

```
Cache-Control: public, max-age=31536000
```

## 监控和分析

### 1. 错误监控

集成 Sentry 或其他错误监控服务。

### 2. 性能监控

使用 Web Vitals 监控性能指标。

### 3. 用户分析

集成 Google Analytics 或其他分析工具。

## 安全考虑

### 1. HTTPS

确保所有部署都使用 HTTPS。

### 2. 内容安全策略

设置适当的 CSP 头。

### 3. 环境变量

不要在客户端代码中暴露敏感信息。

## 故障排除

### 常见问题

1. **构建失败**
   - 检查依赖版本
   - 清理 node_modules 并重新安装

2. **路由问题**
   - 配置正确的重写规则
   - 检查 SPA 路由配置

3. **环境变量未生效**
   - 确保变量名以 `VITE_` 开头
   - 重新构建项目

### 获取帮助

如果遇到问题，请：

1. 检查项目文档
2. 搜索 GitHub Issues
3. 创建新的 Issue 描述问题

## 更新部署

### 自动部署

配置 CI/CD 管道实现自动部署：

1. GitHub Actions
2. GitLab CI
3. Jenkins

### 手动更新

```bash
git pull origin main
npm install
npm run build
# 重新部署到目标平台
``` 