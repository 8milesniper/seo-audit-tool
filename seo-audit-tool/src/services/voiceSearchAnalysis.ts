// Voice Search Optimization Analysis Service
// Analyzes readiness for voice search across all platforms

export interface VoiceSearchMetrics {
  conversationalKeywords: number
  featuredSnippetOpportunities: number
  localVoiceReadiness: number
  questionBasedContent: number
  averageReadingLevel: number
  naturalLanguageOptimization: boolean
}

export const analyzeVoiceSearchOptimization = async (url: string, content?: string): Promise<VoiceSearchMetrics> => {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 700))

  const domain = new URL(url).hostname
  const isLocal = domain.includes('local') || domain.includes('restaurant') || domain.includes('business')
  
  // Conversational Keywords Analysis
  const conversationalKeywords = analyzeConversationalKeywords(url, content)
  
  // Featured Snippet Opportunities
  const featuredSnippetOpportunities = analyzeFeaturedSnippetOpportunities(url, content)
  
  // Local Voice Search Readiness
  const localVoiceReadiness = analyzeLocalVoiceReadiness(url, isLocal)
  
  // Question-Based Content Analysis
  const questionBasedContent = analyzeQuestionBasedContent(content)
  
  // Reading Level Analysis
  const averageReadingLevel = analyzeReadingLevel(content)
  
  // Natural Language Optimization
  const naturalLanguageOptimization = analyzeNaturalLanguageOptimization(content)

  return {
    conversationalKeywords,
    featuredSnippetOpportunities,
    localVoiceReadiness,
    questionBasedContent,
    averageReadingLevel,
    naturalLanguageOptimization
  }
}

const analyzeConversationalKeywords = (url: string, content?: string): number => {
  let score = 40 // Base score
  
  // Check for conversational keyword patterns
  const conversationalPatterns = [
    'how to', 'what is', 'where can', 'why does', 'when should',
    'best way to', 'how do I', 'what are the', 'where is the',
    'who is', 'which is better', 'near me', 'closest'
  ]
  
  if (content) {
    const contentLower = content.toLowerCase()
    const foundPatterns = conversationalPatterns.filter(pattern => 
      contentLower.includes(pattern)
    )
    score += foundPatterns.length * 8
  }
  
  // URL structure analysis
  const urlPath = new URL(url).pathname.toLowerCase()
  if (urlPath.includes('how-') || urlPath.includes('what-') || urlPath.includes('guide')) {
    score += 15
  }
  
  // Domain type bonus
  const domain = new URL(url).hostname
  if (domain.includes('help') || domain.includes('guide') || domain.includes('tutorial')) {
    score += 10
  }
  
  return Math.min(Math.max(score, 20), 100)
}

const analyzeFeaturedSnippetOpportunities = (url: string, content?: string): number => {
  let score = 35 // Base score
  
  if (content) {
    const contentLower = content.toLowerCase()
    
    // Check for structured content that works well for snippets
    const snippetIndicators = [
      'steps:', 'how to:', 'definition:', 'what is',
      'list of', 'benefits of', 'types of', 'examples of'
    ]
    
    const foundIndicators = snippetIndicators.filter(indicator => 
      contentLower.includes(indicator)
    )
    score += foundIndicators.length * 10
    
    // Check for numbered lists or bullet points (simulated)
    if (contentLower.includes('1.') || contentLower.includes('•') || contentLower.includes('-')) {
      score += 15
    }
    
    // Check for FAQ-style content
    if (contentLower.includes('question') || contentLower.includes('answer') || contentLower.includes('faq')) {
      score += 12
    }
  }
  
  // URL structure for snippet optimization
  const urlPath = new URL(url).pathname.toLowerCase()
  if (urlPath.includes('faq') || urlPath.includes('guide') || urlPath.includes('tutorial')) {
    score += 10
  }
  
  return Math.min(Math.max(score, 15), 100)
}

