import jsPDF from 'jspdf'

interface SEOMetrics {
  overallScore: number
  performanceScore: number
  seoScore: number
  accessibilityScore: number
  bestPracticesScore: number
  
  // NEW 2025 FEATURES
  aiSearchReadiness: number
  voiceSearchOptimization: number
  schemaEntityScore: number
  eeAtScore: number
  
  coreWebVitals: {
    lcp: number
    fid: number
    cls: number
    inp: number
    tbt: number
    ttfb: number
  }
  
  aiSearch: {
    sgeOptimization: number
    chatgptReadiness: number
    perplexityOptimization: number
    bingCopilotReadiness: number
    conversationalContent: boolean
    firstHandExperience: boolean
    multimediaRichness: number
  }
  
  voiceSearch: {
    conversationalKeywords: number
    featuredSnippetOpportunities: number
    localVoiceReadiness: number
    questionBasedContent: number
    averageReadingLevel: number
    naturalLanguageOptimization: boolean
  }
  
  schemaEntity: {
    organizationSchema: boolean
    personSchema: boolean
    productSchema: boolean
    faqSchema: boolean
    howToSchema: boolean
    breadcrumbSchema: boolean
    localBusinessSchema: boolean
    entityConnections: number
    semanticMarkup: number
    knowledgeGraphPresence: boolean
  }
  
  eeAt: {
    experienceSignals: number
    expertiseIndicators: number
    authoritativenessScore: number
    trustworthinessSignals: number
    authorshipMarkup: boolean
    socialProof: number
    contentDepth: number
    sourceCredibility: number
  }
  
  technical: {
    https: boolean
    mobile: boolean
    pageSpeed: number
    imageOptimization: number
    mobileCoreWebVitals: number
    pwaCompatibility: boolean
    structuredDataValidation: number
    internationalSeo: number
  }
  
  onPage: {
    titleTag: boolean
    metaDescription: boolean
    headings: number
    altText: number
    semanticKeywords: number
    contentComprehensiveness: number
    userIntentAlignment: number
    readabilityScore: number
  }
  
  backlinks: {
    totalBacklinks: number
    referringDomains: number
    domainAuthority: number
    pageAuthority: number
  }
  
  issues: Array<{
    type: 'critical' | 'warning' | 'info'
    category: 'traditional' | 'ai-search' | 'voice-search' | 'schema' | 'eeat' | 'performance'
    title: string
    description: string
    recommendation: string
    priority: number
    impact: 'high' | 'medium' | 'low'
  }>
}

interface UserData {
  name: string
  email: string
  phone: string
  company?: string
}

