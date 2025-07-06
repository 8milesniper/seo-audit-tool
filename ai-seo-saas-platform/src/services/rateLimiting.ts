// Email-based rate limiting service for SEO audit tool
// Allows unlimited access for admin emails, one audit per email for public users

interface AuditRecord {
  email: string;
  timestamp: number;
  auditCount: number;
  url: string;
}

class RateLimitingService {
  private storageKey = '8mile_seo_audit_records';
  
  // Admin emails that bypass rate limiting (8 Mile Sniper team)
  private adminEmails = [
    '8milesniper@gmail.com',
    'admin@8milesniper.com',
    'support@8milesniper.com'
  ];

  // Get all audit records from localStorage
  private getAuditRecords(): AuditRecord[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Save audit records to localStorage
  private saveAuditRecords(records: AuditRecord[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(records));
  }

  // Check if email is an admin email (bypasses rate limiting)
  public isAdminEmail(email: string): boolean {
    return this.adminEmails.includes(email.toLowerCase().trim());
  }

  // Add a new admin email (for dynamic admin management)
  public addAdminEmail(email: string): void {
    const cleanEmail = email.toLowerCase().trim();
    if (!this.adminEmails.includes(cleanEmail)) {
      this.adminEmails.push(cleanEmail);
    }
  }

  // Check if email can perform an audit
  public canPerformAudit(email: string): {
    allowed: boolean;
    reason?: string;
    isAdmin: boolean;
    previousAudits: number;
  } {
    const cleanEmail = email.toLowerCase().trim();
    
    // Admin emails have unlimited access
    if (this.isAdminEmail(cleanEmail)) {
      return {
        allowed: true,
        isAdmin: true,
        previousAudits: 0
      };
    }

    const records = this.getAuditRecords();
    const userRecords = records.filter(record => record.email === cleanEmail);
    
    // If no previous audits, allow
    if (userRecords.length === 0) {
      return {
        allowed: true,
        isAdmin: false,
        previousAudits: 0
      };
    }

    // Check if user has already performed an audit
    const totalAudits = userRecords.reduce((sum, record) => sum + record.auditCount, 0);
    
    if (totalAudits >= 1) {
      const lastAudit = userRecords.sort((a, b) => b.timestamp - a.timestamp)[0];
      const daysSinceLastAudit = Math.floor((Date.now() - lastAudit.timestamp) / (1000 * 60 * 60 * 24));
      
      return {
        allowed: false,
        reason: `You've already used your free SEO audit. Contact 8 Mile Sniper for additional analysis or premium services. Last audit: ${daysSinceLastAudit} days ago.`,
        isAdmin: false,
        previousAudits: totalAudits
      };
    }

    return {
      allowed: true,
      isAdmin: false,
      previousAudits: totalAudits
    };
  }

  // Record a new audit
  public recordAudit(email: string, url: string): void {
    const cleanEmail = email.toLowerCase().trim();
    const records = this.getAuditRecords();
    
    // Don't record audits for admin emails (they have unlimited access)
    if (this.isAdminEmail(cleanEmail)) {
      return;
    }

    const newRecord: AuditRecord = {
      email: cleanEmail,
      timestamp: Date.now(),
      auditCount: 1,
      url: url
    };

    records.push(newRecord);
    this.saveAuditRecords(records);
  }

  // Get audit history for an email
  public getAuditHistory(email: string): AuditRecord[] {
    const cleanEmail = email.toLowerCase().trim();
    const records = this.getAuditRecords();
    return records.filter(record => record.email === cleanEmail);
  }

  // Clear all audit records (admin function)
  public clearAllRecords(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Get total number of audits performed
  public getTotalAudits(): number {
    const records = this.getAuditRecords();
    return records.reduce((sum, record) => sum + record.auditCount, 0);
  }

  // Get unique users count
  public getUniqueUsersCount(): number {
    const records = this.getAuditRecords();
    const uniqueEmails = new Set(records.map(record => record.email));
    return uniqueEmails.size;
  }

  // Admin function to reset a specific email's limit
  public resetEmailLimit(email: string): boolean {
    const cleanEmail = email.toLowerCase().trim();
    const records = this.getAuditRecords();
    const filteredRecords = records.filter(record => record.email !== cleanEmail);
    
    if (filteredRecords.length < records.length) {
      this.saveAuditRecords(filteredRecords);
      return true;
    }
    return false;
  }
}

// Export singleton instance
export const rateLimitingService = new RateLimitingService();
export default rateLimitingService;
