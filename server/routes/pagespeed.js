import { Router } from 'express'
import { runPageSpeed } from '../lib/pagespeedClient.js'

export const pagespeedRouter = Router()

pagespeedRouter.post('/pagespeed', async (req, res) => {
  const { url, strategy } = req.body || {}
  if (typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ unavailable: true, reason: 'Missing "url" in request body' })
  }

  const result = await runPageSpeed(url, { strategy: strategy === 'desktop' ? 'desktop' : 'mobile' })
  res.json(result)
})
