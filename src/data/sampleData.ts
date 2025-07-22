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

// 期货品种 mock 交易记录
sampleTradingRecords.push(
  // 纯碱
  {
    id: 'f1',
    market: 'futures',
    symbol: 'SODA2406',
    type: 'buy',
    price: 2100,
    quantity: 5,
    date: '2024-06-01',
    aiAnalysis: '纯碱短线看多，支撑位2100。',
    userQuestion: '纯碱现在适合做多吗？',
    aiResponse: '建议逢低吸纳，目标2180。',
    strategy: '短线多头',
    riskLevel: 'medium',
    profitLoss: 400,
    status: 'closed',
    notes: '冲高回落，止盈部分多单',
    tags: ['纯碱', '短线', '多头']
  },
  {
    id: 'f2',
    market: 'futures',
    symbol: 'SODA2407',
    type: 'sell',
    price: 2180,
    quantity: 3,
    date: '2024-06-05',
    aiAnalysis: '纯碱高位震荡，注意风险。',
    userQuestion: '纯碱还能追多吗？',
    aiResponse: '建议高位减仓，防止回调。',
    strategy: '高抛低吸',
    riskLevel: 'high',
    profitLoss: -150,
    status: 'open',
    notes: '高位回落，部分止损',
    tags: ['纯碱', '震荡', '风险']
  },
  // 玻璃
  {
    id: 'f3',
    market: 'futures',
    symbol: 'GLASS2406',
    type: 'buy',
    price: 1800,
    quantity: 8,
    date: '2024-06-01',
    aiAnalysis: '玻璃价格波动加剧，建议谨慎操作。',
    userQuestion: '玻璃短线怎么看？',
    aiResponse: '短线有反弹，但需控制仓位。',
    strategy: '短线反弹',
    riskLevel: 'medium',
    profitLoss: 120,
    status: 'closed',
    notes: '反弹未能延续，及时止盈',
    tags: ['玻璃', '短线', '反弹']
  },
  {
    id: 'f4',
    market: 'futures',
    symbol: 'GLASS2407',
    type: 'sell',
    price: 1870,
    quantity: 4,
    date: '2024-06-05',
    aiAnalysis: '玻璃短期有回调风险。',
    userQuestion: '玻璃还能做多吗？',
    aiResponse: '建议观望，等待回调结束。',
    strategy: '观望为主',
    riskLevel: 'high',
    profitLoss: -80,
    status: 'open',
    notes: '盘中跳水，止损离场',
    tags: ['玻璃', '回调', '观望']
  },
  // 玉米
  {
    id: 'f5',
    market: 'futures',
    symbol: 'CORN2406',
    type: 'buy',
    price: 2600,
    quantity: 10,
    date: '2024-06-01',
    aiAnalysis: '玉米价格突破2600，关注多头延续。',
    userQuestion: '玉米还能涨吗？',
    aiResponse: '建议持有多单，关注上方压力。',
    strategy: '趋势跟随',
    riskLevel: 'medium',
    profitLoss: 300,
    status: 'closed',
    notes: '多单持有，逢高减仓',
    tags: ['玉米', '趋势', '多头']
  },
  {
    id: 'f6',
    market: 'futures',
    symbol: 'CORN2407',
    type: 'sell',
    price: 2650,
    quantity: 6,
    date: '2024-06-05',
    aiAnalysis: '玉米震荡偏强，逢低做多。',
    userQuestion: '玉米短线怎么看？',
    aiResponse: '建议逢低做多，目标2650。',
    strategy: '区间操作',
    riskLevel: 'low',
    profitLoss: 100,
    status: 'open',
    notes: '震荡偏强，继续持有',
    tags: ['玉米', '震荡', '区间']
  }
)

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

// 期货品种列表
export const FUTURES_COMMODITIES = [
  { key: 'soda', terminologyKey: 'soda', name: '纯碱' },
  { key: 'glass', terminologyKey: 'glass', name: '玻璃' },
  { key: 'corn', terminologyKey: 'corn', name: '玉米' },
];

// 各品种行情趋势 mock 数据（折线图）
export const futuresTrendData = {
  soda: [
    { date: '2025-07-01', price: 2100 },
    { date: '2025-07-02', price: 2120 },
    { date: '2025-07-03', price: 2080 },
    { date: '2025-07-04', price: 2150 },
    { date: '2025-07-05', price: 2180 },
  ],
  glass: [
    { date: '2025-07-01', price: 1800 },
    { date: '2025-07-02', price: 1825 },
    { date: '2025-07-03', price: 1810 },
    { date: '2025-07-04', price: 1850 },
    { date: '2025-07-05', price: 1870 },
  ],
  corn: [
    { date: '2025-07-01', price: 2600 },
    { date: '2025-07-02', price: 2620 },
    { date: '2025-07-03', price: 2590 },
    { date: '2025-07-04', price: 2630 },
    { date: '2025-07-05', price: 2650 },
  ],
};

