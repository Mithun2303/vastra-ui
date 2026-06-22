import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MARKET_PULSE } from "@/lib/dashboardData";

function CircularScore({ score, size = 140 }) {
  const [animatedOffset, setAnimatedOffset] = useState(283);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedOffset(targetOffset), 100);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="#f0ede8"
          strokeWidth="8"
        />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="#7b1c2e"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-charcoal">{score}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
          / 100
        </span>
      </div>
    </div>
  );
}

function SignalBar({ label, value, direction, color }) {
  const colorMap = {
    green: { bar: "bg-accent-green", text: "text-accent-green" },
    amber: { bar: "bg-accent-amber", text: "text-accent-amber" },
    red: { bar: "bg-accent-red", text: "text-accent-red" },
  };
  const c = colorMap[color] || colorMap.green;

  const DirIcon =
    direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;

  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-[13px] font-medium text-charcoal">{label}</span>
      <div className="flex-1">
        <div className="h-2 overflow-hidden rounded-full bg-border-light">
          <div
            className={`h-full rounded-full ${c.bar} transition-all duration-700`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
      <div className={`flex items-center gap-1 ${c.text}`}>
        <DirIcon size={13} />
        <span className="text-[12px] font-semibold">{value}</span>
      </div>
    </div>
  );
}

export default function MarketPulse() {
  const [selectedCity, setSelectedCity] = useState("Coimbatore");

  return (
    <div className="animate-fade-in rounded-2xl border border-border bg-surface p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon">
            Market Intelligence
          </p>
          <h3 className="mt-1 text-xl font-semibold text-charcoal">
            Today's Market Pulse
          </h3>
        </div>

        <div className="flex gap-1.5">
          {MARKET_PULSE.cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-all ${
                selectedCity === city
                  ? "bg-charcoal text-white"
                  : "bg-surface-secondary text-muted hover:bg-border-light hover:text-charcoal"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          <CircularScore score={MARKET_PULSE.score} size={160} />
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            Signal Breakdown
          </p>
          {MARKET_PULSE.signals.map((signal) => (
            <SignalBar key={signal.label} {...signal} />
          ))}
        </div>
      </div>
    </div>
  );
}
