import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X, ArrowRight, Zap, Package, Truck, Tag, Eye } from "lucide-react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: "Film Signal Active", body: "Vikram 2 block print styling detected. Earthy tones rising.", time: "2 hours ago", type: "signal", path: "/recommendations", read: false, icon: Zap, color: "text-accent-amber bg-accent-amber-bg border-accent-amber/15" },
  { id: 2, title: "Production Progress", body: "Batch B-2026-02 (Coord Set) has transitioned to Quality Control.", time: "5 hours ago", type: "production", path: "/production", read: false, icon: Package, color: "text-accent-blue bg-accent-blue-bg border-accent-blue/15" },
  { id: 3, title: "Dyeing Sourcing Alert", body: "Monsoon humidity in Tirupur delayed dye dry times.", time: "1 day ago", type: "logistics", path: "/production", read: true, icon: Truck, color: "text-accent-purple bg-accent-purple-bg border-accent-purple/15" },
  { id: 4, title: "Competitor Price Alert", body: "Fabindia block print kurti marked down to ₹1,299.", time: "2 days ago", type: "pricing", path: "/pricing", read: true, icon: Tag, color: "text-accent-green bg-accent-green-bg border-accent-green/15" }
];

export default function TopHeader({ brand, onToggleMobileSidebar }) {
  const greeting = getGreeting();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const bellMenuRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (bellMenuRef.current && !bellMenuRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationClick = (n) => {
    // Mark as read
    setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
    setShowNotifications(false);
    navigate(n.path);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, read: true })));
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3.5 md:px-8 md:py-5">
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile hamburger menu */}
          <button
            onClick={onToggleMobileSidebar}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-surface-secondary text-charcoal hover:bg-neutral-100 md:hidden"
            title="Open Menu"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-[14px] font-semibold leading-tight text-charcoal md:text-lg">
              {greeting},{" "}
              <span className="text-maroon">{brand?.brandName || "TRYND"}</span>
            </h2>
            <p className="mt-0.5 hidden text-[11px] text-muted sm:block md:text-[13px]">
              Here's what's happening in{" "}
              <span className="font-medium text-charcoal">
                {brand?.city || "your market"}
              </span>{" "}
              today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 relative">
          <div className="relative hidden sm:block">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search products, signals..."
              className="h-9 w-40 lg:w-56 rounded-lg border border-border bg-surface-secondary pl-9 pr-4 text-[13px] text-charcoal outline-none transition-all placeholder:text-muted/60 focus:border-maroon/30 focus:ring-2 focus:ring-maroon/10"
            />
          </div>

          {/* BELL BUTTON & DROPDOWN CONTAINER */}
          <div ref={bellMenuRef} className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative flex h-9 w-9 items-center justify-center rounded-lg border bg-surface-secondary transition-colors ${
                showNotifications ? "border-maroon text-maroon" : "border-border text-muted hover:border-maroon/20 hover:text-charcoal"
              }`}
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent-red animate-pulse-dot" />
              )}
            </button>

            {/* NOTIFICATIONS DROPDOWN */}
            {showNotifications && (
              <div className="absolute right-0 top-12 z-50 w-80 md:w-96 rounded-2xl border border-border bg-white shadow-2xl ring-1 ring-black/5 animate-slide-up overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface-secondary/40">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-bold text-charcoal">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-maroon/10 px-2 py-0.5 text-[10px] font-bold text-maroon">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-[10px] font-bold text-maroon hover:text-maroon-light transition-all"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Scrollable List */}
                <div className="max-h-[320px] overflow-y-auto divide-y divide-border-light dashboard-scroll">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-[12px] text-muted italic">No notifications found</div>
                  ) : (
                    notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div 
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`flex items-start gap-3 p-4 text-left transition-all hover:bg-surface-secondary/30 cursor-pointer ${
                            !n.read ? "bg-maroon/[0.01]" : ""
                          }`}
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg border flex-shrink-0 mt-0.5 ${n.color}`}>
                            <Icon size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[12px] font-bold truncate ${!n.read ? "text-charcoal font-semibold" : "text-muted"}`}>
                                {n.title}
                              </span>
                              <span className="text-[10px] text-muted flex-shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-muted mt-1 leading-relaxed line-clamp-2">{n.body}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-4 py-2.5 bg-surface-secondary/20 text-center">
                  <span className="text-[10px] text-muted">Click a notification to run analytics</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white flex-shrink-0">
            {brand?.brandName?.charAt(0) || "T"}
          </div>
        </div>
      </div>

      {/* Mobile Search Input (Visible only on xs screens) */}
      <div className="border-t border-border-light bg-surface px-4 py-2.5 sm:hidden">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search products, signals..."
            className="h-8.5 w-full rounded-lg border border-border bg-surface-secondary pl-9 pr-4 text-[12.5px] text-charcoal outline-none transition-all focus:border-maroon/30"
          />
        </div>
      </div>
    </header>
  );
}
