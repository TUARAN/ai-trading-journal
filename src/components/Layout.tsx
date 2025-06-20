import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Terminal, 
  Cpu, 
  Database, 
  Home,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

interface LayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'TERMINAL', href: '/', icon: Home },
  { name: 'NODE_A', href: '/stocks', icon: Terminal },
  { name: 'NODE_B', href: '/futures', icon: Cpu },
  { name: 'NODE_C', href: '/crypto', icon: Database },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-90" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-gray-900 border-r border-green-600">
          <div className="flex h-16 items-center justify-between px-4 border-b border-green-600">
            <h1 className="text-xl font-mono font-bold text-green-400">CLI_ANALYTICS</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-green-400 hover:text-green-300"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-mono font-bold rounded border ${
                    isActive
                      ? 'bg-green-600 text-black border-green-500'
                      : 'text-green-400 hover:bg-gray-800 hover:text-green-300 border-transparent'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-black' : 'text-green-400 group-hover:text-green-300'
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-green-600">
            <div className="flex items-center text-green-400 text-sm">
              <div className="status-indicator status-online"></div>
              <span className="font-mono">SYSTEM_ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-gray-900 border-r border-green-600">
          <div className="flex h-16 items-center px-4 border-b border-green-600">
            <h1 className="text-xl font-mono font-bold text-green-400">CLI_ANALYTICS</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-mono font-bold rounded border ${
                    isActive
                      ? 'bg-green-600 text-black border-green-500'
                      : 'text-green-400 hover:bg-gray-800 hover:text-green-300 border-transparent'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-black' : 'text-green-400 group-hover:text-green-300'
                    }`}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-green-600">
            <div className="flex items-center text-green-400 text-sm">
              <div className="status-indicator status-online"></div>
              <span className="font-mono">SYSTEM_ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-green-600 bg-gray-900 px-4 shadow-sm lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-green-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 text-sm font-mono font-semibold leading-6 text-green-400">
            CLI_ANALYTICS
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 