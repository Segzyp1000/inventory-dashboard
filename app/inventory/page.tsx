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
        <p className="text-sm font-light text-[14px] md:text-[18px]">Manage your product and track inventory</p>
        </span>
        </div>
        <Link href="/add-product">
        <button   className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 space-y cursor-pointer">Add product</button>
        </Link>
      
        </div>
        <div className="bg-white border rounded-lg p-4 ">
          <InventoryTable initialProducts={products} />
        </div>
      </AppLayout>
  );
}