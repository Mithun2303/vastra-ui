import { IndianRupee } from "lucide-react";
import { PRICING_DATA } from "@/lib/dashboardData";

function PriceRangeBar() {
  const { min, ideal, max } = PRICING_DATA.recommended;
  const rangeMin = min - 200;
  const rangeMax = max + 200;
  const totalRange = rangeMax - rangeMin;

  const minPos = ((min - rangeMin) / totalRange) * 100;
  const idealPos = ((ideal - rangeMin) / totalRange) * 100;
  const maxPos = ((max - rangeMin) / totalRange) * 100;

  return (
    <div className="relative mb-8 mt-6">
      {/* Track */}
      <div className="h-3 rounded-full bg-border-light">
        {/* Active range */}
        <div
          className="absolute h-3 rounded-full bg-gradient-to-r from-accent-amber via-accent-green to-accent-amber"
          style={{
            left: `${minPos}%`,
            width: `${maxPos - minPos}%`,
          }}
        />
      </div>

      {/* Min marker */}
      <div
        className="absolute -top-1"
        style={{ left: `${minPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-5 w-0.5 bg-accent-amber" />
        <div className="mt-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Min
          </p>
          <p className="text-sm font-bold text-charcoal">₹{min}</p>
        </div>
      </div>

      {/* Ideal marker */}
      <div
        className="absolute -top-2"
        style={{ left: `${idealPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent-green bg-surface shadow-md">
          <div className="h-2.5 w-2.5 rounded-full bg-accent-green" />
        </div>
        <div className="mt-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent-green">
            Ideal
          </p>
          <p className="text-lg font-bold text-charcoal">₹{ideal}</p>
        </div>
      </div>

      {/* Max marker */}
      <div
        className="absolute -top-1"
        style={{ left: `${maxPos}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-5 w-0.5 bg-accent-amber" />
        <div className="mt-2 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Max
          </p>
          <p className="text-sm font-bold text-charcoal">₹{max}</p>
        </div>
      </div>
    </div>
  );
}

function ComparisonBars() {
  const maxVal = Math.max(...PRICING_DATA.comparison.map((c) => c.value));

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
        Market Comparison
      </p>
      {PRICING_DATA.comparison.map((item) => (
        <div key={item.label} className="flex items-center gap-4">
          <span className="w-28 text-[12px] font-medium text-charcoal">
            {item.label}
          </span>
          <div className="flex-1">
            <div className="h-6 overflow-hidden rounded-lg bg-border-light">
              <div
                className="flex h-full items-center rounded-lg px-3 transition-all duration-700"
                style={{
                  width: `${(item.value / maxVal) * 100}%`,
                  backgroundColor: item.color,
                }}
              >
                <span className="text-[11px] font-bold text-white">
                  ₹{item.value}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PricingIntelligence() {
  return (
    <div className="animate-fade-in rounded-2xl border border-border bg-surface p-8">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-amber-bg">
          <IndianRupee size={16} className="text-accent-amber" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon">
            Pricing Intelligence
          </p>
          <h3 className="mt-0.5 text-lg font-semibold text-charcoal">
            Recommended Price Range
          </h3>
        </div>
      </div>

      <PriceRangeBar />

      <div className="mt-16">
        <ComparisonBars />
      </div>
    </div>
  );
}
