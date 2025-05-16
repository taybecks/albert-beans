'use client'

import { useState } from "react";
import AddRunthrough from "./components/AddRunthrough";
import SecretSauce from "./components/SecretSauce";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      <section className="w-full flex flex-col items-center justify-center pt-16 pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center animated-gradient-text" style={{lineHeight:1.1}}>
          Build Your Magical Skating Program
        </h1>
        <p className="text-lg md:text-xl text-pink-500 mb-12 max-w-2xl text-center">
          Let Program Pixie sprinkle some magic on your figure skating routine and create a competition-ready program that showcases your unique talents.
        </p>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center mb-12">
          <div className="card flex-1 flex flex-col items-center text-center">
            <div className="rounded-full bg-pink-100 w-16 h-16 flex items-center justify-center mb-4">
              <svg width="32" height="32" fill="none" stroke="#e09ec3" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V6M5 12l7-7 7 7"/></svg>
            </div>
            <h3 className="font-bold text-xl mb-2 text-black">Magical Elements</h3>
            <p className="text-pink-500 text-base">Select from a variety of jumps, spins, and step sequences to create your perfect program.</p>
          </div>
          <div className="card flex-1 flex flex-col items-center text-center">
            <div className="rounded-full bg-pink-100 w-16 h-16 flex items-center justify-center mb-4">
              <svg width="32" height="32" fill="none" stroke="#e09ec3" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <h3 className="font-bold text-xl mb-2 text-black">Personalized Comfort</h3>
            <p className="text-pink-500 text-base">Rate your comfort level with each element to create a program that feels just right.</p>
          </div>
          <div className="card flex-1 flex flex-col items-center text-center">
            <div className="rounded-full bg-pink-100 w-16 h-16 flex items-center justify-center mb-4">
              <svg width="32" height="32" fill="none" stroke="#e09ec3" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <h3 className="font-bold text-xl mb-2 text-black">Track Your Progress</h3>
            <p className="text-pink-500 text-base">Monitor your training performance and see your improvement over time.</p>
          </div>
        </div>
        <Link href="/wizard/level">
          <Button className="btn-gradient pop-btn px-12 py-5 text-xl shadow-lg font-bold transition-all duration-200">
            Start Your Magical Journey <span className="ml-2">✨</span>
          </Button>
        </Link>
      </section>
    </div>


    //   {/* Modal Button */}
    //   <Button
    //     className="fixed bottom-6 right-6 bg-[#0f172a] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#0f172a] transition"
    //     onClick={() => setOpen(true)}
    //   >
    //     +
    //   </Button>

    //   {/* Modal */}
    //   {open && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    //       <div className="bg-white rounded-lg p-8 shadow-xl min-w-[300px]">
    //         <div className="flex items-center justify-between mb-4">
    //           <span className="text-lg font-bold">Add Runthrough</span>
    //           <button
    //             onClick={() => setOpen(false)}
    //             className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
    //             aria-label="Close modal"
    //           >
    //             &times;
    //           </button>
    //         </div>
    //         <AddRunthrough />
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}
