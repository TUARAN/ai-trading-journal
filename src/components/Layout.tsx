import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Terminal, 
  Cpu, 
  Database, 
  Home,
  Menu,
  X,
  BarChart3,
  Activity,
  User,
  Bell,
  MessageSquare
} from 'lucide-react'
import { useState } from 'react'
import { TerminologyToggle } from './TerminologyToggle'
import { useTerminology } from '../contexts/TerminologyContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { getSystemInfo, getDatasetInfo } = useTerminology()
  const systemInfo = getSystemInfo()

  // 动态生成导航菜单
  const navigation = [
    { name: '数据分析', href: '/', icon: Home, description: '系统总览' },
    { 
      name: getDatasetInfo('datasetA').name, 
      href: '/stocks', 
      icon: Terminal, 
      description: getDatasetInfo('datasetA').description 
    },
    { 
      name: getDatasetInfo('datasetB').name, 
      href: '/futures', 
      icon: Cpu, 
      description: getDatasetInfo('datasetB').description 
    },
    { 
      name: getDatasetInfo('datasetC').name, 
      href: '/crypto', 
      icon: Database, 
      description: getDatasetInfo('datasetC').description 
    },
    { name: '处理记录', href: '/trading-record', icon: Activity, description: '数据记录' },
    { name: 'AI交互', href: '/ai-interaction', icon: MessageSquare, description: '智能对话' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center">
              <BarChart3 className="mr-2 h-6 w-6 text-blue-600" />
              {systemInfo.name}
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={`nav-${index}-${item.href}`}
                  to={item.href}
                  className={`sidebar-item ${
                    isActive ? 'active' : ''
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <div className="flex-1">
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center text-gray-600 text-sm">
              <div className="status-indicator status-online"></div>
              <span>系统运行正常</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow sidebar">
          {/* Logo区域 */}
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center">
              <BarChart3 className="mr-3 h-6 w-6 text-blue-600" />
              {systemInfo.name}
            </h1>
          </div>
          
          {/* 导航区域 */}
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navigation.map((item, index) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={`nav-${index}-${item.href}`}
                  to={item.href}
                  className={`sidebar-item ${
                    isActive ? 'active' : ''
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </nav>
          
          {/* 系统状态 */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center text-gray-600 text-sm">
              <div className="status-indicator status-online"></div>
              <span>系统运行正常</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              AI+BS · 实时监控
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation bar */}
        <div className="navbar sticky top-0 z-40">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden -m-2.5 p-2.5 text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Page title */}
            <div className="flex-1 lg:hidden">
              <h1 className="text-lg font-semibold text-gray-900">{systemInfo.name}</h1>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
              </button>
              
              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">数据分析师</div>
                  <div className="text-xs text-gray-500">admin@company.com</div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <User size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="breadcrumb mb-6">
              <Link to="/" className="breadcrumb-item">首页</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="text-gray-900">
                {navigation.find(item => item.href === location.pathname)?.name || '数据分析'}
              </span>
            </nav>
            
            {children}
          </div>
        </main>
      </div>

      {/* 术语切换按钮 */}
      <TerminologyToggle />
    </div>
  )
} 