"use client";

import Logo from "../logo.png";
import Image from "next/image";

/**
 * InventoryLoading Component
 * A centered branded spinner for the ShelfSync inventory page.
 * Note: Local imports are mocked to ensure the preview renders correctly.
 */
export default function App() {
  return (
    /* Mocking layout container for preview */
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="relative flex flex-col items-center">
        
        {/* Main Spinner Container */}
        <div className="relative flex items-center justify-center">
          
          {/* The Spinning Ring */}
          <div className="w-24 h-24 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>
          
          {/* Centered Logo (Static inside the spinning ring) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden p-1">
              <Image
                src={Logo}
                alt="ShelfSync" 
                className="w-full h-full object-contain"
                
                // Fallback for preview environments
                onError={(e) => { 
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://api.dicebear.com/7.x/initials/svg?seed=SS&backgroundColor=7c3aed'; 
                }}
              />
              
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="mt-8 text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            ShelfSync
          </h2>
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-ping"></span>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">
              Updating Inventory...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}