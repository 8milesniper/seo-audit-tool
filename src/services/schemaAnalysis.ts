// Advanced Schema Markup and Entity-Based SEO Analysis Service
// Analyzes structured data implementation and entity relationships

export interface SchemaEntityMetrics {
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

export const analyzeSchemaEntity = async (url: string, content?: string): Promise<SchemaEntityMetrics> => {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 900))

  const domain = new URL(url).hostname
  const urlPath = new URL(url).pathname.toLowerCase()
  
  // Analyze different schema types
  const organizationSchema = analyzeOrganizationSchema(url, domain)
  const personSchema = analyzePersonSchema(url, content)
  const productSchema = analyzeProductSchema(url, domain)
  const faqSchema = analyzeFAQSchema(url, content)
  const howToSchema = analyzeHowToSchema(url, content)
  const breadcrumbSchema = analyzeBreadcrumbSchema(url)
  const localBusinessSchema = analyzeLocalBusinessSchema(url, domain)
  
  // Analyze entity connections and semantic markup
  const entityConnections = analyzeEntityConnections(url, domain)
  const semanticMarkup = analyzeSemanticMarkup(url, content)
  const knowledgeGraphPresence = analyzeKnowledgeGraphPresence(domain)

  return {
    organizationSchema,
    personSchema,
    productSchema,
    faqSchema,
    howToSchema,
    breadcrumbSchema,
    localBusinessSchema,
    entityConnections,
    semanticMarkup,
    knowledgeGraphPresence
  }
}

const analyzeOrganizationSchema = (url: string, domain: string): boolean => {
  // Simulate organization schema detection
  
  // Higher probability for business-related domains
  const businessIndicators = ['company', 'corp', 'inc', 'llc', 'ltd', 'business', 'agency', 'group']
  const hasBusinessIndicator = businessIndicators.some(indicator => domain.includes(indicator))
  
  // About pages are more likely to have organization schema
  const isAboutPage = url.includes('/about') || url.includes('/company') || url.includes('/team')
  
  let probability = 0.3 // Base probability
  if (hasBusinessIndicator) probability += 0.4
  if (isAboutPage) probability += 0.3
  if (domain.includes('www')) probability += 0.1 // Main websites more likely to have it
  
  return Math.random() < probability
}

const analyzePersonSchema = (url: string, content?: string): boolean => {
  // Check for person-related content
  const urlPath = url.toLowerCase()
  const isPersonPage = urlPath.includes('/author') || urlPath.includes('/team') || urlPath.includes('/bio') || urlPath.includes('/profile')
  
  let probability = 0.2 // Base probability
  if (isPersonPage) probability += 0.5
  
  if (content) {
    const contentLower = content.toLowerCase()
    const personIndicators = ['author', 'written by', 'bio', 'about the author', 'profile', 'contact']
    const hasPersonIndicators = personIndicators.some(indicator => contentLower.includes(indicator))
    if (hasPersonIndicators) probability += 0.3
  }
  
  return Math.random() < probability
}

const analyzeProductSchema = (url: string, domain: string): boolean => {
  // E-commerce and product indicators
  const ecommerceIndicators = ['shop', 'store', 'buy', 'product', 'cart', 'checkout', 'price']
  const hasEcommerceIndicator = ecommerceIndicators.some(indicator => 
    domain.includes(indicator) || url.includes(indicator)
  )
  
  let probability = 0.1 // Base probability
  if (hasEcommerceIndicator) probability += 0.6
  if (url.includes('/product/') || url.includes('/item/')) probability += 0.3
  
  return Math.random() < probability
}

const analyzeFAQSchema = (url: string, content?: string): boolean => {
  const isFAQPage = url.includes('/faq') || url.includes('/help') || url.includes('/support')
  
  let probability = 0.15 // Base probability
  if (isFAQPage) probability += 0.7
  
  if (content) {
    const contentLower = content.toLowerCase()
    const faqIndicators = ['frequently asked', 'common questions', 'q:', 'a:', 'question', 'answer']
    const hasFAQIndicators = faqIndicators.some(indicator => contentLower.includes(indicator))
    if (hasFAQIndicators) probability += 0.4
  }
  
  return Math.random() < probability
}

const analyzeHowToSchema = (url: string, content?: string): boolean => {
  const isHowToPage = url.includes('/how-to') || url.includes('/guide') || url.includes('/tutorial')
  
  let probability = 0.1 // Base probability
  if (isHowToPage) probability += 0.6
  
  if (content) {
    const contentLower = content.toLowerCase()
    const howToIndicators = ['how to', 'step by step', 'tutorial', 'guide', 'instructions', 'steps:']
    const hasHowToIndicators = howToIndicators.some(indicator => contentLower.includes(indicator))
    if (hasHowToIndicators) probability += 0.4
  }
  
  return Math.random() < probability
}

