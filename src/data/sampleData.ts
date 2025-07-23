import { Trade, AIAnalysis, MarketData, Portfolio, Position, ChatMessage } from '../types'

// 示例交易记录
export const sampleTrades: Trade[] = [
  {
    id: '1',
    symbol: 'AAPL',
    type: 'buy',
    quantity: 100,
    price: 150.25,
    timestamp: new Date('2024-01-15T10:30:00'),
    market: 'stocks',
    status: 'closed',
    profit: 1250,
    notes: '基于AI分析建议买入，技术面看好'
  },
  {
    id: '2',
    symbol: 'TSLA',
    type: 'sell',
    quantity: 50,
    price: 245.80,
    timestamp: new Date('2024-01-16T14:20:00'),
    market: 'stocks',
    status: 'closed',
    profit: -850,
    notes: '止损卖出，避免进一步亏损'
  },
  {
    id: '3',
    symbol: 'BTC',
    type: 'buy',
    quantity: 0.5,
    price: 42000,
    timestamp: new Date('2024-01-17T09:15:00'),
    market: 'crypto',
    status: 'open',
    notes: '加密货币市场反弹，AI建议适度配置'
  }
]

// 示例AI分析
export const sampleAIAnalyses: AIAnalysis[] = [
  {
    id: '1',
    symbol: 'AAPL',
    recommendation: 'buy',
    confidence: 0.85,
    reasoning: '技术面显示强劲上升趋势，RSI指标健康，建议在150-155区间买入',
    timestamp: new Date('2024-01-15T09:00:00'),
    market: 'stocks',
    priceTarget: 165,
    stopLoss: 145
  },
  {
    id: '2',
    symbol: 'TSLA',
    recommendation: 'sell',
    confidence: 0.72,
    reasoning: '股价跌破关键支撑位，成交量放大，建议及时止损',
    timestamp: new Date('2024-01-16T13:30:00'),
    market: 'stocks',
    priceTarget: 230,
    stopLoss: 250
  },
  {
    id: '3',
    symbol: 'BTC',
    recommendation: 'buy',
    confidence: 0.68,
    reasoning: '比特币在40000美元附近形成双底，MACD指标显示买入信号',
    timestamp: new Date('2024-01-17T08:45:00'),
    market: 'crypto',
    priceTarget: 45000,
    stopLoss: 39000
  }
]

// 示例市场数据
export const sampleMarketData: MarketData[] = [
  {
    symbol: 'AAPL',
    price: 162.50,
    change: 12.25,
    changePercent: 8.15,
    volume: 45678900,
    marketCap: 2500000000000,
    timestamp: new Date()
  },
  {
    symbol: 'TSLA',
    price: 235.20,
    change: -10.60,
    changePercent: -4.31,
    volume: 23456700,
    marketCap: 750000000000,
    timestamp: new Date()
  },
  {
    symbol: 'BTC',
    price: 43500,
    change: 1500,
    changePercent: 3.57,
    volume: 123456789,
    timestamp: new Date()
  }
]

// 示例持仓
export const samplePositions: Position[] = [
  {
    symbol: 'AAPL',
    quantity: 100,
    avgPrice: 150.25,
    currentPrice: 162.50,
    marketValue: 16250,
    profit: 1225,
    profitPercent: 8.15,
    market: 'stocks'
  },
  {
    symbol: 'BTC',
    quantity: 0.5,
    avgPrice: 42000,
    currentPrice: 43500,
    marketValue: 21750,
    profit: 750,
    profitPercent: 3.57,
    market: 'crypto'
  }
]

// 示例投资组合
export const samplePortfolio: Portfolio = {
  totalValue: 38000,
  totalProfit: 1975,
  profitPercent: 5.49,
  positions: samplePositions
}

// 示例AI对话
export const sampleChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: '请分析一下苹果公司的股票走势',
    timestamp: new Date('2024-01-15T09:00:00')
  },
  {
    id: '2',
    role: 'assistant',
    content: '根据技术分析，AAPL目前处于上升趋势中。RSI指标显示没有超买，MACD指标显示买入信号。建议在150-155区间买入，目标价165美元，止损145美元。',
    timestamp: new Date('2024-01-15T09:01:00')
  },
  {
    id: '3',
    role: 'user',
    content: '特斯拉的股票怎么样？',
    timestamp: new Date('2024-01-16T13:30:00')
  },
  {
    id: '4',
    role: 'assistant',
    content: 'TSLA目前面临技术面压力，股价跌破关键支撑位250美元，成交量放大表明卖压较重。建议及时止损，避免进一步亏损。',
    timestamp: new Date('2024-01-16T13:31:00')
  }
] 