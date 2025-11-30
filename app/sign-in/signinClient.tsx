"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignUp, useUser } from "@stackframe/stack";
import Link from "next/link";

export default function SigninClient() {
  const router = useRouter();
  const user = useUser();
  // State to toggle between Sign In and Sign Up forms
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  // derived flag — true when user object exists
  const isAuthenticated = !!user;

  // Manual redirect check for users who are already signed in or just signed up
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  // If the user is currently loading or redirecting, display a loading state
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 via-purple-200 to-purple-300">
        <div className="text-xl font-semibold text-purple-700 animate-pulse">Loading Authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 flex items-center justify-center 
      bg-linear-to-br from-indigo-50 via-purple-100 to-pink-100 p-4 sm:p-8">
      
      <div className="bg-white shadow-2xl border border-purple-50 rounded-3xl p-8 md:p-12 w-full max-w-md space-y-8 
        transform transition-all duration-500 relative">
        
        {/* Decorative Background Element (Subtle, static glow) */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: "rgb(192, 132, 252)", stopOpacity: 0.5}} />
                <stop offset="100%" style={{stopColor: "rgb(255, 255, 255)", stopOpacity: 0}} />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#grad1)"/>
          </svg>
        </div>


        {/* Header */}
        <div className="text-center relative z-10">
          <h1 className="text-3xl font-black text-purple-900 mb-1">
            {mode === "signin" ? "Access ShielfSync" : "Join ShielfSync"}
          </h1>
          <p className="text-gray-500 font-medium">
            {mode === "signin"
              ? "Sign in to manage your stock efficiently."
              : "Create an account and start tracking today."}
          </p>
        </div>

        {/* Mode Toggle (Uncommented and styled) */}
        <div className="flex justify-center gap-2 p-1 bg-gray-100 rounded-full relative z-10 shadow-inner">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              mode === "signin" 
                ? "bg-white text-purple-800 ring-2 ring-purple-600 shadow-lg" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
            aria-pressed={mode === "signin"}
          >
            Sign In
          </button>

          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              mode === "signup" 
                ? "bg-white text-purple-800 ring-2 ring-purple-600 shadow-lg" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
            aria-pressed={mode === "signup"}
          >
            Sign Up
          </button>
        </div>

        {/* Stack Auth UI */}
        <div className="relative z-10">
          {mode === "signin" ? <SignIn /> : <SignUp />}
        </div>

        {/* Footer link */}
        <div className="text-center pt-3 relative z-10">
          <Link
            href="/"
            className="inline-block text-purple-600 hover:text-purple-800 font-semibold transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}