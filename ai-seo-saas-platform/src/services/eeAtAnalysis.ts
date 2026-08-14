// E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Analysis
// Scores real trust/authority signals found in the actually-fetched page and
// its structured data - no Math.random(), no URL string matching.
import { PageSignals, countPhraseHits } from './htmlSignals'

export interface EEATMetrics {
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

const EXPERIENCE_PHRASES = [
  'we tested', 'we tried', 'we found', 'our team', 'i tested', 'i tried',
  'i found', 'i discovered', 'in my experience', 'personally', 'hands-on',
  'hands on', 'real world', 'case study', 'first-hand', 'firsthand',
]

const EXPERTISE_PHRASES = [
  'certified', 'licensed', 'phd', 'years of experience', 'expert', 'specialist',
  'accredited', 'qualified', 'board-certified', 'years in the industry',
]

const SOCIAL_PROOF_PHRASES = [
  'testimonial', 'review', 'rated', 'customers say', 'trusted by', 'as seen in',
  '5 stars', 'client feedback',
]

const CREDIBLE_TLDS = ['.gov', '.edu']

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

export function analyzeEEAT(signals: PageSignals): EEATMetrics {
  const experienceHits = countPhraseHits(signals.bodyText, EXPERIENCE_PHRASES)
  const expertiseHits = countPhraseHits(signals.bodyText, EXPERTISE_PHRASES)
  const socialProofHits = countPhraseHits(signals.bodyText, SOCIAL_PROOF_PHRASES)
  const hasPersonSchema = signals.jsonLd.some((e) => e.type === 'Person')
  const hasReviewSchema = signals.jsonLd.some((e) => e.type === 'Review' || e.type === 'AggregateRating')
  const hasArticleAuthorField = signals.jsonLd.some((e) => e.type === 'Article' && Boolean(e.raw['author']))
  const credibleExternalLinks = signals.links.externalHrefs.filter((href) => CREDIBLE_TLDS.some((tld) => href.includes(tld))).length
  const distinctExternalDomains = new Set(
    signals.links.externalHrefs.map((href) => {
      try {
        return new URL(href).hostname
      } catch {
        return href
      }
    })
  ).size

  // Experience Signals: real count of first-hand-experience phrasing in the
  // actual page text.
  const experienceSignals = clamp(15 + experienceHits * 18)

  // Expertise Indicators: real credential/expertise phrasing plus a real
  // Person schema entity (a structured expertise claim, not just prose).
  const expertiseIndicators = clamp(15 + expertiseHits * 15 + (hasPersonSchema ? 20 : 0))

  // Authoritativeness: real presence of an About page link, real Person
  // schema, and real outbound citations to distinct domains.
  const authoritativenessScore = clamp(
    (signals.pageLinks.hasAboutPage ? 30 : 0) + (hasPersonSchema ? 25 : 0) + Math.min(45, distinctExternalDomains * 9)
  )

  // Trustworthiness: real HTTPS, real Contact page link, real Privacy/Terms
  // page link - all directly checkable from the fetched page.
  const trustworthinessSignals = clamp(
    (signals.https ? 34 : 0) + (signals.pageLinks.hasContactPage ? 33 : 0) + (signals.pageLinks.hasPrivacyOrTermsPage ? 33 : 0)
  )

  const authorshipMarkup = signals.hasAuthorMeta || hasPersonSchema || hasArticleAuthorField

  // Social Proof: real testimonial/review language, or real Review/
  // AggregateRating structured data.
  const socialProof = clamp((hasReviewSchema ? 50 : 0) + socialProofHits * 15)

  // Content Depth: real word count from the actual extracted page text,
  // scaled so ~1500 words (a commonly-cited comprehensive-content threshold)
  // reaches 100.
  const contentDepth = clamp((signals.wordCount / 1500) * 100)

  // Source Credibility: real count of distinct outbound domains, with a
  // bonus for citing .gov/.edu sources.
  const sourceCredibility = clamp(Math.min(70, distinctExternalDomains * 14) + Math.min(30, credibleExternalLinks * 15))

  return {
    experienceSignals,
    expertiseIndicators,
    authoritativenessScore,
    trustworthinessSignals,
    authorshipMarkup,
    socialProof,
    contentDepth,
    sourceCredibility,
    methodology:
      `Scored from real signals in the fetched page: ${experienceHits} first-hand-experience phrase match(es), ` +
      `${expertiseHits} expertise/credential phrase match(es), ${signals.pageLinks.hasAboutPage ? 'an About page link' : 'no About page link'}, ` +
      `${signals.pageLinks.hasContactPage ? 'a Contact page link' : 'no Contact page link'}, ` +
      `${signals.pageLinks.hasPrivacyOrTermsPage ? 'a Privacy/Terms page link' : 'no Privacy/Terms page link'}, ` +
      `author byline/schema ${authorshipMarkup ? 'found' : 'not found'}, ${signals.wordCount} real words of body content, ` +
      `and links to ${distinctExternalDomains} distinct external domain(s) (${credibleExternalLinks} to .gov/.edu).`,
  }
}

export function calculateEEATScore(metrics: EEATMetrics): number {
  const weights = {
    experienceSignals: 0.2,
    expertiseIndicators: 0.2,
    authoritativenessScore: 0.2,
    trustworthinessSignals: 0.2,
    authorshipMarkup: 0.05,
    socialProof: 0.05,
    contentDepth: 0.05,
    sourceCredibility: 0.05,
  }

  const score =
    metrics.experienceSignals * weights.experienceSignals +
    metrics.expertiseIndicators * weights.expertiseIndicators +
    metrics.authoritativenessScore * weights.authoritativenessScore +
    metrics.trustworthinessSignals * weights.trustworthinessSignals +
    (metrics.authorshipMarkup ? 100 : 0) * weights.authorshipMarkup +
    metrics.socialProof * weights.socialProof +
    metrics.contentDepth * weights.contentDepth +
    metrics.sourceCredibility * weights.sourceCredibility

  return Math.round(Math.max(0, Math.min(100, score)))
}

export function generateEEATRecommendations(metrics: EEATMetrics): Array<{
  type: 'critical' | 'warning' | 'info'
  category: 'eeat'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}> {
  const recommendations = []

  if (!metrics.authorshipMarkup) {
    recommendations.push({
      type: 'warning' as const,
      category: 'eeat' as const,
      title: 'No Author Byline or Schema Found',
      description: 'No author meta tag, byline element, or Person/Article-author schema was found on the page.',
      recommendation: 'Add a visible author byline with credentials, backed by Person schema.',
      priority: 4,
      impact: 'medium' as const,
    })
  }

  if (metrics.trustworthinessSignals < 60) {
    recommendations.push({
      type: 'warning' as const,
      category: 'eeat' as const,
      title: 'Trust Signals Incomplete',
      description: 'One or more of HTTPS, a Contact page link, or a Privacy/Terms page link could not be found.',
      recommendation: 'Ensure the site serves over HTTPS and has clearly linked Contact and Privacy/Terms pages.',
      priority: 5,
      impact: 'medium' as const,
    })
  }

  if (metrics.contentDepth < 40) {
    recommendations.push({
      type: 'info' as const,
      category: 'eeat' as const,
      title: 'Thin Content',
      description: `The page has roughly ${Math.round((metrics.contentDepth / 100) * 1500)} words of real body text, below what's typically considered comprehensive.`,
      recommendation: 'Expand the content to more thoroughly cover the topic.',
      priority: 7,
      impact: 'low' as const,
    })
  }

  return recommendations
}
