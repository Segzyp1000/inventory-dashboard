import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShelfSync - Inventory Management",
  description: "A simple inventory management application built with Next.js",

  icons: {
    icon: [
      // Standard browser favicon (.ico format → required!)
      { url: "/favicon.ico" },

      // Optional PNG favicon
      { url: "/logo.png", type: "image/png" },
    ],

    // Apple devices (home screen icons)
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],

    // Shortcut icon
    shortcut: [
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            {children}
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}