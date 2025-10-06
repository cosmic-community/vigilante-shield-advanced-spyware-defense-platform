// app/guides/[slug]/page.tsx
import { getSecurityGuide } from '@/lib/cosmic'
import { SecurityGuide } from '@/types'
import { notFound } from 'next/navigation'
import GuideSteps from '@/components/GuideSteps'
import Link from 'next/link'

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getSecurityGuide(slug) as SecurityGuide | null
  
  if (!guide) {
    notFound()
  }
  
  const difficultyColors = {
    'Beginner': 'bg-success/10 text-success',
    'Intermediate': 'bg-warning/10 text-warning',
    'Advanced': 'bg-danger/10 text-danger',
  }
  
  const difficultyColor = difficultyColors[guide.metadata?.difficulty_level?.value as keyof typeof difficultyColors] || 'bg-gray-500/10 text-gray-400'
  
  return (
    <div className="min-h-screen py-12 bg-dark">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/guides"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Guides
        </Link>

        {/* Featured Image */}
        {guide.metadata?.featured_image && (
          <img 
            src={`${guide.metadata.featured_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
            alt={guide.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded">
              {guide.metadata?.platform?.value || 'All Platforms'}
            </span>
            <span className={`text-sm font-medium px-3 py-1 rounded ${difficultyColor}`}>
              {guide.metadata?.difficulty_level?.value || 'Intermediate'}
            </span>
            {guide.metadata?.estimated_time && (
              <span className="text-sm text-gray-400">
                Estimated time: {guide.metadata.estimated_time}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            {guide.metadata?.guide_title || guide.title}
          </h1>
          
          <div 
            className="text-gray-300 text-lg prose-custom"
            dangerouslySetInnerHTML={{ __html: guide.metadata?.introduction || '' }}
          />
        </div>

        {/* Steps */}
        {guide.metadata?.steps && guide.metadata.steps.length > 0 && (
          <GuideSteps 
            steps={guide.metadata.steps}
            guideId={guide.id}
          />
        )}

        {/* Why This Matters */}
        {guide.metadata?.why_this_matters && (
          <div className="mt-12 card">
            <h2 className="text-2xl font-bold text-white mb-4">Why This Matters</h2>
            <div 
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: guide.metadata.why_this_matters }}
            />
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need More Help?
          </h3>
          <p className="text-blue-100 mb-6">
            Check out our FAQ section or explore other security guides to strengthen your protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq" className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-colors">
              View FAQ
            </Link>
            <Link href="/guides" className="bg-primary-dark hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              More Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}