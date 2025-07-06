interface LeadData {
  fullName: string
  email: string
  phone: string
  company: string
  websiteAnalyzed: string
}

export const sendLeadNotification = async (leadData: LeadData): Promise<boolean> => {
  const emailBody = `🚨 NEW LEAD ALERT for 8 Mile Sniper!

📊 LEAD DETAILS:
Name: ${leadData.fullName}
Email: ${leadData.email}
Phone: ${leadData.phone}
Company: ${leadData.company}
Website Analyzed: ${leadData.websiteAnalyzed}
Captured: ${new Date().toLocaleString()}

🎯 NEXT STEPS:
1. Call/Email within 24 hours for best conversion
2. Reference their SEO audit results in your pitch
3. Offer to fix their specific issues found in the audit

💡 SALES TIP:
"Hi ${leadData.fullName}, I just reviewed your SEO audit for ${leadData.websiteAnalyzed} and found some critical issues that are costing you traffic. I can fix these quickly - when's a good time for a 15-minute call?"

Platform: https://0ohsog4m0l.space.minimax.io
Admin: https://0ohsog4m0l.space.minimax.io/admin

This is a HOT lead - strike while the iron is hot! 🔥`

  // Multiple email services for maximum reliability
  const emailServices = [
    // Service 1: Formspree (backup)
    {
      url: 'https://formspree.io/f/mjkvqnno',
      data: {
        _replyto: leadData.email,
        _subject: '🎯 NEW SEO AUDIT LEAD - Action Required!',
        _to: 'joseph@8milesniper.com',
        message: emailBody,
        leadName: leadData.fullName,
        leadEmail: leadData.email,
        leadPhone: leadData.phone,
        leadCompany: leadData.company,
        websiteAnalyzed: leadData.websiteAnalyzed
      }
    },
    // Service 2: Web3Forms (more reliable)
    {
      url: 'https://api.web3forms.com/submit',
      data: {
        access_key: 'c9b38d65-4dc6-4de3-9c80-f7d1c5f6e4b2', // Public key for testing
        subject: '🎯 NEW SEO AUDIT LEAD - Action Required!',
        email: 'joseph@8milesniper.com',
        message: emailBody,
        from_name: '8 Mile Sniper Lead System',
        lead_name: leadData.fullName,
        lead_email: leadData.email,
        lead_phone: leadData.phone,
        lead_company: leadData.company,
        website_analyzed: leadData.websiteAnalyzed
      }
    },
    // Service 3: Direct mailto (fallback for manual)
    {
      url: 'data:manual',
      data: {
        to: 'joseph@8milesniper.com',
        subject: '🎯 NEW SEO AUDIT LEAD - Action Required!',
        body: emailBody
      }
    }
  ]

  let emailSent = false

  for (const service of emailServices) {
    try {
      if (service.url === 'data:manual') {
        // Create mailto link as fallback
        const mailtoLink = `mailto:${service.data.to}?subject=${encodeURIComponent(service.data.subject)}&body=${encodeURIComponent(service.data.body)}`
        console.log('Manual email fallback created:', mailtoLink)
        // Don't actually open mailto to avoid popup blocker issues
        continue
      }

      const response = await fetch(service.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(service.data)
      })

      if (response.ok) {
        console.log(`✅ Email sent successfully via ${service.url}`)
        emailSent = true
        break // Exit on first successful send
      } else {
        console.warn(`❌ Email service failed: ${service.url} - Status: ${response.status}`)
      }
    } catch (error) {
      console.warn(`❌ Email service error: ${service.url}`, error)
    }
  }

  // If all services fail, log the data for manual follow-up
  if (!emailSent) {
    console.error('🚨 ALL EMAIL SERVICES FAILED - MANUAL FOLLOW-UP REQUIRED')
    console.error('Lead Data:', leadData)
    console.error('Email Body:', emailBody)
    
    // Store in localStorage for retrieval
    const failedLeads = JSON.parse(localStorage.getItem('failedEmailLeads') || '[]')
    failedLeads.push({
      timestamp: new Date().toISOString(),
      leadData,
      emailBody
    })
    localStorage.setItem('failedEmailLeads', JSON.stringify(failedLeads))
  }

  return emailSent
}

// Function to retrieve failed leads from localStorage
export const getFailedLeads = (): any[] => {
  return JSON.parse(localStorage.getItem('failedEmailLeads') || '[]')
}

// Function to clear failed leads
export const clearFailedLeads = (): void => {
  localStorage.removeItem('failedEmailLeads')
}