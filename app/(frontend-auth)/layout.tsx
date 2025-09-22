// Frontend layout: wraps the customer-facing site under (frontend)
// - Keep common UI like Topbar, Navbar, Footer here
// - Add Suspense boundaries and skeletons for slow subtrees
// - This layout does not affect the URL because (frontend) is a route group

import { ModeToggle } from "@/components/theme-toggle";
import React, { Suspense } from "react";

export default function FrontendAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <>
        <div className="fixed top-4 right-4 z-10">
          <ModeToggle />
        </div>
        <div
          className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("viewer_assets/images/auth-image1.png")',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-sky-600 dark:text-sky-400 font-sans">
                SPARK
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Sign in or create an account to start your journey.
              </p>
            </div>

            {/* Suspense helps stream page content and show fallbacks fast */}
            <Suspense
              fallback={
                <div className="container mx-auto p-4">Loading page…</div>
              }
            >
              {children}
            </Suspense>

            
          </div>
        </div>
      </>
    </div>
  );
}
