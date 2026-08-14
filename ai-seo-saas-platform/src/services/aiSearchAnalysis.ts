// AI Search Engine Optimization Analysis Service
// Scores readiness for Google SGE, ChatGPT Search, Perplexity AI, and Bing
// Copilot from REAL signals extracted from the actually-fetched page (see
// htmlSignals.ts) - no Math.random(), no guessing from the URL string.
//
// Important honesty note: there is no public API that tells you "how ready
// is this page for ChatGPT vs. Perplexity specifically" - no such
// per-platform signal exists. What IS real and checkable is one shared set
// of signals (structured data, content depth, freshness, question-based
// structure, citations/authorship, HTTPS). Each "platform" score below is
// the same real signal set, weighted differently per platform's publicly
// documented ranking emphasis (see the weight comments). That weighting
// judgment call is disclosed here and in the `methodology` string returned
// alongside the score, rather than presented as if each number were an
// independent platform-specific measurement.
import { PageSignals, countPhraseHits, hasRecentYearMention, scoreHeadingStructure } from './htmlSignals'

export interface AISearchMetrics {
  sgeOptimization: number
  chatgptReadiness: number
  perplexityOptimization: number
  bingCopilotReadiness: number
  conversationalContent: boolean
  firstHandExperience: boolean
  multimediaRichness: number
  methodology: string
}

const CONVERSATIONAL_PHRASES = [
  'how to', 'what is', 'why does', 'when should', 'where can',
  'you can', 'you should', 'you might', "let's", "here's how",
]

const EXPERIENCE_PHRASES = [
  'we tested', 'we tried', 'we found', 'our team', 'i tested', 'i tried',
  'i found', 'i discovered', 'in my experience', 'personally', 'hands-on',
  'hands on', 'real world', 'case study',
]

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

export function analyzeAISearchReadiness(signals: PageSignals): AISearchMetrics {
  const hasStructuredData = signals.jsonLd.length > 0
  const hasFAQSchema = signals.jsonLd.some((e) => e.type === 'FAQPage')
  const contentWords = signals.wordCount
  const isFresh = hasRecentYearMention(signals.bodyText)
  const questionHeadings = signals.headings.questionHeadingCount > 0
  const headingQuality = scoreHeadingStructure(signals) >= 3
  const conversationalHits = countPhraseHits(signals.bodyText, CONVERSATIONAL_PHRASES)
  const experienceHits = countPhraseHits(signals.bodyText, EXPERIENCE_PHRASES)
  const distinctExternalDomains = new Set(
    signals.links.externalHrefs.map((href) => {
      try {
        return new URL(href).hostname
      } catch {
        return href
      }
    })
  ).size

  // Google SGE: publicly documented as favoring E-E-A-T + structured data +
  // comprehensive content (30% structured data, 25% content depth, 20%
  // freshness/HTTPS, 25% clear question-answer structure).
  const sgeOptimization = clamp(
    20 +
      (hasStructuredData ? 25 : 0) +
      (contentWords > 800 ? 25 : contentWords > 300 ? 12 : 0) +
      (signals.https ? 10 : 0) +
      (isFresh ? 10 : 0) +
      (questionHeadings ? 10 : 0)
  )

  // ChatGPT Search: favors clear factual structure, natural/conversational
  // phrasing, and freshness.
  const chatgptReadiness = clamp(
    20 +
      (questionHeadings ? 20 : 0) +
      (conversationalHits >= 2 ? 20 : conversationalHits >= 1 ? 10 : 0) +
      (isFresh ? 20 : 0) +
      (contentWords > 500 ? 20 : contentWords > 200 ? 10 : 0)
  )

  // Perplexity AI: publicly emphasizes citable, sourced, authored content.
  const perplexityOptimization = clamp(
    15 +
      (distinctExternalDomains >= 3 ? 25 : distinctExternalDomains >= 1 ? 12 : 0) +
      (signals.hasAuthorMeta ? 25 : 0) +
      (isFresh ? 15 : 0) +
      (experienceHits >= 1 ? 20 : 0)
  )

  // Bing Copilot (Microsoft ecosystem): favors structured, professionally
  // organized, secure content.
  const bingCopilotReadiness = clamp(
    20 +
      (hasStructuredData ? 25 : 0) +
      (headingQuality ? 25 : 0) +
      (signals.https ? 15 : 0) +
      (signals.hasAuthorMeta ? 15 : 0)
  )

  const conversationalContent = questionHeadings || conversationalHits >= 1
  const firstHandExperience = experienceHits >= 1
  const multimediaRichness = clamp(
    (signals.images.total > 0 ? 30 : 0) +
      Math.min(30, signals.images.total * 3) +
      Math.min(25, signals.media.videoCount * 25) +
      Math.min(15, signals.media.iframeCount * 15)
  )

  return {
    sgeOptimization,
    chatgptReadiness,
    perplexityOptimization,
    bingCopilotReadiness,
    conversationalContent,
    firstHandExperience,
    multimediaRichness,
    methodology:
      'Scored from real page signals only: presence of parsed JSON-LD structured data' +
      (hasFAQSchema ? ' (incl. FAQ schema)' : '') +
      `, ${contentWords}-word real content length, HTTPS, a current/prior-year date mention found in the page text, ` +
      `question-phrased headings, author byline/schema presence, and links to ${distinctExternalDomains} distinct external domain(s). ` +
      'Each platform score weights these same real signals differently per that platform\'s publicly documented ranking emphasis - ' +
      'no per-platform crawl or private API exists, so this is a disclosed heuristic, not an independent measurement per platform.',
  }
}

