import { useState } from 'react'
import { TrendingUp, TrendingDown, Activity, Globe, Zap } from 'lucide-react'
import { MarketData, AIAnalysis } from '../types'
import { sampleMarketData, sampleAIAnalyses } from '../data/sampleData'

export default function MarketAnalysis() {
  const [selectedMarket, setSelectedMarket] = useState<string>('all')
  const [marketData] = useState<MarketData[]>(sampleMarketData)
  const [aiAnalyses] = useState<AIAnalysis[]>(sampleAIAnalyses)

  const filteredMarketData = selectedMarket === 'all' 
    ? marketData 
    : marketData.filter(item => {
        if (selectedMarket === 'stocks') return ['AAPL', 'TSLA'].includes(item.symbol)
        if (selectedMarket === 'crypto') return ['BTC', 'ETH'].includes(item.symbol)
        return false
      })

  const getMarketIcon = (symbol: string) => {
    if (['AAPL', 'TSLA'].includes(symbol)) return <Activity className="h-5 w-5 text-blue-600" />
    if (['BTC', 'ETH'].includes(symbol)) return <Zap className="h-5 w-5 text-purple-600" />
    return <Globe className="h-5 w-5 text-gray-600" />
  }

  const getMarketName = (symbol: string) => {
    switch (symbol) {
      case 'AAPL': return '苹果公司'
      case 'TSLA': return '特斯拉'
      case 'BTC': return '比特币'
      case 'ETH': return '以太坊'
      default: return symbol
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">市场分析</h1>
        <p className="text-gray-600 mt-1">实时市场数据和AI智能分析</p>
      </div>

      {/* 市场选择器 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">选择市场:</span>
          <div className="flex space-x-2">
            {[
              { value: 'all', label: '全部', icon: Globe },
              { value: 'stocks', label: '股票', icon: Activity },
              { value: 'crypto', label: '加密货币', icon: Zap }
            ].map((market) => (
              <button
                key={market.value}
                onClick={() => setSelectedMarket(market.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedMarket === market.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <market.icon className="h-4 w-4 inline mr-1" />
                {market.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 市场概览 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 实时行情 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">实时行情</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredMarketData.map((item) => (
                <div key={item.symbol} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getMarketIcon(item.symbol)}
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{getMarketName(item.symbol)}</div>
                      <div className="text-sm text-gray-500">{item.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${item.price.toLocaleString()}</div>
                    <div className={`text-sm flex items-center ${
                      item.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {item.change >= 0 ? '+' : ''}{item.change.toLocaleString()} ({item.changePercent}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 市场统计 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">市场统计</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">涨跌分布</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">上涨</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">下跌</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">平盘</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">成交量统计</h4>
                <div className="space-y-2">
                  {filteredMarketData.map((item) => (
                    <div key={item.symbol} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.symbol}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.volume.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI分析报告 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI分析报告</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiAnalyses.map((analysis) => (
              <div key={analysis.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getMarketIcon(analysis.symbol)}
                    <span className="font-medium text-gray-900">{getMarketName(analysis.symbol)}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    analysis.recommendation === 'buy' ? 'bg-green-100 text-green-800' :
                    analysis.recommendation === 'sell' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {analysis.recommendation === 'buy' ? '买入' : 
                     analysis.recommendation === 'sell' ? '卖出' : '持有'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{analysis.reasoning}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">置信度</span>
                    <span className="font-medium text-gray-900">{(analysis.confidence * 100).toFixed(0)}%</span>
                  </div>
                  {analysis.priceTarget && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">目标价</span>
                      <span className="font-medium text-green-600">${analysis.priceTarget.toLocaleString()}</span>
                    </div>
                  )}
                  {analysis.stopLoss && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">止损价</span>
                      <span className="font-medium text-red-600">${analysis.stopLoss.toLocaleString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    {analysis.timestamp.toLocaleDateString()} {analysis.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 技术指标 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">技术指标</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: 'RSI', value: '65', status: 'neutral', description: '相对强弱指数' },
                { name: 'MACD', value: '0.25', status: 'bullish', description: '移动平均收敛发散' },
                { name: '布林带', value: '中轨', status: 'neutral', description: '价格通道指标' },
                { name: '成交量', value: '放大', status: 'bullish', description: '市场活跃度' }
              ].map((indicator) => (
                <div key={indicator.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{indicator.name}</div>
                    <div className="text-sm text-gray-500">{indicator.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{indicator.value}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      indicator.status === 'bullish' ? 'bg-green-100 text-green-800' :
                      indicator.status === 'bearish' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {indicator.status === 'bullish' ? '看涨' :
                       indicator.status === 'bearish' ? '看跌' : '中性'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">市场情绪</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">恐慌贪婪指数</span>
                  <span className="text-lg font-bold text-green-600">65</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">贪婪 - 市场情绪乐观</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">机构资金流向</span>
                  <span className="text-sm font-medium text-green-600">+$2.5B</span>
                </div>
                <div className="text-xs text-gray-500">过去24小时净流入</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">散户情绪</span>
                  <span className="text-sm font-medium text-yellow-600">中性</span>
                </div>
                <div className="text-xs text-gray-500">观望情绪较重</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 