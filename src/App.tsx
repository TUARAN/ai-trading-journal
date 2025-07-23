import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TradingAssistant from './pages/TradingAssistant'
import TradingRecords from './pages/TradingRecords'
import MarketAnalysis from './pages/MarketAnalysis'
import Portfolio from './pages/Portfolio'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistant" element={<TradingAssistant />} />
        <Route path="/records" element={<TradingRecords />} />
        <Route path="/analysis" element={<MarketAnalysis />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Layout>
  )
}

export default App 