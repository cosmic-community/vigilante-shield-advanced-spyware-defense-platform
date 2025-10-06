'use client'

import { useState } from 'react'
import { FAQ } from '@/types'

interface FAQAccordionProps {
  faqs: FAQ[]
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        
        return (
          <div key={faq.id} className="card">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex items-start justify-between gap-4"
            >
              <h3 className="text-lg font-semibold text-white flex-1">
                {faq.metadata?.question || faq.title}
              </h3>
              <svg 
                className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div 
                className="mt-4 pt-4 border-t border-dark-light text-gray-300 prose-custom"
                dangerouslySetInnerHTML={{ __html: faq.metadata?.answer || '' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}