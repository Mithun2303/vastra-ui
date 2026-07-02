import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity, TrendingUp, TrendingDown, Minus, Zap,
  Cloud, Heart, Film, ShoppingBag, Users, Thermometer,
  BarChart3, GraduationCap, Flame, Globe, AlertTriangle, Eye
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { SIGNAL_HIGHLIGHTS, MARKET_PULSE } from "@/lib/dashboardData";
import { getBrand } from "@/lib/mockApi";

/* ─── Extended signal detail data matching the client's 10-signal spread ─── */
const SIGNAL_DETAILS = [
  {
    id: 1, number: "01", title: "Demand Score", score: 72, color: "purple",
    icon: TrendingUp,
    description: "Instagram ↑18% · Pinterest saves ↑62% · 312 \"where from?\" comments",
    detail: "Aggregated demand signals from social media engagement, Pinterest board saves, and purchase-intent comments across influencer posts in your target region.",
    status: "HIGH", statusColor: "green",
  },
  {
    id: 2, number: "02", title: "Competition Score", score: 41, color: "rose",
    icon: BarChart3,
    description: "840 Myntra listings · Ajio 12% discount depth · Low local saturation",
    detail: "Market saturation analysis across Myntra, Ajio, and local boutique listings. Lower score means less competition — a window of opportunity.",
    status: "LOW COMPETITION", statusColor: "green",
  },
  {
    id: 3, number: "03", title: "Weather-Commerce Signal", score: 34, color: "amber",
    icon: Cloud,
    description: "38°C in Tirupur this week. Lightweight cotton performs 3× over thick knit at these temps.",
    detail: "Real-time weather data from IMD cross-referenced with historical fabric performance. Heat indices above 35°C strongly favor lightweight cotton and linen over heavy knit.",
    status: "CAUTION", statusColor: "amber",
  },
  {
    id: 4, number: "04", title: "Wedding Intelligence", score: 62, color: "green",
    icon: Heart,
    description: "31 auspicious dates this month in Tirupur district. Occasion buys up 22% vs previous month.",
    detail: "Tamil calendar muhurtham tracking with regional purchasing pattern correlation. Wedding season drives 40-60% premium on occasion wear categories.",
    status: "POSITIVE", statusColor: "green",
  },
  {
    id: 5, number: "05", title: "Film & OTT Release", score: 81, color: "green",
    icon: Film,
    description: "Vikram 2 releasing Friday. Female lead: block-print ethnic cotton in 70% of promo scenes. Rust + earthy tones match your product.",
    detail: "AI-powered costume analysis of upcoming Tamil/Malayalam film trailers and OTT releases. Colour palettes and silhouettes from promos directly correlate with demand spikes within 2-3 weeks.",
    status: "HIGH", statusColor: "green",
  },
  {
    id: 6, number: "06", title: "Competitor Stock Intel", score: 78, color: "green",
    icon: ShoppingBag,
    description: "4 Tirupur boutiques posted \"sold out\" on floral cotton kurti this week. Gap in market detected.",
    detail: "Live Instagram monitoring of competitor boutiques for stock-out signals. Sold-out posts indicate unmet demand — a gap your brand can fill immediately.",
    status: "GAP DETECTED", statusColor: "green",
  },
  {
    id: 7, number: "07", title: "College Calendar Pulse", score: 68, color: "green",
    icon: GraduationCap,
    description: "PSG Arts College Coimbatore cultural festival in 3 weeks. Indo-western + ethnic cotton spike expected.",
    detail: "Tracking college cultural calendars across TN — these events generate concentrated demand for affordable ethnic and indo-western categories. Localized spikes offer high-volume, low-risk windows.",
    status: "UPCOMING", statusColor: "green",
  },
  {
    id: 8, number: "08", title: "Influencer Geographic Heat", score: 74, color: "green",
    icon: Flame,
    description: "4 Coimbatore micro-influencers posted cotton block-print this week. 180K combined reach. Trend confirmed.",
    detail: "Geo-tagged influencer activity tracking across Instagram. When multiple micro-influencers in the same city post similar styles, it confirms a localized demand trend.",
    status: "TREND CONFIRMED", statusColor: "green",
  },
  {
    id: 9, number: "09", title: "Climate Mood Index", score: 70, color: "green",
    icon: Thermometer,
    description: "Pre-monsoon dry season. Outdoor events active. Bright colours selling. IMD: no alerts.",
    detail: "Combined weather outlook and consumer mood correlation. Clear, dry weather promotes outdoor social activities and boosts retail footfall, especially in open-air markets and exhibitions.",
    status: "GREEN", statusColor: "green",
  },
  {
    id: 10, number: "10", title: "Market Sentiment", score: 85, color: "green",
    icon: Globe,
    description: "No political/cultural disruption in TN market this week. Normal selling conditions. Google News: CLEAR.",
    detail: "Real-time sentiment analysis from Google News and social media. Political disruptions, hartals, and cultural tensions directly impact retail footfall. Clear status indicates optimal selling conditions.",
    status: "CLEAR", statusColor: "green",
  },
];

