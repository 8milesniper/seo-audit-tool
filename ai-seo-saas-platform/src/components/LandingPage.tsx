import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Target, 
  Award, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Brain, 
  Mic, 
  Bot,
  Star,
  Users,
  TrendingUp,
  Play,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAudit } from '@/contexts/AuditContext'
import { useAuth } from '@/contexts/AuthContext'

const LandingPage = () => {
  const [url, setUrl] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const { dispatch } = useAudit()
  const { state: authState } = useAuth()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-fill URL from admin test panel
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const testUrl = urlParams.get('url')
    if (testUrl) {
      setUrl(testUrl)
      // Auto-scroll to the form if coming from admin test
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth' })
        inputRef.current?.focus()
      }, 500)
    }
  }, [])

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

  const aiSearchFeatures = [
    {
      icon: Brain,
      title: 'Google SGE Ready',
      description: 'Optimize for Search Generative Experience',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Bot,
      title: 'ChatGPT Search',
      description: 'Prepare for ChatGPT Search integration',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Search,
      title: 'Perplexity AI',
      description: 'Get featured in AI-powered search results',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Mic,
      title: 'Bing Copilot',
      description: 'Voice search optimization',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const benefits = [
    'Complete AI search readiness analysis',
    'Google SGE optimization recommendations',
    'ChatGPT Search content optimization',
    'Perplexity AI ranking factors',
    'Bing Copilot voice search prep',
    'Advanced E-E-A-T scoring',
    'Schema markup for AI understanding',
    'Core Web Vitals 2025 standards',
    'Professional branded PDF reports'
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'Marketing Director',
      content: 'This tool helped us prepare for AI search before our competitors even knew it existed. Our traffic increased 340% in 3 months.',
      rating: 5,
      avatar: '/images/team-meeting.jpg'
    },
    {
      name: 'Mike Chen',
      company: 'Digital Agency Pro',
      role: 'SEO Specialist',
      content: 'The white-label reports are incredible. We\'ve signed 15 new clients just by showing them their AI search readiness scores.',
      rating: 5,
      avatar: '/images/business-growth.jpg'
    }
  ]

  const pricingTiers = [
    {
      name: 'Free Audit',
      price: 0,
      description: 'Get started with basic SEO analysis',
      features: ['Basic SEO audit', 'Core Web Vitals', 'Limited AI analysis', '5 audits/month'],
      cta: 'Start Free Audit',
      popular: false
    },
    {
      name: 'Pro Audit',
      price: 47,
      description: 'Complete AI search readiness analysis',
      features: ['Everything in Free', 'Full AI search analysis', 'Google SGE optimization', 'ChatGPT + Perplexity ready', 'Branded PDF report'],
      cta: 'Get Pro Audit',
      popular: true
    },
    {
      name: 'Agency Plan',
      price: 197,
      period: '/month',
      description: 'White-label solution for agencies',
      features: ['Everything in Pro', 'Unlimited audits', 'White-label reports', 'Custom branding', 'API access', 'Priority support'],
      cta: 'Start Agency Plan',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/8-mile-sniper-logo.png" 
              alt="AI SEO Audit Platform" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-white">SEO & AI Audit Platform</h1>
              <p className="text-xs text-amber-200">2025 SEO + AI Search Optimization</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate('/pricing')}>
              Pricing
            </Button>
            {authState.isAuthenticated ? (
              <Button onClick={() => navigate('/dashboard')} className="bg-amber-500 hover:bg-amber-600 text-black">
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')} className="bg-amber-500 hover:bg-amber-600 text-black">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-amber-500/20 text-amber-400 border-amber-500/30">
              🚀 WORLD'S FIRST AI SEARCH OPTIMIZATION TOOL
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                SEO & AI Search
              </span>
              <span className="block">Domination in 2025</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto">
              The <strong>ONLY</strong> comprehensive SEO & AI audit tool that analyzes traditional SEO + your readiness for Google SGE, ChatGPT Search, Perplexity AI, and Bing Copilot. 
              <span className="text-amber-400"> Get the complete picture: SEO excellence meets AI search dominance.</span>
            </p>

            {/* AI Search Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {aiSearchFeatures.map((feature, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* URL Input Section */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm max-w-3xl mx-auto mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Start Your FREE SEO & AI Search Readiness Audit
                </h3>
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
                      className="pl-10 h-14 bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500 text-lg"
                      disabled={isValidating}
                    />
                  </div>
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isValidating}
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg transition-all duration-200 transform hover:scale-105"
                  >
                    {isValidating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Get FREE AI Audit</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-400 mt-4 text-center">
                  ✅ No signup required • ✅ Instant results • ✅ Professional insights • ✅ 2025 AI search ready
                </p>
              </CardContent>
            </Card>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>10,000+ websites analyzed</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Average 340% traffic increase</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>4.9/5 rating from 500+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Value Proposition */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why We're the <span className="text-amber-400">ONLY Choice</span> for 2025
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              While others are stuck analyzing yesterday's SEO, we're the only platform preparing businesses for tomorrow's AI-powered search landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-amber-400 mb-6">
                Complete 2025 AI Search Analysis:
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="/images/ai-technology.jpg" 
                alt="AI Search Technology" 
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Success Stories from Real Businesses
            </h2>
            <p className="text-xl text-slate-300">
              See how businesses are already winning with AI search optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-lg mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-slate-400">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your AI Search Advantage
            </h2>
            <p className="text-xl text-slate-300">
              Start free, upgrade when you're ready to dominate AI search
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'border-amber-500 scale-105' : 'border-slate-700'} bg-slate-800/50`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-black">
                    MOST POPULAR
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold text-amber-400">
                    ${tier.price}
                    {tier.period && <span className="text-lg text-slate-400">{tier.period}</span>}
                  </div>
                  <p className="text-slate-400">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-amber-500" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}
                    onClick={() => {
                      if (tier.price === 0) {
                        inputRef.current?.focus()
                      } else if (tier.name === 'Pro Audit') {
                        // $47 SEO Audit - redirect to Stripe
                        window.location.href = 'https://buy.stripe.com/00w3cx0gsgl87oI8lL0co00'
                      } else if (tier.name === 'Agency Plan') {
                        // $197/month Enterprise - redirect to Stripe
                        window.location.href = 'https://buy.stripe.com/fZu3cxe7i0ma7oIfOd0co01'
                      }
                    }}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Don't Get Left Behind in the AI Search Revolution
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            While your competitors are still optimizing for traditional search, you'll be dominating the AI-powered future. Start your free audit now and see exactly where you stand.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xl px-12 py-6"
            onClick={() => inputRef.current?.focus()}
          >
            Start FREE AI Search Audit Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">AI SEO Platform</h3>
              <p className="text-slate-400">
                The world's first AI search optimization platform. Prepare your business for the future of search.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => navigate('/pricing')}>Pricing</button></li>
                <li><button onClick={() => navigate('/audit')}>Free Audit</button></li>
                <li><button onClick={() => navigate('/white-label')}>White Label</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">AI Search</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Google SGE Optimization</li>
                <li>ChatGPT Search Prep</li>
                <li>Perplexity AI Ready</li>
                <li>Bing Copilot Optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>API Documentation</li>
                <li>Training Materials</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>© 2025 AI SEO Platform. All rights reserved. | The future of search optimization starts here.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage