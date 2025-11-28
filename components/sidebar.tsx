"use client";

import Link from 'next/link';
import Image from 'next/image';
import { BarChart3, Package, Plus, Settings, LucideIcon, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import Logo from '../public/logo.png';
import { UserButton } from '@stackframe/stack';

interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Add Product', href: '/add-product', icon: Plus },
    { name: 'Settings', href: '/settings', icon: Settings },
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

export default function Sidebar({ 
    currentPath, 
    isCollapsed, 
    setIsCollapsed, 
    isMobile,
    mobileOpen,
    setMobileOpen
}: SidebarProps) {

    // 1. Determine the Sidebar Width Class (Desktop)
    const desktopWidthClass = isCollapsed ? 'w-20' : 'w-64';
    
    // 2. Define Icon-Only Mode (Fix: Defined globally for use throughout the component)
    const isIconOnly = isMobile || isCollapsed; 
    // Text is visible only on desktop when not collapsed. It is hidden on mobile to enforce icon-only mode.
    const isTextVisible = !isMobile && !isCollapsed; 

    // 3. Determine Final Width and Position
    let finalWidthClass = desktopWidthClass;
    let transformClass = '';

    if (isMobile) {
        // Mobile requirement: Always w-20 when open, and slide in/out.
        finalWidthClass = 'w-20'; 
        transformClass = mobileOpen ? 'translate-x-0' : '-translate-x-full';
    }

    const handleDesktopToggle = () => setIsCollapsed(!isCollapsed);

    // Fix: Simplify mobile button position calculation. 
    // The w-20 sidebar is 5rem. left-24 (6rem) puts the button just outside the open sidebar.
    const mobileButtonOpenClass = isMobile ? (mobileOpen ? 'left-24' : 'left-4') : 'left-4';

    return (
        <>
            {/* Mobile Menu Button (Hamburger) - Visible only on small screens */}
            <button
                className={`fixed top-4 z-50 p-1 rounded-lg bg-gray-900 md:hidden text-white shadow-lg transition-all duration-300 ${mobileButtonOpenClass}`}
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
                className={`fixed left-0 top-0 bg-gray-900 text-white min-h-screen p-10 z-50 flex flex-col justify-between
                transition-all duration-300 ease-in-out shadow-2xl
                ${finalWidthClass} ${transformClass}
                `}
                // Adjust padding based on the state for aesthetics
                style={{ padding: isCollapsed && !isMobile ? '1rem 0.5rem' : '1.5rem 1.5rem' }} 
            >
                <div className="overflow-hidden">
                    {/* Logo and App Name */}
                    <div className={`flex items-center space-x-3 mb-8 border-b border-gray-700 pb-4 transition-opacity duration-300 ${isTextVisible ? '' : 'justify-center'}`}>
                        <Link href="/dashboard">
                        <Image src={Logo} alt="Logo" width={32} height={32} priority className="rounded-md" />
                        </Link>
                        
                        {/* Hide text when collapsed or on mobile */}
                        {isTextVisible && (
                            <span className="text-xl font-extrabold tracking-tighti italic bold whitespace-nowrap">ShelfSync</span>
                        )}
                    </div>
                    
                    {/* Navigation Header - Hide when text is not visible */}
                    {isTextVisible && (
                        <div className="text-xs font-semibold uppercase text-gray-400 mb-2 px-4">Menu</div>
                    )}
                    
                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        {navigation.map((item, index) => {
                            const isActive = currentPath === item.href;
                            const Icon = item.icon;
                            
                            // isIconOnly is now correctly defined globally

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`
                                        flex items-center transition-all duration-200 ease-in-out
                                        ${isIconOnly ? 'justify-center px-0 py-3' : 'space-x-3 px-4 py-2'}
                                        ${isActive 
                                            ? 'bg-indigo-600 font-semibold shadow-md text-white' 
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }
                                        rounded-lg
                                    `}
                                    // Close mobile menu on link click
                                    onClick={() => isMobile && setMobileOpen(false)}
                                >
                                    <Icon className="w-5 h-5 shrink-0" />
                                    
                                    {/* Link Name is only shown if not in icon-only mode */}
                                    {isTextVisible && (
                                        <span className='text-sm whitespace-nowrap'>{item.name}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Collapse Button (Desktop Only) */}
                {!isMobile && (
                    <button
                        onClick={handleDesktopToggle}
                        className={`flex justify-center items-center h-10 mt-4 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-300 ease-in-out`}
                        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-5 h-5" />
                        ) : (
                            <ChevronLeft className="w-5 h-5" />
                        )}
                    </button>
                )}
                
                {/* User Button at the Bottom */}
                <div className="pt-4 border-t border-gray-700 mt-4">
  <div
    className={`flex items-center text-sm text-gray-300 ${
      isIconOnly ? "justify-center" : "justify-start"
    }`}
  >
    {/* showUserInfo is tied to isTextVisible */}
    <UserButton showUserInfo={isTextVisible} />
  </div>
</div>

            </div>
        </>
    );
}