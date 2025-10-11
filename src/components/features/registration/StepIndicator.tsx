import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '~/lib/utils';
import type { FormStep, StepConfig } from '~/types/registration';

interface StepIndicatorProps {
  steps: StepConfig[];
  currentStep: FormStep;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-6 sm:py-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto px-4">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.step;
          const isCurrent = currentStep === step.step;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.step}>
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 border-2',
                    isCompleted &&
                      'bg-primary border-primary text-primary-foreground shadow-lg',
                    isCurrent &&
                      'bg-primary border-primary text-primary-foreground scale-110 shadow-xl ring-4 ring-primary/20',
                    !isCompleted &&
                      !isCurrent &&
                      'bg-muted border-muted-foreground/20 text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <span>{step.step}</span>
                  )}
                </div>

                {/* Step Label - Hidden on mobile */}
                <div className="mt-2 text-center hidden sm:block">
                  <div
                    className={cn(
                      'text-xs sm:text-sm font-medium',
                      isCurrent ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground max-w-[100px] mx-auto">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-2 transition-all duration-300',
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile: Show current step info */}
      <div className="mt-4 text-center sm:hidden">
        <div className="text-sm font-medium text-primary">
          {steps[currentStep - 1].title}
        </div>
        <div className="text-xs text-muted-foreground">
          {steps[currentStep - 1].description}
        </div>
      </div>
    </div>
  );
}

