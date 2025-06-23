import React, { useState } from 'react'
import { Cpu, Plus, Search, Download } from 'lucide-react'
import { sampleTradingRecords } from '../data/sampleData'
import { Link } from 'react-router-dom'
import { useTerminology } from '../hooks/useTerminology'

export default function FuturesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  const futuresTrades = sampleTradingRecords.filter(trade => trade.market === 'futures')
  
  const { getDatasetInfo, getActionInfo, getStatusInfo, getOperationInfo } = useTerminology()
  const datasetInfo = getDatasetInfo('datasetB')
  
  const filteredTrades = futuresTrades.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || trade.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalValue = futuresTrades.reduce((sum, t) => sum + (t.profitLoss || 0), 0)
  const winningTrades = futuresTrades.filter(t => t.profitLoss && t.profitLoss > 0).length
  const losingTrades = futuresTrades.filter(t => t.profitLoss && t.profitLoss < 0).length

  return (
    <div className="space-y-6">
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
                      <span className="font-semibold text-gray-900">{trade.symbol}</span>
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