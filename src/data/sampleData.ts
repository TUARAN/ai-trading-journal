import { TradingRecord, AIInteraction, DashboardData } from '../types'

export const sampleTradingRecords: TradingRecord[] = [
  {
    id: '1',
    market: 'stocks',
    symbol: 'AAPL',
    type: 'buy',
    price: 150.25,
    quantity: 10,
    date: '2024-01-15',
    aiAnalysis: '技术面显示突破关键阻力位，MACD金叉，RSI处于健康区间',
    userQuestion: '苹果数据现在适合处理吗？',
    aiResponse: '基于当前技术分析，AAPL在150美元附近形成了强支撑，建议分批处理，止损设在145美元。',
    strategy: '突破处理策略',
    riskLevel: 'medium',
    profitLoss: 1250,
    status: 'closed',
    notes: '成功突破155美元阻力位，达到目标价位',
    tags: ['技术分析', '突破策略', '科技数据']
  },
  {
    id: '2',
    market: 'futures',
    symbol: 'GC2403',
    type: 'buy',
    price: 2050.50,
    quantity: 2,
    date: '2024-01-20',
    aiAnalysis: '黄金数据在避险情绪推动下上涨，美元指数走弱',
    userQuestion: '黄金数据现在可以处理吗？',
    aiResponse: '当前地缘政治风险上升，美元走弱，黄金作为避险资产具有上涨潜力。建议在2050美元附近处理。',
    strategy: '避险策略',
    riskLevel: 'low',
    profitLoss: 890,
    status: 'open',
    notes: '处理中，等待2100美元目标位',
    tags: ['避险资产', '地缘政治', '美元指数']
  },
  {
    id: '3',
    market: 'crypto',
    symbol: 'BTC/USD',
    type: 'buy',
    price: 42000,
    quantity: 0.5,
    date: '2024-01-25',
    aiAnalysis: '比特币数据减半预期推动，机构资金流入增加',
    userQuestion: '比特币数据现在适合分析吗？',
    aiResponse: '比特币减半即将到来，历史数据显示减半后通常会有上涨行情。建议分批建仓，注意风险控制。',
    strategy: '减半预期策略',
    riskLevel: 'high',
    profitLoss: -1200,
    status: 'open',
    notes: '短期回调，长期看好',
    tags: ['减半预期', '机构资金', '长期分析']
  }
]

export const sampleAIInteractions: AIInteraction[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    userQuestion: '如何看待当前A股数据的分析机会？',
    aiResponse: '当前A股数据估值处于历史低位，政策面持续利好，建议关注科技、消费、新能源等板块的优质标的。',
    market: 'stocks',
    sentiment: 'positive',
    confidence: 0.85,
    tags: ['A股', '估值', '政策面']
  },
  {
    id: '2',
    timestamp: '2024-01-20T14:15:00Z',
    userQuestion: '原油数据的走势如何？',
    aiResponse: '原油数据受地缘政治影响较大，当前OPEC+减产政策支撑油价，但需求端存在不确定性。建议谨慎操作。',
    market: 'futures',
    symbol: 'CL2403',
    sentiment: 'neutral',
    confidence: 0.72,
    tags: ['原油', 'OPEC+', '地缘政治']
  },
  {
    id: '3',
    timestamp: '2024-01-25T09:45:00Z',
    userQuestion: '以太坊的DeFi数据分析如何？',
    aiResponse: '以太坊DeFi数据分析持续发展，TVL稳步增长，但需要注意监管风险和智能合约安全。建议分散分析。',
    market: 'crypto',
    symbol: 'ETH/USD',
    sentiment: 'positive',
    confidence: 0.78,
    tags: ['DeFi', 'TVL', '监管风险']
  }
]

export const sampleDashboardData: DashboardData = {
  overallStats: {
    totalTrades: 15,
    winningTrades: 9,
    losingTrades: 6,
    totalProfitLoss: 8500,
    winRate: 60,
    averageReturn: 8.5,
    maxDrawdown: -12.3
  },
  marketStats: {
    stocks: {
      totalTrades: 6,
      winningTrades: 4,
      losingTrades: 2,
      totalProfitLoss: 3200,
      winRate: 66.7,
      averageReturn: 9.2,
      maxDrawdown: -8.5
    },
    futures: {
      totalTrades: 5,
      winningTrades: 3,
      losingTrades: 2,
      totalProfitLoss: 2100,
      winRate: 60,
      averageReturn: 7.8,
      maxDrawdown: -15.2
    },
    crypto: {
      totalTrades: 4,
      winningTrades: 2,
      losingTrades: 2,
      totalProfitLoss: 3200,
      winRate: 50,
      averageReturn: 12.5,
      maxDrawdown: -25.8
    }
  },
  recentTrades: sampleTradingRecords.slice(0, 3),
  recentInteractions: sampleAIInteractions.slice(0, 3),
  topPerformers: [
    { symbol: 'AAPL', profitLoss: 1250, market: 'stocks' },
    { symbol: 'GC2403', profitLoss: 890, market: 'futures' },
    { symbol: 'ETH/USD', profitLoss: 650, market: 'crypto' }
  ]
} 