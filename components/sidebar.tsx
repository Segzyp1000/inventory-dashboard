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
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobile: boolean;
};

// Tooltip style
const tooltipStyle =
  "absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1 bg-gray-800 text-xs text-white rounded-lg shadow-xl opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap group-hover:opacity-100";

export default function Sidebar({
  currentPath,
  isCollapsed,
  setIsCollapsed,
  isMobile,
}: SidebarProps) {
  // Desktop width (collapsible)
  const desktopWidthClass = isCollapsed ? "w-20" : "w-64";

  // Mobile: always icon-only + always w-20
  const finalWidthClass = isMobile ? "w-20" : desktopWidthClass;

  // Icon-only mode for mobile OR collapsed desktop
  const isIconOnly = isMobile || isCollapsed;
  const isTextVisible = !isMobile && !isCollapsed;

  const handleDesktopToggle = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`
        fixed left-0 top-0 bg-gray-900 text-white min-h-screen z-50 
        shadow-2xl transition-all duration-300 ease-in-out flex flex-col justify-between
        ${finalWidthClass}
      `}
      style={{
        padding: isIconOnly ? "1rem 0.5rem" : "1.5rem 1.5rem",
      }}
    >
      <div className="flex-1">
        {/* Logo */}
        <div
          className={`flex items-center space-x-3 mb-8 border-b border-gray-700 pb-4 relative group ${
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

            {/* Hide text on mobile or when collapsed */}
            {isTextVisible && (
              <span className="text-xl font-extrabold tracking-tight italic">
                ShelfSync
              </span>
            )}
          </Link>

          {/* Tooltip for logo */}
          {isIconOnly && <span className={tooltipStyle}>ShelfSync</span>}
        </div>

        {/* Menu Header (desktop only) */}
        {isTextVisible && (
          <div className="text-xs font-semibold uppercase text-gray-400 mb-2 px-4">
            Menu
          </div>
        )}

        {/* Navigation */}
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
                  group relative flex items-center rounded-lg transition-all duration-200 ease-in-out
                  ${isIconOnly ? "justify-center px-0 py-3" : "space-x-3 px-4 py-2"}
                  ${
                    isActive
                      ? "bg-indigo-600 font-semibold shadow-md text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />

                {isTextVisible && (
                  <span className="text-sm whitespace-nowrap">{item.name}</span>
                )}

                {isIconOnly && <span className={tooltipStyle}>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col">
        {/* Collapse button (desktop only) */}
        {!isMobile && (
          <button
            onClick={handleDesktopToggle}
            className="group relative flex justify-center items-center h-10 mt-4 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}

            <span className={tooltipStyle}>
              {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            </span>
          </button>
        )}

        {/* User Button */}
        <div className="pt-4 border-t border-gray-700 mt-4 group relative">
          <div
            className={`flex items-center text-sm text-gray-300 ${
              isIconOnly ? "justify-center" : "justify-start"
            }`}
          >
            <UserButton showUserInfo={isTextVisible} />
          </div>

          {isIconOnly && <span className={tooltipStyle}>User & Settings</span>}
        </div>
      </div>
    </div>
  );
}