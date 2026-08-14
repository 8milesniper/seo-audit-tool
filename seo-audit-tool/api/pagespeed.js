import { runPageSpeed } from './_lib/pagespeedClient.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ unavailable: true, reason: 'Method not allowed' })
    return
  }

  const { url, strategy } = req.body || {}
  if (typeof url !== 'string' || !url.trim()) {
    res.status(400).json({ unavailable: true, reason: 'Missing "url" in request body' })
    return
  }

  const result = await runPageSpeed(url, { strategy: strategy === 'desktop' ? 'desktop' : 'mobile' })
  res.status(200).json(result)
}
