import { fetchSite } from './_lib/fetchSite.js'
import { discoverRobotsAndSitemap } from './_lib/robotsSitemap.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, fetchError: 'Method not allowed' })
    return
  }

  const { url } = req.body || {}
  if (typeof url !== 'string' || !url.trim()) {
    res.status(400).json({ ok: false, fetchError: 'Missing "url" in request body' })
    return
  }

  const siteResult = await fetchSite(url)
  if (!siteResult.ok) {
    res.status(200).json(siteResult)
    return
  }

  let robotsSitemap = { robotsTxtFound: false, robotsTxt: null, sitemapFound: false, sitemapUrl: null }
  try {
    robotsSitemap = await discoverRobotsAndSitemap(new URL(siteResult.finalUrl).origin)
  } catch {
    // robots.txt/sitemap discovery is best-effort; leave the "not found" defaults
  }

  res.status(200).json({ ...siteResult, ...robotsSitemap })
}
