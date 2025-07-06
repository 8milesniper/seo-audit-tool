import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, Download, ArrowRight, Star, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isGeneratingReport, setIsGeneratingReport] = useState(true)
  
  const paymentAmount = searchParams.get('amount') || '47'
  const customerEmail = searchParams.get('email') || 'customer@example.com'
  const customerName = searchParams.get('name') || 'Valued Customer'

  useEffect(() => {
    // Simulate report generation delay
    const timer = setTimeout(() => {
      setIsGeneratingReport(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const downloadPremiumReport = () => {
    // Generate premium PDF with sample data
    import('@/services/premiumPdfGenerator').then(({ generatePremiumPDF }) => {
      const sampleAuditData = {
        url: 'your-website.com',
        companyName: customerName.replace('@example.com', '').replace('customer', 'Your Business'),
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
      
      generatePremiumPDF(sampleAuditData)
    })
  }

  const goToAuditTool = () => {
    navigate('/', { state: { premiumAccess: true } })
  }

  const goToWhiteLabel = () => {
    // Set white-label access and redirect
    localStorage.setItem('whitelabel_access', 'true')
    navigate('/white-label')
  }

  const isWhiteLabelPurchase = paymentAmount === '197'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-slate-300">
            Thank you for your ${paymentAmount} purchase, {customerName}
          </p>
        </div>

        {/* Payment Details */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {isWhiteLabelPurchase ? (
                <>
                  <Building className="w-5 h-5 text-purple-500" />
                  White-Label Agency Plan - ACTIVATED
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 text-amber-500" />
                  Premium SEO Audit - PAID ACCESS
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Amount Paid</p>
                <p className="text-2xl font-bold text-green-500">${paymentAmount}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white">{customerEmail}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Access Level</p>
                {isWhiteLabelPurchase ? (
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">WHITE-LABEL</span>
                ) : (
                  <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">PREMIUM</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Based on Purchase Type */}
        {isWhiteLabelPurchase ? (
          /* White-Label Access */
          <Card className="mb-8 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/30">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  🏢 Welcome to the Agency Plan! 
                </h3>
                <p className="text-slate-300 mb-6">
                  You now have access to white-label SEO audits, custom branding, and unlimited reports
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={goToWhiteLabel}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-3 text-lg mr-4"
                  >
                    <Building className="w-5 h-5 mr-2" />
                    Set Up Your Agency
                  </Button>
                  <Button 
                    onClick={downloadPremiumReport}
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 text-lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Sample Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Premium Audit Report */
          isGeneratingReport ? (
            <Card className="mb-8 bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mb-4"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Generating Your Premium Report...
                  </h3>
                  <p className="text-slate-400">
                    Creating detailed analysis with advanced AI insights
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mb-8 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/30">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Your Premium Report is Ready! ⭐
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Enhanced analysis with competitor insights, detailed recommendations, and action plans
                  </p>
                  <Button 
                    onClick={downloadPremiumReport}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 text-lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Premium Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        )}

        {/* Features Unlocked */}
        <Card className="mb-8 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {isWhiteLabelPurchase ? '🏢 Agency Features Activated' : '🔓 Premium Features Unlocked'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isWhiteLabelPurchase ? (
                <>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Unlimited Audits</h4>
                      <p className="text-slate-400 text-sm">Run unlimited SEO audits for all your clients</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">White-Label Branding</h4>
                      <p className="text-slate-400 text-sm">Custom logos, colors, and your agency name</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Client Management</h4>
                      <p className="text-slate-400 text-sm">Organize and track all client projects</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Reseller Opportunities</h4>
                      <p className="text-slate-400 text-sm">Sell SEO audits under your brand</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Competitor Analysis</h4>
                      <p className="text-slate-400 text-sm">See how you compare to top competitors</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Detailed Action Plan</h4>
                      <p className="text-slate-400 text-sm">Step-by-step implementation guide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Priority Recommendations</h4>
                      <p className="text-slate-400 text-sm">Focus on highest-impact improvements</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Technical SEO Deep Dive</h4>
                      <p className="text-slate-400 text-sm">Advanced technical optimization tips</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
          <div className="space-y-4">
            {isWhiteLabelPurchase ? (
              <>
                <Button 
                  onClick={goToWhiteLabel}
                  className="bg-purple-500 hover:bg-purple-600 text-white mr-4"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Access Agency Dashboard
                </Button>
                <Button 
                  onClick={goToAuditTool}
                  variant="outline" 
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Run Client Audits
                </Button>
              </>
            ) : (
              <Button 
                onClick={goToAuditTool}
                variant="outline" 
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Run Another Audit
              </Button>
            )}
          </div>
          <p className="text-slate-400 mt-6 text-sm">
            {isWhiteLabelPurchase 
              ? "Ready to scale your agency? Start running audits for your clients!"
              : "Need help implementing the recommendations? Contact us for consultation services."
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess