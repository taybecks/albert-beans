"use client"

import { useState } from "react"
import type { Element, TrainingPerformanceData } from "@lib/database.types"

// This is a placeholder user ID - in a real app, you would get this from authentication
const TEMP_USER_ID = "123e4567-e89b-12d3-a456-426614174000"

// Mock data for elements
const mockElements: Element[] = [
  { id: "jump-1", name: "Triple Axel", category: "jumps", created_at: new Date().toISOString() },
  { id: "jump-2", name: "Triple Lutz", category: "jumps", created_at: new Date().toISOString() },
  { id: "jump-3", name: "Triple Flip", category: "jumps", created_at: new Date().toISOString() },
  { id: "jump-4", name: "Triple Toe", category: "jumps", created_at: new Date().toISOString() },
  { id: "jump-5", name: "Triple Salchow", category: "jumps", created_at: new Date().toISOString() },
  { id: "jump-6", name: "Double Axel", category: "jumps", created_at: new Date().toISOString() },
  { id: "spin-1", name: "Flying Sit Spin", category: "spins", created_at: new Date().toISOString() },
  { id: "spin-2", name: "Layback Spin", category: "spins", created_at: new Date().toISOString() },
  { id: "spin-3", name: "Camel Spin", category: "spins", created_at: new Date().toISOString() },
  { id: "spin-4", name: "Sit Spin", category: "spins", created_at: new Date().toISOString() },
  { id: "spin-5", name: "Combination Spin", category: "spins", created_at: new Date().toISOString() },
  { id: "step-1", name: "Straight Line Step", category: "steps", created_at: new Date().toISOString() },
  { id: "step-2", name: "Circular Step", category: "steps", created_at: new Date().toISOString() },
  { id: "step-3", name: "Serpentine Step", category: "steps", created_at: new Date().toISOString() },
]

// Type for stored performance with string date
interface StoredPerformance extends Omit<TrainingPerformanceData, "date"> {
  id: string
  date: string
}

export function usePerformance() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Save performance to localStorage
  const savePerformance = async (performanceData: TrainingPerformanceData) => {
    setIsLoading(true)
    setError(null)
    try {
      // Generate a unique ID
      const id = `perf-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

      // Get existing performances
      const existingPerformancesJSON = localStorage.getItem("performances")
      const existingPerformances: StoredPerformance[] = existingPerformancesJSON
        ? JSON.parse(existingPerformancesJSON)
        : []

      // Add new performance
      const newPerformance: StoredPerformance = {
        id,
        ...performanceData,
        date: performanceData.date.toISOString(),
      }

      // Save to localStorage
      localStorage.setItem("performances", JSON.stringify([newPerformance, ...existingPerformances]))

      return id
    } catch (err) {
      setError("Failed to save performance data")
      console.error(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Get all performances from localStorage
  const getPerformances = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const performancesJSON = localStorage.getItem("performances")
      if (!performancesJSON) return []

      const storedPerformances: StoredPerformance[] = JSON.parse(performancesJSON)

      // Convert to PerformanceWithElements format
      return storedPerformances.map((perf) => ({
        id: perf.id,
        user_id: "local-user",
        date: perf.date,
        notes: perf.notes,
        created_at: perf.date,
        elements: perf.elements.map((el) => ({
          id: `${perf.id}-${el.id}`,
          performance_id: perf.id,
          element_id: el.id,
          rating: el.rating,
          created_at: perf.date,
          element: {
            id: el.id,
            name: el.name,
            category: el.category,
            created_at: perf.date,
          },
        })),
      }))
    } catch (err) {
      setError("Failed to fetch performances")
      console.error(err)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Get all elements (using mock data)
  const fetchElements = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockElements
    } catch (err) {
      setError("Failed to fetch elements")
      console.error(err)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Get performance history for a specific element
  const getElementPerformanceHistory = async (elementId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const performancesJSON = localStorage.getItem("performances")
      if (!performancesJSON) return []

      const storedPerformances: StoredPerformance[] = JSON.parse(performancesJSON)

      // Find all performances that include this element
      const history = storedPerformances
        .filter((perf) => perf.elements.some((el) => el.id === elementId))
        .map((perf) => {
          const element = perf.elements.find((el) => el.id === elementId)
          return {
            date: perf.date,
            rating: element ? element.rating : 0,
          }
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      return history
    } catch (err) {
      setError("Failed to fetch element performance history")
      console.error(err)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    savePerformance,
    getPerformances,
    fetchElements,
    getElementPerformanceHistory,
  }
}
