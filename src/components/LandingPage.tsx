import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Target, Award, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useAudit } from '@/contexts/AuditContext'

const LandingPage = () => {
  const [url, setUrl] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const { dispatch } = useAudit()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleAnalyze = async () => {
    if (!url.trim()) {
      inputRef.current?.focus()
      return
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
    
    if (!validateUrl(normalizedUrl)) {
      alert('Please enter a valid website URL')
      return
    }

    setIsValidating(true)
    
    // Simulate URL validation
    setTimeout(() => {
      dispatch({ type: 'SET_URL', payload: normalizedUrl })
      navigate('/audit')
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze()
    }
  }

  const features = [
    {
      icon: Target,
      title: 'Precision Analysis',
      description: 'AI-powered SEO audit with sniper-like accuracy'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get your SEO score in seconds, not hours'
    },
    {
      icon: Shield,
      title: 'Industry Leading',
      description: 'Superior to competitors with comprehensive insights'
    },
    {
      icon: Award,
      title: 'Actionable Reports',
      description: 'Prioritized recommendations for immediate impact'
    }
  ]

  const benefits = [
    'Comprehensive Core Web Vitals analysis',
    'Advanced backlink profile assessment',
    'Technical SEO issue detection',
    'Mobile-first optimization insights',
    'Competitor comparison data',
    'Branded PDF reports included'
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/8-mile-sniper-logo.png" 
              alt="8 Mile Sniper" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-white">8 Mile Sniper</h1>
              <p className="text-xs text-amber-200">AI-Driven Local Growth</p>
            </div>
          </div>
          {/* Login removed for free lead magnet tool */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Crosshair Background Effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 border-2 border-amber-500 rounded-full relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-500 transform -translate-y-0.5"></div>
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-amber-500 transform -translate-x-0.5"></div>
              <div className="absolute top-1/2 left-1/2 w-8 h-8 border-2 border-amber-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Precision
              </span>
              <br />
              SEO Targeting
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-2xl mx-auto">
              Get a world-class SEO audit that outperforms the competition
            </p>
            
            <p className="text-lg text-amber-400 mb-12 font-semibold">
              Free • Instant • Comprehensive
            </p>

            {/* URL Input Section */}
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Enter your website URL (e.g., example.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-10 h-12 bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                        disabled={isValidating}
                      />
                    </div>
                    <Button 
                      onClick={handleAnalyze}
                      disabled={isValidating}
                      className="h-12 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      {isValidating ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Start FREE Audit</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    No signup required • Instant results • Professional insights
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our SEO Audit Tool?
            </h2>
            <p className="text-xl text-slate-300">
              Superior analysis that goes beyond basic SEO checks
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-amber-400 mb-6">
                Comprehensive Analysis Includes:
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">
                What You'll Get:
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex justify-between">
                  <span>Overall SEO Score</span>
                  <span className="text-amber-400 font-bold">0-100</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Web Vitals</span>
                  <span className="text-amber-400 font-bold">✓</span>
                </div>
                <div className="flex justify-between">
                  <span>Technical Issues Found</span>
                  <span className="text-amber-400 font-bold">Detailed</span>
                </div>
                <div className="flex justify-between">
                  <span>Improvement Recommendations</span>
                  <span className="text-amber-400 font-bold">Prioritized</span>
                </div>
                <div className="flex justify-between">
                  <span>Professional PDF Report</span>
                  <span className="text-amber-400 font-bold">Branded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2025 8 Mile Sniper. All rights reserved. | AI-Driven Local Growth Solutions
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
