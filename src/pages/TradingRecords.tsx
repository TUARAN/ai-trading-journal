import { useState } from 'react'
import { Plus, Filter, Download, Eye, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { Trade } from '../types'
import { sampleTrades } from '../data/sampleData'

export default function TradingRecords() {
  const [trades] = useState<Trade[]>(sampleTrades)
  const [filterMarket, setFilterMarket] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredTrades = trades.filter(trade => {
    if (filterMarket !== 'all' && trade.market !== filterMarket) return false
    if (filterStatus !== 'all' && trade.status !== filterStatus) return false
    return true
  })

  const totalTrades = trades.length
  const winningTrades = trades.filter(trade => trade.profit && trade.profit > 0).length
  const losingTrades = trades.filter(trade => trade.profit && trade.profit < 0).length
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades * 100).toFixed(1) : '0'

  const getMarketColor = (market: string) => {
    switch (market) {
      case 'stocks': return 'bg-blue-100 text-blue-800'
      case 'futures': return 'bg-green-100 text-green-800'
      case 'crypto': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return '持仓中'
      case 'closed': return '已平仓'
      case 'cancelled': return '已取消'
      default: return status
    }
  }

  const getMarketText = (market: string) => {
    switch (market) {
      case 'stocks': return '股票'
      case 'futures': return '期货'
      case 'crypto': return '加密货币'
      default: return market
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">交易记录</h1>
        <p className="text-gray-600 mt-1">管理您的所有交易记录和统计</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总交易数</p>
              <p className="text-2xl font-bold text-gray-900">{totalTrades}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">盈利交易</p>
              <p className="text-2xl font-bold text-green-600">{winningTrades}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">亏损交易</p>
              <p className="text-2xl font-bold text-red-600">{losingTrades}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">胜率</p>
              <p className="text-2xl font-bold text-gray-900">{winRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">交易记录</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                <Download className="h-4 w-4 mr-1" />
                导出
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                新建交易
              </button>
            </div>
          </div>
        </div>

        {/* 过滤器 */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">筛选:</span>
            </div>
            
            <select
              value={filterMarket}
              onChange={(e) => setFilterMarket(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">所有市场</option>
              <option value="stocks">股票</option>
              <option value="futures">期货</option>
              <option value="crypto">加密货币</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">所有状态</option>
              <option value="open">持仓中</option>
              <option value="closed">已平仓</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>
        </div>

        {/* 交易列表 */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  交易详情
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  市场
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  数量
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  价格
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  盈亏
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  时间
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
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        trade.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <span className={`text-sm font-semibold ${
                          trade.type === 'buy' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {trade.type === 'buy' ? '买' : '卖'}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{trade.symbol}</div>
                        <div className="text-sm text-gray-500">{trade.notes}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMarketColor(trade.market)}`}>
                      {getMarketText(trade.market)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {trade.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${trade.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {trade.profit !== undefined ? (
                      <span className={`text-sm font-medium ${
                        trade.profit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trade.profit >= 0 ? '+' : ''}${trade.profit.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(trade.status)}`}>
                      {getStatusText(trade.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trade.timestamp.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              显示 {filteredTrades.length} 条记录，共 {trades.length} 条
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                上一页
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">1</span>
              <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 