const SOLD_OUT_ALERTS = [
  {
    handle: "@tirupur_boutique_trends",
    product: "Floral cotton kurti",
    followers: "12K",
    time: "3hrs ago",
  },
  {
    handle: "@cbefashionzone",
    product: "Block print kurti",
    followers: "28K",
    time: "6hrs ago",
  },
  {
    handle: "@madurai_ethnic_store",
    product: "Cotton linen coord set",
    followers: "19K",
    time: "12hrs ago",
  },
  {
    handle: "@erode_designer_hub",
    product: "Embroidered A-line kurti",
    followers: "8.5K",
    time: "1 day ago",
  },
];

const STATUS_MAP = {
  green: {
    bg: "bg-accent-green-bg",
    text: "text-accent-green",
    border: "border-accent-green/20",
    barBg: "bg-accent-green",
  },
  amber: {
    bg: "bg-accent-amber-bg",
    text: "text-accent-amber",
    border: "border-accent-amber/20",
    barBg: "bg-accent-amber",
  },
  red: {
    bg: "bg-accent-red-bg",
    text: "text-accent-red",
    border: "border-accent-red/20",
    barBg: "bg-accent-red",
  },
  purple: {
    bg: "bg-accent-purple-bg",
    text: "text-accent-purple",
    border: "border-accent-purple/20",
    barBg: "bg-accent-purple",
  },
  rose: {
    bg: "bg-accent-red-bg",
    text: "text-accent-red",
    border: "border-accent-red/20",
    barBg: "bg-accent-red",
  },
};

