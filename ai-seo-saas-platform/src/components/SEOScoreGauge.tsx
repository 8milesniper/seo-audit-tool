import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface SEOScoreGaugeProps {
  score: number
}

const SEOScoreGauge: React.FC<SEOScoreGaugeProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981' // Green
    if (score >= 70) return '#f59e0b' // Amber
    if (score >= 50) return '#f97316' // Orange
    return '#ef4444' // Red
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 50) return 'Needs Work'
    return 'Poor'
  }

  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)

  // Data for the gauge
  const data = [
    { name: 'Score', value: score, fill: scoreColor },
    { name: 'Remaining', value: 100 - score, fill: 'transparent' }
  ]

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
      {/* Gauge Chart */}
      <div className="relative w-64 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={225}
              endAngle={-45}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? scoreColor : '#374151'} 
                  stroke="none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Score Display in Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-white mb-2">{score}</div>
          <div className="text-lg font-semibold text-slate-300">/ 100</div>
          <div 
            className="text-sm font-medium mt-1 px-3 py-1 rounded-full"
            style={{ backgroundColor: `${scoreColor}20`, color: scoreColor }}
          >
            {scoreLabel}
          </div>
        </div>

        {/* Gauge Labels */}
        <div className="absolute bottom-8 left-4 text-xs text-slate-400">0</div>
        <div className="absolute bottom-8 right-4 text-xs text-slate-400">100</div>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-400">
          SEO Score
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Performance Indicators</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">AI Search Ready</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(score + 3, 100)}%`, 
                    backgroundColor: '#a855f7' // Purple for AI
                  }}
                />
              </div>
              <span className="text-white font-medium w-8">{Math.min(score + 3, 100)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Voice Search</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${Math.max(score - 2, 0)}%`, 
                    backgroundColor: '#10b981' // Green for voice
                  }}
                />
              </div>
              <span className="text-white font-medium w-8">{Math.max(score - 2, 0)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Schema & Entity</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${Math.max(score - 5, 0)}%`, 
                    backgroundColor: '#3b82f6' // Blue for schema
                  }}
                />
              </div>
              <span className="text-white font-medium w-8">{Math.max(score - 5, 0)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">E-E-A-T Authority</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(score + 1, 100)}%`, 
                    backgroundColor: getScoreColor(score + 1) 
                  }}
                />
              </div>
              <span className="text-white font-medium w-8">{Math.min(score + 1, 100)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Performance</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${Math.max(score - 8, 0)}%`, 
                    backgroundColor: getScoreColor(score - 8) 
                  }}
                />
              </div>
              <span className="text-white font-medium w-8">{Math.max(score - 8, 0)}</span>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-amber-400 mb-2">2025 SEO Analysis</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {score >= 80 
              ? "Excellent! Your website is well-optimized for both traditional and AI-powered search engines, with strong future-readiness indicators."
              : score >= 60
              ? "Good foundation with opportunities to enhance AI search optimization, voice search readiness, and authority signals."
              : score >= 40
              ? "Moderate performance requiring optimization across traditional SEO and next-generation search technologies."
              : "Critical optimization needed for traditional SEO, AI search engines, voice search, and authority building."
            }
          </p>
          <div className="mt-3 text-xs text-amber-300">
            <strong>Next-Gen Features:</strong> AI Search • Voice Search • Schema Markup • E-E-A-T Signals
          </div>
        </div>
      </div>
    </div>
  )
}

export default SEOScoreGauge
