// Stripe Configuration - Switch between Test and Live modes

export interface StripeConfig {
  mode: 'test' | 'live'
  auditPrice: string // $47 payment link
  enterprisePrice: string // $197 payment link
}

// Check if we're in development/test mode
const isTestMode = () => {
  try {
    // PRIORITY 1: Check localStorage for admin test mode
    const adminTestMode = localStorage.getItem('admin_test_mode') === 'true'
    if (adminTestMode) {
      console.log('🧪 Test mode ACTIVE via admin panel')
      return true
    }
    
    // PRIORITY 2: Check if URL contains localhost or test domain
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('test') ||
                         window.location.hostname.includes('staging')
    if (isDevelopment) {
      console.log('🧪 Test mode ACTIVE via development environment')
      return true
    }
    
    console.log('💰 LIVE mode - real payments will be processed')
    return false
  } catch (error) {
    console.error('Error checking test mode:', error)
    // Fail safe - default to test mode if there's an error
    return true
  }
}

// NUCLEAR OPTION: Completely eliminate real Stripe URLs when test mode is on
export const getStripeConfig = (): StripeConfig => {
  // FIRST: Check admin test mode directly here
  const adminTestMode = typeof window !== 'undefined' && localStorage.getItem('admin_test_mode') === 'true'
  
  if (adminTestMode || isTestMode()) {
    console.log('🧪 NUCLEAR TEST MODE: Using dummy URLs - NO REAL STRIPE POSSIBLE!')
    return {
      mode: 'test',
      // DUMMY URLs that will never work - completely safe
      auditPrice: '/payment-success?amount=47&email=test@example.com&name=Test Customer&test=true',
      enterprisePrice: '/payment-success?amount=197&email=test@example.com&name=Test Customer&test=true',
    }
  } else {
    console.log('💰 LIVE MODE: Using real Stripe URLs')
    return {
      mode: 'live',
      // Your current LIVE payment links - only used when test mode is OFF
      auditPrice: 'https://buy.stripe.com/00w3cx0gsgl87oI8lL0co00',
      enterprisePrice: 'https://buy.stripe.com/fZu3cxe7i0ma7oIfOd0co01',
    }
  }
}

// Helper function to get payment URL
export const getPaymentUrl = (tier: 'audit' | 'enterprise'): string => {
  const config = getStripeConfig()
  
  if (tier === 'audit') {
    return config.auditPrice
  } else {
    return config.enterprisePrice
  }
}

// Helper function to check if we're in test mode
export const isInTestMode = (): boolean => {
  return getStripeConfig().mode === 'test'
}
