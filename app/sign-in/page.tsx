import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 via-purple-200 to-purple-300">
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-lg space-y-8 transform hover:shadow-3xl transition-all duration-300">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-800 mb-2">Welcome Back</h1>
          <p className="text-purple-600 font-medium">Sign in to manage your inventory</p>
        </div>

        {/* automaticRedirect will redirect the user upon successful sign-in */}
        
        <SignIn automaticRedirect={true} />


        <div className="text-center pt-2">
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