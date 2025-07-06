// E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Analysis Service
// Analyzes content authority and trust signals for AI search optimization

export interface EEATMetrics {
  experienceSignals: number
  expertiseIndicators: number
  authoritativenessScore: number
  trustworthinessSignals: number
  authorshipMarkup: boolean
  socialProof: number
  contentDepth: number
  sourceCredibility: number
}

export const analyzeEEAT = async (url: string, content?: string): Promise<EEATMetrics> => {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const domain = new URL(url).hostname
  const urlPath = new URL(url).pathname.toLowerCase()
  
  // Analyze E-E-A-T components
  const experienceSignals = analyzeExperienceSignals(url, content)
  const expertiseIndicators = analyzeExpertiseIndicators(url, domain, content)
  const authoritativenessScore = analyzeAuthoritativeness(url, domain)
  const trustworthinessSignals = analyzeTrustworthiness(url, domain, content)
  const authorshipMarkup = analyzeAuthorshipMarkup(url, content)
  const socialProof = analyzeSocialProof(url, domain)
  const contentDepth = analyzeContentDepth(content)
  const sourceCredibility = analyzeSourceCredibility(url, domain, content)

  return {
    experienceSignals,
    expertiseIndicators,
    authoritativenessScore,
    trustworthinessSignals,
    authorshipMarkup,
    socialProof,
    contentDepth,
    sourceCredibility
  }
}

const analyzeExperienceSignals = (url: string, content?: string): number => {
  let score = 25 // Base score
  
  // First-hand experience indicators in URL
  const experienceUrls = ['/review', '/experience', '/case-study', '/tested', '/used', '/tried']
  if (experienceUrls.some(exp => url.includes(exp))) {
    score += 20
  }
  
  if (content) {
    const contentLower = content.toLowerCase()
    
    // First-person experience indicators
    const firstPersonIndicators = [
      'i tested', 'i used', 'i tried', 'i found', 'i discovered',
      'we tested', 'we used', 'we found', 'our experience',
      'in my experience', 'personally', 'real world', 'hands on'
    ]
    
    const foundFirstPerson = firstPersonIndicators.filter(indicator => 
      contentLower.includes(indicator)
    )
    score += foundFirstPerson.length * 8
    
    // Case study indicators
    const caseStudyIndicators = ['case study', 'real example', 'actual results', 'before and after']
    const foundCaseStudy = caseStudyIndicators.filter(indicator => 
      contentLower.includes(indicator)
    )
    score += foundCaseStudy.length * 10
    
    // Time-based experience indicators
    const timeIndicators = ['years of', 'months of', 'experience with', 'working with']
    const foundTime = timeIndicators.filter(indicator => 
      contentLower.includes(indicator)
    )
    score += foundTime.length * 5
  }
  
  return Math.min(Math.max(score, 10), 100)
}

const analyzeExpertiseIndicators = (url: string, domain: string, content?: string): number => {
  let score = 30 // Base score
  
  // Domain authority indicators
  const expertDomains = ['expert', 'professional', 'specialist', 'certified', 'academy', 'institute']
  if (expertDomains.some(expert => domain.includes(expert))) {
    score += 20
  }
  
  // Educational domains
  if (domain.includes('edu') || domain.includes('university') || domain.includes('college')) {
    score += 25
  }
  
  // Professional domains
  if (domain.includes('md') || domain.includes('phd') || domain.includes('cpa')) {
    score += 15
  }
  
  if (content) {
    const contentLower = content.toLowerCase()
    
    // Expertise indicators in content
    const expertiseIndicators = [
      'certified', 'licensed', 'degree in', 'phd', 'masters', 'bachelor',
      'board certified', 'specialist in', 'expert in', 'years of experience',
      'trained in', 'qualified', 'accredited', 'fellowship'
    ]
    
    const foundExpertise = expertiseIndicators.filter(indicator => 
      contentLower.includes(indicator)
    )
    score += foundExpertise.length * 6
    
    // Technical depth indicators
    const technicalIndicators = [
      'methodology', 'analysis', 'research', 'study', 'data',
      'algorithm', 'framework', 'best practices', 'industry standard'
    ]
    
    const foundTechnical = technicalIndicators.filter(indicator => 
      contentLower.includes(indicator)
    )
    score += foundTechnical.length * 3
  }
  
  return Math.min(Math.max(score, 15), 100)
}

