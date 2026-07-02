import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check, X, ChevronRight, Clock, Film, IndianRupee,
  Sparkles, AlertTriangle, ArrowRight, TrendingUp, Zap,
  ThermometerSun, Scissors, Palette, ShieldCheck
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { AI_RECOMMENDATIONS } from "@/lib/dashboardData";
import { getBrand } from "@/lib/mockApi";

/* ─── Decision Data ─── */
const DECISION = {
  verdict: "Modify",
  confidence: 63,
  product: "Block Print A-Line Kurti",
  category: "Kurti",
  city: "Coimbatore",
  analyzedAt: "2 hours ago",
  summary: "The core design has strong market potential — demand is rising and competitors have gaps. However, fabric weight and sleeve length need adjustment for the current weather conditions.",
};

const REASONING = [
  {
    icon: TrendingUp,
    title: "Demand is rising",
    detail: "+18% week-over-week in cotton kurti searches across Tirupur and Coimbatore belt.",
    sentiment: "positive",
  },
  {
    icon: ShieldCheck,
    title: "Competitor gaps detected",
    detail: "4 local boutiques posted 'sold out' on floral cotton kurti this week. Market opportunity exists.",
    sentiment: "positive",
  },
  {
    icon: ThermometerSun,
    title: "Weather mismatch",
    detail: "Thick fabric + full sleeve at 38°C heat index = Weather score 34/100. Execution needs adjustment.",
    sentiment: "negative",
  },
];

const MODIFICATIONS = {
  remove: [
    { label: "Thick cotton knit fabric", reason: "Too heavy for 38°C heat · Weather score penalty" },
    { label: "Full sleeve", reason: "Reduces demand at current heat index" },
  ],
  add: [
    { label: "Lightweight cotton-linen blend", reason: "Breathable, same print achievable, summer-appropriate" },
    { label: "¾ or short sleeve", reason: "Keep modest midi length — Tirupur prefers regular fit" },
    { label: "Keep colour story", reason: "Earthy rust + warm amber matches Vikram 2 film signal" },
  ],
};

const TIMELINE_STEPS = [
  { label: "Confirm", day: "Today", desc: "Confirm lightweight fabric supplier", active: true },
  { label: "Source", day: "Day 1–3", desc: "Source cotton-linen blend" },
  { label: "Produce", day: "Day 4–16", desc: "Batch of 50–100 pcs" },
  { label: "Shoot", day: "Day 17–18", desc: "Photography + catalogue" },
  { label: "Launch", day: "Day 19", desc: "Reel goes live", highlight: true },
];

const PRICE_INTEL = {
  yours: "₹799",
  bandLow: "₹649",
  bandHigh: "₹849",
  city: "Tirupur",
  status: "Within range",
};

const FILM_SIGNAL = {
  title: "Vikram 2 — Releasing Friday",
  body: "Female lead wears block-print ethnic cotton in 70% of promos. Rust + earthy tones match your modified product exactly.",
  urgency: "9 days of film demand window remain",
};

