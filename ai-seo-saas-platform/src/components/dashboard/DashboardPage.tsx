import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  TrendingUp, 
  Clock, 
  Download, 
  Eye,
  BarChart3,
  Zap,
  Crown,
  AlertCircle,
  CheckCircle,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { useAudit } from '@/contexts/AuditContext'
import toast from 'react-hot-toast'

interface RecentAudit {
  id: string
  website: string
  score: number
  date: string
  status: 'completed' | 'processing' | 'failed'
  reportUrl?: string
}

const DashboardPage = () => {
  const [quickAuditUrl, setQuickAuditUrl] = useState('')
  const [recentAudits, setRecentAudits] = useState<RecentAudit[]>([])
  const { state: authState } = useAuth()
  const { dispatch: auditDispatch } = useAudit()
  const navigate = useNavigate()

  useEffect(() => {
    // Load recent audits
    const mockAudits: RecentAudit[] = [
      {
        id: '1',
        website: 'example.com',
        score: 87,
        date: '2025-01-15',
        status: 'completed',
        reportUrl: '/reports/example-com-report.pdf'
      },
      {
        id: '2',
        website: 'mystore.shop',
        score: 73,
        date: '2025-01-14',
        status: 'completed',
        reportUrl: '/reports/mystore-shop-report.pdf'
      },
      {
        id: '3',
        website: 'newsite.net',
        score: 0,
        date: '2025-01-13',
        status: 'processing'
      }
    ]
    setRecentAudits(mockAudits)
  }, [])

  const handleQuickAudit = () => {
    if (!quickAuditUrl.trim()) {
      toast.error('Please enter a website URL')
      return
    }

    const normalizedUrl = quickAuditUrl.startsWith('http') ? quickAuditUrl : `https://${quickAuditUrl}`
    auditDispatch({ type: 'SET_URL', payload: normalizedUrl })
    navigate('/audit')
  }

  const getUsagePercentage = () => {
    if (!authState.user || authState.user.auditsLimit === -1) return 0
    return (authState.user.auditsUsed / authState.user.auditsLimit) * 100
  }

  const canRunAudit = () => {
    if (!authState.user) return false
    return authState.user.auditsLimit === -1 || authState.user.auditsUsed < authState.user.auditsLimit
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 text-green-400 border-green-500/30'
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome back, {authState.user?.name}!
            </h2>
            <p className="text-amber-200">
              Ready to optimize your websites for AI search? Start your next audit below.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-amber-400">
              {authState.user?.auditsUsed || 0}
            </div>
            <p className="text-sm text-amber-200">
              {authState.user?.auditsLimit === -1 ? 'Unlimited' : `of ${authState.user?.auditsLimit}`} audits used
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Audit */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Search className="w-5 h-5 text-amber-400" />
              <span>Quick AI SEO Audit</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              Start analyzing any website for AI search readiness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <Input
                placeholder="Enter website URL (e.g., example.com)"
                value={quickAuditUrl}
                onChange={(e) => setQuickAuditUrl(e.target.value)}
                className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-amber-500"
                onKeyPress={(e) => e.key === 'Enter' && handleQuickAudit()}
                disabled={!canRunAudit()}
              />
              <Button 
                onClick={handleQuickAudit}
                disabled={!canRunAudit()}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                <Zap className="w-4 h-4 mr-2" />
                Audit
              </Button>
            </div>
            {!canRunAudit() && (
              <div className="mt-3 p-3 bg-orange-500/20 border border-orange-500/30 rounded-md">
                <p className="text-orange-400 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  You've reached your audit limit. Upgrade to continue.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan Status */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>Current Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-lg px-4 py-2 mb-2">
                  {authState.user?.plan?.toUpperCase()}
                </Badge>
                <p className="text-slate-400 text-sm">
                  {authState.user?.plan === 'free' && 'Basic features included'}
                  {authState.user?.plan === 'pro' && 'Full AI search analysis'}
                  {authState.user?.plan === 'agency' && 'White-label & unlimited'}
                </p>
              </div>
              
              {authState.user?.auditsLimit !== -1 && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Usage</span>
                    <span className="text-white">
                      {authState.user?.auditsUsed}/{authState.user?.auditsLimit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getUsagePercentage()}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <Button 
                variant="outline" 
                className="w-full border-amber-500 text-amber-400 hover:bg-amber-500/10"
                onClick={() => navigate('/pricing')}
              >
                {authState.user?.plan === 'free' ? 'Upgrade Plan' : 'Manage Plan'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Audits</p>
                <p className="text-2xl font-bold text-white">{authState.user?.auditsUsed || 0}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Score</p>
                <p className="text-2xl font-bold text-green-400">
                  {recentAudits.length > 0 
                    ? Math.round(recentAudits.filter(a => a.status === 'completed').reduce((acc, a) => acc + a.score, 0) / recentAudits.filter(a => a.status === 'completed').length) 
                    : 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-blue-400">{recentAudits.length}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Reports</p>
                <p className="text-2xl font-bold text-purple-400">
                  {recentAudits.filter(a => a.reportUrl).length}
                </p>
              </div>
              <Download className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Audits */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Audits</CardTitle>
              <CardDescription className="text-slate-400">
                Your latest website analyses and reports
              </CardDescription>
            </div>
            <Button 
              onClick={() => navigate('/audit')}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Audit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentAudits.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No audits yet</h3>
              <p className="text-slate-400 mb-4">
                Start your first AI SEO audit to see results here
              </p>
              <Button 
                onClick={() => navigate('/audit')}
                className="bg-amber-500 hover:bg-amber-600 text-black"
              >
                Run First Audit
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentAudits.map((audit) => (
                <div key={audit.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                      <Search className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{audit.website}</h4>
                      <p className="text-slate-400 text-sm">{audit.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {audit.status === 'completed' && (
                      <Badge className={`${getScoreBadgeColor(audit.score)} border`}>
                        Score: {audit.score}
                      </Badge>
                    )}
                    
                    {audit.status === 'processing' && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Processing...
                      </Badge>
                    )}
                    
                    {audit.status === 'failed' && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        Failed
                      </Badge>
                    )}

                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {audit.reportUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage