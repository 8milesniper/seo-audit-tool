import { SEOMetrics } from '@/contexts/AuditContext'
import { analyzeAISearchReadiness, calculateAISearchReadinessScore, generateAISearchRecommendations } from './aiSearchAnalysis'
import { analyzeVoiceSearchOptimization, calculateVoiceSearchScore, generateVoiceSearchRecommendations } from './voiceSearchAnalysis'
import { analyzeSchemaEntity, calculateSchemaEntityScore, generateSchemaEntityRecommendations } from './schemaAnalysis'
import { analyzeEEAT, calculateEEATScore, generateEEATRecommendations } from './eeAtAnalysis'
import { extractPageSignals, scoreHeadingStructure, analyzeSecurityHeaders, PageSignals } from './htmlSignals'

// Real SEO analysis service. Fetches the target page server-side (avoids
// browser CORS), parses the real HTML, and scores everything from what was
// actually found - no Math.random(), no scoring derived from the URL string.
// Anything that genuinely cannot be measured (typically because no
// GOOGLE_PAGESPEED_API_KEY is configured, or the target blocked/timed out
// our fetch) is surfaced as null/"unavailable", never a fabricated number.

interface FetchSiteResponse {
  ok: boolean
  finalUrl?: string
  httpStatus?: number
  html?: string
  responseHeaders?: Record<string, string>
  robotsTxtFound?: boolean
  sitemapFound?: boolean
  fetchError?: string | null
}

interface PageSpeedResponse {
  unavailable: boolean
  reason?: string
  performanceScore?: number | null
  accessibilityScore?: number | null
  bestPracticesScore?: number | null
  coreWebVitals?: { lcp: number | null; inp: number | null; cls: number | null; ttfb: number | null; tbt: number | null }
  pageSpeedSeconds?: number | null
  tapTargetsOk?: boolean | null
}

async function callApi<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return response.json()
}

function computeSemanticKeywordOverlap(signals: PageSignals): number {
  const titleText = signals.title.text
  if (!titleText) return 0
  const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'your'])
  const titleWords = Array.from(new Set(titleText.toLowerCase().split(/\W+/).filter((w) => w.length > 3 && !stopWords.has(w))))
  if (titleWords.length === 0) return 0
  const bodyLower = signals.bodyText.toLowerCase()
  const matched = titleWords.filter((w) => bodyLower.includes(w))
  return Math.round((matched.length / titleWords.length) * 100)
}

function computeSeoScore(signals: PageSignals, headingScore: number, robotsTxtFound: boolean, sitemapFound: boolean): number {
  let score = 0
  if (signals.title.present) score += 20
  if (signals.title.length >= 10 && signals.title.length <= 60) score += 5
  if (signals.metaDescription.present) score += 15
  if (signals.metaDescription.length >= 50 && signals.metaDescription.length <= 160) score += 5
  score += (headingScore / 5) * 20
  score += (signals.images.altCoveragePct / 100) * 15
  if (signals.canonical.present) score += 10
  if (robotsTxtFound) score += 5
  if (sitemapFound) score += 5
  return Math.round(Math.max(0, Math.min(100, score)))
}

function computeInternationalSeo(signals: PageSignals): number {
  return Math.round(Math.min(100, (signals.htmlLang ? 30 : 0) + Math.min(70, signals.hreflangCount * 15)))
}

