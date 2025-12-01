"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Package,
  Plus,
  Settings,
  LucideIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Logo from "../public/logo.png";
import { UserButton } from "@stackframe/stack";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Add Product", href: "/add-product", icon: Plus },
  { name: "Settings", href: "/settings", icon: Settings },
];

type SidebarProps = {
  currentPath: string;
  // Props received from AppLayout for desktop collapse state
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  // Props received from AppLayout for mobile state
  isMobile: boolean;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
};

// Define Tooltip styles for consistent application
const tooltipStyle = "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1 bg-gray-800 text-xs text-white rounded-lg shadow-xl opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap group-hover:opacity-100";

export default function Sidebar({
  currentPath,
  isCollapsed,
  setIsCollapsed,
  isMobile,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  // 1. Determine the Sidebar Width Class (Desktop)
  const desktopWidthClass = isCollapsed ? "w-20" : "w-64";

  // 2. Define Icon-Only Mode: True on Mobile OR when Desktop is collapsed.
  const isIconOnly = isMobile || isCollapsed;
  // Text is visible only on desktop when not collapsed.
  const isTextVisible = !isMobile && !isCollapsed;

  // 3. Determine Final Width and Position
  let finalWidthClass = desktopWidthClass;
  let transformClass = "";

  if (isMobile) {
    // Mobile requirement: Always w-20 when open, and slide in/out.
    finalWidthClass = "w-20";
    transformClass = mobileOpen ? "translate-x-0" : "-translate-x-full";
  }

  const handleDesktopToggle = () => setIsCollapsed(!isCollapsed);

  // Mobile button position.
  const mobileButtonClass = mobileOpen ? "right-5" : "right-4"; 

  return (
    <>
      {/* Mobile Menu Button (Hamburger) - Visible only on small screens */}
      <button
        // Positioned outside the sidebar on mobile, transitioning with the sidebar's open state
        className={`fixed top-7 z-50 p-1 rounded-lg bg-gray-900 md:hidden text-white shadow-lg transition-all duration-300 ${mobileButtonClass}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-6" /> : <Menu className="w-5 h-6" />}
      </button>

      {/* Mobile Overlay - Closes menu when clicked outside */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed left-0 top-0 bg-gray-900 text-white min-h-screen z-50 flex flex-col justify-between
          transition-all duration-300 ease-in-out shadow-2xl
          ${finalWidthClass} ${transformClass}
          `}
        // Adjust padding based on the state for aesthetics
        style={{
          padding: isCollapsed && !isMobile ? "1rem 0.5rem" : "1.5rem 1.5rem",
        }}
      >
        <div className="flex-1"> {/* Use flex-1 here to push footer content down */}
          {/* Logo and App Name */}
          <div
            className={`flex items-center space-x-3 mb-8 border-b border-gray-700 pb-4 transition-opacity duration-300 relative group ${
              isTextVisible ? "" : "justify-center"
            }`}
          >
            <Link href="/dashboard" className="flex items-center space-x-3">
              <Image
                src={Logo}
                alt="Logo"
                width={32}
                height={32}
                priority
                className="rounded-md"
              />

              {/* Hide text when collapsed or on mobile */}
              {isTextVisible && (
                <span className="text-xl font-extrabold tracking-tighti italic bold whitespace-nowrap">
                  ShelfSync
                </span>
              )}
            </Link>
            
            {/* Tooltip for Logo (when in icon-only mode) */}
            {isIconOnly && (
              <span className={tooltipStyle}>
                ShelfSync Dashboard
              </span>
            )}
          </div>

          {/* Navigation Header - Hide when text is not visible */}
          {isTextVisible && (
            <div className="text-xs font-semibold uppercase text-gray-400 mb-2 px-4">
              Menu
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navigation.map((item, index) => {
              const isActive = currentPath === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    group relative flex items-center transition-all duration-200 ease-in-out rounded-lg
                    ${
                      isIconOnly
                        ? "justify-center px-0 py-3"
                        : "space-x-3 px-4 py-2"
                    }
                    ${
                      isActive
                        ? "bg-indigo-600 font-semibold shadow-md text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  `}
                  // Close mobile menu on link click
                  onClick={() => isMobile && setMobileOpen(false)}
                >
                  <Icon className="w-5 h-5 shrink-0" />

                  {/* Link Name is only shown if not in icon-only mode */}
                  {isTextVisible && (
                    <span className="text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                  )}

                  {/* Tooltip (Visible only in icon-only mode) */}
                  {isIconOnly && (
                    <span className={tooltipStyle}>
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Collapse Button & User Button */}
        <div className="flex flex-col">
          
          {/* Collapse Button (Desktop Only) */}
          {!isMobile && (
            <button
              onClick={handleDesktopToggle}
              className={`group relative flex justify-center items-center h-10 mt-4 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 ease-in-out`}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
              
              {/* Tooltip for Collapse/Expand button */}
              <span className={tooltipStyle}>
                {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              </span>
            </button>
          )}

          {/* User Button at the Bottom */}
          <div className="pt-4 border-t border-gray-700 mt-4 group relative">
            <div
              className={`flex items-center text-sm text-gray-300 ${
                isIconOnly ? "justify-center" : "justify-start"
              }`}
            >
              {/* showUserInfo is tied to isTextVisible */}
              <UserButton showUserInfo={isTextVisible} />
            </div>

            {/* Tooltip for User Button (only when info is hidden) */}
            {isIconOnly && (
              <span className={tooltipStyle}>
                User & Settings
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}