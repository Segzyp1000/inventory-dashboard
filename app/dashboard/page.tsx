import AppLayout from "@/components/AppLayout";
import { getCurrentUser } from "@/lib/auth";
import ProductChart from "@/components/product-chat";
import { prisma } from "@/lib/prisma";
import { Package, BarChart3 } from "lucide-react"; // Removed Settings import

// Define the shape of the data returned from Prisma
interface ProductData {
  id: string;
  name: string;
  price: string | number;
  quantity: number;
  createdAt: Date;
  lowStockAt?: number;
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  description: string;
}

function MetricCard({ title, value, icon, description }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-transform transform hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      </div>
      <p className="mt-4 text-xs text-gray-400">{description}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  // Fetch product data
  const totalProducts = await prisma.product.count({ where: { userId } });

  const lowStock = await prisma.product.count({
    where: {
      userId,
      quantity: { lte: 5 },
    },
  });

  const allProducts = await prisma.product.findMany({
    where: { userId },
    select: { price: true, quantity: true, createdAt: true },
  });

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      quantity: true,
      createdAt: true,
      lowStockAt: true,
    },
  });

  // Calculate inventory value
  const totalVal = allProducts.reduce(
    (sum, product) => sum + Number(product.price) * Number(product.quantity),
    0
  );

  const formattedTotalVal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalVal);

  const formattedTotalProducts = totalProducts.toLocaleString();
  const formattedLowStock = lowStock.toLocaleString();

  // Weekly product data
  const weeklyProductData: { week: string; products: number }[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `Week of ${weekStart.toLocaleDateString()}`;

    const weekProducts = allProducts.filter((product) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyProductData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  return (
    // 1. AppLayout now provides the main container, min-h-screen, and background
    // 2. The children of AppLayout are automatically rendered inside its dynamically margined <main> tag
    <AppLayout currentPath="/dashboard">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Inventory Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here is an overview of your inventory metrics and
          recent activity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Products"
          value={formattedTotalProducts}
          icon={<Package className="w-6 h-6 text-indigo-600" />}
          description="Total unique items tracked in your inventory."
        />
        <MetricCard
          title="Low Stock Items"
          value={formattedLowStock}
          icon={<BarChart3 className="w-6 h-6 text-red-600" />}
          description="Products below the critical threshold (quantity ≤ 5)."
        />
        <MetricCard
          title="Total Inventory Value"
          value={formattedTotalVal}
          // Assuming 'Settings' was a placeholder icon, replacing it with Package for safety/simplification
          icon={<Package className="w-6 h-6 text-green-600" />} 
          description="Estimated total monetary value of all current stock."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {recent.map((product) => {
              const stockLevel =
                product.quantity === 0
                  ? 0
                  : product.quantity <= (product.lowStockAt || 5)
                  ? 1
                  : 2;

              const bgColor = ["bg-red-600", "bg-yellow-400", "bg-green-600"];
              const textColor = [
                "text-red-600",
                "text-yellow-600",
                "text-green-600",
              ];
              const stockLabel = ["Out of Stock", "Low Stock", "In Stock"];

              return (
                <li
                  key={product.id}
                  className="flex justify-between items-center text-sm border-b border-gray-200 pb-2 animate-fade-in"
                >
                  <div className="font-medium flex gap-2 truncate text-gray-400 items-center">
                    <div
                      className={`w-3 h-3 mt-1 rounded-full ${bgColor[stockLevel]}`}
                      title={stockLabel[stockLevel]}
                    />
                    {product.name}
                 
                  <span
                    className={`text-sm font-medium ${textColor[stockLevel]}`}
                  >
                    {product.quantity === 0
                      ? "out of stock"
                      : `${product.quantity} in stock`}
                  </span> 
                   </div>
                  <span className="text-gray-500 text-xs">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between h-full min-h-[250px]">
          <div className="w-full mb-4">
            <p className="text-sm text-gray-400 font-medium">
              New Products Per Week
            </p>
          </div>

          <div className="w-full flex-1 flex items-center justify-center">
            <ProductChart data={weeklyProductData} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}