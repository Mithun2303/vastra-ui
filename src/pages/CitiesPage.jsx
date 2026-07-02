import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin, AlertCircle, TrendingUp, Sparkles, XCircle,
  HelpCircle, CheckCircle2, ArrowRight, Compass, Calendar,
  Activity, ShoppingBag, Radio, ShieldAlert
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getBrand } from "@/lib/mockApi";

// City Intelligence Dataset
const CITIES_DATA = {
  Tirupur: {
    tagline: "Knitwear Capital · Cotton-first Market",
    ceiling: 699,
    channel: "WhatsApp Catalogues (WA)",
    buyerType: "Tier A (Value-driven)",
    hotTrends: ["Cotton Knit", "Floral Print", "Solid Coords", "Daily Leggings"],
    avoid: ["Crop Tops", "Heavy Zari Embellishments", "Retail Prices Above ₹999"],
    alert: "High temperature caution: Shift production focus to breathable 100-140 GSM cotton. Heavy fabric lines are seeing a -45% slump this week.",
    opportunities: "High pre-monsoon wholesale booking starting next week.",
    stockOuts: [
      { boutique: "@tirupur_boutique_trends", item: "Floral cotton kurti", time: "3 hours ago" },
      { boutique: "@knitwear_mart_tpr", item: "Solid pastel coords", time: "1 day ago" }
    ]
  },
  Coimbatore: {
    tagline: "Aspiration Hub · Instagram-driven Shoppers",
    ceiling: 1499,
    channel: "Instagram Storefronts (IG)",
    buyerType: "Tier B (Aesthetic & Trend-conscious)",
    hotTrends: ["Linen Coord Sets", "Indo-Western Fusion", "Campus Casuals", "Modi Vests"],
    avoid: ["Basic plain nightwear", "Synthetic polyester blouses", "Overly loose fit silhouettes"],
    alert: "Upcoming Campus Season: PSG Arts, Kumaraguru, and Krishna College cultural festivals peak in 3 weeks. Block-print ethnic coords are projected to see +38% demand.",
    opportunities: "Tie-in college brand ambassadorships with local campus micro-influencers.",
    stockOuts: [
      { boutique: "@cbefashionzone", item: "Block print kurti", time: "6 hours ago" },
      { boutique: "@campus_wear_coimbatore", item: "Linen matching coords", time: "2 days ago" }
    ]
  },
  Erode: {
    tagline: "Fabric Manufacturing Belt · Wholesale & Volume",
    ceiling: 899,
    channel: "B2B Wholesale / Handloom Markets",
    buyerType: "Tier A (Value & Fabric Integrity)",
    hotTrends: ["Plain Cotton Kurta", "Salwar Suit Sets", "Modest Straight Cuts", "Dhotis"],
    avoid: ["Western bodycon wear", "Sleeveless silhouettes", "High margins above 45%"],
    alert: "Weekly Shandy market update: Direct orders from Kerala traders up +24%. Sourcing cotton warp yards early is advised.",
    opportunities: "High demand for raw white cotton and base prints ahead of festive dyeing cycles.",
    stockOuts: [
      { boutique: "@erode_weaver_guild", item: "Straight cotton kurta", time: "18 hours ago" }
    ]
  },
  Madurai: {
    tagline: "Occasion City · Tradition & Gold Accent loving",
    ceiling: 799,
    channel: "Exhibitions (EXH) & Retail Bazaars",
    buyerType: "Tier A+C (Festive & Tradition-first)",
    hotTrends: ["Embroidered Ethnic", "Gold & Maroon Borders", "Occasion Cotton Sarees", "Silk borders"],
    avoid: ["Athleisure wear", "Neon pastel coordinates", "Extremely short length tops"],
    alert: "Temple festival season: High local footfall. Direct retail stalls and pop-up exhibits projected to capture 70% of weekly segment volume.",
    opportunities: "Promote traditional color palettes (rust, amber, deep maroon) for local temple collections.",
    stockOuts: [
      { boutique: "@madurai_festive_looks", item: "Embroidered straight kurti", time: "1 day ago" }
    ]
  },
  Kerala: {
    tagline: "Quality-first · Premium Linen & Handloom focus",
    ceiling: 1999,
    channel: "D2C Websites & Brand Showrooms",
    buyerType: "Tier B+C (Quality & Authenticity driven)",
    hotTrends: ["Kasavu Cream-Gold (Onam)", "Premium Linen Co-ords", "Handloom Salwar Sets"],
    avoid: ["Cheap synthetic knit blends", "Loud multi-color digital prints", "Polyester fabrications"],
    alert: "Onam Countdown: 89 days to Onam. Kasavu cream-gold styles: start production weaving runs within the next 30 days to hit peak pre-festival dispatch schedules.",
    opportunities: "High online search trends for 'sustainable organic linen' coords (+64% WoW).",
    stockOuts: [
      { boutique: "@kerala_handloom_style", item: "Kasavu borders cotton set", time: "12 hours ago" },
      { boutique: "@kochi_linen_house", item: "Pastel linen shirt dress", time: "2 days ago" }
    ]
  }
};

