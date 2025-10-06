import Link from 'next/link'
import { getThreatCategories } from '@/lib/cosmic'
import { ThreatCategory } from '@/types'

export default async function ThreatsPage() {
  const threats = await getThreatCategories() as ThreatCategory[]
  
  // Sort by severity
  const severityOrder = { 'Critical': 1, 'High': 2, 'Medium': 3, 'Low': 4 }
  const sortedThreats = threats.sort((a, b) => {
    const severityA = severityOrder[a.metadata?.severity_level?.value as keyof typeof severityOrder] || 5
    const severityB = severityOrder[b.metadata?.severity_level?.value as keyof typeof severityOrder] || 5
    return severityA - severityB
  })
  
  return (
    <div className="min-h-screen py-12 bg-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Threat Intelligence
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Current Threat Landscape
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Understand the threats targeting journalists, activists, and high-risk individuals. Learn how they work and how to protect yourself.
          </p>
        </div>

        <div className="grid gap-8">
          {sortedThreats.map((threat) => (
            <ThreatCard key={threat.id} threat={threat} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ThreatCard({ threat }: { threat: ThreatCategory }) {
  const severityColors = {
    'Critical': 'bg-danger text-white',
    'High': 'bg-warning text-white',
    'Medium': 'bg-blue-500 text-white',
    'Low': 'bg-success text-white',
  }
  
  const severityColor = severityColors[threat.metadata?.severity_level?.value as keyof typeof severityColors] || 'bg-gray-500 text-white'
  
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row gap-6">
        {threat.metadata?.icon && (
          <img 
            src={`${threat.metadata.icon.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={threat.title}
            className="w-full md:w-48 h-48 object-cover rounded-lg"
          />
        )}
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded ${severityColor}`}>
                  {threat.metadata?.severity_level?.value || 'Unknown'}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {threat.metadata?.threat_name || threat.title}
                </h2>
              </div>
            </div>
          </div>
          
          <div 
            className="text-gray-300 mb-6 prose-custom"
            dangerouslySetInnerHTML={{ __html: threat.metadata?.description || '' }}
          />
          
          <Link 
            href={`/threats/${threat.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            Learn More About This Threat
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {threat.metadata?.related_guides && threat.metadata.related_guides.length > 0 && (
            <div className="mt-6 pt-6 border-t border-dark-light">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
                Related Protection Guides
              </h3>
              <div className="flex flex-wrap gap-2">
                {threat.metadata.related_guides.map((guide: any) => (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.slug}`}
                    className="text-sm text-primary hover:text-primary-dark bg-primary/10 px-3 py-1 rounded transition-colors"
                  >
                    {guide.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}