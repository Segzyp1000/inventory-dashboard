// components/InventoryTable.tsx
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

  const itemsPerPage = 12;

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, products]);

  const paginated = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  async function handleDeleteConfirm() {
    if (!showDeleteModal) return;
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("id", showDeleteModal);
        await deleteProduct(formData);
        setProducts((prev) => prev.filter((p) => p.id !== showDeleteModal));
      } finally {
        setShowDeleteModal(null);
      }
    });
  }

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Filter products..."
          className="w-full  pl-10 pr-4 py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          onChange={handleQueryChange}
          value={query}
        />
      </div>

      {/* MOBILE VIEW (Cards) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {paginated.map((product) => (
          <div key={product.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 leading-tight">{product.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{product.sku || "No SKU"}</p>
              </div>
              <button onClick={() => setShowDeleteModal(product.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-slate-50 pt-4">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Price</span>
                <span className="font-bold text-slate-900">${Number(product.price).toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Stock</span>
                <span className={`font-bold ${product.quantity <= product.lowStockAt ? 'text-red-600' : 'text-slate-700'}`}>{product.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW (Table) */}
      <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Product Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">SKU</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">In Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-semibold text-slate-900">{product.name}</td>
                <td className="px-6 py-4 text-slate-500 font-mono text-sm">{product.sku || "—"}</td>
                <td className="px-6 py-4 font-medium text-slate-700">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.quantity <= product.lowStockAt ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    <span className="font-medium text-slate-700">{product.quantity}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setShowDeleteModal(product.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 px-2">
          <p className="text-sm text-slate-400 font-medium">Showing page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-all">Next</button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 overflow-hidden">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Are you sure?</h3>
              <p className="text-slate-500 mt-2 text-sm">Deleting this product is permanent and cannot be undone.</p>
            </div>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setShowDeleteModal(null)} className="flex-1 px-4 py-3 text-sm font-bold text-slate-700 bg-slate-100 rounded-2xl hover:bg-slate-200 transition">Keep it</button>
              <button onClick={handleDeleteConfirm} disabled={isDeleting} className="flex-1 px-4 py-3 text-sm font-bold text-white bg-red-600 rounded-2xl hover:bg-red-700 transition">
                {isDeleting ? "..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}