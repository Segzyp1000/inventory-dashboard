import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import InventoryTable from "./InventoryTable";
import AppLayout from "@/components/AppLayout";
import Link from "next/link";

export default async function InventoryPage() {
  const user = await getCurrentUser();

  const rawProducts = await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });

  const products = rawProducts.map((p) => ({
    ...p,
    price: (p.price as any).toNumber(),
    lowStockAt: p.lowStockAt ?? 0,
  }));

  return (
      <AppLayout currentPath="/inventory" >
        <div  className="mb-4 text-gray-800 flex justify-between items-center flex-wrap gap-4">
          <div>
        <h1 className="md:text-3xl text-2xl font-semibold ">Inventory</h1>
        <span>
        <p className="text-gray-600 text-[14px] md:text-[18px]">Manage your product and track inventory</p>
        </span>
        </div>
       <Link href="/add-product">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer">
              {/* Plus Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Product</span>
            </button>
          </Link>
      
        </div>
        <div className="bg-white border rounded-lg p-4 ">
          <InventoryTable initialProducts={products} />
        </div>
      </AppLayout>
  );
}