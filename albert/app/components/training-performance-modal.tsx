"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { usePerformance } from "@lib/performance-client"
import type { ElementWithRating, TrainingPerformanceData } from "@lib/database.types"

// Performance rating descriptions
const ratingDescriptions = [
  "Failed (0) - Unable to complete",
  "Poor (1) - Completed with major errors",
  "Fair (2) - Completed with minor errors",
  "Good (3) - Completed cleanly",
  "Excellent (4) - Perfect execution",
]

interface TrainingPerformanceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: TrainingPerformanceData) => void
}

export function TrainingPerformanceModal({ open, onOpenChange, onSave }: TrainingPerformanceModalProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [notes, setNotes] = useState<string>("")
  const [elements, setElements] = useState<ElementWithRating[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { fetchElements, savePerformance } = usePerformance()

  // Fetch available elements when modal opens
  useEffect(() => {
    if (open) {
      const loadElements = async () => {
        setIsLoading(true)
        try {
          const availableElements = await fetchElements()

          // Convert to ElementWithRating type with default rating of -1 (not rated)
          const elementsWithRating: ElementWithRating[] = availableElements.map((element) => ({
            ...element,
            rating: -1,
          }))

          setElements(elementsWithRating)
        } catch (error) {
          console.error("Failed to load elements:", error)
        } finally {
          setIsLoading(false)
        }
      }

      loadElements()
    }
  }, [open, fetchElements])

  const handleRatingChange = (elementId: string, rating: string) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === elementId ? { ...element, rating: Number.parseInt(rating) } : element,
      ),
    )
  }

  const handleSave = async () => {
    // Check if all elements have been rated
    const selectedElements = elements.filter((element) => element.rating >= 0)

    if (selectedElements.length === 0) {
      alert("Please rate at least one element before saving.")
      return
    }

    const performanceData: TrainingPerformanceData = {
      date,
      notes,
      elements: selectedElements,
    }

    try {
      setIsLoading(true)

      // Save to localStorage
      await savePerformance(performanceData)

      if (onSave) {
        onSave(performanceData)
      }

      // Reset form
      setDate(new Date())
      setNotes("")
      setElements(elements.map((element) => ({ ...element, rating: -1 })))
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving performance:", error)
      alert("Failed to save performance. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Group elements by category
  const jumpElements = elements.filter((element) => element.category === "jumps")
  const spinElements = elements.filter((element) => element.category === "spins")
  const stepElements = elements.filter((element) => element.category === "steps")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Training Performance</DialogTitle>
          <DialogDescription>Rate how well you performed each element during your training session.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="training-date">Training Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="training-date"
                  variant="outline"
                  className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <Label>Element Performance</Label>

            {isLoading ? (
              <div className="text-center py-4">Loading elements...</div>
            ) : (
              <div className="space-y-6">
                {jumpElements.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Jumps</h3>
                    {jumpElements.map(renderElementRating)}
                  </div>
                )}

                {spinElements.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Spins</h3>
                    {spinElements.map(renderElementRating)}
                  </div>
                )}

                {stepElements.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Step Sequences</h3>
                    {stepElements.map(renderElementRating)}
                  </div>
                )}
              </div>
            )}

            <div className="mt-2 text-xs text-gray-500 sm:hidden">
              <p className="font-medium">Rating Scale:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                {ratingDescriptions.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              placeholder="Add any notes about your training session"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Performance"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  function renderElementRating(element: ElementWithRating) {
    return (
      <div key={element.id} className="rounded-md border p-4 space-y-2">
        <Label className="text-base font-medium">{element.name}</Label>
        <RadioGroup
          value={element.rating === -1 ? undefined : element.rating.toString()}
          onValueChange={(value) => handleRatingChange(element.id, value)}
        >
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((rating) => (
              <div key={rating} className="flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={rating.toString()} id={`${element.id}-${rating}`} />
                  <Label htmlFor={`${element.id}-${rating}`} className="font-normal">
                    {rating}
                  </Label>
                </div>
                <span className="text-xs text-center text-gray-500 mt-1 hidden sm:block">
                  {rating === 0 && "Failed"}
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Excellent"}
                </span>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    )
  }
}
