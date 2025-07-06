interface LeadData {
  fullName: string
  email: string
  phone: string
  company: string
  websiteAnalyzed: string
}

// Multiple scalable webhook endpoints for automatic lead notifications
const WEBHOOK_ENDPOINTS = {
  // Primary: Make.com webhook (most reliable for business automation)
  make: 'https://hook.us1.make.com/[YOUR_WEBHOOK_ID]',
  
  // Secondary: Zapier webhook (popular automation platform)
  zapier: 'https://hooks.zapier.com/hooks/catch/[YOUR_WEBHOOK_ID]',
  
  // Tertiary: Go High Level webhook (since you use GHL)
  ghl: 'https://services.leadconnectorhq.com/hooks/[YOUR_WEBHOOK_ID]',
  
  // Backup: Formspree (simple email forwarding)
  formspree: 'https://formspree.io/f/[YOUR_FORM_ID]',
  
  // Last resort: EmailJS (requires user setup)
  emailjs: 'SERVICE_NEEDS_USER_SETUP'
}

export const sendScalableLeadNotification = async (leadData: LeadData): Promise<boolean> => {
  console.log('🎯 SCALABLE LEAD CAPTURE INITIATED')
  console.log('📊 Lead Data:', leadData)

  // Prepare formatted lead data for webhooks
  const formattedData = {
    timestamp: new Date().toISOString(),
    source: '8 Mile Sniper SEO Audit Tool',
    lead: {
      name: leadData.fullName,
      email: leadData.email,
      phone: leadData.phone,
      company: leadData.company,
      website: leadData.websiteAnalyzed,
      captured_at: new Date().toLocaleString()
    },
    notification: {
      subject: `🎯 NEW SEO AUDIT LEAD - ${leadData.company}`,
      priority: 'HIGH',
      action_required: 'Contact within 24 hours',
      sales_tip: `Hi ${leadData.fullName}, I reviewed your SEO audit for ${leadData.websiteAnalyzed} and found critical issues costing you traffic. Quick 15-min call to discuss fixes?`
    },
    platform_info: {
      audit_url: window.location.href,
      admin_panel: window.location.origin + '/admin',
      lead_id: `LEAD_${Date.now()}`
    }
  }

  // Store locally as backup
  const allLeads = JSON.parse(localStorage.getItem('scalableLeads') || '[]')
  allLeads.push(formattedData)
  localStorage.setItem('scalableLeads', JSON.stringify(allLeads))

  // Try multiple webhook endpoints for reliability
  const webhookResults = await Promise.allSettled([
    sendToMakeWebhook(formattedData),
    sendToZapierWebhook(formattedData),
    sendToGHLWebhook(formattedData),
    sendToFormspreeWebhook(formattedData)
  ])

  // Log results
  webhookResults.forEach((result, index) => {
    const services = ['Make.com', 'Zapier', 'Go High Level', 'Formspree']
    if (result.status === 'fulfilled') {
      console.log(`✅ ${services[index]} webhook successful`)
    } else {
      console.log(`❌ ${services[index]} webhook failed:`, result.reason)
    }
  })

  // Success if at least one webhook worked
  const successCount = webhookResults.filter(r => r.status === 'fulfilled').length
  
  if (successCount > 0) {
    showSuccessNotification(`Lead captured! ${successCount} notification service(s) activated.`)
    return true
  } else {
    showSetupNotification()
    return false
  }
}

// Make.com webhook (recommended for business automation)
async function sendToMakeWebhook(data: any): Promise<boolean> {
  const makeWebhook = 'https://hook.us1.make.com/YOUR_WEBHOOK_HERE'
  
  if (makeWebhook.includes('YOUR_WEBHOOK_HERE')) {
    throw new Error('Make.com webhook not configured')
  }

  const response = await fetch(makeWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!response.ok) throw new Error(`Make.com webhook failed: ${response.status}`)
  return true
}

// Zapier webhook
async function sendToZapierWebhook(data: any): Promise<boolean> {
  const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_HERE'
  
  if (zapierWebhook.includes('YOUR_WEBHOOK_HERE')) {
    throw new Error('Zapier webhook not configured')
  }

  const response = await fetch(zapierWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!response.ok) throw new Error(`Zapier webhook failed: ${response.status}`)
  return true
}

