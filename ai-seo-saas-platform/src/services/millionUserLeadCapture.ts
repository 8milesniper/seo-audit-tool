interface UserData {
  fullName: string
  email: string
  phone: string
  company: string
  websiteAnalyzed: string
  auditScore?: number
  timestamp: string
  ipAddress?: string
  userAgent?: string
  leadId: string
}

interface StoredLeads {
  totalLeads: number
  leads: UserData[]
  lastUpdated: string
}

// Million-user scalable lead capture system
export class MillionUserLeadCapture {
  private static instance: MillionUserLeadCapture
  private leadStorage: StoredLeads

  constructor() {
    this.loadLeads()
  }

  static getInstance(): MillionUserLeadCapture {
    if (!MillionUserLeadCapture.instance) {
      MillionUserLeadCapture.instance = new MillionUserLeadCapture()
    }
    return MillionUserLeadCapture.instance
  }

  // Capture user data when they request their PDF
  async captureUser(userData: Omit<UserData, 'timestamp' | 'leadId'>): Promise<string> {
    const leadId = `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const fullUserData: UserData = {
      ...userData,
      timestamp: new Date().toISOString(),
      leadId,
      ipAddress: await this.getUserIP(),
      userAgent: navigator.userAgent
    }

    // Store in multiple places for reliability
    this.storeInLocalStorage(fullUserData)
    this.storeInSessionStorage(fullUserData)
    await this.storeInCloudStorage(fullUserData)

    // Log for business owner
    this.logNewLead(fullUserData)
    
    return leadId
  }

  // Store lead in browser localStorage (persistent)
  private storeInLocalStorage(userData: UserData): void {
    try {
      const existingData = localStorage.getItem('millionUserLeads')
      const leads: StoredLeads = existingData ? JSON.parse(existingData) : {
        totalLeads: 0,
        leads: [],
        lastUpdated: ''
      }

      leads.leads.push(userData)
      leads.totalLeads = leads.leads.length
      leads.lastUpdated = new Date().toISOString()

      localStorage.setItem('millionUserLeads', JSON.stringify(leads))
    } catch (error) {
      console.error('Failed to store in localStorage:', error)
    }
  }

  // Store in sessionStorage as backup
  private storeInSessionStorage(userData: UserData): void {
    try {
      const sessionLeads = sessionStorage.getItem('currentSessionLeads') || '[]'
      const leads = JSON.parse(sessionLeads)
      leads.push(userData)
      sessionStorage.setItem('currentSessionLeads', JSON.stringify(leads))
    } catch (error) {
      console.error('Failed to store in sessionStorage:', error)
    }
  }

  // Store in cloud (multiple options for reliability)
  private async storeInCloudStorage(userData: UserData): Promise<void> {
    // Try multiple cloud storage options
    const storagePromises = [
      this.storeInGoogleSheets(userData),
      this.storeInAirtable(userData),
      this.storeInWebhook(userData)
    ]

    // Fire and forget - don't wait for all to complete
    Promise.allSettled(storagePromises).then(results => {
      const successful = results.filter(r => r.status === 'fulfilled').length
      console.log(`📊 Lead stored in ${successful}/3 cloud services`)
    })
  }

  // Google Sheets integration (popular business choice)
  private async storeInGoogleSheets(userData: UserData): Promise<void> {
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
    
    if (GOOGLE_SHEETS_URL.includes('YOUR_SCRIPT_ID')) {
      throw new Error('Google Sheets not configured')
    }

    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
  }

  // Airtable integration (powerful database)
  private async storeInAirtable(userData: UserData): Promise<void> {
    const AIRTABLE_URL = 'https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE_NAME'
    const AIRTABLE_API_KEY = 'YOUR_API_KEY'
    
    if (AIRTABLE_URL.includes('YOUR_BASE_ID')) {
      throw new Error('Airtable not configured')
    }

    await fetch(AIRTABLE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            'Name': userData.fullName,
            'Email': userData.email,
            'Phone': userData.phone,
            'Company': userData.company,
            'Website': userData.websiteAnalyzed,
            'Score': userData.auditScore,
            'Captured': userData.timestamp,
            'Lead ID': userData.leadId
          }
        }]
      })
    })
  }

  // Generic webhook storage
  private async storeInWebhook(userData: UserData): Promise<void> {
    const WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID'
    
    if (WEBHOOK_URL.includes('YOUR_WEBHOOK_ID')) {
      throw new Error('Webhook not configured')
    }

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'new_seo_audit_lead',
        data: userData,
        source: '8 Mile Sniper SEO Tool'
      })
    })
  }

  // Get user's IP address for analytics
  private async getUserIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch {
      return 'unknown'
    }
  }

  // Log new lead for business owner
  private logNewLead(userData: UserData): void {
    console.log(`
🎯 NEW LEAD CAPTURED! 
═══════════════════════════════════════════════════════════════

👤 CONTACT DETAILS:
   Name: ${userData.fullName}
   Email: ${userData.email}
   Phone: ${userData.phone}
   Company: ${userData.company}

🌐 WEBSITE ANALYZED: ${userData.websiteAnalyzed}
📊 SEO SCORE: ${userData.auditScore}/100
📅 CAPTURED: ${new Date(userData.timestamp).toLocaleString()}
🆔 LEAD ID: ${userData.leadId}

💡 SALES OPPORTUNITY:
   "Hi ${userData.fullName}, I reviewed your SEO audit for ${userData.websiteAnalyzed} 
   and found some critical issues that are costing you traffic. 
   When's a good time for a 15-minute call to discuss quick fixes?"

═══════════════════════════════════════════════════════════════
    `)
  }

  // Load existing leads from storage
  private loadLeads(): void {
    try {
      const stored = localStorage.getItem('millionUserLeads')
      this.leadStorage = stored ? JSON.parse(stored) : {
        totalLeads: 0,
        leads: [],
        lastUpdated: ''
      }
    } catch {
      this.leadStorage = { totalLeads: 0, leads: [], lastUpdated: '' }
    }
  }

  // Get all captured leads (for business owner)
  getAllLeads(): StoredLeads {
    this.loadLeads()
    return this.leadStorage
  }

  // Get leads by date range
  getLeadsByDateRange(startDate: string, endDate: string): UserData[] {
    return this.leadStorage.leads.filter(lead => {
      const leadDate = new Date(lead.timestamp)
      return leadDate >= new Date(startDate) && leadDate <= new Date(endDate)
    })
  }

  // Get leads by company
  getLeadsByCompany(company: string): UserData[] {
    return this.leadStorage.leads.filter(lead => 
      lead.company.toLowerCase().includes(company.toLowerCase())
    )
  }

  // Export leads as CSV for business use
  exportLeadsAsCSV(): string {
    const headers = ['Lead ID', 'Name', 'Email', 'Phone', 'Company', 'Website', 'Score', 'Date']
    const csvData = [headers]

    this.leadStorage.leads.forEach(lead => {
      csvData.push([
        lead.leadId,
        lead.fullName,
        lead.email,
        lead.phone,
        lead.company,
        lead.websiteAnalyzed,
        lead.auditScore?.toString() || 'N/A',
        new Date(lead.timestamp).toLocaleDateString()
      ])
    })

    return csvData.map(row => row.join(',')).join('\n')
  }

  // Get analytics for business owner
  getAnalytics() {
    const today = new Date()
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const todayLeads = this.leadStorage.leads.filter(lead => 
      new Date(lead.timestamp).toDateString() === today.toDateString()
    )

    const weekLeads = this.leadStorage.leads.filter(lead => 
      new Date(lead.timestamp) >= thisWeek
    )

    const monthLeads = this.leadStorage.leads.filter(lead => 
      new Date(lead.timestamp) >= thisMonth
    )

    return {
      total: this.leadStorage.totalLeads,
      today: todayLeads.length,
      thisWeek: weekLeads.length,
      thisMonth: monthLeads.length,
      averageScore: this.leadStorage.leads.reduce((sum, lead) => 
        sum + (lead.auditScore || 0), 0) / this.leadStorage.totalLeads || 0,
      topCompanies: this.getTopCompanies(),
      recentLeads: this.leadStorage.leads.slice(-5).reverse()
    }
  }

  // Get top companies by lead count
  private getTopCompanies() {
    const companyCounts: Record<string, number> = {}
    
    this.leadStorage.leads.forEach(lead => {
      companyCounts[lead.company] = (companyCounts[lead.company] || 0) + 1
    })

    return Object.entries(companyCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([company, count]) => ({ company, count }))
  }
}

// Export main function for easy use
export const captureUserForPDF = async (userData: Omit<UserData, 'timestamp' | 'leadId'>) => {
  const leadCapture = MillionUserLeadCapture.getInstance()
  return await leadCapture.captureUser(userData)
}

// Export analytics functions
export const getLeadAnalytics = () => {
  const leadCapture = MillionUserLeadCapture.getInstance()
  return leadCapture.getAnalytics()
}

export const getAllCapturedLeads = () => {
  const leadCapture = MillionUserLeadCapture.getInstance()
  return leadCapture.getAllLeads()
}

export const exportLeadsCSV = () => {
  const leadCapture = MillionUserLeadCapture.getInstance()
  return leadCapture.exportLeadsAsCSV()
}