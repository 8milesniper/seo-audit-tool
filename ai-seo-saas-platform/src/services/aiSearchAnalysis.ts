// AI Search Engine Optimization Analysis Service
// Analyzes readiness for Google SGE, ChatGPT Search, Perplexity AI, and Bing Copilot

export interface AISearchMetrics {
  sgeOptimization: number
  chatgptReadiness: number
  perplexityOptimization: number
  bingCopilotReadiness: number
  conversationalContent: boolean
  firstHandExperience: boolean
  multimediaRichness: number
}

export const analyzeAISearchReadiness = async (url: string, content?: string): Promise<AISearchMetrics> => {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 800))

  const domain = new URL(url).hostname
  const isEcommerce = domain.includes('shop') || domain.includes('store') || domain.includes('buy')
  const isLocal = domain.includes('local') || domain.includes('restaurant') || domain.includes('business')
  
  // Google SGE Optimization Analysis
  const sgeOptimization = analyzeSGEOptimization(url, content)
  
  // ChatGPT Search Readiness
  const chatgptReadiness = analyzeChatGPTReadiness(url, content)
  
  // Perplexity AI Optimization
  const perplexityOptimization = analyzePerplexityOptimization(url, content)
  
  // Bing Copilot Readiness
  const bingCopilotReadiness = analyzeBingCopilotReadiness(url, content)
  
  // Conversational Content Analysis
  const conversationalContent = analyzeConversationalContent(content)
  
  // First-Hand Experience Detection
  const firstHandExperience = analyzeFirstHandExperience(url, content)
  
  // Multimedia Richness Score
  const multimediaRichness = analyzeMultimediaRichness(url)

  return {
    sgeOptimization,
    chatgptReadiness,
    perplexityOptimization,
    bingCopilotReadiness,
    conversationalContent,
    firstHandExperience,
    multimediaRichness
  }
}

const analyzeSGEOptimization = (url: string, content?: string): number => {
  let score = 50 // Base score
  
  // E-E-A-T signals boost SGE performance
  if (url.includes('about') || url.includes('team')) score += 15
  
  // HTTPS is essential for SGE
  if (url.startsWith('https://')) score += 10
  
  // Structured data presence (simulated)
  const hasStructuredData = Math.random() > 0.4
  if (hasStructuredData) score += 15
  
  // Content comprehensiveness
  const contentLength = content?.length || Math.floor(Math.random() * 5000) + 1000
  if (contentLength > 2000) score += 10
  
  // Authority indicators
  const isAuthoritative = url.includes('expert') || url.includes('professional') || url.includes('certified')
  if (isAuthoritative) score += 10
  
  return Math.min(Math.max(score, 20), 100)
}

const analyzeChatGPTReadiness = (url: string, content?: string): number => {
  let score = 45 // Base score
  
  // Clear, factual content performs well
  const domain = new URL(url).hostname
  if (domain.includes('wiki') || domain.includes('edu') || domain.includes('gov')) score += 20
  
  // Well-structured content
  const hasGoodStructure = Math.random() > 0.3
  if (hasGoodStructure) score += 15
  
  // Recent content (simulated by checking for common recent terms)
  const hasRecentContent = content?.includes('2024') || content?.includes('2025') || Math.random() > 0.5
  if (hasRecentContent) score += 10
  
  // Natural language usage
  const hasNaturalLanguage = content?.includes('how to') || content?.includes('what is') || Math.random() > 0.4
  if (hasNaturalLanguage) score += 10
  
  return Math.min(Math.max(score, 25), 100)
}

const analyzePerplexityOptimization = (url: string, content?: string): number => {
  let score = 48 // Base score
  
  // Citation-worthy content performs well on Perplexity
  const hasCitations = url.includes('research') || url.includes('study') || url.includes('report')
  if (hasCitations) score += 18
  
  // Academic or professional sources
  const domain = new URL(url).hostname
  if (domain.includes('edu') || domain.includes('org') || domain.includes('institute')) score += 15
  
  // Factual, data-driven content
  const hasData = content?.includes('data') || content?.includes('statistics') || Math.random() > 0.4
  if (hasData) score += 12
  
  // Clear authorship
  const hasAuthorship = content?.includes('author') || content?.includes('by ') || Math.random() > 0.5
  if (hasAuthorship) score += 7
  
  return Math.min(Math.max(score, 30), 100)
}

const analyzeBingCopilotReadiness = (url: string, content?: string): number => {
  let score = 46 // Base score
  
  // Microsoft ecosystem compatibility
  const domain = new URL(url).hostname
  if (domain.includes('microsoft') || domain.includes('office') || domain.includes('azure')) score += 20
  
  // Business-focused content
  const isBusinessFocused = url.includes('business') || url.includes('enterprise') || url.includes('professional')
  if (isBusinessFocused) score += 15
  
  // Structured, professional content
  const hasStructuredContent = Math.random() > 0.3
  if (hasStructuredContent) score += 12
  
  // Integration-friendly markup
  const hasApiDocs = url.includes('api') || url.includes('integration') || url.includes('developer')
  if (hasApiDocs) score += 8
  
  return Math.min(Math.max(score, 25), 100)
}

const analyzeConversationalContent = (content?: string): boolean => {
  if (!content) return Math.random() > 0.5
  
  const conversationalIndicators = [
    'how to', 'what is', 'why does', 'when should', 'where can',
    'you can', 'you should', 'you might', 'let\'s', 'here\'s how'
  ]
  
  const hasConversationalTone = conversationalIndicators.some(indicator => 
    content.toLowerCase().includes(indicator)
  )
  
  return hasConversationalTone || Math.random() > 0.4
}

