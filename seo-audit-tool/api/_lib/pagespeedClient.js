const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const TIMEOUT_MS = 25000 // PSI's own Lighthouse run is slow; give it real room

function categoryScore(lighthouseResult, id) {
  const raw = lighthouseResult?.categories?.[id]?.score
  return typeof raw === 'number' ? Math.round(raw * 100) : null
}

function labAuditMs(lighthouseResult, auditId) {
  const raw = lighthouseResult?.audits?.[auditId]?.numericValue
  return typeof raw === 'number' ? raw : null
}

function auditPassed(lighthouseResult, auditId) {
  const audit = lighthouseResult?.audits?.[auditId]
  if (!audit || typeof audit.score !== 'number') return null // audit not applicable (e.g. desktop strategy)
  return audit.score === 1
}

function fieldMetric(loadingExperience, key) {
  const raw = loadingExperience?.metrics?.[key]?.percentile
  return typeof raw === 'number' ? raw : null
}

// Real Google PageSpeed Insights v5 call. Returns { unavailable: true, reason }
// when there's no key or the call fails - callers must never substitute a
// fake number in that case.
export async function runPageSpeed(targetUrl, { strategy = 'mobile' } = {}) {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY
  if (!apiKey) {
    return { unavailable: true, reason: 'No GOOGLE_PAGESPEED_API_KEY configured on the server' }
  }

  const params = new URLSearchParams({ url: targetUrl, key: apiKey, strategy })
  for (const category of ['performance', 'accessibility', 'best-practices', 'seo']) {
    params.append('category', category)
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, { signal: controller.signal })
    if (!response.ok) {
      const body = await response.text().catch(() => '')
      return { unavailable: true, reason: `PSI request failed (HTTP ${response.status}): ${body.slice(0, 200)}` }
    }

    const data = await response.json()
    const lighthouseResult = data.lighthouseResult
    const loadingExperience = data.loadingExperience

    if (!lighthouseResult) {
      return { unavailable: true, reason: 'PSI response had no Lighthouse result' }
    }

    // Prefer real field data (CrUX, actual visitors) for Core Web Vitals; fall
    // back to the lab run from this single Lighthouse pass when field data
    // isn't available yet for a low-traffic site. Both are real measurements,
    // never estimates.
    const lcpMs = fieldMetric(loadingExperience, 'LARGEST_CONTENTFUL_PAINT_MS') ?? labAuditMs(lighthouseResult, 'largest-contentful-paint')
    const inpMs = fieldMetric(loadingExperience, 'INTERACTION_TO_NEXT_PAINT') ?? labAuditMs(lighthouseResult, 'interaction-to-next-paint')
    const cls = fieldMetric(loadingExperience, 'CUMULATIVE_LAYOUT_SHIFT_SCORE')
    const clsRaw = typeof cls === 'number' ? cls / 100 : lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue ?? null
    const speedIndexMs = labAuditMs(lighthouseResult, 'speed-index')
    const ttfbMs = labAuditMs(lighthouseResult, 'server-response-time')
    const tbtMs = labAuditMs(lighthouseResult, 'total-blocking-time')

    return {
      unavailable: false,
      performanceScore: categoryScore(lighthouseResult, 'performance'),
      accessibilityScore: categoryScore(lighthouseResult, 'accessibility'),
      bestPracticesScore: categoryScore(lighthouseResult, 'best-practices'),
      seoScore: categoryScore(lighthouseResult, 'seo'),
      coreWebVitals: {
        lcp: typeof lcpMs === 'number' ? Number((lcpMs / 1000).toFixed(2)) : null,
        inp: typeof inpMs === 'number' ? Math.round(inpMs) : null,
        cls: typeof clsRaw === 'number' ? Number(clsRaw.toFixed(3)) : null,
        ttfb: typeof ttfbMs === 'number' ? Math.round(ttfbMs) : null,
        tbt: typeof tbtMs === 'number' ? Math.round(tbtMs) : null,
      },
      pageSpeedSeconds: typeof speedIndexMs === 'number' ? Number((speedIndexMs / 1000).toFixed(1)) : null,
      tapTargetsOk: auditPassed(lighthouseResult, 'tap-targets'),
      fieldDataAvailable: Boolean(loadingExperience),
    }
  } catch (err) {
    const timedOut = err.name === 'AbortError'
    return {
      unavailable: true,
      reason: timedOut ? 'PSI request timed out' : `PSI request failed: ${err.message}`,
    }
  } finally {
    clearTimeout(timer)
  }
}
