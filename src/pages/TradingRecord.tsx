import { useState } from 'react'
import { 
  Search, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  BarChart3,
  TrendingUp,
  Activity
} from 'lucide-react'
import { sampleTradingRecords } from '../data/sampleData'
import { useTerminology } from '../contexts/TerminologyContext'

export default function TradingRecord() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMarket, setSelectedMarket] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 10

  const { getPageInfo, getMetricInfo, getActionInfo, getOperationInfo, getFilterInfo, getDatasetInfo } = useTerminology()

  // 过滤记录
  const filteredRecords = sampleTradingRecords.filter(record => {
    const matchesSearch = record.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMarket = selectedMarket === 'all' || record.market === selectedMarket
    return matchesSearch && matchesMarket
  })

  // 分页
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentRecords = filteredRecords.slice(startIndex, endIndex)

  // 统计信息
  const totalRecords = filteredRecords.length
  const totalVolume = filteredRecords.reduce((sum, record) => sum + (record.quantity || 0), 0)
  const averageAccuracy = filteredRecords.length > 0 
    ? (filteredRecords.filter(r => r.profitLoss && r.profitLoss > 0).length / filteredRecords.length * 100).toFixed(1)
    : 0

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">{getPageInfo('tradingRecord')}</h1>
        <p className="text-gray-600 mt-1">{getPageInfo('description')}</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-blue-100">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('totalRecords')}</p>
              <p className="text-2xl font-bold text-gray-900">{totalRecords}</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-green-100">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('totalVolume')}</p>
              <p className="text-2xl font-bold text-gray-900">{totalVolume.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-purple-100">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('accuracy')}</p>
              <p className="text-2xl font-bold text-gray-900">{averageAccuracy}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和过滤 */}
      <div className="data-card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 搜索框 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`搜索${getOperationInfo('dataRecord')}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 数据集过滤 */}
          <div className="sm:w-48">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{getFilterInfo('allDatasets')}</option>
              <option value="stocks">{getDatasetInfo('datasetA').name}</option>
              <option value="futures">{getDatasetInfo('datasetB').name}</option>
              <option value="crypto">{getDatasetInfo('datasetC').name}</option>
            </select>
          </div>

          {/* 导出按钮 */}
          <button className="btn-primary flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" />
            {getActionInfo('exportData')}
          </button>
        </div>
      </div>

      {/* 记录表格 */}
      <div className="data-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">{getOperationInfo('dataIdentifier')}</th>
                <th className="table-header">数据集</th>
                <th className="table-header">{getOperationInfo('processingType')}</th>
                <th className="table-header">{getOperationInfo('dataVolume')}</th>
                <th className="table-header">{getOperationInfo('processingResult')}</th>
                <th className="table-header">{getOperationInfo('processingTime')}</th>
                <th className="table-header">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-900">
                          {record.symbol.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{record.symbol}</div>
                        <div className="text-sm text-gray-500">ID: {record.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`tag ${
                      record.market === 'stocks' ? 'tag-blue' :
                      record.market === 'futures' ? 'tag-yellow' :
                      'tag-green'
                    }`}>
                      {record.market === 'stocks' ? getDatasetInfo('datasetA').name : 
                       record.market === 'futures' ? getDatasetInfo('datasetB').name : 
                       getDatasetInfo('datasetC').name}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-gray-900">{record.type}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-gray-900">{record.quantity?.toLocaleString() || '--'}</span>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.profitLoss && record.profitLoss >= 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.profitLoss ? `${record.profitLoss}` : '--'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition-colors">
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
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              显示第 {startIndex + 1} 到 {Math.min(endIndex, filteredRecords.length)} 条，
              共 {filteredRecords.length} 条记录
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <span className="px-3 py-1 text-sm text-gray-700">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 