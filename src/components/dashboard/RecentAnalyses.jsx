import { useState, useEffect } from "react";
import { Eye, X, Activity, Sparkles, Calendar, IndianRupee, Tag, Layers, Info } from "lucide-react";
import { RECENT_ANALYSES } from "@/lib/dashboardData";

const DECISION_STYLES = {
  produce: {
    label: "Produce",
    bg: "bg-accent-green-bg border-accent-green/20",
    text: "text-accent-green",
    dot: "bg-accent-green",
  },
  modify: {
    label: "Modify",
    bg: "bg-accent-amber-bg border-accent-amber/20",
    text: "text-accent-amber",
    dot: "bg-accent-amber",
  },
  hold: {
    label: "Hold",
    bg: "bg-accent-blue-bg border-accent-blue/20",
    text: "text-accent-blue",
    dot: "bg-accent-blue",
  },
  drop: {
    label: "Drop",
    bg: "bg-accent-red-bg border-accent-red/20",
    text: "text-accent-red",
    dot: "bg-accent-red",
  },
};

function ScoreBar({ score }) {
  const color =
    score >= 80 ? "bg-accent-green" :
    score >= 60 ? "bg-accent-amber" :
    score >= 40 ? "bg-accent-blue" : "bg-accent-red";

  return (
    <div className="flex items-center gap-2.5">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-border-light">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[12px] font-semibold text-charcoal">{score}</span>
    </div>
  );
}

