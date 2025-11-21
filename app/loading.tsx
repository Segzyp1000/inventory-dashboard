import Sidebar from "@/components/sidebar";

// This file automatically displays while the data for app/inventory/page.tsx is loading.
export default function InventoryLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          {/* Animated Header Placeholder */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-72"></div>
          </div>
          
          {/* Search Bar Skeleton */}
          <div className="mt-8 flex gap-2">
            <div className="h-10 bg-gray-200 rounded-lg grow animate-pulse"></div>
            <div className="w-24 h-10 bg-purple-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Table Container Skeleton */}
          <div className="mt-5 overflow-hidden border rounded-lg shadow-lg bg-white p-6">
            <div className="animate-pulse">
              {/* Table Header Row Skeleton */}
              <div className="flex justify-between py-3 px-2 border-b border-gray-100 mb-4">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>

              {/* Table Body Rows Skeleton (5 rows) */}
              {Array(5).fill(0).map((_, index) => (
                <div 
                  key={index} 
                  className={`flex justify-between py-4 px-2 ${index > 0 ? 'mt-3' : ''}`}
                >
                  <div className="h-5 bg-gray-200 rounded w-1/5 mr-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/6 mr-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/12 mr-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/12 mr-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/6 mr-4"></div>
                  <div className="h-5 bg-purple-100 rounded w-1/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}