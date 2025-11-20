import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import InventoryTable from "./InventoryTable";

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
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />

      <main className="ml-64 p-8">
        <div  className="text-2xl font-semibold mb-4 text-gray-800">
        <h1>Inventory</h1>
        <p className="text-sm font-light">Manage your product and track inventory</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <InventoryTable initialProducts={products} />
        </div>
      </main>
    </div>
  );
}