'use client'

import { useState, useEffect } from 'react'

interface Step {
  step: number
  title: string
  instruction: string
  explanation: string
}

interface GuideStepsProps {
  steps: Step[]
  guideId: string
}

export default function GuideSteps({ steps, guideId }: GuideStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  
  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`guide-progress-${guideId}`)
    if (saved) {
      try {
        const progress = JSON.parse(saved)
        setCompletedSteps(progress.completedSteps || [])
      } catch (e) {
        // Invalid saved data, ignore
      }
    }
  }, [guideId])
  
  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`guide-progress-${guideId}`, JSON.stringify({
      guideId,
      completedSteps,
      lastUpdated: new Date().toISOString()
    }))
  }, [completedSteps, guideId])
  
  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepNumber)
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    )
  }
  
  const progress = (completedSteps.length / steps.length) * 100
  
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">
            Progress: {completedSteps.length} of {steps.length} steps completed
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-dark-lighter rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.step)
          
          return (
            <div 
              key={step.step}
              className={`card cursor-pointer transition-all ${
                isCompleted ? 'border-success' : 'border-dark-light'
              }`}
              onClick={() => toggleStep(step.step)}
            >
              <div className="flex items-start gap-4">
                {/* Step Number / Checkbox */}
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold">
                      {step.step}
                    </div>
                  )}
                </div>
                
                {/* Step Content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${isCompleted ? 'text-success' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-300 mb-3 font-medium">
                    {step.instruction}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {step.explanation}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {completedSteps.length === steps.length && (
        <div className="mt-6 bg-success/10 border border-success/20 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-success mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-success mb-2">
            Guide Completed!
          </h3>
          <p className="text-gray-300">
            Congratulations on strengthening your device security. Your progress has been saved locally.
          </p>
        </div>
      )}
    </div>
  )
}