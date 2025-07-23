import { useState } from 'react'
import { Send, Bot, TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react'
import { ChatMessage } from '../types'
import { sampleChatMessages, sampleAIAnalyses } from '../data/sampleData'

export default function TradingAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleChatMessages)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes('苹果') || lowerInput.includes('aapl')) {
      return '根据技术分析，AAPL目前处于上升趋势中。RSI指标显示没有超买，MACD指标显示买入信号。建议在150-155区间买入，目标价165美元，止损145美元。'
    } else if (lowerInput.includes('特斯拉') || lowerInput.includes('tsla')) {
      return 'TSLA目前面临技术面压力，股价跌破关键支撑位250美元，成交量放大表明卖压较重。建议及时止损，避免进一步亏损。'
    } else if (lowerInput.includes('比特币') || lowerInput.includes('btc')) {
      return '比特币在40000美元附近形成双底，MACD指标显示买入信号。建议分批建仓，目标价45000美元，止损39000美元。'
    } else if (lowerInput.includes('市场') || lowerInput.includes('趋势')) {
      return '当前市场整体呈现震荡上行趋势，建议关注科技股和新能源板块。注意控制仓位，设置合理止损。'
    } else {
      return '我理解您的问题。作为AI交易助手，我可以为您提供技术分析、风险评估和投资建议。请告诉我您想了解的具体股票或市场情况。'
    }
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'buy':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'sell':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case 'hold':
        return <Target className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">AI交易助手</h1>
        <p className="text-gray-600 mt-1">智能分析市场，提供专业投资建议</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 聊天界面 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">智能对话</h3>
            </div>
            
            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot className="h-4 w-4 mt-0.5 text-gray-500" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-gray-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 输入框 */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入您的问题，例如：分析苹果股票走势"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 快速建议 */}
        <div className="space-y-6">
          {/* AI分析建议 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">最新AI建议</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {sampleAIAnalyses.slice(0, 3).map((analysis) => (
                  <div key={analysis.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getRecommendationIcon(analysis.recommendation)}
                        <span className="font-medium text-gray-900">{analysis.symbol}</span>
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
                    <p className="text-sm text-gray-600 mb-2">{analysis.reasoning}</p>
                    <div className="text-xs text-gray-500">
                      置信度: {(analysis.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 快速问题 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">快速问题</h3>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {[
                  '分析苹果股票走势',
                  '特斯拉现在适合买入吗？',
                  '比特币后市如何？',
                  '当前市场趋势分析',
                  '推荐几只优质股票'
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 