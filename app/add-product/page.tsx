import AppLayout from "@/components/AppLayout";
import { createProduct } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function AddProductPage() {
  const user = await getCurrentUser();

  return (
    
      <AppLayout currentPath="/add-product" >
      

        <div className=" mb-4 text-gray-800">
          <h1 className="md:text-3xl text-2xl font-semibold">Add Product</h1>
          <p className="text-gray-600 text-[14px] md:text-[18px] ">
            Use the form below to add a new product to your inventory.
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form action={createProduct} className="space-y-6">

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm focus:border-purple-500"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Quantity *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm focus:border-purple-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Price *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm focus:border-purple-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  SKU (Optional)
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  className="w-full px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm focus:border-purple-500"
                  placeholder="Enter SKU"
                />
              </div>

              <div>
                <label
                  htmlFor="lowStockAt"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Low Stock Alert (Optional)
                </label>
                <input
                  type="number"
                  id="lowStockAt"
                  name="lowStockAt"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm focus:border-purple-500"
                  placeholder="Enter low stock threshold"
                />
              </div>

              <div className="flex  flex-wrap gap-5">
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Product
                </button>

                <Link
                  href="/inventory"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </Link>
              </div>

            </form>
          </div>
        </div>
      </AppLayout>
    
  );
}