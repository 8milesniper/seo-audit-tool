import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { 
  CreditCard, 
  Lock, 
  Check, 
  ArrowLeft,
  Shield,
  Zap
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { usePayment } from '@/contexts/PaymentContext'

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().min(3, 'CVV must be at least 3 digits'),
  billingName: z.string().min(2, 'Billing name is required'),
  billingEmail: z.string().email('Valid email is required'),
})

type PaymentFormData = z.infer<typeof paymentSchema>

const CheckoutPage = () => {
  const { tierId } = useParams<{ tierId: string }>()
  const [processing, setProcessing] = useState(false)
  const { state: authState } = useAuth()
  const { state: paymentState, createPayment, processPayment } = usePayment()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      billingName: authState.user?.name || '',
      billingEmail: authState.user?.email || '',
    }
  })

  const pricingTiers = {
    'pro': {
      name: 'Pro Audit',
      price: 47,
      description: 'Complete AI search readiness analysis',
      features: [
        'Complete AI search readiness audit',
        'Google SGE optimization analysis',
        'ChatGPT Search optimization',
        'Perplexity AI readiness check',
        'Bing Copilot optimization',
        'Professional branded PDF report'
      ]
    },
    'agency': {
      name: 'Agency Plan',
      price: 197,
      description: 'White-label solution for agencies',
      features: [
        'Everything in Pro',
        'Unlimited audits',
        'White-label reports',
        'Custom branding',
        'API access',
        'Priority support'
      ]
    }
  }

  const currentTier = pricingTiers[tierId as keyof typeof pricingTiers]

  useEffect(() => {
    if (!currentTier) {
      navigate('/pricing')
      return
    }
  }, [currentTier, navigate])

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    
    return v
  }

  const onSubmit = async (data: PaymentFormData) => {
    if (!currentTier || !authState.user) return

    setProcessing(true)
    
    try {
      // Create payment intent
      const payment = await createPayment(tierId!, authState.user.id)
      
      // Simulate payment processing
      const success = await processPayment(payment.id, 'mock_payment_method')
      
      if (success) {
        toast.success('Payment successful! Welcome to your new plan!')
        navigate('/dashboard')
      } else {
        toast.error('Payment failed. Please try again.')
      }
    } catch (error: any) {
      toast.error(error.message || 'Payment failed')
    } finally {
      setProcessing(false)
    }
  }

  if (!currentTier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Plan Not Found</h1>
          <p className="text-slate-400 mb-6">The requested pricing plan could not be found.</p>
          <Button onClick={() => navigate('/pricing')} className="bg-amber-500 hover:bg-amber-600 text-black">
            View Pricing Plans
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Button
          variant="ghost"
          className="mb-6 text-white hover:bg-white/10"
          onClick={() => navigate('/pricing')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Order Summary</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Review your selected plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{currentTier.name}</h3>
                      <p className="text-slate-400 text-sm">{currentTier.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-400">${currentTier.price}</div>
                      <p className="text-slate-400 text-sm">
                        {tierId === 'pro' ? 'one-time' : 'per month'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Includes:</h4>
                    {currentTier.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                    {currentTier.features.length > 3 && (
                      <p className="text-slate-400 text-sm">
                        + {currentTier.features.length - 3} more features
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-amber-400">${currentTier.price}</span>
                  </div>
                </div>

                {/* Security badges */}
                <div className="flex items-center justify-center space-x-4 pt-4">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs">SSL Secure</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs">256-bit Encryption</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span>Payment Details</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Enter your payment information securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Card Information */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Card Information</h3>
                  
                  <div className="space-y-2">
                    <label htmlFor="cardNumber" className="text-sm font-medium text-slate-300">
                      Card Number
                    </label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                      {...register('cardNumber')}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        setValue('cardNumber', formatted)
                      }}
                      maxLength={19}
                    />
                    {errors.cardNumber && (
                      <p className="text-sm text-red-400">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="expiryDate" className="text-sm font-medium text-slate-300">
                        Expiry Date
                      </label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                        {...register('expiryDate')}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value)
                          setValue('expiryDate', formatted)
                        }}
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="text-sm text-red-400">{errors.expiryDate.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="cvv" className="text-sm font-medium text-slate-300">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                        {...register('cvv')}
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="text-sm text-red-400">{errors.cvv.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Billing Information</h3>
                  
                  <div className="space-y-2">
                    <label htmlFor="billingName" className="text-sm font-medium text-slate-300">
                      Full Name
                    </label>
                    <Input
                      id="billingName"
                      placeholder="Enter your full name"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                      {...register('billingName')}
                    />
                    {errors.billingName && (
                      <p className="text-sm text-red-400">{errors.billingName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="billingEmail" className="text-sm font-medium text-slate-300">
                      Email Address
                    </label>
                    <Input
                      id="billingEmail"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                      {...register('billingEmail')}
                    />
                    {errors.billingEmail && (
                      <p className="text-sm text-red-400">{errors.billingEmail.message}</p>
                    )}
                  </div>
                </div>

                {/* Terms */}
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <p className="text-slate-400 text-sm">
                    By completing this purchase, you agree to our{' '}
                    <button className="text-amber-400 hover:text-amber-300">Terms of Service</button>
                    {' '}and{' '}
                    <button className="text-amber-400 hover:text-amber-300">Privacy Policy</button>.
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold py-3"
                  disabled={processing || paymentState.isLoading}
                >
                  {processing || paymentState.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Complete Payment - ${currentTier.price}</span>
                    </div>
                  )}
                </Button>

                {paymentState.error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                    <p className="text-red-400 text-sm">{paymentState.error}</p>
                  </div>
                )}
              </form>

              {/* Demo Notice */}
              <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-md">
                <p className="text-blue-400 text-sm">
                  <strong>Demo Mode:</strong> This is a demonstration checkout. No real charges will be made.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage