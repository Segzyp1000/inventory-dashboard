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
    // Standard favicon using PNG format
    icon: {
      url: '/logo.png',
      type: 'image/png',
    },
    // Shortcut icon (common for older browsers)
    shortcut: {
      url: '/logo.png',
      type: 'image/png',
    },
    // Apple touch icon for mobile home screens
    apple: {
      url: '/logo.png',
      sizes: '180x180',
    },
    // Optional: ICO file path if you have one, often best for compatibility
    // other: [
    //   {
    //     rel: 'icon',
    //     url: '/favicon.ico',
    //     type: 'image/x-icon',
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackClientApp}><StackTheme>
        {children}
      </StackTheme></StackProvider></body>
    </html>
  );
}