export const performSEOAnalysis = async (url: string): Promise<SEOMetrics> => {
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

  const [siteResult, pageSpeedResult] = await Promise.all([
    callApi<FetchSiteResponse>('/api/fetch-site', { url: normalizedUrl }),
    callApi<PageSpeedResponse>('/api/pagespeed', { url: normalizedUrl }),
  ])

  if (!siteResult.ok || !siteResult.html || !siteResult.finalUrl) {
    throw new Error(siteResult.fetchError || 'Could not fetch the target site for analysis')
  }

  const doc = new DOMParser().parseFromString(siteResult.html, 'text/html')
  const signals = extractPageSignals(doc, siteResult.finalUrl)

  const aiSearchMetrics = analyzeAISearchReadiness(signals)
  const voiceSearchMetrics = analyzeVoiceSearchOptimization(signals)
  const schemaEntityMetrics = analyzeSchemaEntity(signals)
  const eeAtMetrics = analyzeEEAT(signals)

  const aiSearchReadiness = calculateAISearchReadinessScore(aiSearchMetrics)
  const voiceSearchOptimization = calculateVoiceSearchScore(voiceSearchMetrics)
  const schemaEntityScore = calculateSchemaEntityScore(schemaEntityMetrics)
  const eeAtScore = calculateEEATScore(eeAtMetrics)

  const headingScore = scoreHeadingStructure(signals)
  const seoScore = computeSeoScore(signals, headingScore, Boolean(siteResult.robotsTxtFound), Boolean(siteResult.sitemapFound))

  const pagespeedAvailable = !pageSpeedResult.unavailable
  const performanceScore = pagespeedAvailable ? pageSpeedResult.performanceScore ?? null : null
  const accessibilityScore = pagespeedAvailable ? pageSpeedResult.accessibilityScore ?? null : null
  const bestPracticesScore = pagespeedAvailable ? pageSpeedResult.bestPracticesScore ?? null : null

  const overallComponents: Array<{ value: number | null; weight: number }> = [
    { value: performanceScore, weight: 0.2 },
    { value: seoScore, weight: 0.2 },
    { value: accessibilityScore, weight: 0.15 },
    { value: bestPracticesScore, weight: 0.15 },
    { value: aiSearchReadiness, weight: 0.1 },
    { value: voiceSearchOptimization, weight: 0.08 },
    { value: schemaEntityScore, weight: 0.07 },
    { value: eeAtScore, weight: 0.05 },
  ]
  const availableComponents = overallComponents.filter((c) => c.value !== null) as Array<{ value: number; weight: number }>
  const weightSum = availableComponents.reduce((sum, c) => sum + c.weight, 0)
  const overallScore = weightSum > 0
    ? Math.round(availableComponents.reduce((sum, c) => sum + c.value * c.weight, 0) / weightSum)
    : 0

  const securityHeaders = analyzeSecurityHeaders(siteResult.responseHeaders)

  const issues = [
    ...generateTraditionalIssues(signals, {
      performanceScore,
      headingScore,
      securityHeaders,
      robotsTxtFound: Boolean(siteResult.robotsTxtFound),
      sitemapFound: Boolean(siteResult.sitemapFound),
    }),
    ...generateAISearchRecommendations(aiSearchMetrics),
    ...generateVoiceSearchRecommendations(voiceSearchMetrics),
    ...generateSchemaEntityRecommendations(schemaEntityMetrics),
    ...generateEEATRecommendations(eeAtMetrics),
  ].sort((a, b) => a.priority - b.priority)

  const metrics: SEOMetrics = {
    overallScore,
    performanceScore,
    seoScore,
    accessibilityScore,
    bestPracticesScore,

    aiSearchReadiness,
    voiceSearchOptimization,
    schemaEntityScore,
    eeAtScore,

    coreWebVitals: {
      lcp: pagespeedAvailable ? pageSpeedResult.coreWebVitals?.lcp ?? null : null,
      cls: pagespeedAvailable ? pageSpeedResult.coreWebVitals?.cls ?? null : null,
      inp: pagespeedAvailable ? pageSpeedResult.coreWebVitals?.inp ?? null : null,
      tbt: pagespeedAvailable ? pageSpeedResult.coreWebVitals?.tbt ?? null : null,
      ttfb: pagespeedAvailable ? pageSpeedResult.coreWebVitals?.ttfb ?? null : null,
    },

    dataAvailability: {
      pagespeedUnavailable: !pagespeedAvailable,
      pagespeedUnavailableReason: pagespeedAvailable ? null : pageSpeedResult.reason || 'unavailable',
      fetchError: null,
    },

    aiSearch: aiSearchMetrics,
    voiceSearch: voiceSearchMetrics,
    schemaEntity: schemaEntityMetrics,
    eeAt: eeAtMetrics,

    technical: {
      https: signals.https,
      mobile: signals.viewportMeta.present,
      pageSpeed: pagespeedAvailable ? pageSpeedResult.pageSpeedSeconds ?? null : null,
      imageOptimization: signals.images.altCoveragePct,
      mobileCoreWebVitals: pagespeedAvailable ? pageSpeedResult.performanceScore ?? null : null,
      pwaCompatibility: signals.hasManifest,
      touchTargetsOk: pagespeedAvailable ? pageSpeedResult.tapTargetsOk ?? null : null,
      structuredDataValidation: schemaEntityScore,
      internationalSeo: computeInternationalSeo(signals),
      securityHeaders,
    },

    onPage: {
      titleTag: signals.title.present,
      metaDescription: signals.metaDescription.present,
      headings: headingScore,
      altText: signals.images.altCoveragePct,
      semanticKeywords: computeSemanticKeywordOverlap(signals),
      contentComprehensiveness: eeAtMetrics.contentDepth,
      userIntentAlignment: Math.round((voiceSearchMetrics.questionBasedContent + voiceSearchMetrics.featuredSnippetOpportunities) / 2),
      readabilityScore: voiceSearchMetrics.averageReadingLevel,
    },

    issues,
  }

  return metrics
}

