"use client";

import {  useState} from "react";
import { useRouter } from "next/navigation";
import { SignIn, SignUp, useUser } from "@stackframe/stack";
import Link from "next/link";

export default function SigninClient() {
 const router = useRouter();
 const user = useUser();
 const [mode, setMode] = useState<"signin" | "signup">("signin");


 // derived flag — true when user object exists
 const isAuthenticated = !!user;


 // Handler for proceed button
 function handleProceed() {
  // extra safety: double-check authentication before routing
  if (!isAuthenticated) return;
  router.replace("/dashboard");
 }

 return (
  <div className="min-h-screen text-gray-800 flex items-center justify-center bg-linear-to-br from-purple-100 via-purple-200 to-purple-300 p-4">
   <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-lg space-y-6 transition-all duration-300">
    {/* Header */}
    <div className="text-center">
     <h1 className="text-3xl md:text-4xl font-extrabold text-purple-800 mb-1">
      {mode === "signin" ? "Welcome Back" : "Create Account"}
     </h1>
     <p className="text-purple-600 font-medium">
      {mode === "signin"
       ? "Sign in to manage your inventory."
       : "Sign up to get started."}
     </p>
    </div>

    {/* Toggle */}
    <div className="flex justify-center gap-3">
     <button
      onClick={() => setMode("signin")}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
       mode === "signin" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"
      }`}
      aria-pressed={mode === "signin"}
     >
      Sign In
     </button>

     <button
      onClick={() => setMode("signup")}
      className={`px-4 py-2 rounded-lg font-semibold transition ${
       mode === "signup" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"
      }`}
      aria-pressed={mode === "signup"}
     >
      Sign Up
     </button>
    </div>

    {/* Stack Auth UI */}
    <div>
     {mode === "signin" ? <SignIn /> : <SignUp />}
    </div>

 

    {/* Footer link */}
    <div className="text-center pt-3">
     <Link
      href="/"
      className="inline-block text-purple-600 hover:text-purple-800 font-semibold transition-colors text-sm"
     >
      ← Go Back Home
     </Link>
    </div>
   </div>
  </div>
 );
}