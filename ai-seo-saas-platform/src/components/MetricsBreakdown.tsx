import React from 'react'
import { 
  Zap, 
  Smartphone, 
  Shield, 
  Search, 
  Link, 
  Clock, 
  Eye, 
  Target,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Brain,
  Mic,
  Code,
  Award,
  Bot,
  MessageSquare,
  Globe,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { SEOMetrics } from '@/contexts/AuditContext'

interface MetricsBreakdownProps {
  metrics: SEOMetrics
  showDetailed: boolean
}

const MetricsBreakdown: React.FC<MetricsBreakdownProps> = ({ metrics, showDetailed }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-amber-400'
    if (score >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 70) return 'bg-amber-500'
    if (score >= 50) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getStatusIcon = (value: boolean) => {
    return value ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <XCircle className="w-4 h-4 text-red-400" />
    )
  }

  const formatWebVital = (value: number, unit: string, threshold: number) => {
    const isGood = value <= threshold
    return (
      <div className="flex items-center space-x-2">
        <span className={`font-bold ${isGood ? 'text-green-400' : 'text-red-400'}`}>
          {value}{unit}
        </span>
        {isGood ? (
          <CheckCircle className="w-4 h-4 text-green-400" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-red-400" />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* NEW 2025 FEATURES SECTION */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-amber-400" />
          2025 AI Search Optimization
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* AI Search Readiness */}
          <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Bot className="w-5 h-5 mr-2 text-purple-400" />
                AI Search Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Overall Score</span>
                <span className={`font-bold text-xl ${getScoreColor(metrics.aiSearchReadiness)}`}>
                  {metrics.aiSearchReadiness}
                </span>
              </div>
              <Progress value={metrics.aiSearchReadiness} className="h-2" />
              
              {showDetailed ? (
                <div className="space-y-3 pt-2 border-t border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-400">AI Platforms</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Google SGE</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.aiSearch.sgeOptimization}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">ChatGPT Search</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.aiSearch.chatgptReadiness}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Perplexity AI</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.aiSearch.perplexityOptimization}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Bing Copilot</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.aiSearch.bingCopilotReadiness}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-purple-500/30 relative">
                  <div className="absolute inset-0 bg-slate-900/80 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-amber-400 font-semibold text-sm">🔒 Detailed Analysis</div>
                      <div className="text-slate-400 text-xs">Available in full report</div>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-purple-400 blur-sm">AI Platforms</h4>
                  <div className="space-y-2 text-sm blur-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Google SGE</span>
                      <Badge variant="outline" className="text-xs">●●●</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">ChatGPT Search</span>
                      <Badge variant="outline" className="text-xs">●●●</Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Voice Search Optimization */}
          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Mic className="w-5 h-5 mr-2 text-green-400" />
                Voice Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Optimization Score</span>
                <span className={`font-bold text-xl ${getScoreColor(metrics.voiceSearchOptimization)}`}>
                  {metrics.voiceSearchOptimization}
                </span>
              </div>
              <Progress value={metrics.voiceSearchOptimization} className="h-2" />
              
              {showDetailed ? (
                <div className="space-y-3 pt-2 border-t border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-400">Voice Optimization</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Conversational Keywords</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.voiceSearch.conversationalKeywords}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Featured Snippets</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.voiceSearch.featuredSnippetOpportunities}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Local Voice Ready</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.voiceSearch.localVoiceReadiness}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Natural Language</span>
                      {getStatusIcon(metrics.voiceSearch.naturalLanguageOptimization)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-2 border-t border-green-500/30 relative">
                  <div className="absolute inset-0 bg-slate-900/80 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-amber-400 font-semibold text-sm">🔒 Voice Analysis</div>
                      <div className="text-slate-400 text-xs">Available in full report</div>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-green-400 blur-sm">Voice Optimization</h4>
                  <div className="space-y-2 text-sm blur-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Conversational Keywords</span>
                      <Badge variant="outline" className="text-xs">●●●</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Featured Snippets</span>
                      <Badge variant="outline" className="text-xs">●●●</Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Schema & Entity Analysis */}
          <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-400" />
                Schema & Entity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Entity Score</span>
                <span className={`font-bold text-xl ${getScoreColor(metrics.schemaEntityScore)}`}>
                  {metrics.schemaEntityScore}
                </span>
              </div>
              <Progress value={metrics.schemaEntityScore} className="h-2" />
              
              {showDetailed && (
                <div className="space-y-3 pt-2 border-t border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-400">Schema Types</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Organization</span>
                      {getStatusIcon(metrics.schemaEntity.organizationSchema)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">FAQ Schema</span>
                      {getStatusIcon(metrics.schemaEntity.faqSchema)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">HowTo Schema</span>
                      {getStatusIcon(metrics.schemaEntity.howToSchema)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Entity Connections</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.schemaEntity.entityConnections}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* E-E-A-T Authority */}
          <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/30 border-amber-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Award className="w-5 h-5 mr-2 text-amber-400" />
                E-E-A-T Authority
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Authority Score</span>
                <span className={`font-bold text-xl ${getScoreColor(metrics.eeAtScore)}`}>
                  {metrics.eeAtScore}
                </span>
              </div>
              <Progress value={metrics.eeAtScore} className="h-2" />
              
              {showDetailed && (
                <div className="space-y-3 pt-2 border-t border-amber-500/30">
                  <h4 className="text-sm font-semibold text-amber-400">Trust Signals</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Experience Signals</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.eeAt.experienceSignals}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Expertise</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.eeAt.expertiseIndicators}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Authorship</span>
                      {getStatusIcon(metrics.eeAt.authorshipMarkup)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Trust Score</span>
                      <Badge variant="outline" className="text-xs">
                        {metrics.eeAt.trustworthinessSignals}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TRADITIONAL SEO SECTION */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Search className="w-6 h-6 mr-2 text-blue-400" />
          Traditional SEO Metrics
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Performance Metrics */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-amber-400" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Overall Score</span>
                <span className={`font-bold text-xl ${getScoreColor(metrics.performanceScore)}`}>
                  {metrics.performanceScore}
                </span>
              </div>
              <Progress 
                value={metrics.performanceScore} 
                className="h-2"
              />
              
              {showDetailed && (
                <div className="space-y-3 pt-2 border-t border-slate-700">
                  <h4 className="text-sm font-semibold text-amber-400">Enhanced Core Web Vitals</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">LCP (Loading)</span>
                      {formatWebVital(metrics.coreWebVitals.lcp, 's', 2.5)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">FID (Interactivity)</span>
                      {formatWebVital(metrics.coreWebVitals.fid, 'ms', 100)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">CLS (Stability)</span>
                      {formatWebVital(metrics.coreWebVitals.cls, '', 0.1)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">INP (2025)</span>
                      {formatWebVital(metrics.coreWebVitals.inp, 'ms', 200)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">TTFB</span>
                      {formatWebVital(metrics.coreWebVitals.ttfb, 'ms', 600)}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

      {/* SEO Score */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center">
            <Search className="w-5 h-5 mr-2 text-green-400" />
            SEO Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">SEO Score</span>
            <span className={`font-bold text-xl ${getScoreColor(metrics.seoScore)}`}>
              {metrics.seoScore}
            </span>
          </div>
          <Progress 
            value={metrics.seoScore} 
            className="h-2"
          />
          
          {showDetailed && (
            <div className="space-y-3 pt-2 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-green-400">On-Page Elements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Title Tags</span>
                  {getStatusIcon(metrics.onPage.titleTag)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Meta Descriptions</span>
                  {getStatusIcon(metrics.onPage.metaDescription)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Header Structure</span>
                  <Badge variant="outline" className="text-xs">
                    {metrics.onPage.headings}/5
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Image Alt Text</span>
                  <Badge variant="outline" className="text-xs">
                    {metrics.onPage.altText}%
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-400" />
            Accessibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Accessibility Score</span>
            <span className={`font-bold text-xl ${getScoreColor(metrics.accessibilityScore)}`}>
              {metrics.accessibilityScore}
            </span>
          </div>
          <Progress 
            value={metrics.accessibilityScore} 
            className="h-2"
          />
          
          {showDetailed && (
            <div className="space-y-3 pt-2 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-blue-400">Technical Checks</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">HTTPS Security</span>
                  {getStatusIcon(metrics.technical.https)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mobile Friendly</span>
                  {getStatusIcon(metrics.technical.mobile)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Page Speed</span>
                  <Badge variant="outline" className="text-xs">
                    {metrics.technical.pageSpeed}s
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-400" />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Best Practices Score</span>
            <span className={`font-bold text-xl ${getScoreColor(metrics.bestPracticesScore)}`}>
              {metrics.bestPracticesScore}
            </span>
          </div>
          <Progress 
            value={metrics.bestPracticesScore} 
            className="h-2"
          />
          
          {showDetailed && (
            <div className="space-y-3 pt-2 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-purple-400">Security & Standards</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Security Headers</span>
                  <Badge variant="secondary" className="text-xs">Good</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Modern Standards</span>
                  <Badge variant="secondary" className="text-xs">Compliant</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backlinks */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center">
            <Link className="w-5 h-5 mr-2 text-indigo-400" />
            Backlink Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Domain Authority</span>
            <span className={`font-bold text-xl ${getScoreColor(metrics.backlinks.domainAuthority)}`}>
              {metrics.backlinks.domainAuthority}
            </span>
          </div>
          <Progress 
            value={metrics.backlinks.domainAuthority} 
            className="h-2"
          />
          
          {showDetailed && (
            <div className="space-y-3 pt-2 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-indigo-400">Link Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Backlinks</span>
                  <Badge variant="outline" className="text-xs">
                    {metrics.backlinks.totalBacklinks.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Referring Domains</span>
                  <Badge variant="outline" className="text-xs">
                    {metrics.backlinks.referringDomains.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Page Authority</span>
                  <Badge variant="outline" className="text-xs">
                    {metrics.backlinks.pageAuthority}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mobile Performance */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-pink-400" />
            Mobile Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Mobile Score</span>
            <span className={`font-bold text-xl ${getScoreColor(metrics.technical.mobileCoreWebVitals)}`}>
              {metrics.technical.mobileCoreWebVitals}
            </span>
          </div>
          <Progress 
            value={metrics.technical.mobileCoreWebVitals} 
            className="h-2"
          />
          
          {showDetailed && (
            <div className="space-y-3 pt-2 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-pink-400">Mobile Optimization</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Responsive Design</span>
                  {getStatusIcon(metrics.technical.mobile)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">PWA Ready</span>
                  {getStatusIcon(metrics.technical.pwaCompatibility)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Touch Optimization</span>
                  <Badge variant="secondary" className="text-xs">Enhanced</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  )
}

export default MetricsBreakdown
