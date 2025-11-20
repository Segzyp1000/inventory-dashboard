import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-indigo-50">
      <Sidebar currentPath="/settings" />

      <main className="ml-64 p-8 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className=" font-extrabold text-gray-900 tracking-tight leading-tight">Settings</h1>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Content Container for AccountSettings */}
        <div className="max-w-7xl text-gray-900">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 transform hover:shadow-3xl transition-all duration-300 ease-in-out text-gray-800">
            {/* The AccountSettings component from Stackframe */}
            <AccountSettings fullPage />
          </div>
        </div>
      </main>
    </div>
  );
}