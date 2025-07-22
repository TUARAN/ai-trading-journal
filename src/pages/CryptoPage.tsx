import React, { useState, useEffect, useMemo } from 'react'
import { Plus, Search, Download } from 'lucide-react'
import { sampleTradingRecords, cryptoTrendData, cryptoAiLogs, cryptoNotes } from '../data/sampleData'
import { Link } from 'react-router-dom'
import { useTerminology } from '../contexts/TerminologyContext'
import TabSwitcher from '../components/TabSwitcher'
import TrendChart from '../components/TrendChart'
import Timeline, { TimelineItem } from '../components/Timeline'

export default function CryptoPage() {
  const [selectedCrypto, setSelectedCrypto] = useState('btc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const cryptoTrades = sampleTradingRecords.filter(trade => trade.market === 'crypto' && trade.symbol.toLowerCase().includes(selectedCrypto))
  const { getDatasetInfo, getActionInfo, getStatusInfo, getOperationInfo, mode, getCommodityInfo } = useTerminology()
  const datasetInfo = getDatasetInfo('datasetC')

  const filteredTrades = cryptoTrades.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || trade.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalValue = cryptoTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0)
  const winningTrades = cryptoTrades.filter(t => t.profitLoss && t.profitLoss > 0).length
  const losingTrades = cryptoTrades.filter(t => t.profitLoss && t.profitLoss < 0).length

  // 时间线数据
  const logs = (cryptoAiLogs as Record<string, { id: number; time: string; content: string }[]>)[selectedCrypto] || []
  const notes = (cryptoNotes as Record<string, { id: number; time: string; content: string }[]>)[selectedCrypto] || []
  const timelineRaw: TimelineItem[] = [
    ...logs.map((l: { id: number; time: string; content: string }) => ({ ...l, type: 'aiLog' as const })),
    ...notes.map((n: { id: number; time: string; content: string }) => ({ ...n, type: 'note' as const })),
  ]
  const allMonths = Array.from(new Set(timelineRaw.map(item => item.time.slice(0, 7)))).sort()
  const [selectedMonth, setSelectedMonth] = useState(allMonths[0] || '')

  // 顶部Tab配置，支持模式切换
  const CRYPTO_TABS = useMemo(() => [
    { key: 'btc', label: mode === 'display' ? getCommodityInfo('btc') || '数据标签1' : 'BTC' },
    { key: 'eth', label: mode === 'display' ? getCommodityInfo('eth') || '数据标签2' : 'ETH' },
  ], [mode, getCommodityInfo]);

  useEffect(() => {
    setSelectedCrypto(CRYPTO_TABS[0].key)
    setSelectedMonth(allMonths[0] || '')
  }, [CRYPTO_TABS]);

  // 表格 symbol 显示逻辑
  function getSymbolLabel(symbol: string) {
    if (mode === 'display') {
      if (symbol.toLowerCase().includes('btc')) return getCommodityInfo('btc') || '数据标签1';
      if (symbol.toLowerCase().includes('eth')) return getCommodityInfo('eth') || '数据标签2';
      return '数据标签';
    }
    return symbol;
  }

  return (
    <div className="space-y-6">
      {/* 顶部Tab */}
      <TabSwitcher tabs={CRYPTO_TABS} value={selectedCrypto} onChange={setSelectedCrypto} />
      {/* 行情趋势图，仅BS模式显示 */}
      {mode !== 'display' && <TrendChart data={(cryptoTrendData as Record<string, { date: string; price: number }[]>)[selectedCrypto] || []} title={`${selectedCrypto.toUpperCase()} 行情趋势`} />}
      {/* 时间线，仅BS模式显示 */}
      {mode !== 'display' && <Timeline
        items={timelineRaw}
        months={allMonths}
        month={selectedMonth}
        onMonthChange={setSelectedMonth}
      />}
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">{getOperationInfo('dataRecord')}</h3>
          <p className="text-2xl font-bold text-gray-900">{cryptoTrades.length}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">{getOperationInfo('processingResult')}</h3>
          <p className="text-2xl font-bold text-green-600">{winningTrades}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">{getOperationInfo('processingResult')}</h3>
          <p className="text-2xl font-bold text-gray-900">{totalValue.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">AI交互</h3>
          <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
        </div>
      </div>
      {/* 搜索和筛选 */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="搜索代码或名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
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
          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            {getActionInfo('exportData')}
          </button>
        </div>
      </div>
      {/* 记录列表 */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{getOperationInfo('dataRecord')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getOperationInfo('dataIdentifier')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getOperationInfo('processingType')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  价格
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getOperationInfo('dataVolume')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getOperationInfo('processingResult')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getOperationInfo('processingTime')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{getSymbolLabel(trade.symbol)}</div>
                      <div className="text-sm text-gray-500">{trade.strategy}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      trade.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trade.type === 'buy' ? getOperationInfo('dataInput') : getOperationInfo('dataOutput')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {trade.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {trade.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      trade.profitLoss && trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trade.profitLoss ? `${trade.profitLoss}` : '--'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      trade.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                      trade.status === 'open' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getStatusInfo(trade.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trade.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/record/${trade.id}`} className="text-blue-600 hover:text-blue-900">
                      {getActionInfo('viewDetails')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 