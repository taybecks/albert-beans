'use client'

import { useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/ProgramPixie.png"
            alt="Program Pixie Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-xl font-bold text-[#d14fa2]">Program Pixie</span>
        </div>
        <div className="flex gap-2">
          <Link href="/signup">
            <Button variant="outline" className="btn-gradient-border">Sign Up</Button>
          </Link>
          <Link href="/login">
            <Button className="btn-gradient-fill">Log In</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl animated-gradient-text mb-6">
          Build a Competition-Ready Figure Skating Program
        </h1>
        <p className="text-lg text-[#d14fa2] mb-10 max-w-2xl">
          Create a personalized program that matches your skill level and style. Our AI-powered wizard will guide you through the process.
        </p>

        <Link href="/wizard/level">
          <Button className="btn-gradient-fill px-8 py-6 text-lg">
            Start Your Magical Journey <span className="ml-2">→</span>
          </Button>
        </Link>
      </main>
    </div>
  );
}
