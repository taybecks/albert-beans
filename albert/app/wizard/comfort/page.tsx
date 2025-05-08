"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProgressBar } from "@components/progress-bar"

// Sample data - in a real app this would be more extensive and categorized
const allElements = {
  "triple-axel": { name: "Triple Axel", category: "jumps" },
  "triple-lutz": { name: "Triple Lutz", category: "jumps" },
  "triple-flip": { name: "Triple Flip", category: "jumps" },
  "triple-toe": { name: "Triple Toe", category: "jumps" },
  "triple-salchow": { name: "Triple Salchow", category: "jumps" },
  "double-axel": { name: "Double Axel", category: "jumps" },
  "flying-sit-spin": { name: "Flying Sit Spin", category: "spins" },
  "layback-spin": { name: "Layback Spin", category: "spins" },
  "camel-spin": { name: "Camel Spin", category: "spins" },
  "sit-spin": { name: "Sit Spin", category: "spins" },
  "combination-spin": { name: "Combination Spin", category: "spins" },
  "straight-line-step": { name: "Straight Line Step Sequence", category: "steps" },
  "circular-step": { name: "Circular Step Sequence", category: "steps" },
  "serpentine-step": { name: "Serpentine Step Sequence", category: "steps" },
}

export default function ComfortPage() {
  const router = useRouter()
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [comfortLevels, setComfortLevels] = useState<Record<string, number>>({})
  const [activeTab, setActiveTab] = useState("jumps")

  useEffect(() => {
    // In a real app, you would get this from state management or localStorage
    const storedElements = localStorage.getItem("selectedElements")
    if (storedElements) {
      const elements = JSON.parse(storedElements)
      setSelectedElements(elements)

      // Initialize comfort levels to 50 (middle of slider)
      const initialComfortLevels: Record<string, number> = {}
      elements.forEach((elementId: string) => {
        initialComfortLevels[elementId] = 50
      })
      setComfortLevels(initialComfortLevels)
    }
  }, [])

  const handleComfortChange = (elementId: string, value: number[]) => {
    setComfortLevels({
      ...comfortLevels,
      [elementId]: value[0],
    })
  }

  const getElementsByCategory = (category: string) => {
    return selectedElements.filter(
      (elementId) => allElements[elementId as keyof typeof allElements]?.category === category,
    )
  }

  const handleGenerateProgram = () => {
    // In a real app, you would save this to state management or localStorage
    localStorage.setItem("comfortLevels", JSON.stringify(comfortLevels))
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
        <h1 className="text-3xl font-bold mb-8 text-center">Rate Your Comfort Level</h1>

        <Tabs defaultValue="jumps" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="jumps">Jumps</TabsTrigger>
            <TabsTrigger value="spins">Spins</TabsTrigger>
            <TabsTrigger value="steps">Step Sequences</TabsTrigger>
          </TabsList>

          <TabsContent value="jumps" className="mt-0 space-y-8">
            {getElementsByCategory("jumps").length === 0 ? (
              <p className="text-center text-gray-500 py-8">No jump elements selected</p>
            ) : (
              getElementsByCategory("jumps").map((elementId) => (
                <div key={elementId} className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-6">
                    {allElements[elementId as keyof typeof allElements]?.name}
                  </h3>
                  <div className="px-4">
                    <div className="flex justify-between mb-2 text-sm text-gray-500">
                      <span>Less comfortable</span>
                      <span>More comfortable</span>
                    </div>
                    <Slider
                      defaultValue={[comfortLevels[elementId] || 50]}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleComfortChange(elementId, value)}
                    />
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="spins" className="mt-0 space-y-8">
            {getElementsByCategory("spins").length === 0 ? (
              <p className="text-center text-gray-500 py-8">No spin elements selected</p>
            ) : (
              getElementsByCategory("spins").map((elementId) => (
                <div key={elementId} className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-6">
                    {allElements[elementId as keyof typeof allElements]?.name}
                  </h3>
                  <div className="px-4">
                    <div className="flex justify-between mb-2 text-sm text-gray-500">
                      <span>Less comfortable</span>
                      <span>More comfortable</span>
                    </div>
                    <Slider
                      defaultValue={[comfortLevels[elementId] || 50]}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleComfortChange(elementId, value)}
                    />
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="steps" className="mt-0 space-y-8">
            {getElementsByCategory("steps").length === 0 ? (
              <p className="text-center text-gray-500 py-8">No step sequence elements selected</p>
            ) : (
              getElementsByCategory("steps").map((elementId) => (
                <div key={elementId} className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-6">
                    {allElements[elementId as keyof typeof allElements]?.name}
                  </h3>
                  <div className="px-4">
                    <div className="flex justify-between mb-2 text-sm text-gray-500">
                      <span>Less comfortable</span>
                      <span>More comfortable</span>
                    </div>
                    <Slider
                      defaultValue={[comfortLevels[elementId] || 50]}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleComfortChange(elementId, value)}
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
            className="bg-[#0f172a] px-8"
          >
            Generate Program <span className="ml-2">→</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
