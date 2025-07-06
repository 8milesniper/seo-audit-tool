        async function generateAndDownloadPDF(leadData) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Set up PDF styling
            const primaryColor = [244, 196, 48]; // Gold
            const darkColor = [26, 26, 26]; // Dark
            const textColor = [100, 100, 100]; // Gray
            const criticalColor = [255, 68, 68]; // Red
            const warningColor = [255, 170, 0]; // Orange
            const successColor = [76, 175, 80]; // Green

            // ===== PAGE 1: EXECUTIVE SUMMARY =====
            doc.setFillColor(...darkColor);
            doc.rect(0, 0, 210, 50, 'F');

            // Header with logo area
            doc.setTextColor(...primaryColor);
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('8 MILE SNIPER', 20, 25);
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('AI-DRIVEN LOCAL GROWTH', 20, 35);
            doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 130, 35);

            // Report title
            doc.setTextColor(...textColor);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text('🚀 COMPREHENSIVE 2025 SEO ANALYSIS REPORT', 20, 65);

            // Client Information Box
            doc.setFillColor(245, 245, 245);
            doc.rect(15, 75, 180, 35, 'F');
            doc.setTextColor(...darkColor);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('CLIENT DETAILS', 20, 85);
            
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text(`Client: ${leadData.fullName}`, 20, 95);
            doc.text(`Company: ${leadData.company || 'N/A'}`, 20, 102);
            doc.text(`Website Analyzed: ${currentAnalysisData.url}`, 120, 95);
            doc.text(`Analysis Date: ${new Date().toLocaleDateString()}`, 120, 102);

            // Overall Score - Large Display
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textColor);
            doc.text('OVERALL SEO HEALTH SCORE', 20, 130);
            
            doc.setFontSize(48);
            doc.setTextColor(...primaryColor);
            doc.text(`${currentAnalysisData.overallScore}`, 20, 155);
            doc.setFontSize(20);
            doc.text('/100', 60, 155);
            
            // Score interpretation
            doc.setFontSize(12);
            doc.setTextColor(...textColor);
            const scoreLabel = getScoreLabel(currentAnalysisData.overallScore);
            doc.text(`Performance Level: ${scoreLabel}`, 20, 170);

            // Key Highlights Box
            doc.setFillColor(250, 250, 250);
            doc.rect(15, 180, 180, 60, 'F');
            doc.setTextColor(...darkColor);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('🎯 KEY FINDINGS AT A GLANCE', 20, 195);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`• ${currentAnalysisData.factorsAnalyzed} SEO factors analyzed using 2025 algorithms`, 20, 205);
            doc.text(`• 2025 AI Search Readiness: ${currentAnalysisData.metrics.aiSearchReadiness}/100`, 20, 212);
            doc.text(`• Voice Search Optimization: ${currentAnalysisData.metrics.voiceSearchOptimization}/100`, 20, 219);
            doc.text(`• E-E-A-T Authority Score: ${currentAnalysisData.metrics.eeAtScore}/100`, 20, 226);
            doc.text(`• ${currentAnalysisData.issues.length} critical issues identified with solutions`, 20, 233);

            // ===== PAGE 2: DETAILED METRICS BREAKDOWN =====
            doc.addPage();
            
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textColor);
            doc.text('📊 COMPREHENSIVE SEO METRICS ANALYSIS', 20, 25);

            let yPos = 45;
            const metricsConfig = {
                technicalSeo: 'Technical SEO Foundation',
                contentQuality: 'Content Quality & Relevance',
                userExperience: 'User Experience & Navigation',
                mobileOptimization: 'Mobile Optimization',
                pageSpeed: 'Page Speed & Performance',
                aiSearchReadiness: '🤖 2025 AI Search Readiness',
                voiceSearchOptimization: '🗣️ Voice Search Optimization', 
                eeAtScore: '⭐ E-E-A-T Authority Signals',
                structuredData: '🏗️ Structured Data Implementation',
                localSeo: '📍 Local SEO Optimization'
            };

            Object.entries(metricsConfig).forEach(([key, label]) => {
                if (yPos > 260) {
                    doc.addPage();
                    yPos = 25;
                }

                const value = currentAnalysisData.metrics[key];
                const scoreLabel = getScoreLabel(value);
                
                // Section header
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...darkColor);
                doc.text(label, 20, yPos);
                
                // Score and label
                doc.setFontSize(14);
                doc.setTextColor(...(value >= 80 ? successColor : value >= 60 ? warningColor : criticalColor));
                doc.text(`${value}/100`, 140, yPos);
                
                doc.setFontSize(10);
                doc.setTextColor(...textColor);
                doc.text(`(${scoreLabel})`, 165, yPos);
                
                // Progress bar background
                doc.setFillColor(220, 220, 220);
                doc.rect(20, yPos + 3, 120, 4, 'F');
                
                // Progress bar fill
                const barColor = value >= 80 ? successColor : value >= 60 ? warningColor : criticalColor;
                doc.setFillColor(...barColor);
                doc.rect(20, yPos + 3, (value / 100) * 120, 4, 'F');
                
                // Add specific insights for key metrics
                doc.setFontSize(9);
                doc.setTextColor(...textColor);
                let insight = '';
                switch(key) {
                    case 'aiSearchReadiness':
                        insight = value < 70 ? 'Not optimized for ChatGPT, Perplexity, and other AI search engines' : 'Well-prepared for AI search engines';
                        break;
                    case 'voiceSearchOptimization':
                        insight = value < 60 ? 'Missing conversational keywords and FAQ structure' : 'Good voice search optimization';
                        break;
                    case 'pageSpeed':
                        insight = value < 60 ? 'Slow loading times affecting user experience and rankings' : 'Good page performance';
                        break;
                    case 'eeAtScore':
                        insight = value < 70 ? 'Limited expertise, authority, and trust signals' : 'Strong authority signals present';
                        break;
                    default:
                        insight = value < 60 ? 'Requires immediate attention and optimization' : 'Performing within acceptable range';
                }
                doc.text(`→ ${insight}`, 25, yPos + 12);
                
                yPos += 22;
            });

            // ===== PAGE 3: 2025 AI SEARCH READINESS DEEP DIVE =====
            doc.addPage();
            
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textColor);
            doc.text('🤖 2025 AI SEARCH OPTIMIZATION ANALYSIS', 20, 25);
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('This section analyzes your website\'s readiness for AI-powered search engines like ChatGPT,', 20, 45);
            doc.text('Perplexity, Google SGE, and Bing Copilot - features not available in basic SEO tools.', 20, 52);

            yPos = 70;
            const aiFeatures = [
                {
                    feature: 'Conversational Content Structure',
                    score: Math.floor(currentAnalysisData.metrics.aiSearchReadiness * 0.9),
                    description: 'How well your content answers direct questions in a conversational manner'
                },
                {
                    feature: 'Entity Recognition Optimization',
                    score: Math.floor(currentAnalysisData.metrics.aiSearchReadiness * 1.1),
                    description: 'Proper markup and context for AI systems to understand your business entities'
                },
                {
                    feature: 'Factual Information Structure',
                    score: Math.floor(currentAnalysisData.metrics.aiSearchReadiness * 0.8),
                    description: 'Clear, verifiable facts that AI systems can confidently reference'
                },
                {
                    feature: 'Semantic Keyword Integration',
                    score: Math.floor(currentAnalysisData.metrics.aiSearchReadiness * 1.2),
                    description: 'Natural language processing-friendly keyword implementation'
                }
            ];

            aiFeatures.forEach(item => {
                const score = Math.min(100, Math.max(0, item.score));
                
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...darkColor);
                doc.text(`${item.feature}: ${score}/100`, 20, yPos);
                
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...textColor);
                const lines = doc.splitTextToSize(item.description, 160);
                lines.forEach((line, index) => {
                    doc.text(line, 25, yPos + 8 + (index * 5));
                });
                
                yPos += 8 + (lines.length * 5) + 10;
            });

            // ===== PAGE 4: CRITICAL ISSUES & SOLUTIONS =====
            doc.addPage();
            
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textColor);
            doc.text('🚨 CRITICAL ISSUES & ACTIONABLE SOLUTIONS', 20, 25);

            yPos = 45;
            
            currentAnalysisData.issues.forEach((issue, index) => {
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 25;
                }
                
                // Issue number and type
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                const issueColor = issue.type === 'critical' ? criticalColor : warningColor;
                doc.setTextColor(...issueColor);
                doc.text(`ISSUE #${index + 1} - ${issue.type.toUpperCase()}`, 20, yPos);
                
                // Issue title
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...darkColor);
                doc.text(issue.title, 20, yPos + 8);
                
                // Issue description
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...textColor);
                const descLines = doc.splitTextToSize(issue.description, 170);
                descLines.forEach((line, lineIndex) => {
                    doc.text(line, 20, yPos + 16 + (lineIndex * 5));
                });
                
                // Add implementation steps
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...primaryColor);
                doc.text('🔧 SOLUTION STEPS:', 20, yPos + 16 + (descLines.length * 5) + 5);
                
                // Generate specific solution steps based on issue type
                let solutionSteps = [];
                if (issue.title.includes('AI Search')) {
                    solutionSteps = [
                        '1. Add FAQ sections with natural language questions',
                        '2. Implement JSON-LD structured data markup',
                        '3. Create conversational content that directly answers user queries',
                        '4. Optimize for featured snippets and entity boxes'
                    ];
                } else if (issue.title.includes('Page Speed')) {
                    solutionSteps = [
                        '1. Optimize and compress all images to WebP format',
                        '2. Enable browser caching and GZIP compression',
                        '3. Minimize CSS and JavaScript files',
                        '4. Consider implementing a Content Delivery Network (CDN)'
                    ];
                } else {
                    solutionSteps = [
                        '1. Conduct detailed audit of the specific area',
                        '2. Implement industry best practices',
                        '3. Test changes in staging environment',
                        '4. Monitor improvements with analytics tools'
                    ];
                }
                
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...textColor);
                solutionSteps.forEach((step, stepIndex) => {
                    doc.text(step, 25, yPos + 24 + (descLines.length * 5) + (stepIndex * 5));
                });
                
                yPos += 35 + (descLines.length * 5) + (solutionSteps.length * 5);
            });

            // ===== PAGE 5: IMPLEMENTATION ROADMAP =====
            doc.addPage();
            
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textColor);
            doc.text('🗺️ 90-DAY IMPLEMENTATION ROADMAP', 20, 25);

            const roadmap = [
                {
                    phase: 'DAYS 1-30: FOUNDATION',
                    color: criticalColor,
                    tasks: [
                        'Fix critical technical SEO issues',
                        'Implement basic 2025 AI search optimizations',
                        'Optimize page speed and Core Web Vitals',
                        'Add essential structured data markup'
                    ]
                },
                {
                    phase: 'DAYS 31-60: ENHANCEMENT',
                    color: warningColor,
                    tasks: [
                        'Develop comprehensive voice search strategy',
                        'Create conversational content and FAQs',
                        'Enhance E-E-A-T authority signals',
                        'Improve mobile user experience'
                    ]
                },
                {
                    phase: 'DAYS 61-90: OPTIMIZATION',
                    color: successColor,
                    tasks: [
                        'Advanced AI search optimization',
                        'Local SEO enhancements',
                        'Content strategy implementation',
                        'Performance monitoring and refinement'
                    ]
                }
            ];

            yPos = 50;
            roadmap.forEach(phase => {
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...phase.color);
                doc.text(phase.phase, 20, yPos);
                
                yPos += 10;
                phase.tasks.forEach(task => {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(...textColor);
                    doc.text(`• ${task}`, 25, yPos);
                    yPos += 6;
                });
                yPos += 8;
            });

            // ===== FINAL PAGE: NEXT STEPS & CONTACT =====
            doc.addPage();
            
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...textColor);
            doc.text('🚀 NEXT STEPS & PROFESSIONAL SERVICES', 20, 25);

            // Service packages
            doc.setFillColor(250, 250, 250);
            doc.rect(15, 45, 180, 100, 'F');
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...darkColor);
            doc.text('8 MILE SNIPER SEO SERVICES', 20, 60);
            
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('Ready to implement these recommendations? Here are your options:', 20, 75);
            
            const services = [
                '💼 SINGLE ANALYSIS: $47 per comprehensive SEO audit',
                '📊 BUSINESS PACKAGE: 10 detailed analyses for $200',
                '🚀 UNLIMITED PACKAGE: Unlimited analyses for $397',
                '🏷️ WHITE LABEL SOLUTION: Full rebrandable platform for $497'
            ];
            
            yPos = 85;
            services.forEach(service => {
                doc.text(`${service}`, 25, yPos);
                yPos += 10;
            });

            // Contact information
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...primaryColor);
            doc.text('📞 READY TO GET STARTED?', 20, 165);
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...darkColor);
            doc.text('Contact 8 Mile Sniper Today:', 20, 180);
            
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('📧 Email: contact@8milesniper.com', 20, 195);
            doc.text('📞 Phone: (123) 456-7890', 20, 205);
            doc.text('🌐 Website: 8milesniper.com', 20, 215);
            
            doc.setFontSize(10);
            doc.setTextColor(...textColor);
            doc.text('💡 Free 15-minute consultation to discuss your SEO strategy', 20, 230);
            doc.text('⏰ Mention this report for priority scheduling', 20, 240);

            // Add footer to all pages
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`© 2025 8 Mile Sniper - Advanced 2025 SEO Analysis Report - Page ${i} of ${pageCount}`, 20, 290);
            }

            // Generate filename
            const companyName = leadData.company ? leadData.company.replace(/[^a-zA-Z0-9]/g, '-') : leadData.fullName.replace(/[^a-zA-Z0-9]/g, '-');
            const date = new Date().toISOString().split('T')[0];
            const filename = `8-Mile-Sniper-SEO-Report-${companyName}-${date}.pdf`;

            // Download the PDF
            doc.save(filename);

            // Send lead notification
            sendLeadNotification(leadData);
        }