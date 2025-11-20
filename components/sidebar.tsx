import Link from 'next/link';
import Image from 'next/image';
import { BarChart3, Package, Plus, Settings, LucideIcon } from 'lucide-react';
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
    currentPath?: string;
};

export default function Sidebar({ currentPath = '/dashboard' }: SidebarProps) {
    return (
        // Sidebar Container with fixed dark background
        <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-50 flex flex-col justify-between">
            <div>
                {/* Logo and App Name */}
                <div className="flex items-center space-x-3 mb-10 border-b border-gray-700 pb-4">
                    <Image src={Logo} alt="Logo" width={32} height={32} priority className="rounded-md" />
                    <span className="text-xl font-extrabold tracking-tighti italic bold">ShelfSync</span>
                </div>
                
                {/* Navigation Header */}
                <div className="text-xs font-semibold uppercase text-gray-400 mb-2 px-4">Menu</div>
                
                {/* Navigation Links */}
                <nav className="space-y-1">
                    {navigation.map((item, index) => {
                        const isActive = currentPath === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={`
                                    flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
                                    ${isActive 
                                        ? 'bg-indigo-600 font-semibold shadow-md text-white' // Active: Primary color background
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white' // Inactive: Darker background on hover
                                    }
                                `}
                            >
                                {/* Icon and Link Name */}
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className='text-sm'>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* User Button at the Bottom */}
            <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-start text-sm text-gray-300">
                    {/* UserButton from Stackframe/Stack */}
                    <UserButton showUserInfo />
                </div>
            </div>
        </div>
    );
}