"use client"

import { useState } from "react"
import { FloatingActionButton } from "@components/floating-action-button"
import { TrainingPerformanceModal } from "@components/training-performance-modal"
import { toast } from "sonner"
import { usePerformance } from "@lib/performance-client"
import type { TrainingPerformanceData } from "@lib/database.types"

export function TrainingButtonWrapper() {
  const [trainingModalOpen, setTrainingModalOpen] = useState(false)
  const { savePerformance } = usePerformance()

  const handleSaveTrainingPerformance = async (data: TrainingPerformanceData) => {
    try {
      // Save the performance to localStorage
      await savePerformance(data)

      // Show success toast
      toast("Training performance recorded", {
        description: `Session on ${data.date.toLocaleDateString()} has been saved.`,
      })
    } catch (error) {
      console.error("Error saving training performance:", error)
      toast("Error saving performance", { 
        description: "There was a problem saving your training data. Please try again.",
      })
    }
  }

  return (
    <>
      <FloatingActionButton onClick={() => setTrainingModalOpen(true)} />
      <TrainingPerformanceModal
        open={trainingModalOpen}
        onOpenChange={setTrainingModalOpen}
        onSave={handleSaveTrainingPerformance}
      />
    </>
  )
}
