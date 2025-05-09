export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      elements: {
        Row: {
          id: string
          name: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          created_at?: string
        }
      }
      performances: {
        Row: {
          id: string
          user_id: string
          date: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          notes?: string | null
          created_at?: string
        }
      }
      performance_elements: {
        Row: {
          id: string
          performance_id: string
          element_id: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          performance_id: string
          element_id: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          performance_id?: string
          element_id?: string
          rating?: number
          created_at?: string
        }
      }
    }
  }
}

export type Element = Database["public"]["Tables"]["elements"]["Row"]
export type Performance = Database["public"]["Tables"]["performances"]["Row"]
export type PerformanceElement = Database["public"]["Tables"]["performance_elements"]["Row"]

export interface PerformanceWithElements extends Performance {
  elements: (PerformanceElement & {
    element: Element
  })[]
}

export interface ElementWithRating extends Element {
  rating: number
}

export interface TrainingPerformanceData {
  date: Date
  notes: string | null
  elements: ElementWithRating[]
}
