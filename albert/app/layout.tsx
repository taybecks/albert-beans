'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { MyAuthProvider } from "./components/MyAuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleClientId = '1095414115260-odosqnfnancpe3trmt9ff7m968vu30ri.apps.googleusercontent.com';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <GoogleOAuthProvider clientId={googleClientId}>
            <MyAuthProvider >
              <div className="header">
              </div>
              {children}
            </MyAuthProvider>
            
          </GoogleOAuthProvider>
        </body>
      
    </html>
  );
}
