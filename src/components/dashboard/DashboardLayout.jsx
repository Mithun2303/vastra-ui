import { useState } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

export default function DashboardLayout({ brand, onLogout, children }) {
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Mobile Sidebar Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-35 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${!hovered ? "w-[72px]" : "w-[260px]"}`}
      >
        <Sidebar
          brand={brand}
          onLogout={onLogout}
          collapsed={!hovered}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ml-0 md:pl-0 ${
          !hovered ? "md:ml-[72px]" : "md:ml-[260px]"
        }`}
      >
        <TopHeader brand={brand} onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />

        <main className="flex-1 overflow-y-auto dashboard-scroll">
          <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-8 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

