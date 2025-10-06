import LinkAnalyzerForm from '@/components/LinkAnalyzerForm'

export default function LinkAnalyzerPage() {
  return (
    <div className="min-h-screen py-12 bg-dark">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Link & SMS Analyzer
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Analyze Suspicious Links
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Check URLs before clicking. Our analyzer compares against threat databases, analyzes domain reputation, and provides instant risk assessment.
          </p>
        </div>

        <LinkAnalyzerForm />

        {/* How It Works Section */}
        <div className="mt-16 card">
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Threat Database Check</h3>
                <p className="text-gray-300">
                  We compare the URL against AlienVault OTX and VirusTotal databases containing millions of known malicious domains reported by security researchers worldwide.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Domain Analysis</h3>
                <p className="text-gray-300">
                  We check domain registration date (newly registered domains are often used by attackers), SSL certificate validity, and domain reputation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Pattern Recognition</h3>
                <p className="text-gray-300">
                  We analyze URL patterns for suspicious TLDs, excessive subdomains, URL shorteners, and homograph attacks (lookalike characters).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Risk Assessment</h3>
                <p className="text-gray-300">
                  Results are categorized as Low (green), Medium (yellow), or High (red) risk with detailed explanations and recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-warning/10 border border-warning/20 rounded-lg p-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-warning flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-warning mb-2">Important Limitations</h3>
              <p className="text-gray-300 text-sm">
                This tool cannot catch zero-day threats or highly targeted attacks using unknown domains. Always use judgment: If a link is unexpected, verify through another channel. If it's urgent or threatening, it's probably phishing. When in doubt, don't click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}