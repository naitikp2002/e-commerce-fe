'use client'

import { useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Step {
  title: string
  content: React.ReactNode
}

interface StepperProps {
  steps: Step[]
}

export default function Stepper({ steps }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              <div className={`p-[20px] rounded-full
                w-10 h-10 flex items-center justify-center
                ${index <= currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'}
                ${index < currentStep ? 'bg-green-500' : ''}
                transition-all duration-300 ease-in-out
              `}>
                {index < currentStep ? (
                   <span><Check /></span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 w-full mx-2 ${
                  index < currentStep ? 'bg-primary' : 'bg-muted'
                } transition-all duration-300 ease-in-out`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span key={step.title} className={`text-sm font-medium
              ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}
              transition-all duration-300 ease-in-out
            `}>
              {step.title}
            </span>
          ))}
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {steps[currentStep].content}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={prevStep} 
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button 
            onClick={nextStep} 
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

