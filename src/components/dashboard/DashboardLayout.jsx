import { useState } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

export default function DashboardLayout({ brand, onLogout, children }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed left-0 top-0 z-40 h-screen"
      >
        <Sidebar
          brand={brand}
          onLogout={onLogout}
          collapsed={!hovered}
        />
      </div>

      <div
        className={`flex flex-1 flex-col transition-all duration-300 ${
          !hovered ? "ml-[72px]" : "ml-[260px]"
        }`}
      >
        <TopHeader brand={brand} />

        <main className="flex-1 overflow-y-auto dashboard-scroll">
          <div className="mx-auto max-w-[1200px] px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

