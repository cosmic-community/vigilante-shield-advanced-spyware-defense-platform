'use client'

import { useState } from 'react'

export default function LinkAnalyzerForm() {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      return
    }
    
    setIsAnalyzing(true)
    
    // Simulate API call with demo data
    // In production, this would call your FastAPI backend
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Demo result based on simple heuristics
    const isDemoSafe = url.includes('google') || url.includes('github') || url.includes('cosmicjs')
    const isDemoRisky = url.includes('bit.ly') || url.includes('.tk') || url.includes('free')
    
    const demoResult = {
      url: url,
      risk_level: isDemoSafe ? 'low' : isDemoRisky ? 'high' : 'medium',
      risk_score: isDemoSafe ? 15 : isDemoRisky ? 85 : 50,
      threats_found: isDemoRisky ? ['Suspicious TLD', 'URL shortener detected'] : [],
      domain_age_days: isDemoSafe ? 5000 : 15,
      is_suspicious: !isDemoSafe,
      analysis_details: {
        domain_check: isDemoSafe ? 'Established domain' : 'New or suspicious domain',
        ssl_check: isDemoSafe ? 'Valid SSL certificate' : 'SSL certificate check required',
        threat_db_check: isDemoRisky ? 'Found in threat database' : 'Not found in threat databases',
        reputation_check: isDemoSafe ? 'Good reputation' : 'Unknown reputation',
      },
      recommendations: isDemoSafe 
        ? ['URL appears safe to visit']
        : isDemoRisky
        ? ['Do not click this link', 'Verify source through alternative channel', 'Report to security team']
        : ['Exercise caution', 'Verify the source', 'Check for HTTPS']
    }
    
    setResult(demoResult)
    setIsAnalyzing(false)
  }
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success'
      case 'medium': return 'text-warning'
      case 'high': return 'text-danger'
      default: return 'text-gray-400'
    }
  }
  
  const getRiskBg = (level: string) => {
    switch (level) {
      case 'low': return 'bg-success/10 border-success/20'
      case 'medium': return 'bg-warning/10 border-warning/20'
      case 'high': return 'bg-danger/10 border-danger/20'
      default: return 'bg-gray-500/10 border-gray-500/20'
    }
  }
  
  return (
    <div>
      <form onSubmit={handleAnalyze} className="card mb-8">
        <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
          Enter URL to analyze
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://suspicious-link.com"
            className="flex-1 bg-dark border border-dark-light rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            required
          />
          <button
            type="submit"
            disabled={isAnalyzing}
            className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {result && (
        <div className={`card border ${getRiskBg(result.risk_level)}`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-2xl font-bold ${getRiskColor(result.risk_level)} uppercase`}>
                  {result.risk_level} Risk
                </span>
                <span className="text-gray-400">
                  Score: {result.risk_score}/100
                </span>
              </div>
              <p className="text-gray-300 break-all">{result.url}</p>
            </div>
          </div>

          {/* Threats Found */}
          {result.threats_found.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Threats Detected</h3>
              <div className="space-y-2">
                {result.threats_found.map((threat: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-danger">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{threat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Analysis Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(result.analysis_details).map(([key, value]) => (
                <div key={key} className="bg-dark-lighter p-3 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                  <div className="text-white">{value as string}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}