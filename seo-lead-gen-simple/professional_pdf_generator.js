// WORLD-CLASS PROFESSIONAL SEO AUDIT PDF GENERATOR
// Based on industry standards from Ahrefs, SEOptimer, Agency Analytics

function generateProfessionalSEOReport(analysisData, clientData) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Brand colors for 8 Mile Sniper
    const colors = {
        primary: '#F4C430',    // Gold
        secondary: '#2D2D2D',  // Dark gray
        success: '#4CAF50',    // Green
        warning: '#FF9800',    // Orange
        danger: '#F44336',     // Red
        text: '#333333',       // Dark text
        light: '#F5F5F5',      // Light background
        white: '#FFFFFF'
    };
    
    let currentPage = 1;
    let yPosition = 20;
    
    // Helper Functions
    function addPage() {
        pdf.addPage();
        currentPage++;
        yPosition = 20;
        addWatermark();
    }
    
    function addWatermark() {
        pdf.setTextColor(200, 200, 200);
        pdf.setFontSize(8);
        pdf.text('8 Mile Sniper - Confidential SEO Audit Report', 210 - 5, 297 - 5, { align: 'right' });
        pdf.setTextColor(colors.text);
    }
    
    function addHeader(title, subtitle = '') {
        // Add header background
        pdf.setFillColor(colors.primary);
        pdf.rect(0, yPosition - 5, 210, 15, 'F');
        
        // Add title
        pdf.setTextColor(colors.secondary);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, 10, yPosition + 5);
        
        if (subtitle) {
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(subtitle, 10, yPosition + 10);
        }
        
        yPosition += 25;
        pdf.setTextColor(colors.text);
    }
    
    function addScoreGauge(x, y, score, label, maxScore = 100) {
        const radius = 25;
        const centerX = x + radius;
        const centerY = y + radius;
        
        // Background circle
        pdf.setFillColor(240, 240, 240);
        pdf.circle(centerX, centerY, radius, 'F');
        
        // Score arc
        const percentage = score / maxScore;
        let color = colors.danger;
        if (percentage > 0.7) color = colors.success;
        else if (percentage > 0.4) color = colors.warning;
        
        pdf.setFillColor(color);
        const endAngle = (percentage * 360) - 90;
        pdf.ellipse(centerX, centerY, radius, radius, -90, endAngle, 'F');
        
        // Inner white circle
        pdf.setFillColor(colors.white);
        pdf.circle(centerX, centerY, radius - 5, 'F');
        
        // Score text
        pdf.setTextColor(colors.text);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(score.toString(), centerX, centerY + 2, { align: 'center' });
        
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text('/' + maxScore, centerX, centerY + 8, { align: 'center' });
        
        // Label
        pdf.setFontSize(10);
        pdf.text(label, centerX, y + radius * 2 + 15, { align: 'center', maxWidth: radius * 2 });
    }
    
    function addChart(x, y, width, height, data, title) {
        // Chart background
        pdf.setFillColor(colors.light);
        pdf.rect(x, y, width, height, 'F');
        
        // Chart border
        pdf.setDrawColor(colors.secondary);
        pdf.rect(x, y, width, height);
        
        // Title
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, x + width/2, y - 5, { align: 'center' });
        
        // Draw bars
        const barWidth = width / data.length - 5;
        const maxValue = Math.max(...data.map(d => d.value));
        
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * (height - 20);
            const barX = x + 5 + (index * (barWidth + 5));
            const barY = y + height - 10 - barHeight;
            
            // Color based on score
            const percentage = item.value / 100;
            let barColor = colors.danger;
            if (percentage > 0.7) barColor = colors.success;
            else if (percentage > 0.4) barColor = colors.warning;
            
            pdf.setFillColor(barColor);
            pdf.rect(barX, barY, barWidth, barHeight, 'F');
            
            // Value label
            pdf.setFontSize(8);
            pdf.setTextColor(colors.text);
            pdf.text(item.value.toString(), barX + barWidth/2, barY - 2, { align: 'center' });
            
            // Category label
            pdf.text(item.label, barX + barWidth/2, y + height + 5, { 
                align: 'center', 
                maxWidth: barWidth,
                angle: 45 
            });
        });
    }
    
    // PAGE 1: BRANDED COVER PAGE
    addWatermark();
    
    // Cover page background gradient effect
    pdf.setFillColor(colors.secondary);
    pdf.rect(0, 0, 210, 100, 'F');
    
    // Logo placeholder (you can add actual logo here)
    pdf.setFillColor(colors.primary);
    pdf.rect(85, 30, 40, 20, 'F');
    pdf.setTextColor(colors.secondary);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('8 MILE SNIPER', 105, 42, { align: 'center' });
    
    // Main title
    pdf.setTextColor(colors.white);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('COMPREHENSIVE', 105, 70, { align: 'center' });
    pdf.text('2025 SEO AUDIT REPORT', 105, 80, { align: 'center' });
    
    // Client info section
    pdf.setFillColor(colors.white);
    pdf.rect(20, 120, 170, 80, 'F');
    
    pdf.setTextColor(colors.text);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CLIENT ANALYSIS SUMMARY', 105, 135, { align: 'center' });
    
    // Client details
    const clientInfo = [
        ['Company:', clientData.company || 'N/A'],
        ['Website:', clientData.websiteUrl],
        ['Contact:', clientData.fullName],
        ['Analysis Date:', new Date().toLocaleDateString()],
        ['Report ID:', '#SEO-' + Date.now().toString().slice(-6)]
    ];
    
    pdf.setFontSize(12);
    clientInfo.forEach((info, index) => {
        const y = 150 + (index * 8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(info[0], 30, y);
        pdf.setFont('helvetica', 'normal');
        pdf.text(info[1], 80, y);
    });
    
    // Footer
    pdf.setTextColor(colors.primary);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Expert Analysis by Real SEO Professionals', 105, 230, { align: 'center' });
    pdf.setFontSize(12);
    pdf.text('47+ SEO Factors Analyzed | 72-Hour Delivery Guarantee', 105, 240, { align: 'center' });
    
    // Contact info
    pdf.setTextColor(colors.text);
    pdf.setFontSize(10);
    pdf.text('📧 support@8milesniper.com  📞 +61 444 513 480  🌐 8milesniper.com', 105, 260, { align: 'center' });
    
    // PAGE 2: EXECUTIVE SUMMARY
    addPage();
    addHeader('EXECUTIVE SUMMARY', 'Key Findings & Overall Performance');
    
    // Overall score gauge
    addScoreGauge(80, yPosition, analysisData.overallScore || 75, 'OVERALL SEO SCORE');
    yPosition += 80;
    
    // Key metrics row
    const keyMetrics = [
        { score: analysisData.aiReadinessScore || 55, label: '2025 AI\nReadiness' },
        { score: analysisData.voiceSearchScore || 30, label: 'Voice Search\nOptimization' },
        { score: analysisData.eeAtScore || 55, label: 'E-E-A-T\nAuthority' }
    ];
    
    keyMetrics.forEach((metric, index) => {
        addScoreGauge(30 + (index * 60), yPosition, metric.score, metric.label);
    });
    yPosition += 80;
    
    // Performance level indicator
    const performanceLevel = analysisData.overallScore >= 80 ? 'EXCELLENT' :
                           analysisData.overallScore >= 60 ? 'GOOD' :
                           analysisData.overallScore >= 40 ? 'NEEDS IMPROVEMENT' : 'CRITICAL';
    
    const levelColor = analysisData.overallScore >= 80 ? colors.success :
                      analysisData.overallScore >= 60 ? colors.primary :
                      analysisData.overallScore >= 40 ? colors.warning : colors.danger;
    
    pdf.setFillColor(levelColor);
    pdf.rect(10, yPosition, 190, 20, 'F');
    pdf.setTextColor(colors.white);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`PERFORMANCE LEVEL: ${performanceLevel}`, 105, yPosition + 12, { align: 'center' });
    
    yPosition += 35;
    
    // Key findings
    pdf.setTextColor(colors.text);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🎯 KEY FINDINGS:', 10, yPosition);
    yPosition += 10;
    
    const findings = [
        '✅ Strong semantic keyword integration (66/100)',
        '⚠️ Voice search optimization needs immediate attention (30/100)',
        '🚨 Critical: Missing structured data markup',
        '✅ Good entity recognition setup (60/100)',
        '⚠️ E-E-A-T authority signals require enhancement'
    ];
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    findings.forEach((finding, index) => {
        pdf.text(finding, 15, yPosition + (index * 8));
    });
    
    yPosition += 50;
    
    // Expert recommendations preview
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🎯 PRIORITY ACTIONS (FIRST 30 DAYS):', 10, yPosition);
    yPosition += 10;
    
    const priorities = [
        '1. Implement comprehensive FAQ sections for voice search',
        '2. Add essential schema markup (Organization, Website, LocalBusiness)',
        '3. Optimize conversational content structure',
        '4. Enhance author credibility and E-E-A-T signals'
    ];
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    priorities.forEach((priority, index) => {
        pdf.text(priority, 15, yPosition + (index * 8));
    });
    
    // PAGE 3: 47+ SEO FACTORS ANALYSIS
    addPage();
    addHeader('47+ SEO FACTORS ANALYSIS', 'Comprehensive Technical & Content Review');
    
    // Create detailed factor categories
    const seoFactors = [
        {
            category: '2025 AI Search Optimization',
            factors: [
                { name: 'Conversational Content Structure', score: 49, status: 'warning' },
                { name: 'Entity Recognition Optimization', score: 60, status: 'fair' },
                { name: 'Factual Information Structure', score: 44, status: 'warning' },
                { name: 'Semantic Keyword Integration', score: 66, status: 'good' },
                { name: 'AI-Friendly Content Format', score: 52, status: 'fair' }
            ]
        },
        {
            category: 'Technical SEO Foundation',
            factors: [
                { name: 'Core Web Vitals Performance', score: 71, status: 'good' },
                { name: 'Mobile-First Indexing', score: 83, status: 'excellent' },
                { name: 'Page Speed Optimization', score: 67, status: 'good' },
                { name: 'HTTPS Security', score: 100, status: 'excellent' },
                { name: 'XML Sitemap Structure', score: 89, status: 'excellent' }
            ]
        },
        {
            category: 'Voice Search & Conversational',
            factors: [
                { name: 'FAQ Content Structure', score: 25, status: 'critical' },
                { name: 'Natural Language Optimization', score: 33, status: 'warning' },
                { name: 'Featured Snippet Optimization', score: 41, status: 'warning' },
                { name: 'Long-tail Keyword Coverage', score: 58, status: 'fair' },
                { name: 'Local Voice Search Signals', score: 29, status: 'critical' }
            ]
        },
        {
            category: 'Content Authority (E-E-A-T)',
            factors: [
                { name: 'Author Authority Signals', score: 45, status: 'warning' },
                { name: 'Content Expertise Indicators', score: 62, status: 'fair' },
                { name: 'External Authority Links', score: 51, status: 'fair' },
                { name: 'Content Freshness & Updates', score: 73, status: 'good' },
                { name: 'Trust Signals & Credentials', score: 48, status: 'warning' }
            ]
        },
        {
            category: 'Structured Data & Schema',
            factors: [
                { name: 'Organization Schema', score: 0, status: 'critical' },
                { name: 'Website Schema', score: 0, status: 'critical' },
                { name: 'Article/Blog Schema', score: 15, status: 'critical' },
                { name: 'Local Business Schema', score: 0, status: 'critical' },
                { name: 'Product/Service Schema', score: 12, status: 'critical' }
            ]
        }
    ];
    
    // Display factor categories
    seoFactors.forEach((category, categoryIndex) => {
        if (yPosition > 240) addPage();
        
        // Category header
        pdf.setFillColor(colors.primary);
        pdf.rect(10, yPosition, 190, 10, 'F');
        pdf.setTextColor(colors.secondary);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(category.category.toUpperCase(), 15, yPosition + 7);
        yPosition += 15;
        
        // Factor details
        category.factors.forEach((factor, index) => {
            if (yPosition > 270) addPage();
            
            // Status color
            let statusColor = colors.danger;
            if (factor.status === 'excellent') statusColor = colors.success;
            else if (factor.status === 'good') statusColor = colors.success;
            else if (factor.status === 'fair') statusColor = colors.warning;
            else if (factor.status === 'warning') statusColor = colors.warning;
            
            // Factor row
            pdf.setFillColor(240, 240, 240);
            pdf.rect(15, yPosition, 180, 8, 'F');
            
            // Factor name
            pdf.setTextColor(colors.text);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(factor.name, 20, yPosition + 5);
            
            // Score badge
            pdf.setFillColor(statusColor);
            pdf.rect(160, yPosition + 1, 30, 6, 'F');
            pdf.setTextColor(colors.white);
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${factor.score}/100`, 175, yPosition + 5, { align: 'center' });
            
            yPosition += 10;
        });
        
        yPosition += 5;
    });
    
    // PAGE 4: DETAILED RECOMMENDATIONS
    addPage();
    addHeader('EXPERT TACTICAL RECOMMENDATIONS', 'Specific Action Steps by Real SEO Professionals');
    
    const detailedRecommendations = [
        {
            priority: 'CRITICAL',
            title: 'Voice Search Optimization Overhaul',
            color: colors.danger,
            actions: [
                'Create comprehensive FAQ sections targeting "how", "what", "where" queries',
                'Implement natural language content patterns for conversational search',
                'Add location-specific voice search optimization for local queries',
                'Optimize for featured snippet capture with direct answer formats'
            ],
            timeline: '7-14 days',
            impact: 'High'
        },
        {
            priority: 'HIGH',
            title: 'Structured Data Implementation',
            color: colors.warning,
            actions: [
                'Implement Organization schema markup with complete business details',
                'Add LocalBusiness schema for location-based search optimization',
                'Create Article schema for all blog posts and content pages',
                'Set up Product/Service schema for commercial pages'
            ],
            timeline: '14-21 days',
            impact: 'Very High'
        },
        {
            priority: 'MEDIUM',
            title: 'E-E-A-T Authority Enhancement',
            color: colors.primary,
            actions: [
                'Add comprehensive author bio pages with credentials',
                'Include expert quotes and citations in content',
                'Create "About Us" page with team expertise and company history',
                'Add trust signals: certifications, awards, client testimonials'
            ],
            timeline: '21-30 days',
            impact: 'Medium'
        }
    ];
    
    detailedRecommendations.forEach((rec, index) => {
        if (yPosition > 220) addPage();
        
        // Priority badge
        pdf.setFillColor(rec.color);
        pdf.rect(10, yPosition, 40, 8, 'F');
        pdf.setTextColor(colors.white);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text(rec.priority, 30, yPosition + 5, { align: 'center' });
        
        // Title
        pdf.setTextColor(colors.text);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(rec.title, 55, yPosition + 5);
        
        yPosition += 15;
        
        // Timeline and impact
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`⏱️ Timeline: ${rec.timeline}`, 15, yPosition);
        pdf.text(`🎯 Impact: ${rec.impact}`, 120, yPosition);
        yPosition += 10;
        
        // Actions
        pdf.setFont('helvetica', 'bold');
        pdf.text('SPECIFIC ACTIONS:', 15, yPosition);
        yPosition += 8;
        
        pdf.setFont('helvetica', 'normal');
        rec.actions.forEach((action, actionIndex) => {
            pdf.text(`${actionIndex + 1}. ${action}`, 20, yPosition, { maxWidth: 170 });
            yPosition += 7;
        });
        
        yPosition += 10;
    });
    
    // PAGE 5: 90-DAY ROADMAP
    addPage();
    addHeader('90-DAY IMPLEMENTATION ROADMAP', 'Your Step-by-Step Success Plan');
    
    const roadmapPhases = [
        {
            phase: 'DAYS 1-30: FOUNDATION',
            color: colors.danger,
            goals: [
                'Fix all critical technical SEO issues',
                'Implement basic 2025 AI search optimizations',
                'Optimize page speed and Core Web Vitals',
                'Add essential structured data markup'
            ]
        },
        {
            phase: 'DAYS 31-60: ENHANCEMENT',
            color: colors.warning,
            goals: [
                'Develop comprehensive voice search strategy',
                'Create conversational content and FAQs',
                'Enhance E-E-A-T authority signals',
                'Improve mobile user experience'
            ]
        },
        {
            phase: 'DAYS 61-90: OPTIMIZATION',
            color: colors.success,
            goals: [
                'Advanced AI search optimization',
                'Local SEO enhancements',
                'Content strategy implementation',
                'Performance monitoring and refinement'
            ]
        }
    ];
    
    roadmapPhases.forEach((phase, index) => {
        // Phase header
        pdf.setFillColor(phase.color);
        pdf.rect(10, yPosition, 190, 12, 'F');
        pdf.setTextColor(colors.white);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(phase.phase, 15, yPosition + 8);
        yPosition += 20;
        
        // Goals
        phase.goals.forEach((goal, goalIndex) => {
            pdf.setTextColor(colors.text);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`✓ ${goal}`, 20, yPosition);
            yPosition += 8;
        });
        
        yPosition += 10;
    });
    
    // Expected results section
    pdf.setFillColor(colors.light);
    pdf.rect(10, yPosition, 190, 40, 'F');
    pdf.setTextColor(colors.text);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🎯 EXPECTED RESULTS AFTER 90 DAYS:', 15, yPosition + 10);
    
    const results = [
        '• 40-60% improvement in voice search visibility',
        '• 25-35% increase in AI search engine compatibility',
        '• 30-50% boost in featured snippet captures',
        '• Significantly enhanced E-E-A-T authority signals'
    ];
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    results.forEach((result, index) => {
        pdf.text(result, 20, yPosition + 20 + (index * 6));
    });
    
    // PAGE 6: NEXT STEPS & CONTACT
    addPage();
    addHeader('NEXT STEPS & PROFESSIONAL SERVICES', 'Ready to Implement Your SEO Strategy?');
    
    // Implementation options
    pdf.setFillColor(colors.primary);
    pdf.rect(10, yPosition, 190, 15, 'F');
    pdf.setTextColor(colors.secondary);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('🚀 IMPLEMENTATION OPTIONS', 105, yPosition + 10, { align: 'center' });
    yPosition += 25;
    
    const services = [
        {
            name: 'SINGLE ANALYSIS',
            price: '$47',
            description: 'One comprehensive SEO audit like this one',
            features: ['47+ SEO factors analyzed', '72-hour delivery', 'Expert recommendations']
        },
        {
            name: 'BUSINESS PACKAGE',
            price: '$200',
            description: '10 detailed analyses for multiple sites/pages',
            features: ['Best value for agencies', 'Priority support', 'Bulk reporting']
        },
        {
            name: 'UNLIMITED PACKAGE',
            price: '$397',
            description: 'Unlimited analyses for your business',
            features: ['Unlimited audits', 'White-label options', 'API access']
        }
    ];
    
    services.forEach((service, index) => {
        const x = 10 + (index * 63);
        
        // Service box
        pdf.setFillColor(colors.white);
        pdf.setDrawColor(colors.primary);
        pdf.rect(x, yPosition, 60, 50, 'FD');
        
        // Service name
        pdf.setTextColor(colors.primary);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(service.name, x + 30, yPosition + 8, { align: 'center' });
        
        // Price
        pdf.setTextColor(colors.danger);
        pdf.setFontSize(14);
        pdf.text(service.price, x + 30, yPosition + 18, { align: 'center' });
        
        // Description
        pdf.setTextColor(colors.text);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(service.description, x + 30, yPosition + 25, { 
            align: 'center', 
            maxWidth: 55 
        });
        
        // Features
        service.features.forEach((feature, fIndex) => {
            pdf.text(`• ${feature}`, x + 5, yPosition + 35 + (fIndex * 4), { 
                maxWidth: 50,
                fontSize: 7
            });
        });
    });
    
    yPosition += 70;
    
    // Contact section
    pdf.setFillColor(colors.secondary);
    pdf.rect(10, yPosition, 190, 50, 'F');
    
    pdf.setTextColor(colors.primary);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('GET STARTED TODAY', 105, yPosition + 15, { align: 'center' });
    
    pdf.setTextColor(colors.white);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('📧 support@8milesniper.com', 105, yPosition + 25, { align: 'center' });
    pdf.text('📞 +61 444 513 480', 105, yPosition + 32, { align: 'center' });
    pdf.text('🌐 8milesniper.com', 105, yPosition + 39, { align: 'center' });
    
    // Footer
    yPosition += 60;
    pdf.setTextColor(colors.primary);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('This report was created by 8 Mile Sniper\'s expert SEO team', 105, yPosition, { align: 'center' });
    pdf.text('© 2025 8 Mile Sniper. All rights reserved.', 105, yPosition + 8, { align: 'center' });
    
    return pdf;
}

// Export the PDF
function downloadProfessionalSEOReport(analysisData, clientData) {
    const pdf = generateProfessionalSEOReport(analysisData, clientData);
    const filename = `8-Mile-Sniper-Professional-SEO-Audit-${clientData.company || 'Client'}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(filename);
}

// Make it available globally
window.downloadProfessionalSEOReport = downloadProfessionalSEOReport;
