import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Mail, Phone, User, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAudit } from '@/contexts/AuditContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SEOScoreGauge from './SEOScoreGauge'
import MetricsBreakdown from './MetricsBreakdown'
import IssuesPanel from './IssuesPanel'
import { performSEOAnalysis } from '@/services/seoAnalysis'
import { generatePDFReport } from '@/services/reportGenerator'

const AuditDashboard = () => {
  const { state, dispatch } = useAudit()
  const navigate = useNavigate()
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  })

  useEffect(() => {
    if (!state.url) {
      navigate('/')
      return
    }

    if (!state.metrics && !state.isAnalyzing) {
      startAnalysis()
    }
  }, [state.url])

  const startAnalysis = async () => {
    dispatch({ type: 'START_ANALYSIS' })
    
    // Simulate progressive analysis
    const steps = [
      { progress: 15, message: 'Analyzing page speed and Core Web Vitals...' },
      { progress: 30, message: 'Checking mobile-friendliness and responsiveness...' },
      { progress: 45, message: 'Scanning technical SEO elements...' },
      { progress: 60, message: 'Evaluating on-page optimization...' },
      { progress: 75, message: 'Analyzing backlink profile...' },
      { progress: 90, message: 'Generating comprehensive report...' },
      { progress: 100, message: 'Analysis complete!' }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      dispatch({ type: 'UPDATE_PROGRESS', payload: step.progress })
    }

    // Perform actual analysis
    const metrics = await performSEOAnalysis(state.url!)
    dispatch({ type: 'SET_METRICS', payload: metrics })
    
    // Show lead capture after basic results
    setTimeout(() => {
      dispatch({ type: 'SHOW_LEAD_CAPTURE' })
    }, 2000)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!leadFormData.name.trim()) {
      alert('Please enter your name')
      return
    }
    
    if (!leadFormData.email.trim()) {
      alert('Please enter your email address')
      return
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(leadFormData.email)) {
      alert('Please enter a valid email address')
      return
    }
    
    const userData = {
      name: leadFormData.name.trim(),
      email: leadFormData.email.trim(),
      phone: leadFormData.phone.trim(),
      company: leadFormData.company?.trim() || ''
    }

    // Send lead data to Google Sheets
    try {
      const leadData = {
        fullName: userData.name,
        email: userData.email,
        phone: userData.phone,
        company: userData.company,
        websiteUrl: state.url
      }

      // Send lead to Google Sheets via Apps Script webhook
      const response = await fetch('https://script.google.com/macros/s/AKfycbxvqi6rXNKlduXVAu_0pIIKd3_nrxbiYEqVnveof3uhPTm_cP4XBNlsbXSjyMBN3W7r/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        console.log('✅ Lead successfully sent to Google Sheets:', leadData)
      } else {
        console.error('❌ Failed to send lead to Google Sheets:', result.error)
      }
      
      console.log('✅ Lead sent to Google Sheets:', leadData)
      
    } catch (error) {
      console.error('Error sending lead data:', error)
      // Still continue with the report generation
    }

    dispatch({ type: 'SET_USER_DATA', payload: userData })
    dispatch({ type: 'HIDE_LEAD_CAPTURE' })
    
    // Generate and download PDF report
    if (state.metrics) {
      try {
        await generatePDFReport(state.url!, state.metrics, userData)
        dispatch({ type: 'REPORT_GENERATED' })
      } catch (error) {
        console.error('Error generating PDF report:', error)
        alert('There was an error generating your report. Please try again.')
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setLeadFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!state.url) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <img 
                src="/8-mile-sniper-logo.png" 
                alt="8 Mile Sniper" 
                className="h-8 w-8 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold text-white">SEO Audit Report</h1>
                <p className="text-sm text-slate-400 truncate max-w-md">{state.url}</p>
              </div>
            </div>
          </div>
          
          {state.reportGenerated && (
            <Button 
              onClick={() => generatePDFReport(state.url!, state.metrics!, state.userData!)}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {state.isAnalyzing ? (
          // Analysis Progress
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Website</h2>
                  <p className="text-slate-400">Our AI is performing a comprehensive SEO audit...</p>
                </div>
                
                <div className="space-y-4">
                  <Progress value={state.analysisProgress} className="h-3" />
                  <p className="text-amber-400 font-medium">{state.analysisProgress}% Complete</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : state.metrics ? (
          // Results Dashboard
          <div className="space-y-8">
            {/* Overall Score */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center justify-between">
                  Overall SEO Score
                  {!state.showLeadCapture && !state.reportGenerated && (
                    <Button 
                      onClick={() => dispatch({ type: 'SHOW_LEAD_CAPTURE' })}
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      Get Full Report
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SEOScoreGauge score={state.metrics.overallScore} />
              </CardContent>
            </Card>

            {/* Metrics Breakdown */}
            <MetricsBreakdown metrics={state.metrics} showDetailed={!!state.userData && state.reportGenerated} />

            {/* Issues Panel */}
            <IssuesPanel issues={state.metrics.issues} showDetailed={!!state.userData && state.reportGenerated} />
          </div>
        ) : null}
      </div>

      {/* Lead Capture Modal */}
      <Dialog open={state.showLeadCapture} onOpenChange={() => {}}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-sm w-[90vw] max-h-[85vh] overflow-y-auto" aria-describedby="lead-capture-description">
          <DialogHeader>
            <DialogTitle className="text-xl text-white text-center">
              🎯 Unlock Your Complete SEO Analysis
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3">
            <div className="text-center text-slate-300 text-xs bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
              <p className="font-semibold text-amber-400 mb-1">📊 You're missing critical opportunities!</p>
              <p className="text-xs">Get your complete analysis with:</p>
              <ul className="text-left mt-1 space-y-0.5 text-xs">
                <li>✅ AI search optimization breakdown</li>
                <li>✅ Voice search strategies</li> 
                <li>✅ Priority action plan</li>
                <li>✅ Professional PDF report</li>
              </ul>
            </div>
            <div id="lead-capture-description" className="text-center text-amber-400 text-xs font-semibold">
              Complete the form to access your full report
            </div>
            
            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-slate-300 text-sm">
                  <User className="w-3 h-3 inline mr-1" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={leadFormData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="John Smith"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="email" className="text-slate-300 text-sm">
                  <Mail className="w-3 h-3 inline mr-1" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={leadFormData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="john@company.com"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-slate-300 text-sm">
                  <Phone className="w-3 h-3 inline mr-1" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={leadFormData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="company" className="text-slate-300 text-sm">
                  <Building2 className="w-3 h-3 inline mr-1" />
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  value={leadFormData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Your Company Name"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold h-10"
              >
                Get My Free SEO Report
              </Button>
            </form>
            
            <p className="text-xs text-slate-400 text-center">
              Your information is secure and will never be shared. We'll email you the complete report instantly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuditDashboard
