import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Palette, 
  Upload, 
  Download, 
  Eye, 
  Save,
  Copy,
  Globe,
  Mail,
  Users,
  Building,
  Zap,
  Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'

const WhiteLabelPage = () => {
  const [brandSettings, setBrandSettings] = useState({
    companyName: 'Your Agency Name',
    companyLogo: '',
    primaryColor: '#f59e0b',
    secondaryColor: '#1e293b',
    accentColor: '#10b981',
    customDomain: 'youragency.com',
    footerText: '© 2025 Your Agency. All rights reserved.',
    contactEmail: 'support@youragency.com',
    reportTemplate: 'professional'
  })

  const { state } = useAuth()
  const navigate = useNavigate()

  // Check if user has access to white-label features (check localStorage for test mode)
  const hasWhiteLabelAccess = state.user?.whitelabelEnabled || localStorage.getItem('whitelabel_access') === 'true'
  
  if (!hasWhiteLabelAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="bg-slate-800/50 border-slate-700 max-w-md">
          <CardContent className="p-8 text-center">
            <Crown className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">White-Label Access Required</h2>
            <p className="text-slate-400 mb-6">
              White-label features are available with the Agency plan ($197/month). Upgrade to customize your reports and branding.
            </p>
            <Button 
              onClick={() => navigate('/pricing')}
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              Upgrade to Agency Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSave = async () => {
    try {
      // Simulate API call to save white-label settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('White-label settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBrandSettings(prev => ({
          ...prev,
          companyLogo: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
      toast.success('Logo uploaded successfully!')
    }
  }

  const generateSampleReport = () => {
    toast.success('Sample report generated! Check your downloads folder.')
    // In real implementation, this would generate a branded PDF report
  }

  const copyApiEndpoint = () => {
    const endpoint = `https://api.aiseoplatform.com/v1/audit?domain={domain}&brand=${state.user?.id}`
    navigator.clipboard.writeText(endpoint)
    toast.success('API endpoint copied to clipboard!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">White-Label Portal</h1>
            <p className="text-purple-200">
              Customize your SEO audit reports with your own branding and offer them to your clients.
            </p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            AGENCY FEATURE
          </Badge>
        </div>
      </div>

      {/* Brand Customization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Settings */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <span>Brand Customization</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              Customize your reports with your agency branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Company Name</label>
              <Input
                value={brandSettings.companyName}
                onChange={(e) => setBrandSettings(prev => ({ ...prev, companyName: e.target.value }))}
                className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Company Logo</label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
                  {brandSettings.companyLogo ? (
                    <img 
                      src={brandSettings.companyLogo} 
                      alt="Logo" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-slate-400 mt-1">
                    Recommended: 200x60px, PNG or SVG
                  </p>
                </div>
              </div>
            </div>

            {/* Color Scheme */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-300">Color Scheme</label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandSettings.primaryColor}
                      onChange={(e) => setBrandSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-8 h-8 rounded border border-slate-600"
                    />
                    <Input
                      value={brandSettings.primaryColor}
                      onChange={(e) => setBrandSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="text-xs bg-slate-900/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">Secondary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandSettings.secondaryColor}
                      onChange={(e) => setBrandSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-8 h-8 rounded border border-slate-600"
                    />
                    <Input
                      value={brandSettings.secondaryColor}
                      onChange={(e) => setBrandSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="text-xs bg-slate-900/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">Accent Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={brandSettings.accentColor}
                      onChange={(e) => setBrandSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-8 h-8 rounded border border-slate-600"
                    />
                    <Input
                      value={brandSettings.accentColor}
                      onChange={(e) => setBrandSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="text-xs bg-slate-900/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Contact Email</label>
                <Input
                  type="email"
                  value={brandSettings.contactEmail}
                  onChange={(e) => setBrandSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Custom Domain (Optional)</label>
                <Input
                  value={brandSettings.customDomain}
                  onChange={(e) => setBrandSettings(prev => ({ ...prev, customDomain: e.target.value }))}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500"
                  placeholder="reports.youragency.com"
                />
                <p className="text-xs text-slate-400">
                  Contact support to set up a custom domain for your reports
                </p>
              </div>
            </div>

            <Button 
              onClick={handleSave}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Brand Settings
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-400" />
              <span>Brand Preview</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              See how your reports will look with your branding
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mock Report Header */}
            <div 
              className="p-6 rounded-lg mb-4"
              style={{ backgroundColor: brandSettings.secondaryColor }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {brandSettings.companyLogo ? (
                    <img 
                      src={brandSettings.companyLogo} 
                      alt="Logo" 
                      className="h-8 w-auto"
                    />
                  ) : (
                    <div 
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: brandSettings.primaryColor }}
                    ></div>
                  )}
                  <span className="text-white font-bold">{brandSettings.companyName}</span>
                </div>
                <Badge style={{ backgroundColor: `${brandSettings.primaryColor}20`, color: brandSettings.primaryColor, borderColor: `${brandSettings.primaryColor}50` }}>
                  AI SEO AUDIT
                </Badge>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">
                AI Search Readiness Report
              </h2>
              <p className="text-slate-300 text-sm">
                Comprehensive analysis for example.com
              </p>
            </div>

            {/* Mock Score Display */}
            <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Overall AI Search Score</span>
                <div 
                  className="text-2xl font-bold"
                  style={{ color: brandSettings.accentColor }}
                >
                  87/100
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full"
                  style={{ 
                    backgroundColor: brandSettings.accentColor,
                    width: '87%'
                  }}
                ></div>
              </div>
            </div>

            {/* Mock Footer */}
            <div className="text-center p-4 border-t border-slate-700">
              <p className="text-slate-400 text-xs">
                {brandSettings.footerText}
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Contact: {brandSettings.contactEmail}
              </p>
            </div>

            <div className="flex space-x-2 mt-4">
              <Button 
                onClick={generateSampleReport}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Generate Sample
              </Button>
              <Button 
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API & Integration */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span>API Integration</span>
          </CardTitle>
          <CardDescription className="text-slate-400">
            Integrate our API into your existing systems and workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">API Endpoint</h3>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <code className="text-sm text-green-400 break-all">
                  https://api.aiseoplatform.com/v1/audit?domain={'{domain}'}&brand={state.user?.id}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyApiEndpoint}
                  className="mt-2 text-purple-400 hover:text-purple-300"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Endpoint
                </Button>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-white font-medium">Authentication</h4>
                <p className="text-slate-400 text-sm">
                  Use your API key in the Authorization header:
                </p>
                <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                  <code className="text-sm text-amber-400">
                    Authorization: Bearer your_api_key_here
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Usage Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-purple-400">1,247</div>
                  <p className="text-slate-400 text-sm">API Calls This Month</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <p className="text-slate-400 text-sm">Uptime</p>
                </div>
              </div>
              
              <Button 
                variant="outline"
                className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
                View API Documentation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Client Management</h3>
            <p className="text-slate-400 text-sm">
              Manage multiple clients with branded reports for each one.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Custom Domain</h3>
            <p className="text-slate-400 text-sm">
              Host reports on your own domain for complete brand consistency.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 text-center">
            <Building className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Reseller Program</h3>
            <p className="text-slate-400 text-sm">
              Earn commissions by referring other agencies to our platform.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WhiteLabelPage