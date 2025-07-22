import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import FuturesPage from './pages/FuturesPage'
import StocksPage from './pages/StocksPage'
import CryptoPage from './pages/CryptoPage'
import { TerminologyProvider } from './contexts/TerminologyContext'

function App() {
  return (
    <TerminologyProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/futures" element={<FuturesPage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/crypto" element={<CryptoPage />} />
        </Routes>
      </Layout>
    </TerminologyProvider>
  )
}

export default App 