const analyzeLocalVoiceReadiness = (url: string, isLocal: boolean): number => {
  let score = 30 // Base score
  
  if (isLocal) score += 20 // Local businesses get bonus
  
  const domain = new URL(url).hostname
  const urlPath = new URL(url).pathname.toLowerCase()
  
  // Local business indicators
  const localIndicators = [
    'address', 'location', 'hours', 'contact', 'directions',
    'phone', 'call', 'visit', 'store', 'office', 'near'
  ]
  
  const foundLocalIndicators = localIndicators.filter(indicator => 
    domain.includes(indicator) || urlPath.includes(indicator)
  )
  score += foundLocalIndicators.length * 5
  
  // Google Business Profile optimization (simulated)
  if (Math.random() > 0.4) score += 15
  
  // NAP consistency (simulated)
  if (Math.random() > 0.3) score += 10
  
  // Reviews presence (simulated)
  if (Math.random() > 0.5) score += 8
  
  return Math.min(Math.max(score, 20), 100)
}

const analyzeQuestionBasedContent = (content?: string): number => {
  let score = 25 // Base score
  
  if (!content) return score + Math.floor(Math.random() * 30)
  
  const contentLower = content.toLowerCase()
  
  // Count question words
  const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'which']
  const questionCount = questionWords.reduce((count, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    const matches = contentLower.match(regex)
    return count + (matches ? matches.length : 0)
  }, 0)
  
  score += Math.min(questionCount * 3, 40)
  
  // Check for actual question marks
  const questionMarks = (content.match(/\?/g) || []).length
  score += Math.min(questionMarks * 2, 20)
  
  // FAQ section detection
  if (contentLower.includes('frequently asked') || contentLower.includes('common questions')) {
    score += 15
  }
  
  return Math.min(Math.max(score, 10), 100)
}

const analyzeReadingLevel = (content?: string): number => {
  if (!content) return Math.floor(Math.random() * 30) + 50 // Random score 50-80
  
  // Simple readability analysis
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const words = content.split(/\s+/).filter(w => w.trim().length > 0)
  const syllables = words.reduce((count, word) => count + countSyllables(word), 0)
  
  if (sentences.length === 0 || words.length === 0) return 60
  
  // Flesch Reading Ease approximation
  const avgSentenceLength = words.length / sentences.length
  const avgSyllablesPerWord = syllables / words.length
  
  const readingEase = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord)
  
  // Convert to 0-100 scale where higher is better for voice search
  return Math.min(Math.max(Math.round(readingEase), 20), 100)
}

const countSyllables = (word: string): number => {
  // Simple syllable counting algorithm
  word = word.toLowerCase()
  let count = 0
  const vowels = 'aeiouy'
  let previousChar = ''
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    if (vowels.includes(char) && !vowels.includes(previousChar)) {
      count++
    }
    previousChar = char
  }
  
  // Adjust for silent e
  if (word.endsWith('e')) count--
  
  return Math.max(count, 1)
}

const analyzeNaturalLanguageOptimization = (content?: string): boolean => {
  if (!content) return Math.random() > 0.5
  
  const contentLower = content.toLowerCase()
  
  // Natural language indicators
  const naturalLanguageIndicators = [
    'you can', 'you should', 'you might', 'you need to',
    'let\'s', 'here\'s how', 'simply', 'easily', 'just',
    'first', 'next', 'then', 'finally', 'in conclusion'
  ]
  
  const foundIndicators = naturalLanguageIndicators.filter(indicator => 
    contentLower.includes(indicator)
  )
  
  // Check for conversational tone
  const hasConversationalTone = foundIndicators.length >= 3
  
  // Check for personal pronouns
  const pronouns = ['you', 'your', 'we', 'our', 'us']
  const pronounCount = pronouns.reduce((count, pronoun) => {
    const regex = new RegExp(`\\b${pronoun}\\b`, 'gi')
    const matches = contentLower.match(regex)
    return count + (matches ? matches.length : 0)
  }, 0)
  
  const hasPersonalTouch = pronounCount > 5
  
  return hasConversationalTone || hasPersonalTouch
}

