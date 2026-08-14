import { fetchSite } from './fetchSite.js'

const COMMON_SITEMAP_PATHS = ['/sitemap.xml', '/sitemap_index.xml']
const ROBOTS_SITEMAP_LINE = /^\s*sitemap\s*:\s*(\S+)/i

// Best-effort - a site missing robots.txt or a sitemap is a real (and common)
// finding, not a fetch failure, so this never throws. Every field defaults to
// "not found" rather than being left undefined.
export async function discoverRobotsAndSitemap(origin) {
  const result = {
    robotsTxtFound: false,
    robotsTxt: null,
    sitemapFound: false,
    sitemapUrl: null,
  }

  const robotsResult = await fetchSite(new URL('/robots.txt', origin).toString(), { timeoutMs: 6000, expectHtml: false })
  if (robotsResult.ok && robotsResult.html) {
    result.robotsTxtFound = true
    result.robotsTxt = robotsResult.html.slice(0, 20000)

    for (const line of result.robotsTxt.split('\n')) {
      const match = line.match(ROBOTS_SITEMAP_LINE)
      if (match) {
        result.sitemapFound = true
        result.sitemapUrl = match[1].trim()
        break
      }
    }
  }

  if (!result.sitemapFound) {
    for (const path of COMMON_SITEMAP_PATHS) {
      const candidateUrl = new URL(path, origin).toString()
      const sitemapResult = await fetchSite(candidateUrl, { timeoutMs: 6000, expectHtml: false })
      if (sitemapResult.ok && sitemapResult.html && /<urlset|<sitemapindex/i.test(sitemapResult.html)) {
        result.sitemapFound = true
        result.sitemapUrl = candidateUrl
        break
      }
    }
  }

  return result
}
