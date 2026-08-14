// Real signal extraction from an actually-fetched, actually-parsed page.
// Every function here is a pure, deterministic read of the DOM/text that was
// fetched server-side - there is no randomness and no string-matching on the
// URL. This is the shared foundation the audit engine and all four
// AI/voice/schema/E-E-A-T heuristic modules build their scores from.

export interface JsonLdEntity {
  type: string
  raw: Record<string, unknown>
}

export interface PageSignals {
  finalUrl: string
  https: boolean
  title: { present: boolean; text: string | null; length: number }
  metaDescription: { present: boolean; text: string | null; length: number }
  canonical: { present: boolean; href: string | null }
  robotsMeta: { present: boolean; content: string | null; noindex: boolean }
  viewportMeta: { present: boolean; content: string | null }
  headings: {
    h1Count: number
    h1Text: string[]
    hasH2: boolean
    questionHeadingCount: number
    totalHeadingCount: number
    skipsLevels: boolean
  }
  images: { total: number; withAlt: number; altCoveragePct: number }
  media: { videoCount: number; iframeCount: number }
  structure: { listCount: number; shortAnswerParagraphs: number; tableCount: number }
  links: { internalCount: number; externalCount: number; externalHrefs: string[] }
  jsonLd: JsonLdEntity[]
  bodyText: string
  wordCount: number
  hasAuthorMeta: boolean
  htmlLang: string | null
  pageLinks: { hasAboutPage: boolean; hasContactPage: boolean; hasPrivacyOrTermsPage: boolean }
  hasManifest: boolean
  hreflangCount: number
}

const clampPct = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

function parseJsonLdBlocks(doc: Document): JsonLdEntity[] {
  const entities: JsonLdEntity[] = []
  const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))

  for (const script of scripts) {
    let parsed: unknown
    try {
      parsed = JSON.parse(script.textContent || '')
    } catch {
      continue // real pages frequently ship malformed JSON-LD; skip, don't crash
    }

    const nodes: Record<string, unknown>[] = []
    const collect = (value: unknown) => {
      if (Array.isArray(value)) {
        value.forEach(collect)
      } else if (value && typeof value === 'object') {
        const obj = value as Record<string, unknown>
        if (Array.isArray(obj['@graph'])) {
          collect(obj['@graph'])
        } else {
          nodes.push(obj)
        }
      }
    }
    collect(parsed)

    for (const node of nodes) {
      const rawType = node['@type']
      const types = Array.isArray(rawType) ? rawType : [rawType]
      for (const type of types) {
        if (typeof type === 'string') {
          entities.push({ type, raw: node })
        }
      }
    }
  }

  return entities
}

function extractVisibleText(doc: Document): string {
  const clone = doc.body?.cloneNode(true) as HTMLElement | undefined
  if (!clone) return ''
  clone.querySelectorAll('script, style, noscript, template').forEach((el) => el.remove())
  return (clone.textContent || '').replace(/\s+/g, ' ').trim()
}

