import React, { useState, useEffect, useMemo } from 'react'
import { Cpu, Plus, Search, Download } from 'lucide-react'
import { sampleTradingRecords, FUTURES_COMMODITIES, futuresTrendData, aiLogs, notes } from '../data/sampleData'
import { Link } from 'react-router-dom'
import { useTerminology } from '../contexts/TerminologyContext'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { TradingRecord } from '../types'
import { Dialog } from '@headlessui/react'
import TabSwitcher from '../components/TabSwitcher'

export default function FuturesPage() {
  // 品种Tab
  const [selectedCommodity, setSelectedCommodity] = useState<string>('soda')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const futuresTrades: TradingRecord[] = sampleTradingRecords.filter(trade => trade.market === 'futures')
  const { getDatasetInfo, getActionInfo, getStatusInfo, getOperationInfo, getCommodityInfo, getTerm, getKeywordInfo, mode } = useTerminology()
  const datasetInfo = getDatasetInfo('datasetB')

  // 只显示当前品种的期货交易
  const filteredTrades = futuresTrades.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || trade.status === filterStatus
    // 新增：symbol 包含当前品种英文（soda, glass, corn）
    const matchesCommodity = trade.symbol.toLowerCase().includes(selectedCommodity)
    return matchesSearch && matchesFilter && matchesCommodity
  })

  const totalValue = futuresTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0)
  const winningTrades = futuresTrades.filter(t => t.profitLoss && t.profitLoss > 0).length
  const losingTrades = futuresTrades.filter(t => t.profitLoss && t.profitLoss < 0).length

  // --- 新增：品种Tab、折线图、日志、笔记 ---
  type TrendItem = { date: string; price: number }
  type LogItem = { id: number; time: string; content: string }
  type NotesItem = { id: number; time: string; content: string }
  const trendData: TrendItem[] = (futuresTrendData as Record<string, TrendItem[]>)[selectedCommodity] || []
  const logs: LogItem[] = (aiLogs as Record<string, LogItem[]>)[selectedCommodity] || []
  const myNotes: NotesItem[] = (notes as Record<string, NotesItem[]>)[selectedCommodity] || []
  // Tab、图表标题等全部用 getCommodityInfo
  const selectedCommodityName = getCommodityInfo(selectedCommodity)

  // 计算所有日志和笔记的月份列表（正序，且只显示有数据的月份）
  const allMonths = Array.from(new Set([...logs, ...myNotes].map(item => item.time.slice(0, 7)))).sort()
  // 默认选中 2025-07，如果没有则选最早有数据的月份
  const [selectedMonth, setSelectedMonth] = useState(allMonths.includes('2025-07') ? '2025-07' : (allMonths[0] || ''))

  // 只显示当前月份的 timelineItems，按天分组
  const timelineItems = [...logs.map(l => ({ ...l, type: 'aiLog' })), ...myNotes.map(n => ({ ...n, type: 'note' }))]
    .filter(item => item.time.startsWith(selectedMonth))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

  // 弹窗状态
  const [modalOpen, setModalOpen] = useState(false)
  const [modalItem, setModalItem] = useState(null as null | typeof timelineItems[0])

  // 顶部Tab配置，支持模式切换
  const FUTURES_TABS = useMemo(() => [
    { key: 'soda', label: mode === 'display' ? getCommodityInfo('soda') || '数据标签1' : '纯碱' },
    { key: 'glass', label: mode === 'display' ? getCommodityInfo('glass') || '数据标签2' : '玻璃' },
    { key: 'corn', label: mode === 'display' ? getCommodityInfo('corn') || '数据标签3' : '玉米' },
  ], [mode, getCommodityInfo]);

  // 表格 symbol 显示逻辑
  function getSymbolLabel(symbol: string) {
    if (mode === 'display') {
      if (symbol.toLowerCase().includes('soda')) return getCommodityInfo('soda') || '数据标签1';
      if (symbol.toLowerCase().includes('glass')) return getCommodityInfo('glass') || '数据标签2';
      if (symbol.toLowerCase().includes('corn')) return getCommodityInfo('corn') || '数据标签3';
      return '数据标签';
    }
    return symbol;
  }

  useEffect(() => {
    setSelectedCommodity(FUTURES_TABS[0].key)
    setSelectedMonth(allMonths[0] || '')
  }, [FUTURES_TABS]);

  return (
    <div className="space-y-6">
      {/* 品种Tab */}
      <TabSwitcher tabs={FUTURES_TABS} value={selectedCommodity} onChange={setSelectedCommodity} />
      {/* 行情趋势图，仅BS模式显示 */}
      {mode !== 'display' && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold mb-2">{selectedCommodityName} {getTerm('metrics.trend') || '行情趋势'}</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trendData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {/* 时间线，仅BS模式显示 */}
      {mode !== 'display' && (
        <div className="bg-white rounded-lg shadow p-4 w-full">
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-bold mr-4">{getKeywordInfo('timeline')}</h2>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
            >
              {allMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <div className="relative w-full min-h-[200px]" style={{ minWidth: 400 }}>
              <div className="absolute left-0 right-0" style={{ top: 60, height: 2, background: '#e5e7eb', zIndex: 0 }} />
              {timelineItems.map((item, idx) => {
                const leftPercent = timelineItems.length > 1 ? (idx / (timelineItems.length - 1)) * 100 : 50
                return (
                  <React.Fragment key={item.id + item.type}>
                    <div
                      className="absolute z-10"
                      style={{
                        left: `calc(${leftPercent}% )`,
                        top: 60,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow ${item.type === 'aiLog' ? 'bg-blue-500 border-blue-700' : 'bg-amber-500 border-amber-700'}`}></div>
                    </div>
                    <div
                      className={`absolute z-20 w-44 cursor-pointer shadow-lg rounded-lg px-4 py-3 text-xs text-gray-800 bg-white border ${item.type === 'aiLog' ? 'border-blue-200' : 'border-amber-200'} hover:bg-blue-50`}
                      style={{ left: `calc(${leftPercent}% )`, top: 60 + 18 + 12, transform: 'translateX(-50%)' }}
                      onClick={() => { setModalItem(item); setModalOpen(true) }}
                    >
                      <div className="flex items-center mb-1">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${item.type === 'aiLog' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                        <span className="font-bold text-base">{item.time.slice(8, 10)}日</span>
                        <span className="ml-auto text-gray-400 text-sm">{item.type === 'aiLog' ? '日志' : '笔记'}</span>
                      </div>
                      <div className="truncate" title={item.content}>{item.content.slice(0, 32)}{item.content.length > 32 ? '…' : ''}</div>
                    </div>
                  </React.Fragment>
                )
              })}
              {timelineItems.length === 0 && <div className="text-gray-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">暂无内容</div>}
            </div>
          </div>
          <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="fixed z-50 inset-0 flex items-center justify-center">
            {modalOpen && <div className="fixed inset-0 bg-black/30 z-40" />}
            <Dialog.Panel className="relative bg-white rounded-lg shadow-lg p-6 w-80 mx-auto z-50">
              <Dialog.Title className="text-lg font-bold mb-2">{modalItem?.type === 'aiLog' ? getKeywordInfo('aiLog') : getKeywordInfo('note')}</Dialog.Title>
              <div className="text-xs text-gray-500 mb-2">{modalItem?.time}</div>
              <div className="text-gray-800 mb-4 whitespace-pre-line">{modalItem?.content}</div>
              <button className="btn-primary w-full" onClick={() => setModalOpen(false)}>关闭</button>
            </Dialog.Panel>
          </Dialog>
        </div>
      )}

      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{datasetInfo.name} - 时序数据分析</h1>
        <p className="text-gray-600">{datasetInfo.description}</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid-responsive">
        <div className="stat-card stat-card-primary">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-white/80 border border-white/50">
              <Cpu className="h-6 w-6 text-gray-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总数据量</p>
              <p className="text-2xl font-bold text-gray-900">{totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card stat-card-success">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-white/80 border border-white/50">
              <Cpu className="h-6 w-6 text-gray-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">成功处理</p>
              <p className="text-2xl font-bold text-gray-900">{winningTrades}</p>
            </div>
          </div>
        </div>
        <div className="stat-card stat-card-danger">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-white/80 border border-white/50">
              <Cpu className="h-6 w-6 text-gray-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">异常处理</p>
              <p className="text-2xl font-bold text-gray-900">{losingTrades}</p>
            </div>
          </div>
        </div>
        <div className="stat-card stat-card-warning">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-white/80 border border-white/50">
              <Cpu className="h-6 w-6 text-gray-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">处理记录</p>
              <p className="text-2xl font-bold text-gray-900">{futuresTrades.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索数据..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">全部状态</option>
              <option value="open">{getStatusInfo('open')}</option>
              <option value="closed">{getStatusInfo('closed')}</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              {getActionInfo('exportData')}
            </button>
            <button className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              {getActionInfo('addRecord')}
            </button>
          </div>
        </div>
      </div>

      {/* 数据表格 */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-card-title">处理记录</h2>
            <p className="admin-card-subtitle">{datasetInfo.name}的所有处理记录</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{getOperationInfo('dataIdentifier')}</th>
                <th>{getOperationInfo('processingType')}</th>
                <th>价格</th>
                <th>{getOperationInfo('dataVolume')}</th>
                <th>{getOperationInfo('processingResult')}</th>
                <th>状态</th>
                <th>{getOperationInfo('processingTime')}</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade) => (
                <tr key={trade.id}>
                  <td>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">{getSymbolLabel(trade.symbol)}</span>
                      <span className={`tag tag-yellow ml-2`}>
                        {datasetInfo.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`tag ${
                      trade.type === 'buy' ? 'tag-green' : 'tag-red'
                    }`}>
                      {trade.type === 'buy' ? getOperationInfo('dataInput') : getOperationInfo('dataOutput')}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-900">
                      {trade.price}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-900">{trade.quantity}</span>
                  </td>
                  <td>
                    <span className={`text-sm font-medium ${
                      trade.profitLoss && trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trade.profitLoss ? `${trade.profitLoss}` : '--'}
                    </span>
                  </td>
                  <td>
                    <span className={`tag ${
                      trade.status === 'open' ? 'tag-yellow' : 'tag-green'
                    }`}>
                      {getStatusInfo(trade.status)}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm text-gray-500">{trade.date}</span>
                  </td>
                  <td>
                    <Link to={`/record/${trade.id}`} className="text-blue-600 hover:text-blue-900">
                      {getActionInfo('viewDetails')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTrades.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">暂无数据记录</p>
          </div>
        )}
      </div>
    </div>
  )
} 