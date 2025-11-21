import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="bg-gray-900 min-h-screen ">
      <Sidebar currentPath="/settings" />

      <main className="ml-64 p-8 md:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-gray-200 tracking-tight leading-tight">
            Settings
          </h1>
          <p className="mt-3 text-lg text-gray-100 max-w-2xl">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Content Container for AccountSettings */}
        <div className="max-w-7xl border-gray-200">
          <div className=" rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12 transform hover:shadow-3xl transition-all duration-300 ease-in-out">
            {/* The AccountSettings component from Stackframe */}
            {/* Note: Tailwind is available for styling the AccountSettings content through CSS isolation/global styles */}
            <AccountSettings fullPage />
          </div>
        </div>
      </main>
    </div>
  );
}