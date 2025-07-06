import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'

export interface PricingTier {
  id: string
  name: string
  price: number
  interval: 'one-time' | 'monthly' | 'yearly'
  features: string[]
  auditsLimit: number
  whitelabelEnabled: boolean
  priority: number
  popular?: boolean
  stripePriceId?: string
}

export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled'
  tier: string
  createdAt: string
  stripePaymentIntentId?: string
}

interface PaymentState {
  stripe: Stripe | null
  isLoading: boolean
  error: string | null
  payments: Payment[]
  pricingTiers: PricingTier[]
  currentPayment: Payment | null
}

type PaymentAction = 
  | { type: 'SET_STRIPE'; payload: Stripe }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'UPDATE_PAYMENT'; payload: { id: string; updates: Partial<Payment> } }
  | { type: 'SET_CURRENT_PAYMENT'; payload: Payment | null }

const initialPricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free Audit',
    price: 0,
    interval: 'one-time',
    features: [
      'Basic SEO audit',
      'Core Web Vitals check',
      'Limited AI search analysis',
      'Basic PDF report',
      '5 audits per month'
    ],
    auditsLimit: 5,
    whitelabelEnabled: false,
    priority: 1
  },
  {
    id: 'pro',
    name: 'Pro Audit',
    price: 47,
    interval: 'one-time',
    features: [
      'Complete AI search readiness audit',
      'Google SGE optimization analysis',
      'ChatGPT Search optimization',
      'Perplexity AI readiness check',
      'Bing Copilot optimization',
      'Voice search optimization',
      'Advanced E-E-A-T analysis',
      'Schema markup audit',
      'Professional branded PDF report',
      'Priority email support'
    ],
    auditsLimit: 1,
    whitelabelEnabled: false,
    priority: 2,
    popular: true,
    stripePriceId: 'price_pro_audit'
  },
  {
    id: 'agency',
    name: 'Agency Plan',
    price: 197,
    interval: 'monthly',
    features: [
      'Everything in Pro',
      'Unlimited audits',
      'White-label reports',
      'Custom branding',
      'Bulk audit processing',
      'Agency dashboard',
      'Client management system',
      'API access',
      'Priority support',
      'Training materials',
      'Reseller opportunities'
    ],
    auditsLimit: -1, // Unlimited
    whitelabelEnabled: true,
    priority: 3,
    stripePriceId: 'price_agency_monthly'
  }
]

const initialState: PaymentState = {
  stripe: null,
  isLoading: false,
  error: null,
  payments: [],
  pricingTiers: initialPricingTiers,
  currentPayment: null,
}

function paymentReducer(state: PaymentState, action: PaymentAction): PaymentState {
  switch (action.type) {
    case 'SET_STRIPE':
      return { ...state, stripe: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] }
    case 'UPDATE_PAYMENT':
      return {
        ...state,
        payments: state.payments.map(payment =>
          payment.id === action.payload.id
            ? { ...payment, ...action.payload.updates }
            : payment
        )
      }
    case 'SET_CURRENT_PAYMENT':
      return { ...state, currentPayment: action.payload }
    default:
      return state
  }
}

const PaymentContext = createContext<{
  state: PaymentState
  dispatch: React.Dispatch<PaymentAction>
  initializeStripe: () => Promise<void>
  createPayment: (tierId: string, userId: string) => Promise<Payment>
  processPayment: (paymentId: string, paymentMethodId: string) => Promise<boolean>
  upgradeSubscription: (userId: string, tierId: string) => Promise<void>
} | null>(null)

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(paymentReducer, initialState)

  const initializeStripe = async () => {
    try {
      // In production, use your actual Stripe publishable key
      const stripePromise = loadStripe('pk_test_your_stripe_publishable_key_here')
      const stripe = await stripePromise
      
      if (stripe) {
        dispatch({ type: 'SET_STRIPE', payload: stripe })
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initialize payment system' })
    }
  }

  const createPayment = async (tierId: string, userId: string): Promise<Payment> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const tier = state.pricingTiers.find(t => t.id === tierId)
      if (!tier) {
        throw new Error('Pricing tier not found')
      }

      // Simulate API call to create payment intent
      await new Promise(resolve => setTimeout(resolve, 1000))

      const payment: Payment = {
        id: `payment_${Date.now()}`,
        userId,
        amount: tier.price,
        currency: 'usd',
        status: 'pending',
        tier: tierId,
        createdAt: new Date().toISOString(),
        stripePaymentIntentId: `pi_${Date.now()}`
      }

      dispatch({ type: 'ADD_PAYMENT', payload: payment })
      dispatch({ type: 'SET_CURRENT_PAYMENT', payload: payment })
      dispatch({ type: 'SET_LOADING', payload: false })

      return payment
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const processPayment = async (paymentId: string, paymentMethodId: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate success (90% success rate)
      const success = Math.random() > 0.1

      if (success) {
        dispatch({ 
          type: 'UPDATE_PAYMENT', 
          payload: { 
            id: paymentId, 
            updates: { status: 'succeeded' } 
          }
        })
        dispatch({ type: 'SET_LOADING', payload: false })
        return true
      } else {
        dispatch({ 
          type: 'UPDATE_PAYMENT', 
          payload: { 
            id: paymentId, 
            updates: { status: 'failed' } 
          }
        })
        dispatch({ type: 'SET_ERROR', payload: 'Payment failed. Please try again.' })
        return false
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return false
    }
  }

  const upgradeSubscription = async (userId: string, tierId: string) => {
    try {
      // Simulate API call to upgrade subscription
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // This would update the user's subscription in the database
      console.log(`Upgrading user ${userId} to ${tierId}`)
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  return (
    <PaymentContext.Provider value={{ 
      state, 
      dispatch, 
      initializeStripe, 
      createPayment, 
      processPayment, 
      upgradeSubscription 
    }}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayment() {
  const context = useContext(PaymentContext)
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider')
  }
  return context
}