import { getFAQs } from '@/lib/cosmic'
import { FAQ } from '@/types'
import FAQAccordion from '@/components/FAQAccordion'

export default async function FAQPage() {
  const allFaqs = await getFAQs() as FAQ[]
  
  // Group FAQs by category
  const faqsByCategory = allFaqs.reduce((acc, faq) => {
    const category = faq.metadata?.category?.value || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)
  
  const categoryOrder = ['General', 'Privacy', 'Threats', 'Tools']
  
  return (
    <div className="min-h-screen py-12 bg-dark">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Security Questions Answered
          </h1>
          <p className="text-gray-300 text-lg">
            Find answers to common questions about digital security, threats, and protection methods.
          </p>
        </div>

        {categoryOrder.map((category) => {
          const categoryFaqs = faqsByCategory[category]
          if (!categoryFaqs || categoryFaqs.length === 0) {
            return null
          }
          
          return (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded text-sm">
                  {category}
                </span>
              </h2>
              <FAQAccordion faqs={categoryFaqs} />
            </section>
          )
        })}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-blue-100 mb-6">
            Explore our threat intelligence and security guides for more detailed information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/threats"
              className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Threat Intelligence
            </a>
            <a 
              href="/guides"
              className="bg-primary-dark hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Security Guides
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}