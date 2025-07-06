import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface SEOMetrics {
  overallScore: number
  performanceScore: number
  seoScore: number
  accessibilityScore: number
  bestPracticesScore: number
  
  // NEW 2025 FEATURES
  aiSearchReadiness: number
  voiceSearchOptimization: number
  schemaEntityScore: number
  eeAtScore: number
  
  coreWebVitals: {
    lcp: number
    fid: number
    cls: number
    // Enhanced 2025 metrics
    inp: number
    tbt: number
    ttfb: number
  }
  
  // AI Search Optimization Analysis
  aiSearch: {
    sgeOptimization: number
    chatgptReadiness: number
    perplexityOptimization: number
    bingCopilotReadiness: number
    conversationalContent: boolean
    firstHandExperience: boolean
    multimediaRichness: number
  }
  
  // Voice Search Analysis
  voiceSearch: {
    conversationalKeywords: number
    featuredSnippetOpportunities: number
    localVoiceReadiness: number
    questionBasedContent: number
    averageReadingLevel: number
    naturalLanguageOptimization: boolean
  }
  
  // Advanced Schema & Entity Analysis
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
  }
  
  // E-E-A-T Authority Analysis
  eeAt: {
    experienceSignals: number
    expertiseIndicators: number
    authoritativenessScore: number
    trustworthinessSignals: number
    authorshipMarkup: boolean
    socialProof: number
    contentDepth: number
    sourceCredibility: number
  }
  
  technical: {
    https: boolean
    mobile: boolean
    pageSpeed: number
    imageOptimization: number
    // Enhanced technical metrics
    mobileCoreWebVitals: number
    pwaCompatibility: boolean
    structuredDataValidation: number
    internationalSeo: number
  }
  onPage: {
    titleTag: boolean
    metaDescription: boolean
    headings: number
    altText: number
    // Enhanced on-page metrics
    semanticKeywords: number
    contentComprehensiveness: number
    userIntentAlignment: number
    readabilityScore: number
  }
  backlinks: {
    totalBacklinks: number
    referringDomains: number
    domainAuthority: number
    pageAuthority: number
    // Enhanced backlink metrics
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
  userData: UserData | null
  showLeadCapture: boolean
  reportGenerated: boolean
  currentTier: 'free' | 'pro' | 'agency'
  featuresEnabled: {
    aiSearchAnalysis: boolean
    voiceSearchOptimization: boolean
    schemaAnalysis: boolean
    eeAtAnalysis: boolean
    brandedReports: boolean
    prioritySupport: boolean
    whitelabelReports: boolean
    bulkAudits: boolean
  }
}

type AuditAction = 
  | { type: 'SET_URL'; payload: string }
  | { type: 'START_ANALYSIS' }
  | { type: 'UPDATE_PROGRESS'; payload: number }
  | { type: 'SET_METRICS'; payload: SEOMetrics }
  | { type: 'SET_USER_DATA'; payload: UserData }
  | { type: 'SHOW_LEAD_CAPTURE' }
  | { type: 'HIDE_LEAD_CAPTURE' }
  | { type: 'REPORT_GENERATED' }
  | { type: 'SET_TIER'; payload: 'free' | 'pro' | 'agency' }
  | { type: 'RESET_AUDIT' }

const getInitialFeaturesForTier = (tier: 'free' | 'pro' | 'agency') => {
  switch (tier) {
    case 'free':
      return {
        aiSearchAnalysis: false,
        voiceSearchOptimization: false,
        schemaAnalysis: false,
        eeAtAnalysis: false,
        brandedReports: false,
        prioritySupport: false,
        whitelabelReports: false,
        bulkAudits: false,
      }
    case 'pro':
      return {
        aiSearchAnalysis: true,
        voiceSearchOptimization: true,
        schemaAnalysis: true,
        eeAtAnalysis: true,
        brandedReports: true,
        prioritySupport: true,
        whitelabelReports: false,
        bulkAudits: false,
      }
    case 'agency':
      return {
        aiSearchAnalysis: true,
        voiceSearchOptimization: true,
        schemaAnalysis: true,
        eeAtAnalysis: true,
        brandedReports: true,
        prioritySupport: true,
        whitelabelReports: true,
        bulkAudits: true,
      }
  }
}

const initialState: AuditState = {
  url: null,
  isAnalyzing: false,
  analysisProgress: 0,
  metrics: null,
  userData: null,
  showLeadCapture: false,
  reportGenerated: false,
  currentTier: 'free',
  featuresEnabled: getInitialFeaturesForTier('free'),
}

function auditReducer(state: AuditState, action: AuditAction): AuditState {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload }
    case 'START_ANALYSIS':
      return { ...state, isAnalyzing: true, analysisProgress: 0 }
    case 'UPDATE_PROGRESS':
      return { ...state, analysisProgress: action.payload }
    case 'SET_METRICS':
      return { ...state, metrics: action.payload, isAnalyzing: false }
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload }
    case 'SHOW_LEAD_CAPTURE':
      return { ...state, showLeadCapture: true }
    case 'HIDE_LEAD_CAPTURE':
      return { ...state, showLeadCapture: false }
    case 'REPORT_GENERATED':
      return { ...state, reportGenerated: true }
    case 'SET_TIER':
      return { 
        ...state, 
        currentTier: action.payload,
        featuresEnabled: getInitialFeaturesForTier(action.payload)
      }
    case 'RESET_AUDIT':
      return { ...initialState, currentTier: state.currentTier, featuresEnabled: state.featuresEnabled }
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
