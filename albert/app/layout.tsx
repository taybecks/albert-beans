import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@components/theme-provider"
import { TrainingButtonWrapper } from "@components/training-button-wrapper"
import { Toaster } from "@/components/ui/sonner"
// Import the ErrorBoundary component
import { ErrorBoundary } from "@components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Figure Skating Program Builder",
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
            {children}
            <TrainingButtonWrapper />
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
