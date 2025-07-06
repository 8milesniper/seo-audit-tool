import jsPDF from 'jspdf'
import { SEOMetrics, UserData } from '@/contexts/AuditContext'

export const generatePDFReport = async (url: string, metrics: SEOMetrics, userData: UserData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)

  // Colors matching the brand
  const brandColor = '#f59e0b' // Amber 500
  const darkColor = '#1e293b' // Slate 800
  const lightColor = '#64748b' // Slate 500

  // Helper functions
  const addText = (text: string, x: number, y: number, fontSize = 12, color = darkColor, align: 'left' | 'center' | 'right' = 'left') => {
    pdf.setFontSize(fontSize)
    pdf.setTextColor(color)
    if (align === 'center') {
      pdf.text(text, x, y, { align: 'center' })
    } else if (align === 'right') {
      pdf.text(text, x, y, { align: 'right' })
    } else {
      pdf.text(text, x, y)
    }
  }

  const addLine = (x1: number, y1: number, x2: number, y2: number, color = lightColor) => {
    pdf.setDrawColor(color)
    pdf.line(x1, y1, x2, y2)
  }

  const addRect = (x: number, y: number, w: number, h: number, fillColor?: string, borderColor?: string) => {
    if (fillColor) {
      pdf.setFillColor(fillColor)
      pdf.rect(x, y, w, h, 'F')
    }
    if (borderColor) {
      pdf.setDrawColor(borderColor)
      pdf.rect(x, y, w, h, 'S')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981' // Green
    if (score >= 70) return '#f59e0b' // Amber
    if (score >= 50) return '#f97316' // Orange
    return '#ef4444' // Red
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 50) return 'Needs Work'
    return 'Poor'
  }

  // Page 1: Cover Page
  let currentY = 40

  // Header with logo space
  addRect(margin, margin, contentWidth, 30, brandColor)
  addText('8 MILE SNIPER', pageWidth / 2, margin + 15, 20, '#000000', 'center')
  addText('AI-DRIVEN LOCAL GROWTH', pageWidth / 2, margin + 25, 10, '#000000', 'center')

  currentY = 80

  // Title
  addText('SEO AUDIT REPORT', pageWidth / 2, currentY, 28, darkColor, 'center')
  currentY += 20

  // Website URL
  addText(url, pageWidth / 2, currentY, 14, brandColor, 'center')
  currentY += 30

  // Overall Score Circle (simplified)
  const scoreX = pageWidth / 2
  const scoreY = currentY + 30
  
  addText(metrics.overallScore.toString(), scoreX, scoreY, 48, getScoreColor(metrics.overallScore), 'center')
  addText('/ 100', scoreX + 20, scoreY + 10, 16, lightColor)
  addText(getScoreLabel(metrics.overallScore), scoreX, scoreY + 20, 14, getScoreColor(metrics.overallScore), 'center')

  currentY += 80

  // Client Information
  addText('Report Generated For:', margin, currentY, 12, darkColor)
  currentY += 10
  addText(userData.name, margin, currentY, 14, darkColor)
  currentY += 8
  addText(userData.email, margin, currentY, 12, lightColor)
  if (userData.company) {
    currentY += 8
    addText(userData.company, margin, currentY, 12, lightColor)
  }

  currentY += 20
  addText(`Generated on: ${new Date().toLocaleDateString()}`, margin, currentY, 10, lightColor)

  // Page 2: Executive Summary
  pdf.addPage()
  currentY = margin + 20

  addText('EXECUTIVE SUMMARY', margin, currentY, 20, darkColor)
  currentY += 20

  // Score breakdown
  const scores = [
    { label: 'Overall SEO Score', value: metrics.overallScore },
    { label: 'Performance', value: metrics.performanceScore },
    { label: 'SEO Optimization', value: metrics.seoScore },
    { label: 'Accessibility', value: metrics.accessibilityScore },
    { label: 'Best Practices', value: metrics.bestPracticesScore }
  ]

  scores.forEach(score => {
    addText(score.label, margin, currentY, 12, darkColor)
    const scoreColor = getScoreColor(score.value)
    addText(score.value.toString(), margin + 120, currentY, 12, scoreColor)
    
    // Progress bar
    const barWidth = 50
    const barHeight = 3
    addRect(margin + 135, currentY - 2, barWidth, barHeight, '#e5e7eb')
    addRect(margin + 135, currentY - 2, (barWidth * score.value) / 100, barHeight, scoreColor)
    
    currentY += 12
  })

  currentY += 20

  // Key Findings
  addText('KEY FINDINGS', margin, currentY, 16, darkColor)
  currentY += 15

  const criticalIssues = metrics.issues.filter(issue => issue.type === 'critical').length
  const warningIssues = metrics.issues.filter(issue => issue.type === 'warning').length

  addText(`• ${criticalIssues} critical issues requiring immediate attention`, margin, currentY, 11, darkColor)
  currentY += 8
  addText(`• ${warningIssues} warnings that should be addressed`, margin, currentY, 11, darkColor)
  currentY += 8
  addText(`• Core Web Vitals: LCP ${metrics.coreWebVitals.lcp}s, FID ${metrics.coreWebVitals.fid}ms, CLS ${metrics.coreWebVitals.cls}`, margin, currentY, 11, darkColor)
  currentY += 8
  addText(`• Mobile-friendly: ${metrics.technical.mobile ? 'Yes' : 'No'}`, margin, currentY, 11, darkColor)
  currentY += 8
  addText(`• HTTPS enabled: ${metrics.technical.https ? 'Yes' : 'No'}`, margin, currentY, 11, darkColor)

  // Page 3: Detailed Analysis
  pdf.addPage()
  currentY = margin + 20

  addText('DETAILED ANALYSIS', margin, currentY, 20, darkColor)
  currentY += 25

  // Core Web Vitals
  addText('Core Web Vitals', margin, currentY, 14, darkColor)
  currentY += 12
  
  addLine(margin, currentY, margin + contentWidth, currentY)
  currentY += 10

  const webVitals = [
    { metric: 'Largest Contentful Paint (LCP)', value: `${metrics.coreWebVitals.lcp}s`, threshold: '< 2.5s', status: metrics.coreWebVitals.lcp <= 2.5 },
    { metric: 'First Input Delay (FID)', value: `${metrics.coreWebVitals.fid}ms`, threshold: '< 100ms', status: metrics.coreWebVitals.fid <= 100 },
    { metric: 'Cumulative Layout Shift (CLS)', value: metrics.coreWebVitals.cls.toString(), threshold: '< 0.1', status: metrics.coreWebVitals.cls <= 0.1 }
  ]

  webVitals.forEach(vital => {
    addText(vital.metric, margin, currentY, 10, darkColor)
    addText(vital.value, margin + 100, currentY, 10, vital.status ? '#10b981' : '#ef4444')
    addText(vital.threshold, margin + 140, currentY, 9, lightColor)
    addText(vital.status ? '✓' : '✗', margin + 170, currentY, 10, vital.status ? '#10b981' : '#ef4444')
    currentY += 8
  })

  currentY += 15

  // Technical SEO
  addText('Technical SEO', margin, currentY, 14, darkColor)
  currentY += 12
  
  addLine(margin, currentY, margin + contentWidth, currentY)
  currentY += 10

  const technicalChecks = [
    { check: 'HTTPS Protocol', status: metrics.technical.https },
    { check: 'Mobile Responsive', status: metrics.technical.mobile },
    { check: 'Page Speed Optimized', status: metrics.technical.pageSpeed < 3 },
    { check: 'Image Optimization', status: metrics.technical.imageOptimization > 70 }
  ]

  technicalChecks.forEach(check => {
    addText(check.check, margin, currentY, 10, darkColor)
    addText(check.status ? 'PASS' : 'FAIL', margin + 120, currentY, 10, check.status ? '#10b981' : '#ef4444')
    addText(check.status ? '✓' : '✗', margin + 150, currentY, 10, check.status ? '#10b981' : '#ef4444')
    currentY += 8
  })

  // Page 4: Issues and Recommendations
  pdf.addPage()
  currentY = margin + 20

  addText('ISSUES & RECOMMENDATIONS', margin, currentY, 20, darkColor)
  currentY += 25

  const priorityIssues = metrics.issues.slice(0, 8) // Show top 8 issues

  priorityIssues.forEach((issue, index) => {
    if (currentY > 250) {
      pdf.addPage()
      currentY = margin + 20
    }

    // Issue type badge
    const badgeColor = issue.type === 'critical' ? '#ef4444' : issue.type === 'warning' ? '#f59e0b' : '#3b82f6'
    addRect(margin, currentY - 3, 20, 8, badgeColor)
    addText(issue.type.toUpperCase(), margin + 1, currentY + 1, 7, '#ffffff')

    // Issue title
    addText(issue.title, margin + 25, currentY, 11, darkColor)
    currentY += 8

    // Issue description
    const descLines = pdf.splitTextToSize(issue.description, contentWidth - 10)
    descLines.forEach((line: string) => {
      addText(line, margin + 5, currentY, 9, lightColor)
      currentY += 6
    })

    // Recommendation
    addText('Recommendation:', margin + 5, currentY, 9, darkColor)
    currentY += 6
    const recLines = pdf.splitTextToSize(issue.recommendation, contentWidth - 10)
    recLines.forEach((line: string) => {
      addText(line, margin + 5, currentY, 9, lightColor)
      currentY += 6
    })

    currentY += 10
  })

  // Footer on last page
  const finalY = pageHeight - 30
  addLine(margin, finalY, margin + contentWidth, finalY)
  addText('Generated by 8 Mile Sniper - AI-Driven Local Growth', pageWidth / 2, finalY + 10, 10, lightColor, 'center')
  addText('Contact us for professional SEO services and consultation', pageWidth / 2, finalY + 18, 9, lightColor, 'center')

  // Save the PDF
  const fileName = `SEO-Audit-Report-${new Date().toISOString().split('T')[0]}.pdf`
  pdf.save(fileName)

  return fileName
}

