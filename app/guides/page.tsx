import Link from 'next/link'
import { getSecurityGuides } from '@/lib/cosmic'
import { SecurityGuide } from '@/types'

export default async function GuidesPage() {
  const guides = await getSecurityGuides() as SecurityGuide[]
  
  // Group guides by platform
  const iosGuides = guides.filter(g => g.metadata?.platform?.value === 'iOS')
  const androidGuides = guides.filter(g => g.metadata?.platform?.value === 'Android')
  const bothGuides = guides.filter(g => g.metadata?.platform?.value === 'Both Platforms')
  
  return (
    <div className="min-h-screen py-12 bg-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Security Hardening Wizard
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Device Security Guides
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Follow these step-by-step guides to significantly strengthen your device security. Each guide includes clear explanations of why each step matters.
          </p>
        </div>

        {/* iOS Guides */}
        {iosGuides.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.024 9.25c.47 0 .827-.433.637-.863a4 4 0 00-7.322 0c-.19.43.167.863.637.863h6.048z" />
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">iOS Guides</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {iosGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* Android Guides */}
        {androidGuides.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-success/10 p-2 rounded-lg">
                <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Android Guides</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {androidGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </section>
        )}

        {/* Both Platforms Guides */}
        {bothGuides.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-warning/10 p-2 rounded-lg">
                <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Universal Guides</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bothGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function GuideCard({ guide }: { guide: SecurityGuide }) {
  const difficultyColors = {
    'Beginner': 'bg-success/10 text-success',
    'Intermediate': 'bg-warning/10 text-warning',
    'Advanced': 'bg-danger/10 text-danger',
  }
  
  const difficultyColor = difficultyColors[guide.metadata?.difficulty_level?.value as keyof typeof difficultyColors] || 'bg-gray-500/10 text-gray-400'
  
  return (
    <Link href={`/guides/${guide.slug}`} className="card hover:border-primary transition-all duration-300 flex flex-col">
      {guide.metadata?.featured_image && (
        <img 
          src={`${guide.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
          alt={guide.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}
      
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-medium px-2 py-1 rounded ${difficultyColor}`}>
          {guide.metadata?.difficulty_level?.value || 'Intermediate'}
        </span>
        {guide.metadata?.estimated_time && (
          <span className="text-xs text-gray-400">
            {guide.metadata.estimated_time}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">
        {guide.metadata?.guide_title || guide.title}
      </h3>
      
      <div 
        className="text-gray-300 text-sm line-clamp-3 flex-1"
        dangerouslySetInnerHTML={{ __html: guide.metadata?.introduction || '' }}
      />
      
      <div className="mt-4 pt-4 border-t border-dark-light">
        <div className="flex items-center text-primary text-sm font-medium">
          Start Guide
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}