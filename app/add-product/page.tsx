import Sidebar from "@/components/sidebar";
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function AddProductPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar currentPath="/add-product" />

      <main className="ml-64 p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
          <p className="text-sm text-gray-600 mt-1">
            Use the form below to add a new product to your inventory.
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <form
              className="space-y-6"
              action="createProduct"
            
            >
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter product name"
                />
              </div>

              {/* Quantity & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="0"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    required
                    className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU (Optional)
                </label>
                <input
                  type="text"
                  name="sku"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter SKU"
                />
              </div>

              {/* Low Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Low Stock At (Optional)
                </label>
                <input
                  type="number"
                  name="LowStockAt"
                  min="0"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter low stock threshold"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Add Product
                </button>

                <Link
                  href="/inventory"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}