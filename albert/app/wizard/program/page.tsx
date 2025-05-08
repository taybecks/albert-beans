"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Mail } from "lucide-react"
import Link from "next/link"
import { ProgressBar } from "@components/progress-bar"

// Sample data - in a real app this would come from an algorithm
const elementValues = {
  "triple-axel": 8.0,
  "triple-lutz": 5.9,
  "triple-toe": 4.2,
  "flying-sit-spin": 4.5,
  "straight-line-step": 3.9,
}

// Sample combinations
const combinations = {
  "triple-lutz+triple-toe": {
    name: "Triple Lutz + Triple Toe",
    value: 10.1,
    elements: ["triple-lutz", "triple-toe"],
  },
}

export default function ProgramPage() {
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [comfortLevels, setComfortLevels] = useState<Record<string, number>>({})
  const [programElements, setProgramElements] = useState<any[]>([])
  const [baseValue, setBaseValue] = useState(0)

  useEffect(() => {
    // In a real app, you would get this from state management or localStorage
    const storedElements = localStorage.getItem("selectedElements")
    const storedComfort = localStorage.getItem("comfortLevels")

    if (storedElements) {
      setSelectedElements(JSON.parse(storedElements))
    }

    if (storedComfort) {
      setComfortLevels(JSON.parse(storedComfort))
    }

    // Generate program based on elements and comfort levels
    generateProgram()
  }, [])

  const generateProgram = () => {
    // This is a simplified algorithm - in a real app, this would be more sophisticated
    // and would take into account competition rules, required elements, etc.

    // For this example, we'll just use some predefined elements and values
    const program = []
    let totalValue = 0

    // Add a jump combination
    if (selectedElements.includes("triple-lutz") && selectedElements.includes("triple-toe")) {
      program.push({
        id: "triple-lutz+triple-toe",
        name: "Triple Lutz + Triple Toe",
        value: combinations["triple-lutz+triple-toe"].value,
        category: "jumps",
      })
      totalValue += combinations["triple-lutz+triple-toe"].value
    } else if (selectedElements.includes("triple-axel")) {
      program.push({
        id: "triple-axel",
        name: "Triple Axel",
        value: elementValues["triple-axel"],
        category: "jumps",
      })
      totalValue += elementValues["triple-axel"]
    }

    // Add a spin
    if (selectedElements.includes("flying-sit-spin")) {
      program.push({
        id: "flying-sit-spin",
        name: "Flying Sit Spin",
        value: elementValues["flying-sit-spin"],
        category: "spins",
      })
      totalValue += elementValues["flying-sit-spin"]
    }

    // Add a step sequence
    if (selectedElements.includes("straight-line-step")) {
      program.push({
        id: "straight-line-step",
        name: "Straight Line Step Sequence",
        value: elementValues["straight-line-step"],
        category: "steps",
      })
      totalValue += elementValues["straight-line-step"]
    }

    setProgramElements(program)
    setBaseValue(Number.parseFloat(totalValue.toFixed(2)))
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download functionality would be implemented here")
  }

  const handleEmailToCoach = () => {
    // In a real app, this would open an email form or send directly
    alert("Email to coach functionality would be implemented here")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <Link href="/wizard/comfort" className="inline-flex items-center text-gray-600">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Back</span>
        </Link>
      </header>

      <ProgressBar currentStep={4} totalSteps={4} />

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Program</h1>

        <div className="w-full bg-gray-50 rounded-lg p-6 mb-8 flex justify-between items-center">
          <h2 className="text-xl font-medium">Program Overview</h2>
          <div className="text-right">
            <div className="text-sm text-gray-500">Base Value</div>
            <div className="text-2xl font-bold">{baseValue.toFixed(2)}</div>
          </div>
        </div>

        <div className="w-full space-y-6">
          {programElements.filter((el) => el.category === "jumps").length > 0 && (
            <div className="border rounded-lg p-6">
              <h3 className="flex items-center gap-2 font-medium mb-4">
                <span className="inline-block">🏃</span> Jumps
              </h3>
              <div className="space-y-4">
                {programElements
                  .filter((el) => el.category === "jumps")
                  .map((element) => (
                    <div key={element.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>{element.name}</div>
                      <div className="font-medium">{element.value.toFixed(2)}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {programElements.filter((el) => el.category === "spins").length > 0 && (
            <div className="border rounded-lg p-6">
              <h3 className="flex items-center gap-2 font-medium mb-4">
                <span className="inline-block">⭕</span> Spins
              </h3>
              <div className="space-y-4">
                {programElements
                  .filter((el) => el.category === "spins")
                  .map((element) => (
                    <div key={element.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>{element.name}</div>
                      <div className="font-medium">{element.value.toFixed(2)}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {programElements.filter((el) => el.category === "steps").length > 0 && (
            <div className="border rounded-lg p-6">
              <h3 className="flex items-center gap-2 font-medium mb-4">
                <span className="inline-block">👣</span> Step Sequences
              </h3>
              <div className="space-y-4">
                {programElements
                  .filter((el) => el.category === "steps")
                  .map((element) => (
                    <div key={element.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>{element.name}</div>
                      <div className="font-medium">{element.value.toFixed(2)}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button onClick={handleDownloadPDF} className="bg-[#0f172a] px-6 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>

          <Button onClick={handleEmailToCoach} variant="outline" className="px-6 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email to Coach
          </Button>
        </div>
      </main>
    </div>
  )
}
