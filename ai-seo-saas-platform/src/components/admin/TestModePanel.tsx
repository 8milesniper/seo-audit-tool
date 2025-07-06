import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { TestTube, Crown, Download, Eye } from 'lucide-react'
import { generateBeautifulPDF } from '@/services/beautifulPdfGenerator'

const TestModePanel: React.FC = () => {
  const [testMode, setTestMode] = useState(localStorage.getItem('admin_test_mode') === 'true')
  const [demoCustomer, setDemoCustomer] = useState({
    name: 'Demo Customer',
    email: 'demo@testbusiness.com',
    website: 'testbusiness.com'
  })

  const toggleTestMode = () => {
    const newTestMode = !testMode
    setTestMode(newTestMode)
    localStorage.setItem('admin_test_mode', newTestMode.toString())
    
    if (newTestMode) {
      // Simulate premium access
      localStorage.setItem('premium_access', 'true')
      localStorage.setItem('payment_status', 'paid')
    } else {
      localStorage.removeItem('premium_access')
      localStorage.removeItem('payment_status')
    }
    
    alert(newTestMode ? '✅ Test Mode ENABLED - Premium features unlocked' : '❌ Test Mode DISABLED')
  }

  const generateTestPremiumReport = () => {
    const sampleAuditData = {
      url: demoCustomer.website,
      companyName: demoCustomer.name,
      overallScore: 73,
      issues: [
        { title: 'Core Web Vitals optimization needed', description: 'LCP and CLS improvements required' },
        { title: 'Missing structured data', description: 'Schema markup implementation needed' },
        { title: 'Mobile responsiveness gaps', description: 'Tablet view optimization required' },
        { title: 'Internal linking structure', description: 'Improve page authority distribution' },
        { title: 'Meta tag optimization', description: 'Title tags and descriptions need refinement' }
      ],
      recommendations: [],
      isPaid: true
    }
    
    generateBeautifulPDF(sampleAuditData)
  }

  const simulatePaymentSuccess = () => {
    // Simulate successful payment
    localStorage.setItem('premium_access', 'true')
    localStorage.setItem('payment_status', 'paid')
    localStorage.setItem('customer_email', demoCustomer.email)
    localStorage.setItem('customer_name', demoCustomer.name)
    
    // Open payment success page in new tab
    window.open('/payment-success?amount=47&email=' + encodeURIComponent(demoCustomer.email) + '&name=' + encodeURIComponent(demoCustomer.name), '_blank')
  }

  const resetTestData = () => {
    localStorage.removeItem('premium_access')
    localStorage.removeItem('payment_status')
    localStorage.removeItem('customer_email')
    localStorage.removeItem('customer_name')
    localStorage.removeItem('admin_test_mode')
    setTestMode(false)
    alert('🔄 Test data reset - Back to free mode')
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TestTube className="w-5 h-5 text-purple-400" />
          Admin Testing Panel
          {testMode && <Badge className="bg-purple-500">TEST MODE</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        
        {/* Test Mode Toggle - LARGE AND OBVIOUS */}
        <div className="mb-8 p-6 bg-gradient-to-r from-red-900/30 to-purple-900/30 border-2 border-red-500/50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-xl mb-2">🧪 PREMIUM TEST MODE</h3>
              <p className="text-red-200 font-semibold">⚠️ TURN THIS ON TO TEST WITHOUT PAYING ⚠️</p>
              <p className="text-slate-300 text-sm mt-1">Enable premium features without payment for testing</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-white font-bold text-lg">
                {testMode ? "🟢 ENABLED" : "🔴 DISABLED"}
              </div>
              <Switch 
                checked={testMode}
                onCheckedChange={toggleTestMode}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500 scale-150"
              />
            </div>
          </div>
        </div>

        {/* CUSTOMER EXPERIENCE TEST */}
        {testMode && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 border-2 border-green-500/50 rounded-xl">
            <h3 className="text-white font-bold text-xl mb-4">🎯 CUSTOMER EXPERIENCE TEST</h3>
            <p className="text-green-200 mb-4">Experience the exact customer journey (no charges in test mode):</p>
            
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => {
                  console.log('🚀 Navigating to customer experience...')
                  // Clear any admin session flags
                  sessionStorage.removeItem('admin_session')
                  // Force navigation to root with page reload
                  window.location.href = window.location.origin + '/'
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
              >
                🚀 JUMP TO CUSTOMER EXPERIENCE (SAME TAB)
              </Button>
              
              <Button 
                onClick={() => {
                  console.log('🆕 Opening customer experience in new tab...')
                  const newWindow = window.open(window.location.origin + '/', '_blank')
                  if (newWindow) {
                    newWindow.focus()
                  } else {
                    alert('Please allow pop-ups to open the customer experience in a new tab')
                  }
                }}
                variant="outline"
                className="w-full border-green-500 text-green-400 hover:bg-green-600 hover:text-white font-bold py-3"
              >
                🆕 OPEN IN NEW TAB
              </Button>
            </div>
            
            <div className="mt-4 text-sm text-green-200">
              ✅ Test mode active - No payments will be processed<br/>
              ✅ Experience: Free audit → $47 premium → $197 white label<br/>
              ✅ All downloads and features work normally<br/>
              💡 Try both buttons above if one doesn't work
            </div>
          </div>
        )}

        {/* Demo Customer Info */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Demo Customer Details</h4>
          <div className="space-y-2">
            <input 
              type="text"
              value={demoCustomer.name}
              onChange={(e) => setDemoCustomer({...demoCustomer, name: e.target.value})}
              className="w-full p-2 bg-slate-700 text-white rounded border border-slate-600"
              placeholder="Customer Name"
            />
            <input 
              type="email"
              value={demoCustomer.email}
              onChange={(e) => setDemoCustomer({...demoCustomer, email: e.target.value})}
              className="w-full p-2 bg-slate-700 text-white rounded border border-slate-600"
              placeholder="Customer Email"
            />
          </div>
        </div>

        {/* Test Actions */}
        <div className="space-y-3">
          <Button 
            onClick={generateTestPremiumReport}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black"
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Test Premium Report
          </Button>
          
          <Button 
            onClick={simulatePaymentSuccess}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            <Crown className="w-4 h-4 mr-2" />
            Simulate Payment Success Flow
          </Button>
          
          <Button 
            onClick={() => {
              console.log('👁️ Opening front-end experience...')
              const newWindow = window.open(window.location.origin + '/', '_blank')
              if (newWindow) {
                newWindow.focus()
              } else {
                alert('Please allow pop-ups or try the button above')
              }
            }}
            variant="outline"
            className="w-full border-slate-600 text-white hover:bg-slate-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            Test Front-End Experience (New Tab)
          </Button>
          
          <Button 
            onClick={resetTestData}
            variant="destructive"
            className="w-full"
          >
            🔄 Reset Test Data
          </Button>
        </div>

        {/* Status Display */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Current Test Status</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Test Mode:</span>
              <span className={testMode ? 'text-green-400' : 'text-red-400'}>
                {testMode ? 'ENABLED' : 'DISABLED'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Premium Access:</span>
              <span className={localStorage.getItem('premium_access') ? 'text-green-400' : 'text-slate-400'}>
                {localStorage.getItem('premium_access') ? 'ACTIVE' : 'NONE'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Status:</span>
              <span className={localStorage.getItem('payment_status') === 'paid' ? 'text-green-400' : 'text-slate-400'}>
                {localStorage.getItem('payment_status') || 'NONE'}
              </span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default TestModePanel