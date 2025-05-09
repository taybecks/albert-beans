"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Mail } from "lucide-react"
import Link from "next/link"
import { ProgressBar } from "@components/progress-bar"
import { useFormContext } from "react-hook-form"
import SecretSauce from "@/app/components/SecretSauce"

export default function ProgramPage() {
  const { watch } = useFormContext()
  const selectedElements = watch("selectedElements")
  const comfortLevels = watch("comfortLevels")
  const [programElements, setProgramElements] = useState<any[]>([])
  const [baseValue, setBaseValue] = useState(0)

  console.log(selectedElements, comfortLevels)

  function generateProgram() {
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
        <SecretSauce />

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
