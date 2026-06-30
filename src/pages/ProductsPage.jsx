import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, X, Plus, ArrowRight, SlidersHorizontal,
  ShoppingBag, Eye, Sparkles
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RECENT_ANALYSES } from "@/lib/dashboardData";
import { getBrand } from "@/lib/mockApi";

const DECISION_STYLES = {
  produce: {
    label: "Produce",
    bg: "bg-accent-green-bg",
    text: "text-accent-green",
    dot: "bg-accent-green",
    border: "border-accent-green/30",
  },
  modify: {
    label: "Modify",
    bg: "bg-accent-amber-bg",
    text: "text-accent-amber",
    dot: "bg-accent-amber",
    border: "border-accent-amber/30",
  },
  hold: {
    label: "Hold",
    bg: "bg-accent-blue-bg",
    text: "text-accent-blue",
    dot: "bg-accent-blue",
    border: "border-accent-blue/30",
  },
  drop: {
    label: "Drop",
    bg: "bg-accent-red-bg",
    text: "text-accent-red",
    dot: "bg-accent-red",
    border: "border-accent-red/30",
  },
};

export default function ProductsPage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDecision, setSelectedDecision] = useState("all");

  useEffect(() => {
    const fetchBrand = async () => {
      try { setBrand(await getBrand()); } catch (e) { console.error(e); }
    };
    fetchBrand();

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
      print: p.print || ["Floral Block Print", "Solid Dyed", "Embroidered Zari", "Floral Digital Print", "Jacquard Weave"][p.id - 1] || "Mixed Print",
      season: p.season || ["Summer", "Summer/Monsoon", "Early Festive", "Spring/Summer", "Festive/Wedding"][p.id - 1] || "All Season",
      price: p.price || ["799", "1899", "1499", "699", "3499"][p.id - 1] || "1199",
    }));

    const existingNames = new Set(combined.map(p => p.name.toLowerCase()));
    defaultList.forEach(p => {
      if (!existingNames.has(p.name.toLowerCase())) combined.push(p);
    });
    setProducts(combined);
  }, []);

  const categoriesList = ["all", ...new Set(products.map(p => p.category))];

  const getProductDetails = (product) => {
    const isFabindia = product.id === 1 || product.name.toLowerCase().includes("block print");
    if (isFabindia) {
      return {
        brandName: "Fabindia Style", styleName: "Block Print A-Line", category: "Kurti",
        season: "Summer / Both", fabric: "Cotton Knit", gsmWeight: "Medium 200 GSM",
        printType: "Floral Block Print", pattern: "All-over floral",
        silhouette: "A-Line Regular", sleeve: "¾ Sleeve", neckline: "Round neck", length: "Midi knee-length",
        colors: [
          { name: "Earthy Rust", hex: "#c17a50" }, { name: "Warm Amber", hex: "#d4a96a" },
          { name: "Deep Brown", hex: "#8b5e3c" }, { name: "Off White", hex: "#f0e6d3" },
          { name: "Forest accent", hex: "#4a7c59" }
        ],
        price: "799", marketRangeMin: "599", marketRangeMax: "999", sweetSpot: "749",
        brandMatchName: "Fabindia", brandMatchConfidence: "84%",
        brandMatchClosestListing: "Fabindia Block Print Kurti — ₹1,490 on Myntra",
        logoStatus: "✓ Detected", fingerprintStatus: "84% match", dbScannedStatus: "500+ brands",
        tracedAccount: "@coimbatore.ootd", tracedFollowers: "42K", tracedEngagement: "7.8%",
        tracedLocation: "Coimbatore", tracedBrandWearing: "Fabindia — Block Print Collection",
        tracedPurchaseIntent: '312 comments: "where is this from?", "link please?", "shop link?" → High purchase intent → fed into Demand Score (+12 pts)',
        pinterestSaves: "2,840", pinterestKeyword: "cotton kurti India",
        pinterestGrowth: "↑ +62%", pinterestBoards: '"Onam 2025", "Coimbatore fashion inspo", "Kerala shopping"',
      };
    }
    const rawPrice = parseInt(String(product.price).replace(/[^0-9]/g, "")) || 1199;
    const isCoords = product.category?.toLowerCase().includes("coord");
    return {
      brandName: product.name.split(" ")[0] + " Collections", styleName: product.name,
      category: product.category, season: product.season || "Summer/Monsoon",
      fabric: product.fabric || "Cotton Linen Blend",
      gsmWeight: isCoords ? "Lightweight 150 GSM" : "Medium 180 GSM",
      printType: product.print || "Solid Dyed",
      pattern: product.print?.includes("Print") ? "Regular print" : "Solid color texture",
      silhouette: isCoords ? "Relaxed Fit" : "A-Line",
      sleeve: "3/4 Sleeve", neckline: "V-Neck", length: isCoords ? "Hip length" : "Calf length",
      colors: [
        { name: "Primary", hex: product.color || "#7b1c2e" },
        { name: "Cream", hex: "#f0ede8" },
        { name: "Accent", hex: "#7889a0" },
      ],
      price: String(rawPrice),
      marketRangeMin: String(Math.floor(rawPrice * 0.75)),
      marketRangeMax: String(Math.floor(rawPrice * 1.25)),
      sweetSpot: String(Math.floor(rawPrice * 0.95)),
      brandMatchName: "Local / Unbranded", brandMatchConfidence: "91% unique",
      brandMatchClosestListing: `Similar designs sell for ₹${Math.floor(rawPrice * 1.2)} on Ajio`,
      logoStatus: "No logo", fingerprintStatus: "Unique", dbScannedStatus: "500+ brands",
      tracedAccount: "@south.fashion.hub", tracedFollowers: "28K", tracedEngagement: "6.4%",
      tracedLocation: "Coimbatore", tracedBrandWearing: "Self-designed Boutique Wear",
      tracedPurchaseIntent: "84 comments asking for order details. Positive purchase intent detected.",
      pinterestSaves: "1,140", pinterestKeyword: `${product.category?.toLowerCase()} South India`,
      pinterestGrowth: "↑ +14%", pinterestBoards: '"Simple aesthetics", "Festive wear CBE"',
    };
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesDecision = selectedDecision === "all" || p.decision === selectedDecision;
    return matchesSearch && matchesCategory && matchesDecision;
  });

  return (
    <DashboardLayout brand={brand}>
      <div className="space-y-8">

        {/* ── HEADER ─────────────────────────────── */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-maroon" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-maroon">Brand Archive</span>
            </div>
            <h1 className="font-playfair text-3xl font-bold tracking-wide text-charcoal">
              Products Library
            </h1>
            <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-muted">
              Browse every analyzed design in your collection. Click any card to open its full intelligence report spread.
            </p>
          </div>
          <button
            onClick={() => navigate("/analysis")}
            className="group inline-flex h-12 items-center gap-2.5 rounded-2xl bg-maroon px-6 text-[13px] font-bold text-white shadow-lg shadow-maroon/15 transition-all hover:bg-maroon-light hover:shadow-xl hover:shadow-maroon/20 hover:-translate-y-0.5"
          >
            <Plus size={16} className="transition-transform group-hover:rotate-90" />
            Analyze New Design
          </button>
        </div>

        {/* ── FILTERS ────────────────────────────── */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/60" />
            <input
              type="text"
              placeholder="Search by name, fabric, or category…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-xl border border-border-light bg-cream/40 pl-11 pr-4 text-[13px] text-charcoal outline-none placeholder:text-muted/50 transition-all focus:border-maroon/30 focus:bg-white focus:ring-2 focus:ring-maroon/8"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 rounded-xl border border-border-light bg-cream/40 px-4 text-[12px] font-medium text-charcoal outline-none transition focus:border-maroon/30 focus:bg-white"
            >
              <option value="all">All Categories</option>
              {categoriesList.filter(c => c !== "all").map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={selectedDecision}
              onChange={(e) => setSelectedDecision(e.target.value)}
              className="h-11 rounded-xl border border-border-light bg-cream/40 px-4 text-[12px] font-medium text-charcoal outline-none transition focus:border-maroon/30 focus:bg-white"
            >
              <option value="all">All Verdicts</option>
              <option value="produce">✓ Produce</option>
              <option value="modify">⚡ Modify</option>
              <option value="hold">⏸ Hold</option>
              <option value="drop">✗ Drop</option>
            </select>
          </div>
        </div>

        {/* ── COUNT BAR ──────────────────────────── */}
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-muted">
            Showing <span className="font-bold text-charcoal">{filteredProducts.length}</span> of {products.length} products
          </p>
        </div>

        {/* ── GRID ───────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-white/60 py-20 text-center">
            <ShoppingBag size={40} className="text-muted/30 mb-4" />
            <p className="font-playfair text-xl font-bold text-charcoal">No products found</p>
            <p className="mt-1.5 text-[13px] text-muted">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const dStyle = DECISION_STYLES[product.decision] || DECISION_STYLES.hold;
              const priceStr = String(product.price || "");
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-maroon/15"
                >
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-surface-secondary">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${product.color || "#8b7193"}60, ${product.color || "#8b7193"}15)`,
                        }}
                      >
                        <div className="absolute inset-0 opacity-[0.06]" style={{
                          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, currentColor 1px, transparent 0)',
                          backgroundSize: '12px 12px',
                        }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-playfair text-5xl font-bold text-charcoal/15">
                            {product.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                      <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-[11px] font-bold text-charcoal opacity-0 backdrop-blur-sm transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg">
                        <Eye size={13} /> View Report
                      </span>
                    </div>

                    {/* Score badge */}
                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[12px] font-bold text-charcoal shadow-md backdrop-blur-sm ring-1 ring-black/5">
                      {product.score}
                    </div>

                    {/* Decision pill */}
                    <div className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-bold backdrop-blur-sm ${dStyle.bg} ${dStyle.border} ${dStyle.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${dStyle.dot}`} />
                      {dStyle.label}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted/70">{product.category}</span>
                    <h3 className="truncate font-playfair text-[15px] font-bold text-charcoal leading-snug group-hover:text-maroon transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[13px] font-bold text-charcoal">
                        {priceStr.startsWith("₹") ? priceStr : `₹${priceStr}`}
                      </span>
                      <span className="text-[10px] text-muted">{product.analyzedAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* DETAILED REPORT MODAL                     */}
      {/* ══════════════════════════════════════════ */}
      {selectedProduct && (() => {
        const d = getProductDetails(selectedProduct);
        return (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/80 backdrop-blur-md p-6 md:p-10"
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }}
          >
            <div className="relative w-full max-w-[1100px] rounded-3xl bg-gradient-to-br from-[#faf8f4] to-[#f5f2ec] shadow-[0_40px_100px_rgba(0,0,0,0.35)] ring-1 ring-black/5 my-4 animate-slide-up">

              {/* ── MODAL HEADER ──────────────────── */}
              <div className="flex items-center justify-between border-b border-black/[0.06] px-8 py-5">
                <div className="flex items-center gap-4">
                  {selectedProduct.image && (
                    <div className="h-12 w-12 overflow-hidden rounded-xl border border-border shadow-sm">
                      <img src={selectedProduct.image} alt="" className="h-full w-full object-cover object-top" />
                    </div>
                  )}
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-maroon">Product Intelligence Report</span>
                    <h2 className="font-playfair text-xl font-bold text-charcoal mt-0.5">{selectedProduct.name}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-charcoal/60 transition-all hover:bg-maroon hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── JOURNAL SPREAD ────────────────── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 relative">

                {/* Center Spine — Desktop only */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-black/[0.06] to-transparent -translate-x-1/2 z-10" />

                {/* ═══ LEFT PAGE ═══════════════════ */}
                <div className="p-7 lg:p-8 space-y-7 lg:border-r border-black/[0.04]">

                  {/* Section Label */}
                  <div className="flex items-center gap-3">
                    <div className="h-[2px] w-5 bg-accent-green" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-green">Product Identified</span>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Brand Name", value: d.brandName },
                      { label: "Style Name", value: d.styleName },
                      { label: "Category", value: d.category },
                      { label: "Season", value: d.season },
                      { label: "Fabric", value: d.fabric },
                      { label: "GSM Weight", value: d.gsmWeight },
                      { label: "Print Type", value: d.printType },
                      { label: "Pattern", value: d.pattern },
                      { label: "Silhouette", value: d.silhouette },
                      { label: "Sleeve", value: d.sleeve },
                      { label: "Neckline", value: d.neckline },
                      { label: "Length", value: d.length },
                    ].map((item, i) => (
                      <div key={i} className="border-t-2 border-charcoal/80 bg-white px-3.5 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-muted/70">{item.label}</span>
                        <p className="font-playfair text-[13.5px] font-bold text-charcoal mt-0.5 leading-snug">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Color Palette */}
                  <div className="space-y-2.5">
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted/70">Colour Palette</span>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-1">
                        {d.colors.map((c, i) => (
                          <div
                            key={i}
                            className="h-9 w-9 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110 hover:z-10"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] italic text-muted font-playfair">
                        {d.colors.map(c => c.name).join(" · ")}
                      </span>
                    </div>
                  </div>

                  {/* Price Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border-t-2 border-charcoal bg-white p-3.5 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                      <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted/70 block">Your Price</span>
                      <span className="font-playfair text-xl font-bold text-charcoal block mt-1">₹{d.price}</span>
                    </div>
                    <div className="border-t-2 border-accent-amber bg-white p-3.5 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                      <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted/70 block">Market Range</span>
                      <span className="font-playfair text-xl font-bold text-accent-amber block mt-1">₹{d.marketRangeMin}–₹{d.marketRangeMax}</span>
                    </div>
                    <div className="border-t-2 border-accent-green bg-white p-3.5 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                      <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted/70 block">Sweet Spot</span>
                      <span className="font-playfair text-xl font-bold text-accent-green block mt-1">₹{d.sweetSpot}</span>
                    </div>
                  </div>
                </div>

                {/* ═══ RIGHT PAGE ══════════════════ */}
                <div className="p-7 lg:p-8 space-y-6 bg-white/30">

                  {/* Layer 2 — Brand Recognition */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[2px] w-5 bg-accent-purple" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-purple">Layer 2 — Brand Recognition</span>
                    </div>

                    <div className="rounded-2xl bg-charcoal p-5 text-white space-y-4 shadow-xl">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent-amber">🔍 Brand Match Found</span>
                      <div>
                        <div className="flex items-baseline gap-3 mt-1">
                          <span className="font-playfair text-2xl font-bold">{d.brandMatchName}</span>
                          <span className="rounded bg-accent-amber px-2 py-0.5 text-[9px] font-bold text-charcoal shadow-sm">
                            {d.brandMatchConfidence} match
                          </span>
                        </div>
                        <p className="mt-2 text-[11px] text-white/55 leading-relaxed">{d.brandMatchClosestListing}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Logo", value: d.logoStatus },
                          { label: "Fingerprint", value: d.fingerprintStatus },
                          { label: "DB Scanned", value: d.dbScannedStatus },
                        ].map((m, i) => (
                          <div key={i} className="rounded-xl bg-white/[0.06] border border-white/[0.08] p-2.5 text-center">
                            <span className="text-[7px] uppercase tracking-[0.15em] text-white/35 block">{m.label}</span>
                            <span className="text-[10px] font-semibold text-white/90 block mt-0.5">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Layer 3 — Micro-Influencer Trace */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[2px] w-5 bg-accent-purple" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-purple">Layer 3 — Micro-Influencer Trace</span>
                    </div>

                    <div className="rounded-2xl border border-accent-purple/15 bg-accent-purple-bg/60 p-5 space-y-4">
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-accent-purple/70">Instagram Account Traced</span>
                        <h4 className="font-playfair text-lg font-bold text-accent-purple mt-0.5">{d.tracedAccount}</h4>
                        <p className="mt-1 text-[11px] text-muted">
                          <strong className="text-charcoal">{d.tracedFollowers}</strong> followers&ensp;·&ensp;
                          <strong className="text-charcoal">{d.tracedEngagement}</strong> engagement&ensp;·&ensp;
                          📍 {d.tracedLocation}
                        </p>
                      </div>

                      <div className="border-t border-accent-purple/10 pt-3">
                        <span className="text-[8px] uppercase tracking-[0.15em] text-muted/60 block">Brand She's Wearing</span>
                        <p className="text-[13px] font-bold text-charcoal mt-0.5">{d.tracedBrandWearing}</p>
                      </div>

                      <div className="rounded-xl bg-white p-3.5 border border-accent-purple/10 shadow-sm">
                        <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-accent-purple">Purchase Intent Signal</span>
                        <p className="mt-1 text-[11px] text-muted leading-relaxed italic">"{d.tracedPurchaseIntent}"</p>
                      </div>
                    </div>
                  </div>

                  {/* Pinterest Save Signal */}
                  <div className="rounded-2xl border border-border bg-white p-5 space-y-2 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e60023] text-white text-[11px] font-black shadow-sm">P</span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted/70">Pinterest Save Signal</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-playfair text-3xl font-bold text-charcoal">{d.pinterestSaves}</span>
                      <span className="text-[11px] text-muted">public board saves — <em>"{d.pinterestKeyword}"</em></span>
                    </div>
                    <p className="text-[11px] font-bold text-accent-green">{d.pinterestGrowth} vs last week · Leads Instagram by ~3 weeks</p>
                    <p className="text-[10px] text-muted border-t border-border-light pt-2">Boards: {d.pinterestBoards}</p>
                  </div>

                  {/* Auto-save strip */}
                  <div className="flex items-center gap-2.5 rounded-xl border border-accent-green/20 bg-accent-green-bg p-3.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-green text-white text-[10px]">✓</span>
                    <span className="text-[11px] font-medium text-accent-green">
                      Auto-saved: {d.tracedAccount} + {d.brandMatchName} added to Competitor References
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => { setSelectedProduct(null); navigate("/dashboard"); }}
                    className="w-full rounded-xl bg-charcoal py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-charcoal/90 shadow-lg shadow-charcoal/15"
                  >
                    Run 10 Intelligence Signals →
                  </button>
                </div>

              </div>

              {/* ── MODAL FOOTER ──────────────────── */}
              <div className="flex justify-end border-t border-black/[0.06] px-8 py-4">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-xl bg-maroon px-6 py-2.5 text-[12px] font-bold text-white shadow-md shadow-maroon/15 transition-all hover:bg-maroon-light hover:shadow-lg hover:shadow-maroon/20"
                >
                  Close Report
                </button>
              </div>

            </div>
          </div>
        );
      })()}
    </DashboardLayout>
  );
}
