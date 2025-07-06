import React, { useState } from 'react'
import { 
  AlertTriangle, 
  Info, 
  AlertCircle, 
  ChevronDown, 
  ChevronRight,
  Target,
  Lightbulb,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface Issue {
  type: 'critical' | 'warning' | 'info'
  category: 'traditional' | 'ai-search' | 'voice-search' | 'schema' | 'eeat' | 'performance'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}

interface IssuesPanelProps {
  issues: Issue[]
  showDetailed: boolean
}

const IssuesPanel: React.FC<IssuesPanelProps> = ({ issues, showDetailed }) => {
  const [expandedIssues, setExpandedIssues] = useState<Set<number>>(new Set())

  const toggleIssue = (index: number) => {
    const newExpanded = new Set(expandedIssues)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedIssues(newExpanded)
  }

  const getIssueIcon = (type: Issue['type']) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getIssueColor = (type: Issue['type']) => {
    switch (type) {
      case 'critical':
        return 'border-red-500/30 bg-red-500/10'
      case 'warning':
        return 'border-amber-500/30 bg-amber-500/10'
      case 'info':
        return 'border-blue-500/30 bg-blue-500/10'
    }
  }

  const getBadgeVariant = (type: Issue['type']) => {
    switch (type) {
      case 'critical':
        return 'destructive'
      case 'warning':
        return 'secondary'
      case 'info':
        return 'outline'
    }
  }

  const criticalIssues = issues.filter(issue => issue.type === 'critical')
  const warningIssues = issues.filter(issue => issue.type === 'warning')
  const infoIssues = issues.filter(issue => issue.type === 'info')
  
  // Group issues by category
  const aiSearchIssues = issues.filter(issue => issue.category === 'ai-search')
  const voiceSearchIssues = issues.filter(issue => issue.category === 'voice-search')
  const schemaIssues = issues.filter(issue => issue.category === 'schema')
  const eeAtIssues = issues.filter(issue => issue.category === 'eeat')
  const traditionalIssues = issues.filter(issue => issue.category === 'traditional' || issue.category === 'performance')

  const visibleIssues = showDetailed ? issues : issues.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Summary Cards - Issue Severity */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Issue Summary by Severity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-medium text-red-400">Critical Issues</span>
                </div>
                <span className="text-2xl font-bold text-red-400">{criticalIssues.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/10 border-amber-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Warnings</span>
                </div>
                <span className="text-2xl font-bold text-amber-400">{warningIssues.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Opportunities</span>
                </div>
                <span className="text-2xl font-bold text-blue-400">{infoIssues.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 2025 Category Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">2025 SEO Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-purple-500/10 border-purple-500/30">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{aiSearchIssues.length}</div>
                <div className="text-xs text-purple-300">AI Search</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{voiceSearchIssues.length}</div>
                <div className="text-xs text-green-300">Voice Search</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{schemaIssues.length}</div>
                <div className="text-xs text-blue-300">Schema & Entity</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/10 border-amber-500/30">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-amber-400">{eeAtIssues.length}</div>
                <div className="text-xs text-amber-300">E-E-A-T</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-500/10 border-slate-500/30">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-400">{traditionalIssues.length}</div>
                <div className="text-xs text-slate-300">Traditional</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Issues List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-amber-400" />
              2025 SEO Issues & Recommendations
            </div>
            {!showDetailed && issues.length > 3 && (
              <Badge variant="outline" className="text-xs">
                Showing {visibleIssues.length} of {issues.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {visibleIssues.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Great Job!</h3>
              <p className="text-slate-400">No critical issues found. Your website is well-optimized.</p>
            </div>
          ) : (
            visibleIssues.map((issue, index) => (
              <Collapsible key={index} className="space-y-2">
                <Card className={`border ${getIssueColor(issue.type)}`}>
                  <CollapsibleTrigger 
                    className="w-full"
                    onClick={() => toggleIssue(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getIssueIcon(issue.type)}
                          <div className="text-left">
                            <h3 className="font-semibold text-white">{issue.title}</h3>
                            <p className="text-sm text-slate-400 mt-1">{issue.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getBadgeVariant(issue.type)} className="text-xs capitalize">
                            {issue.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {issue.category.replace('-', ' ')}
                          </Badge>
                          {expandedIssues.has(index) ? (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-4 pb-4 border-t border-slate-600/50">
                      <div className="pt-3 space-y-3">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-semibold text-amber-400 mb-1">Recommendation</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">{issue.recommendation}</p>
                          </div>
                        </div>
                        
                        {showDetailed && (
                          <div className="pt-2 border-t border-slate-600/30">
                            <div className="flex items-center space-x-2 text-xs text-slate-400">
                              <span>Priority:</span>
                              <Badge 
                                variant={issue.type === 'critical' ? 'destructive' : 'secondary'} 
                                className="text-xs"
                              >
                                {issue.type === 'critical' ? 'High' : issue.type === 'warning' ? 'Medium' : 'Low'}
                              </Badge>
                              <span>•</span>
                              <span>Impact: {issue.type === 'critical' ? 'High' : 'Medium'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))
          )}

          {!showDetailed && issues.length > 3 && (
            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-slate-400 text-sm mb-3">
                {issues.length - 3} more issues found. Get the complete report to see all recommendations.
              </p>
              <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">
                Unlock Full Analysis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Plan (Only shown after lead capture) */}
      {showDetailed && (
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-amber-400" />
              2025 SEO Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 text-black rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-white">Address Critical Issues ({criticalIssues.length})</h4>
                  <p className="text-sm text-slate-300">Prioritize critical issues across all categories for maximum impact on search visibility.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-white">Optimize for AI Search ({aiSearchIssues.length})</h4>
                  <p className="text-sm text-slate-300">Prepare for Google SGE, ChatGPT Search, and other AI-powered search engines.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-white">Enhance Voice Search ({voiceSearchIssues.length})</h4>
                  <p className="text-sm text-slate-300">Optimize for conversational queries and voice assistant integration.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-white">Implement Advanced Schema ({schemaIssues.length})</h4>
                  <p className="text-sm text-slate-300">Add structured data and entity markup for better AI understanding.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-white">Build E-E-A-T Signals ({eeAtIssues.length})</h4>
                  <p className="text-sm text-slate-300">Strengthen expertise, experience, authoritativeness, and trustworthiness indicators.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default IssuesPanel
