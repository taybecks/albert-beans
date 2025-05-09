"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProgressBar } from "@components/progress-bar"
import { X } from "lucide-react"

import { LevelsMap } from "@/app/models/elements"
import { useFormContext } from "react-hook-form"


export default function ElementsPage() {
  const router = useRouter()
  const { getValues, setValue, watch } = useFormContext()
  const level = watch("level")
  const availableElements = LevelsMap[level as keyof typeof LevelsMap]
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const selectedElementsMap = watch("selectedElements")
  const [activeTab, setActiveTab] = useState("jumps")

  const allElements = [] as any[]
  const jumpElements = availableElements.jumps
  const spinElements = availableElements.spins
  const stepElements = availableElements.other
  Object.keys(jumpElements).forEach(key => {
    allElements.push(jumpElements[key])
  })
  Object.keys(spinElements).forEach(key => {
    allElements.push(spinElements[key])
  })
  Object.keys(stepElements).forEach(key => {
    allElements.push(stepElements[key])
  })

  const handleElementToggle = (elementId: string, type: string) => {
    if (selectedElements.includes(elementId)) {
      setSelectedElements(selectedElements.filter((id) => id !== elementId))
      setValue("selectedElements", {
        ...selectedElementsMap,
        [type]: selectedElementsMap[type].filter((id: string) => id !== elementId),
      })
    } else {
      setSelectedElements([...selectedElements, elementId])
      setValue("selectedElements", {
        ...selectedElementsMap,
        [type]: [...selectedElementsMap[type], elementId],
      })
    }
  }

  const handleRemoveElement = (elementId: string, type: string) => {
    setSelectedElements(selectedElements.filter((id) => id !== elementId))
    setValue("selectedElements", {
      ...selectedElementsMap,
      [type]: selectedElementsMap[type].filter((id: string) => id !== elementId),
    })
  }

  const getElementNameById = (id: string) => {
    const element = allElements.find((el) => el.id === id)
    return element ? element.label : id
  }

  const handleContinue = () => {
    if (selectedElements.length > 0) {
      // In a real app, you would save this to state management or localStorage
      console.log(selectedElementsMap)
      setValue("selectedElements", selectedElementsMap)
      router.push("/wizard/comfort")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <Link href="/wizard/level" className="inline-flex items-center text-gray-600">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Back</span>
        </Link>
      </header>

      <ProgressBar currentStep={2} totalSteps={4} />

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Select Your Elements</h1>

        <Tabs defaultValue="jumps" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="jumps">Jumps</TabsTrigger>
            <TabsTrigger value="spins">Spins</TabsTrigger>
            <TabsTrigger value="steps">Step Sequences</TabsTrigger>
          </TabsList>

          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h2 className="font-medium mb-3">Selected Elements</h2>
            <div className="flex flex-wrap gap-2">
              {selectedElements.length === 0 ? (
                <p className="text-gray-500 text-sm">No elements selected yet</p>
              ) : (
                selectedElements.map((elementId) => (
                  <Badge key={elementId} variant="secondary" className="pl-3 pr-2 py-1.5 flex items-center gap-1">
                    {getElementNameById(elementId)}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 ml-1"
                      onClick={() => handleRemoveElement(elementId)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))
              )}
            </div>
          </div>

          <TabsContent value="jumps" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(jumpElements).map((elementId) => (
                <Button
                  key={elementId}
                  variant={selectedElements.includes(elementId) ? "default" : "outline"}
                  className={selectedElements.includes(elementId) ? "bg-[#0f172a]" : ""}
                  onClick={() => handleElementToggle(elementId, 'jumps')}
                >
                  {jumpElements[elementId].label}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spins" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(spinElements).map((elementId) => (
                <Button
                  key={elementId}
                  variant={selectedElements.includes(elementId) ? "default" : "outline"}
                  className={selectedElements.includes(elementId) ? "bg-[#0f172a]" : ""}
                  onClick={() => handleElementToggle(elementId, 'spins')}
                >
                  {spinElements[elementId].label}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="steps" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(stepElements).map((elementId) => (
                <Button
                  key={elementId}
                  variant={selectedElements.includes(elementId) ? "default" : "outline"}
                  className={selectedElements.includes(elementId) ? "bg-[#0f172a]" : ""}
                  onClick={() => handleElementToggle(elementId, 'steps')}
                >
                  {stepElements[elementId].label}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button onClick={handleContinue} disabled={selectedElements.length === 0} className="bg-[#0f172a] px-8">
            Continue <span className="ml-2">→</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
