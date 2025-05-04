import React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepProps {
  title: string
  isActive?: boolean
  isCompleted?: boolean
}

export function Step({ title, isActive, isCompleted }: StepProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full border-2 mb-1",
          isActive && "border-primary bg-primary text-primary-foreground",
          isCompleted && "border-primary bg-primary text-primary-foreground",
          !isActive && !isCompleted && "border-gray-300 text-gray-300",
        )}
      >
        {isCompleted ? <Check className="w-4 h-4" /> : null}
        {isActive && !isCompleted && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <span
        className={cn(
          "text-xs",
          isActive && "text-primary font-medium",
          isCompleted && "text-primary",
          !isActive && !isCompleted && "text-gray-500",
        )}
      >
        {title}
      </span>
    </div>
  )
}

interface StepperProps {
  activeStep: number
  children: React.ReactNode
  className?: string
}

export function Stepper({ activeStep, children, className }: StepperProps) {
  const steps = React.Children.toArray(children)

  return (
    <div className={cn("flex justify-between", className)}>
      {steps.map((step, index) => {
        if (React.isValidElement(step)) {
          return React.cloneElement(step, {
            isActive: activeStep === index,
            isCompleted: activeStep > index,
          })
        }
        return step
      })}
    </div>
  )
}