const analyzeAuthoritativeness = (url: string, domain: string): number => {
  let score = 35 // Base score
  
  // Government and educational domains
  if (domain.includes('gov') || domain.includes('edu')) {
    score += 30
  }
  
  // Established organizations
  if (domain.includes('org') || domain.includes('institute') || domain.includes('foundation')) {
    score += 20
  }
  
  // Professional services
  if (domain.includes('corp') || domain.includes('inc') || domain.includes('llc')) {
    score += 15
  }
  
  // About/team pages indicate transparency
  if (url.includes('/about') || url.includes('/team') || url.includes('/leadership')) {
    score += 12
  }
  
  // Awards and recognition pages
  if (url.includes('/awards') || url.includes('/recognition') || url.includes('/accolades')) {
    score += 10
  }
  
  // Domain age simulation (shorter domains often more established)
  if (domain.length < 12 && !domain.includes('-')) {
    score += 8
  }
  
  return Math.min(Math.max(score, 20), 100)
}

const analyzeTrustworthiness = (url: string, domain: string, content?: string): number => {
  let score = 40 // Base score
  
  // HTTPS is essential for trust
  if (url.startsWith('https://')) {
    score += 15
  } else {
    score -= 20 // Penalty for HTTP
  }
  
  // Trust indicators in URL structure
  const trustUrls = ['/privacy', '/terms', '/security', '/contact', '/legal']
  const foundTrustUrls = trustUrls.filter(trustUrl => 
    url.includes(trustUrl) || domain.includes(trustUrl.substring(1))
  )
  score += foundTrustUrls.length * 8
  
  // Medical, legal, financial domains need extra trust signals
  const ymlDomains = ['medical', 'health', 'legal', 'finance', 'bank', 'insurance']
  const isYMYL = ymlDomains.some(ymyl => domain.includes(ymyl))
  if (isYMYL) {
    score += 10 // Bonus for having trust signals in YMYL
  }
  
  if (content) {
    const contentLower = content.toLowerCase()
    
    // Trust signals in content
    const trustSignals = [
      'privacy policy', 'terms of service', 'secure', 'certified',
      'verified', 'guarantee', 'contact us', 'customer service',
      'refund policy', 'satisfaction guarantee'
    ]
    
    const foundTrustSignals = trustSignals.filter(signal => 
      contentLower.includes(signal)
    )
    score += foundTrustSignals.length * 5
    
    // Transparency indicators
    const transparencyIndicators = [
      'disclosure', 'affiliate', 'sponsored', 'advertisement',
      'terms and conditions', 'disclaimer'
    ]
    
    const foundTransparency = transparencyIndicators.filter(indicator => 
      contentLower.includes(indicator)
    )
    score += foundTransparency.length * 3
  }
  
  return Math.min(Math.max(score, 15), 100)
}

const analyzeAuthorshipMarkup = (url: string, content?: string): boolean => {
  // Author page indicators
  const isAuthorPage = url.includes('/author') || url.includes('/by/') || url.includes('/writer')
  
  let probability = 0.2 // Base probability
  if (isAuthorPage) probability += 0.6
  
  if (content) {
    const contentLower = content.toLowerCase()
    
    // Authorship indicators
    const authorshipIndicators = [
      'written by', 'author:', 'by ', 'about the author',
      'bio', 'profile', 'contact author'
    ]
    
    const hasAuthorshipIndicators = authorshipIndicators.some(indicator => 
      contentLower.includes(indicator)
    )
    
    if (hasAuthorshipIndicators) probability += 0.4
  }
  
  // Blog posts and articles more likely to have authorship
  if (url.includes('/blog') || url.includes('/article') || url.includes('/news')) {
    probability += 0.3
  }
  
  return Math.random() < probability
}

