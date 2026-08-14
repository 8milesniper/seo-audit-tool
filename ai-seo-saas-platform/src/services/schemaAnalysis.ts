// Advanced Schema Markup and Entity-Based SEO Analysis Service
// Parses REAL JSON-LD structured data found on the actually-fetched page.
// No Math.random(), no guessing schema presence from the URL.
import { PageSignals } from './htmlSignals'

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
  methodology: string
}

// A small, real "recommended fields" checklist per schema.org type, used to
// score how complete each found entity's markup is (semanticMarkup below).
// Not exhaustive - schema.org defines many optional properties - but every
// field checked is a genuine, commonly-recommended property for that type.
const RECOMMENDED_FIELDS: Record<string, string[]> = {
  Organization: ['name', 'url', 'logo', 'sameAs'],
  Person: ['name', 'jobTitle', 'sameAs'],
  Product: ['name', 'description', 'image', 'offers'],
  FAQPage: ['mainEntity'],
  HowTo: ['name', 'step'],
  BreadcrumbList: ['itemListElement'],
  LocalBusiness: ['name', 'address', 'telephone'],
  Article: ['headline', 'author', 'datePublished'],
  WebPage: ['name', 'description'],
}

const KNOWLEDGE_GRAPH_DOMAINS = ['wikipedia.org', 'wikidata.org', 'linkedin.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'crunchbase.com']

function has(signals: PageSignals, type: string) {
  return signals.jsonLd.some((e) => e.type === type)
}

export function analyzeSchemaEntity(signals: PageSignals): SchemaEntityMetrics {
  const organizationSchema = has(signals, 'Organization')
  const personSchema = has(signals, 'Person')
  const productSchema = has(signals, 'Product')
  const faqSchema = has(signals, 'FAQPage')
  const howToSchema = has(signals, 'HowTo')
  const breadcrumbSchema = has(signals, 'BreadcrumbList')
  const localBusinessSchema = signals.jsonLd.some((e) => e.type === 'LocalBusiness' || e.type.endsWith('LocalBusiness'))

  // Entity Connections: real count of distinct schema.org @type values found
  // in the page's parsed JSON-LD.
  const distinctTypes = new Set(signals.jsonLd.map((e) => e.type))
  const entityConnections = distinctTypes.size

  // Semantic Markup: real average completeness of each found entity against
  // that type's recommended-fields checklist above.
  let semanticMarkup = 0
  if (signals.jsonLd.length > 0) {
    const completenessScores = signals.jsonLd.map((entity) => {
      const fields = RECOMMENDED_FIELDS[entity.type]
      if (!fields || fields.length === 0) return 50 // unlisted type but still real structured data present
      const presentCount = fields.filter((f) => entity.raw[f] !== undefined && entity.raw[f] !== null && entity.raw[f] !== '').length
      return (presentCount / fields.length) * 100
    })
    semanticMarkup = Math.round(completenessScores.reduce((a, b) => a + b, 0) / completenessScores.length)
  }

  // Knowledge Graph Presence: real proxy - Google explicitly recommends
  // `sameAs` links to Wikipedia/Wikidata/verified social profiles for entity
  // disambiguation. We check whether any parsed entity actually has one.
  const knowledgeGraphPresence = signals.jsonLd.some((entity) => {
    const sameAs = entity.raw['sameAs']
    const links = Array.isArray(sameAs) ? sameAs : sameAs ? [sameAs] : []
    return links.some((link) => typeof link === 'string' && KNOWLEDGE_GRAPH_DOMAINS.some((domain) => link.includes(domain)))
  })

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
    knowledgeGraphPresence,
    methodology:
      `Parsed ${signals.jsonLd.length} real JSON-LD entity block(s) found on the page (types: ${
        distinctTypes.size ? Array.from(distinctTypes).join(', ') : 'none found'
      }). Boolean flags are direct @type matches. "Semantic Markup" is the average % of each type's recommended fields ` +
      '(e.g. Organization needs name/url/logo/sameAs) that are actually present. "Knowledge Graph Presence" checks for a ' +
      'real sameAs link to Wikipedia/Wikidata/a verified social profile - Google\'s own documented entity-disambiguation signal.',
  }
}

export function calculateSchemaEntityScore(metrics: SchemaEntityMetrics): number {
  const weights = {
    organizationSchema: 0.15,
    faqSchema: 0.15,
    howToSchema: 0.1,
    breadcrumbSchema: 0.1,
    localBusinessSchema: 0.1,
    entityConnections: 0.15,
    semanticMarkup: 0.15,
    knowledgeGraphPresence: 0.1,
  }

  const score =
    (metrics.organizationSchema ? 100 : 0) * weights.organizationSchema +
    (metrics.faqSchema ? 100 : 0) * weights.faqSchema +
    (metrics.howToSchema ? 100 : 0) * weights.howToSchema +
    (metrics.breadcrumbSchema ? 100 : 0) * weights.breadcrumbSchema +
    (metrics.localBusinessSchema ? 100 : 0) * weights.localBusinessSchema +
    Math.min(100, metrics.entityConnections * 25) * weights.entityConnections +
    metrics.semanticMarkup * weights.semanticMarkup +
    (metrics.knowledgeGraphPresence ? 100 : 0) * weights.knowledgeGraphPresence

  return Math.round(Math.max(0, Math.min(100, score)))
}

export function generateSchemaEntityRecommendations(metrics: SchemaEntityMetrics): Array<{
  type: 'critical' | 'warning' | 'info'
  category: 'schema'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}> {
  const recommendations = []

  if (!metrics.organizationSchema) {
    recommendations.push({
      type: 'critical' as const,
      category: 'schema' as const,
      title: 'No Organization Schema Found',
      description: 'No Organization JSON-LD structured data was found on the page.',
      recommendation: 'Add Organization schema with name, url, logo, and sameAs links to your official profiles.',
      priority: 2,
      impact: 'high' as const,
    })
  }

  if (!metrics.faqSchema) {
    recommendations.push({
      type: 'info' as const,
      category: 'schema' as const,
      title: 'No FAQ Schema Found',
      description: 'FAQPage structured data helps AI/answer engines and Google surface direct answers.',
      recommendation: 'If the page has FAQ-style content, mark it up with FAQPage schema.',
      priority: 6,
      impact: 'low' as const,
    })
  }

  if (!metrics.knowledgeGraphPresence) {
    recommendations.push({
      type: 'info' as const,
      category: 'schema' as const,
      title: 'No Knowledge Graph Linking Found',
      description: 'No sameAs links to Wikipedia, Wikidata, or a verified social profile were found in any structured data entity.',
      recommendation: 'Add sameAs links pointing to your Wikidata/Wikipedia entry (if any) and verified social profiles.',
      priority: 8,
      impact: 'low' as const,
    })
  }

  return recommendations
}
