"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Mail } from "lucide-react"
import Link from "next/link"
import { ProgressBar } from "@components/progress-bar"
import { useFormContext } from "react-hook-form"
import SecretSauce from "@/app/components/SecretSauce"

export default function ProgramPage() {
  // const { watch } = useFormContext()
  // const selectedElements = watch("selectedElements")
  // const comfortLevels = watch("comfortLevels")
  // const [programElements, setProgramElements] = useState<any[]>([])
  // const [baseValue, setBaseValue] = useState(0)

  // function generateProgram() {
  // }

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
        <h1 className="text-3xl font-bold mb-8 text-center gradient-text">Your Program</h1>

        <div className="card w-full mb-8">
          <SecretSauce />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button onClick={handleDownloadPDF} className="btn-gradient px-6 py-2 flex items-center gap-2 text-lg">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>

          <Button onClick={handleEmailToCoach} variant="outline" className="btn-gradient px-6 py-2 flex items-center gap-2 text-lg">
            <Mail className="h-4 w-4" />
            Email to Coach
          </Button>
        </div>
      </main>
    </div>
  )
}
