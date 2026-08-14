import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { analyzeRouter } from './routes/analyze.js'
import { pagespeedRouter } from './routes/pagespeed.js'

const app = express()
const port = process.env.PORT || 8787

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, pagespeedConfigured: Boolean(process.env.GOOGLE_PAGESPEED_API_KEY) })
})

app.use('/api', analyzeRouter)
app.use('/api', pagespeedRouter)

app.listen(port, () => {
  console.log(`SEO audit backend listening on http://localhost:${port}`)
  if (!process.env.GOOGLE_PAGESPEED_API_KEY) {
    console.warn('GOOGLE_PAGESPEED_API_KEY not set - performance/Core Web Vitals will report "unavailable"')
  }
})
