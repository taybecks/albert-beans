'use client'

import { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import AddRunthrough from "./components/AddRunthrough";
import SecretSauce from "./components/SecretSauce";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative">
      <GoogleOAuthProvider clientId="1095414115260-odosqnfnancpe3trmt9ff7m968vu30ri.apps.googleusercontent.com">
        <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md absolute top-0 left-0">
          <span className="text-xl font-bold text-blue-700">Albert</span>
          <div className="flex gap-4">
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />;
          </div>
        </header>
        <SecretSauce />

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
      </GoogleOAuthProvider>
    </div>
  );
}
