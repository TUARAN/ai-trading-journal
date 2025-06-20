export interface TradingRecord {
  id: string
  market: 'stocks' | 'futures' | 'crypto'
  symbol: string
  type: 'buy' | 'sell' | 'hold'
  price: number
  quantity: number
  date: string
  aiAnalysis: string
  userQuestion: string
  aiResponse: string
  strategy: string
  riskLevel: 'low' | 'medium' | 'high'
  profitLoss?: number
  status: 'open' | 'closed' | 'cancelled'
  notes?: string
  tags: string[]
}

export interface MarketStats {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  totalProfitLoss: number
  winRate: number
  averageReturn: number
  maxDrawdown: number
}

export interface AIInteraction {
  id: string
  timestamp: string
  userQuestion: string
  aiResponse: string
  market: 'stocks' | 'futures' | 'crypto'
  symbol?: string
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  tags: string[]
}

export interface DashboardData {
  overallStats: MarketStats
  marketStats: {
    stocks: MarketStats
    futures: MarketStats
    crypto: MarketStats
  }
  recentTrades: TradingRecord[]
  recentInteractions: AIInteraction[]
  topPerformers: {
    symbol: string
    profitLoss: number
    market: string
  }[]
} 