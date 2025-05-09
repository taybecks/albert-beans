"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface FloatingActionButtonProps {
  onClick: () => void
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-[#0f172a] hover:bg-[#1e293b] z-50 p-0 flex items-center justify-center"
      aria-label="Record training performance"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Record training performance</span>
    </Button>
  )
}
