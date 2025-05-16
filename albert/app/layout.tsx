import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@components/theme-provider"
import { TrainingButtonWrapper } from "@components/training-button-wrapper"
import { Toaster } from "@/components/ui/sonner"
// Import the ErrorBoundary component
import { ErrorBoundary } from "@components/error-boundary"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Program Pixie",
  description: "Build your ideal figure skating program",
}

// Wrap the children in the ErrorBoundary component in the RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <header className="w-full bg-white border-b border-pink-100 shadow-none flex items-center justify-between px-8 py-2">
              <div className="flex items-center gap-3">
                <Image
                  src="/ProgramPixie.png"
                  alt="Program Pixie Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <span className="text-2xl font-bold" style={{ color: '#c7b6f7' }}>
                  Program Pixie
                </span>
              </div>
              <nav className="flex gap-8 text-pink-500 font-semibold text-lg">
                <a href="#about" className="hover:underline">About</a>
                <a href="#contact" className="hover:underline">Contact</a>
              </nav>
            </header>
            <main className="pt-8">
              {children}
            </main>
            <footer className="w-full text-center py-6 text-base" style={{ color: '#c7b6f7' }}>
              © 2025 Program Pixie. All rights reserved.
            </footer>
            <TrainingButtonWrapper />
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