const generateTraditionalIssues = (
  signals: PageSignals,
  ctx: {
    performanceScore: number | null
    headingScore: number
    securityHeaders: ReturnType<typeof analyzeSecurityHeaders>
    robotsTxtFound: boolean
    sitemapFound: boolean
  }
) => {
  const issues = []

  if (ctx.performanceScore === null) {
    issues.push({
      type: 'info' as const,
      category: 'performance' as const,
      title: 'Performance Data Unavailable',
      description: 'No Google PageSpeed Insights API key is configured, so real performance and Core Web Vitals data could not be measured.',
      recommendation: 'Set GOOGLE_PAGESPEED_API_KEY on the server to enable real performance scoring (see server/.env.example).',
      priority: 1,
      impact: 'medium' as const,
    })
  } else if (ctx.performanceScore < 70) {
    issues.push({
      type: 'critical' as const,
      category: 'performance' as const,
      title: 'Slow Page Loading Speed',
      description: `Google PageSpeed Insights measured a real performance score of ${ctx.performanceScore}/100.`,
      recommendation: 'Optimize images, enable compression, minimize CSS/JavaScript files, and consider using a CDN to improve loading times.',
      priority: 1,
      impact: 'high' as const,
    })
  }

  if (!signals.title.present) {
    issues.push({
      type: 'critical' as const,
      category: 'traditional' as const,
      title: 'Missing Title Tag',
      description: 'No <title> tag was found on the page.',
      recommendation: 'Add a unique, descriptive title tag (50-60 characters) to every page.',
      priority: 2,
      impact: 'high' as const,
    })
  }

  if (!signals.metaDescription.present) {
    issues.push({
      type: 'critical' as const,
      category: 'traditional' as const,
      title: 'Missing Meta Description',
      description: 'No meta description was found, reducing click-through rates from search results.',
      recommendation: 'Write a compelling, unique meta description (150-160 characters) that accurately describes the page.',
      priority: 3,
      impact: 'high' as const,
    })
  }

  if (ctx.headingScore < 3) {
    issues.push({
      type: 'warning' as const,
      category: 'traditional' as const,
      title: 'Suboptimal Header Structure',
      description: signals.headings.h1Count !== 1
        ? `Found ${signals.headings.h1Count} H1 tag(s) - pages should have exactly one.`
        : 'Heading levels are skipped or the page lacks sub-headings.',
      recommendation: 'Use exactly one H1 for the main title, then H2s/H3s in order without skipping levels.',
      priority: 4,
      impact: 'medium' as const,
    })
  }

  if (signals.images.total > 0 && signals.images.altCoveragePct < 80) {
    issues.push({
      type: 'warning' as const,
      category: 'traditional' as const,
      title: 'Missing Image Alt Text',
      description: `Only ${signals.images.altCoveragePct}% of the ${signals.images.total} images found have alt text.`,
      recommendation: 'Add descriptive alt text to all informative images; use alt="" for purely decorative images.',
      priority: 5,
      impact: 'medium' as const,
    })
  }

  if (!ctx.sitemapFound) {
    issues.push({
      type: 'warning' as const,
      category: 'traditional' as const,
      title: 'No XML Sitemap Found',
      description: 'No sitemap was discoverable via robots.txt or common sitemap URLs.',
      recommendation: 'Create an XML sitemap listing important pages and submit it to Google Search Console and Bing Webmaster Tools.',
      priority: 8,
      impact: 'low' as const,
    })
  }

  if (!ctx.robotsTxtFound) {
    issues.push({
      type: 'info' as const,
      category: 'traditional' as const,
      title: 'No robots.txt Found',
      description: 'The site does not serve a robots.txt file.',
      recommendation: 'Add a robots.txt file to control crawler access and point search engines to your sitemap.',
      priority: 9,
      impact: 'low' as const,
    })
  }

  if (ctx.securityHeaders.count < ctx.securityHeaders.total) {
    issues.push({
      type: 'warning' as const,
      category: 'traditional' as const,
      title: 'Security Headers Missing',
      description: `${ctx.securityHeaders.missing.join(', ')} ${ctx.securityHeaders.missing.length === 1 ? 'was' : 'were'} not found in the site's response headers.`,
      recommendation: 'Implement missing security headers to improve user trust and reduce attack surface.',
      priority: 6,
      impact: 'medium' as const,
    })
  }

  if (!signals.canonical.present) {
    issues.push({
      type: 'info' as const,
      category: 'traditional' as const,
      title: 'Missing Canonical Tag',
      description: 'No <link rel="canonical"> tag was found on the page.',
      recommendation: 'Add a self-referencing canonical tag to prevent duplicate-content issues.',
      priority: 10,
      impact: 'low' as const,
    })
  }

  if (!signals.viewportMeta.present) {
    issues.push({
      type: 'warning' as const,
      category: 'traditional' as const,
      title: 'Missing Mobile Viewport Tag',
      description: 'No <meta name="viewport"> tag was found - a core mobile-friendliness signal.',
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the page head.',
      priority: 7,
      impact: 'medium' as const,
    })
  }

  return issues
}
