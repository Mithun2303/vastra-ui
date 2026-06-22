import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrand, logoutUser } from "@/lib/mockApi";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KpiCards from "@/components/dashboard/KpiCards";
import MarketPulse from "@/components/dashboard/MarketPulse";
import RecentAnalyses from "@/components/dashboard/RecentAnalyses";
import QuickActions from "@/components/dashboard/QuickActions";
import SignalHighlights from "@/components/dashboard/SignalHighlights";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import ProductionTimeline from "@/components/dashboard/ProductionTimeline";
import PricingIntelligence from "@/components/dashboard/PricingIntelligence";
import EmptyState from "@/components/dashboard/EmptyState";

export default function Dashboard() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrand();
        setBrand(data);
      } catch (err) {
        setError("Failed to load brand data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrand();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-maroon border-t-transparent" />
          <p className="mt-4 text-[13px] text-muted">
            Loading your intelligence hub...
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout brand={brand} onLogout={handleLogout}>
      {error && (
        <div className="mb-6 rounded-xl border border-accent-red/20 bg-accent-red-bg p-4 text-[13px] text-accent-red">
          {error}
        </div>
      )}

      {brand ? (
        <div className="space-y-8">
          {/* Section 1: KPI Cards */}
          <KpiCards />

          {/* Section 2: Market Intelligence */}
          <MarketPulse />

          {/* Section 3: Recent Analyses */}
          <RecentAnalyses />

          {/* Section 4: Quick Actions */}
          <QuickActions />

          {/* Section 5: Signal Highlights */}
          <SignalHighlights />

          {/* Section 6 + 7: Recommendations + Timeline side by side */}
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <AiRecommendations />
            <ProductionTimeline />
          </div>

          {/* Section 8: Pricing Intelligence */}
          <PricingIntelligence />
        </div>
      ) : (
        <EmptyState />
      )}
    </DashboardLayout>
  );
}