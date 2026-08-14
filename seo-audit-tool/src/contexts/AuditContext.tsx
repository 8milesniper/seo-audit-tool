import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface SEOMetrics {
  overallScore: number
  // performanceScore/accessibilityScore/bestPracticesScore come from the real
  // Google PageSpeed Insights API and are null (rendered as "Unavailable")
  // when no API key is configured server-side - never a fabricated number.
  performanceScore: number | null
  seoScore: number
  accessibilityScore: number | null
  bestPracticesScore: number | null

  // NEW 2025 FEATURES
  aiSearchReadiness: number
  voiceSearchOptimization: number
  schemaEntityScore: number
  eeAtScore: number

  // Real Core Web Vitals from PageSpeed Insights. null (not 0) when
  // unavailable. FID is intentionally absent - Google retired it in favor of
  // INP in March 2024, so there is no real FID to report anymore.
  coreWebVitals: {
    lcp: number | null
    cls: number | null
    inp: number | null
    tbt: number | null
    ttfb: number | null
  }

  dataAvailability: {
    pagespeedUnavailable: boolean
    pagespeedUnavailableReason: string | null
    fetchError: string | null
  }

  // AI Search Optimization Analysis - real signals, disclosed heuristic
  // weighting per platform (see aiSearchAnalysis.ts)
  aiSearch: {
    sgeOptimization: number
    chatgptReadiness: number
    perplexityOptimization: number
    bingCopilotReadiness: number
    conversationalContent: boolean
    firstHandExperience: boolean
    multimediaRichness: number
    methodology: string
  }

  // Voice Search Analysis - real signals from the fetched page
  voiceSearch: {
    conversationalKeywords: number
    featuredSnippetOpportunities: number
    localVoiceReadiness: number
    questionBasedContent: number
    averageReadingLevel: number | null
    naturalLanguageOptimization: boolean
    methodology: string
  }

  // Advanced Schema & Entity Analysis - real parsed JSON-LD
  schemaEntity: {
    organizationSchema: boolean
    personSchema: boolean
    productSchema: boolean
    faqSchema: boolean
    howToSchema: boolean
    breadcrumbSchema: boolean
    localBusinessSchema: boolean
    entityConnections: number
    semanticMarkup: number
    knowledgeGraphPresence: boolean
    methodology: string
  }

  // E-E-A-T Authority Analysis - real signals from the fetched page
  eeAt: {
    experienceSignals: number
    expertiseIndicators: number
    authoritativenessScore: number
    trustworthinessSignals: number
    authorshipMarkup: boolean
    socialProof: number
    contentDepth: number
    sourceCredibility: number
    methodology: string
  }

  technical: {
    https: boolean
    mobile: boolean // real: viewport meta tag present
    pageSpeed: number | null // real: PSI Speed Index in seconds
    imageOptimization: number // real: reuses onPage.altText (alt-text coverage %)
    mobileCoreWebVitals: number | null // real: PSI mobile performance score
    pwaCompatibility: boolean // real: <link rel="manifest"> present
    touchTargetsOk: boolean | null // real: PSI Lighthouse "tap-targets" audit
    structuredDataValidation: number // real: reuses schemaEntityScore
    internationalSeo: number // real: hreflang tag count + lang attribute presence
    securityHeaders: { present: string[]; missing: string[]; count: number; total: number } // real: actual response headers
  }
  onPage: {
    titleTag: boolean
    metaDescription: boolean
    headings: number // real: 0-5 heading-structure-quality score, see scoreHeadingStructure()
    altText: number // real: % of <img> tags with non-empty alt text
    semanticKeywords: number // real: % of significant title words that also appear in body text
    contentComprehensiveness: number // real: reuses eeAt.contentDepth
    userIntentAlignment: number // real: avg of voiceSearch questionBasedContent + featuredSnippetOpportunities
    readabilityScore: number | null // real: reuses voiceSearch.averageReadingLevel (Flesch-Kincaid grade)
  }
  // Backlink/domain-authority data is NOT produced by the real engine - there
  // is no honest way to measure it without a paid third-party index (Ahrefs,
  // Moz, etc.), so it's optional and omitted rather than faked.
  backlinks?: {
    totalBacklinks: number
    referringDomains: number
    domainAuthority: number
    pageAuthority: number
    linkQualityScore: number
    topicalRelevance: number
    brandMentions: number
  }
  issues: Array<{
    type: 'critical' | 'warning' | 'info'
    category: 'traditional' | 'ai-search' | 'voice-search' | 'schema' | 'eeat' | 'performance'
    title: string
    description: string
    recommendation: string
    priority: number
    impact: 'high' | 'medium' | 'low'
  }>
}

export interface UserData {
  name: string
  email: string
  phone: string
  company?: string
}

interface AuditState {
  url: string | null
  isAnalyzing: boolean
  analysisProgress: number
  metrics: SEOMetrics | null
  error: string | null
  userData: UserData | null
  showLeadCapture: boolean
  reportGenerated: boolean
}

type AuditAction =
  | { type: 'SET_URL'; payload: string }
  | { type: 'START_ANALYSIS' }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'SET_METRICS'; payload: SEOMetrics }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_USER_DATA'; payload: UserData }
  | { type: 'SHOW_LEAD_CAPTURE' }
  | { type: 'HIDE_LEAD_CAPTURE' }
  | { type: 'REPORT_GENERATED' }
  | { type: 'RESET_AUDIT' }

const initialState: AuditState = {
  url: null,
  isAnalyzing: false,
  analysisProgress: 0,
  metrics: null,
  error: null,
  userData: null,
  showLeadCapture: false,
  reportGenerated: false,
}

function auditReducer(state: AuditState, action: AuditAction): AuditState {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload }
    case 'START_ANALYSIS':
      return { ...state, isAnalyzing: true, analysisProgress: 0, error: null }
    case 'UPDATE_PROGRESS':
      return { ...state, analysisProgress: action.payload }
    case 'SET_METRICS':
      return { ...state, metrics: action.payload, isAnalyzing: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isAnalyzing: false }
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload }
    case 'SHOW_LEAD_CAPTURE':
      return { ...state, showLeadCapture: true }
    case 'HIDE_LEAD_CAPTURE':
      return { ...state, showLeadCapture: false }
    case 'REPORT_GENERATED':
      return { ...state, reportGenerated: true }
    case 'RESET_AUDIT':
      return initialState
    default:
      return state
  }
}

const AuditContext = createContext<{
  state: AuditState
  dispatch: React.Dispatch<AuditAction>
} | null>(null)

export function AuditProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(auditReducer, initialState)

  return (
    <AuditContext.Provider value={{ state, dispatch }}>
      {children}
    </AuditContext.Provider>
  )
}

export function useAudit() {
  const context = useContext(AuditContext)
  if (!context) {
    throw new Error('useAudit must be used within an AuditProvider')
  }
  return context
}
