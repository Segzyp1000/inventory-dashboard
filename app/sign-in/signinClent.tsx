"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// Import useUser from @stackframe/stack for checking existing session
import { SignIn, useUser } from "@stackframe/stack"; 
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  // Get the current user state
  const user = useUser(); 

  // Manual redirect check for users who are already signed in
  useEffect(() => {
    // If user is defined (already signed in or just successfully signed in), 
    // redirect them to the /dashboard page.
    if (user) {
      router.replace("/dashboard"); 
    }
    // Dependency array ensures this runs when the user object changes
  }, [user, router]);
  
  // If the user is currently loading or redirecting, don't show the form yet
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
        <div className="text-xl font-semibold text-purple-700">Redirecting to Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-lg space-y-8 transform hover:shadow-3xl transition-all duration-300">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-800 mb-2">Welcome Back</h1>
          <p className="text-purple-600 font-medium">Sign in to manage your inventory</p>
        </div>

        {/* Removed the redirectUrl prop, relying solely on the useEffect hook above 
            to redirect to /dashboard when the user object becomes available. */}
        <SignIn />

        <div className="text-center pt-2">
          <Link
            href="/dashboard"
            className="inline-block text-purple-600 hover:text-purple-800 font-semibold transition-colors text-sm"
          >
            ← Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}