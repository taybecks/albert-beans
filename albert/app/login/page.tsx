import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-end">
        <div className="flex gap-2">
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
          <Link href="/login">
            <Button variant="default" className="bg-[#0f172a] text-white">
              Log In
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl text-[#0f172a]">
          Build a Competition-Ready Figure Skating Program
        </h1>

        <Link href="/wizard/level" className="mt-10">
          <Button className="bg-[#0f172a] text-white px-8 py-6 text-lg rounded-md">
            Start Building <span className="ml-2">→</span>
          </Button>
        </Link>
      </main>
    </div>
  )
}
