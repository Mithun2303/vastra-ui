import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { logoutUser } from "@/lib/mockApi";

export default function DashboardLayout({ brand, onLogout, children }) {
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-cream">
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
          onLogout={handleLogout}
          collapsed={!hovered}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      <div
        className={`flex min-w-0 w-full max-w-full flex-1 flex-col transition-all duration-300 ml-0 md:pl-0 ${
          !hovered ? "md:ml-[72px]" : "md:ml-[260px]"
        }`}
      >
        <TopHeader brand={brand} onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />

        <main className="min-w-0 w-full flex-1 overflow-x-hidden overflow-y-auto dashboard-scroll">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-8 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

