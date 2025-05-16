"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Edit, Eye, Trash2 } from "lucide-react"
import type { TrainingPerformanceData } from "@lib/database.types"
import { TrainingHistory } from "./training-history"
import { BarChart2 } from "lucide-react"

// Mock data for past programs
const mockPastPrograms = [
  {
    id: "prog-1",
    name: "Competition Program 2023",
    date: "2023-12-15",
    level: "Silver",
    baseValue: 38.45,
    elements: [
      { name: "Triple Axel", value: 8.0, category: "jumps" },
      { name: "Triple Lutz + Triple Toe", value: 10.1, category: "jumps" },
      { name: "Flying Sit Spin", value: 4.5, category: "spins" },
      { name: "Straight Line Step Sequence", value: 3.9, category: "steps" },
    ],
  },
  {
    id: "prog-2",
    name: "Exhibition Program",
    date: "2023-10-20",
    level: "Silver",
    baseValue: 32.7,
    elements: [
      { name: "Double Axel", value: 3.3, category: "jumps" },
      { name: "Triple Salchow", value: 4.2, category: "jumps" },
      { name: "Layback Spin", value: 3.2, category: "spins" },
      { name: "Circular Step Sequence", value: 3.9, category: "steps" },
    ],
  },
  {
    id: "prog-3",
    name: "Practice Program",
    date: "2024-01-05",
    level: "Gold",
    baseValue: 42.1,
    elements: [
      { name: "Triple Lutz", value: 5.9, category: "jumps" },
      { name: "Triple Flip + Triple Toe", value: 9.5, category: "jumps" },
      { name: "Combination Spin", value: 5.1, category: "spins" },
      { name: "Serpentine Step Sequence", value: 4.4, category: "steps" },
    ],
  },
]

// Mock data for training performances
const mockTrainingPerformances: TrainingPerformanceData[] = [
  {
    date: new Date("2024-05-01"),
    notes: "Felt good today, landed most jumps cleanly",
    elements: [
      {
        id: "lutz", name: "Lutz", rating: 3,
        category: "",
        created_at: ""
      },
      {
        id: "combo-spin", name: "Combination Spin", rating: 4,
        category: "",
        created_at: ""
      },
    ],
  },
  {
    date: new Date("2024-04-28"),
    notes: "Struggled with spins, jumps were okay",
    elements: [
      {
        id: "lutz", name: "Lutz", rating: 2,
        category: "",
        created_at: ""
      },
      {
        id: "combo-spin", name: "Combination Spin", rating: 1,
        category: "",
        created_at: ""
      },
    ],
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [coachName, setCoachName] = useState("")
  const [coachEmail, setCoachEmail] = useState("")
  const [level, setLevel] = useState("Silver")
  const [pastPrograms, setPastPrograms] = useState(mockPastPrograms)
  const [isEditing, setIsEditing] = useState(false)
  const [trainingPerformances, setTrainingPerformances] = useState<TrainingPerformanceData[]>([])
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    // In a real app, you would fetch user profile data from an API or database
    // For now, we'll just simulate loading data
    const loadUserData = () => {
      // Simulate loading data from localStorage or API
      setName("Jane Smith")
      setCoachName("Michael Johnson")
      setCoachEmail("coach@example.com")
      setLevel("Silver")

      // Get training performances from localStorage if available
      const storedPerformances = localStorage.getItem("trainingPerformances")
      if (storedPerformances) {
        try {
          // Parse the stored JSON string and convert date strings back to Date objects
          const parsedPerformances = JSON.parse(storedPerformances).map((perf: any) => ({
            ...perf,
            date: new Date(perf.date),
          }))
          setTrainingPerformances(parsedPerformances)
        } catch (error) {
          console.error("Error parsing stored performances:", error)
          setTrainingPerformances(mockTrainingPerformances)
        }
      } else {
        setTrainingPerformances(mockTrainingPerformances)
      }
    }

    loadUserData()
  }, [])

  const handleSaveProfile = () => {
    // In a real app, you would save this data to an API or database
    console.log("Saving profile:", { name, coachName, coachEmail, level })
    setIsEditing(false)
    // Show success message
    alert("Profile updated successfully!")
  }

  const handleDeleteProgram = (programId: string) => {
    // In a real app, you would delete this from an API or database
    setPastPrograms(pastPrograms.filter((program) => program.id !== programId))
  }

  const handleViewProgram = (programId: string) => {
    // In a real app, you would navigate to a program detail page
    // For now, we'll just simulate this
    console.log("Viewing program:", programId)
    router.push(`/program-details/${programId}`)
  }

  const handleEditProgram = (programId: string) => {
    // In a real app, you would navigate to a program edit page
    // For now, we'll just simulate this
    console.log("Editing program:", programId)
    router.push(`/wizard/program?edit=${programId}`)
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-[#0f172a]">
            Figure Skating Program Builder
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {name}</span>
            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="programs">Past Programs</TabsTrigger>
              <TabsTrigger value="training">Training Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and preferences for program generation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="level">Skating Level</Label>
                        <Select value={level} onValueChange={setLevel} disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pre-Bronze">Pre-Bronze</SelectItem>
                            <SelectItem value="Bronze">Bronze</SelectItem>
                            <SelectItem value="Silver">Silver</SelectItem>
                            <SelectItem value="Gold">Gold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-4">Coach Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="coachName">Coach Name</Label>
                          <Input
                            id="coachName"
                            value={coachName}
                            onChange={(e) => setCoachName(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="coachEmail">Coach Email</Label>
                          <Input
                            id="coachEmail"
                            type="email"
                            value={coachEmail}
                            onChange={(e) => setCoachEmail(e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="mt-0">
              <Card className="card">
                <CardHeader>
                  <CardTitle className="gradient-text">Your Past Programs</CardTitle>
                  <CardDescription>View and manage programs you&apos;ve created previously.</CardDescription>
                </CardHeader>
                <CardContent>
                  {pastPrograms.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-pink-400 mb-4">You haven&apos;t created any programs yet.</p>
                      <Button onClick={() => router.push("/wizard/level")}
                        className="btn-gradient px-8 py-2 text-lg">Create Your First Program</Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {pastPrograms.map((program) => (
                        <div key={program.id} className="card hover:shadow-lg transition-shadow">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div>
                              <h3 className="font-medium text-lg gradient-text">{program.name}</h3>
                              <p className="text-pink-700 text-sm mt-1">{program.date} • {program.level}</p>
                            </div>
                            <div className="flex gap-2 mt-2 md:mt-0">
                              <Button size="sm" className="btn-gradient">View</Button>
                              <Button size="sm" className="btn-gradient">Edit</Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteProgram(program.id)}
                                className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="hidden sm:inline">Delete</span>
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                            {program.elements.map((element, index) => (
                              <div key={index} className="bg-pink-50 p-2 rounded flex justify-between">
                                <span>{element.name}</span>
                                <span className="font-medium">{element.value.toFixed(1)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => router.push("/wizard/level")} className="w-full btn-gradient">
                    Create New Program <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="training" className="mt-0">
              <TrainingHistory />
              <CardFooter>
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  disabled={trainingPerformances.length < 2}
                >
                  <BarChart2 className="h-4 w-4" />
                  View Progress Chart
                </Button>

                <Button className="ml-auto" onClick={() => router.push("/training")}>
                  View Full Training History
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
