import React, { useState } from 'react'
import { Terminal, Plus, Search, Filter, Download } from 'lucide-react'
import { sampleTradingRecords, sampleAIInteractions } from '../data/sampleData'
import { Link } from 'react-router-dom'
import { useTerminology } from '../hooks/useTerminology'

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  const stockTrades = sampleTradingRecords.filter(trade => trade.market === 'stocks')
  const stockInteractions = sampleAIInteractions.filter(interaction => interaction.market === 'stocks')
  
  const { getDatasetInfo, getActionInfo, getStatusInfo, getOperationInfo } = useTerminology()
  const datasetInfo = getDatasetInfo('datasetA')
  
  const filteredTrades = stockTrades.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || trade.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalValue = stockTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0)
  const winningTrades = stockTrades.filter(t => t.profitLoss && t.profitLoss > 0).length
  const losingTrades = stockTrades.filter(t => t.profitLoss && t.profitLoss < 0).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{datasetInfo.name}管理</h1>
          <p className="text-gray-600">{datasetInfo.description}</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          {getActionInfo('addRecord')}
        </button>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">总记录数</h3>
          <p className="text-2xl font-bold text-gray-900">{stockTrades.length}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">成功记录</h3>
          <p className="text-2xl font-bold text-green-600">
            {stockTrades.filter(t => t.profitLoss && t.profitLoss > 0).length}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">总收益</h3>
          <p className="text-2xl font-bold text-gray-900">
            {totalValue.toLocaleString()}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600">AI交互</h3>
          <p className="text-2xl font-bold text-gray-900">{stockInteractions.length}</p>
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
                      <div className="text-sm font-medium text-gray-900">{trade.symbol}</div>
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

      {/* AI交互记录 */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI交互记录</h2>
        <div className="space-y-4">
          {stockInteractions.map((interaction) => (
            <div key={interaction.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    interaction.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                    interaction.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {interaction.sentiment}
                  </span>
                  {interaction.symbol && (
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {interaction.symbol}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(interaction.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-900 mb-1">问题：</p>
                <p className="text-sm text-gray-700">{interaction.userQuestion}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">AI回答：</p>
                <p className="text-sm text-gray-700">{interaction.aiResponse}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {interaction.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 