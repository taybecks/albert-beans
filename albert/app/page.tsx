'use client'

import { useState } from "react";
import AddRunthrough from "./components/AddRunthrough";
import SecretSauce from "./components/SecretSauce";
import Link from "next/link"
import { Button } from "@mui/material";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative">
      {/* <SecretSauce /> */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl text-[#0f172a]">
          Build a Competition-Ready Figure Skating Program
        </h1>

        <Link href="/wizard/level" className="mt-10">
          <Button variant="contained" color="primary" size="large">
            Start Building <span className="ml-2">→</span>
          </Button>
        </Link>
      </main>

      {/* Modal Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
      >
        +
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-8 shadow-xl min-w-[300px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold">Add Runthrough</span>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <AddRunthrough />
          </div>
        </div>
      )}
    </div>
  );
}
