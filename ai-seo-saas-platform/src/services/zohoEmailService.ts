interface LeadData {
  fullName: string
  email: string
  phone: string
  company: string
  websiteAnalyzed: string
}

export const sendZohoLeadNotification = async (leadData: LeadData): Promise<boolean> => {
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

Platform: https://bvxtndxvd9.space.minimax.io
Admin: https://bvxtndxvd9.space.minimax.io/admin

This is a HOT lead - strike while the iron is hot! 🔥`

  // Zoho-specific email services
  const zohoEmailServices = [
    // Primary: EmailJS with Zoho configuration
    {
      name: 'EmailJS-Zoho',
      url: 'https://api.emailjs.com/api/v1.0/email/send',
      data: {
        service_id: 'zoho_service',
        template_id: 'lead_notification',
        user_id: 'user_zoho_key',
        template_params: {
          to_email: 'joseph@8milesniper.com',
          from_name: '8 Mile Sniper Lead System',
          subject: '🎯 NEW SEO AUDIT LEAD - Action Required!',
          message: emailBody,
          lead_name: leadData.fullName,
          lead_email: leadData.email,
          lead_phone: leadData.phone,
          lead_company: leadData.company,
          website_analyzed: leadData.websiteAnalyzed
        }
      }
    },
    // Backup: Direct Zoho API submission
    {
      name: 'Zoho-Forms-API',
      url: 'https://creator.zoho.com/api/v2/joseph8milesniper/seo-leads/form/Lead_Notification/record',
      data: {
        data: {
          Name: leadData.fullName,
          Email: leadData.email,
          Phone: leadData.phone,
          Company: leadData.company,
          Website: leadData.websiteAnalyzed,
          Message: emailBody,
          Timestamp: new Date().toISOString()
        }
      }
    },
    // Fallback: Zoho Mail API
    {
      name: 'Zoho-Mail-API',
      url: 'https://mail.zoho.com/api/accounts/{accountId}/messages',
      data: {
        fromAddress: 'noreply@8milesniper.com',
        toAddress: 'joseph@8milesniper.com',
        subject: '🎯 NEW SEO AUDIT LEAD - Action Required!',
        content: emailBody,
        mailFormat: 'plaintext'
      }
    }
  ]

  let emailSent = false

  for (const service of zohoEmailServices) {
    try {
      console.log(`Attempting ${service.name}...`)
      
      const response = await fetch(service.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add Zoho-specific headers
          'Authorization': 'Zoho-oauthtoken {token}' // Will need to be configured
        },
        body: JSON.stringify(service.data)
      })

      if (response.ok) {
        console.log(`✅ Email sent successfully via ${service.name}`)
        emailSent = true
        break
      } else {
        console.warn(`❌ ${service.name} failed - Status: ${response.status}`)
      }
    } catch (error) {
      console.warn(`❌ ${service.name} error:`, error)
    }
  }

  // If Zoho services fail, create direct Zoho mailto link
  if (!emailSent) {
    const zohoMailtoLink = `https://mail.zoho.com/zm/#compose/to=${encodeURIComponent('joseph@8milesniper.com')}&subject=${encodeURIComponent('🎯 NEW SEO AUDIT LEAD - Action Required!')}&body=${encodeURIComponent(emailBody)}`
    
    console.log('🔗 Zoho direct compose link created:', zohoMailtoLink)
    
    // Store lead for manual Zoho follow-up
    const zohoLeads = JSON.parse(localStorage.getItem('zohoLeads') || '[]')
    zohoLeads.push({
      timestamp: new Date().toISOString(),
      leadData,
      emailBody,
      zohoMailtoLink
    })
    localStorage.setItem('zohoLeads', JSON.stringify(zohoLeads))
    
    // Also try to open Zoho compose (if popup allowed)
    try {
      window.open(zohoMailtoLink, '_blank')
      emailSent = true
    } catch (error) {
      console.log('Popup blocked - using storage method')
    }
  }

  return emailSent
}

// Function to get Zoho leads for manual processing
export const getZohoLeads = (): any[] => {
  return JSON.parse(localStorage.getItem('zohoLeads') || '[]')
}

// Function to clear processed Zoho leads
export const clearZohoLeads = (): void => {
  localStorage.removeItem('zohoLeads')
}

// Function to generate Zoho CRM integration
export const createZohoCRMEntry = async (leadData: LeadData): Promise<boolean> => {
  try {
    // Zoho CRM API endpoint
    const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Zoho-oauthtoken {access_token}' // Needs configuration
      },
      body: JSON.stringify({
        data: [
          {
            Last_Name: leadData.fullName.split(' ').pop(),
            First_Name: leadData.fullName.split(' ')[0],
            Email: leadData.email,
            Phone: leadData.phone,
            Company: leadData.company,
            Website: leadData.websiteAnalyzed,
            Lead_Source: '8 Mile Sniper SEO Audit',
            Description: `SEO audit lead captured from ${leadData.websiteAnalyzed}`,
            Lead_Status: 'Not Contacted'
          }
        ]
      })
    })

    return response.ok
  } catch (error) {
    console.error('Zoho CRM integration failed:', error)
    return false
  }
}