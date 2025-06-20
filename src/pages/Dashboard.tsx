import React from 'react'
import { Terminal, Cpu, Database, Activity } from 'lucide-react'
import { sampleDashboardData } from '../data/sampleData'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { overallStats, recentTrades, recentInteractions, topPerformers } = sampleDashboardData

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="card">
      <div className="flex items-center">
        <div className={`p-2 rounded ${color}`}>
          <Icon className="h-6 w-6 text-black" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-mono text-green-400">{title}</p>
          <p className="text-2xl font-mono font-bold text-green-300">{value}</p>
          {change && (
            <p className={`text-sm font-mono ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
        <h1 className="text-2xl font-mono font-bold text-green-300">SYSTEM_DASHBOARD</h1>
        <p className="text-green-400 font-mono">&gt; 查看系统状态和AI交互记录</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="TOTAL_VALUE"
          value={`${overallStats.totalProfitLoss.toLocaleString()}`}
          change={overallStats.averageReturn}
          icon={Terminal}
          color="bg-green-600"
        />
        <StatCard
          title="SUCCESS_RATE"
          value={`${overallStats.winRate}%`}
          icon={Cpu}
          color="bg-blue-600"
        />
        <StatCard
          title="TOTAL_RECORDS"
          value={overallStats.totalTrades}
          icon={Database}
          color="bg-purple-600"
        />
        <StatCard
          title="MAX_DRAWDOWN"
          value={`${overallStats.maxDrawdown}%`}
          icon={Activity}
          color="bg-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近记录 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-mono font-bold text-green-300">RECENT_LOGS</h2>
            <Link to="/stocks" className="text-green-400 hover:text-green-300 text-sm font-mono">
              &gt; VIEW_ALL
            </Link>
          </div>
          <div className="space-y-4">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-green-600">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-green-300">{trade.symbol}</span>
                    <span className={`px-2 py-1 text-xs rounded font-mono ${
                      trade.market === 'stocks' ? 'bg-blue-600 text-black' :
                      trade.market === 'futures' ? 'bg-purple-600 text-black' :
                      'bg-green-600 text-black'
                    }`}>
                      {trade.market === 'stocks' ? 'NODE_A' : 
                       trade.market === 'futures' ? 'NODE_B' : 'NODE_C'}
                    </span>
                  </div>
                  <p className="text-sm text-green-400 font-mono">{trade.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-mono font-bold ${trade.profitLoss && trade.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.profitLoss ? `${trade.profitLoss}` : '--'}
                  </p>
                  <p className="text-sm text-green-400 font-mono">{trade.type.toUpperCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最近AI交互 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-mono font-bold text-green-300">AI_INTERACTIONS</h2>
            <Link to="/stocks" className="text-green-400 hover:text-green-300 text-sm font-mono">
              &gt; VIEW_ALL
            </Link>
          </div>
          <div className="space-y-4">
            {recentInteractions.map((interaction) => (
              <div key={interaction.id} className="p-3 bg-gray-800 rounded border border-green-600">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs rounded font-mono ${
                    interaction.sentiment === 'positive' ? 'bg-green-600 text-black' :
                    interaction.sentiment === 'negative' ? 'bg-red-600 text-black' :
                    'bg-gray-600 text-green-300'
                  }`}>
                    {interaction.sentiment.toUpperCase()}
                  </span>
                  <span className="text-sm text-green-400 font-mono">
                    {new Date(interaction.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm font-mono font-bold text-green-300 mb-1">{interaction.userQuestion}</p>
                <p className="text-sm text-green-400 font-mono line-clamp-2">{interaction.aiResponse}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 表现最佳 */}
      <div className="card">
        <h2 className="text-lg font-mono font-bold text-green-300 mb-4">TOP_PERFORMERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((performer, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded border border-green-600">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-green-300">{performer.symbol}</span>
                <span className={`px-2 py-1 text-xs rounded font-mono ${
                  performer.market === 'stocks' ? 'bg-blue-600 text-black' :
                  performer.market === 'futures' ? 'bg-purple-600 text-black' :
                  'bg-green-600 text-black'
                }`}>
                  {performer.market === 'stocks' ? 'NODE_A' : 
                   performer.market === 'futures' ? 'NODE_B' : 'NODE_C'}
                </span>
              </div>
              <p className={`text-lg font-mono font-bold ${performer.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {performer.profitLoss}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 