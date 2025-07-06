import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { SEOMetrics, UserData } from '@/contexts/AuditContext'

export const generateScreenshotPDF = async (url: string, metrics: SEOMetrics, userData: UserData) => {
  try {
    // Find the main audit results container
    const auditContainer = document.querySelector('[data-audit-results]') as HTMLElement
    
    if (!auditContainer) {
      throw new Error('Audit results container not found')
    }

    // Create a temporary container for PDF rendering
    const tempContainer = document.createElement('div')
    tempContainer.style.position = 'absolute'
    tempContainer.style.top = '-9999px'
    tempContainer.style.left = '-9999px'
    tempContainer.style.width = '1200px'
    tempContainer.style.backgroundColor = '#fff'
    tempContainer.style.padding = '40px'
    tempContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif'
    
    // Clone the audit results
    const clonedResults = auditContainer.cloneNode(true) as HTMLElement
    
    // Create PDF header with branding
    const headerHtml = `
      <div style="background: #1e293b; color: white; padding: 30px; margin: -40px -40px 40px -40px; border-radius: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <img src="/8-mile-sniper-logo.png" alt="8 Mile Sniper" style="width: 60px; height: 60px;" />
            <div>
              <h1 style="margin: 0; font-size: 24px; color: #f59e0b; font-weight: bold;">8 MILE SNIPER</h1>
              <p style="margin: 0; font-size: 14px; color: #cbd5e1;">AI-DRIVEN LOCAL GROWTH</p>
            </div>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 20px; color: white; font-weight: bold;">SEO & AI AUDIT REPORT</h2>
            <p style="margin: 0; font-size: 12px; color: #f59e0b;">2025 AI Search Optimization Analysis</p>
          </div>
        </div>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #475569;">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p style="margin: 0; font-size: 14px;"><strong>Website:</strong> ${url}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Client:</strong> ${userData.name || 'N/A'}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0; font-size: 14px;"><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Company:</strong> ${userData.company || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    `
    
    // Add header
    tempContainer.innerHTML = headerHtml
    
    // Style the cloned results to match online version exactly
    clonedResults.style.width = '100%'
    clonedResults.style.margin = '0'
    clonedResults.style.padding = '0'
    
    // Remove any dropdowns/interactive elements and replace with static content
    const dropdowns = clonedResults.querySelectorAll('[data-dropdown], .dropdown, [role="button"]')
    dropdowns.forEach(dropdown => {
      dropdown.removeAttribute('data-dropdown')
      ;(dropdown as HTMLElement).style.cursor = 'default'
      // If it's a collapsible section, expand it
      const content = dropdown.querySelector('.dropdown-content, .collapse-content')
      if (content) {
        (content as HTMLElement).style.display = 'block'
        ;(content as HTMLElement).style.height = 'auto'
      }
    })
    
    // Expand all collapsible sections for PDF
    const collapsibles = clonedResults.querySelectorAll('.collapse, [data-collapse]')
    collapsibles.forEach(item => {
      const content = item.querySelector('.collapse-content')
      if (content) {
        (content as HTMLElement).style.display = 'block'
        ;(content as HTMLElement).style.height = 'auto'
        ;(content as HTMLElement).style.overflow = 'visible'
      }
    })
    
    // Add the cloned results
    tempContainer.appendChild(clonedResults)
    
    // Add footer
    const footerHtml = `
      <div style="background: #1e293b; color: white; padding: 20px; margin: 40px -40px -40px -40px; text-align: center; border-radius: 0;">
        <h3 style="margin: 0; color: #f59e0b; font-size: 16px; font-weight: bold;">8 MILE SNIPER - AI-DRIVEN LOCAL GROWTH</h3>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #cbd5e1;">The Future of SEO is AI-Powered. Get Ahead of Your Competition.</p>
      </div>
    `
    
    const footerDiv = document.createElement('div')
    footerDiv.innerHTML = footerHtml
    tempContainer.appendChild(footerDiv)
    
    // Add to document temporarily
    document.body.appendChild(tempContainer)
    
    // Wait for images to load
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate screenshot
    const canvas = await html2canvas(tempContainer, {
      width: 1200,
      height: tempContainer.scrollHeight,
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    })
    
    // Remove temporary container
    document.body.removeChild(tempContainer)
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const imgData = canvas.toDataURL('image/png')
    
    // Calculate dimensions to fit A4
    const pageWidth = 210
    const pageHeight = 297
    const margin = 10
    const availableWidth = pageWidth - (margin * 2)
    const availableHeight = pageHeight - (margin * 2)
    
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = imgHeight / imgWidth
    
    let pdfWidth = availableWidth
    let pdfHeight = pdfWidth * ratio
    
    // If height exceeds page, scale down
    if (pdfHeight > availableHeight) {
      pdfHeight = availableHeight
      pdfWidth = pdfHeight / ratio
    }
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight)
    
    // If content is longer than one page, add additional pages
    if (pdfHeight > availableHeight) {
      const totalPages = Math.ceil(pdfHeight / availableHeight)
      
      for (let i = 1; i < totalPages; i++) {
        pdf.addPage()
        const yOffset = -i * availableHeight
        pdf.addImage(imgData, 'PNG', margin, margin + yOffset, pdfWidth, pdfHeight)
      }
    }
    
    // Generate filename
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `SEO-AI-Audit-Report-${timestamp}.pdf`
    
    // Save PDF
    pdf.save(filename)
    
    return true
    
  } catch (error) {
    console.error('Error generating screenshot PDF:', error)
    throw error
  }
}

export default generateScreenshotPDF
