import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 via-purple-200 to-purple-300">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-700 mb-2">Welcome Back</h1>
        </div>

        <SignIn />

        <div className="text-center">
          <Link
            href="/"
            className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            ← Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}