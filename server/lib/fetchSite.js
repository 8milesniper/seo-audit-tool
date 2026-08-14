import { assertSafeUrl } from './ssrfGuard.js'

const USER_AGENT = 'Mozilla/5.0 (compatible; 8MileSniperSEOAudit/1.0; +https://8milesniper.com; on-demand single-page audit tool)'
const MAX_HTML_BYTES = 5 * 1024 * 1024 // 5MB safety cap
const DEFAULT_TIMEOUT_MS = 10000

// Fetches a single URL server-side (avoids the browser CORS wall) and
// reports exactly what happened - redirects, timeouts, and non-2xx/blocked
// responses are all returned as data, never thrown as fatal errors, so the
// caller can honestly show "unavailable" instead of crashing.
export async function fetchSite(rawUrl, { timeoutMs = DEFAULT_TIMEOUT_MS, expectHtml = true } = {}) {
  let parsed
  try {
    parsed = await assertSafeUrl(rawUrl)
  } catch (err) {
    return { ok: false, fetchError: err.message }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(parsed.toString(), {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml',
      },
    })

    const responseHeaders = Object.fromEntries(response.headers.entries())

    if (!response.ok) {
      return {
        ok: false,
        httpStatus: response.status,
        finalUrl: response.url,
        responseHeaders,
        fetchError: `Site responded with HTTP ${response.status}`,
      }
    }

    const contentType = response.headers.get('content-type') || ''
    if (expectHtml && contentType && !contentType.includes('html')) {
      return {
        ok: false,
        httpStatus: response.status,
        finalUrl: response.url,
        responseHeaders,
        fetchError: `URL did not return HTML (content-type: ${contentType})`,
      }
    }

    let html = await response.text()
    if (html.length > MAX_HTML_BYTES) {
      html = html.slice(0, MAX_HTML_BYTES)
    }

    return {
      ok: true,
      httpStatus: response.status,
      finalUrl: response.url,
      redirected: response.redirected,
      responseHeaders,
      html,
      fetchError: null,
    }
  } catch (err) {
    const timedOut = err.name === 'AbortError'
    return {
      ok: false,
      fetchError: timedOut
        ? `Request timed out after ${timeoutMs}ms (site may be slow or blocking automated requests)`
        : `Fetch failed: ${err.message}`,
    }
  } finally {
    clearTimeout(timer)
  }
}
