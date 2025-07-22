import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Database, 
  Cpu, 
  BarChart3,
  LineChart,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  Target,
  Globe,
  Server
} from 'lucide-react'
import { useTerminology } from '../contexts/TerminologyContext'

export default function Dashboard() {
  const { mode, getSystemInfo, getMetricInfo, getSystemStatusInfo, getActivityInfo, getDatasetInfo } = useTerminology()
  const systemInfo = getSystemInfo()

  // 调试信息
  console.log('Current mode:', mode)
  console.log('System info:', systemInfo)
  console.log('Dataset A:', getDatasetInfo('datasetA'))
  console.log('Dataset B:', getDatasetInfo('datasetB'))
  console.log('Dataset C:', getDatasetInfo('datasetC'))

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">{systemInfo.name}</h1>
        <p className="text-gray-600 mt-1">{systemInfo.description}</p>
        {/* 调试信息 */}
        <div className="mt-2 p-2 bg-yellow-100 rounded text-sm">
          <strong>当前模式:</strong> {mode === 'display' ? '分析模式' : 'BS模式'} 
          | 数据集A: {getDatasetInfo('datasetA').name}
          | 数据集B: {getDatasetInfo('datasetB').name}
          | 数据集C: {getDatasetInfo('datasetC').name}
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-blue-100">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('totalDataVolume')}</p>
              <p className="text-2xl font-bold text-gray-900">2.4TB</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+12.5%</span>
                <span className="text-sm text-gray-500 ml-2">较昨日</span>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-green-100">
              <Cpu className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('processingSpeed')}</p>
              <p className="text-2xl font-bold text-gray-900">1.2M/s</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+8.3%</span>
                <span className="text-sm text-gray-500 ml-2">较昨日</span>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-purple-100">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('accuracy')}</p>
              <p className="text-2xl font-bold text-gray-900">94.7%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+2.1%</span>
                <span className="text-sm text-gray-500 ml-2">较昨日</span>
              </div>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center">
            <div className="metric-icon bg-orange-100">
              <Activity className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{getMetricInfo('anomalyRate')}</p>
              <p className="text-2xl font-bold text-gray-900">0.8%</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">-0.3%</span>
                <span className="text-sm text-gray-500 ml-2">较昨日</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 数据概览和图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 数据流监控 */}
        <div className="lg:col-span-2">
          <div className="data-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">实时数据流监控</h3>
              <div className="flex items-center space-x-2">
                <div className="status-indicator status-online"></div>
                <span className="text-sm text-gray-600">实时</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Server className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{getDatasetInfo('datasetA').name}</div>
                    <div className="text-sm text-gray-500">{getDatasetInfo('datasetA').description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">856.2K</div>
                  <div className="text-sm text-green-600">+15.3%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{getDatasetInfo('datasetB').name}</div>
                    <div className="text-sm text-gray-500">{getDatasetInfo('datasetB').description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">1.2M</div>
                  <div className="text-sm text-green-600">+8.7%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">{getDatasetInfo('datasetC').name}</div>
                    <div className="text-sm text-gray-500">{getDatasetInfo('datasetC').description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">432.8K</div>
                  <div className="text-sm text-green-600">+12.1%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 系统状态 */}
        <div>
          <div className="data-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">系统状态</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">{getSystemStatusInfo('aiEngine')}</span>
                </div>
                <span className="text-sm font-medium text-green-600">运行中</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">{getSystemStatusInfo('dataProcessing')}</span>
                </div>
                <span className="text-sm font-medium text-green-600">正常</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700">{getSystemStatusInfo('storageSystem')}</span>
                </div>
                <span className="text-sm font-medium text-green-600">正常</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="text-sm text-gray-700">{getSystemStatusInfo('networkConnection')}</span>
                </div>
                <span className="text-sm font-medium text-yellow-600">注意</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">最后更新</span>
                <span className="text-gray-900">2分钟前</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 分析报告区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 数据质量分析 */}
        <div className="data-card shadow-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2 px-6 pt-6">
            <h3 className="text-lg font-semibold text-gray-900">数据质量分析</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4 px-6 pb-6">
            {[
              { label: '完整性', value: '92%', color: 'bg-green-600', width: '92%' },
              { label: '准确性', value: '94.7%', color: 'bg-blue-600', width: '94.7%' },
              { label: '一致性', value: '89%', color: 'bg-purple-600', width: '89%' },
              { label: '及时性', value: '96%', color: 'bg-orange-600', width: '96%' },
            ].map((item, idx) => (
              <div key={item.label} className={`flex items-center justify-between px-4 py-3 rounded-lg ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}>
                <span className="text-sm text-gray-600">{item.label}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2 overflow-hidden">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: item.width }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 处理性能统计 */}
        <div className="data-card shadow-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2 px-6 pt-6">
            <h3 className="text-lg font-semibold text-gray-900">处理性能统计</h3>
            <LineChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4 px-6 pb-6">
            {[
              { label: '平均响应时间', desc: 'API调用', value: '127ms', change: '-12ms' },
              { label: '并发处理', desc: '同时处理任务', value: '1,247', change: '+23' },
              { label: '缓存命中率', desc: '数据缓存', value: '87.3%', change: '+2.1%' },
            ].map((item, idx) => (
              <div key={item.label} className={`flex items-center justify-between px-4 py-3 rounded-lg ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}>
                <div>
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{item.value}</div>
                  <div className="text-sm text-green-600">{item.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="data-card shadow-lg border border-blue-100 bg-white mt-6">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2 px-6 pt-6">
          <h3 className="text-lg font-semibold text-blue-700">最近活动</h3>
          <Clock className="h-5 w-5 text-blue-400" />
        </div>
        <div className="divide-y divide-gray-100 rounded-lg overflow-hidden px-6 pb-6">
          {[
            { color: 'bg-green-500', title: getActivityInfo('datasetAUpdate'), desc: '新增 125,432 条记录', time: '2分钟前' },
            { color: 'bg-blue-500', title: getActivityInfo('aiModelTraining'), desc: '准确率提升至 94.7%', time: '15分钟前' },
            { color: 'bg-purple-500', title: getActivityInfo('anomalyDetection'), desc: `${getDatasetInfo('datasetB').name}中发现 3 个异常点`, time: '32分钟前' },
            { color: 'bg-orange-500', title: getActivityInfo('systemMaintenance'), desc: '性能优化完成', time: '1小时前' },
          ].map((item, idx) => (
            <div key={item.title} className={`flex items-center space-x-3 px-4 py-4 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}>
              <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
              <div className="text-xs text-gray-400">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 