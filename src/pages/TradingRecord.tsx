import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { sampleTradingRecords } from '../data/sampleData'

export default function TradingRecord() {
  const { id } = useParams()
  const trade = sampleTradingRecords.find(t => t.id === id)

  if (!trade) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">交易记录未找到</h2>
        <p className="text-gray-600 mb-4">您查找的交易记录不存在</p>
        <Link to="/" className="btn-primary">
          返回首页
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">交易详情</h1>
            <p className="text-gray-600">{trade.symbol} - {trade.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            编辑
          </button>
          <button className="btn-secondary flex items-center text-danger-600 hover:text-danger-700">
            <Trash2 className="h-4 w-4 mr-2" />
            删除
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主要信息 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本信息 */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">交易标的</label>
                <p className="text-lg font-semibold text-gray-900">{trade.symbol}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">市场</label>
                <p className="text-lg font-semibold text-gray-900 capitalize">{trade.market}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">交易类型</label>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  trade.type === 'buy' ? 'bg-success-100 text-success-800' : 'bg-danger-100 text-danger-800'
                }`}>
                  {trade.type.toUpperCase()}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">交易价格</label>
                <p className="text-lg font-semibold text-gray-900">${trade.price}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">交易数量</label>
                <p className="text-lg font-semibold text-gray-900">{trade.quantity}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">交易日期</label>
                <p className="text-lg font-semibold text-gray-900">{trade.date}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">风险等级</label>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  trade.riskLevel === 'low' ? 'bg-success-100 text-success-800' :
                  trade.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-danger-100 text-danger-800'
                }`}>
                  {trade.riskLevel}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">状态</label>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  trade.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                  trade.status === 'open' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {trade.status}
                </span>
              </div>
            </div>
          </div>

          {/* AI分析 */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI分析</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">技术分析</label>
                <p className="text-gray-700 mt-1">{trade.aiAnalysis}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">交易策略</label>
                <p className="text-gray-700 mt-1">{trade.strategy}</p>
              </div>
            </div>
          </div>

          {/* AI交互 */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI交互记录</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="mb-3">
                  <label className="text-sm font-medium text-gray-600">您的问题</label>
                  <p className="text-gray-700 mt-1">{trade.userQuestion}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">AI回答</label>
                  <p className="text-gray-700 mt-1">{trade.aiResponse}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 备注 */}
          {trade.notes && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">备注</h2>
              <p className="text-gray-700">{trade.notes}</p>
            </div>
          )}
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 收益信息 */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">收益信息</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">当前收益</span>
                <span className={`font-semibold ${trade.profitLoss && trade.profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                  {trade.profitLoss ? `$${trade.profitLoss}` : '--'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">收益率</span>
                <span className={`font-semibold ${trade.profitLoss && trade.profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                  {trade.profitLoss ? `${((trade.profitLoss / (trade.price * trade.quantity)) * 100).toFixed(2)}%` : '--'}
                </span>
              </div>
            </div>
          </div>

          {/* 标签 */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">标签</h3>
            <div className="flex flex-wrap gap-2">
              {trade.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 相关操作 */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">相关操作</h3>
            <div className="space-y-2">
              <button className="w-full btn-primary">
                更新收益
              </button>
              <button className="w-full btn-secondary">
                添加备注
              </button>
              <button className="w-full btn-secondary">
                导出记录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 