export const generateProfessionalPDF = async (
  metrics: SEOMetrics,
  userData: UserData,
  websiteUrl: string
): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  
  // Colors
  const primaryColor = '#F59E0B' // Amber
  const darkColor = '#1E293B' // Dark slate
  const lightGray = '#64748B'
  const redColor = '#EF4444'
  const greenColor = '#10B981'
  
  let yPosition = 20
  const leftMargin = 20
  const rightMargin = pageWidth - 20
  const contentWidth = rightMargin - leftMargin

  // Header with Logo and Branding
  pdf.setFillColor(30, 41, 59) // Dark background
  pdf.rect(0, 0, pageWidth, 50, 'F')
  
  // Add logo text (since we can't easily embed images)
  pdf.setTextColor(245, 158, 11) // Amber color
  pdf.setFontSize(24)
  pdf.setFont('helvetica', 'bold')
  pdf.text('8 MILE SNIPER', leftMargin, 25)
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  pdf.text('AI-DRIVEN LOCAL GROWTH', leftMargin, 35)
  
  // Report title on right
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('SEO & AI AUDIT REPORT', rightMargin - 80, 25)
  
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.text(new Date().toLocaleDateString(), rightMargin - 80, 35)

  yPosition = 65

  // Website and Client Info
  pdf.setTextColor(30, 41, 59)
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Website Analysis Report', leftMargin, yPosition)
  
  yPosition += 15
  
  // Website info box
  pdf.setFillColor(248, 250, 252) // Light background
  pdf.rect(leftMargin, yPosition - 5, contentWidth, 30, 'F')
  pdf.setDrawColor(245, 158, 11)
  pdf.setLineWidth(0.5)
  pdf.rect(leftMargin, yPosition - 5, contentWidth, 30, 'S')
  
  pdf.setTextColor(30, 41, 59)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Website:', leftMargin + 5, yPosition + 5)
  pdf.setFont('helvetica', 'normal')
  pdf.text(websiteUrl, leftMargin + 30, yPosition + 5)
  
  pdf.setFont('helvetica', 'bold')
  pdf.text('Client:', leftMargin + 5, yPosition + 15)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`${userData.name} - ${userData.company || 'N/A'}`, leftMargin + 25, yPosition + 15)

  yPosition += 45

  // Overall Score Section
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Overall SEO Score', leftMargin, yPosition)
  
  yPosition += 10
  
  // Score circle representation
  const scoreColor = metrics.overallScore >= 80 ? greenColor : metrics.overallScore >= 60 ? '#F59E0B' : redColor
  pdf.setFillColor(scoreColor === greenColor ? 16 : scoreColor === '#F59E0B' ? 245 : 239, 
                   scoreColor === greenColor ? 185 : scoreColor === '#F59E0B' ? 158 : 68, 
                   scoreColor === greenColor ? 129 : scoreColor === '#F59E0B' ? 11 : 68)
  pdf.circle(leftMargin + 25, yPosition + 15, 15, 'F')
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  pdf.text(metrics.overallScore.toString(), leftMargin + 20, yPosition + 20)
  pdf.setFontSize(10)
  pdf.text('/100', leftMargin + 32, yPosition + 20)

  // Score interpretation
  pdf.setTextColor(30, 41, 59)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  const scoreText = metrics.overallScore >= 80 ? 'Excellent' : 
                   metrics.overallScore >= 60 ? 'Good' : 
                   metrics.overallScore >= 40 ? 'Needs Work' : 'Critical Issues'
  pdf.text(scoreText, leftMargin + 55, yPosition + 20)

  yPosition += 40

  // Metrics Breakdown
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Detailed Metrics Breakdown', leftMargin, yPosition)
  
  yPosition += 15

  const metrics_data = [
    { name: 'Performance', score: metrics.performanceScore },
    { name: 'SEO', score: metrics.seoScore },
    { name: 'Accessibility', score: metrics.accessibilityScore },
    { name: 'Best Practices', score: metrics.bestPracticesScore },
    { name: 'AI Search Readiness', score: metrics.aiSearchReadiness },
    { name: 'Voice Search Optimization', score: metrics.voiceSearchOptimization },
    { name: 'Schema & Entity', score: metrics.schemaEntityScore },
    { name: 'E-E-A-T Score', score: metrics.eeAtScore }
  ]

  // Create metrics table
  const tableStartY = yPosition
  let currentY = tableStartY
  
  // Table headers
  pdf.setFillColor(245, 158, 11)
  pdf.rect(leftMargin, currentY, contentWidth, 8, 'F')
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Metric', leftMargin + 2, currentY + 5)
  pdf.text('Score', rightMargin - 20, currentY + 5)
  
  currentY += 10

  // Table rows
  metrics_data.forEach((metric, index) => {
    // Alternate row colors
    if (index % 2 === 0) {
      pdf.setFillColor(248, 250, 252)
      pdf.rect(leftMargin, currentY, contentWidth, 8, 'F')
    }
    
    pdf.setTextColor(30, 41, 59)
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text(metric.name, leftMargin + 2, currentY + 5)
    
    // Score with color
    const scoreColor = metric.score >= 80 ? [16, 185, 129] : 
                      metric.score >= 60 ? [245, 158, 11] : [239, 68, 68]
    pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${metric.score}/100`, rightMargin - 25, currentY + 5)
    
    currentY += 8
  })

  yPosition = currentY + 15

  // Add new page if needed
  if (yPosition > pageHeight - 50) {
    pdf.addPage()
    yPosition = 20
  }

  // Issues and Recommendations Section
  pdf.setTextColor(30, 41, 59)
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('Key Issues & Recommendations', leftMargin, yPosition)
  
  yPosition += 15

  // Group issues by severity
  const criticalIssues = metrics.issues.filter(issue => issue.type === 'critical').slice(0, 3)
  const warningIssues = metrics.issues.filter(issue => issue.type === 'warning').slice(0, 3)

  // Critical Issues
  if (criticalIssues.length > 0) {
    pdf.setFillColor(254, 242, 242) // Light red background
    pdf.rect(leftMargin, yPosition - 3, contentWidth, 8, 'F')
    pdf.setTextColor(239, 68, 68)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('🔴 Critical Issues (Fix Immediately)', leftMargin + 2, yPosition + 3)
    
    yPosition += 15
    
    criticalIssues.forEach(issue => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 20
      }
      
      pdf.setTextColor(30, 41, 59)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`• ${issue.title}`, leftMargin + 5, yPosition)
      
      yPosition += 6
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      const recommendationLines = pdf.splitTextToSize(issue.recommendation, contentWidth - 10)
      pdf.text(recommendationLines, leftMargin + 8, yPosition)
      
      yPosition += recommendationLines.length * 4 + 5
    })
  }

  // Warning Issues
  if (warningIssues.length > 0) {
    yPosition += 5
    
    if (yPosition > pageHeight - 50) {
      pdf.addPage()
      yPosition = 20
    }
    
    pdf.setFillColor(255, 251, 235) // Light yellow background
    pdf.rect(leftMargin, yPosition - 3, contentWidth, 8, 'F')
    pdf.setTextColor(245, 158, 11)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('🟡 Recommendations for Improvement', leftMargin + 2, yPosition + 3)
    
    yPosition += 15
    
    warningIssues.forEach(issue => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 20
      }
      
      pdf.setTextColor(30, 41, 59)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.text(`• ${issue.title}`, leftMargin + 5, yPosition)
      
      yPosition += 6
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      const recommendationLines = pdf.splitTextToSize(issue.recommendation, contentWidth - 10)
      pdf.text(recommendationLines, leftMargin + 8, yPosition)
      
      yPosition += recommendationLines.length * 4 + 5
    })
  }

  // Footer
  const footerY = pageHeight - 25
  pdf.setFillColor(30, 41, 59)
  pdf.rect(0, footerY, pageWidth, 25, 'F')
  
  pdf.setTextColor(245, 158, 11)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('8 Mile Sniper - AI-Driven Local Growth', leftMargin, footerY + 10)
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)
  pdf.text('Professional SEO & AI Optimization Services', leftMargin, footerY + 18)
  
  pdf.setTextColor(245, 158, 11)
  pdf.text('joseph@8milesniper.com', rightMargin - 50, footerY + 10)

  // Save the PDF
  const companyName = userData.company || 'Unknown'
  const filename = `SEO-Audit-Report-${companyName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
  pdf.save(filename)
}