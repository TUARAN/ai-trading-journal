import React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useTerminology } from '../contexts/TerminologyContext'

export const TerminologyToggle: React.FC = () => {
  const { mode, toggleMode } = useTerminology()

  const handleClick = () => {
    console.log('TerminologyToggle clicked, current mode:', mode)
    toggleMode()
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
      title={mode === 'display' ? '切换到BS模式' : '切换到数据分析模式'}
    >
      {mode === 'display' ? (
        <>
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">BS模式</span>
        </>
      ) : (
        <>
          <EyeOff className="h-4 w-4" />
          <span className="text-sm font-medium">分析模式</span>
        </>
      )}
    </button>
  )
} 