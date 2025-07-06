import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { User } from './AuthContext'
import { Payment } from './PaymentContext'

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  website?: string
  source: 'landing_page' | 'audit_form' | 'referral' | 'direct'
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  createdAt: string
  lastContactedAt?: string
  notes: string[]
  score: number // Lead scoring 1-100
  auditRequested: boolean
  planInterest?: string
}

export interface AdminStats {
  totalUsers: number
  totalRevenue: number
  monthlyRevenue: number
  totalAudits: number
  monthlyAudits: number
  totalLeads: number
  monthlyLeads: number
  conversionRate: number
  averageRevenuePerUser: number
  churnRate: number
  activeSubscriptions: number
}

export interface AuditUsage {
  id: string
  userId: string
  userName: string
  userEmail: string
  website: string
  plan: string
  createdAt: string
  reportGenerated: boolean
  leadCaptured: boolean
}

interface AdminState {
  isLoading: boolean
  error: string | null
  users: User[]
  leads: Lead[]
  payments: Payment[]
  auditUsage: AuditUsage[]
  stats: AdminStats
  selectedTimeRange: '7d' | '30d' | '90d' | '1y'
}

type AdminAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_LEADS'; payload: Lead[] }
  | { type: 'SET_PAYMENTS'; payload: Payment[] }
  | { type: 'SET_AUDIT_USAGE'; payload: AuditUsage[] }
  | { type: 'SET_STATS'; payload: AdminStats }
  | { type: 'UPDATE_LEAD'; payload: { id: string; updates: Partial<Lead> } }
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'SET_TIME_RANGE'; payload: '7d' | '30d' | '90d' | '1y' }

const initialStats: AdminStats = {
  totalUsers: 1247,
  totalRevenue: 48950,
  monthlyRevenue: 12340,
  totalAudits: 3456,
  monthlyAudits: 892,
  totalLeads: 2156,
  monthlyLeads: 534,
  conversionRate: 23.5,
  averageRevenuePerUser: 39.25,
  churnRate: 4.2,
  activeSubscriptions: 156
}

const initialState: AdminState = {
  isLoading: false,
  error: null,
  users: [],
  leads: [],
  payments: [],
  auditUsage: [],
  stats: initialStats,
  selectedTimeRange: '30d'
}

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_USERS':
      return { ...state, users: action.payload }
    case 'SET_LEADS':
      return { ...state, leads: action.payload }
    case 'SET_PAYMENTS':
      return { ...state, payments: action.payload }
    case 'SET_AUDIT_USAGE':
      return { ...state, auditUsage: action.payload }
    case 'SET_STATS':
      return { ...state, stats: action.payload }
    case 'UPDATE_LEAD':
      return {
        ...state,
        leads: state.leads.map(lead =>
          lead.id === action.payload.id
            ? { ...lead, ...action.payload.updates }
            : lead
        )
      }
    case 'ADD_LEAD':
      return { ...state, leads: [action.payload, ...state.leads] }
    case 'SET_TIME_RANGE':
      return { ...state, selectedTimeRange: action.payload }
    default:
      return state
  }
}

