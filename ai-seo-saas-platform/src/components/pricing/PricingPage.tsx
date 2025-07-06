import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Zap, Crown, Building, ArrowLeft, Star, TestTube } from 'lucide-react'
import { getPaymentUrl, isInTestMode } from '@/config/stripeConfig'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { usePayment } from '@/contexts/PaymentContext'
import toast from 'react-hot-toast'

const PricingPage = () => {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')
  const { state: authState } = useAuth()
  const { createPayment } = usePayment()
  const navigate = useNavigate()

  // NUCLEAR SAFETY: Display current test mode status
  useEffect(() => {
    const testMode = localStorage.getItem('admin_test_mode') === 'true'
    console.log('🔍 PRICING PAGE LOADED - Test Mode:', testMode)
    
    if (testMode) {
      console.log('🧪 NUCLEAR SAFETY ACTIVE: No real Stripe URLs possible!')
    } else {
      console.log('💰 LIVE MODE: Real payments enabled')
    }
  }, [])

  const pricingTiers = [
    {
      id: 'pro',
      name: 'Pro Audit',
      description: 'Complete AI search readiness for serious businesses',
      price: 47,
      yearlyPrice: 47,
      icon: Star,
      features: [
        'Everything in Free',
        'Complete AI search readiness audit',
        'Google SGE optimization analysis',
        'ChatGPT Search optimization',
        'Perplexity AI readiness check',
        'Bing Copilot optimization',
        'Voice search optimization',
        'Advanced E-E-A-T analysis',
        'Complete schema markup audit',
        'Professional branded PDF report',
        'Priority email support',
        'Competitor comparison'
      ],
      limitations: [],
      cta: 'Get Pro Audit',
      popular: true,
      color: 'amber',
      oneTime: true
    },
    {
      id: 'agency',
      name: 'Agency Plan',
      description: 'White-label solution for agencies and enterprises',
      price: 197,
      yearlyPrice: 1970, // 10 months price for yearly
      icon: Building,
      features: [
        'Everything in Pro',
        'Unlimited audits',
        'White-label PDF reports',
        'Custom branding & logos',
        'Bulk audit processing',
        'Agency dashboard',
        'Client management system',
        'API access',
        'Priority phone support',
        'Training materials',
        'Reseller opportunities',
        'Custom domain option',
        'Advanced analytics'
      ],
      limitations: [],
      cta: 'Start Agency Plan',
      popular: false,
      color: 'purple'
    }
  ]

  const handleSelectPlan = async (tier: typeof pricingTiers[0]) => {
    // NUCLEAR OPTION: Always check test mode first and use getPaymentUrl 
    const testModeValue = localStorage.getItem('admin_test_mode')
    const isTestActive = testModeValue === 'true'
    
    console.log('🚨 NUCLEAR PAYMENT CHECK:', {
      testModeValue,
      isTestActive,
      tier: tier.id,
      paymentUrl: tier.id === 'pro' ? getPaymentUrl('audit') : getPaymentUrl('enterprise')
    })

    // Always use getPaymentUrl - it now returns safe URLs when test mode is on
    if (tier.id === 'pro') {
      const paymentUrl = getPaymentUrl('audit')
      console.log('🎯 REDIRECTING TO:', paymentUrl)
      
      if (isTestActive) {
        toast.success('🧪 Test Mode: Simulating $47 payment...')
      } else {
        toast.loading('💰 Processing $47 payment...')
      }
      
      setTimeout(() => {
        window.location.href = paymentUrl
      }, 1000)
      return
    }

    if (tier.id === 'agency') {
      const paymentUrl = getPaymentUrl('enterprise')
      console.log('🎯 REDIRECTING TO:', paymentUrl)
      
      if (isTestActive) {
        toast.success('🧪 Test Mode: Simulating $197 payment...')
      } else {
        toast.loading('💰 Processing $197 payment...')
      }
      
      setTimeout(() => {
        window.location.href = paymentUrl
      }, 1000)
      return
    }

    if (tier.id === 'free') {
      toast.success('Free plan activated!')
      return
    }

    // Fallback for any other plans
    toast.error('Please contact support for this plan')
  }

  const getPrice = (tier: typeof pricingTiers[0]) => {
    return billingInterval === 'yearly' ? tier.yearlyPrice : tier.price
  }

  const getSavings = (tier: typeof pricingTiers[0]) => {
    if (tier.yearlyPrice === tier.price || tier.oneTime) return 0
    return Math.round(((tier.price * 12 - tier.yearlyPrice) / (tier.price * 12)) * 100)
  }

  const getCardStyle = (tier: typeof pricingTiers[0]) => {
    if (tier.popular) {
      return 'border-amber-500 scale-105 shadow-xl shadow-amber-500/20'
    }
    return 'border-slate-700 hover:border-slate-600'
  }

  const getButtonStyle = (tier: typeof pricingTiers[0]) => {
    if (tier.popular) {
      return 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black'
    }
    if (tier.id === 'free') {
      return 'bg-slate-700 hover:bg-slate-600 text-white'
    }
    return 'bg-purple-600 hover:bg-purple-700 text-white'
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            variant="ghost"
            className="mb-6 text-white hover:bg-white/10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your AI Search Advantage
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Get ready for the future of search with the world's first AI search optimization platform. 
            Join thousands of businesses already preparing for 2025.
          </p>

          {/* BULLETPROOF Test Mode Indicator */}
          {localStorage.getItem('admin_test_mode') === 'true' && (
            <div className="mb-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-green-400/40 to-blue-400/40 border-4 border-green-400/70 rounded-2xl p-8 shadow-2xl animate-pulse">
                <div className="flex items-center justify-center gap-4 text-green-200 mb-3">
                  <TestTube className="w-12 h-12 animate-bounce" />
                  <span className="font-bold text-4xl">🧪 TEST MODE ACTIVE</span>
                  <TestTube className="w-12 h-12 animate-bounce" />
                </div>
                <p className="text-2xl text-white text-center font-bold mb-2">
                  🔒 SAFE TESTING ENVIRONMENT
                </p>
                <p className="text-xl text-green-100 text-center font-semibold">
                  ✅ NO REAL PAYMENTS - All transactions will be simulated
                </p>
                <p className="text-lg text-green-200 mt-3 text-center">
                  Perfect for testing without any charges! Click purchase buttons safely.
                </p>
              </div>
            </div>
          )}

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingInterval === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingInterval === 'yearly' ? 'bg-amber-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingInterval === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingInterval === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
              Yearly
            </span>
            {billingInterval === 'yearly' && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>

        {/* LIVE Test Mode Status */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
            <div className="flex items-center justify-center gap-3">
              <span className="text-white font-semibold">Current Mode:</span>
              {localStorage.getItem('admin_test_mode') === 'true' ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-bold">🧪 TEST MODE - Safe to click</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-red-300 font-bold">💰 LIVE MODE - Real charges!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier) => (
            <Card key={tier.id} className={`relative bg-slate-800/50 ${getCardStyle(tier)} transition-all duration-300`}>
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-black font-semibold">
                  MOST POPULAR
                </Badge>
              )}

              <CardHeader className="text-center pb-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-slate-700 rounded-lg flex items-center justify-center">
                  <tier.icon className={`w-6 h-6 ${tier.popular ? 'text-amber-400' : 'text-slate-400'}`} />
                </div>
                <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                <CardDescription className="text-slate-400">{tier.description}</CardDescription>
                
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">${getPrice(tier)}</span>
                    {!tier.oneTime && tier.id !== 'free' && (
                      <span className="text-slate-400 ml-1">
                        /{billingInterval === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                    {tier.oneTime && (
                      <span className="text-slate-400 ml-1">one-time</span>
                    )}
                  </div>
                  {getSavings(tier) > 0 && (
                    <p className="text-green-400 text-sm mt-1">
                      Save {getSavings(tier)}% with yearly billing
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <Button 
                  className={`w-full mb-6 ${getButtonStyle(tier)} ${
                    localStorage.getItem('admin_test_mode') === 'true' 
                      ? 'border-2 border-green-400 shadow-green-400/20 shadow-lg' 
                      : 'border-2 border-red-400 shadow-red-400/20 shadow-lg'
                  }`}
                  onClick={() => {
                    // ULTRA SAFE: Double-confirm before calling handleSelectPlan
                    const testMode = localStorage.getItem('admin_test_mode') === 'true'
                    console.log('🔥 BUTTON CLICKED:', { testMode, tier: tier.id })
                    
                    if (!testMode && tier.id !== 'free') {
                      // Extra safety for live payments
                      const confirmed = window.confirm(
                        `⚠️ WARNING: You are about to make a REAL payment of $${getPrice(tier)}!\n\n` +
                        `Test mode is OFF. This will charge your card.\n\n` +
                        `Click OK to proceed with REAL payment, or Cancel to stop.`
                      )
                      if (!confirmed) {
                        toast.error('Payment cancelled for safety')
                        return
                      }
                    }
                    
                    handleSelectPlan(tier)
                  }}
                  disabled={authState.user?.plan === tier.id}
                >
                  {localStorage.getItem('admin_test_mode') === 'true' && tier.id !== 'free' 
                    ? `🧪 TEST: ${tier.cta}` 
                    : authState.user?.plan === tier.id 
                      ? 'Current Plan' 
                      : tier.cta
                  }
                </Button>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.limitations.length > 0 && (
                    <div>
                      <h4 className="text-slate-400 font-semibold mb-3">Not included:</h4>
                      <ul className="space-y-2">
                        {tier.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-400 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6">
            {[
              {
                q: "What makes this different from other SEO tools?",
                a: "We're the ONLY platform that analyzes your readiness for AI search engines like Google SGE, ChatGPT Search, Perplexity AI, and Bing Copilot. While others focus on traditional SEO, we prepare you for the future of search."
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel your Agency plan subscription at any time. Pro audits are one-time payments with no recurring charges."
              },
              {
                q: "Do you offer white-label solutions?",
                a: "Yes! Our Agency plan includes full white-label capabilities, custom branding, and reseller opportunities for agencies and consultants."
              },
              {
                q: "What AI search engines do you analyze?",
                a: "We analyze readiness for Google SGE (Search Generative Experience), ChatGPT Search, Perplexity AI, Bing Copilot, and other emerging AI-powered search platforms."
              },
              {
                q: "Is there a money-back guarantee?",
                a: "Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund your payment."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                  <p className="text-slate-300">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Dominate AI Search?
          </h2>
          <p className="text-xl text-amber-200 mb-6">
            Join thousands of businesses already preparing for the future of search
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold"
            onClick={() => navigate('/')}
          >
            Start Free Audit Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PricingPage