/* ─── Confidence Ring ─── */
function ConfidenceRing({ value, size = 64 }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  const target = circ - (value / 100) * circ;

  useEffect(() => {
    const t = setTimeout(() => setOffset(target), 300);
    return () => clearTimeout(t);
  }, [target]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 60 60" className="-rotate-90">
        <circle cx="30" cy="30" r={r} fill="none" stroke="#f0ede8" strokeWidth="4" />
        <circle
          cx="30" cy="30" r={r} fill="none"
          stroke="#7b1c2e" strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[15px] font-bold text-charcoal">{value}%</span>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function RecommendationsPage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try { setBrand(await getBrand()); } catch (e) { console.error(e); }
    };
    fetchBrand();
  }, []);

  const verdictColors = {
    Produce: { bg: "bg-accent-green-bg", text: "text-accent-green", dot: "bg-accent-green" },
    Modify: { bg: "bg-accent-amber-bg", text: "text-accent-amber", dot: "bg-accent-amber" },
    Hold: { bg: "bg-accent-blue-bg", text: "text-accent-blue", dot: "bg-accent-blue" },
    Drop: { bg: "bg-accent-red-bg", text: "text-accent-red", dot: "bg-accent-red" },
  };
  const vc = verdictColors[DECISION.verdict] || verdictColors.Modify;

  return (
    <DashboardLayout brand={brand}>
      <div className="min-w-0 w-full max-w-full space-y-6">

        {/* ── HEADER ── */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-maroon" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-maroon">Decision Engine</span>
          </div>
          <h1 className="font-playfair text-3xl font-bold tracking-wide text-charcoal">
            Recommendations
          </h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
            AI-powered verdict based on all 10 intelligence signals.
          </p>
        </div>

        {/* ── VERDICT CARD ── */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
              <ConfidenceRing value={DECISION.confidence} />
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-3">
                  <h2 className="font-playfair text-lg font-bold text-charcoal sm:text-xl">{DECISION.product}</h2>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold ${vc.bg} ${vc.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${vc.dot}`} />
                    {DECISION.verdict}
                  </span>
                </div>
                <p className="text-[12px] text-muted">
                  {DECISION.category} · {DECISION.city} · Analyzed {DECISION.analyzedAt}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted/60 block">Confidence</span>
              <span className="text-2xl font-bold text-charcoal">{DECISION.confidence}%</span>
            </div>
          </div>
          <div className="mt-5 border-t border-border-light pt-4">
            <p className="text-[13px] text-muted leading-relaxed">{DECISION.summary}</p>
          </div>
        </div>

        {/* ── REASONING CARDS ── */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted/60 mb-3">Why this verdict?</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {REASONING.map((r, i) => {
              const Icon = r.icon;
              const isPositive = r.sentiment === "positive";
              return (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    isPositive
                      ? "border-accent-green/15 bg-white"
                      : "border-accent-red/15 bg-white"
                  }`}
                >
                  <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${
                    isPositive ? "bg-accent-green-bg text-accent-green" : "bg-accent-red-bg text-accent-red"
                  }`}>
                    <Icon size={16} />
                  </div>
                  <h4 className="text-[14px] font-bold text-charcoal mb-1">{r.title}</h4>
                  <p className="text-[11px] text-muted leading-relaxed">{r.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── WHAT TO CHANGE — Side by Side ── */}
        <div className="grid gap-5 lg:grid-cols-2">

          {/* Remove */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-red-bg text-accent-red">
                <X size={15} />
              </div>
              <h3 className="text-[13px] font-bold text-charcoal">Remove</h3>
            </div>
            <div className="space-y-3">
              {MODIFICATIONS.remove.map((m, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-accent-red/10 bg-accent-red-bg/30 p-4">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-red text-white flex-shrink-0">
                    <X size={11} />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-charcoal">{m.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{m.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-green-bg text-accent-green">
                <Check size={15} />
              </div>
              <h3 className="text-[13px] font-bold text-charcoal">Replace with</h3>
            </div>
            <div className="space-y-3">
              {MODIFICATIONS.add.map((m, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-accent-green/10 bg-accent-green-bg/30 p-4">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-green text-white flex-shrink-0">
                    <Check size={11} />
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-charcoal">{m.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{m.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PRODUCTION TIMELINE — Horizontal ── */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted/60 mb-5">Production Timeline · 19 Days</h3>
          <div className="min-w-0 overflow-x-auto pb-2">
            <div className="flex min-w-max items-start gap-0">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={i} className="flex min-w-[120px] flex-1 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Dot */}
                  <div className={`h-3.5 w-3.5 rounded-full border-2 ${
                    step.active
                      ? "border-maroon bg-maroon"
                      : step.highlight
                        ? "border-accent-green bg-accent-green"
                        : "border-border-light bg-white"
                  }`} />
                  {/* Line (except last) */}
                  {i < TIMELINE_STEPS.length - 1 && (
                    <div className="w-full h-[2px] bg-border-light mt-[5px]" style={{ width: '100%', position: 'relative' }} />
                  )}
                </div>
                <div className="ml-0 pl-2 pr-4">
                  <span className={`text-[10px] font-bold block ${
                    step.active ? "text-maroon" : step.highlight ? "text-accent-green" : "text-muted/60"
                  }`}>
                    {step.day}
                  </span>
                  <span className="text-[12px] font-bold text-charcoal block mt-0.5">{step.label}</span>
                  <span className="text-[10px] text-muted block mt-0.5">{step.desc}</span>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* ── FILM SIGNAL + PRICE INTEL — Side by Side ── */}
        <div className="grid gap-5 lg:grid-cols-2">

          {/* Film Signal */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/5 text-maroon">
                <Film size={15} />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-charcoal">Film Signal Active</h3>
                <p className="text-[10px] text-muted">Trending cultural moment detected</p>
              </div>
            </div>
            <h4 className="font-playfair text-lg font-bold text-charcoal mb-2">{FILM_SIGNAL.title}</h4>
            <p className="text-[12px] text-muted leading-relaxed mb-4">{FILM_SIGNAL.body}</p>
            <div className="flex items-center gap-2 rounded-xl bg-accent-amber-bg border border-accent-amber/15 px-4 py-3">
              <Zap size={14} className="text-accent-amber flex-shrink-0" />
              <span className="text-[11px] font-bold text-accent-amber">{FILM_SIGNAL.urgency}</span>
            </div>
          </div>

          {/* Price Intelligence */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/5 text-maroon">
                <IndianRupee size={15} />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-charcoal">Price Intelligence</h3>
                <p className="text-[10px] text-muted">{PRICE_INTEL.city} market analysis</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-xl bg-surface-secondary p-3.5 text-center">
                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted/60 block">Your Price</span>
                <span className="font-playfair text-lg font-bold text-charcoal block mt-1">{PRICE_INTEL.yours}</span>
              </div>
              <div className="rounded-xl bg-surface-secondary p-3.5 text-center">
                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted/60 block">Market Band</span>
                <span className="font-playfair text-lg font-bold text-charcoal block mt-1">{PRICE_INTEL.bandLow}–{PRICE_INTEL.bandHigh}</span>
              </div>
              <div className="rounded-xl bg-accent-green-bg p-3.5 text-center">
                <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted/60 block">Status</span>
                <span className="text-lg font-bold text-accent-green block mt-1">✓ Good</span>
              </div>
            </div>
            <p className="text-[12px] text-muted leading-relaxed">
              Your price is well-positioned within the best-selling band for cotton kurtis in {PRICE_INTEL.city}. <span className="font-semibold text-accent-green">No change needed.</span>
            </p>
          </div>
        </div>

        {/* ── AI INSIGHTS ── */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/5">
                <Sparkles size={15} className="text-maroon" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-charcoal">AI Insights</h3>
                <p className="text-[10px] text-muted">Personalized recommendations for your market</p>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {AI_RECOMMENDATIONS.map((rec) => {
              const typeColors = {
                material: { accent: "#8b7193", bg: "bg-[#8b7193]/5" },
                timing: { accent: "#6b8f71", bg: "bg-[#6b8f71]/5" },
                opportunity: { accent: "#7b1c2e", bg: "bg-[#7b1c2e]/5" },
                pricing: { accent: "#b8922a", bg: "bg-[#b8922a]/5" },
              };
              const tc = typeColors[rec.type] || typeColors.material;
              return (
                <div
                  key={rec.id}
                  className="flex gap-4 rounded-xl border border-border-light p-4 transition-all hover:border-border hover:bg-surface-secondary"
                  style={{ borderLeftWidth: 3, borderLeftColor: tc.accent }}
                >
                  <div className="flex-1">
                    <p className="text-[12px] text-charcoal leading-relaxed">{rec.text}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: tc.accent }}
                      >
                        {rec.type}
                      </span>
                      <span className="text-[10px] text-muted">{rec.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-charcoal">{rec.confidence}%</span>
                    <span className="text-[8px] text-muted uppercase tracking-wider">conf.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div>
            <h3 className="text-[15px] font-bold text-charcoal">Ready to execute?</h3>
            <p className="text-[12px] text-muted mt-0.5">Apply these modifications and generate your reel brief</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="group inline-flex items-center gap-2 rounded-2xl bg-maroon px-6 py-3 text-[12px] font-bold text-white shadow-lg shadow-maroon/15 transition-all hover:bg-maroon-light hover:shadow-xl hover:shadow-maroon/20 hover:-translate-y-0.5"
          >
            Get Your Reel Brief
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