const AdminContext = createContext<{
  state: AdminState
  dispatch: React.Dispatch<AdminAction>
  loadDashboardData: () => Promise<void>
  updateLeadStatus: (leadId: string, status: Lead['status']) => Promise<void>
  addLeadNote: (leadId: string, note: string) => Promise<void>
  exportLeads: () => Promise<void>
  exportAuditData: () => Promise<void>
  sendBulkEmail: (userIds: string[], subject: string, content: string) => Promise<void>
} | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  const loadDashboardData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      // Simulate API calls to load admin data
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock data - in real implementation, this would come from your database
      const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
        id: `user_${i + 1}`,
        email: `user${i + 1}@example.com`,
        name: `User ${i + 1}`,
        company: i % 3 === 0 ? `Company ${i + 1}` : undefined,
        plan: i % 10 === 0 ? 'agency' : i % 3 === 0 ? 'pro' : 'free',
        subscriptionStatus: 'active',
        isAdmin: false,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        lastLoginAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        auditsUsed: Math.floor(Math.random() * 10),
        auditsLimit: i % 10 === 0 ? -1 : i % 3 === 0 ? 50 : 5,
        whitelabelEnabled: i % 10 === 0
      }))

      const mockLeads: Lead[] = Array.from({ length: 30 }, (_, i) => ({
        id: `lead_${i + 1}`,
        name: `Lead ${i + 1}`,
        email: `lead${i + 1}@example.com`,
        phone: i % 2 === 0 ? `+1234567${1000 + i}` : undefined,
        company: i % 3 === 0 ? `Company ${i + 1}` : undefined,
        website: `example${i + 1}.com`,
        source: ['landing_page', 'audit_form', 'referral', 'direct'][i % 4] as Lead['source'],
        status: ['new', 'contacted', 'qualified', 'converted', 'lost'][i % 5] as Lead['status'],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        notes: [],
        score: Math.floor(Math.random() * 100),
        auditRequested: Math.random() > 0.3,
        planInterest: i % 3 === 0 ? ['pro', 'agency'][i % 2] : undefined
      }))

      const mockAuditUsage: AuditUsage[] = Array.from({ length: 100 }, (_, i) => ({
        id: `audit_${i + 1}`,
        userId: `user_${Math.floor(Math.random() * 50) + 1}`,
        userName: `User ${Math.floor(Math.random() * 50) + 1}`,
        userEmail: `user${Math.floor(Math.random() * 50) + 1}@example.com`,
        website: `example${i + 1}.com`,
        plan: ['free', 'pro', 'agency'][i % 3],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        reportGenerated: Math.random() > 0.2,
        leadCaptured: Math.random() > 0.4
      }))

      dispatch({ type: 'SET_USERS', payload: mockUsers })
      dispatch({ type: 'SET_LEADS', payload: mockLeads })
      dispatch({ type: 'SET_AUDIT_USAGE', payload: mockAuditUsage })
      dispatch({ type: 'SET_LOADING', payload: false })
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      dispatch({ 
        type: 'UPDATE_LEAD', 
        payload: { 
          id: leadId, 
          updates: { 
            status, 
            lastContactedAt: new Date().toISOString() 
          } 
        } 
      })
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const addLeadNote = async (leadId: string, note: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const lead = state.leads.find(l => l.id === leadId)
      if (lead) {
        const updatedNotes = [...lead.notes, `${new Date().toISOString()}: ${note}`]
        dispatch({ 
          type: 'UPDATE_LEAD', 
          payload: { 
            id: leadId, 
            updates: { notes: updatedNotes } 
          } 
        })
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const exportLeads = async () => {
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const csvContent = [
        'Name,Email,Phone,Company,Website,Status,Score,Created',
        ...state.leads.map(lead => 
          `${lead.name},${lead.email},${lead.phone || ''},${lead.company || ''},${lead.website || ''},${lead.status},${lead.score},${lead.createdAt}`
        )
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const exportAuditData = async () => {
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const csvContent = [
        'Website,User,Email,Plan,Created,Report Generated,Lead Captured',
        ...state.auditUsage.map(audit => 
          `${audit.website},${audit.userName},${audit.userEmail},${audit.plan},${audit.createdAt},${audit.reportGenerated},${audit.leadCaptured}`
        )
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `audit_data_export_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const sendBulkEmail = async (userIds: string[], subject: string, content: string) => {
    try {
      // Simulate bulk email sending
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log(`Sending email to ${userIds.length} users`)
      console.log('Subject:', subject)
      console.log('Content:', content)
      
      // In real implementation, this would integrate with your email service
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  return (
    <AdminContext.Provider value={{ 
      state, 
      dispatch, 
      loadDashboardData,
      updateLeadStatus,
      addLeadNote,
      exportLeads,
      exportAuditData,
      sendBulkEmail
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}