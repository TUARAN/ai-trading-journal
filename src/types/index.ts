// 交易记录类型
export interface Trade {
  id: string
  symbol: string
  type: 'buy' | 'sell'
  quantity: number
  price: number
  timestamp: Date
  market: 'stocks' | 'futures' | 'crypto'
  status: 'open' | 'closed' | 'cancelled'
  profit?: number
  notes?: string
}

// AI分析建议类型
export interface AIAnalysis {
  id: string
  symbol: string
  recommendation: 'buy' | 'sell' | 'hold'
  confidence: number
  reasoning: string
  timestamp: Date
  market: 'stocks' | 'futures' | 'crypto'
  priceTarget?: number
  stopLoss?: number
}

// 市场数据类型
export interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap?: number
  timestamp: Date
}

// 投资组合类型
export interface Portfolio {
  totalValue: number
  totalProfit: number
  profitPercent: number
  positions: Position[]
}

// 持仓类型
export interface Position {
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
  marketValue: number
  profit: number
  profitPercent: number
  market: 'stocks' | 'futures' | 'crypto'
}

// AI对话消息类型
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  tradeId?: string
}

// 系统配置类型
export interface SystemConfig {
  theme: 'light' | 'dark'
  language: 'zh' | 'en'
  notifications: boolean
  autoAnalysis: boolean
} 