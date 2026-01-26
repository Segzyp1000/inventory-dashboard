"use client";

import { useState, useMemo, useTransition } from "react";
import { deleteProduct } from "@/lib/actions/products";

interface Product {
  id: string;
  name: string;
  sku: string | null;
  price: number | string;
  quantity: number;
  lowStockAt: number;
}

export default function InventoryTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isDeleting, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const itemsPerPage = 15;

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, products]);

  const paginated = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  async function handleDeleteConfirm() {
    if (!showDeleteModal) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("id", showDeleteModal);
        await deleteProduct(formData);
        setProducts((prev) => prev.filter((p) => p.id !== showDeleteModal));
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setShowDeleteModal(null);
      }
    });
  }

  const renderPaginationButtons = () => {
    const pagesToShow = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }
    return pagesToShow;
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      {/* Search Input */}
      <div className="px-1">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleQueryChange}
          value={query}
        />
      </div>

      {/* MOBILE VIEW: Stacked Cards (Visible only on small screens) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {paginated.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-xs text-gray-500">SKU: {product.sku || "N/A"}</p>
              </div>
              <button
                onClick={() => setShowDeleteModal(product.id)}
                disabled={isDeleting}
                className="text-red-500 p-2 -mr-2"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-sm border-t pt-3">
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tight">Price</p>
                <p className="font-semibold">${Number(product.price).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tight">Qty</p>
                <p className={`${product.quantity <= product.lowStockAt ? 'text-red-600 font-bold' : ''}`}>
                  {product.quantity}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tight">Low Limit</p>
                <p>{product.lowStockAt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Table (Hidden on small screens) */}
      <div className="hidden md:block overflow-hidden border rounded-lg shadow-sm bg-white">
        <table className="w-full text-gray-800">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">Low Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product, index) => (
              <tr
                key={product.id}
                className={`transition border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-purple-50`}
              >
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">{product.sku || "-"}</td>
                <td className="px-6 py-4">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.lowStockAt}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setShowDeleteModal(product.id)}
                    disabled={isDeleting}
                    className="text-red-500 hover:text-red-900 font-bold disabled:opacity-50 transition"
                  >
                    {isDeleting && showDeleteModal === product.id ? "..." : "✕"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="p-10 text-center text-gray-500 font-medium bg-white rounded-lg border mt-2">
          No products found matching "{query}"
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 mb-10 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border border-gray-300 text-gray-900 rounded-md bg-white hover:bg-gray-100 disabled:opacity-40 transition"
          >
            Prev
          </button>
          <div className="flex gap-1">
            {renderPaginationButtons().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`w-10 h-10 rounded-md border transition font-medium ${
                  page === pageNum
                    ? "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-900 bg-white hover:bg-gray-100 disabled:opacity-40 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all">
            <h3 className="text-lg font-bold text-gray-900 pb-3 mb-2">Delete Product?</h3>
            <p className="text-gray-600 mb-6 text-sm">
              This will permanently remove the product from your inventory.
            </p>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="w-full px-4 py-3 sm:py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setShowDeleteModal(null)}
                disabled={isDeleting}
                className="w-full px-4 py-3 sm:py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}