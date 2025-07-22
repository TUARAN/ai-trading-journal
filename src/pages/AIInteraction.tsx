import { useState } from 'react'
import { 
  MessageSquare, 
  Search, 
  Download,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Tag
} from 'lucide-react'
import { sampleAIInteractions } from '../data/sampleData'
import { useTerminology } from '../contexts/TerminologyContext'

export default function AIInteraction() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMarket, setSelectedMarket] = useState('all')
  const [selectedSentiment, setSelectedSentiment] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const interactionsPerPage = 10

  const { getPageInfo, getMetricInfo, getActionInfo, getFilterInfo, getDatasetInfo } = useTerminology()

  // 过滤交互记录
  const filteredInteractions = sampleAIInteractions.filter(interaction => {
    const matchesSearch = interaction.userQuestion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interaction.aiResponse.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMarket = selectedMarket === 'all' || interaction.market === selectedMarket
    const matchesSentiment = selectedSentiment === 'all' || interaction.sentiment === selectedSentiment
    return matchesSearch && matchesMarket && matchesSentiment
  })

  // 分页
  const totalPages = Math.ceil(filteredInteractions.length / interactionsPerPage)
  const startIndex = (currentPage - 1) * interactionsPerPage
  const endIndex = startIndex + interactionsPerPage
  const currentInteractions = filteredInteractions.slice(startIndex, endIndex)

  // 统计信息
  const totalInteractions = filteredInteractions.length
  const positiveInteractions = filteredInteractions.filter(i => i.sentiment === 'positive').length
  const negativeInteractions = filteredInteractions.filter(i => i.sentiment === 'negative').length

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">{getPageInfo('aiInteraction')}</h1>
        <p className="text-gray-600 mt-1">{getPageInfo('aiDescription')}</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-blue-100">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('totalInteractions')}</p>
              <p className="text-2xl font-bold text-gray-900">{totalInteractions}</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-green-100">
              <ThumbsUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('positiveFeedback')}</p>
              <p className="text-2xl font-bold text-gray-900">{positiveInteractions}</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-red-100">
              <ThumbsDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('negativeFeedback')}</p>
              <p className="text-2xl font-bold text-gray-900">{negativeInteractions}</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-gray-100">
              <Bot className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('aiResponses')}</p>
              <p className="text-2xl font-bold text-gray-900">{totalInteractions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和过滤 */}
      <div className="data-card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 搜索框 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索交互内容..."
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

          {/* 情感过滤 */}
          <div className="sm:w-48">
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">全部情感</option>
              <option value="positive">正面</option>
              <option value="negative">负面</option>
              <option value="neutral">中性</option>
            </select>
          </div>

          {/* 导出按钮 */}
          <button className="btn-primary flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" />
            {getActionInfo('exportData')}
          </button>
        </div>
      </div>

      {/* 交互记录列表 */}
      <div className="data-card">
        <div className="space-y-4">
          {currentInteractions.map((interaction) => (
            <div key={interaction.id} className="interaction-card">
              {/* 交互头部 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      interaction.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                      interaction.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {interaction.sentiment}
                    </span>
                    {interaction.market && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {interaction.market === 'stocks' ? getDatasetInfo('datasetA').name : 
                         interaction.market === 'futures' ? getDatasetInfo('datasetB').name : 
                         getDatasetInfo('datasetC').name}
                      </span>
                    )}
                    {interaction.symbol && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                        {interaction.symbol}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(interaction.timestamp).toLocaleString()}
                </div>
              </div>

              {/* 用户问题 */}
              <div className="mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">用户问题</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {interaction.userQuestion}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI回答 */}
              <div className="mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">AI回答</p>
                    <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                      {interaction.aiResponse}
                    </p>
                  </div>
                </div>
              </div>

              {/* 标签 */}
              {interaction.tags && interaction.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-1">
                    {interaction.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              显示第 {startIndex + 1} 到 {Math.min(endIndex, filteredInteractions.length)} 条，
              共 {filteredInteractions.length} 条交互记录
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

        {currentInteractions.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">暂无交互记录</p>
          </div>
        )}
      </div>
    </div>
  )
} 