/* ─── Mini sparkline SVG ─── */
function Sparkline({ data, color, w = 80, h = 28 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const colorMap = { green: "#6b8f71", amber: "#b8922a", red: "#b04858", purple: "#8b7193", rose: "#b04858" };
  const stroke = colorMap[color] || colorMap.green;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  // area fill
  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.15" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#sg-${color})`} />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Circular score gauge ─── */
function CircularGauge({ score, size = 180, label }) {
  const [offset, setOffset] = useState(283);
  const radius = 45;
  const circ = 2 * Math.PI * radius;
  const target = circ - (score / 100) * circ;

  useEffect(() => {
    const t = setTimeout(() => setOffset(target), 150);
    return () => clearTimeout(t);
  }, [target]);

  const scoreColor =
    score >= 65 ? "#6b8f71" : score >= 40 ? "#b8922a" : "#b04858";

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#f0ede8" strokeWidth="7" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={scoreColor} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-charcoal">{score}</span>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted/60 mt-0.5">/ 100</span>
      </div>
      {label && (
        <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{label}</span>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function SignalsPage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Coimbatore");
  const [expandedSignal, setExpandedSignal] = useState(null);

  const cities = ["Tirupur", "Coimbatore", "Erode", "Madurai", "Kerala"];

  useEffect(() => {
    const fetchBrand = async () => {
      try { setBrand(await getBrand()); } catch (e) { console.error(e); }
    };
    fetchBrand();
  }, []);

  // Overall composite score
  const overallScore = Math.round(
    SIGNAL_DETAILS.reduce((acc, s) => acc + s.score, 0) / SIGNAL_DETAILS.length
  );

  return (
    <DashboardLayout brand={brand}>
      <div className="min-w-0 w-full max-w-full space-y-8">

        {/* ── HEADER ──────────────────────── */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-accent-purple" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-purple">Intelligence Engine</span>
            </div>
            <h1 className="font-playfair text-3xl font-bold tracking-wide text-charcoal">
              10 Live Signals
            </h1>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
              Real-time market intelligence tailored to your city, product, and price point. Each signal feeds into your final produce/modify/hold/drop decision.
            </p>
          </div>

          {/* City toggle pills */}
          <div className="flex flex-wrap gap-1.5">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`rounded-lg px-3 py-2 text-[11px] font-bold tracking-wide transition-all duration-200 ${
                  selectedCity === city
                    ? "bg-charcoal text-white shadow-md"
                    : "bg-surface-secondary text-muted hover:bg-border-light hover:text-charcoal"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* ── HERO: COMPOSITE SCORE + TOP SIGNALS ── */}
        <div className="grid min-w-0 gap-6 lg:grid-cols-[320px_1fr]">

          {/* Overall Gauge */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-8 shadow-sm">
            <CircularGauge score={overallScore} size={180} label="Composite Score" />
            <p className="mt-4 max-w-[220px] text-center text-[11px] text-muted leading-relaxed">
              Combined intelligence score from all 10 signals for <strong className="text-charcoal">{selectedCity}</strong>
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-[10px] text-muted">Live · Updated 5m ago</span>
            </div>
          </div>

          {/* Primary Signal Bars: Demand + Competition */}
          <div className="space-y-4">
            {SIGNAL_DETAILS.slice(0, 2).map((signal) => {
              const sm = STATUS_MAP[signal.color] || STATUS_MAP.green;
              const statusSm = STATUS_MAP[signal.statusColor] || STATUS_MAP.green;
              const Icon = signal.icon;
              const sparkData = SIGNAL_HIGHLIGHTS.find(s => s.label === signal.title)?.sparkline || [40, 50, 55, 60, 65, signal.score];

              return (
                <div
                  key={signal.id}
                  className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${sm.bg} ${sm.text}`}>
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-playfair text-[17px] font-bold text-charcoal">{signal.title}</h3>
                        <p className="mt-0.5 text-[11px] text-muted">{signal.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-3 self-start sm:self-auto">
                      <Sparkline data={sparkData} color={signal.color} w={90} h={32} />
                      <span className="text-3xl font-bold text-charcoal">{signal.score}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-border-light">
                    <div
                      className={`h-full rounded-full ${sm.barBg} transition-all duration-1000 ease-out`}
                      style={{ width: `${signal.score}%` }}
                    />
                  </div>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] leading-relaxed text-muted sm:max-w-[70%]">{signal.detail}</p>
                    <span className={`self-start rounded-full border px-2.5 py-1 text-[9px] font-bold sm:self-auto ${statusSm.bg} ${statusSm.text} ${statusSm.border}`}>
                      {signal.status} · {signal.score}/100
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SIGNAL CARDS GRID (Signals 3–10) ── */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-[2px] w-5 bg-accent-purple" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-purple">Intelligence Signals</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SIGNAL_DETAILS.slice(2).map((signal) => {
              const statusSm = STATUS_MAP[signal.statusColor] || STATUS_MAP.green;
              const sm = STATUS_MAP[signal.color] || STATUS_MAP.green;
              const Icon = signal.icon;
              const isExpanded = expandedSignal === signal.id;
              const sparkData = [40, 50, 55, 60, 65, signal.score];

              return (
                <div
                  key={signal.id}
                  onClick={() => setExpandedSignal(isExpanded ? null : signal.id)}
                  className={`group relative cursor-pointer rounded-2xl border bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] ${
                    isExpanded
                      ? "border-accent-purple/30 ring-2 ring-accent-purple/10"
                      : "border-border hover:border-accent-purple/15"
                  }`}
                >
                  {/* Signal number watermark */}
                  <span className="absolute right-4 top-3 font-playfair text-4xl font-bold text-charcoal/[0.04]">{signal.number}</span>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${sm.bg} ${sm.text} flex-shrink-0`}>
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-playfair text-[14px] font-bold text-charcoal leading-snug">{signal.title}</h4>
                      <span className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8px] font-bold ${statusSm.bg} ${statusSm.text} ${statusSm.border}`}>
                        <span className={`h-1 w-1 rounded-full ${statusSm.barBg}`} />
                        {signal.status}
                      </span>
                    </div>
                  </div>

                  {/* Score row */}
                  <div className="flex items-end justify-between mb-3">
                    <span className="text-2xl font-bold text-charcoal">{signal.score}</span>
                    <Sparkline data={sparkData} color={signal.statusColor} w={70} h={24} />
                  </div>

                  {/* Bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-light mb-3">
                    <div
                      className={`h-full rounded-full ${statusSm.barBg} transition-all duration-700`}
                      style={{ width: `${signal.score}%` }}
                    />
                  </div>

                  {/* Description — clamped to 2 lines for uniform height */}
                  <p className="text-[10px] text-muted leading-relaxed line-clamp-2">{signal.description}</p>
                </div>
              );
            })}
          </div>

          {/* Expanded detail panel — shown below the grid */}
          {expandedSignal && (() => {
            const signal = SIGNAL_DETAILS.find(s => s.id === expandedSignal);
            if (!signal) return null;
            const statusSm = STATUS_MAP[signal.statusColor] || STATUS_MAP.green;
            const sm = STATUS_MAP[signal.color] || STATUS_MAP.green;
            const Icon = signal.icon;

            return (
              <div className="mt-4 animate-slide-up rounded-2xl border border-accent-purple/15 bg-white p-6 shadow-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${sm.bg} ${sm.text} flex-shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-playfair text-[17px] font-bold text-charcoal">{signal.title}</h4>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9px] font-bold ${statusSm.bg} ${statusSm.text} ${statusSm.border}`}>
                          {signal.status} · {signal.score}/100
                        </span>
                      </div>
                      <p className="text-[12px] text-muted leading-relaxed mb-2">{signal.description}</p>
                      <p className="text-[11px] text-charcoal/70 leading-relaxed italic">{signal.detail}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpandedSignal(null); }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-charcoal/50 transition hover:bg-accent-purple hover:text-white flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── LIVE SOLD-OUT ALERTS ────────── */}
        <div className="rounded-2xl border border-accent-red/10 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-red-bg">
                <AlertTriangle size={15} className="text-accent-red" />
              </div>
              <div>
                <h3 className="font-playfair text-[16px] font-bold text-charcoal">Live Sold-Out Alerts</h3>
                <p className="text-[10px] text-muted">Competitor stockouts detected in your market</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-accent-red">
              <span className="h-2 w-2 rounded-full bg-accent-red animate-pulse" />
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {SOLD_OUT_ALERTS.map((alert, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded-xl border border-border bg-surface-secondary/50 px-4 py-3.5 transition-all hover:bg-white hover:shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:px-5"
              >
                {/* Red pulsing dot */}
                <span className="relative flex-shrink-0">
                  <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-accent-red/40" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-red" />
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] font-bold text-accent-purple">{alert.handle}</span>
                  <p className="text-[11px] text-muted truncate">
                    {alert.product} · {alert.followers} followers · {alert.time}
                  </p>
                </div>

                {/* Badge */}
                <span className="self-start rounded-full bg-accent-red px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-sm sm:self-auto sm:flex-shrink-0">
                  Sold Out
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────── */}
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-charcoal p-8 text-center shadow-xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
            <Zap size={24} className="text-accent-amber" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-white">Ready to see the decision?</h3>
          <p className="max-w-md text-[12px] text-white/50 leading-relaxed">
            All 10 signals have been processed for <strong className="text-white/80">{selectedCity}</strong>. 
            View the final produce/modify/hold/drop recommendation based on your composite score of <strong className="text-white/80">{overallScore}</strong>.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-charcoal shadow-lg transition-all hover:bg-accent-amber hover:text-charcoal hover:-translate-y-0.5 hover:shadow-xl"
          >
            See The Decision →
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
