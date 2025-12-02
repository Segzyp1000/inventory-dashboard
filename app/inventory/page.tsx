import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import InventoryTable from "./InventoryTable";
import AppLayout from "@/components/AppLayout";

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
        <div  className="mb-4 text-gray-800">
        <h1 className="md:text-2xl text-1xl font-semibold ">Inventory</h1>
        <p className="text-[10px] md:text-[16px]">Manage your product and track inventory</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <InventoryTable initialProducts={products} />
        </div>
      </AppLayout>
  );
}