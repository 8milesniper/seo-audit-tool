import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  company?: string
  phone?: string
  plan: 'free' | 'pro' | 'agency'
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'cancelled'
  subscriptionEndDate?: string
  isAdmin: boolean
  createdAt: string
  lastLoginAt: string
  auditsUsed: number
  auditsLimit: number
  whitelabelEnabled: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'LOGOUT':
      return { ...initialState, isLoading: false }
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      }
    default:
      return state
  }
}

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for existing session
        const token = localStorage.getItem('authToken')
        const userData = localStorage.getItem('userData')
        
        if (token && userData) {
          const user = JSON.parse(userData)
          dispatch({ type: 'SET_USER', payload: user })
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Simulate API call - in real implementation, this would be Firebase or your auth service
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data based on email
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
        plan: email.includes('admin') ? 'agency' : 'free',
        subscriptionStatus: 'active',
        isAdmin: email.includes('admin'),
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        auditsUsed: 0,
        auditsLimit: email.includes('admin') ? 1000 : 5,
        whitelabelEnabled: email.includes('admin')
      }

      localStorage.setItem('authToken', `token_${mockUser.id}`)
      localStorage.setItem('userData', JSON.stringify(mockUser))
      
      dispatch({ type: 'SET_USER', payload: mockUser })
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const register = async (userData: Partial<User>, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email!,
        name: userData.name!,
        company: userData.company,
        phone: userData.phone,
        plan: 'free',
        subscriptionStatus: 'trial',
        isAdmin: false,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        auditsUsed: 0,
        auditsLimit: 5,
        whitelabelEnabled: false
      }

      localStorage.setItem('authToken', `token_${newUser.id}`)
      localStorage.setItem('userData', JSON.stringify(newUser))
      
      dispatch({ type: 'SET_USER', payload: newUser })
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const logout = async () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    dispatch({ type: 'LOGOUT' })
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedUserData = { ...state.user, ...data }
      localStorage.setItem('userData', JSON.stringify(updatedUserData))
      
      dispatch({ type: 'UPDATE_USER', payload: data })
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  return (
    <AuthContext.Provider value={{ 
      state, 
      dispatch, 
      login, 
      register, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}