export default function RecentAnalyses() {
  const [analyses, setAnalyses] = useState(RECENT_ANALYSES);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("attributes");

  useEffect(() => {
    const stored = localStorage.getItem("vastra_analyses");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnalyses([...parsed, ...RECENT_ANALYSES].slice(0, 5));
        }
      } catch (e) {
        console.error("Failed to parse stored analyses", e);
      }
    }
  }, []);

  const handleOpenProduct = (product) => {
    // Dynamically augment details if missing
    const fullProduct = {
      ...product,
      fabric: product.fabric || (product.id === 1 ? "Cotton Knit" : product.id === 2 ? "Cotton Linen Blend" : product.id === 3 ? "Polyester-Viscose" : product.id === 4 ? "Organza Silk" : "Banarasi Silk"),
      print: product.print || (product.id === 1 ? "Floral Block Print" : product.id === 2 ? "Solid Dyed" : product.id === 3 ? "Embroidered Zari" : product.id === 4 ? "Floral Digital Print" : "Jacquard Weave"),
      season: product.season || (product.id === 1 ? "Summer" : product.id === 2 ? "Summer/Monsoon" : product.id === 3 ? "Early Festive" : product.id === 4 ? "Spring/Summer" : "Festive/Wedding"),
      price: product.price || (product.id === 1 ? "1299" : product.id === 2 ? "1899" : product.id === 3 ? "1499" : product.id === 4 ? "699" : "3499"),
      sleeve: product.sleeve || "3/4 Sleeve",
      neckline: product.neckline || "V-Neck",
      silhouette: product.silhouette || "A-Line",
      length: product.length || "Midi",
      targetCity: product.targetCity || "Coimbatore",
      signals: product.signals || {
        demand: Math.min(99, Math.floor(product.score * 1.05)),
        weather: Math.floor(Math.random() * 30) + 60,
        sentiment: Math.floor(Math.random() * 20) + 70,
        influencer: Math.floor(Math.random() * 20) + 75,
        wedding: product.score > 80 ? 85 : 52,
        competitor: Math.floor(Math.random() * 30) + 40,
      },
      recommendations: product.recommendations || [
        `Target the ${product.season || "upcoming"} launch window. Local search volumes are currently spiking in Coimbatore.`,
        product.score >= 80 
          ? `Proceed with full-scale production. Current competitor inventory is low, leaving a strong market gap.`
          : `We suggest switching to a slightly lighter weave. Weather forecasts predict warmer monsoons with higher humidity.`,
        `Maintain the pricing around ₹${product.price || "1,299"}. It falls exactly within the sweet spot where conversion rates peak.`
      ],
      timeline: product.timeline || [
        { day: 0, label: "Confirm Supplier", desc: "Select fabric supplier & finalize details" },
        { day: 2, label: "Fabric Order", desc: "Order fabric or recommended substitutes" },
        { day: 5, label: "Begin Production", desc: "Start cutting and assembly line" },
        { day: 12, label: "Quality Checks", desc: "QC check & finishing touches" },
        { day: 19, label: "Launch Product", desc: "Release in target area/city" },
      ],
      pricing: product.pricing || {
        min: Math.floor(parseInt(String(product.price || "1299").replace(/[^0-9]/g, "")) * 0.75),
        ideal: parseInt(String(product.price || "1299").replace(/[^0-9]/g, "")),
        max: Math.floor(parseInt(String(product.price || "1299").replace(/[^0-9]/g, "")) * 1.25),
        rationale: `Given the brand's average selling price and typical competitor price range, pricing at the ideal mark captures high margins without alienating budget-conscious buyers in the selected target city.`,
      }
    };
    setSelectedProduct(fullProduct);
    setActiveTab("attributes");
  };

  return (
    <>
      <div className="animate-fade-in rounded-2xl border border-border bg-surface">
        <div className="border-b border-border px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon">
                Product Intelligence
              </p>
              <h3 className="mt-1 text-lg font-semibold text-charcoal">
                Recent Analyses
              </h3>
            </div>
            <button className="rounded-lg border border-border px-4 py-2 text-[12px] font-semibold text-muted transition-colors hover:border-maroon/20 hover:text-charcoal">
              View All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_100px_100px_100px_100px_80px] items-center gap-4 border-b border-border-light px-8 py-3">
          {["Product", "Category", "Score", "Decision", "Analyzed", ""].map(
            (col) => (
              <span
                key={col}
                className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted"
              >
                {col}
              </span>
            )
          )}
        </div>

        <div className="divide-y divide-border-light">
          {analyses.map((product) => {
            const decision = DECISION_STYLES[product.decision] || DECISION_STYLES.hold;

            return (
              <div
                key={product.id}
                className="group grid grid-cols-[1fr_100px_100px_100px_100px_80px] items-center gap-4 px-8 py-4 transition-colors hover:bg-surface-secondary"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-surface-secondary">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-[10px] font-bold text-white"
                        style={{ backgroundColor: product.color }}
                      >
                        {product.name
                          .split(" ")
                          .slice(0, 2)
                          .map((w) => w[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <span className="text-[13px] font-medium text-charcoal">
                    {product.name}
                  </span>
                </div>

                <span className="text-[12px] text-muted">{product.category}</span>

                <ScoreBar score={product.score} />

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${decision.bg} ${decision.text}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${decision.dot}`} />
                    {decision.label}
                  </span>
                </div>

                <span className="text-[12px] text-muted">
                  {product.analyzedAt}
                </span>

                <button
                  onClick={() => handleOpenProduct(product)}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-maroon opacity-0 transition-all hover:bg-maroon/5 group-hover:opacity-100"
                >
                  <Eye size={13} />
                  View
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs transition-opacity duration-300">
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl animate-fade-in">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-lg border border-border bg-surface-secondary">
                  {selectedProduct.image ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center text-[11px] font-bold text-white"
                      style={{ backgroundColor: selectedProduct.color }}
                    >
                      {selectedProduct.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-playfair text-lg font-bold text-charcoal">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-[11px] text-muted">
                    {selectedProduct.category} &nbsp;•&nbsp; Score: {selectedProduct.score} &nbsp;•&nbsp; target: {selectedProduct.targetCity || "Coimbatore"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                    DECISION_STYLES[selectedProduct.decision]?.bg || DECISION_STYLES.hold.bg
                  } ${DECISION_STYLES[selectedProduct.decision]?.text || DECISION_STYLES.hold.text}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${DECISION_STYLES[selectedProduct.decision]?.dot || DECISION_STYLES.hold.dot}`} />
                  {DECISION_STYLES[selectedProduct.decision]?.label || "Hold"}
                </span>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-lg p-1.5 text-muted hover:bg-neutral-100 hover:text-charcoal transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-border bg-surface-secondary px-2">
              {[
                { id: "attributes", label: "Attributes", icon: Layers },
                { id: "signals", label: "Demand Signals", icon: Activity },
                { id: "recommendations", label: "Recommendations", icon: Sparkles },
                { id: "timeline", label: "Production Plan", icon: Calendar },
                { id: "pricing", label: "Pricing", icon: IndianRupee },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "border-maroon text-maroon"
                        : "border-transparent text-muted hover:text-charcoal"
                    }`}
                  >
                    <Icon size={13} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 dashboard-scroll">
              {activeTab === "attributes" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-maroon">Product Attributes</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Fabric Type", value: selectedProduct.fabric },
                      { label: "Print / Pattern", value: selectedProduct.print },
                      { label: "Season Target", value: selectedProduct.season },
                      { label: "Silhouette", value: selectedProduct.silhouette },
                      { label: "Sleeve Cut", value: selectedProduct.sleeve },
                      { label: "Neckline", value: selectedProduct.neckline },
                      { label: "Length", value: selectedProduct.length },
                      { label: "Est. Retail Price", value: String(selectedProduct.price).startsWith("₹") ? selectedProduct.price : `₹${selectedProduct.price}` },
                    ].map((attr) => (
                      <div key={attr.label} className="rounded-xl border border-border bg-surface px-4 py-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{attr.label}</span>
                        <p className="mt-1 text-[13.5px] font-semibold text-charcoal">{attr.value || "N/A"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "signals" && (
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-maroon">Demand Signals Breakdown</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Demand Intensity", value: selectedProduct.signals.demand, emoji: "🔥" },
                      { label: "Weather Match", value: selectedProduct.signals.weather, emoji: "🌤" },
                      { label: "Social Sentiment", value: selectedProduct.signals.sentiment, emoji: "📈" },
                      { label: "Influencer Heat", value: selectedProduct.signals.influencer, emoji: "📱" },
                      { label: "Wedding Calendar", value: selectedProduct.signals.wedding, emoji: "💍" },
                      { label: "Competitor Stock", value: selectedProduct.signals.competitor, emoji: "👗" }
                    ].map((sig) => (
                      <div key={sig.label} className="rounded-xl border border-border bg-surface px-4 py-3 flex flex-col justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                          <span>{sig.emoji}</span>
                          {sig.label}
                        </span>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-lg font-bold text-charcoal">{sig.value}%</span>
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border-light">
                            <div
                              className={`h-full rounded-full ${
                                sig.value >= 75 ? "bg-accent-green" :
                                sig.value >= 50 ? "bg-accent-amber" : "bg-accent-red"
                              }`}
                              style={{ width: `${sig.value}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "recommendations" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-maroon">TRYND AI Product Recommendations</h4>
                  <div className="space-y-3 rounded-xl border border-maroon/10 bg-cream/30 p-5">
                    {selectedProduct.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-maroon/10 text-[11px] font-bold text-maroon">
                          {i + 1}
                        </span>
                        <p className="text-[13px] leading-relaxed text-charcoal/90">
                          {rec}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-maroon">Release Timeline & Tasks</h4>
                  <div className="relative border-l-2 border-border pl-6 ml-3 space-y-6 py-2">
                    {selectedProduct.timeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot */}
                        <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-maroon" />
                        
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                            Day {step.day} &nbsp;•&nbsp; {step.label}
                          </span>
                          <p className="mt-0.5 text-[12.5px] text-charcoal/90">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="space-y-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-maroon">Price Recommendation Range</h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Minimum Price", value: selectedProduct.pricing.min, desc: "For volume discount play" },
                      { label: "Ideal Target Price", value: selectedProduct.pricing.ideal, desc: "Best conversion value", highlight: true },
                      { label: "Maximum Price", value: selectedProduct.pricing.max, desc: "Premium brand capping" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`rounded-xl border p-4 text-center ${
                          item.highlight
                            ? "border-maroon/20 bg-cream/30 ring-2 ring-maroon/5"
                            : "border-border bg-surface"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{item.label}</span>
                        <p className={`mt-1.5 text-2xl font-bold ${item.highlight ? "text-maroon" : "text-charcoal"}`}>
                          ₹{item.value}
                        </p>
                        <p className="mt-1 text-[10px] text-muted">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-4 flex gap-3 items-start">
                    <Info size={16} className="text-maroon flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal">Pricing Rationale</span>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{selectedProduct.pricing.rationale}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-border px-6 py-4 bg-surface-secondary">
              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-xl bg-maroon px-5 py-2 text-[12.5px] font-bold text-white transition-all hover:bg-maroon-light"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
