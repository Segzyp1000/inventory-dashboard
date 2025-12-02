"use client";

import { useState, useMemo, useTransition } from "react";
// Assuming Product type definition (or adjust 'any' if you prefer to keep it)
// interface Product { id: string; name: string; sku: string | null; price: number | string; quantity: number; lowStockAt: number; }
import { deleteProduct } from "@/lib/actions/products";

// Helper type for product data structure
interface Product {
 id: string;
 name: string;
 sku: string | null;
 price: number | string; // Use string if coming directly from Prisma's Decimal type, or number if converted.
 quantity: number;
 lowStockAt: number;
}

export default function InventoryTable({ initialProducts }: { initialProducts: Product[] }) {
 const [products, setProducts] = useState<Product[]>(initialProducts);
 const [query, setQuery] = useState("");
 const [page, setPage] = useState(1);
 const [isDeleting, startTransition] = useTransition();
 const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null); // State for modal (product ID)

 const itemsPerPage = 15;

 // Reset page to 1 whenever the query changes
 const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setQuery(e.target.value);
  setPage(1); // Reset to first page on search
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

  // Use useTransition for better UI feedback
  startTransition(async () => {
   try {
    const formData = new FormData();
    formData.set("id", showDeleteModal);
    
    // This server action redirects back to /inventory, which forces a full server re-render
    // However, for client-side state update (optimistic UI), we update the local state first.
    // If the server action fails, the redirect won't happen, and the local state will be incorrect.
    // Since the server action redirects (which is typically simpler for Server Components),
    // we rely on the full refresh, but we keep the local state logic for immediate feedback.

    await deleteProduct(formData);

    // Optimistically update the client state to remove the item instantly
    setProducts((prev: Product[]) => prev.filter((p) => p.id !== showDeleteModal));
    
   } catch (error) {
    console.error("Error deleting product:", error);
    // Optionally, show a toast notification here if the deletion failed.
   } finally {
    // Close the modal regardless of success/failure
    setShowDeleteModal(null); 
   }
  });
 }

 // Calculate the maximum number of pages based on the filtered results
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
  <div className="relative">
   {/* Search */}
   <input
    type="text"
    placeholder="Search products..."
    className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg mb-4 shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-purple-500"
    onChange={handleQueryChange}
    value={query}
   />

   {/* Table */}
   <div className="overflow-hidden border rounded-lg shadow-sm bg-white">
    <table className="w-full text-gray-800">
    <thead className="bg-gray-100 border-b border-gray-300">
  <tr>
    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
      Name
    </th>

    {/* Hide on mobile */}
    <th className="hidden md:table-cell  px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
      SKU
    </th>

    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
      Price
    </th>

    {/* Hide on mobile */}
    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
      Qty
    </th>

    {/* Hide on mobile */}
    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
      Low Stock
    </th>

    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
      Actions
    </th>
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
      {/* Always visible */}
      <td className="px-6 py-4 font-medium">{product.name}</td>

      {/* Hidden on mobile */}
      <td className="hidden md:table-cell px-6 py-4">
        {product.sku || "-"}
      </td>

      {/* Always visible */}
      <td className="px-6 py-4">
        ${Number(product.price).toFixed(2)}
      </td>

      {/* Hidden on mobile */}
      <td className="hidden md:table-cell px-6 py-4">
        {product.quantity}
      </td>

      {/* Hidden on mobile */}
      <td className="hidden md:table-cell px-6 py-4">
        {product.lowStockAt}
      </td>

      {/* Always visible */}
      <td className="px-6 py-4">
        <button
          onClick={() => setShowDeleteModal(product.id)}
          disabled={isDeleting}
          className="text-red-500 hover:text-red-900 semibold disabled:opacity-50 transition"
        >
          {isDeleting && showDeleteModal === product.id
            ? "Deleting..."
            : "x"}
        </button>
      </td>
    </tr>
  ))}
</tbody>
    </table>

    {filteredProducts.length === 0 && (
     <div className="p-6 text-center text-gray-500 font-medium">
      No products found.
     </div>
    )}
   </div>

   {/* Pagination */}
   {totalPages > 1 && (
    <div className="flex justify-center items-center mt-5 gap-2">
     <button
      disabled={page === 1}
      onClick={() => setPage((p) => p - 1)}
      className="md:block hidden px-3 py-1 border border-gray-300 text-gray-900 rounded-md bg-white
      hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
     >
      Previous
     </button>

     {/* Render optimized pagination buttons */}
     {renderPaginationButtons().map((pageNum) => (
      <button
       key={pageNum}
       onClick={() => setPage(pageNum)}
       className={`px-3 py-1 rounded-md border transition font-medium ${
        page === pageNum
         ? "bg-purple-600 text-white border-purple-600 shadow-md"
         : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
       }`}
      >
       {pageNum}
      </button>
     ))}
     
     <button
      disabled={page === totalPages}
      onClick={() => setPage((p) => p + 1)}
      className="md:block hidden  px-3 py-1 border border-gray-300 rounded-md text-gray-900 bg-white
      hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
     >
      Next
     </button>
    </div>
   )}

   {/* Delete Confirmation Modal */}
   {showDeleteModal && (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
     <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">Confirm Deletion</h3>
      <p className="text-gray-700 mb-6">
       Are you absolutely sure you want to delete this product? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-3">
       <button
        onClick={() => setShowDeleteModal(null)}
        disabled={isDeleting}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
       >
        Cancel
       </button>
       <button
        onClick={handleDeleteConfirm}
        disabled={isDeleting}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
       >
        {isDeleting ? 'Deleting...' : 'Delete Permanently'}
       </button>
      </div>
     </div>
    </div>
   )}
  </div>                              
 );
} 



