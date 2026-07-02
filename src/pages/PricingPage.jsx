import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee, TrendingUp, AlertCircle, Sparkles,
  BarChart3, Check, DollarSign, HelpCircle, ArrowUpRight,
  TrendingDown, Percent, Landmark, ShoppingBag, MapPin
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getBrand } from "@/lib/mockApi";
import { RECENT_ANALYSES } from "@/lib/dashboardData";

// Price Intelligence Mock Data
const COMPETITOR_BENCHMARKS = [
  { brand: "Fabindia", category: "Kurti", regularPrice: 1490, discount: "15%", avgPrice: 1266, popularity: "High" },
  { brand: "Westside", category: "Kurti / Coord", regularPrice: 1299, discount: "0%", avgPrice: 1299, popularity: "Very High" },
  { brand: "W for Woman", category: "Kurti", regularPrice: 1699, discount: "20%", avgPrice: 1359, popularity: "Medium" },
  { brand: "Global Desi", category: "Midi Dress", regularPrice: 2199, discount: "30%", avgPrice: 1539, popularity: "Medium" },
  { brand: "Local Boutiques (CBE)", category: "Kurti", regularPrice: 899, discount: "5%", avgPrice: 854, popularity: "High" }
];

const CITY_CEILINGS = [
  { city: "Coimbatore", ceiling: 1499, channel: "Instagram (IG)", type: "Aspiration / Trendy", status: "Premium" },
  { city: "Kerala", ceiling: 1999, channel: "Online Web", type: "Quality / Linen", status: "Premium" },
  { city: "Erode", ceiling: 899, channel: "Wholesale (WHL)", type: "Fabric / Value-driven", status: "Average" },
  { city: "Madurai", ceiling: 799, channel: "Exhibition (EXH)", type: "Occasion / Gold-loving", status: "Average" },
  { city: "Tirupur", ceiling: 699, channel: "WhatsApp (WA)", type: "Knitwear / Cotton-first", status: "Value" }
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  
  // Selection state
  const [selectedProductId, setSelectedProductId] = useState("");
  
  // Simulator State
  const [costPerUnit, setCostPerUnit] = useState(520);
  const [retailPrice, setRetailPrice] = useState(799);
  const [salesVolume, setSalesVolume] = useState(100);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        setBrand(await getBrand());
      } catch (e) {
        console.error(e);
      }
    };
    fetchBrand();

    // Load analyzed designs to choose from
    const stored = localStorage.getItem("vastra_analyses");
    let combined = [];
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) combined = [...parsed];
      } catch (e) { /* ignore */ }
    }

    const defaultList = RECENT_ANALYSES.map(p => ({
      ...p,
      fabric: p.fabric || ["Cotton Knit", "Cotton Linen Blend", "Polyester-Viscose", "Organza Silk", "Banarasi Silk"][p.id - 1] || "Cotton Blend",
      price: p.price || ["799", "1899", "1499", "699", "3499"][p.id - 1] || "1199",
    }));

    const existingNames = new Set(combined.map(p => p.name.toLowerCase()));
    defaultList.forEach(p => {
      if (!existingNames.has(p.name.toLowerCase())) combined.push(p);
    });
    
    setProducts(combined);
    if (combined.length > 0) {
      setSelectedProductId(String(combined[0].id));
      const rawPrice = parseInt(String(combined[0].price || "").replace(/[^0-9]/g, "")) || 799;
      setRetailPrice(rawPrice);
    }
  }, []);

  // Update simulator when selected product changes
  const handleProductChange = (productId) => {
    setSelectedProductId(productId);
    const selected = products.find(p => String(p.id) === String(productId));
    if (selected) {
      const rawPrice = parseInt(String(selected.price || "").replace(/[^0-9]/g, "")) || 799;
      setRetailPrice(rawPrice);
      // set random/appropriate cost
      setCostPerUnit(selected.id === 1 ? 520 : Math.round(rawPrice * 0.65));
    }
  };

  const selectedProduct = products.find(p => String(p.id) === String(selectedProductId));

  // Range marker positions
  const getRangeConfig = () => {
    if (!selectedProduct) return { min: 649, ideal: 799, max: 949 };
    const rawPrice = parseInt(String(selectedProduct.price || "").replace(/[^0-9]/g, "")) || 799;
    return {
      min: Math.round(rawPrice * 0.8),
      ideal: Math.round(rawPrice * 0.95),
      max: Math.round(rawPrice * 1.15)
    };
  };

  const range = getRangeConfig();
  const rangeMin = range.min - 150;
  const rangeMax = range.max + 150;
  const totalRange = rangeMax - rangeMin;
  const minPos = ((range.min - rangeMin) / totalRange) * 100;
  const idealPos = ((range.ideal - rangeMin) / totalRange) * 100;
  const maxPos = ((range.max - rangeMin) / totalRange) * 100;
  
  // Your Brand Price Marker position
  const yourPricePos = ((retailPrice - rangeMin) / totalRange) * 100;
  const cappedPricePos = Math.max(0, Math.min(100, yourPricePos));

  // Simulator computations
  const totalCost = costPerUnit * salesVolume;
  const totalRevenue = retailPrice * salesVolume;
  const netProfit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

  // Margin classification badge
  const getMarginBadge = (margin) => {
    if (margin >= 40) return { label: "Premium Margin", style: "bg-accent-green-bg text-accent-green border-accent-green/20" };
    if (margin >= 20) return { label: "Healthy Margin", style: "bg-accent-blue-bg text-accent-blue border-accent-blue/20" };
    return { label: "Low Margin", style: "bg-accent-red-bg text-accent-red border-accent-red/20" };
  };
  const marginBadge = getMarginBadge(profitMargin);

  return (
    <DashboardLayout brand={brand}>
      <div className="space-y-6 animate-fade-in">
        
        {/* ── HEADER ── */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-maroon" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-maroon">Price Optimization</span>
          </div>
          <h1 className="font-playfair text-3xl font-bold tracking-wide text-charcoal">
            Pricing Intelligence
          </h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
            Simulate margins, view regional price ceilings, and benchmark against top competitor catalogs.
          </p>
        </div>

        {/* ── INTERACTIVE ANALYZER ── */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border-light pb-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-bold text-charcoal uppercase tracking-wider">Select Product:</span>
              <select
                value={selectedProductId}
                onChange={(e) => handleProductChange(e.target.value)}
                className="h-10 rounded-xl border border-border-light bg-cream/40 px-3 text-[12px] font-medium text-charcoal outline-none focus:border-maroon/30 focus:bg-white"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            {selectedProduct && (
              <span className="text-[11px] text-muted">
                Initial Score: <strong className="text-charcoal">{selectedProduct.score}</strong> · Decision: <strong className="text-maroon capitalize">{selectedProduct.decision}</strong>
              </span>
            )}
          </div>

          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60 mb-8">Price Band Benchmarking</h3>

          {/* Range Slider Track */}
          <div className="relative mb-14 mt-6 px-4">
            <div className="h-3 rounded-full bg-border-light relative">
              {/* Highlight range between min & max */}
              <div
                className="absolute h-3 rounded-full bg-gradient-to-r from-accent-amber/40 via-accent-green/40 to-accent-amber/40"
                style={{
                  left: `${minPos}%`,
                  width: `${maxPos - minPos}%`,
                }}
              />
            </div>

            {/* Min Marker */}
            <div className="absolute -top-1" style={{ left: `${minPos}%`, transform: "translateX(-50%)" }}>
              <div className="h-5 w-0.5 bg-accent-amber" />
              <div className="mt-2 text-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted block">Min</span>
                <span className="text-[12px] font-bold text-charcoal">₹{range.min}</span>
              </div>
            </div>

            {/* Ideal Sweet Spot Marker */}
            <div className="absolute -top-2" style={{ left: `${idealPos}%`, transform: "translateX(-50%)" }}>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent-green bg-white shadow-md">
                <div className="h-2.5 w-2.5 rounded-full bg-accent-green" />
              </div>
              <div className="mt-2 text-center font-semibold">
                <span className="text-[9px] font-bold uppercase tracking-wider text-accent-green block">Sweet Spot</span>
                <span className="text-[13px] font-bold text-charcoal">₹{range.ideal}</span>
              </div>
            </div>

            {/* Max Marker */}
            <div className="absolute -top-1" style={{ left: `${maxPos}%`, transform: "translateX(-50%)" }}>
              <div className="h-5 w-0.5 bg-accent-amber" />
              <div className="mt-2 text-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted block">Max</span>
                <span className="text-[12px] font-bold text-charcoal">₹{range.max}</span>
              </div>
            </div>

            {/* YOUR CURRENT PRICE PIN */}
            <div 
              className="absolute -top-12 transition-all duration-300 flex flex-col items-center" 
              style={{ left: `${cappedPricePos}%`, transform: "translateX(-50%)" }}
            >
              <div className="bg-maroon text-white font-bold text-[11px] px-2 py-1 rounded shadow-md border border-maroon/20 whitespace-nowrap">
                Your Price: ₹{retailPrice}
              </div>
              <div className="w-2 h-2 bg-maroon rotate-45 -mt-1 shadow-sm" />
              <div className="h-8 w-0.5 bg-maroon border-dashed" />
            </div>
          </div>
        </div>

        {/* ── SIMULATOR & BENCHMARKS LAYOUT ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* Left Pane: Interactive Profit Simulator */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-[13px] font-bold text-charcoal mb-0.5">Cost & Profitability Simulator</h3>
              <p className="text-[11px] text-muted">Adjust units, cost, and target retail price to see net return projections.</p>
            </div>

            {/* Simulator Form inputs */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                  Est. Cost Price (₹)
                </label>
                <input
                  type="number"
                  value={costPerUnit}
                  onChange={(e) => setCostPerUnit(Number(e.target.value))}
                  className="h-10 w-full rounded-xl border border-border-light bg-cream/40 px-3 text-[12px] font-semibold text-charcoal outline-none transition focus:border-maroon/30 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                  Target Retail Price (₹)
                </label>
                <input
                  type="number"
                  value={retailPrice}
                  onChange={(e) => setRetailPrice(Number(e.target.value))}
                  className="h-10 w-full rounded-xl border border-border-light bg-cream/40 px-3 text-[12px] font-semibold text-charcoal outline-none transition focus:border-maroon/30 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                  Sales Volume (Units)
                </label>
                <input
                  type="number"
                  value={salesVolume}
                  onChange={(e) => setSalesVolume(Number(e.target.value))}
                  className="h-10 w-full rounded-xl border border-border-light bg-cream/40 px-3 text-[12px] font-semibold text-charcoal outline-none transition focus:border-maroon/30 focus:bg-white"
                />
              </div>
            </div>

            {/* Live Financial Computations */}
            <div className="grid gap-4 sm:grid-cols-3 bg-surface-secondary/30 rounded-2xl p-5 border border-border-light">
              <div className="text-center sm:text-left">
                <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Estimated Outlay</span>
                <span className="text-xl font-bold text-charcoal block mt-1">₹{totalCost.toLocaleString()}</span>
                <span className="text-[9px] text-muted block mt-0.5">₹{costPerUnit} × {salesVolume} units</span>
              </div>
              <div className="text-center sm:text-left border-y sm:border-y-0 sm:border-x border-border-light py-3 sm:py-0 sm:px-4">
                <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Gross Turnover</span>
                <span className="text-xl font-bold text-charcoal block mt-1">₹{totalRevenue.toLocaleString()}</span>
                <span className="text-[9px] text-muted block mt-0.5">₹{retailPrice} × {salesVolume} units</span>
              </div>
              <div className="text-center sm:text-left sm:pl-4 space-y-1">
                <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Projected Return</span>
                <span className="text-xl font-bold text-accent-green block">
                  ₹{netProfit.toLocaleString()}
                </span>
                <span className={`inline-block rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${marginBadge.style}`}>
                  {profitMargin}% ({marginBadge.label})
                </span>
              </div>
            </div>

            {/* Warning / Suggestion banner */}
            <div className="flex items-start gap-2.5 rounded-xl border border-accent-green/15 bg-accent-green-bg/50 p-4">
              <Sparkles size={15} className="text-accent-green flex-shrink-0 mt-0.5" />
              <span className="text-[12px] text-muted leading-relaxed">
                Profit margin of <strong className="text-charcoal">{profitMargin}%</strong> is standard for this class. Sweet spot optimization allows up to ₹{range.max} retail price for specialized launches.
              </span>
            </div>
          </div>

          {/* Right Pane: Competitor Benchmarks */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-[13px] font-bold text-charcoal">Competitor Price Scraping</h3>
              <p className="text-[11px] text-muted">Average pricing on similar listings detected online.</p>
            </div>
            
            <div className="space-y-3">
              {COMPETITOR_BENCHMARKS.map((comp, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-border-light pb-2 last:border-b-0 last:pb-0 text-[12px]">
                  <div>
                    <span className="font-semibold text-charcoal block">{comp.brand}</span>
                    <span className="text-[10px] text-muted">{comp.category} · Demand: {comp.popularity}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-charcoal block">₹{comp.avgPrice}</span>
                    <span className="text-[9.5px] text-muted">MRP: ₹{comp.regularPrice} (-{comp.discount})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CITY CEILING MATRIX ── */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <MapPin size={16} className="text-maroon" />
            <h3 className="text-[13px] font-bold text-charcoal">City Pricing Ceiling Matrix</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="border-b border-border-light text-[10px] font-bold uppercase tracking-wider text-muted/80">
                  <th className="py-2.5">Region</th>
                  <th className="py-2.5">Max Pricing Ceiling</th>
                  <th className="py-2.5">Top Transaction Channel</th>
                  <th className="py-2.5">Customer Attribute</th>
                  <th className="py-2.5 text-right">Value Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {CITY_CEILINGS.map((c, i) => (
                  <tr key={i} className="hover:bg-surface-secondary/20">
                    <td className="py-3 font-semibold text-charcoal">{c.city}</td>
                    <td className="py-3 font-bold text-charcoal">₹{c.ceiling}</td>
                    <td className="py-3 text-muted font-medium">{c.channel}</td>
                    <td className="py-3 text-muted">{c.type}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block rounded px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider ${
                        c.status === "Premium" 
                          ? "bg-accent-green-bg text-accent-green"
                          : c.status === "Average"
                            ? "bg-accent-amber-bg text-accent-amber"
                            : "bg-accent-blue-bg text-accent-blue"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
