import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Activity,
  BarChart3,
  CheckCircle
} from 'lucide-react'
import { samplePortfolio, sampleTrades, sampleAIAnalyses } from '../data/sampleData'

export default function Dashboard() {
  const totalTrades = sampleTrades.length
  const winningTrades = sampleTrades.filter(trade => trade.profit && trade.profit > 0).length
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades * 100).toFixed(1) : '0'
  const totalProfit = sampleTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0)

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI交易助手</h1>
        <p className="text-gray-600 mt-1">智能分析 · 专业建议 · 风险控制</p>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总资产</p>
              <p className="text-2xl font-bold text-gray-900">${samplePortfolio.totalValue.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+{samplePortfolio.profitPercent}%</span>
                <span className="text-sm text-gray-500 ml-2">本月</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">胜率</p>
              <p className="text-2xl font-bold text-gray-900">{winRate}%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+2.1%</span>
                <span className="text-sm text-gray-500 ml-2">较上月</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总盈亏</p>
              <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                {totalProfit >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ml-1 ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalProfit >= 0 ? '+' : ''}{((totalProfit / 10000) * 100).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500 ml-2">总收益</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">AI分析</p>
              <p className="text-2xl font-bold text-gray-900">{sampleAIAnalyses.length}</p>
              <div className="flex items-center mt-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">准确率85%</span>
                <span className="text-sm text-gray-500 ml-2">本月</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 投资组合概览 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">投资组合概览</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {samplePortfolio.positions.map((position) => (
                  <div key={position.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{position.symbol}</span>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{position.symbol}</div>
                        <div className="text-sm text-gray-500">{position.quantity} 股</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${position.marketValue.toLocaleString()}</div>
                      <div className={`text-sm ${position.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.profit >= 0 ? '+' : ''}${position.profit.toLocaleString()} ({position.profitPercent}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 最近活动 */}
        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">最近活动</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sampleTrades.slice(0, 3).map((trade) => (
                  <div key={trade.id} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${trade.profit && trade.profit > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {trade.type === 'buy' ? '买入' : '卖出'} {trade.symbol}
                      </div>
                      <div className="text-xs text-gray-500">
                        {trade.timestamp.toLocaleDateString()} {trade.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${trade.profit && trade.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trade.profit && trade.profit > 0 ? '+' : ''}${trade.profit?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI分析建议 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">最新AI分析建议</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {sampleAIAnalyses.slice(0, 3).map((analysis) => (
              <div key={analysis.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{analysis.symbol}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      analysis.recommendation === 'buy' ? 'bg-green-100 text-green-800' :
                      analysis.recommendation === 'sell' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {analysis.recommendation === 'buy' ? '买入' : 
                       analysis.recommendation === 'sell' ? '卖出' : '持有'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    置信度: {(analysis.confidence * 100).toFixed(0)}%
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{analysis.reasoning}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>目标价: ${analysis.priceTarget?.toLocaleString()}</span>
                  <span>止损: ${analysis.stopLoss?.toLocaleString()}</span>
                  <span>{analysis.timestamp.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 