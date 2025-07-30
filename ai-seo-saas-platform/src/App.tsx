import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

// Contexts
import { AuthProvider } from './contexts/AuthContext'
import { PaymentProvider } from './contexts/PaymentContext'
import { AdminProvider } from './contexts/AdminContext'
import { AuditProvider } from './contexts/AuditContext'

// Components
import LandingPage from './components/LandingPage'
import AuditDashboard from './components/AuditDashboard'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import DashboardPage from './components/dashboard/DashboardPage'
import AdminDashboard from './components/admin/AdminDashboard'
import BillingDashboard from './components/billing/BillingDashboard'
import PricingPage from './components/pricing/PricingPage'
import CheckoutPage from './components/payment/CheckoutPage'
import PaymentSuccess from './components/payment/PaymentSuccess'
import AccountPage from './components/account/AccountPage'
import WhiteLabelPage from './components/whitelabel/WhiteLabelPage'

// Layout
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'

import './App.css'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <PaymentProvider>
          <AdminProvider>
            <AuditProvider>
              <Router>
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
                  <Routes>

                    {/* 🔓 Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/audit" element={<AuditDashboard />} />

                    {/* 🔐 Protected Routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <Layout>
                            <DashboardPage />
                          </Layout>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/account" 
                      element={
                        <ProtectedRoute>
                          <Layout>
                            <AccountPage />
                          </Layout>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/checkout/:tierId" 
                      element={
                        <ProtectedRoute>
                          <Layout>
                            <CheckoutPage />
                          </Layout>
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route 
                      path="/white-label" 
                      element={
                        <ProtectedRoute>
                          <Layout>
                            <WhiteLabelPage />
                          </Layout>
                        </ProtectedRoute>
                      } 
                    />

                    {/* 🛡️ Admin Routes */}
                    <Route 
                      path="/admin" 
                      element={
                        <AdminRoute>
                          <Layout>
                            <AdminDashboard />
                          </Layout>
                        </AdminRoute>
                      } 
                    />
                    <Route 
                      path="/billing" 
                      element={
                        <AdminRoute>
                          <Layout>
                            <BillingDashboard />
                          </Layout>
                        </AdminRoute>
                      } 
                    />

                    {/* ⛔ Catch-all redirect */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                    
                  </Routes>

                  {/* 🔔 Global Toast Notifications */}
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#1e293b',
                        color: '#f1f5f9',
                        border: '1px solid #475569',
                      },
                      success: {
                        style: {
                          background: '#059669',
                          color: '#fff',
                        },
                      },
                      error: {
                        style: {
                          background: '#dc2626',
                          color: '#fff',
                        },
                      },
                    }}
                  />
                </div>
              </Router>
            </AuditProvider>
          </AdminProvider>
        </PaymentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default Ap
