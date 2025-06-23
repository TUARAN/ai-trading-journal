import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type TerminologyMode = 'display' | 'actual'

interface TerminologyContextType {
  mode: TerminologyMode
  toggleMode: () => void
  getTerm: (path: string) => string
  getSystemInfo: () => { name: string; description: string; subtitle: string }
  getDatasetInfo: (dataset: 'datasetA' | 'datasetB' | 'datasetC') => { name: string; description: string }
  getMetricInfo: (metric: string) => string
  getOperationInfo: (operation: string) => string
  getPageInfo: (page: string) => string
  getActionInfo: (action: string) => string
  getStatusInfo: (status: string) => string
  getSystemStatusInfo: (status: string) => string
  getActivityInfo: (activity: string) => string
  getFilterInfo: (filter: string) => string
}

const TerminologyContext = createContext<TerminologyContextType | undefined>(undefined)

// 术语映射数据
const terminologyMapping = {
  "system": {
    "display": {
      "name": "AI+BS 数据分析系统",
      "description": "智能数据分析 · 实时监控 · 专业洞察",
      "subtitle": "智能数据分析 · 实时监控 · 专业洞察"
    },
    "actual": {
      "name": "AI+BS 交易系统",
      "description": "智能交易分析 · 实时监控 · 专业管理",
      "subtitle": "智能交易分析 · 实时监控 · 专业管理"
    }
  },
  "datasets": {
    "datasetA": {
      "display": "数据集A",
      "actual": "股票市场",
      "description": {
        "display": "结构化数据分析和处理记录",
        "actual": "股票交易记录和分析"
      }
    },
    "datasetB": {
      "display": "数据集B",
      "actual": "期货市场",
      "description": {
        "display": "时序数据分析和处理记录",
        "actual": "期货交易记录和分析"
      }
    },
    "datasetC": {
      "display": "数据集C",
      "actual": "加密货币市场",
      "description": {
        "display": "非结构化数据分析和处理记录",
        "actual": "加密货币交易记录和分析"
      }
    }
  },
  "metrics": {
    "totalDataVolume": {
      "display": "总数据量",
      "actual": "总资产规模"
    },
    "processingSpeed": {
      "display": "处理速度",
      "actual": "交易频率"
    },
    "accuracy": {
      "display": "准确率",
      "actual": "胜率"
    },
    "anomalyRate": {
      "display": "异常率",
      "actual": "亏损率"
    },
    "totalRecords": {
      "display": "总记录数",
      "actual": "总交易数"
    },
    "successRecords": {
      "display": "成功记录",
      "actual": "盈利交易"
    },
    "totalVolume": {
      "display": "处理总量",
      "actual": "交易总量"
    },
    "totalProfit": {
      "display": "总收益",
      "actual": "总盈亏"
    },
    "totalInteractions": {
      "display": "总交互数",
      "actual": "总咨询数"
    },
    "positiveFeedback": {
      "display": "正面反馈",
      "actual": "正面评价"
    },
    "negativeFeedback": {
      "display": "负面反馈",
      "actual": "负面评价"
    },
    "aiResponses": {
      "display": "AI回答",
      "actual": "AI建议"
    }
  },
  "operations": {
    "dataInput": {
      "display": "数据输入",
      "actual": "买入"
    },
    "dataOutput": {
      "display": "数据输出",
      "actual": "卖出"
    },
    "dataRecord": {
      "display": "数据记录",
      "actual": "交易记录"
    },
    "dataIdentifier": {
      "display": "数据标识",
      "actual": "交易代码"
    },
    "processingType": {
      "display": "处理类型",
      "actual": "交易类型"
    },
    "dataVolume": {
      "display": "数据量",
      "actual": "交易数量"
    },
    "processingResult": {
      "display": "处理结果",
      "actual": "盈亏结果"
    },
    "processingTime": {
      "display": "处理时间",
      "actual": "交易时间"
    }
  },
  "pages": {
    "tradingRecord": {
      "display": "处理记录",
      "actual": "交易记录"
    },
    "description": {
      "display": "查看和管理所有数据处理记录",
      "actual": "查看和管理所有交易记录"
    }
  },
  "actions": {
    "addRecord": {
      "display": "新建记录",
      "actual": "新建交易"
    },
    "exportData": {
      "display": "导出数据",
      "actual": "导出记录"
    },
    "viewDetails": {
      "display": "查看详情",
      "actual": "查看详情"
    },
    "editRecord": {
      "display": "编辑记录",
      "actual": "编辑交易"
    },
    "deleteRecord": {
      "display": "删除记录",
      "actual": "删除交易"
    }
  },
  "status": {
    "open": {
      "display": "处理中",
      "actual": "持仓中"
    },
    "closed": {
      "display": "已完成",
      "actual": "已平仓"
    },
    "cancelled": {
      "display": "已取消",
      "actual": "已取消"
    }
  },
  "systemStatus": {
    "aiEngine": {
      "display": "AI引擎",
      "actual": "AI分析引擎"
    },
    "dataProcessing": {
      "display": "数据处理",
      "actual": "交易执行"
    },
    "storageSystem": {
      "display": "存储系统",
      "actual": "资金管理"
    },
    "networkConnection": {
      "display": "网络连接",
      "actual": "交易连接"
    }
  },
  "activities": {
    "datasetAUpdate": {
      "display": "数据集A更新完成",
      "actual": "股票交易完成"
    },
    "aiModelTraining": {
      "display": "AI模型训练完成",
      "actual": "AI策略优化完成"
    },
    "anomalyDetection": {
      "display": "异常检测触发",
      "actual": "风险预警触发"
    },
    "systemMaintenance": {
      "display": "系统维护完成",
      "actual": "账户整理完成"
    }
  },
  "filters": {
    "allDatasets": {
      "display": "所有数据集",
      "actual": "所有市场"
    },
    "allStatus": {
      "display": "全部状态",
      "actual": "全部状态"
    }
  }
}

