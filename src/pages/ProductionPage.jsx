import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar, CheckCircle2, Circle, Loader2, ArrowRight,
  TrendingUp, Users, DollarSign, Package, AlertCircle,
  Plus, Search, SlidersHorizontal, MapPin, ChevronRight,
  FileText, ShieldCheck, Truck, BarChart3, HelpCircle, X,
  Percent, ArrowUpRight
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getBrand } from "@/lib/mockApi";
import { RECENT_ANALYSES } from "@/lib/dashboardData";

// Static mock data for production page stats
const STATS = [
  { label: "Active Batches", value: "3", icon: Package, color: "text-maroon bg-maroon/5 border-maroon/10" },
  { label: "Total Units", value: "300", icon: TrendingUp, color: "text-accent-green bg-accent-green-bg border-accent-green/10" },
  { label: "Active Suppliers", value: "4", icon: Users, color: "text-accent-purple bg-accent-purple-bg border-accent-purple/10" },
  { label: "Budget Allocated", value: "₹1,56,000", icon: DollarSign, color: "text-accent-amber bg-accent-amber-bg border-accent-amber/10" }
];

const INITIAL_BATCHES = [
  {
    id: "B-2026-01",
    name: "Block Print A-Line Kurti",
    category: "Kurti",
    units: 100,
    progress: 26,
    status: "Stitching",
    priority: "HIGH",
    daysElapsed: 5,
    totalDays: 19,
    fabric: "Cotton-Linen Blend (140 GSM)",
    source: "Erode Belt Sourcing",
    unitCost: 520,
    retailPrice: 799,
    steps: [
      { day: 0, label: "Supplier Confirmation", status: "completed", desc: "Supplier: Kavitha block prints, Erode", date: "June 27" },
      { day: 2, label: "Fabric Order & Sourcing", status: "completed", desc: "500 meters Cotton-Linen sourced", date: "June 29" },
      { day: 5, label: "Cutting & Stitching", status: "active", desc: "Tirupur Stitching Hub — 30/100 units completed", date: "July 2 (Today)" },
      { day: 17, label: "Quality Check", status: "upcoming", desc: "QC inspection & tags attachment", date: "July 14" },
      { day: 19, label: "WhatsApp & Reel Launch", status: "upcoming", desc: "Reel goes live, catalog broadcast", date: "July 16" }
    ]
  },
  {
    id: "B-2026-02",
    name: "Cotton Linen Coord Set",
    category: "Coords",
    units: 150,
    progress: 63,
    status: "Quality Control",
    priority: "MEDIUM",
    daysElapsed: 12,
    totalDays: 19,
    fabric: "Premium Linen (180 GSM)",
    source: "Tirupur Mill Sourcing",
    unitCost: 890,
    retailPrice: 1899,
    steps: [
      { day: 0, label: "Supplier Confirmation", status: "completed", desc: "Confirmed: Apex Weaves, Tirupur", date: "June 20" },
      { day: 2, label: "Fabric Order & Sourcing", status: "completed", desc: "600 meters Premium Linen dyed & washed", date: "June 22" },
      { day: 5, label: "Cutting & Stitching", status: "completed", desc: "Stitching completed, buttons attached", date: "June 25" },
      { day: 12, label: "Quality Control & Ironing", status: "active", desc: "QC check in progress, 90/150 units approved", date: "July 2 (Today)" },
      { day: 19, label: "Launch Prep & Warehouse", status: "upcoming", desc: "Folded, labeled and ready for delivery", date: "July 9" }
    ]
  },
  {
    id: "B-2026-03",
    name: "Occasion Wear Saree",
    category: "Saree",
    units: 50,
    progress: 5,
    status: "Sourcing",
    priority: "CRITICAL",
    daysElapsed: 1,
    totalDays: 25,
    fabric: "Banarasi Silk Blend",
    source: "Coimbatore Loom Guild",
    unitCost: 1650,
    retailPrice: 3499,
    steps: [
      { day: 0, label: "Designer Review & Spec Sheet", status: "completed", desc: "Approved weave specs & borders", date: "July 1" },
      { day: 2, label: "Yarn Dyeing & Sourcing", status: "active", desc: "Coimbatore Loom Guild weaving start", date: "July 2 (Today)" },
      { day: 10, label: "Embroidery/Zari Additions", status: "upcoming", desc: "Fine zari details printing & borders", date: "July 11" },
      { day: 22, label: "QC Inspection", status: "upcoming", desc: "Rigorous thread & fold count check", date: "July 23" },
      { day: 25, label: "Launch", status: "upcoming", desc: "Special festive collection dispatch", date: "July 26" }
    ]
  }
];