// Go High Level webhook
async function sendToGHLWebhook(data: any): Promise<boolean> {
  const ghlWebhook = 'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_HERE'
  
  if (ghlWebhook.includes('YOUR_WEBHOOK_HERE')) {
    throw new Error('GHL webhook not configured')
  }

  const response = await fetch(ghlWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!response.ok) throw new Error(`GHL webhook failed: ${response.status}`)
  return true
}

// Formspree webhook (email forwarding)
async function sendToFormspreeWebhook(data: any): Promise<boolean> {
  const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'
  
  if (formspreeEndpoint.includes('YOUR_FORM_ID')) {
    throw new Error('Formspree not configured')
  }

  const formData = new FormData()
  formData.append('name', data.lead.name)
  formData.append('email', data.lead.email)
  formData.append('phone', data.lead.phone)
  formData.append('company', data.lead.company)
  formData.append('website', data.lead.website)
  formData.append('message', JSON.stringify(data, null, 2))

  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    body: formData
  })

  if (!response.ok) throw new Error(`Formspree failed: ${response.status}`)
  return true
}

function showSuccessNotification(message: string): void {
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10B981;
    color: white;
    padding: 15px;
    border-radius: 8px;
    z-index: 10000;
    max-width: 300px;
    font-family: system-ui;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `
  notification.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px;">✅ ${message}</div>
    <div style="font-size: 12px;">Automatic email notifications sent to joseph@8milesniper.com</div>
  `
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 5000)
}

function showSetupNotification(): void {
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #F59E0B;
    color: white;
    padding: 15px;
    border-radius: 8px;
    z-index: 10000;
    max-width: 320px;
    font-family: system-ui;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `
  notification.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px;">⚠️ Setup Required</div>
    <div style="font-size: 12px; margin-bottom: 8px;">Lead captured but webhook setup needed for auto-notifications</div>
    <div style="font-size: 11px;">Check console for setup instructions</div>
  `
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 7000)
  
  // Log setup instructions
  console.log(`
🔧 SCALABLE EMAIL SETUP INSTRUCTIONS:

Choose ONE of these automation platforms:

1️⃣ MAKE.COM (Recommended for business):
   - Go to: https://make.com
   - Create webhook → Copy URL
   - Set up email notification scenario
   - Replace 'YOUR_WEBHOOK_HERE' in code

2️⃣ ZAPIER (Popular choice):
   - Go to: https://zapier.com
   - Create Zap → Webhooks → Copy URL
   - Connect to Gmail/email service
   - Replace 'YOUR_WEBHOOK_HERE' in code

3️⃣ GO HIGH LEVEL (Since you use GHL):
   - In GHL → Automations → Webhooks
   - Create webhook trigger → Copy URL
   - Set up email/SMS notification
   - Replace 'YOUR_WEBHOOK_HERE' in code

4️⃣ FORMSPREE (Simplest):
   - Go to: https://formspree.io
   - Create form → Copy form ID
   - Replace 'YOUR_FORM_ID' in code
   - Auto-forwards to your email

🎯 BENEFIT: Once set up, 100% automatic notifications!
  `)
}

// Export function to view all captured leads
export const getAllScalableLeads = (): any[] => {
  return JSON.parse(localStorage.getItem('scalableLeads') || '[]')
}

// Export function for webhook testing
export const testWebhooks = async (): Promise<void> => {
  const testData = {
    timestamp: new Date().toISOString(),
    source: 'TEST - 8 Mile Sniper SEO Audit Tool',
    lead: {
      name: 'Test Lead',
      email: 'test@example.com',
      phone: '555-0123',
      company: 'Test Company',
      website: 'https://test-website.com',
      captured_at: new Date().toLocaleString()
    },
    notification: {
      subject: '🧪 TEST - Webhook Connection',
      priority: 'TEST',
      action_required: 'Verify webhook is working',
      message: 'This is a test to verify your webhook automation is working correctly.'
    }
  }

  console.log('🧪 TESTING WEBHOOK CONNECTIONS...')
  await sendScalableLeadNotification({
    fullName: testData.lead.name,
    email: testData.lead.email,
    phone: testData.lead.phone,
    company: testData.lead.company,
    websiteAnalyzed: testData.lead.website
  })
}