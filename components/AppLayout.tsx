"use client";

import { ReactNode, useState, useEffect } from "react";
import Sidebar from "./sidebar";

type AppLayoutProps = {
    children: ReactNode;
    currentPath: string;
};

// Breakpoint for medium screens (md:) in Tailwind is 768px
const MD_BREAKPOINT = 768; 

export default function AppLayout({ children, currentPath }: AppLayoutProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); // State for desktop collapse (w-64 <-> w-20)
     // State for mobile menu visibility

    useEffect(() => {
        const handleResize = () => {
            const currentIsMobile = window.innerWidth < MD_BREAKPOINT;
            setIsMobile(currentIsMobile);
            
      
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Determine the margin for desktop/tablet screens using Tailwind prefixes.
    // The base margin (ml-0) is implicitly mobile's margin, as the sidebar is fixed and slides over content.
    const desktopMarginClass = isCollapsed ? "md:ml-20" : "md:ml-64";

    return (
        <div className="min-h-screen">
            <Sidebar
                currentPath={currentPath}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                isMobile={isMobile}
             
            />
            
            {/* Main content area: 
            - ml-0: Base margin for mobile/small screens (sidebar slides over).
            - md:ml-20/md:ml-64: Dynamic margin applied via state for desktop screens.
            - flex-1: Ensures content takes up all available space.
            */}
            <main 
                className={`
                    min-h-screen bg-gray-50 flex-1 transition-all duration-300 ease-in-out p-8  ml-16  ${desktopMarginClass}
                `}
            >
                {children}
            </main>
        </div>
    );
}