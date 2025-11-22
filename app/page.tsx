import Link from "next/link";

export default function Home() {
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
            <Link
              href="/sign-in"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 transition-colors duration-200"
            >
              Sign In
            </Link>

            
          </div>
        </div>
      </div>
    </div>
  );
}