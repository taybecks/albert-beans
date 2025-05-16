"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProgressBar } from "@components/progress-bar"
import { useFormContext } from "react-hook-form"

const levels = [
  {
    id: "preBronze",
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
  const { getValues, setValue, watch } = useFormContext()
  const selectedLevel = watch("level")

  const handleContinue = () => {
    if (selectedLevel) {
      // In a real app, you would save this to state management or localStorage
      setValue("level", selectedLevel)
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
        <h1 className="text-3xl font-bold mb-2 text-center gradient-text">What level do you compete at?</h1>

        <div className="flex items-center mb-8 text-pink-500">
          <span>Not sure?</span>
          <Button variant="link" className="p-0 h-auto ml-1">
            <span className="underline">ⓘ</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {levels.map((level) => (
            <Card
              key={level.id}
              className={`card cursor-pointer transition-all duration-200 select-none 
                ${selectedLevel === level.id ? "ring-4 ring-pink-300 bg-pink-50 scale-105" : "hover:shadow-2xl hover:bg-pink-100 hover:scale-105"}`}
              onClick={() => setValue("level", level.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="gradient-text text-xl">{level.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pink-700 text-base">{level.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Button onClick={handleContinue} disabled={!selectedLevel} className="btn-gradient pop-btn px-12 py-5 text-lg font-bold">
            Continue <span className="ml-2">→</span>
          </Button>
        </div>
      </main>
    </div>
  )
}
