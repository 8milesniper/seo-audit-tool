import React, { useState, useEffect } from 'react'
import { getPaymentUrl, isInTestMode } from '@/config/stripeConfig'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'

const TestVerification = () => {
  const [testResults, setTestResults] = useState<any>(null)

  const runSafetyCheck = () => {
    // Check everything without making any payments
    const adminTestMode = localStorage.getItem('admin_test_mode') === 'true'
    const systemTestMode = isInTestMode()
    const auditUrl = getPaymentUrl('audit')
    const enterpriseUrl = getPaymentUrl('enterprise')
    
    const results = {
      adminTestMode,
      systemTestMode,
      auditUrl,
      enterpriseUrl,
      isSafe: auditUrl.includes('/payment-success') && enterpriseUrl.includes('/payment-success'),
      timestamp: new Date().toISOString()
    }
    
    setTestResults(results)
    
    // Log to console for debugging
    console.log('🔍 SAFETY CHECK RESULTS:', results)
  }

  useEffect(() => {
    // Run check on load
    runSafetyCheck()
    
    // Run check every 2 seconds to monitor changes
    const interval = setInterval(runSafetyCheck, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!testResults) {
    return <div>Loading safety check...</div>
  }

  const SafetyIndicator = ({ condition, safeText, dangerText }: any) => (
    <div className={`flex items-center gap-2 p-3 rounded-lg ${
      condition ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'
    }`}>
      {condition ? (
        <CheckCircle className="w-5 h-5 text-green-400" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400" />
      )}
      <span className={condition ? 'text-green-300' : 'text-red-300'}>
        {condition ? safeText : dangerText}
      </span>
    </div>
  )

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          PAYMENT SAFETY VERIFICATION
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Overall Safety Status */}
        <div className={`p-4 rounded-lg border-2 ${
          testResults.isSafe 
            ? 'bg-green-500/20 border-green-500' 
            : 'bg-red-500/20 border-red-500'
        }`}>
          <div className="flex items-center gap-3">
            {testResults.isSafe ? (
              <CheckCircle className="w-8 h-8 text-green-400" />
            ) : (
              <XCircle className="w-8 h-8 text-red-400" />
            )}
            <div>
              <h3 className={`text-xl font-bold ${
                testResults.isSafe ? 'text-green-300' : 'text-red-300'
              }`}>
                {testResults.isSafe ? '✅ SAFE TO TEST' : '🚨 DANGER - DO NOT CLICK PAYMENT BUTTONS'}
              </h3>
              <p className="text-slate-300">
                {testResults.isSafe 
                  ? 'Payment buttons will redirect to success page (no charges)'
                  : 'Payment buttons will redirect to REAL Stripe (will charge money!)'}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Checks */}
        <div className="space-y-3">
          <SafetyIndicator
            condition={testResults.adminTestMode}
            safeText="✅ Admin test mode is ON"
            dangerText="❌ Admin test mode is OFF"
          />
          
          <SafetyIndicator
            condition={testResults.systemTestMode}
            safeText="✅ System detects test mode"
            dangerText="❌ System in live mode"
          />
          
          <SafetyIndicator
            condition={testResults.auditUrl.includes('/payment-success')}
            safeText="✅ $47 button will simulate payment"
            dangerText="🚨 $47 button will charge REAL money!"
          />
          
          <SafetyIndicator
            condition={testResults.enterpriseUrl.includes('/payment-success')}
            safeText="✅ $197 button will simulate payment"
            dangerText="🚨 $197 button will charge REAL money!"
          />
        </div>

        {/* URL Preview */}
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">What happens when you click payment buttons:</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-slate-400">$47 button → </span>
              <code className={`${
                testResults.auditUrl.includes('/payment-success') ? 'text-green-300' : 'text-red-300'
              }`}>
                {testResults.auditUrl}
              </code>
            </div>
            <div>
              <span className="text-slate-400">$197 button → </span>
              <code className={`${
                testResults.enterpriseUrl.includes('/payment-success') ? 'text-green-300' : 'text-red-300'
              }`}>
                {testResults.enterpriseUrl}
              </code>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <Button 
          onClick={runSafetyCheck}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Safety Check
        </Button>

        {/* Instructions */}
        <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg">
          <h4 className="text-yellow-300 font-semibold mb-2">Instructions:</h4>
          <ul className="text-yellow-200 text-sm space-y-1">
            <li>• <strong>ONLY click payment buttons when status shows "SAFE TO TEST"</strong></li>
            <li>• If you see "DANGER", DO NOT click any payment buttons</li>
            <li>• Safe URLs contain "/payment-success" - these won't charge you</li>
            <li>• Dangerous URLs contain "buy.stripe.com" - these WILL charge you</li>
          </ul>
        </div>

      </CardContent>
    </Card>
  )
}

export default TestVerification