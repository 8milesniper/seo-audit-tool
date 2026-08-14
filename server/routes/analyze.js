import { Router } from 'express'
import { fetchSite } from '../lib/fetchSite.js'
import { discoverRobotsAndSitemap } from '../lib/robotsSitemap.js'

export const analyzeRouter = Router()

analyzeRouter.post('/fetch-site', async (req, res) => {
  const { url } = req.body || {}
  if (typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ ok: false, fetchError: 'Missing "url" in request body' })
  }

  const siteResult = await fetchSite(url)
  if (!siteResult.ok) {
    return res.json(siteResult)
  }

  let robotsSitemap = { robotsTxtFound: false, robotsTxt: null, sitemapFound: false, sitemapUrl: null }
  try {
    robotsSitemap = await discoverRobotsAndSitemap(new URL(siteResult.finalUrl).origin)
  } catch {
    // robots.txt/sitemap discovery is best-effort; leave the "not found" defaults
  }

  res.json({ ...siteResult, ...robotsSitemap })
})
