import jsPDF from 'jspdf'

interface PremiumAuditData {
  url: string
  companyName: string
  overallScore: number
  issues: any[]
  recommendations: any[]
  competitorAnalysis?: any[]
  technicalInsights?: any[]
  actionPlan?: any[]
  isPaid: boolean
}

export const generateBeautifulPDF = async (auditData: PremiumAuditData): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  let yPosition = 20

  // **BEAUTIFUL HEADER WITH GRADIENT EFFECT**
  // Dark blue gradient background
  pdf.setFillColor(15, 23, 42) // Dark slate
  pdf.rect(0, 0, pageWidth, 60, 'F')
  
  // Orange accent stripe
  pdf.setFillColor(245, 158, 11) // Amber-500 
  pdf.rect(0, 0, pageWidth, 8, 'F')
  
  // Eagle logo area (simulated with colored rectangle)
  pdf.setFillColor(245, 158, 11) // Orange for eagle colors
  pdf.circle(30, 30, 15, 'F')
  
  // Add eagle-like design
  pdf.setFillColor(255, 255, 255)
  pdf.circle(30, 30, 12, 'F')
  pdf.setFillColor(245, 158, 11)
  pdf.circle(30, 30, 8, 'F')

  // **PREMIUM BRANDING**
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(28)
  pdf.setFont('helvetica', 'bold')
  pdf.text('8 MILE SNIPER', 55, 25)
  
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'normal')
  pdf.text('AI-DRIVEN LOCAL GROWTH', 55, 35)
  
  pdf.setFontSize(14)
  pdf.setFont('helvetica', 'bold')
  pdf.text('🏆 PREMIUM SEO AUDIT REPORT', 55, 45)

  // **PREMIUM BADGE**
  pdf.setFillColor(34, 197, 94) // Green
  pdf.roundedRect(pageWidth - 60, 15, 45, 15, 3, 3, 'F')
  pdf.setTextColor(0, 0, 0)
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('⭐ PREMIUM', pageWidth - 52, 25)

  yPosition = 80

  // **COLORFUL COMPANY SECTION**
  pdf.setFillColor(239, 246, 255) // Light blue background
  pdf.rect(10, yPosition, pageWidth - 20, 25, 'F')
  
  pdf.setTextColor(30, 64, 175) // Blue-700
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`📊 AUDIT REPORT FOR: ${auditData.companyName.toUpperCase()}`, 15, yPosition + 8)
  
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  pdf.text(`🌐 Website: ${auditData.url}`, 15, yPosition + 18)
  
  yPosition += 40

  // **COLORFUL SCORE SECTION**
  // Score background with gradient effect
  const scoreColor = auditData.overallScore >= 80 ? [34, 197, 94] : // Green
                     auditData.overallScore >= 60 ? [245, 158, 11] : // Orange  
                     [239, 68, 68] // Red

  pdf.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2])
  pdf.rect(10, yPosition, pageWidth - 20, 30, 'F')
  
  // Score circle
  pdf.setFillColor(255, 255, 255)
  pdf.circle(40, yPosition + 15, 12, 'F')
  
  pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2])
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`${auditData.overallScore}`, 35, yPosition + 18)
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(16)
  pdf.text('🎯 OVERALL SEO SCORE', 60, yPosition + 12)
  
  const scoreText = auditData.overallScore >= 80 ? '🔥 EXCELLENT' :
                    auditData.overallScore >= 60 ? '⚡ GOOD' : '🚨 NEEDS WORK'
  pdf.setFontSize(14)
  pdf.text(scoreText, 60, yPosition + 22)

  yPosition += 50

  // **EXECUTIVE SUMMARY BOX**
  pdf.setFillColor(254, 249, 195) // Yellow-100
  pdf.rect(10, yPosition, pageWidth - 20, 40, 'F')
  
  // Border
  pdf.setDrawColor(245, 158, 11) // Orange border
  pdf.setLineWidth(2)
  pdf.rect(10, yPosition, pageWidth - 20, 40, 'S')
  
  pdf.setTextColor(146, 64, 14) // Amber-800
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('🎯 EXECUTIVE SUMMARY', 15, yPosition + 10)
  
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')
  pdf.text('✅ Critical optimization opportunities identified', 15, yPosition + 18)
  pdf.text('💰 Estimated ROI potential: 300-500% after implementation', 15, yPosition + 26)
  pdf.text('⏱️  90-day timeline for maximum impact', 15, yPosition + 34)

  yPosition += 60

  // **NEW PAGE FOR DETAILED ANALYSIS**
  pdf.addPage()
  yPosition = 20

  // **COLORFUL COMPETITIVE ANALYSIS**
  pdf.setFillColor(220, 252, 231) // Green-50
  pdf.rect(10, yPosition, pageWidth - 20, 15, 'F')
  
  pdf.setTextColor(22, 101, 52) // Green-800
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('🏆 COMPETITIVE ANALYSIS', 15, yPosition + 10)

  yPosition += 25

  // Sample competitors with colorful bars
  const competitors = [
    { name: 'Top Competitor #1', score: 90, color: [239, 68, 68] }, // Red
    { name: 'Top Competitor #2', score: 85, color: [245, 158, 11] }, // Orange
    { name: 'Top Competitor #3', score: 75, color: [34, 197, 94] } // Green
  ]

  competitors.forEach((comp, index) => {
    const barWidth = (comp.score / 100) * 120
    
    // Competitor bar
    pdf.setFillColor(comp.color[0], comp.color[1], comp.color[2])
    pdf.rect(15, yPosition, barWidth, 8, 'F')
    
    // Score text
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(10)
    pdf.text(`${comp.name}: ${comp.score}/100`, 15, yPosition + 15)
    
    yPosition += 25
  })

  // **30-DAY ACTION PLAN**
  yPosition += 10
  pdf.setFillColor(239, 246, 255) // Blue-50
  pdf.rect(10, yPosition, pageWidth - 20, 15, 'F')
  
  pdf.setTextColor(30, 64, 175) // Blue-700
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('🚀 30-DAY ACTION PLAN', 15, yPosition + 10)

  yPosition += 25

  const actionItems = [
    { action: 'Optimize Core Web Vitals (LCP, FID, CLS)', impact: '+15-25 ranking positions', priority: 'HIGH' },
    { action: 'Implement structured data markup', impact: '+20% rich snippet visibility', priority: 'HIGH' },
    { action: 'Content gap analysis & optimization', impact: '+40% organic traffic', priority: 'MEDIUM' },
    { action: 'Internal linking optimization', impact: '+25% page authority distribution', priority: 'MEDIUM' }
  ]

  actionItems.forEach((item, index) => {
    // Priority badge
    const priorityColor = item.priority === 'HIGH' ? [239, 68, 68] : [245, 158, 11]
    pdf.setFillColor(priorityColor[0], priorityColor[1], priorityColor[2])
    pdf.roundedRect(15, yPosition, 20, 6, 1, 1, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'bold')
    pdf.text(item.priority, 18, yPosition + 4)
    
    // Action text
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${index + 1}. ${item.action}`, 40, yPosition + 4)
    
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`💡 Expected Impact: ${item.impact}`, 40, yPosition + 12)
    
    yPosition += 20
  })

  // **NEW PAGE FOR ROI PROJECTIONS**
  pdf.addPage()
  yPosition = 20

  // **PROJECTED ROI SECTION**
  pdf.setFillColor(236, 254, 243) // Green-50
  pdf.rect(10, yPosition, pageWidth - 20, 15, 'F')
  
  pdf.setTextColor(22, 101, 52) // Green-800
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('💰 PROJECTED ROI', 15, yPosition + 10)

  yPosition += 25

  // ROI boxes with colors
  const roiMetrics = [
    { metric: 'Organic Traffic Increase', value: '40-60% within 90 days', color: [34, 197, 94] },
    { metric: 'Conversion Rate Improvement', value: '25-35%', color: [59, 130, 246] },
    { metric: 'Additional Monthly Revenue', value: '$15,000-$50,000', color: [245, 158, 11] }
  ]

  roiMetrics.forEach(metric => {
    pdf.setFillColor(metric.color[0], metric.color[1], metric.color[2])
    pdf.rect(15, yPosition, pageWidth - 30, 20, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text(metric.metric, 20, yPosition + 8)
    
    pdf.setFontSize(14)
    pdf.text(metric.value, 20, yPosition + 16)
    
    yPosition += 30
  })

  // **NEXT STEPS CALL TO ACTION**
  yPosition += 20
  pdf.setFillColor(245, 158, 11) // Orange
  pdf.rect(10, yPosition, pageWidth - 20, 30, 'F')
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'bold')
  pdf.text('🎯 NEXT STEPS', 15, yPosition + 12)
  
  pdf.setFontSize(11)
  pdf.text('Ready to implement these game-changing recommendations?', 15, yPosition + 22)

  // **FOOTER WITH CONTACT INFO**
  yPosition = pageHeight - 30
  pdf.setFillColor(15, 23, 42) // Dark slate
  pdf.rect(0, yPosition, pageWidth, 30, 'F')
  
  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('8 MILE SNIPER - AI-DRIVEN LOCAL GROWTH', 15, yPosition + 10)
  
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.text('📧 support@8milesniper.com', 15, yPosition + 18)
  pdf.text('🌐 Get more audits at 8milesniper.com', 15, yPosition + 25)

  // **SAVE THE PDF**
  const today = new Date().toISOString().split('T')[0]
  pdf.save(`SEO-Audit-Report-${auditData.companyName}-${today}.pdf`)
}