export function extractPageSignals(doc: Document, finalUrl: string): PageSignals {
  const url = new URL(finalUrl)
  const titleEl = doc.querySelector('title')
  const titleText = titleEl?.textContent?.trim() || null

  const metaDescEl = doc.querySelector('meta[name="description"]')
  const metaDescText = metaDescEl?.getAttribute('content')?.trim() || null

  const canonicalEl = doc.querySelector('link[rel="canonical"]')
  const canonicalHref = canonicalEl?.getAttribute('href') || null

  const robotsEl = doc.querySelector('meta[name="robots"]')
  const robotsContent = robotsEl?.getAttribute('content') || null

  const viewportEl = doc.querySelector('meta[name="viewport"]')
  const viewportContent = viewportEl?.getAttribute('content') || null

  const headingEls = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  const h1Els = headingEls.filter((el) => el.tagName === 'H1')
  const levelsPresent = new Set(headingEls.map((el) => Number(el.tagName[1])))
  let skipsLevels = false
  const sortedLevels = Array.from(levelsPresent).sort((a, b) => a - b)
  for (let i = 1; i < sortedLevels.length; i++) {
    if (sortedLevels[i] - sortedLevels[i - 1] > 1) skipsLevels = true
  }
  const questionHeadingCount = headingEls.filter((el) => {
    const text = (el.textContent || '').trim().toLowerCase()
    return text.endsWith('?') || /^(how|what|why|when|where|who|which|can|does|is|are)\b/.test(text)
  }).length

  const imageEls = Array.from(doc.querySelectorAll('img'))
  const imagesWithAlt = imageEls.filter((img) => (img.getAttribute('alt') || '').trim().length > 0)

  const anchorEls = Array.from(doc.querySelectorAll('a[href]'))
  const externalHrefs: string[] = []
  let internalCount = 0
  let hasAboutPage = false
  let hasContactPage = false
  let hasPrivacyOrTermsPage = false
  for (const a of anchorEls) {
    const href = a.getAttribute('href') || ''
    const linkSignature = `${href} ${(a.textContent || '')}`.toLowerCase()
    if (/\babout\b/.test(linkSignature)) hasAboutPage = true
    if (/\bcontact\b/.test(linkSignature)) hasContactPage = true
    if (/\b(privacy|terms)\b/.test(linkSignature)) hasPrivacyOrTermsPage = true

    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue
    try {
      const resolved = new URL(href, url)
      if (resolved.hostname === url.hostname) {
        internalCount++
      } else {
        externalHrefs.push(resolved.href)
      }
    } catch {
      // ignore unparseable hrefs
    }
  }

  const bodyText = extractVisibleText(doc)
  const wordCount = bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0

  return {
    finalUrl,
    https: url.protocol === 'https:',
    title: { present: Boolean(titleText), text: titleText, length: titleText?.length || 0 },
    metaDescription: { present: Boolean(metaDescText), text: metaDescText, length: metaDescText?.length || 0 },
    canonical: { present: Boolean(canonicalHref), href: canonicalHref },
    robotsMeta: {
      present: Boolean(robotsContent),
      content: robotsContent,
      noindex: /noindex/i.test(robotsContent || ''),
    },
    viewportMeta: { present: Boolean(viewportContent), content: viewportContent },
    headings: {
      h1Count: h1Els.length,
      h1Text: h1Els.map((el) => (el.textContent || '').trim()).filter(Boolean),
      hasH2: headingEls.some((el) => el.tagName === 'H2'),
      questionHeadingCount,
      totalHeadingCount: headingEls.length,
      skipsLevels,
    },
    images: {
      total: imageEls.length,
      withAlt: imagesWithAlt.length,
      altCoveragePct: imageEls.length > 0 ? clampPct((imagesWithAlt.length / imageEls.length) * 100) : 100,
    },
    media: {
      videoCount: doc.querySelectorAll('video, source[type^="video"]').length,
      iframeCount: doc.querySelectorAll('iframe').length,
    },
    structure: {
      listCount: doc.querySelectorAll('ul, ol').length,
      tableCount: doc.querySelectorAll('table').length,
      shortAnswerParagraphs: headingEls.filter((heading) => {
        const next = heading.nextElementSibling
        if (!next || next.tagName !== 'P') return false
        const len = (next.textContent || '').trim().length
        return len >= 40 && len <= 320
      }).length,
    },
    links: { internalCount, externalCount: externalHrefs.length, externalHrefs },
    jsonLd: parseJsonLdBlocks(doc),
    bodyText,
    wordCount,
    hasAuthorMeta: Boolean(
      doc.querySelector('meta[name="author"]') || doc.querySelector('[rel="author"]') || doc.querySelector('.author, .byline, [itemprop="author"]')
    ),
    htmlLang: doc.documentElement.getAttribute('lang'),
    pageLinks: { hasAboutPage, hasContactPage, hasPrivacyOrTermsPage },
    hasManifest: Boolean(doc.querySelector('link[rel="manifest"]')),
    hreflangCount: doc.querySelectorAll('link[rel="alternate"][hreflang]').length,
  }
}

