// app/threats/[slug]/page.tsx
import { getThreatCategory } from '@/lib/cosmic'
import { ThreatCategory } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ThreatDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const threat = await getThreatCategory(slug) as ThreatCategory | null
  
  if (!threat) {
    notFound()
  }
  
  const severityColors = {
    'Critical': 'bg-danger text-white',
    'High': 'bg-warning text-white',
    'Medium': 'bg-blue-500 text-white',
    'Low': 'bg-success text-white',
  }
  
  const severityColor = severityColors[threat.metadata?.severity_level?.value as keyof typeof severityColors] || 'bg-gray-500 text-white'
  
  return (
    <div className="min-h-screen py-12 bg-dark">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/threats"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Threat Intelligence
        </Link>

        {/* Threat Icon */}
        {threat.metadata?.icon && (
          <img 
            src={`${threat.metadata.icon.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
            alt={threat.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-bold px-3 py-1 rounded ${severityColor}`}>
              {threat.metadata?.severity_level?.value || 'Unknown'} Severity
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6">
            {threat.metadata?.threat_name || threat.title}
          </h1>
          
          <div 
            className="text-gray-300 text-lg prose-custom"
            dangerouslySetInnerHTML={{ __html: threat.metadata?.description || '' }}
          />
        </div>

        {/* How It Works */}
        {threat.metadata?.how_it_works && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <div 
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: threat.metadata.how_it_works }}
            />
          </div>
        )}

        {/* Protection Methods */}
        {threat.metadata?.protection_methods && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Protection Methods</h2>
            <div 
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: threat.metadata.protection_methods }}
            />
          </div>
        )}

        {/* Related Guides */}
        {threat.metadata?.related_guides && threat.metadata.related_guides.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Related Security Guides</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {threat.metadata.related_guides.map((guide: any) => (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  className="bg-dark-lighter hover:bg-dark-light border border-dark-light hover:border-primary p-4 rounded-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {guide.metadata?.platform?.value || 'All Platforms'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {guide.metadata?.difficulty_level?.value || 'Intermediate'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {guide.title}
                  </h3>
                  {guide.metadata?.estimated_time && (
                    <p className="text-sm text-gray-400">
                      {guide.metadata.estimated_time}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Take Action Now
          </h3>
          <p className="text-blue-100 mb-6">
            Follow our security guides to protect yourself against this threat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guides" className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-colors">
              View Security Guides
            </Link>
            <Link href="/link-analyzer" className="bg-primary-dark hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Analyze a Link
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}