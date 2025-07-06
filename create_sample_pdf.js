const puppeteer = require('puppeteer');
const fs = require('fs');

// Create a standalone HTML file with the professional PDF generator
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Professional SEO Report Sample</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .sample-info { background: #f0f8ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .generate-btn { background: #F4C430; color: #2D2D2D; padding: 12px 24px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        .preview { margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #F4C430; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 8 Mile Sniper Professional SEO Report Generator</h1>
        
        <div class="sample-info">
            <h2>📊 Sample Report Details</h2>
            <p><strong>Client:</strong> Digital Marketing Solutions Ltd</p>
            <p><strong>Contact:</strong> Sarah Johnson</p>
            <p><strong>Website:</strong> https://example-business.com</p>
            <p><strong>Overall Score:</strong> 73/100</p>
            <p><strong>Report Type:</strong> Professional 6-Page SEO Audit</p>
        </div>
        
        <button class="generate-btn" onclick="generateSampleReport()">Generate Professional PDF Sample</button>
        
        <div class="preview">
            <h3>📋 Report Features</h3>
            <ul>
                <li>✅ 8 Mile Sniper Branding with Gold/Dark Theme</li>
                <li>✅ Complete 47+ SEO Factors Analysis</li>
                <li>✅ 2025 AI Search Optimization Strategy</li>
                <li>✅ Voice Search Readiness Assessment</li>
                <li>✅ Expert Tactical Recommendations</li>
                <li>✅ 90-Day Implementation Roadmap</li>
                <li>✅ Professional Services Upsell</li>
            </ul>
        </div>
    </div>

    ${fs.readFileSync('/workspace/professional_pdf_generator.js', 'utf8')}
    
    <script>
        function generateSampleReport() {
            // Sample analysis data
            const analysisData = {
                url: "https://example-business.com",
                overallScore: 73,
                aiReadinessScore: 55,
                voiceSearchScore: 30,
                eeAtScore: 65,
                metrics: {
                    technicalSeo: 78,
                    contentQuality: 82,
                    userExperience: 71,
                    mobileOptimization: 89,
                    pageSpeed: 67,
                    aiSearchReadiness: 55,
                    voiceSearchOptimization: 30,
                    eeAtScore: 65,
                    localSeo: 45,
                    socialSignals: 52
                },
                issues: [
                    {
                        title: "Missing Voice Search Optimization",
                        description: "Your website lacks conversational content structure needed for voice search queries. This critical gap affects your visibility in AI-powered search results.",
                        priority: "critical",
                        solution: [
                            "Create comprehensive FAQ sections targeting 'how', 'what', 'where' questions",
                            "Implement natural language content patterns",
                            "Add location-specific voice search optimization",
                            "Optimize for featured snippet capture with direct answers"
                        ]
                    },
                    {
                        title: "Incomplete Structured Data Implementation",
                        description: "Missing essential schema markup prevents search engines from understanding your content context and business information.",
                        priority: "high",
                        solution: [
                            "Implement Organization schema with complete business details",
                            "Add LocalBusiness schema for local search optimization",
                            "Create Article schema for content pages",
                            "Set up Product/Service schema for commercial pages"
                        ]
                    }
                ]
            };

            // Sample client data
            const clientData = {
                fullName: "Sarah Johnson",
                company: "Digital Marketing Solutions Ltd",
                websiteUrl: "https://example-business.com"
            };

            // Generate the professional PDF
            console.log('🚀 Generating Professional SEO Report...');
            window.downloadProfessionalSEOReport(analysisData, clientData);
            
            // Show success message
            alert('✅ Professional PDF Report Generated Successfully!\\n\\nFilename: 8-Mile-Sniper-Professional-SEO-Audit-Digital-Marketing-Solutions-Ltd-' + new Date().toISOString().split('T')[0] + '.pdf');
        }
        
        // Auto-generate on page load after 2 seconds
        setTimeout(() => {
            console.log('Auto-generating sample report...');
            generateSampleReport();
        }, 2000);
    </script>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync('/workspace/professional_pdf_sample.html', htmlContent);
console.log('✅ Professional PDF sample generator created: /workspace/professional_pdf_sample.html');
