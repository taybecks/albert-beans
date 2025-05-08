"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProgressBar } from "@components/progress-bar"

const levels = [
  {
    id: "pre-bronze",
    title: "Pre-Bronze",
    description: "For skaters who are just starting competitive skating with basic jumps and spins.",
  },
  {
    id: "bronze",
    title: "Bronze",
    description: "For skaters with some competitive experience who can perform single jumps and basic spins.",
  },
  {
    id: "silver",
    title: "Silver",
    description: "For intermediate skaters who can perform advanced single jumps and combination spins.",
  },
  {
    id: "gold",
    title: "Gold",
    description: "For advanced skaters who can perform double jumps and complex spin combinations.",
  },
]

export default function LevelPage() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedLevel) {
      // In a real app, you would save this to state management or localStorage
      localStorage.setItem("skatingLevel", selectedLevel)
      router.push("/wizard/elements")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <Link href="/" className="inline-flex items-center text-gray-600">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Back</span>
        </Link>
      </header>

      <ProgressBar currentStep={1} totalSteps={4} />

      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">What level do you compete at?</h1>

        <div className="flex items-center mb-8 text-gray-600">
          <span>Not sure?</span>
          <Button variant="link" className="p-0 h-auto ml-1">
            <span className="underline">ⓘ</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {levels.map((level) => (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all ${
                selectedLevel === level.id ? "border-2 border-black" : "border hover:border-gray-400"
              }`}
              onClick={() => setSelectedLevel(level.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle>{level.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{level.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Button onClick={handleContinue} disabled={!selectedLevel} className="bg-[#0f172a] px-8">
            Continue <span className="ml-2">→</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