const SUPPLIERS = [
  { name: "Kavitha Block Prints", location: "Erode, TN", type: "Fabric Printing", status: "Active", workload: "Normal", activeBatches: "1 Batch" },
  { name: "Apex Weaves Ltd.", location: "Tirupur, TN", type: "Weaving & Dyeing", status: "Active", workload: "Busy", activeBatches: "1 Batch" },
  { name: "Tirupur Stitching Hub", location: "Tirupur, TN", type: "Tailoring / Cut & Sew", status: "Active", workload: "Normal", activeBatches: "2 Batches" },
  { name: "Coimbatore Loom Guild", location: "Coimbatore, TN", type: "Handloom / Silk Weaving", status: "Active", workload: "High", activeBatches: "1 Batch" }
];

export default function ProductionPage() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [activeBatchIndex, setActiveBatchIndex] = useState(0);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [products, setProducts] = useState([]);
  
  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    productId: "",
    name: "",
    category: "Kurti",
    units: 100,
    priority: "HIGH",
    fabric: "Cotton-Linen Blend (140 GSM)",
    source: "Erode Belt Sourcing",
    unitCost: 520,
    retailPrice: 799,
    supplierWeave: "Apex Weaves Ltd.",
    supplierPrint: "Kavitha Block Prints",
    supplierStitch: "Tirupur Stitching Hub"
  });

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
  }, []);

  const activeBatch = batches[activeBatchIndex];

  // Handle product selection in form
  const handleProductSelect = (productId) => {
    if (!productId) {
      setFormValues(prev => ({
        ...prev,
        productId: "",
        name: "",
        category: "Kurti",
        fabric: "Cotton-Linen Blend (140 GSM)",
        retailPrice: 799
      }));
      return;
    }

    const selected = products.find(p => String(p.id) === String(productId));
    if (selected) {
      const rawPrice = parseInt(String(selected.price || "").replace(/[^0-9]/g, "")) || 799;
      setFormValues(prev => ({
        ...prev,
        productId: String(selected.id),
        name: selected.name,
        category: selected.category || "Kurti",
        fabric: selected.fabric || "Cotton Blend",
        retailPrice: rawPrice
      }));
    }
  };

  // Handle form submission
  const handleSubmitPlan = (e) => {
    e.preventDefault();
    
    const nextId = `B-2026-0${batches.length + 1}`;
    const newBatch = {
      id: nextId,
      name: formValues.name || "Custom Production Batch",
      category: formValues.category,
      units: Number(formValues.units),
      progress: 0,
      status: "Planning",
      priority: formValues.priority,
      daysElapsed: 0,
      totalDays: 20,
      fabric: formValues.fabric,
      source: formValues.source,
      unitCost: Number(formValues.unitCost),
      retailPrice: Number(formValues.retailPrice),
      steps: [
        { day: 0, label: "Production Confirmed", status: "completed", desc: `Plan set under ${formValues.priority} priority`, date: "Today" },
        { day: 2, label: "Supplier Allocation", status: "active", desc: `Weave: ${formValues.supplierWeave} · Print: ${formValues.supplierPrint}`, date: "In 2 days" },
        { day: 6, label: "Stitching Start", status: "upcoming", desc: `Tailoring assigned to ${formValues.supplierStitch}`, date: "In 6 days" },
        { day: 15, label: "QC Inspection", status: "upcoming", desc: "Approval & packaging audit", date: "In 15 days" },
        { day: 20, label: "Market Launch", status: "upcoming", desc: "Dispatched to warehouse & reel go-live", date: "In 20 days" }
      ]
    };

    const updatedBatches = [...batches, newBatch];
    setBatches(updatedBatches);
    setActiveBatchIndex(updatedBatches.length - 1);
    setIsCreateModalOpen(false);

    // Reset form values
    setFormValues({
      productId: "",
      name: "",
      category: "Kurti",
      units: 100,
      priority: "HIGH",
      fabric: "Cotton-Linen Blend (140 GSM)",
      source: "Erode Belt Sourcing",
      unitCost: 520,
      retailPrice: 799,
      supplierWeave: "Apex Weaves Ltd.",
      supplierPrint: "Kavitha Block Prints",
      supplierStitch: "Tirupur Stitching Hub"
    });
  };

  // Helper for priority color badge
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-accent-red-bg text-accent-red border-accent-red/20";
      case "HIGH":
        return "bg-accent-amber-bg text-accent-amber border-accent-amber/20";
      default:
        return "bg-accent-blue-bg text-accent-blue border-accent-blue/20";
    }
  };

  // Helper for step icon
  const renderStepIcon = (status) => {
    if (status === "completed") {
      return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-green text-white shadow-sm flex-shrink-0">
          <CheckCircle2 size={13} />
        </div>
      );
    }
    if (status === "active") {
      return (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-white shadow-sm ring-4 ring-maroon/10 animate-pulse-dot flex-shrink-0">
          <Loader2 size={13} className="animate-spin" />
        </div>
      );
    }
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border-light bg-white text-muted flex-shrink-0">
        <Circle size={10} className="fill-muted/20" />
      </div>
    );
  };

  // Calculate dynamic margins for modal preview
  const totalCostPreview = formValues.unitCost * formValues.units;
  const totalRevPreview = formValues.retailPrice * formValues.units;
  const netProfitPreview = totalRevPreview - totalCostPreview;
  const marginPercentPreview = totalRevPreview > 0 ? Math.round((netProfitPreview / totalRevPreview) * 100) : 0;

  return (
    <DashboardLayout brand={brand}>
      <div className="space-y-6 animate-fade-in">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-maroon" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-maroon">Workflow Management</span>
            </div>
            <h1 className="font-playfair text-3xl font-bold tracking-wide text-charcoal">
              Production Plans
            </h1>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
              Oversee and manage active batches, track milestones, and view Erode & Tirupur supplier status.
            </p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-maroon px-5 text-[12px] font-bold text-white shadow-md shadow-maroon/10 hover:bg-maroon-light transition-all"
          >
            <Plus size={14} /> Create Production Plan
          </button>
        </div>

        {/* ── STATS ROW ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="rounded-2xl border border-border bg-white p-5 shadow-sm flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${stat.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{stat.label}</span>
                  <p className="text-xl font-bold text-charcoal mt-0.5">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── PRIMARY WORKSPACE LAYOUT ── */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* Left Column: Batches List */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60">Active Batches</h3>
            <div className="space-y-2">
              {batches.map((batch, index) => {
                const isActive = index === activeBatchIndex;
                return (
                  <button
                    key={batch.id}
                    onClick={() => setActiveBatchIndex(index)}
                    className={`w-full rounded-xl border p-4 text-left transition-all hover:bg-white hover:shadow-md ${
                      isActive 
                        ? "border-maroon bg-white shadow-sm" 
                        : "border-border-light bg-white/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-semibold text-muted tracking-wider">{batch.id}</span>
                      <span className={`inline-block rounded-full border px-2 py-0.5 text-[8px] font-bold ${getPriorityStyle(batch.priority)}`}>
                        {batch.priority}
                      </span>
                    </div>
                    <h4 className="font-playfair text-[14px] font-bold text-charcoal truncate">{batch.name}</h4>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] text-muted">{batch.units} Units · {batch.status}</span>
                      <span className="text-[11px] font-bold text-charcoal">{batch.progress}%</span>
                    </div>
                    {/* Tiny progress bar */}
                    <div className="mt-2 h-1 w-full bg-border-light rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-maroon rounded-full transition-all duration-500" 
                        style={{ width: `${batch.progress}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Supplier Quick List */}
            <div className="rounded-2xl border border-border bg-white p-4 mt-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60 mb-3 flex items-center gap-1.5">
                <Users size={12} className="text-muted/60" /> Suppliers Directory
              </h4>
              <div className="space-y-3">
                {SUPPLIERS.map((s, i) => (
                  <div key={i} className="text-[11px] border-b border-border-light pb-2 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between font-semibold text-charcoal">
                      <span>{s.name}</span>
                      <span className="text-[9px] font-bold text-accent-green">{s.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted mt-0.5">
                      <span>{s.type} · {s.location}</span>
                      <span>{s.workload}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Active Batch Details & Milestones */}
          <div className="space-y-6">

            {/* Batch Header / Info */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border-light pb-4 mb-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted">{activeBatch.id} · {activeBatch.category}</span>
                  <h2 className="font-playfair text-2xl font-bold text-charcoal mt-0.5">{activeBatch.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-muted font-medium">Batch Progress:</span>
                  <span className="text-lg font-bold text-charcoal">{activeBatch.progress}%</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-xl bg-surface-secondary/40 border border-border-light p-3">
                  <span className="text-[9px] font-bold uppercase text-muted tracking-wider">Raw Material</span>
                  <p className="text-[12px] font-bold text-charcoal mt-1 truncate">{activeBatch.fabric}</p>
                </div>
                <div className="rounded-xl bg-surface-secondary/40 border border-border-light p-3">
                  <span className="text-[9px] font-bold uppercase text-muted tracking-wider">Sourcing Origin</span>
                  <p className="text-[12px] font-bold text-charcoal mt-1 truncate">{activeBatch.source}</p>
                </div>
                <div className="rounded-xl bg-surface-secondary/40 border border-border-light p-3">
                  <span className="text-[9px] font-bold uppercase text-muted tracking-wider">Cost per Unit</span>
                  <p className="text-[12px] font-bold text-charcoal mt-1">₹{activeBatch.unitCost} <span className="text-[10px] text-muted">/ pc</span></p>
                </div>
                <div className="rounded-xl bg-accent-green-bg/30 border border-accent-green/10 p-3">
                  <span className="text-[9px] font-bold uppercase text-muted tracking-wider">Target Price</span>
                  <p className="text-[12px] font-bold text-accent-green mt-1">₹{activeBatch.retailPrice} <span className="text-[10px] text-accent-green">/ pc</span></p>
                </div>
              </div>

              {/* Progress Summary Text */}
              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-accent-amber/15 bg-accent-amber-bg/50 p-4">
                <AlertCircle size={15} className="text-accent-amber flex-shrink-0" />
                <span className="text-[12px] text-muted leading-relaxed">
                  Currently at <strong className="text-charcoal">{activeBatch.status}</strong> stage. Plan is {activeBatch.daysElapsed} days into a {activeBatch.totalDays}-day release window. 
                </span>
              </div>
            </div>

            {/* Production Timeline Milestones */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60 mb-5">Milestone Timeline</h3>

              <div className="relative pl-7 space-y-6">
                {/* Center line */}
                <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-border-light" />

                {activeBatch.steps.map((step, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    {/* Circle / Icon */}
                    <div className="absolute -left-[27px] top-0 bg-white">
                      {renderStepIcon(step.status)}
                    </div>
                    {/* Step details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-[13px] font-bold text-charcoal flex items-center gap-2">
                          {step.label}
                          <span className="text-[10px] font-bold text-muted bg-surface-secondary px-1.5 py-0.5 rounded">
                            Day {step.day}
                          </span>
                        </h4>
                        <span className="text-[10px] text-muted mt-1 sm:mt-0">{step.date}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial & Margin Calculator */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted/60 mb-4">Financial & Margin Projection</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border-light p-4">
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Estimated Total Cost</span>
                  <span className="text-xl font-bold text-charcoal block mt-1">₹{activeBatch.unitCost * activeBatch.units}</span>
                  <span className="text-[10px] text-muted block mt-0.5">₹{activeBatch.unitCost} × {activeBatch.units} units</span>
                </div>
                <div className="rounded-xl border border-border-light p-4">
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Projected Revenue</span>
                  <span className="text-xl font-bold text-charcoal block mt-1">₹{activeBatch.retailPrice * activeBatch.units}</span>
                  <span className="text-[10px] text-muted block mt-0.5">₹{activeBatch.retailPrice} × {activeBatch.units} units</span>
                </div>
                <div className="rounded-xl bg-accent-green-bg/30 border border-accent-green/10 p-4">
                  <span className="text-[9px] font-bold text-accent-green uppercase tracking-wider block">Net Profit Margin</span>
                  <span className="text-xl font-bold text-accent-green block mt-1">
                    ₹{(activeBatch.retailPrice - activeBatch.unitCost) * activeBatch.units}
                  </span>
                  <span className="text-[10px] text-accent-green block mt-0.5">
                    {Math.round(((activeBatch.retailPrice - activeBatch.unitCost) / activeBatch.retailPrice) * 100)}% projected markup
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── LIVE LOGISTICS ALERTS ── */}
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Truck size={16} className="text-maroon" />
            <h3 className="text-[13px] font-bold text-charcoal">Live Logistics & Sourcing Feed</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-[11px] leading-relaxed text-muted border-b border-border-light pb-2">
              <span className="h-2 w-2 rounded-full bg-accent-amber mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-charcoal">Dyeing delay alert (Tirupur):</strong> Monsoon humidity levels have slightly slowed natural hang-drying times. Sourcing shifts updated to maintain block printing deadlines.
              </div>
              <span className="text-[9px] text-muted ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-start gap-3 text-[11px] leading-relaxed text-muted border-b border-border-light pb-2 last:border-b-0 last:pb-0">
              <span className="h-2 w-2 rounded-full bg-accent-green mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-charcoal">Fabric dispatch confirmed (Erode):</strong> 500m cotton-linen blend dispatched to Tirupur Stitching Hub. Delivery status: Received.
              </div>
              <span className="text-[9px] text-muted ml-auto">5 hours ago</span>
            </div>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════ */}
      {/* CREATE PRODUCTION PLAN MODAL               */}
      {/* ══════════════════════════════════════════ */}
      {isCreateModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4 md:p-8 animate-fade-in"
          onClick={(e) => { if (e.target === e.currentTarget) setIsCreateModalOpen(false); }}
        >
          <div className="relative w-full max-w-[950px] rounded-2xl bg-cream shadow-2xl ring-1 ring-black/5 my-4 overflow-hidden animate-slide-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-maroon/5 text-maroon">
                  <Calendar size={18} />
                </div>
                <div>
                  <h2 className="font-playfair text-xl font-bold text-charcoal">Create Production Plan</h2>
                  <p className="text-[11px] text-muted mt-0.5">Configure logistics, raw materials, batch size and launch timeline.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-charcoal/50 hover:bg-maroon hover:text-white transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitPlan}>
              <div className="grid gap-6 p-6 md:grid-cols-[1fr_360px] min-h-[480px]">
                
                {/* Left Side: General Fields */}
                <div className="space-y-4">
                  <div className="border-b border-border-light pb-2 mb-2">
                    <span className="text-[10px] font-bold text-maroon uppercase tracking-wider">Plan Details</span>
                  </div>

                  {/* Select Analyzed Product */}
                  <div>
                    <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                      Link Analyzed Design
                    </label>
                    <select
                      value={formValues.productId}
                      onChange={(e) => handleProductSelect(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border-light bg-white px-3.5 text-[12px] font-medium text-charcoal outline-none transition focus:border-maroon/30 focus:ring-2 focus:ring-maroon/8"
                      required
                    >
                      <option value="">-- Choose from Analyzed Designs --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.category}) - Score: {p.score}</option>
                      ))}
                    </select>
                  </div>

                  {/* Plan Name */}
                  <div>
                    <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                      Production Plan Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Summer Cotton Kurti Batch 1"
                      value={formValues.name}
                      onChange={(e) => setFormValues(prev => ({ ...prev, name: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-border-light bg-white px-4 text-[13px] text-charcoal outline-none placeholder:text-muted/50 transition focus:border-maroon/30 focus:ring-2 focus:ring-maroon/8"
                      required
                    />
                  </div>

                  {/* Batch Size & Priority */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                        Batch Size (Units)
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="100"
                        value={formValues.units}
                        onChange={(e) => setFormValues(prev => ({ ...prev, units: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-border-light bg-white px-4 text-[13px] text-charcoal outline-none placeholder:text-muted/50 transition focus:border-maroon/30 focus:ring-2 focus:ring-maroon/8"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                        Priority Level
                      </label>
                      <div className="flex gap-2 h-11 items-center">
                        {["MEDIUM", "HIGH", "CRITICAL"].map(lvl => (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setFormValues(prev => ({ ...prev, priority: lvl }))}
                            className={`flex-1 h-9 rounded-lg text-[10px] font-bold transition-all border ${
                              formValues.priority === lvl
                                ? lvl === "CRITICAL"
                                  ? "bg-accent-red-bg border-accent-red/20 text-accent-red"
                                  : lvl === "HIGH"
                                    ? "bg-accent-amber-bg border-accent-amber/20 text-accent-amber"
                                    : "bg-accent-blue-bg border-accent-blue/20 text-accent-blue"
                                : "bg-white border-border-light text-muted hover:text-charcoal"
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fabric Specs & Origin */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                        Fabric Details & Weight
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Cotton-Linen Blend (140 GSM)"
                        value={formValues.fabric}
                        onChange={(e) => setFormValues(prev => ({ ...prev, fabric: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-border-light bg-white px-4 text-[13px] text-charcoal outline-none placeholder:text-muted/50 transition focus:border-maroon/30 focus:ring-2 focus:ring-maroon/8"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                        Sourcing Origin
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Erode Sourcing Belt"
                        value={formValues.source}
                        onChange={(e) => setFormValues(prev => ({ ...prev, source: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-border-light bg-white px-4 text-[13px] text-charcoal outline-none placeholder:text-muted/50 transition focus:border-maroon/30 focus:ring-2 focus:ring-maroon/8"
                        required
                      />
                    </div>
                  </div>

                  {/* Financial inputs */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                        Est. Cost per Unit (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="520"
                        value={formValues.unitCost}
                        onChange={(e) => setFormValues(prev => ({ ...prev, unitCost: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-border-light bg-white px-4 text-[13px] text-charcoal outline-none placeholder:text-muted/50 transition focus:border-maroon/30 focus:ring-2 focus:ring-maroon/8"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-charcoal uppercase tracking-wider block mb-1.5">
                        Target Retail Price (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="799"
                        value={formValues.retailPrice}
                        onChange={(e) => setFormValues(prev => ({ ...prev, retailPrice: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-border-light bg-white px-4 text-[13px] text-charcoal outline-none placeholder:text-muted/50 transition focus:border-maroon/30 focus:ring-2 focus:ring-maroon/8"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Supplier Assignment & Margin Preview */}
                <div className="space-y-4">
                  <div className="border-b border-border-light pb-2 mb-2">
                    <span className="text-[10px] font-bold text-maroon uppercase tracking-wider">Logistics & Projections</span>
                  </div>

                  {/* Supplier Allocation */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-1">
                        Weaving & Dyeing Supplier
                      </label>
                      <select
                        value={formValues.supplierWeave}
                        onChange={(e) => setFormValues(prev => ({ ...prev, supplierWeave: e.target.value }))}
                        className="h-10 w-full rounded-xl border border-border-light bg-white px-3.5 text-[11px] text-charcoal outline-none"
                      >
                        <option value="Apex Weaves Ltd.">Apex Weaves Ltd. (Tirupur)</option>
                        <option value="Coimbatore Loom Guild">Coimbatore Loom Guild (CBE)</option>
                        <option value="Erode Textile Guild">Erode Textile Guild (Erode)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-1">
                        Dyeing / Printing Partner
                      </label>
                      <select
                        value={formValues.supplierPrint}
                        onChange={(e) => setFormValues(prev => ({ ...prev, supplierPrint: e.target.value }))}
                        className="h-10 w-full rounded-xl border border-border-light bg-white px-3.5 text-[11px] text-charcoal outline-none"
                      >
                        <option value="Kavitha Block Prints">Kavitha Block Prints (Erode)</option>
                        <option value="Apex Dyeing Hub">Apex Dyeing Hub (Tirupur)</option>
                        <option value="None / Solid Dyed">None / Solid Dyed</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider block mb-1">
                        Cut & Stitch Tailoring Hub
                      </label>
                      <select
                        value={formValues.supplierStitch}
                        onChange={(e) => setFormValues(prev => ({ ...prev, supplierStitch: e.target.value }))}
                        className="h-10 w-full rounded-xl border border-border-light bg-white px-3.5 text-[11px] text-charcoal outline-none"
                      >
                        <option value="Tirupur Stitching Hub">Tirupur Stitching Hub (Tirupur)</option>
                        <option value="Coimbatore Garments Ltd.">Coimbatore Garments Ltd. (CBE)</option>
                      </select>
                    </div>
                  </div>

                  {/* Financial Projection Sidebar */}
                  <div className="rounded-xl border border-border-light bg-white p-4 space-y-3 mt-4">
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider block">Financial Preview</span>
                    
                    <div className="flex items-center justify-between text-[12px] border-b border-border-light pb-2">
                      <span className="text-muted">Total Cost:</span>
                      <span className="font-semibold text-charcoal">₹{totalCostPreview.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] border-b border-border-light pb-2">
                      <span className="text-muted">Total Revenue:</span>
                      <span className="font-semibold text-charcoal">₹{totalRevPreview.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Projected Margin</span>
                        <span className="text-lg font-bold text-accent-green mt-0.5">₹{netProfitPreview.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 rounded bg-accent-green-bg px-2 py-1 text-[11px] font-bold text-accent-green">
                        <Percent size={12} />
                        {marginPercentPreview}%
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-xl border border-border px-5 py-2.5 text-[12px] font-bold text-charcoal hover:bg-surface-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-maroon px-6 py-2.5 text-[12px] font-bold text-white shadow-md shadow-maroon/15 hover:bg-maroon-light transition-all"
                >
                  Launch Production Plan <ArrowUpRight size={14} />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