const CITY_LIST = ["Tirupur", "Coimbatore", "Erode", "Madurai", "Kerala"];

export default function CitiesPage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [activeCity, setActiveCity] = useState("Coimbatore");

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        setBrand(await getBrand());
      } catch (e) {
        console.error(e);
      }
    };
    fetchBrand();
  }, []);

  const cityData = CITIES_DATA[activeCity];

  return (
    <DashboardLayout brand={brand}>
      <div className="min-w-0 w-full max-w-full space-y-6 animate-fade-in">
        
        {/* ── HEADER ── */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-maroon" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-maroon">Geographic Intelligence</span>
          </div>
          <h1 className="font-playfair text-3xl font-bold tracking-wide text-charcoal">
            City Insights
          </h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
            Track category demands, price boundaries, and cultural calendars across regional fashion markets in South India.
          </p>
        </div>

        {/* ── CITY SELECTOR DROPDOWN & PILLS ── */}
        {/* Mobile selector dropdown */}
        <div className="block sm:hidden">
          <label className="text-[10px] font-bold text-maroon uppercase tracking-wider block mb-1.5">Select Region</label>
          <select
            value={activeCity}
            onChange={(e) => setActiveCity(e.target.value)}
            className="h-11 w-full rounded-xl border border-border-light bg-white px-3.5 text-[12px] font-bold text-charcoal outline-none focus:border-maroon/30 focus:ring-2 focus:ring-maroon/8"
          >
            {CITY_LIST.map(city => (
              <option key={city} value={city}>{city.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Tablet/Desktop selector pills */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {CITY_LIST.map(city => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`rounded-xl px-5 py-2.5 text-[12px] font-bold tracking-wide border transition-all ${
                activeCity === city
                  ? "bg-maroon text-white border-maroon shadow-md shadow-maroon/10"
                  : "bg-white border-border-light text-muted hover:text-charcoal hover:border-border"
              }`}
            >
              {city.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ── PRIMARY VIEW GRID ── */}
        <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_360px]">

          {/* Left Column: City Specific Intelligence */}
          <div className="min-w-0 space-y-6">

            {/* City Profile Card */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="border-b border-border-light pb-4 mb-4">
                <span className="text-[9px] font-bold text-maroon uppercase tracking-wider">Active Regional Feed</span>
                <h2 className="font-playfair text-2xl font-bold text-charcoal mt-0.5">{activeCity} Region</h2>
                <p className="text-[12px] text-muted mt-1">{cityData.tagline}</p>
              </div>

              {/* Specs Cards */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-surface-secondary/40 border border-border-light p-3.5">
                  <span className="text-[8px] font-bold uppercase text-muted tracking-wider block">Price Ceiling</span>
                  <span className="text-[16px] font-bold text-charcoal block mt-1">₹{cityData.ceiling}</span>
                  <span className="text-[9px] text-muted block mt-0.5">Recommended max</span>
                </div>
                <div className="rounded-xl bg-surface-secondary/40 border border-border-light p-3.5">
                  <span className="text-[8px] font-bold uppercase text-muted tracking-wider block">Top Channel</span>
                  <span className="text-[12px] font-bold text-charcoal block mt-1 truncate">{cityData.channel}</span>
                  <span className="text-[9px] text-muted block mt-0.5">Primary sales channel</span>
                </div>
                <div className="rounded-xl bg-surface-secondary/40 border border-border-light p-3.5">
                  <span className="text-[8px] font-bold uppercase text-muted tracking-wider block">Buyer Segment</span>
                  <span className="text-[12px] font-bold text-charcoal block mt-1 truncate">{cityData.buyerType}</span>
                  <span className="text-[9px] text-muted block mt-0.5">Target persona style</span>
                </div>
              </div>
            </div>

            {/* Trends & Avoid Directives */}
            <div className="grid gap-6 sm:grid-cols-2">

              {/* Hot Trends */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-green-bg text-accent-green">
                    <TrendingUp size={15} />
                  </div>
                  <h3 className="text-[13px] font-bold text-charcoal">High Demand Styles</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cityData.hotTrends.map((trend, idx) => (
                    <span 
                      key={idx} 
                      className="rounded-lg bg-accent-green-bg/30 border border-accent-green/10 px-3 py-1.5 text-[11px] font-medium text-accent-green"
                    >
                      {trend}
                    </span>
                  ))}
                </div>
              </div>

              {/* Avoid Warnings */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-red-bg text-accent-red">
                    <XCircle size={15} />
                  </div>
                  <h3 className="text-[13px] font-bold text-charcoal">Styles to Avoid</h3>
                </div>
                <div className="space-y-2.5">
                  {cityData.avoid.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-muted leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-red flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sourcing Opportunities */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Compass size={16} className="text-maroon" />
                <h3 className="text-[13px] font-bold text-charcoal font-playfair">Sourcing & Trading Opportunity</h3>
              </div>
              <p className="text-[12px] text-muted leading-relaxed">{cityData.opportunities}</p>
            </div>

          </div>

          {/* Right Column: Alerts & Local Stockout Feeds */}
          <div className="min-w-0 space-y-6">

            {/* Critical Regional Alerts */}
            <div className="rounded-2xl border border-accent-amber/15 bg-accent-amber-bg/50 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-accent-amber" />
                <h3 className="text-[12px] font-bold text-accent-amber uppercase tracking-wider">Critical Sourcing Alert</h3>
              </div>
              <p className="text-[12px] text-muted leading-relaxed font-medium">
                {cityData.alert}
              </p>
            </div>

            {/* Live Stock Outs in selected city */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Radio size={15} className="text-maroon animate-pulse" />
                <h3 className="text-[13px] font-bold text-charcoal">Competitor Sold Out Alerts</h3>
              </div>
              <div className="space-y-3">
                {cityData.stockOuts.map((so, idx) => (
                  <div key={idx} className="flex flex-col gap-2 border-b border-border-light pb-2 text-[11px] leading-relaxed last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:gap-3">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-red" />
                    <div className="min-w-0 flex-1">
                      <strong className="block text-charcoal">{so.boutique}</strong>
                      <span className="text-muted">{so.item} sold out in active catalogue</span>
                    </div>
                    <span className="text-[9.5px] text-muted sm:ml-auto sm:flex-shrink-0 sm:whitespace-nowrap">{so.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── INTER-CITY COMPARATIVE TABLE ── */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-maroon" />
            <h3 className="text-[13px] font-bold text-charcoal">Inter-City Comparison Matrix</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="border-b border-border-light text-[10px] font-bold uppercase tracking-wider text-muted/80">
                  <th className="py-2.5">Region</th>
                  <th className="py-2.5">Top Trend Style</th>
                  <th className="py-2.5">Price Boundary</th>
                  <th className="py-2.5">D2C Channel</th>
                  <th className="py-2.5">Avoid Silhouette</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light text-muted">
                {CITY_LIST.map(city => {
                  const data = CITIES_DATA[city];
                  return (
                    <tr key={city} className={`hover:bg-surface-secondary/25 ${activeCity === city ? "bg-maroon/[0.03] font-semibold text-charcoal" : ""}`}>
                      <td className="py-3 font-semibold text-charcoal">{city}</td>
                      <td className="py-3 text-charcoal font-medium">{data.hotTrends[0]}</td>
                      <td className="py-3 font-bold text-charcoal">₹{data.ceiling}</td>
                      <td className="py-3 font-medium">{data.channel.split(" ")[0]}</td>
                      <td className="py-3 text-accent-red">{data.avoid[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
