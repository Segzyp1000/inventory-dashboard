import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { AccountSettings } from "@stackframe/stack";

export default async function SettingsPage() {
  // Assuming getCurrentUser is a server function
  const user = await getCurrentUser(); 

  return (
    // Outer container provides the full-screen gradient background
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      <Sidebar currentPath="/settings" />

      {/* Main content area, offset by the sidebar width (ml-64) */}
      <main className="ml-64 p-8 md:p-10">
        
        {/* Header - Uses dark text for high contrast against the light background */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Settings
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Content Container for AccountSettings */}
        <div className="max-w-7xl">
          {/* White card container for visual separation and depth, giving the content a clean backdrop. */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 transform hover:shadow-3xl transition-all duration-300 ease-in-out">
            {/* The AccountSettings component is styled by the custom dark gray theme set in globals.css. */}
            <AccountSettings fullPage />
          </div>
        </div>
      </main>
    </div>
  );
}