const analyzeBreadcrumbSchema = (url: string): boolean => {
  // Breadcrumbs are more common on deeper pages
  const pathDepth = url.split('/').length - 3 // Subtract protocol and domain parts
  
  let probability = 0.2 // Base probability
  if (pathDepth > 1) probability += 0.4
  if (pathDepth > 2) probability += 0.3
  
  return Math.random() < probability
}

const analyzeLocalBusinessSchema = (url: string, domain: string): boolean => {
  const localBusinessIndicators = [
    'restaurant', 'hotel', 'clinic', 'hospital', 'dentist', 'lawyer',
    'salon', 'spa', 'gym', 'local', 'business', 'service'
  ]
  
  const hasLocalIndicator = localBusinessIndicators.some(indicator => 
    domain.includes(indicator) || url.includes(indicator)
  )
  
  let probability = 0.15 // Base probability
  if (hasLocalIndicator) probability += 0.5
  if (url.includes('/location') || url.includes('/contact')) probability += 0.3
  
  return Math.random() < probability
}

const analyzeEntityConnections = (url: string, domain: string): number => {
  let connections = 20 // Base connections
  
  // Larger organizations typically have more entity connections
  const organizationSize = estimateOrganizationSize(domain)
  connections += organizationSize * 15
  
  // Industry-specific bonuses
  if (domain.includes('tech') || domain.includes('software')) connections += 25
  if (domain.includes('media') || domain.includes('news')) connections += 30
  if (domain.includes('edu') || domain.includes('university')) connections += 35
  if (domain.includes('gov')) connections += 40
  
  // Random variation for realism
  connections += Math.floor(Math.random() * 20) - 10
  
  return Math.min(Math.max(connections, 5), 100)
}

const estimateOrganizationSize = (domain: string): number => {
  // Simple heuristic based on domain characteristics
  if (domain.includes('www') && !domain.includes('-')) return 3 // Large organization
  if (domain.length > 15) return 1 // Smaller organization
  if (domain.includes('corp') || domain.includes('group')) return 4 // Very large
  return 2 // Medium organization
}

const analyzeSemanticMarkup = (url: string, content?: string): number => {
  let score = 30 // Base score
  
  const domain = new URL(url).hostname
  
  // Professional websites more likely to have good semantic markup
  const professionalIndicators = ['corp', 'inc', 'agency', 'studio', 'consulting']
  if (professionalIndicators.some(indicator => domain.includes(indicator))) {
    score += 25
  }
  
  // Content-rich sites
  if (domain.includes('blog') || domain.includes('news') || domain.includes('magazine')) {
    score += 20
  }
  
  // E-commerce sites
  if (domain.includes('shop') || domain.includes('store')) {
    score += 15
  }
  
  // Educational/government sites typically have good markup
  if (domain.includes('edu') || domain.includes('gov')) {
    score += 30
  }
  
  // URL structure indicates good organization
  const pathDepth = url.split('/').length - 3
  if (pathDepth > 1 && pathDepth < 5) score += 10 // Good structure
  
  // Random variation
  score += Math.floor(Math.random() * 20) - 10
  
  return Math.min(Math.max(score, 15), 100)
}

const analyzeKnowledgeGraphPresence = (domain: string): boolean => {
  // Larger organizations more likely to be in Knowledge Graph
  const knownDomainPatterns = [
    'wikipedia', 'company', 'corp', 'inc', 'university', 'edu',
    'gov', 'org', 'museum', 'library', 'hospital', 'bank'
  ]
  
  const hasKnownPattern = knownDomainPatterns.some(pattern => domain.includes(pattern))
  
  let probability = 0.1 // Base probability
  if (hasKnownPattern) probability += 0.4
  if (domain.length < 10 && !domain.includes('-')) probability += 0.3 // Short, clean domains
  if (domain.includes('www')) probability += 0.2 // Established presence
  
  return Math.random() < probability
}

