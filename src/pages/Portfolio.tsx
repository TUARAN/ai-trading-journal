import { useState } from 'react'
import { TrendingUp, DollarSign, Target, Activity, Plus } from 'lucide-react'
import type { Portfolio } from '../types'
import { samplePortfolio } from '../data/sampleData'

export default function Portfolio() {
  const [portfolio] = useState<Portfolio>(samplePortfolio)

  const getMarketColor = (market: string) => {
    switch (market) {
      case 'stocks': return '#3B82F6'
      case 'futures': return '#10B981'
      case 'crypto': return '#8B5CF6'
      default: return '#6B7280'
    }
  }

  const getMarketName = (market: string) => {
    switch (market) {
      case 'stocks': return '股票'
      case 'futures': return '期货'
      case 'crypto': return '加密货币'
      default: return market
    }
  }

  // 计算资产配置
  const assetAllocation = portfolio.positions.reduce((acc, position) => {
    const market = position.market
    if (!acc[market]) {
      acc[market] = { value: 0, percentage: 0 }
    }
    acc[market].value += position.marketValue
    return acc
  }, {} as Record<string, { value: number; percentage: number }>)

  // 计算百分比
  Object.keys(assetAllocation).forEach(market => {
    assetAllocation[market].percentage = (assetAllocation[market].value / portfolio.totalValue) * 100
  })

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">投资组合</h1>
        <p className="text-gray-600 mt-1">资产配置和风险管理</p>
      </div>

      {/* 投资组合概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总资产</p>
              <p className="text-2xl font-bold text-gray-900">${portfolio.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">总盈亏</p>
              <p className={`text-2xl font-bold ${portfolio.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${portfolio.totalProfit >= 0 ? '+' : ''}{portfolio.totalProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">收益率</p>
              <p className={`text-2xl font-bold ${portfolio.profitPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolio.profitPercent >= 0 ? '+' : ''}{portfolio.profitPercent}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">持仓数量</p>
              <p className="text-2xl font-bold text-gray-900">{portfolio.positions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 持仓详情 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">持仓详情</h3>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              添加持仓
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  资产
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  数量
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  平均成本
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  当前价格
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  市值
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  盈亏
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  盈亏率
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portfolio.positions.map((position) => (
                <tr key={position.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                        style={{ backgroundColor: getMarketColor(position.market) }}
                      >
                        {position.symbol}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{position.symbol}</div>
                        <div className="text-sm text-gray-500">{getMarketName(position.market)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {position.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${position.avgPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${position.currentPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${position.marketValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      position.profit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {position.profit >= 0 ? '+' : ''}${position.profit.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      position.profitPercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {position.profitPercent >= 0 ? '+' : ''}{position.profitPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 