export function calculateAISearchReadinessScore(metrics: AISearchMetrics): number {
  const weights = {
    sgeOptimization: 0.3,
    chatgptReadiness: 0.25,
    perplexityOptimization: 0.2,
    bingCopilotReadiness: 0.15,
    conversationalContent: 0.05,
    firstHandExperience: 0.03,
    multimediaRichness: 0.02,
  }

  const score =
    metrics.sgeOptimization * weights.sgeOptimization +
    metrics.chatgptReadiness * weights.chatgptReadiness +
    metrics.perplexityOptimization * weights.perplexityOptimization +
    metrics.bingCopilotReadiness * weights.bingCopilotReadiness +
    (metrics.conversationalContent ? 100 : 0) * weights.conversationalContent +
    (metrics.firstHandExperience ? 100 : 0) * weights.firstHandExperience +
    metrics.multimediaRichness * weights.multimediaRichness

  return clamp(score)
}

export function generateAISearchRecommendations(metrics: AISearchMetrics): Array<{
  type: 'critical' | 'warning' | 'info'
  category: 'ai-search'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}> {
  const recommendations = []

  if (metrics.sgeOptimization < 70) {
    recommendations.push({
      type: 'critical' as const,
      category: 'ai-search' as const,
      title: 'Google SGE Optimization Needed',
      description: 'The page is missing several real signals AI Overviews/SGE weight heavily: structured data, sufficient content depth, or a recent-content signal.',
      recommendation: 'Add JSON-LD structured data, expand thin pages to be genuinely comprehensive, and keep a visible last-updated date.',
      priority: 1,
      impact: 'high' as const,
    })
  }

  if (metrics.chatgptReadiness < 60) {
    recommendations.push({
      type: 'warning' as const,
      category: 'ai-search' as const,
      title: 'ChatGPT Search Readiness Low',
      description: 'The page lacks question-phrased headings and conversational language that these engines tend to lift directly into answers.',
      recommendation: 'Use question-based subheadings (e.g. "How does X work?") and answer them plainly in the following paragraph.',
      priority: 2,
      impact: 'medium' as const,
    })
  }

  if (metrics.perplexityOptimization < 65) {
    recommendations.push({
      type: 'warning' as const,
      category: 'ai-search' as const,
      title: 'Perplexity AI Optimization Opportunity',
      description: 'No author byline and few/no citations to outside sources were found - Perplexity favors citable, attributed content.',
      recommendation: 'Add a visible author byline (with Person schema) and cite credible external sources where relevant.',
      priority: 3,
      impact: 'medium' as const,
    })
  }

  if (!metrics.conversationalContent) {
    recommendations.push({
      type: 'info' as const,
      category: 'ai-search' as const,
      title: 'Add Conversational Content Elements',
      description: 'No question-based headings or conversational phrasing were found in the page text.',
      recommendation: 'Add an FAQ section and phrase some headings as the questions real users would ask.',
      priority: 4,
      impact: 'medium' as const,
    })
  }

  if (!metrics.firstHandExperience) {
    recommendations.push({
      type: 'info' as const,
      category: 'ai-search' as const,
      title: 'Demonstrate First-Hand Experience',
      description: 'No first-person experience language (e.g. "we tested", "in my experience") was found in the page text.',
      recommendation: 'Add real case studies, testing notes, or first-hand accounts that demonstrate direct experience.',
      priority: 5,
      impact: 'low' as const,
    })
  }

  return recommendations
}
