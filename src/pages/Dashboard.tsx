import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react'
import { sampleDashboardData } from '../data/sampleData'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { overallStats, recentTrades, recentInteractions, topPerformers } = sampleDashboardData

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="card">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">交易仪表板</h1>
        <p className="text-gray-600">查看您的交易表现和AI交互记录</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="总收益"
          value={`$${overallStats.totalProfitLoss.toLocaleString()}`}
          change={overallStats.averageReturn}
          icon={DollarSign}
          color="bg-success-500"
        />
        <StatCard
          title="胜率"
          value={`${overallStats.winRate}%`}
          icon={Target}
          color="bg-primary-500"
        />
        <StatCard
          title="总交易数"
          value={overallStats.totalTrades}
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <StatCard
          title="最大回撤"
          value={`${overallStats.maxDrawdown}%`}
          icon={TrendingDown}
          color="bg-danger-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近交易 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">最近交易</h2>
            <Link to="/stocks" className="text-primary-600 hover:text-primary-700 text-sm">
              查看全部
            </Link>
          </div>
          <div className="space-y-4">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{trade.symbol}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      trade.market === 'stocks' ? 'bg-blue-100 text-blue-800' :
                      trade.market === 'futures' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {trade.market}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{trade.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${trade.profitLoss && trade.profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                    {trade.profitLoss ? `$${trade.profitLoss}` : '--'}
                  </p>
                  <p className="text-sm text-gray-600">{trade.type.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最近AI交互 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">最近AI交互</h2>
            <Link to="/stocks" className="text-primary-600 hover:text-primary-700 text-sm">
              查看全部
            </Link>
          </div>
          <div className="space-y-4">
            {recentInteractions.map((interaction) => (
              <div key={interaction.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    interaction.sentiment === 'positive' ? 'bg-success-100 text-success-800' :
                    interaction.sentiment === 'negative' ? 'bg-danger-100 text-danger-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {interaction.sentiment}
                  </span>
                  <span className="text-sm text-gray-600">
                    {new Date(interaction.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">{interaction.userQuestion}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{interaction.aiResponse}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 表现最佳 */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">表现最佳</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((performer, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{performer.symbol}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  performer.market === 'stocks' ? 'bg-blue-100 text-blue-800' :
                  performer.market === 'futures' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {performer.market}
                </span>
              </div>
              <p className={`text-lg font-bold ${performer.profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                ${performer.profitLoss}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 