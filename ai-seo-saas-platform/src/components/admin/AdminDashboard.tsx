import React, { useState, useEffect } from 'react'
import { getLeadAnalytics, getAllCapturedLeads, exportLeadsCSV } from '@/services/millionUserLeadCapture'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Users, TrendingUp, Download, Calendar, Building2, Globe, DollarSign, CreditCard, ToggleLeft, RefreshCw } from 'lucide-react'
import TestModePanel from './TestModePanel'
import TestVerification from './TestVerification'

const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null)
  const [allLeads, setAllLeads] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [whiteLabelEnabled, setWhiteLabelEnabled] = useState(false)
  
  // Revenue Calculator State
  const [auditCount, setAuditCount] = useState(100)
  const [subscriberCount, setSubscriberCount] = useState(25)
  
  // Real business metrics based on actual lead data
  const [businessMetrics, setBusinessMetrics] = useState({
    totalLeads: 0,
    conversionPotential: 0,
    estimatedValue: 0,
    leadValue: 0
  })

  useEffect(() => {
    loadDashboardData()
    // Refresh data every 30 seconds to catch new leads
    const interval = setInterval(loadDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = () => {
    try {
      const analyticsData = getLeadAnalytics()
      const leadsData = getAllCapturedLeads()
      
      // Calculate real business value from actual leads
      const totalLeads = analyticsData?.total || 0
      const estimatedConversionRate = 0.03 // 3% conversion assumption
      const averageClientValue = 2000 // Average client value assumption
      const conversionPotential = Math.round(totalLeads * estimatedConversionRate)
      const estimatedValue = conversionPotential * averageClientValue
      const leadValue = totalLeads > 0 ? Math.round(estimatedValue / totalLeads) : 0
      
      setAnalytics(analyticsData)
      setAllLeads(leadsData)
      setBusinessMetrics({
        totalLeads,
        conversionPotential,
        estimatedValue,
        leadValue
      })
      setLoading(false)
      
      console.log('📊 Dashboard refreshed with real business metrics:', analyticsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    try {
      const csvData = exportLeadsCSV()
      const blob = new Blob([csvData], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `seo-audit-leads-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
      
      console.log('📥 Leads exported to CSV')
      alert('✅ Leads exported successfully!')
    } catch (error) {
      console.error('Error downloading CSV:', error)
      alert('❌ Error exporting leads. Check console for details.')
    }
  }

  const viewSalesPipeline = () => {
    // Create a detailed sales pipeline view
    const leads = getAllCapturedLeads()
    const pipelineData = leads?.leads || []
    
    const pipeline = {
      cold: pipelineData.filter((lead: any) => !lead.contacted),
      warm: pipelineData.filter((lead: any) => lead.contacted && !lead.quoted),
      hot: pipelineData.filter((lead: any) => lead.quoted && !lead.closed),
      closed: pipelineData.filter((lead: any) => lead.closed)
    }

    const pipelineText = `
🎯 SALES PIPELINE OVERVIEW
=========================

❄️  COLD LEADS: ${pipeline.cold.length}
🔥 WARM LEADS: ${pipeline.warm.length}  
🚀 HOT LEADS: ${pipeline.hot.length}
✅ CLOSED DEALS: ${pipeline.closed.length}

TOTAL PIPELINE VALUE: $${(pipelineData.length * 2000).toLocaleString()}

📊 CONVERSION FUNNEL:
- Total Leads → ${pipelineData.length}
- Expected Conversions → ${Math.round(pipelineData.length * 0.03)}
- Estimated Revenue → $${(pipelineData.length * 0.03 * 2000).toLocaleString()}
    `
    
    alert(pipelineText)
    console.log('📊 Sales Pipeline Data:', pipeline)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading business dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">8 Mile Sniper - Business Dashboard</h1>
            <p className="text-gray-600 mt-2">Your SEO audit tool performance and revenue</p>
          </div>
          <Button onClick={loadDashboardData} variant="outline">
            Refresh Data
          </Button>
        </div>
        
        {/* TOP SECTION: OVERALL BUSINESS NUMBERS */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Overall Business Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Card className="border-l-4 border-l-blue-500 bg-blue-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads Captured</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{analytics?.total || 0}</div>
                <p className="text-xs text-blue-600">All-time lead generation</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500 bg-green-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estimated Lead Value</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">${businessMetrics.estimatedValue.toLocaleString()}</div>
                <p className="text-xs text-green-600">Potential revenue from current leads</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 bg-purple-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Potential</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{businessMetrics.conversionPotential}</div>
                <p className="text-xs text-purple-600">Expected clients from current leads</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-orange-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{analytics?.thisMonth || 0}</div>
                <p className="text-xs text-orange-600">New leads captured</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ADMIN SECTION: LEAD MANAGEMENT */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">👥 Lead Management</h2>
            <Button onClick={downloadCSV} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Leads CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lead Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Today's Fresh Leads:</span>
                    <Badge variant="destructive">{analytics?.today || 0} 🔥</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>This Week:</span>
                    <span className="font-semibold">{analytics?.thisWeek || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average SEO Score:</span>
                    <span className="font-semibold">{Math.round(analytics?.averageScore || 0)}/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics?.topCompanies?.slice(0, 3).map((company: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{company.company}</span>
                      <Badge variant="outline">{company.count}</Badge>
                    </div>
                  ))}
                  {(!analytics?.topCompanies || analytics.topCompanies.length === 0) && (
                    <p className="text-sm text-gray-500">No data yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full text-sm" onClick={loadDashboardData}>
                    Refresh Lead Data
                  </Button>
                  <Button variant="outline" className="w-full text-sm" onClick={downloadCSV}>
                    Export All Leads
                  </Button>
                  <Button variant="outline" className="w-full text-sm" onClick={viewSalesPipeline}>
                    View Sales Pipeline
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Leads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                🔥 Recent Hot Leads (Priority Follow-up)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.recentLeads?.map((lead: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{lead.fullName}</h4>
                        <p className="text-sm text-gray-600 font-medium">{lead.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Globe className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{lead.websiteAnalyzed}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={lead.auditScore > 70 ? "secondary" : "destructive"}>
                          {lead.auditScore}/100
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(lead.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm bg-white p-3 rounded border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <span className="text-blue-600">📧 {lead.email}</span>
                        <span className="text-green-600">📞 {lead.phone}</span>
                      </div>
                      <div className="p-2 bg-yellow-50 rounded text-xs">
                        <strong>💰 Sales Script:</strong> "Hi {lead.fullName}, I reviewed your SEO audit for {lead.websiteAnalyzed} (scored {lead.auditScore}/100) and found critical issues costing you traffic. Quick 15-min call to discuss fixes?"
                      </div>
                    </div>
                  </div>
                ))}
                
                {(!analytics?.recentLeads || analytics.recentLeads.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No leads captured yet</p>
                    <p className="text-sm">Start marketing your SEO audit tool to generate leads!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BUSINESS INSIGHTS */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Business Insights</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Lead Value & Growth Potential</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Current Lead Value</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total leads captured:</span>
                      <span className="font-semibold">{businessMetrics.totalLeads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected conversion (3%):</span>
                      <span className="font-semibold">{businessMetrics.conversionPotential} clients</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average client value:</span>
                      <span className="font-semibold">$2,000</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total potential value:</span>
                      <span className="text-green-600">${businessMetrics.estimatedValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">💰 LIVE REVENUE CALCULATOR</h4>
                  
                  {/* $47 Audit Calculator */}
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <label className="font-semibold text-green-800">$47 Audits per month:</label>
                      <input 
                        type="number" 
                        value={auditCount}
                        onChange={(e) => setAuditCount(Number(e.target.value))}
                        className="w-20 p-1 border border-green-300 rounded text-center"
                        placeholder="0"
                        min="0"
                      />
                      <span className="text-green-700">× $47 = <strong>${(auditCount * 47).toLocaleString()}/month</strong></span>
                    </div>
                  </div>

                  {/* $197 Subscription Calculator */}
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <label className="font-semibold text-blue-800">$197 Subscribers:</label>
                      <input 
                        type="number" 
                        value={subscriberCount}
                        onChange={(e) => setSubscriberCount(Number(e.target.value))}
                        className="w-20 p-1 border border-blue-300 rounded text-center"
                        placeholder="0"
                        min="0"
                      />
                      <span className="text-blue-700">× $197 = <strong>${(subscriberCount * 197).toLocaleString()}/month</strong></span>
                    </div>
                  </div>

                  {/* Total Revenue */}
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
                    <div className="text-center">
                      <h5 className="font-bold text-purple-800 text-lg">TOTAL MONTHLY INCOME</h5>
                      <div className="text-3xl font-bold text-purple-900 mt-2">
                        ${((auditCount * 47) + (subscriberCount * 197)).toLocaleString()}
                      </div>
                      <div className="text-sm text-purple-700 mt-1">
                        (${(auditCount * 47).toLocaleString()} one-time + ${(subscriberCount * 197).toLocaleString()} recurring)
                      </div>
                      <div className="text-lg font-semibold text-purple-800 mt-2">
                        Annual: ${(((auditCount * 47) + (subscriberCount * 197)) * 12).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* WHITE LABEL SECTION: SIMPLE TOGGLE */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏷️ White Label Settings</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ToggleLeft className="w-5 h-5" />
                White Label Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Enable White Label for Clients</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    When enabled, clients can use the SEO tool under their own branding
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${whiteLabelEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                    {whiteLabelEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <Switch
                    checked={whiteLabelEnabled}
                    onCheckedChange={setWhiteLabelEnabled}
                  />
                </div>
              </div>
              
              {whiteLabelEnabled && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">White Label Features Active:</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✅ Clients can customize branding and logo</li>
                    <li>✅ Remove "8 Mile Sniper" branding for clients</li>
                    <li>✅ Clients get their own admin dashboard</li>
                    <li>✅ Separate lead capture for each client</li>
                  </ul>
                </div>
              )}

              {!whiteLabelEnabled && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">
                    White label features are currently disabled. Only your branded version is active.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* TESTING PANEL */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🧪 Testing & Development</h2>
          <div className="space-y-6">
            <TestVerification />
            <TestModePanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard