import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/lib/store/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPARK",
  description: "Order medicines, lab tests, and consult doctors near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Global providers for theme, auth, analytics, etc. */}
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Stream route children and show a generic fallback quickly */}
            <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading…</div>}>
              {children}
            </Suspense>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