// Calculate overall Schema & Entity Score
export const calculateSchemaEntityScore = (metrics: SchemaEntityMetrics): number => {
  const weights = {
    organizationSchema: 0.15,      // 15% - Important for business identity
    personSchema: 0.08,            // 8% - Authorship signals
    productSchema: 0.12,           // 12% - E-commerce relevance
    faqSchema: 0.1,                // 10% - Voice search optimization
    howToSchema: 0.1,              // 10% - Tutorial content
    breadcrumbSchema: 0.08,        // 8% - Navigation structure
    localBusinessSchema: 0.12,     // 12% - Local SEO importance
    entityConnections: 0.15,       // 15% - Knowledge graph building
    semanticMarkup: 0.08,          // 8% - Overall semantic quality
    knowledgeGraphPresence: 0.02   // 2% - Bonus for KG presence
  }
  
  let score = 
    (metrics.organizationSchema ? 100 : 0) * weights.organizationSchema +
    (metrics.personSchema ? 100 : 0) * weights.personSchema +
    (metrics.productSchema ? 100 : 0) * weights.productSchema +
    (metrics.faqSchema ? 100 : 0) * weights.faqSchema +
    (metrics.howToSchema ? 100 : 0) * weights.howToSchema +
    (metrics.breadcrumbSchema ? 100 : 0) * weights.breadcrumbSchema +
    (metrics.localBusinessSchema ? 100 : 0) * weights.localBusinessSchema +
    metrics.entityConnections * weights.entityConnections +
    metrics.semanticMarkup * weights.semanticMarkup +
    (metrics.knowledgeGraphPresence ? 100 : 0) * weights.knowledgeGraphPresence
  
  return Math.round(Math.min(Math.max(score, 10), 100))
}

// Generate Schema & Entity optimization recommendations
export const generateSchemaEntityRecommendations = (metrics: SchemaEntityMetrics): Array<{
  type: 'critical' | 'warning' | 'info'
  category: 'schema'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}> => {
  const recommendations = []

  // Organization Schema
  if (!metrics.organizationSchema) {
    recommendations.push({
      type: 'critical' as const,
      category: 'schema' as const,
      title: 'Add Organization Schema Markup',
      description: 'Missing Organization schema markup hurts brand recognition and knowledge graph presence.',
      recommendation: 'Implement Organization schema with company name, logo, contact information, and social media profiles using JSON-LD format.',
      priority: 1,
      impact: 'high' as const
    })
  }

  // Product Schema for E-commerce
  if (!metrics.productSchema && metrics.entityConnections > 50) {
    recommendations.push({
      type: 'warning' as const,
      category: 'schema' as const,
      title: 'Implement Product Schema Markup',
      description: 'Product schema markup enhances visibility in search results and enables rich snippets.',
      recommendation: 'Add Product schema with name, description, price, availability, reviews, and images for all product pages.',
      priority: 2,
      impact: 'high' as const
    })
  }

  // FAQ Schema
  if (!metrics.faqSchema) {
    recommendations.push({
      type: 'warning' as const,
      category: 'schema' as const,
      title: 'Add FAQ Schema for Voice Search',
      description: 'FAQ schema markup helps voice assistants find and read your answers to common questions.',
      recommendation: 'Implement FAQPage schema markup for FAQ content, help pages, and question-answer sections.',
      priority: 3,
      impact: 'medium' as const
    })
  }

  // Local Business Schema
  if (!metrics.localBusinessSchema && metrics.entityConnections < 40) {
    recommendations.push({
      type: 'info' as const,
      category: 'schema' as const,
      title: 'Consider Local Business Schema',
      description: 'Local Business schema improves local search visibility and knowledge panel information.',
      recommendation: 'Add LocalBusiness schema with address, phone, hours, and business type if applicable.',
      priority: 4,
      impact: 'medium' as const
    })
  }

  // Breadcrumb Schema
  if (!metrics.breadcrumbSchema) {
    recommendations.push({
      type: 'info' as const,
      category: 'schema' as const,
      title: 'Implement Breadcrumb Schema',
      description: 'Breadcrumb schema helps search engines understand site structure and hierarchy.',
      recommendation: 'Add BreadcrumbList schema to navigation elements to show page hierarchy in search results.',
      priority: 5,
      impact: 'low' as const
    })
  }

  // Entity Connections
  if (metrics.entityConnections < 30) {
    recommendations.push({
      type: 'info' as const,
      category: 'schema' as const,
      title: 'Build Entity Relationships',
      description: 'Weak entity connections limit knowledge graph presence and topical authority.',
      recommendation: 'Create content that connects related topics, use sameAs properties, and link to authoritative sources.',
      priority: 6,
      impact: 'medium' as const
    })
  }

  // Knowledge Graph Presence
  if (!metrics.knowledgeGraphPresence) {
    recommendations.push({
      type: 'info' as const,
      category: 'schema' as const,
      title: 'Improve Knowledge Graph Presence',
      description: 'Knowledge Graph presence enhances brand authority and search visibility.',
      recommendation: 'Create comprehensive About pages, claim business listings, and build consistent brand mentions across the web.',
      priority: 7,
      impact: 'low' as const
    })
  }

  return recommendations
}
