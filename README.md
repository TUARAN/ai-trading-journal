# AI+BS 数据分析系统

一个专业的大数据分析与管理平台，提供智能数据分析、实时监控和专业洞察功能。

## 功能特点

- **智能数据分析**: 基于AI算法的数据分析和处理
- **实时监控**: 实时数据流监控和系统状态管理
- **多数据集支持**: 支持结构化、时序和非结构化数据处理
- **专业仪表板**: 丰富的数据可视化和统计报告
- **响应式设计**: 现代化的用户界面，支持多设备访问

## 技术栈

- **前端框架**: React 18 + TypeScript
- **路由管理**: React Router DOM
- **样式框架**: Tailwind CSS
- **图标库**: Lucide React
- **构建工具**: Vite

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Layout.tsx      # 主布局组件
│   └── ...
├── pages/              # 页面组件
│   ├── Dashboard.tsx   # 数据分析仪表板
│   ├── StocksPage.tsx  # 数据集A管理
│   ├── FuturesPage.tsx # 数据集B管理
│   ├── CryptoPage.tsx  # 数据集C管理
│   └── TradingRecord.tsx # 处理记录管理
├── data/               # 数据文件
│   └── sampleData.ts   # 示例数据
├── types/              # TypeScript类型定义
│   └── index.ts        # 类型接口
└── main.tsx           # 应用入口
```

## 主要功能模块

### 数据分析仪表板
- 核心指标监控（数据量、处理速度、准确率、异常率）
- 实时数据流监控
- 系统状态管理
- 数据质量分析
- 处理性能统计
- 最近活动记录

### 数据集管理
- **数据集A**: 结构化数据管理
- **数据集B**: 时序数据管理  
- **数据集C**: 非结构化数据管理

### 处理记录
- 数据记录查询和过滤
- 批量操作和导出
- 详细记录查看和编辑

## 术语切换功能说明（2024-06 修复）

- 右下角“切换模式”按钮现已全局生效。
- 所有页面（如 CryptoPage、StocksPage、FuturesPage）的数据标签、Tab 名称、表头等会根据模式（分析/BS）自动刷新。
- 代码已统一为只使用 `src/contexts/TerminologyContext.tsx` 提供的 `useTerminology`，不再使用 `src/hooks/useTerminology.ts`（该文件已删除）。
- 如需自定义术语映射，请修改 `src/contexts/TerminologyContext.tsx`。

## 开发指南

### 代码规范

项目使用ESLint进行代码检查：

```bash
npm run lint
```

### 类型检查

```bash
npx tsc --noEmit
```

## 部署

### 构建生产版本

```bash
npm run build
```

构建完成后，`dist` 目录包含可部署的静态文件。

### 部署到服务器

将 `dist` 目录的内容上传到您的Web服务器即可。

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。 