const analyzeSocialProof = (url: string, domain: string): number => {
  let score = 30 // Base score
  
  // Social media presence indicators
  const socialIndicators = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube']
  const hasSocialIndicators = socialIndicators.some(social => 
    url.includes(social) || domain.includes(social)
  )
  
  if (hasSocialIndicators) score += 20
  
  // Reviews and testimonials
  if (url.includes('/reviews') || url.includes('/testimonials') || url.includes('/feedback')) {
    score += 15
  }
  
  // Awards and certifications
  if (url.includes('/awards') || url.includes('/certifications') || url.includes('/recognition')) {
    score += 12
  }
  
  // Press and media mentions
  if (url.includes('/press') || url.includes('/media') || url.includes('/news')) {
    score += 10
  }
  
  // Customer stories
  if (url.includes('/customers') || url.includes('/case-studies') || url.includes('/success')) {
    score += 8
  }
  
  return Math.min(Math.max(score, 10), 100)
}

const analyzeContentDepth = (content?: string): number => {
  if (!content) return Math.floor(Math.random() * 40) + 30 // Random 30-70
  
  let score = 20 // Base score
  
  // Content length analysis
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length
  
  if (wordCount > 2000) score += 30
  else if (wordCount > 1000) score += 20
  else if (wordCount > 500) score += 10
  
  // Structure indicators
  const structureIndicators = content.match(/#{1,6}\s/g) || [] // Headers
  score += Math.min(structureIndicators.length * 2, 15)
  
  // Lists and organization
  const listItems = (content.match(/^\s*[-*+]\s/gm) || []).length
  score += Math.min(listItems, 10)
  
  // Citations and references
  const citations = (content.match(/\[.*?\]|\(.*?\)/g) || []).length
  score += Math.min(citations, 15)
  
  return Math.min(Math.max(score, 10), 100)
}

const analyzeSourceCredibility = (url: string, domain: string, content?: string): number => {
  let score = 35 // Base score
  
  // High-authority domains
  const authorityDomains = ['gov', 'edu', 'org', 'wikipedia', 'reuters', 'bbc', 'cnn']
  if (authorityDomains.some(auth => domain.includes(auth))) {
    score += 25
  }
  
  // Professional domains
  const professionalDomains = ['corp', 'inc', 'institute', 'academy', 'association']
  if (professionalDomains.some(prof => domain.includes(prof))) {
    score += 15
  }
  
  if (content) {
    const contentLower = content.toLowerCase()
    
    // Citation indicators
    const citationIndicators = [
      'source:', 'according to', 'study by', 'research from',
      'published in', 'journal', 'peer reviewed'
    ]
    
    const foundCitations = citationIndicators.filter(citation => 
      contentLower.includes(citation)
    )
    score += foundCitations.length * 5
    
    // External links to authoritative sources
    const linkCount = (content.match(/https?:\/\//g) || []).length
    score += Math.min(linkCount * 2, 20)
  }
  
  // Recent publication date simulation
  if (Math.random() > 0.3) score += 10 // 70% chance of recent content
  
  return Math.min(Math.max(score, 15), 100)
}

// Calculate overall E-E-A-T Score
export const calculateEEATScore = (metrics: EEATMetrics): number => {
  const weights = {
    experienceSignals: 0.25,        // 25% - First-hand experience
    expertiseIndicators: 0.2,       // 20% - Domain expertise
    authoritativenessScore: 0.2,    // 20% - Authority and recognition
    trustworthinessSignals: 0.15,   // 15% - Trust and transparency
    authorshipMarkup: 0.05,         // 5% - Clear authorship
    socialProof: 0.05,              // 5% - Social validation
    contentDepth: 0.05,             // 5% - Content comprehensiveness
    sourceCredibility: 0.05         // 5% - Source quality
  }
  
  let score = 
    metrics.experienceSignals * weights.experienceSignals +
    metrics.expertiseIndicators * weights.expertiseIndicators +
    metrics.authoritativenessScore * weights.authoritativenessScore +
    metrics.trustworthinessSignals * weights.trustworthinessSignals +
    (metrics.authorshipMarkup ? 100 : 0) * weights.authorshipMarkup +
    metrics.socialProof * weights.socialProof +
    metrics.contentDepth * weights.contentDepth +
    metrics.sourceCredibility * weights.sourceCredibility
  
  return Math.round(Math.min(Math.max(score, 10), 100))
}

// Generate E-E-A-T optimization recommendations
export const generateEEATRecommendations = (metrics: EEATMetrics): Array<{
  type: 'critical' | 'warning' | 'info'
  category: 'eeat'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}> => {
  const recommendations = []

  // Experience Signals
  if (metrics.experienceSignals < 50) {
    recommendations.push({
      type: 'critical' as const,
      category: 'eeat' as const,
      title: 'Demonstrate First-Hand Experience',
      description: 'Content lacks indicators of real-world experience and practical knowledge.',
      recommendation: 'Add case studies, personal experiences, test results, and real-world examples. Use first-person language and show actual usage or implementation.',
      priority: 1,
      impact: 'high' as const
    })
  }

  // Expertise Indicators
  if (metrics.expertiseIndicators < 60) {
    recommendations.push({
      type: 'critical' as const,
      category: 'eeat' as const,
      title: 'Strengthen Expertise Indicators',
      description: 'Website lacks clear indicators of subject matter expertise and qualifications.',
      recommendation: 'Add author credentials, certifications, education background, and professional experience. Include technical depth and industry-specific knowledge.',
      priority: 2,
      impact: 'high' as const
    })
  }

  // Authoritativeness
  if (metrics.authoritativenessScore < 65) {
    recommendations.push({
      type: 'warning' as const,
      category: 'eeat' as const,
      title: 'Build Authority and Recognition',
      description: 'Website needs stronger authority signals and industry recognition.',
      recommendation: 'Create comprehensive About pages, showcase awards and recognition, build industry partnerships, and establish thought leadership.',
      priority: 3,
      impact: 'medium' as const
    })
  }

  // Trustworthiness
  if (metrics.trustworthinessSignals < 70) {
    recommendations.push({
      type: 'warning' as const,
      category: 'eeat' as const,
      title: 'Improve Trust Signals',
      description: 'Website lacks sufficient trust and transparency indicators.',
      recommendation: 'Add privacy policy, terms of service, contact information, security badges, and clear disclosure policies.',
      priority: 4,
      impact: 'medium' as const
    })
  }

  // Authorship Markup
  if (!metrics.authorshipMarkup) {
    recommendations.push({
      type: 'info' as const,
      category: 'eeat' as const,
      title: 'Implement Author Markup',
      description: 'Content lacks clear authorship attribution and structured data.',
      recommendation: 'Add author schema markup, bylines, and author bio sections. Link to author profiles and social media accounts.',
      priority: 5,
      impact: 'low' as const
    })
  }

  // Social Proof
  if (metrics.socialProof < 40) {
    recommendations.push({
      type: 'info' as const,
      category: 'eeat' as const,
      title: 'Increase Social Proof',
      description: 'Website could benefit from stronger social validation and community engagement.',
      recommendation: 'Add customer testimonials, reviews, social media integration, press mentions, and user-generated content.',
      priority: 6,
      impact: 'low' as const
    })
  }

  // Content Depth
  if (metrics.contentDepth < 50) {
    recommendations.push({
      type: 'info' as const,
      category: 'eeat' as const,
      title: 'Enhance Content Depth',
      description: 'Content lacks comprehensiveness and detailed coverage of topics.',
      recommendation: 'Create longer, more detailed content with proper structure, citations, and comprehensive coverage of topics.',
      priority: 7,
      impact: 'medium' as const
    })
  }

  return recommendations
}
