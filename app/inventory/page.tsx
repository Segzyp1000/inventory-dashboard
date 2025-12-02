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
        <div  className="mb-4 text-gray-800">
        <h1 className="md:text-3xl text-2xl font-semibold ">Inventory</h1>
        <span>
        <p className=" text-[14px] md:text-[18px]">Manage your product and track inventory</p>
        <Link href="/add-product">
        <button className="bg-gray-800 text-gray-200 p-1.5 text-[12px] md:text-[16px] cursor-pointer hover:bg-gray-200 hover:text-gray-600 rounded-lg mt-2 ">Add product</button>
        </Link>
        </span>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <InventoryTable initialProducts={products} />
        </div>
      </AppLayout>
  );
}