export const TerminologyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<TerminologyMode>('display')

  // 从localStorage读取模式设置
  useEffect(() => {
    const savedMode = localStorage.getItem('terminologyMode') as TerminologyMode
    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  // 切换模式
  const toggleMode = () => {
    const newMode = mode === 'display' ? 'actual' : 'display'
    console.log('Toggling mode from', mode, 'to', newMode)
    setMode(newMode)
    localStorage.setItem('terminologyMode', newMode)
  }

  // 获取术语
  const getTerm = (path: string) => {
    const keys = path.split('.')
    let current: any = terminologyMapping
    
    for (const key of keys) {
      if (current && current[key]) {
        current = current[key]
      } else {
        return path
      }
    }
    
    if (current && typeof current === 'object' && current[mode]) {
      return current[mode]
    }
    
    if (typeof current === 'string') {
      return current
    }
    
    return path
  }

  // 获取系统信息
  const getSystemInfo = () => {
    return {
      name: getTerm(`system.${mode}.name`),
      description: getTerm(`system.${mode}.description`),
      subtitle: getTerm(`system.${mode}.subtitle`)
    }
  }

  // 获取数据集信息
  const getDatasetInfo = (dataset: 'datasetA' | 'datasetB' | 'datasetC') => {
    return {
      name: getTerm(`datasets.${dataset}.${mode}`),
      description: getTerm(`datasets.${dataset}.description.${mode}`)
    }
  }

  // 获取指标信息
  const getMetricInfo = (metric: string) => {
    return getTerm(`metrics.${metric}.${mode}`)
  }

  // 获取操作信息
  const getOperationInfo = (operation: string) => {
    return getTerm(`operations.${operation}.${mode}`)
  }

  // 获取页面信息
  const getPageInfo = (page: string) => {
    return getTerm(`pages.${page}.${mode}`)
  }

  // 获取操作按钮信息
  const getActionInfo = (action: string) => {
    return getTerm(`actions.${action}.${mode}`)
  }

  // 获取状态信息
  const getStatusInfo = (status: string) => {
    return getTerm(`status.${status}.${mode}`)
  }

  // 获取系统状态信息
  const getSystemStatusInfo = (status: string) => {
    return getTerm(`systemStatus.${status}.${mode}`)
  }

  // 获取活动信息
  const getActivityInfo = (activity: string) => {
    return getTerm(`activities.${activity}.${mode}`)
  }

  // 获取过滤器信息
  const getFilterInfo = (filter: string) => {
    return getTerm(`filters.${filter}.${mode}`)
  }

  const value = {
    mode,
    toggleMode,
    getTerm,
    getSystemInfo,
    getDatasetInfo,
    getMetricInfo,
    getOperationInfo,
    getPageInfo,
    getActionInfo,
    getStatusInfo,
    getSystemStatusInfo,
    getActivityInfo,
    getFilterInfo
  }

  return (
    <TerminologyContext.Provider value={value}>
      {children}
    </TerminologyContext.Provider>
  )
}

export const useTerminology = () => {
  const context = useContext(TerminologyContext)
  if (context === undefined) {
    throw new Error('useTerminology must be used within a TerminologyProvider')
  }
  return context
} 