// Calculate overall Voice Search Optimization Score
export const calculateVoiceSearchScore = (metrics: VoiceSearchMetrics): number => {
  const weights = {
    conversationalKeywords: 0.25,       // 25% - Core voice search factor
    featuredSnippetOpportunities: 0.25, // 25% - Voice assistants read snippets
    localVoiceReadiness: 0.2,           // 20% - Many voice searches are local
    questionBasedContent: 0.15,         // 15% - Voice queries are often questions
    averageReadingLevel: 0.1,           // 10% - Readability for voice
    naturalLanguageOptimization: 0.05   // 5% - Conversational tone bonus
  }
  
  let score = 
    metrics.conversationalKeywords * weights.conversationalKeywords +
    metrics.featuredSnippetOpportunities * weights.featuredSnippetOpportunities +
    metrics.localVoiceReadiness * weights.localVoiceReadiness +
    metrics.questionBasedContent * weights.questionBasedContent +
    metrics.averageReadingLevel * weights.averageReadingLevel +
    (metrics.naturalLanguageOptimization ? 100 : 0) * weights.naturalLanguageOptimization
  
  return Math.round(Math.min(Math.max(score, 15), 100))
}

// Generate Voice Search optimization recommendations
export const generateVoiceSearchRecommendations = (metrics: VoiceSearchMetrics): Array<{
  type: 'critical' | 'warning' | 'info'
  category: 'voice-search'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}> => {
  const recommendations = []

  // Conversational Keywords
  if (metrics.conversationalKeywords < 60) {
    recommendations.push({
      type: 'critical' as const,
      category: 'voice-search' as const,
      title: 'Optimize for Conversational Keywords',
      description: 'Your content lacks conversational keywords that users speak when using voice search.',
      recommendation: 'Include long-tail, question-based keywords like "how to", "what is", "where can I", and location-based phrases like "near me".',
      priority: 1,
      impact: 'high' as const
    })
  }

  // Featured Snippet Opportunities
  if (metrics.featuredSnippetOpportunities < 50) {
    recommendations.push({
      type: 'warning' as const,
      category: 'voice-search' as const,
      title: 'Improve Featured Snippet Optimization',
      description: 'Voice assistants often read featured snippets as answers. Your content structure needs improvement.',
      recommendation: 'Create clear, concise answers to common questions, use numbered lists, bullet points, and structured data markup for better snippet chances.',
      priority: 2,
      impact: 'high' as const
    })
  }

  // Local Voice Readiness
  if (metrics.localVoiceReadiness < 70) {
    recommendations.push({
      type: 'warning' as const,
      category: 'voice-search' as const,
      title: 'Enhance Local Voice Search Presence',
      description: 'Many voice searches are local. Your local SEO optimization needs improvement.',
      recommendation: 'Optimize Google Business Profile, ensure NAP consistency, encourage reviews, and include location-specific content.',
      priority: 3,
      impact: 'medium' as const
    })
  }

  // Question-Based Content
  if (metrics.questionBasedContent < 40) {
    recommendations.push({
      type: 'info' as const,
      category: 'voice-search' as const,
      title: 'Add More Question-Based Content',
      description: 'Voice searches are often phrased as questions. Your content should anticipate and answer these.',
      recommendation: 'Create FAQ sections, use question-based headings, and structure content to answer who, what, when, where, why, and how questions.',
      priority: 4,
      impact: 'medium' as const
    })
  }

  // Reading Level
  if (metrics.averageReadingLevel < 60) {
    recommendations.push({
      type: 'info' as const,
      category: 'voice-search' as const,
      title: 'Improve Content Readability',
      description: 'Complex content is harder for voice assistants to read naturally.',
      recommendation: 'Use shorter sentences, simpler words, and clear structure. Aim for conversational, easy-to-understand language.',
      priority: 5,
      impact: 'low' as const
    })
  }

  // Natural Language Optimization
  if (!metrics.naturalLanguageOptimization) {
    recommendations.push({
      type: 'info' as const,
      category: 'voice-search' as const,
      title: 'Use More Natural Language',
      description: 'Your content lacks the conversational tone that works well for voice search.',
      recommendation: 'Write as if speaking to a friend, use "you" and "your", include transitional phrases, and adopt a helpful, conversational tone.',
      priority: 6,
      impact: 'low' as const
    })
  }

  return recommendations
}
