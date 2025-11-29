"use client";

import Link from "next/link";
import { useUser } from "@stackframe/stack";

export default function Home() {
  const user = useUser();
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
            Inventory Management
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10">
            Streamline your inventory tracking with our powerful, easy-to-use
            management system. Track products, monitor stock levels, and gain
            valuable insights effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              // Authenticated: Button changes to "Proceed to Download" and links to the app root
              <Link
                // Linking to the root path, which you designated as the new homepage/dashboard
                href="/dashboard" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-colors duration-200"
              >
                Proceed to Dashboard
              </Link>
            ) : (
              // Not Authenticated: Button for Sign In, linking to the correct path
              <Link
                href="/sign-in"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}