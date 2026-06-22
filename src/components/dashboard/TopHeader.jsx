import { Search, Bell } from "lucide-react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function TopHeader({ brand }) {
  const greeting = getGreeting();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-5">
        <div>
          <h2 className="text-lg font-semibold text-charcoal">
            {greeting},{" "}
            <span className="text-maroon">{brand?.brandName || "TRYND"}</span>
          </h2>
          <p className="mt-0.5 text-[13px] text-muted">
            Here's what's happening in{" "}
            <span className="font-medium text-charcoal">
              {brand?.city || "your market"}
            </span>{" "}
            today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search products, signals..."
              className="h-9 w-56 rounded-lg border border-border bg-surface-secondary pl-9 pr-4 text-[13px] text-charcoal outline-none transition-all placeholder:text-muted/60 focus:border-maroon/30 focus:ring-2 focus:ring-maroon/10"
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
    </header>
  );
}