const analyzeFirstHandExperience = (url: string, content?: string): boolean => {
  const experienceIndicators = [
    'experience', 'tested', 'tried', 'used', 'reviewed',
    'case study', 'real world', 'hands on', 'personal',
    'we found', 'our team', 'i discovered'
  ]
  
  if (content) {
    return experienceIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    )
  }
  
  // Check URL for experience indicators
  const urlExperience = url.includes('review') || url.includes('case-study') || url.includes('experience')
  return urlExperience || Math.random() > 0.6
}

const analyzeMultimediaRichness = (url: string): number => {
  let score = 30 // Base score
  
  // Simulate multimedia analysis based on common patterns
  const domain = new URL(url).hostname
  
  // Video-rich sites
  if (domain.includes('youtube') || domain.includes('video') || domain.includes('tv')) score += 30
  
  // Image-rich sites
  if (domain.includes('photo') || domain.includes('gallery') || domain.includes('portfolio')) score += 25
  
  // Professional sites likely to have good multimedia
  if (domain.includes('company') || domain.includes('agency') || domain.includes('studio')) score += 20
  
  // E-commerce sites typically have product images
  if (domain.includes('shop') || domain.includes('store') || domain.includes('buy')) score += 15
  
  // Random variation for realism
  score += Math.floor(Math.random() * 20) - 10
  
  return Math.min(Math.max(score, 10), 100)
}

// Calculate overall AI Search Readiness Score
export const calculateAISearchReadinessScore = (metrics: AISearchMetrics): number => {
  const weights = {
    sgeOptimization: 0.3,      // 30% - Google SGE is most important
    chatgptReadiness: 0.25,    // 25% - ChatGPT search growing rapidly
    perplexityOptimization: 0.2, // 20% - Popular for research
    bingCopilotReadiness: 0.15,  // 15% - Microsoft integration
    conversationalContent: 0.05, // 5% - Bonus for conversational tone
    firstHandExperience: 0.03,   // 3% - E-E-A-T factor
    multimediaRichness: 0.02     // 2% - Visual engagement
  }
  
  let score = 
    metrics.sgeOptimization * weights.sgeOptimization +
    metrics.chatgptReadiness * weights.chatgptReadiness +
    metrics.perplexityOptimization * weights.perplexityOptimization +
    metrics.bingCopilotReadiness * weights.bingCopilotReadiness +
    (metrics.conversationalContent ? 100 : 0) * weights.conversationalContent +
    (metrics.firstHandExperience ? 100 : 0) * weights.firstHandExperience +
    metrics.multimediaRichness * weights.multimediaRichness
  
  return Math.round(Math.min(Math.max(score, 20), 100))
}

// Generate AI Search optimization recommendations
export const generateAISearchRecommendations = (metrics: AISearchMetrics): Array<{
  type: 'critical' | 'warning' | 'info'
  category: 'ai-search'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}> => {
  const recommendations = []

  // SGE Optimization
  if (metrics.sgeOptimization < 70) {
    recommendations.push({
      type: 'critical' as const,
      category: 'ai-search' as const,
      title: 'Google SGE Optimization Needed',
      description: 'Your content is not optimized for Google\'s Search Generative Experience, which may impact visibility in AI-powered search results.',
      recommendation: 'Implement comprehensive E-E-A-T signals, add structured data markup, create authoritative content with first-hand experience, and optimize for conversational queries.',
      priority: 1,
      impact: 'high' as const
    })
  }

  // ChatGPT Readiness
  if (metrics.chatgptReadiness < 60) {
    recommendations.push({
      type: 'warning' as const,
      category: 'ai-search' as const,
      title: 'ChatGPT Search Readiness Low',
      description: 'Your content may not perform well in ChatGPT search results due to lack of clear, factual structure.',
      recommendation: 'Create well-structured, factual content with clear headings, use natural language, and ensure information is current and accurate.',
      priority: 2,
      impact: 'medium' as const
    })
  }

  // Perplexity Optimization
  if (metrics.perplexityOptimization < 65) {
    recommendations.push({
      type: 'warning' as const,
      category: 'ai-search' as const,
      title: 'Perplexity AI Optimization Opportunity',
      description: 'Your content could be better optimized for Perplexity AI, which prioritizes citable, authoritative sources.',
      recommendation: 'Add proper citations, include author bylines, use data-driven content, and establish clear expertise indicators.',
      priority: 3,
      impact: 'medium' as const
    })
  }

  // Conversational Content
  if (!metrics.conversationalContent) {
    recommendations.push({
      type: 'info' as const,
      category: 'ai-search' as const,
      title: 'Add Conversational Content Elements',
      description: 'Your content lacks conversational elements that AI search engines prefer.',
      recommendation: 'Include question-based headings, use natural language, add FAQ sections, and write in a conversational tone that matches how users speak.',
      priority: 4,
      impact: 'medium' as const
    })
  }

  // First-Hand Experience
  if (!metrics.firstHandExperience) {
    recommendations.push({
      type: 'info' as const,
      category: 'ai-search' as const,
      title: 'Demonstrate First-Hand Experience',
      description: 'AI search engines prioritize content that shows real-world experience and expertise.',
      recommendation: 'Add case studies, personal experiences, behind-the-scenes content, and real-world examples that demonstrate your expertise.',
      priority: 5,
      impact: 'low' as const
    })
  }

  return recommendations
}
