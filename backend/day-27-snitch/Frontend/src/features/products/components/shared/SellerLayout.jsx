import React from "react";
import SellerSidebar from "./SellerSidebar.jsx";
import StudioSidebar from "../seller-product/StudioSidebar.jsx";
import SellerTopBar from "./SellerTopBar.jsx";
import SellerFooter from "./SellerFooter.jsx";
import Toast from "../../../shared/components/Toast.jsx";

/**
 * SellerLayout — master layout wrapper for all seller pages
 * Props:
 *   activePage:    "dashboard" | "create-listing" – sidebar active state
 *   headerTitle:   string – top bar title (optional)
 *   footerLinks:   Array<{ label, href }> – footer navigation (optional)
 *   toast:         { title, message, icon? } | null – toast notification data
 *   mobileActions: ReactNode – custom mobile bottom bar content (optional)
 *   sidebarType:   "seller" | "studio" – swaps sidebar contextual layouts
 *   activeSection: string – currently active anchor section for studio
 *   onSectionClick:function – click handler for studio anchor sections
 *   children:      ReactNode – the page body content
 */
const SellerLayout = ({
  activePage,
  headerTitle,
  footerLinks,
  toast,
  mobileActions,
  sidebarType = "seller",
  activeSection = "overview",
  onSectionClick,
  children,
}) => {
  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col md:flex-row text-charcoal-400 select-none antialiased">
      {/* Toast Notification */}
      {toast && (
        <Toast title={toast.title} message={toast.message} icon={toast.icon} />
      )}

      {/* Sidebar */}
      {sidebarType === "studio" ? (
        <StudioSidebar activeSection={activeSection} onSectionClick={onSectionClick} />
      ) : (
        <SellerSidebar activePage={activePage} />
      )}

      {/* Main Content Viewport */}
      <main className="grow md:pl-64 min-h-screen flex flex-col justify-between">
        {/* Top Bar */}
        <SellerTopBar title={headerTitle} />

        {/* Page Content */}
        <div className="grow px-8 md:px-16 py-12 max-w-300 w-full mx-auto">
          {children}
        </div>

        {/* Mobile Bottom Bar (page-specific) */}
        {mobileActions && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-charcoal-950 border-t border-charcoal-850 px-6 py-4 flex gap-4">
            {mobileActions}
          </div>
        )}

        {/* Footer */}
        <SellerFooter links={footerLinks} />
      </main>
    </div>
  );
};

export default SellerLayout;
