import jsPDF from 'jspdf'
import { SEOMetrics, UserData } from '@/contexts/AuditContext'

export const generateEnhancedPDFReport = async (url: string, metrics: SEOMetrics, userData: UserData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)

  // 8 Mile Sniper Brand Colors
  const brandGold = '#f59e0b'
  const brandDark = '#1e293b'
  const brandLight = '#64748b'
  const successGreen = '#10b981'
  const warningOrange = '#f97316'
  const errorRed = '#ef4444'
  const bgLight = '#f8fafc'

  // Helper functions for professional design
  const addText = (text: string, x: number, y: number, fontSize = 12, color = brandDark, align: 'left' | 'center' | 'right' = 'left', weight: 'normal' | 'bold' = 'normal') => {
    pdf.setFontSize(fontSize)
    pdf.setTextColor(color)
    if (weight === 'bold') {
      pdf.setFont('helvetica', 'bold')
    } else {
      pdf.setFont('helvetica', 'normal')
    }
    
    if (align === 'center') {
      pdf.text(text, x, y, { align: 'center' })
    } else if (align === 'right') {
      pdf.text(text, x, y, { align: 'right' })
    } else {
      pdf.text(text, x, y)
    }
  }

  const addCard = (x: number, y: number, w: number, h: number, title: string, content: string[], titleColor = brandGold) => {
    // Card background
    pdf.setFillColor(255, 255, 255)
    pdf.setDrawColor(230, 230, 230)
    pdf.roundedRect(x, y, w, h, 2, 2, 'FD')
    
    // Title bar
    pdf.setFillColor(titleColor)
    pdf.roundedRect(x, y, w, 8, 2, 2, 'F')
    
    // Title text
    addText(title, x + 3, y + 6, 10, '#ffffff', 'left', 'bold')
    
    // Content
    let contentY = y + 15
    content.forEach((line, index) => {
      addText(line, x + 3, contentY + (index * 5), 9, brandDark)
    })
  }

  const addScoreGauge = (x: number, y: number, score: number, label: string) => {
    const radius = 15
    const centerX = x + radius
    const centerY = y + radius
    
    // Background circle
    pdf.setFillColor(240, 240, 240)
    pdf.circle(centerX, centerY, radius, 'F')
    
    // Score arc
    const scoreColor = score >= 80 ? successGreen : score >= 60 ? warningOrange : errorRed
    pdf.setFillColor(scoreColor)
    
    // Simplified score display - just the circle with color and text
    pdf.setFillColor(scoreColor)
    pdf.circle(centerX, centerY, radius - 2, 'F')
    
    // Score text
    addText(score.toString(), centerX, centerY + 2, 16, '#ffffff', 'center', 'bold')
    
    // Label
    addText(label, centerX, centerY + radius + 8, 8, brandDark, 'center')
  }

  const addProgressBar = (x: number, y: number, w: number, value: number, maxValue: number, label: string) => {
    const percentage = (value / maxValue) * 100
    const fillWidth = (percentage / 100) * w
    
    // Background
    pdf.setFillColor(240, 240, 240)
    pdf.rect(x, y, w, 4, 'F')
    
    // Fill
    const color = percentage >= 80 ? successGreen : percentage >= 60 ? warningOrange : errorRed
    pdf.setFillColor(color)
    pdf.rect(x, y, fillWidth, 4, 'F')
    
    // Label and value
    addText(label, x, y - 2, 8, brandDark)
    addText(`${value}/${maxValue}`, x + w, y - 2, 8, brandLight, 'right')
  }

  // Page 1: Header and Executive Summary
  let currentY = margin

  // Header with Logo Space and Branding
  pdf.setFillColor(brandDark)
  pdf.rect(0, 0, pageWidth, 35, 'F')
  
  // Company branding
  addText('8 MILE SNIPER', margin, 15, 16, brandGold, 'left', 'bold')
  addText('AI-DRIVEN LOCAL GROWTH', margin, 25, 10, '#ffffff')
  
  // Report title
  addText('COMPREHENSIVE SEO & AI AUDIT REPORT', pageWidth - margin, 15, 16, '#ffffff', 'right', 'bold')
  addText('2025 AI Search Optimization Analysis', pageWidth - margin, 25, 10, brandGold, 'right')
  
  currentY = 50

  // Website and date info
  addText(`Website: ${url}`, margin, currentY, 12, brandDark, 'left', 'bold')
  addText(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin, currentY, 10, brandLight, 'right')
  addText(`Client: ${userData.name || 'N/A'}`, margin, currentY + 8, 10, brandLight)
  addText(`Company: ${userData.company || 'N/A'}`, margin, currentY + 16, 10, brandLight)
  
  currentY += 35

  // Main Score Section with Gauge
  addCard(margin, currentY, contentWidth, 40, 'OVERALL SEO & AI READINESS SCORE', [])
  addScoreGauge(margin + 20, currentY + 15, metrics.overallScore, 'Overall Score')
  
  // Score breakdown
  const scoreBreakdown = [
    `Performance: ${metrics.performanceScore}/100`,
    `SEO Score: ${metrics.seoScore}/100`, 
    `Accessibility: ${metrics.accessibilityScore}/100`,
    `AI Search Ready: ${metrics.aiSearchReadiness}/100`
  ]
  
  scoreBreakdown.forEach((item, index) => {
    addText(item, margin + 80, currentY + 20 + (index * 6), 9, brandDark)
  })
  
  currentY += 55

  // Executive Summary
  addCard(margin, currentY, contentWidth, 35, 'EXECUTIVE SUMMARY', [
    `Your website scored ${metrics.overallScore}/100 in our comprehensive SEO & AI audit.`,
    `We analyzed ${metrics.issues?.length || 0} key areas including AI search readiness.`,
    `Found ${metrics.issues?.filter(i => i.type === 'critical').length || 0} critical issues and ${metrics.issues?.filter(i => i.type === 'warning').length || 0} warnings that need attention.`,
    'This report provides actionable recommendations for 2025 search optimization.'
  ])
  
  currentY += 50

  // Key Metrics Dashboard
  addCard(margin, currentY, contentWidth, 45, '2025 AI SEARCH OPTIMIZATION METRICS', [])
  
  // Core Web Vitals
  currentY += 15
  addText('Core Web Vitals 2025:', margin + 5, currentY, 10, brandDark, 'left', 'bold')
  currentY += 8
  addProgressBar(margin + 5, currentY, 40, Math.round(metrics.coreWebVitals.lcp * 100), 100, 'LCP')
  addProgressBar(margin + 50, currentY, 40, Math.round(metrics.coreWebVitals.inp * 100), 100, 'INP') 
  addProgressBar(margin + 95, currentY, 40, Math.round(metrics.coreWebVitals.cls * 100), 100, 'CLS')
  
  currentY += 15
  addText('AI Search Features:', margin + 5, currentY, 10, brandDark, 'left', 'bold')
  currentY += 8
  addProgressBar(margin + 5, currentY, 40, metrics.aiSearch.sgeOptimization, 100, 'Google SGE')
  addProgressBar(margin + 50, currentY, 40, metrics.aiSearch.chatgptReadiness, 100, 'ChatGPT')
  addProgressBar(margin + 95, currentY, 40, metrics.aiSearch.perplexityOptimization, 100, 'Perplexity')
  
  currentY += 20

  // Page 2: Detailed Analysis
  pdf.addPage()
  currentY = margin + 10

  // Page header
  addText('DETAILED AI & SEO ANALYSIS', pageWidth/2, currentY, 16, brandDark, 'center', 'bold')
  currentY += 20

  // Technical SEO Section
  addCard(margin, currentY, contentWidth/2 - 5, 50, 'TECHNICAL SEO ANALYSIS', [
    `Mobile-First Indexing: ${metrics.technical?.mobile ? 'Optimized' : 'Needs Work'}`,
    `Page Speed Score: ${metrics.performanceScore}/100`,
    `Schema Markup: ${metrics.schemaEntity?.organizationSchema ? 'Implemented' : 'Missing'}`,
    `HTTPS Security: ${metrics.technical?.https ? 'Secure' : 'Needs SSL'}`,
    `PWA Compatible: ${metrics.technical?.pwaCompatibility ? 'Yes' : 'No'}`,
    '',
    'Critical for 2025 search rankings',
    'AI crawlers prioritize technical excellence'
  ])

  // AI Optimization Section  
  addCard(pageWidth/2 + 5, currentY, contentWidth/2 - 5, 50, 'AI SEARCH OPTIMIZATION', [
    `Google SGE Ready: ${metrics.aiSearch.sgeOptimization >= 70 ? 'Yes' : 'Partial'}`,
    `ChatGPT Optimized: ${metrics.aiSearch.chatgptReadiness >= 60 ? 'Yes' : 'No'}`,
    `Perplexity AI Score: ${metrics.aiSearch.perplexityOptimization}/100`,
    `Voice Search Ready: ${metrics.voiceSearch.naturalLanguageOptimization ? 'Yes' : 'No'}`,
    `Entity Recognition: ${metrics.schemaEntityScore}/100`,
    '',
    'NEW for 2025: AI search dominance',
    'Your competitive advantage'
  ])

  currentY += 65

  // Issues and Recommendations
  addCard(margin, currentY, contentWidth, 60, 'CRITICAL ISSUES & RECOMMENDATIONS', [])
  
  currentY += 15
  
  // Critical Issues
  const criticalIssues = metrics.issues?.filter(issue => issue.type === 'critical') || []
  if (criticalIssues.length) {
    addText('🚨 CRITICAL ISSUES:', margin + 5, currentY, 11, errorRed, 'left', 'bold')
    currentY += 8
    
    criticalIssues.slice(0, 3).forEach((issue: any, index: number) => {
      addText(`${index + 1}. ${issue.title}`, margin + 8, currentY, 9, brandDark)
      addText(`   Solution: ${issue.recommendation}`, margin + 8, currentY + 4, 8, brandLight)
      currentY += 12
    })
  }
  
  currentY += 5
  
  // Warnings
  const warningIssues = metrics.issues?.filter(issue => issue.type === 'warning') || []
  if (warningIssues.length) {
    addText('⚠️ WARNINGS:', margin + 5, currentY, 11, warningOrange, 'left', 'bold')
    currentY += 8
    
    warningIssues.slice(0, 4).forEach((issue: any, index: number) => {
      addText(`${index + 1}. ${issue.title}`, margin + 8, currentY, 9, brandDark)
      currentY += 6
    })
  }

  // Page 3: Action Plan
  pdf.addPage()
  currentY = margin + 10

  addText('2025 AI-POWERED SEO ACTION PLAN', pageWidth/2, currentY, 16, brandDark, 'center', 'bold')
  currentY += 20

  // Priority Matrix
  addCard(margin, currentY, contentWidth, 80, 'RECOMMENDED ACTION PRIORITY', [
    '📊 IMMEDIATE ACTIONS (Week 1-2):',
    '   • Fix critical Core Web Vitals issues',
    '   • Implement missing schema markup',
    '   • Optimize for Google SGE',
    '',
    '🚀 SHORT-TERM GOALS (Month 1-2):',
    '   • Enhance content for AI search',
    '   • Improve E-E-A-T signals',
    '   • Voice search optimization', 
    '',
    '📈 LONG-TERM STRATEGY (3-6 months):',
    '   • Advanced entity optimization',
    '   • AI content strategies',
    '   • Competitive AI advantage',
    '',
    '💡 2025 COMPETITIVE EDGE:',
    '   • Be first in your market with AI optimization',
    '   • Dominate Google SGE results',
    '   • Capture voice search traffic'
  ])

  // Footer
  currentY = pageHeight - 30
  pdf.setFillColor(brandDark)
  pdf.rect(0, currentY, pageWidth, 30, 'F')
  
  addText('8 MILE SNIPER - AI-DRIVEN LOCAL GROWTH', pageWidth/2, currentY + 15, 12, brandGold, 'center', 'bold')
  addText('The Future of SEO is AI-Powered. Get Ahead of Your Competition.', pageWidth/2, currentY + 22, 10, '#ffffff', 'center')

  // Generate filename with proper branding
  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `SEO-AI-Audit-Report-${timestamp}.pdf`
  
  pdf.save(filename)
}

export default generateEnhancedPDFReport
