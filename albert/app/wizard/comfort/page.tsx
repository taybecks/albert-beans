"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProgressBar } from "@components/progress-bar"

import { LevelsMap } from "@/app/models/elements"
import { useFormContext } from "react-hook-form"
import { watch } from "fs"

export default function ComfortPage() {
  const router = useRouter()
  const { getValues, setValue, watch } = useFormContext()
  const level = watch("level")
  const program = LevelsMap[level as keyof typeof LevelsMap]
  const selectedElements = watch("selectedElements")
  const comfortLevels = watch("comfortLevels")
  const [activeTab, setActiveTab] = useState("jumps")

  useEffect(() => {
      const initialComfortLevels: Record<string, number> = {}
      selectedElements.jumps.forEach((id: string) => {
        initialComfortLevels[id] = 50
      })
      selectedElements.spins.forEach((id: string) => {
        initialComfortLevels[id] = 50
      })
      selectedElements.steps.forEach((id: string) => {
        initialComfortLevels[id] = 50
      })
      setValue("comfortLevels", initialComfortLevels)
  }, [])

  const handleComfortChange = (elementId: string, value: number[]) => {
    setValue("comfortLevels", {
      ...getValues("comfortLevels"),
      [elementId]: value[0],
    })
  }

  const handleGenerateProgram = () => {
    // In a real app, you would save this to state management or localStorage
    console.log(getValues("comfortLevels"))
    router.push("/wizard/program")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <Link href="/wizard/elements" className="inline-flex items-center text-gray-600">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Back</span>
        </Link>
      </header>

      <ProgressBar currentStep={3} totalSteps={4} />

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 text-center gradient-text">Rate Your Comfort Level</h1>

        <Tabs defaultValue="jumps" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-pink-100 rounded-full">
            <TabsTrigger value="jumps">Jumps</TabsTrigger>
            <TabsTrigger value="spins">Spins</TabsTrigger>
            <TabsTrigger value="steps">Step Sequences</TabsTrigger>
          </TabsList>

          <TabsContent value="jumps" className="mt-0 space-y-8">
            {selectedElements.jumps.length === 0 ? (
              <p className="text-center text-pink-400 py-8">No jump elements selected</p>
            ) : (
              selectedElements.jumps.map((elementId: string) => (
                <div key={elementId} className="card">
                  <h3 className="text-lg font-medium mb-6 gradient-text">
                    {program.jumps[elementId as keyof typeof program.jumps]?.label}
                  </h3>
                  <div className="px-4">
                    <div className="flex justify-between mb-2 text-sm text-pink-400">
                      <span>Less comfortable</span>
                      <span>More comfortable</span>
                    </div>
                    <Slider
                      defaultValue={[comfortLevels[elementId] || 50]}
                      max={100}
                      step={1}
                      onValueChange={(value: number[]) => handleComfortChange(elementId, value)}
                    />
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="spins" className="mt-0 space-y-8">
            {selectedElements.spins.length === 0 ? (
              <p className="text-center text-pink-400 py-8">No spin elements selected</p>
            ) : (
              selectedElements.spins.map((elementId: string) => (
                <div key={elementId} className="card">
                  <h3 className="text-lg font-medium mb-6 gradient-text">
                    {program.spins[elementId as keyof typeof program.spins]?.label}
                  </h3>
                  <div className="px-4">
                    <div className="flex justify-between mb-2 text-sm text-pink-400">
                      <span>Less comfortable</span>
                      <span>More comfortable</span>
                    </div>
                    <Slider
                      defaultValue={[comfortLevels[elementId] || 50]}
                      max={100}
                      step={1}
                      onValueChange={(value: number[]) => handleComfortChange(elementId, value)}
                    />
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="steps" className="mt-0 space-y-8">
            {selectedElements.steps.length === 0 ? (
              <p className="text-center text-pink-400 py-8">No step sequence elements selected</p>
            ) : (
              selectedElements.steps.map((elementId: string) => (
                <div key={elementId} className="card">
                  <h3 className="text-lg font-medium mb-6 gradient-text">
                    {program.other[elementId as keyof typeof program.other]?.label}
                  </h3>
                  <div className="px-4">
                    <div className="flex justify-between mb-2 text-sm text-pink-400">
                      <span>Less comfortable</span>
                      <span>More comfortable</span>
                    </div>
                    <Slider
                      defaultValue={[comfortLevels[elementId] || 50]}
                      max={100}
                      step={1}
                      onValueChange={(value: number[]) => handleComfortChange(elementId, value)}
                    />
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <Button
            onClick={handleGenerateProgram}
            disabled={selectedElements.length === 0}
            className="btn-gradient px-8 py-2 text-lg"
          >
            Generate Program <span className="ml-2">→</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