// Real heading-structure quality score (0-5), displayed today as "X/5" in the
// UI. Each point is a concrete, checkable rule - not a fuzzy guess:
//   +1 exactly one H1 (multiple/zero H1s is a real, flagged SEO issue)
//   +1 at least one H2 present (page has sub-structure, not just one big block)
//   +1 heading levels aren't skipped (e.g. H1 -> H3 with no H2)
//   +1 H1 text is non-trivial (>3 characters, i.e. not an empty/placeholder H1)
//   +1 more than one heading total (page has real sectioning, not just a title)
export function scoreHeadingStructure(signals: PageSignals): number {
  let score = 0
  if (signals.headings.h1Count === 1) score++
  if (signals.headings.hasH2) score++
  if (!signals.headings.skipsLevels) score++
  if ((signals.headings.h1Text[0]?.length || 0) > 3) score++
  if (signals.headings.totalHeadingCount > 1) score++
  return score
}

const SECURITY_HEADERS: Array<{ key: string; label: string }> = [
  { key: 'content-security-policy', label: 'Content-Security-Policy' },
  { key: 'strict-transport-security', label: 'Strict-Transport-Security (HSTS)' },
  { key: 'x-frame-options', label: 'X-Frame-Options' },
  { key: 'x-content-type-options', label: 'X-Content-Type-Options' },
  { key: 'referrer-policy', label: 'Referrer-Policy' },
]

// Real check of the actual HTTP response headers returned by the target site
// (captured during our server-side fetch) - replaces what used to be a
// hard-coded "Good" / "Compliant" badge with zero backing data.
export function analyzeSecurityHeaders(responseHeaders: Record<string, string> | undefined) {
  const headers = responseHeaders || {}
  const present = SECURITY_HEADERS.filter((h) => Boolean(headers[h.key])).map((h) => h.label)
  const missing = SECURITY_HEADERS.filter((h) => !headers[h.key]).map((h) => h.label)
  return { present, missing, count: present.length, total: SECURITY_HEADERS.length }
}

// Real, reusable phrase-matching over the actually-fetched body text (never
// the URL). Used by the AI-search/voice-search/E-E-A-T heuristics below.
export function countPhraseHits(text: string, phrases: string[]): number {
  const lower = text.toLowerCase()
  return phrases.reduce((count, phrase) => (lower.includes(phrase) ? count + 1 : count), 0)
}

// Real freshness signal: does the page's own text mention the current or
// prior year (a common, checkable proxy for "recently updated content").
export function hasRecentYearMention(text: string): boolean {
  const currentYear = new Date().getFullYear()
  return text.includes(String(currentYear)) || text.includes(String(currentYear - 1))
}

// Real Flesch-Kincaid Grade Level from the actually-extracted body text.
// Standard formula: 0.39*(words/sentences) + 11.8*(syllables/words) - 15.59
export function computeReadingGradeLevel(text: string): number | null {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 3)
  const words = text.split(/\s+/).filter(Boolean)
  if (sentences.length === 0 || words.length === 0) return null

  const countSyllables = (word: string): number => {
    const cleaned = word.toLowerCase().replace(/[^a-z]/g, '')
    if (!cleaned) return 1
    const groups = cleaned.match(/[aeiouy]+/g)
    let count = groups ? groups.length : 1
    if (cleaned.endsWith('e') && count > 1) count--
    return Math.max(1, count)
  }

  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0)
  const grade = 0.39 * (words.length / sentences.length) + 11.8 * (syllables / words.length) - 15.59
  return Number(Math.max(0, grade).toFixed(1))
}
