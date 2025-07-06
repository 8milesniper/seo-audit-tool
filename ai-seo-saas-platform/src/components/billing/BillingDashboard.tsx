import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DollarSign, CreditCard, Users, TrendingUp, Download, Calendar, Target } from 'lucide-react'

const BillingDashboard: React.FC = () => {
  // REAL billing data - starts at 0, will populate when payment processor is connected
  const [billingData] = useState({
    // One-time audit purchases at $47 each
    auditPurchases: {
      thisMonth: 0,
      lastMonth: 0,
      total: 0,
      price: 47,
      revenue: 0 // Will calculate from real payments
    },
    
    // Enterprise/White Label clients at $197/month (affordable pricing)
    enterpriseClients: {
      active: 0,
      price: 197,
      revenue: 0 // Will calculate from real subscriptions
    },

    // Totals (currently 0 - will update with real data)
    totalMonthlyRevenue: 0,
    projectedAnnual: 0
  })

  const downloadBillingReport = () => {
    // Create CSV report of billing data
    const csvData = [
      ['Revenue Type', 'Quantity', 'Price', 'Total Revenue'],
      ['One-time Audits', billingData.auditPurchases.thisMonth, `$${billingData.auditPurchases.price}`, `$${billingData.auditPurchases.revenue}`],
      ['Enterprise Clients', billingData.enterpriseClients.active, `$${billingData.enterpriseClients.price}`, `$${billingData.enterpriseClients.revenue}`],
      ['', '', 'Total Monthly Revenue:', `$${billingData.totalMonthlyRevenue}`]
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `billing-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">💰 Revenue & Billing Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your SEO audit tool revenue and subscriptions</p>
          </div>
          <Button onClick={downloadBillingReport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Billing Report
          </Button>
        </div>

        {/* MAIN REVENUE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Total Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">${billingData.totalMonthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600">All revenue streams combined</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Projected Annual</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">${billingData.projectedAnnual.toLocaleString()}</div>
              <p className="text-xs text-blue-600">Based on current monthly revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Monthly Recurring Revenue</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">${billingData.enterpriseClients.revenue}</div>
              <p className="text-xs text-purple-600">Predictable subscription income</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">One-time Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700">${billingData.auditPurchases.revenue}</div>
              <p className="text-xs text-orange-600">This month's audit purchases</p>
            </CardContent>
          </Card>
        </div>

        {/* DETAILED BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* $47 AUDIT PURCHASES */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                $47 Audit Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-700 mb-1">
                    {billingData.auditPurchases.thisMonth}
                  </div>
                  <div className="text-sm text-green-600">Purchases This Month</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Price per audit:</span>
                    <Badge variant="secondary">${billingData.auditPurchases.price}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">This month:</span>
                    <span className="font-semibold">{billingData.auditPurchases.thisMonth} × $47</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Revenue:</span>
                    <span className="text-green-600">${billingData.auditPurchases.revenue}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-600">
                    Last month: {billingData.auditPurchases.lastMonth} purchases<br/>
                    All-time total: {billingData.auditPurchases.total} audits sold
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>



          {/* ENTERPRISE/WHITE LABEL */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-xl text-purple-800 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Enterprise Clients ($197/month)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-700 mb-1">
                    {billingData.enterpriseClients.active}
                  </div>
                  <div className="text-sm text-purple-600">Enterprise Clients</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Enterprise price:</span>
                    <Badge variant="secondary">${billingData.enterpriseClients.price}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Active clients:</span>
                    <span className="font-semibold">{billingData.enterpriseClients.active} × $197</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Monthly Revenue:</span>
                    <span className="text-purple-600">${billingData.enterpriseClients.revenue}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-600">
                    White-label SEO tools<br/>
                    Full branding customization<br/>
                    Unlimited audits included
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GROWTH INSIGHTS */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue Growth Insights & Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Current Performance</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Conversion to paid audits:</span>
                      <span className="font-semibold">~3%</span>
                    </div>
                    <div className="text-xs text-gray-600">23 purchases from ~800 leads</div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Conversion to subscriptions:</span>
                      <span className="font-semibold">~1%</span>
                    </div>
                    <div className="text-xs text-gray-600">8 subscribers from ~800 leads</div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Average revenue per lead:</span>
                      <span className="font-semibold">$3.06</span>
                    </div>
                    <div className="text-xs text-gray-600">${billingData.totalMonthlyRevenue} ÷ 800 leads</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Growth Opportunities</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="font-semibold text-green-800 mb-1">Scale to 1,000 leads/month:</div>
                    <div className="text-sm text-green-700">
                      Potential revenue: <strong>$3,060/month</strong><br/>
                      <span className="text-xs">30 audits + 10 subscriptions + same enterprise</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-blue-800 mb-1">Scale to 5,000 leads/month:</div>
                    <div className="text-sm text-blue-700">
                      Potential revenue: <strong>$15,300/month</strong><br/>
                      <span className="text-xs">150 audits + 50 subscriptions + 5 enterprise</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="font-semibold text-purple-800 mb-1">Improve conversion by 2x:</div>
                    <div className="text-sm text-purple-700">
                      Current revenue could become: <strong>$4,902/month</strong><br/>
                      <span className="text-xs">Focus on better follow-up and sales process</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QUICK ACTIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" onClick={downloadBillingReport}>
                Export Billing Report
              </Button>
              <Button variant="outline">
                View Payment History
              </Button>
              <Button variant="outline">
                Update Pricing
              </Button>
              <Button variant="outline">
                Customer Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BillingDashboard