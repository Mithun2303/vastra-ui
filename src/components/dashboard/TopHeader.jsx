import { Search, Bell, Menu } from "lucide-react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function TopHeader({ brand, onToggleMobileSidebar }) {
  const greeting = getGreeting();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3.5 md:px-8 md:py-5">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu */}
          <button
            onClick={onToggleMobileSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-secondary text-charcoal hover:bg-neutral-100 md:hidden"
            title="Open Menu"
          >
            <Menu size={18} />
          </button>

          <div>
            <h2 className="text-[14px] md:text-lg font-semibold text-charcoal leading-tight">
              {greeting},{" "}
              <span className="text-maroon">{brand?.brandName || "TRYND"}</span>
            </h2>
            <p className="mt-0.5 text-[11px] md:text-[13px] text-muted">
              Here's what's happening in{" "}
              <span className="font-medium text-charcoal">
                {brand?.city || "your market"}
              </span>{" "}
              today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
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

          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-secondary text-muted transition-colors hover:border-maroon/20 hover:text-charcoal">
            <Bell size={16} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent-red animate-pulse-dot" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white">
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