// Generate a simplified HTML report for email
export const generateHTMLReport = (url: string, metrics: SEOMetrics, userData: UserData): string => {
  const criticalIssues = metrics.issues.filter(issue => issue.type === 'critical').length
  const warningIssues = metrics.issues.filter(issue => issue.type === 'warning').length

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>SEO Audit Report - ${url}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 8px; }
        .score-circle { font-size: 48px; font-weight: bold; text-align: center; margin: 20px 0; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .metric-card { border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; }
        .score { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
        .issues { margin: 20px 0; }
        .issue { border-left: 4px solid #f59e0b; padding: 10px; margin: 10px 0; background: #f9fafb; }
        .critical { border-left-color: #ef4444; }
        .warning { border-left-color: #f59e0b; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>8 Mile Sniper</h1>
        <h2>SEO Audit Report</h2>
        <p>${url}</p>
      </div>

      <div class="score-circle">
        Overall Score: ${metrics.overallScore}/100
      </div>

      <div class="metrics">
        <div class="metric-card">
          <div class="score">${metrics.performanceScore}</div>
          <div>Performance</div>
        </div>
        <div class="metric-card">
          <div class="score">${metrics.seoScore}</div>
          <div>SEO Optimization</div>
        </div>
        <div class="metric-card">
          <div class="score">${metrics.accessibilityScore}</div>
          <div>Accessibility</div>
        </div>
        <div class="metric-card">
          <div class="score">${metrics.bestPracticesScore}</div>
          <div>Best Practices</div>
        </div>
      </div>

      <h3>Key Findings</h3>
      <ul>
        <li>${criticalIssues} critical issues requiring immediate attention</li>
        <li>${warningIssues} warnings that should be addressed</li>
        <li>Core Web Vitals: LCP ${metrics.coreWebVitals.lcp}s, FID ${metrics.coreWebVitals.fid}ms, CLS ${metrics.coreWebVitals.cls}</li>
        <li>Mobile-friendly: ${metrics.technical.mobile ? 'Yes' : 'No'}</li>
        <li>HTTPS enabled: ${metrics.technical.https ? 'Yes' : 'No'}</li>
      </ul>

      <div class="issues">
        <h3>Top Issues & Recommendations</h3>
        ${metrics.issues.slice(0, 5).map(issue => `
          <div class="issue ${issue.type}">
            <h4>${issue.title}</h4>
            <p>${issue.description}</p>
            <p><strong>Recommendation:</strong> ${issue.recommendation}</p>
          </div>
        `).join('')}
      </div>

      <div class="footer">
        <p>Report generated by 8 Mile Sniper - AI-Driven Local Growth</p>
        <p>For professional SEO services and consultation, contact us today!</p>
      </div>
    </body>
    </html>
  `
}
