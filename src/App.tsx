import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import StocksPage from './pages/StocksPage'
import FuturesPage from './pages/FuturesPage'
import CryptoPage from './pages/CryptoPage'
import TradingRecord from './pages/TradingRecord'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/futures" element={<FuturesPage />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/record/:id" element={<TradingRecord />} />
      </Routes>
    </Layout>
  )
}

export default App 