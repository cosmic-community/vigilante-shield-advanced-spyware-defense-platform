import Link from 'next/link'
import { getThreatCategories, getSecurityGuides } from '@/lib/cosmic'
import { ThreatCategory, SecurityGuide } from '@/types'

export default async function Home() {
  const threats = await getThreatCategories() as ThreatCategory[]
  const guides = await getSecurityGuides() as SecurityGuide[]
  
  // Get featured threats (critical severity)
  const featuredThreats = threats.filter(threat => 
    threat.metadata?.severity_level?.value === 'Critical'
  ).slice(0, 2)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark via-dark-lighter to-dark py-20 border-b border-dark-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-danger/10 text-danger px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Defense Against Advanced Threats
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Vigilante Shield
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Proactive Defense Against Advanced Spyware for Journalists, Activists, and High-Risk Individuals
            </p>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Get real-time threat intelligence, analyze suspicious links, and follow step-by-step guides to harden your devices. Privacy-first, no data collection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/link-analyzer" className="btn-primary px-8 py-3 text-lg">
                Analyze Link Now
              </Link>
              <Link href="/guides" className="btn-secondary px-8 py-3 text-lg">
                Security Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tools Section */}
      <section className="py-16 bg-dark">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Three Essential Security Tools
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Link Analyzer */}
            <Link href="/link-analyzer" className="card hover:border-primary transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Link Analyzer</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Check suspicious URLs before clicking. Analyzes domain age, threat databases, and reputation to assess risk level.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                Analyze Now
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Security Guides */}
            <Link href="/guides" className="card hover:border-success transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-success/10 p-3 rounded-lg group-hover:bg-success/20 transition-colors">
                  <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Hardening Wizard</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Step-by-step guides to secure iOS and Android devices. Enable Lockdown Mode, review permissions, and more.
              </p>
              <div className="flex items-center text-success font-medium group-hover:gap-2 transition-all">
                View Guides
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Threat Intelligence */}
            <Link href="/threats" className="card hover:border-warning transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-warning/10 p-3 rounded-lg group-hover:bg-warning/20 transition-colors">
                  <svg className="w-8 h-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Threat Intelligence</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Learn about current threat landscape. Understand spyware, phishing, and other attacks targeting high-risk users.
              </p>
              <div className="flex items-center text-warning font-medium group-hover:gap-2 transition-all">
                Explore Threats
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Threats Section */}
      {featuredThreats.length > 0 && (
        <section className="py-16 bg-dark-lighter">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                Critical Threats to Know
              </h2>
              <Link href="/threats" className="text-primary hover:text-primary-dark font-medium flex items-center gap-1">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {featuredThreats.map((threat) => (
                <div key={threat.id} className="card">
                  <div className="flex items-start gap-4 mb-4">
                    {threat.metadata?.icon && (
                      <img 
                        src={`${threat.metadata.icon.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={threat.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger text-white">
                          Critical
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {threat.metadata?.threat_name || threat.title}
                        </h3>
                      </div>
                      <div 
                        className="text-gray-300 text-sm prose-custom"
                        dangerouslySetInnerHTML={{ __html: threat.metadata?.description || '' }}
                      />
                    </div>
                  </div>
                  <Link 
                    href={`/threats/${threat.slug}`}
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Start Guides */}
      <section className="py-16 bg-dark">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              Quick Start Guides
            </h2>
            <Link href="/guides" className="text-primary hover:text-primary-dark font-medium flex items-center gap-1">
              View All Guides
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {guides.slice(0, 4).map((guide) => (
              <Link 
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="card hover:border-primary transition-all duration-300"
              >
                {guide.metadata?.featured_image && (
                  <img 
                    src={`${guide.metadata.featured_image.imgix_url}?w=600&h=200&fit=crop&auto=format,compress`}
                    alt={guide.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {guide.metadata?.platform?.value || 'All Platforms'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {guide.metadata?.difficulty_level?.value || 'Intermediate'}
                  </span>
                  {guide.metadata?.estimated_time && (
                    <span className="text-xs text-gray-400">
                      • {guide.metadata.estimated_time}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {guide.metadata?.guide_title || guide.title}
                </h3>
                <div 
                  className="text-gray-300 text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: guide.metadata?.introduction || '' }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy-First Notice */}
      <section className="py-16 bg-dark-lighter border-t border-dark-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-6">
              <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Privacy-First Design
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Vigilante Shield collects zero personal data. All link analysis is anonymized, progress tracking happens locally in your browser, and we never log your activity.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-success font-bold text-2xl mb-2">0</div>
                <div className="text-gray-400">Personal Data Collected</div>
              </div>
              <div className="text-center">
                <div className="text-success font-bold text-2xl mb-2">100%</div>
                <div className="text-gray-400">Anonymous Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-success font-bold text-2xl mb-2">Local</div>
                <div className="text-gray-400">Progress Storage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Strengthen Your Security?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Start with our Link Analyzer to check suspicious URLs, then explore our comprehensive device hardening guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/link-analyzer" className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                Analyze Link Now
              </Link>
              <Link href="/faq" className="bg-primary-dark hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200">
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}