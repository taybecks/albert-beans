"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePerformance } from "@lib/performance-client"
import type { PerformanceWithElements } from "@lib/database.types"

export function TrainingHistory() {
  const [performances, setPerformances] = useState<PerformanceWithElements[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { getPerformances } = usePerformance()

  useEffect(() => {
    const loadPerformances = async () => {
      setIsLoading(true)
      try {
        const data = await getPerformances()
        setPerformances(data)
      } catch (error) {
        console.error("Failed to load performances:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPerformances()
  }, [getPerformances])

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 0:
        return "bg-red-100 text-red-800"
      case 1:
        return "bg-orange-100 text-orange-800"
      case 2:
        return "bg-yellow-100 text-yellow-800"
      case 3:
        return "bg-green-100 text-green-800"
      case 4:
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 0:
        return "Failed"
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Excellent"
      default:
        return "Unknown"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Training Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Loading training sessions...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (performances.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Training Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't recorded any training sessions yet.</p>
            <p className="text-sm text-gray-500">
              Use the "+" button in the bottom right corner to record a training session.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {performances.map((session) => (
            <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="font-medium text-lg">
                    Training Session - {new Date(session.date).toLocaleDateString()}
                  </h3>
                  {session.notes && <p className="text-sm text-gray-600 mt-1">{session.notes}</p>}
                </div>
              </div>

              <div className="space-y-3 mt-4">
                {session.elements.map((element) => (
                  <div key={element.id} className="flex justify-between items-center">
                    <span className="font-medium">{element.element.name}</span>
                    <Badge className={`${getRatingColor(element.rating)} font-medium`}>
                      {element.rating} - {getRatingText(element.rating)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
