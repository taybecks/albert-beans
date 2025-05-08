interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full px-4 py-2">
      <div className="relative pt-1">
        <div className="flex items-center justify-between">
          <div className="text-xs text-center text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
        <div className="flex h-2 overflow-hidden bg-gray-200 rounded">
          <div style={{ width: `${(currentStep / totalSteps) * 100}%` }} className="bg-[#0f172a]"></div>
        </div>
      </div>
    </div>
  )
}