// 各品种大模型日志 mock 数据
export const aiLogs = {
  soda: [
    { id: 1, time: '2025-07-05 09:00', content: '模型建议：纯碱短线看多，支撑位2100。' },
    { id: 2, time: '2025-07-04 14:30', content: '检测到资金流入，建议关注多头机会。' },
  ],
  glass: [
    { id: 1, time: '2025-07-05 10:00', content: '玻璃价格波动加剧，建议谨慎操作。' },
    { id: 2, time: '2025-07-03 16:00', content: '模型提示：短期有回调风险。' },
  ],
  corn: [
    { id: 1, time: '2025-07-05 11:00', content: '玉米价格突破2600，关注多头延续。' },
    { id: 2, time: '2025-07-02 13:00', content: '模型建议：逢低吸纳，目标2650。' },
  ],
};

// 各品种心得笔记 mock 数据
export const notes = {
  soda: [
    { id: 1, time: '2025-07-05 09:30', content: '今日纯碱冲高回落，盘中止盈部分多单。' },
    { id: 2, time: '2025-07-03 15:00', content: '纯碱区间震荡，等待方向选择。' },
  ],
  glass: [
    { id: 1, time: '2025-07-05 10:30', content: '玻璃盘中跳水，止损离场。' },
    { id: 2, time: '2025-07-04 11:00', content: '短线反弹未能延续，观望为主。' },
  ],
  corn: [
    { id: 1, time: '2025-07-05 11:30', content: '玉米多单持有，关注上方压力。' },
    { id: 2, time: '2025-07-01 14:00', content: '玉米震荡偏强，逢低做多。' },
  ],
};

// 股票行情趋势 mock 数据
export const stocksTrendData = {
  aapl: [
    { date: '2025-07-01', price: 150 },
    { date: '2025-07-02', price: 152 },
    { date: '2025-07-03', price: 151 },
    { date: '2025-07-04', price: 153 },
    { date: '2025-07-05', price: 155 },
  ],
  tsla: [
    { date: '2025-07-01', price: 700 },
    { date: '2025-07-02', price: 710 },
    { date: '2025-07-03', price: 705 },
    { date: '2025-07-04', price: 715 },
    { date: '2025-07-05', price: 720 },
  ],
};

export const stocksAiLogs = {
  aapl: [
    { id: 1, time: '2025-07-05 09:00', content: 'AI建议：AAPL短线看多，支撑位150。' },
    { id: 2, time: '2025-07-03 14:30', content: '检测到资金流入，建议关注多头机会。' },
  ],
  tsla: [
    { id: 1, time: '2025-07-05 10:00', content: 'TSLA价格波动加剧，建议谨慎操作。' },
    { id: 2, time: '2025-07-04 16:00', content: 'AI提示：短期有回调风险。' },
  ],
};

export const stocksNotes = {
  aapl: [
    { id: 1, time: '2025-07-05 09:30', content: '今日AAPL冲高回落，盘中止盈部分多单。' },
    { id: 2, time: '2025-07-03 15:00', content: 'AAPL区间震荡，等待方向选择。' },
  ],
  tsla: [
    { id: 1, time: '2025-07-05 10:30', content: 'TSLA盘中跳水，止损离场。' },
    { id: 2, time: '2025-07-04 11:00', content: '短线反弹未能延续，观望为主。' },
  ],
};

// 加密货币行情趋势 mock 数据
export const cryptoTrendData = {
  btc: [
    { date: '2025-07-01', price: 60000 },
    { date: '2025-07-02', price: 60500 },
    { date: '2025-07-03', price: 61000 },
    { date: '2025-07-04', price: 60800 },
    { date: '2025-07-05', price: 61500 },
  ],
  eth: [
    { date: '2025-07-01', price: 3500 },
    { date: '2025-07-02', price: 3550 },
    { date: '2025-07-03', price: 3530 },
    { date: '2025-07-04', price: 3580 },
    { date: '2025-07-05', price: 3600 },
  ],
};

export const cryptoAiLogs = {
  btc: [
    { id: 1, time: '2025-07-05 09:00', content: 'AI建议：BTC短线看多，支撑位60000。' },
    { id: 2, time: '2025-07-03 14:30', content: '检测到资金流入，建议关注多头机会。' },
  ],
  eth: [
    { id: 1, time: '2025-07-05 10:00', content: 'ETH价格波动加剧，建议谨慎操作。' },
    { id: 2, time: '2025-07-04 16:00', content: 'AI提示：短期有回调风险。' },
  ],
};

export const cryptoNotes = {
  btc: [
    { id: 1, time: '2025-07-05 09:30', content: '今日BTC冲高回落，盘中止盈部分多单。' },
    { id: 2, time: '2025-07-03 15:00', content: 'BTC区间震荡，等待方向选择。' },
  ],
  eth: [
    { id: 1, time: '2025-07-05 10:30', content: 'ETH盘中跳水，止损离场。' },
    { id: 2, time: '2025-07-04 11:00', content: '短线反弹未能延续，观望为主。' },
  ],
}; 