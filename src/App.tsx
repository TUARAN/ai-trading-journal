import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import { TerminologyProvider } from './contexts/TerminologyContext'

function App() {
  return (
    <TerminologyProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </TerminologyProvider>
  )
}

export default App 