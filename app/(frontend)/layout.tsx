// Admin layout: wraps all routes under (admin) with the admin shell
// - Centralizes Sidebar + Header so individual admin pages stay lean
// - You can add auth checks or role-based guards here later
// - This layout does not change the URL because (admin) is a route group

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      /* Tip: These CSS variables control sizes. Adjust as needed. */
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      {/* Persistent admin sidebar */}
      <AppSidebar variant="inset" />

      {/* Inset = content area that accounts for sidebar width */}
      <SidebarInset>
        {/* Sticky admin header */}
        <SiteHeader />

        {/* Page content area */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {/* Standardized padding/gaps for admin pages */}
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}