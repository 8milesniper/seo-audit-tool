import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import LandingPage from './components/LandingPage'
import AuditDashboard from './components/AuditDashboard'
import { AuditProvider } from './contexts/AuditContext'
import './App.css'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuditProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/audit" element={<AuditDashboard />} />
            </Routes>
          </div>
        </Router>
      </AuditProvider>
    </ThemeProvider>
  )
}

export default App
