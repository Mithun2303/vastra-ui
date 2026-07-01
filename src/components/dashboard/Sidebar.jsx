import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Sparkles, ShoppingBag, Activity,
  Lightbulb, Calendar, IndianRupee, MapPin, Settings,
  LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/dashboardData";

const ICON_MAP = {
  "layout-dashboard": LayoutDashboard,
  sparkles: Sparkles,
  "shopping-bag": ShoppingBag,
  activity: Activity,
  lightbulb: Lightbulb,
  calendar: Calendar,
  "indian-rupee": IndianRupee,
  "map-pin": MapPin,
  settings: Settings,
};

export default function Sidebar({ brand, onLogout, collapsed, mobileOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const activeId = location.pathname.includes("analysis") 
    ? "new-analysis" 
    : location.pathname.includes("products") 
      ? "products" 
      : location.pathname.includes("signals")
        ? "signals"
        : location.pathname.includes("recommendations")
          ? "recommendations"
          : "dashboard";
  const isCollapsed = collapsed && !mobileOpen;

  return (
    <aside
      className={`flex h-screen flex-col border-r border-white/[0.06] bg-sidebar transition-all duration-300 ${
        isCollapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className={`flex h-16 items-center border-b border-white/[0.06] px-5 ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {isCollapsed ? (
          <span className="font-playfair text-lg font-bold text-white">T</span>
        ) : (
          <h1 className="font-playfair text-xl font-bold tracking-[0.15em] text-white">
            TRYN<span className="text-maroon-light">D</span>
          </h1>
        )}

        {/* Mobile close button */}
        {!isCollapsed && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-sidebar-text hover:bg-sidebar-hover hover:text-white md:hidden"
            title="Close Navigation"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 dashboard-scroll">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "dashboard") {
                    navigate("/dashboard");
                  } else if (item.id === "new-analysis") {
                    navigate("/analysis");
                  } else if (item.id === "products") {
                    navigate("/products");
                  } else if (item.id === "signals") {
                    navigate("/signals");
                  } else if (item.id === "recommendations") {
                    navigate("/recommendations");
                  }
                  if (onClose) onClose(); // Close drawer on mobile after clicking
                }}
                title={isCollapsed ? item.label : undefined}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-active text-sidebar-text-active"
                    : "text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? "text-maroon-light" : "text-sidebar-text group-hover:text-sidebar-text-active"
                  }`}
                />
                {!isCollapsed && <span>{item.label}</span>}
                {isActive && !isCollapsed && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-maroon-light" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className={`border-t border-white/[0.06] p-4 ${isCollapsed ? "px-3" : ""}`}>
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white">
              {brand?.brandName?.charAt(0) || "T"}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white">
              {brand?.brandName?.charAt(0) || "T"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-white">
                {brand?.brandName || "TRYND User"}
              </p>
              <p className="text-[11px] text-sidebar-text">
                {brand?.city || "South India"}
              </p>
            </div>
            <button
              onClick={onLogout}
              title="Sign Out"
              className="rounded-md p-1.5 text-sidebar-text transition-colors hover:bg-sidebar-hover hover:text-accent-red"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
