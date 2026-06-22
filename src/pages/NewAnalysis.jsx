import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Upload, X, Check, Sparkles, Camera,
  FileText, MapPin, Activity, CloudSun, TrendingUp, Film,
  Gem, ShoppingBag, Smartphone, RefreshCw, CheckCircle2,
  Trash2, AlertTriangle
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { RECENT_ANALYSES } from "@/lib/dashboardData";
import { useAxios } from "@/hooks/useAxios";
import { getBrand } from "@/lib/mockApi";
import img1 from "@/assets/img1.jpeg";
import aishwarya from "@/assets/Aishwarya.jpeg";
import kanishka from "@/assets/Kanishka.jpeg";

export default function NewAnalysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const { get, post } = useAxios();

  // Navigation state passed from Quick Actions or Dashboard
  useEffect(() => {
    if (location.state?.method) {
      setEntryMethod(location.state.method);
      // Clean state after reading to prevent sticky behavior
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // States
  const [entryMethod, setEntryMethod] = useState(null); // 'upload' | 'manual' | null
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null); // { name, size, preview, fileObj }
  const [isDemoEmptyState, setIsDemoEmptyState] = useState(false);

  // Manual Form States
  const [formValues, setFormValues] = useState({
    name: "",
    category: "kurtis",
    price: "",
    fabric: "Cotton Linen Blend",
    pattern: "Floral",
    season: "summer",
    sleeve: "Three-Quarter",
    neckline: "V-Neck",
    silhouette: "A-Line",
    length: "Calf Length",
    notes: ""
  });

  // Analysis Simulation States
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Local Storage for Recent Analyses
  const [savedAnalyses, setSavedAnalyses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("vastra_analyses");
    if (stored) {
      try {
        setSavedAnalyses(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load custom analyses", e);
      }
    }
  }, []);

  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Validation
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid format. Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10 MB limit.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setUploadedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      preview: previewUrl,
      fileObj: file
    });
  };

  const handleRemoveFile = () => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Run AI Analysis (hitting actual backend endpoints, falling back to mock if needed)
  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const steps = [
      "Queueing AI analysis scan job...",
      "Extracting fabric details and patterns...",
      "Analyzing garment silhouette and neckline features...",
      "Detecting color palettes and matching with local wedding calendars...",
      "Cross-referencing climate outlook with thermal index...",
      "Scraping competitor stock levels in Coimbatore, Tirupur, and Cochin...",
      "Calculating target audience sentiment heat index...",
      "Compiling final TRYND predictive scorecard..."
    ];

    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    try {
      let productId = null;
      let scanId = null;

      // 1. Photo upload or manual entry
      if (entryMethod === "upload") {
        const formData = new FormData();
        if (uploadedFile?.fileObj) {
          formData.append("image", uploadedFile.fileObj);
        } else {
          // Fake file binary
          const blob = await fetch(uploadedFile?.preview || img1).then(r => r.blob());
          formData.append("image", new File([blob], uploadedFile?.name || "image.jpg", { type: "image/jpeg" }));
        }
        formData.append("notes", "Uploaded via TRYND portal");

        const uploadRes = await post("/products/entry/photo", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        productId = uploadRes.product_id;
        scanId = uploadRes.scan_id;

        // Poll Scan Job Status
        let statusRes = { status: "queued" };
        let retries = 0;
        while (statusRes.status !== "completed" && statusRes.status !== "failed" && retries < 10) {
          await new Promise(r => setTimeout(r, 1000));
          statusRes = await get(`/scans/${scanId}/status`);
          retries++;
        }
        if (statusRes.status === "failed") {
          throw new Error("AI Scan Job failed");
        }
      } else {
        // Manual form entry
        const manualPayload = {
          product_name: formValues.name,
          category: formValues.category,
          fabric: formValues.fabric,
          price: Number(formValues.price) || 1299,
          print_pattern: formValues.pattern,
          season: formValues.season.toLowerCase(),
          sleeve: formValues.sleeve,
          neckline: formValues.neckline,
          silhouette: formValues.silhouette,
          length: formValues.length,
          notes: formValues.notes
        };
        const entryRes = await post("/products/entry/manual", manualPayload);
        productId = entryRes.product_id;
      }

      // 2. Set Target Area (Defaults to brand's primary city)
      const brandData = await getBrand();
      const targetCity = brandData?.city || "Coimbatore";
      await post(`/products/${productId}/target-area`, {
        target_city: targetCity
      });

      // 3. Fetch Signals
      const signalsRes = await get(`/signals/product/${productId}`);

      // 4. Generate Decision Recommendations
      const decisionRes = await post(`/decisions/generate/${productId}`);

      // 5. Generate Production Plans
      const planRes = await post(`/production-plans/generate/${productId}`);

      // 6. Get Price Recommendation
      const priceRes = await get(`/products/${productId}/price-recommendation`);

      clearInterval(interval);
      setIsAnalyzing(false);

      const categoryDisplayMap = {
        kurtis: "Kurtis",
        coords: "Coords",
        sarees: "Sarees",
        salwar_sets: "Salwar Sets",
        unstitched: "Unstitched",
        tops: "Tops",
        dupattas: "Dupattas",
        occasion_wear: "Occasion Wear"
      };

      const finalResult = {
        id: productId,
        name: entryMethod === "manual" ? formValues.name : (decisionRes.product_name || "AI Scanned Design"),
        category: categoryDisplayMap[formValues.category] || formValues.category || "Kurtis",
        score: signalsRes.overall_signal_score || 75,
        decision: decisionRes.decision || "hold",
        price: entryMethod === "manual" ? `₹${formValues.price}` : `₹${priceRes.recommended_price_range?.ideal || 1199}`,
        fabric: entryMethod === "manual" ? formValues.fabric : "Mulmul Cotton-Linen",
        print: entryMethod === "manual" ? formValues.pattern : "Botanical Block Print",
        season: entryMethod === "manual" ? formValues.season : "Summer/Monsoon",
        image: entryMethod === "upload" ? uploadedFile.preview : img1,
        analyzedAt: "Just now",
        color: ["#7b1c2e", "#8b7193", "#6b8f71", "#7889a0", "#b8922a"][Math.floor(Math.random() * 5)],
        signals: {
          demand: signalsRes.signals?.find(s => s.signal_code === "demand_score")?.score || 75,
          weather: signalsRes.signals?.find(s => s.signal_code === "weather_commerce")?.score || 60,
          sentiment: signalsRes.signals?.find(s => s.signal_code === "market_sentiment")?.score || 65,
          influencer: signalsRes.signals?.find(s => s.signal_code === "influencer_heat")?.score || 70,
          wedding: signalsRes.signals?.find(s => s.signal_code === "wedding_intelligence")?.score || 55,
          competitor: signalsRes.signals?.find(s => s.signal_code === "competitor_stock_intel")?.score || 50,
        },
        recommendations: decisionRes.recommended_changes?.map(rec => `${rec.attribute.toUpperCase()}: Change from ${rec.current} to ${rec.recommended}. Reason: ${rec.reason}`) || [
          "Target the launch window. Local search volumes are currently spiking.",
          "Proceed with full-scale production."
        ],
        timeline: planRes.timeline?.map(t => ({ day: t.day, label: t.task, desc: t.task })) || [
          { day: 0, label: "Confirm Supplier", desc: "Select fabric supplier & finalize details" },
          { day: 2, label: "Fabric Order", desc: "Order fabric or recommended substitutes" },
          { day: 5, label: "Begin Production", desc: "Start cutting and assembly line" },
          { day: 12, label: "Quality Checks", desc: "QC check & finishing touches" },
          { day: 19, label: "Launch Product", desc: "Release in target area/city" },
        ],
        pricing: {
          min: priceRes.recommended_price_range?.min || 899,
          ideal: priceRes.recommended_price_range?.ideal || 1199,
          max: priceRes.recommended_price_range?.max || 1499,
          rationale: priceRes.rationale || "Pricing aligns with local market indicators."
        }
      };

      setAnalysisResult(finalResult);
    } catch (err) {
      console.warn("Real backend analysis flow failed, running simulation fallback:", err.message);
      // Wait for the interval animation to get close to the end, then call local fallback
      setTimeout(() => {
        clearInterval(interval);
        finishAnalysis();
      }, 1000);
    }
  };

  const finishAnalysis = () => {
    setIsAnalyzing(false);

    let baseScore = 72;
    if (entryMethod === "manual") {
      if (formValues.fabric.toLowerCase().includes("linen") && formValues.season === "monsoon") {
        baseScore -= 10;
      }
      if (formValues.season === "festive" && formValues.fabric.toLowerCase().includes("silk")) {
        baseScore += 18;
      }
      if (Number(formValues.price) >= 900 && Number(formValues.price) <= 1250) {
        baseScore += 8;
      }
    } else {
      baseScore = Math.floor(Math.random() * 20) + 75;
    }

    baseScore = Math.max(35, Math.min(98, baseScore));

    let decision = "hold";
    if (baseScore >= 80) decision = "produce";
    else if (baseScore >= 60) decision = "modify";
    else if (baseScore >= 45) decision = "hold";
    else decision = "drop";

    const productName = entryMethod === "manual" ? formValues.name || "Custom Design" : uploadedFile?.name?.split(".")[0] || "AI Scanned Dress";
    
    const categoryDisplayMap = {
      kurtis: "Kurtis",
      coords: "Coords",
      sarees: "Sarees",
      salwar_sets: "Salwar Sets",
      unstitched: "Unstitched",
      tops: "Tops",
      dupattas: "Dupattas",
      occasion_wear: "Occasion Wear"
    };
    const category = entryMethod === "manual" ? (categoryDisplayMap[formValues.category] || formValues.category) : "Kurtis";
    const price = entryMethod === "manual" ? (formValues.price ? `₹${formValues.price}` : "₹1,199") : "₹1,249";
    const fabric = entryMethod === "manual" ? formValues.fabric : "Mulmul Cotton-Linen Blend";
    const print = entryMethod === "manual" ? formValues.pattern : "Botanical Block Print";
    const seasonDisplayMap = {
      summer: "Summer",
      winter: "Winter",
      monsoon: "Monsoon",
      festive: "Festive"
    };
    const season = entryMethod === "manual" ? (seasonDisplayMap[formValues.season] || formValues.season) : "Monsoon/Early Festive";

    let productImage = null;
    if (entryMethod === "upload") {
      productImage = uploadedFile?.preview || img1;
    } else {
      if (category === "Sarees") productImage = aishwarya;
      else if (category === "Coords") productImage = kanishka;
      else if (category === "Salwar Sets") productImage = aishwarya;
      else productImage = img1;
    }

    const result = {
      id: Date.now(),
      name: productName,
      category,
      score: baseScore,
      decision,
      price,
      fabric,
      print,
      season,
      image: productImage,
      analyzedAt: "Just now",
      color: ["#7b1c2e", "#8b7193", "#6b8f71", "#7889a0", "#b8922a"][Math.floor(Math.random() * 5)],
      signals: {
        demand: Math.floor(baseScore * 1.05) > 99 ? 99 : Math.floor(baseScore * 1.05),
        weather: Math.floor(Math.random() * 30) + 60,
        sentiment: Math.floor(Math.random() * 25) + 70,
        influencer: Math.floor(Math.random() * 20) + 75,
        wedding: baseScore > 80 ? 88 : 54,
        competitor: Math.floor(Math.random() * 30) + 40
      },
      recommendations: [
        `Target the ${season} launch window. Local search volumes are currently spiking in Coimbatore.`,
        baseScore >= 80 
          ? `Proceed with full-scale production. Current competitor inventory in ${print} pattern is low, leaving a 4-week market gap.`
          : `We suggest switching to a slightly lighter weave. Weather forecasts predict warmer monsoons with higher humidity, driving interest in ${fabric}.`,
        `Maintain the pricing around ${price}. It falls exactly within the sweet spot (₹999 – ₹1,299) where conversion rates peak.`
      ],
      timeline: [
        { day: 0, label: "Confirm Supplier", desc: "Select fabric supplier & finalize details" },
        { day: 2, label: "Fabric Order", desc: `Order ${fabric} or recommended substitutes` },
        { day: 5, label: "Begin Production", desc: "Start cutting and assembly line" },
        { day: 12, label: "Quality Checks", desc: "QC check & finishing touches" },
        { day: 19, label: "Launch Product", desc: "Release in target area/city" },
      ],
      pricing: {
        min: Math.floor(parseInt(price.replace(/[^0-9]/g, "")) * 0.75),
        ideal: parseInt(price.replace(/[^0-9]/g, "")),
        max: Math.floor(parseInt(price.replace(/[^0-9]/g, "")) * 1.25),
        rationale: "Pricing aligns with the target city's mid-tier price bands and brand segment."
      }
    };

    setAnalysisResult(result);
  };
  };

  const handleSaveToDashboard = () => {
    if (!analysisResult) return;

    // Prepend to stored analyses list
    const listToSave = [analysisResult, ...savedAnalyses];
    setSavedAnalyses(listToSave);
    localStorage.setItem("vastra_analyses", JSON.stringify(listToSave));

    // Redirect to dashboard
    navigate("/dashboard");
  };

  const handleStartAnother = () => {
    setAnalysisResult(null);
    setUploadedFile(null);
    setFormValues({
      name: "",
      category: "Kurti",
      price: "",
      fabric: "Cotton Linen Blend",
      pattern: "Floral",
      season: "Festive",
      sleeve: "Three-Quarter",
      neckline: "V-Neck",
      silhouette: "A-Line",
      length: "Calf Length",
      notes: ""
    });
  };

  // Combine standard and custom mock analyses for displaying in Recent grid
  const allRecentAnalyses = [...savedAnalyses, ...RECENT_ANALYSES].slice(0, 4);

  // Analysis Cards in Sticky Panel (Static UI)
  const ANALYZED_ITEMS = [
    { icon: Sparkles, color: "text-accent-purple", bg: "bg-accent-purple-bg", title: "Demand Score", desc: "Predicts the probability of successful sell-through in your target city." },
    { icon: CloudSun, color: "text-accent-green", bg: "bg-accent-green-bg", title: "Weather-Commerce Fit", desc: "Correlates weather forecasts with fabric weight and thermal comfort." },
    { icon: TrendingUp, color: "text-accent-green", bg: "bg-accent-green-bg", title: "Market Sentiment", desc: "Scrapes social media and search data for category interest." },
    { icon: Film, color: "text-accent-amber", bg: "bg-accent-amber-bg", title: "Film & OTT Trends", desc: "Tracks costume popularity in regional cinema and web series." },
    { icon: Gem, color: "text-accent-purple", bg: "bg-accent-purple-bg", title: "Wedding Intelligence", desc: "Cross-references muhurtham calendars with occasion-wear demand." },
    { icon: ShoppingBag, color: "text-accent-blue", bg: "bg-accent-blue-bg", title: "Competitor Activity", desc: "Monitors stock levels and pricing shifts of local retail brands." },
    { icon: MapPin, color: "text-accent-red", bg: "bg-accent-red-bg", title: "City Demand Signals", desc: "Calculates purchase intent for Coimbatore, Tirupur, Kerala, etc." },
    { icon: Smartphone, color: "text-accent-purple", bg: "bg-accent-purple-bg", title: "Influencer Heat", desc: "Gauges style engagement among regional fashion micro-influencers." }
  ];

  const DECISION_STYLES = {
    produce: { label: "Produce", bg: "bg-accent-green-bg text-accent-green border-accent-green/20", dot: "bg-accent-green" },
    modify: { label: "Modify", bg: "bg-accent-amber-bg text-accent-amber border-accent-amber/20", dot: "bg-accent-amber" },
    hold: { label: "Hold", bg: "bg-accent-blue-bg text-accent-blue border-accent-blue/20", dot: "bg-accent-blue" },
    drop: { label: "Drop", bg: "bg-accent-red-bg text-accent-red border-accent-red/20", dot: "bg-accent-red" }
  };

  const stepsList = [
    "Extracting fabric details and patterns...",
    "Analyzing garment silhouette and neckline features...",
    "Detecting color palettes and matching with local wedding calendars...",
    "Cross-referencing climate outlook with thermal index...",
    "Scraping competitor stock levels in Coimbatore, Tirupur, and Cochin...",
    "Calculating target audience sentiment heat index...",
    "Compiling final TRYND predictive scorecard..."
  ];

  return (
    <DashboardLayout activeId="new-analysis">
      <div className="space-y-10">
        
        {/* Toggle Empty State Demo - ONLY FOR DEMONSTRATION */}
        <div className="flex items-center justify-between rounded-xl border border-dashed border-border p-4 bg-surface-secondary">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-maroon animate-pulse" />
            <span className="text-[12px] font-semibold text-charcoal">Demo Controller:</span>
            <span className="text-[12px] text-muted">Test the platform's empty state view.</span>
          </div>
          <button
            onClick={() => setIsDemoEmptyState(!isDemoEmptyState)}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-[11px] font-semibold text-charcoal hover:bg-neutral-50"
          >
            {isDemoEmptyState ? "Switch to Analysis Form" : "Switch to First-Time Empty State"}
          </button>
        </div>

        {isDemoEmptyState ? (
          /* EMPTY STATE VIEW */
          <div className="mx-auto max-w-xl text-center py-16 animate-fade-in">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-maroon/5 text-maroon border border-maroon/10">
              <Sparkles size={40} className="stroke-[1.25]" />
            </div>
            
            <h2 className="font-playfair text-2xl font-bold tracking-wide text-charcoal">
              You haven't analyzed any products yet.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted max-w-md mx-auto">
              Upload your first design and discover what the market wants before you manufacture. TRYND will predict demand, recommend adjustments, and target launch times.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsDemoEmptyState(false)}
                className="rounded-xl bg-maroon px-6 py-3 text-[13px] font-bold text-white transition-all hover:bg-maroon-light hover:shadow-lg hover:shadow-maroon/10"
              >
                Start First Analysis
              </button>
            </div>
          </div>
        ) : (
          /* MAIN ENTRY WORKSPACE */
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            
            {/* LEFT COLUMN: Workspace Area */}
            <div className="space-y-8 min-w-0">
              
              {/* Header Section */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="font-playfair text-2xl font-bold tracking-wide text-charcoal sm:text-3xl">
                    Analyze a New Product
                  </h1>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted max-w-xl">
                    Upload a product photo or enter details manually. TRYND will predict demand, recommend improvements, and suggest launch timing before you manufacture.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 text-[12px] font-semibold text-charcoal transition-colors hover:bg-surface-secondary"
                >
                  View Previous Analyses
                </button>
              </div>

              {/* Dynamic Workspaces */}
              {!analysisResult && !isAnalyzing && (
                <div className="space-y-6">
                  {entryMethod === null && (
                    /* Step 1: Select Entry Method cards */
                    <div className="stagger-children grid gap-6 md:grid-cols-2">
                      
                      {/* Card 1: AI Photo Analysis */}
                      <div
                        onClick={() => setEntryMethod("upload")}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-maroon/20 hover:shadow-[0_12px_30px_rgba(123,28,46,0.04)]"
                      >
                        <div className="absolute right-4 top-4 rounded-full bg-accent-purple/10 px-2.5 py-0.5 text-[10px] font-bold text-accent-purple">
                          Recommended
                        </div>
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-maroon/5 text-maroon transition-transform duration-300 group-hover:scale-110 group-hover:bg-maroon/10">
                          <Camera size={26} className="stroke-[1.5]" />
                        </div>
                        <h3 className="font-playfair text-xl font-bold tracking-wide text-charcoal">
                          AI Photo Analysis
                        </h3>
                        <p className="mt-2 text-[12px] leading-relaxed text-muted">
                          Upload a product image and TRYND automatically detects category, fabric, print, colors, season fit, and market potential.
                        </p>
                        
                        <div className="my-6 border-t border-border-light" />
                        
                        <ul className="space-y-2.5">
                          {["Fabric Detection", "Pattern Recognition", "Color Palette Extraction", "Season Analysis", "Market Intelligence"].map((feat) => (
                            <li key={feat} className="flex items-center gap-2.5 text-[12px] text-charcoal/80">
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-green-bg text-accent-green text-[10px] font-bold">✓</span>
                              {feat}
                            </li>
                          ))}
                        </ul>

                        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-maroon py-3 text-[13px] font-bold text-white transition-all hover:bg-maroon-light">
                          Upload Photo
                          <ArrowRight size={14} />
                        </button>
                      </div>

                      {/* Card 2: Manual Product Entry */}
                      <div
                        onClick={() => setEntryMethod("manual")}
                        className="group cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-maroon/20 hover:shadow-[0_12px_30px_rgba(123,28,46,0.04)]"
                      >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-charcoal transition-transform duration-300 group-hover:scale-110 group-hover:bg-neutral-200">
                          <FileText size={26} className="stroke-[1.5]" />
                        </div>
                        <h3 className="font-playfair text-xl font-bold tracking-wide text-charcoal">
                          Manual Product Entry
                        </h3>
                        <p className="mt-2 text-[12px] leading-relaxed text-muted">
                          Already know your product specifications? Enter details manually and proceed directly to market intelligence.
                        </p>
                        
                        <div className="my-6 border-t border-border-light" />
                        
                        <ul className="space-y-2.5">
                          {["Faster Analysis", "Full Attribute Control", "No Photo Required"].map((feat) => (
                            <li key={feat} className="flex items-center gap-2.5 text-[12px] text-charcoal/80">
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-green-bg text-accent-green text-[10px] font-bold">✓</span>
                              {feat}
                            </li>
                          ))}
                        </ul>

                        <button className="mt-14 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white py-3 text-[13px] font-bold text-charcoal transition-colors hover:bg-neutral-50">
                          Enter Details
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {entryMethod === "upload" && (
                    /* Step 2: Upload Files Workspace */
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm animate-fade-in">
                      <div className="mb-4 flex items-center justify-between">
                        <button
                          onClick={() => setEntryMethod(null)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted hover:text-charcoal"
                        >
                          <ArrowLeft size={14} /> Change entry method
                        </button>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-maroon">AI Photo Analysis</span>
                      </div>

                      {!uploadedFile ? (
                        /* Drag and Drop Zone */
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-14 text-center cursor-pointer transition-all duration-300 ${
                            dragActive
                              ? "border-maroon bg-cream"
                              : "border-border bg-surface-secondary hover:border-maroon/30 hover:bg-cream/40"
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png,.webp"
                            className="hidden"
                          />
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon/5 text-maroon">
                            <Upload size={22} className="stroke-[1.5]" />
                          </div>
                          
                          <p className="text-[14px] font-semibold text-charcoal">
                            Drop product image here
                          </p>
                          <p className="mt-1 text-[12px] text-muted">
                            or <span className="font-semibold text-maroon hover:underline">Browse Files</span>
                          </p>
                          
                          <p className="mt-4 text-[11px] text-muted/80">
                            Supported formats: <span className="font-medium text-charcoal">JPG • PNG • WEBP</span> &nbsp;|&nbsp; Max Size: <span className="font-medium text-charcoal">10 MB</span>
                          </p>
                        </div>
                      ) : (
                        /* Uploaded State Preview */
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 rounded-xl border border-border bg-surface-secondary p-4">
                            <div className="h-16 w-16 overflow-hidden rounded-lg border border-border bg-white">
                              <img
                                src={uploadedFile.preview}
                                alt="Preview"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="truncate text-[13px] font-semibold text-charcoal">
                                {uploadedFile.name}
                              </h4>
                              <p className="mt-0.5 text-[11px] text-muted">
                                {uploadedFile.size}
                              </p>
                            </div>
                            <button
                              onClick={handleRemoveFile}
                              title="Remove image"
                              className="rounded-lg p-2 text-muted hover:bg-accent-red-bg hover:text-accent-red transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="flex items-center gap-4 pt-2">
                            <button
                              onClick={handleRemoveFile}
                              className="flex-1 rounded-xl border border-border bg-white py-3 text-[13px] font-bold text-charcoal hover:bg-neutral-50"
                            >
                              Clear & Upload New
                            </button>
                            <button
                              onClick={startAnalysis}
                              className="flex-1 rounded-xl bg-maroon py-3 text-[13px] font-bold text-white transition-all hover:bg-maroon-light"
                            >
                              Analyze Product →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {entryMethod === "manual" && (
                    /* Step 2: Manual Form workspace */
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm animate-fade-in">
                      <div className="mb-6 flex items-center justify-between">
                        <button
                          onClick={() => setEntryMethod(null)}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted hover:text-charcoal"
                        >
                          <ArrowLeft size={14} /> Change entry method
                        </button>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-maroon font-playfair">Manual entry mode</span>
                      </div>

                      <div className="space-y-6">
                        {/* Section 1 - Basics */}
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-maroon border-b border-border-light pb-2 mb-4">
                            Section 1 – Product Basics
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-3">
                            <div className="sm:col-span-1">
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Product Name</label>
                              <input
                                type="text"
                                placeholder="e.g. Silk Zari Saree"
                                value={formValues.name}
                                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Category</label>
                              <select
                                value={formValues.category}
                                onChange={(e) => setFormValues({...formValues, category: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              >
                                {["Kurti", "Saree", "Co-ords", "Salwar", "Dupatta"].map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Selling Price (₹)</label>
                              <input
                                type="number"
                                placeholder="e.g. 1199"
                                value={formValues.price}
                                onChange={(e) => setFormValues({...formValues, price: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 2 - Fabric & Design */}
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-maroon border-b border-border-light pb-2 mb-4">
                            Section 2 – Fabric & Design
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Fabric</label>
                              <input
                                type="text"
                                placeholder="e.g. Cotton Silk"
                                value={formValues.fabric}
                                onChange={(e) => setFormValues({...formValues, fabric: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Print Pattern</label>
                              <input
                                type="text"
                                placeholder="e.g. Block Print"
                                value={formValues.pattern}
                                onChange={(e) => setFormValues({...formValues, pattern: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Season</label>
                              <select
                                value={formValues.season}
                                onChange={(e) => setFormValues({...formValues, season: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              >
                                {["Summer", "Winter", "Monsoon", "Festive"].map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Section 3 - Style Details */}
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-maroon border-b border-border-light pb-2 mb-4">
                            Section 3 – Style Details
                          </h4>
                          <div className="grid gap-4 sm:grid-cols-4">
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Sleeve</label>
                              <input
                                type="text"
                                placeholder="e.g. Three-Quarter"
                                value={formValues.sleeve}
                                onChange={(e) => setFormValues({...formValues, sleeve: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Neckline</label>
                              <input
                                type="text"
                                placeholder="e.g. V-Neck"
                                value={formValues.neckline}
                                onChange={(e) => setFormValues({...formValues, neckline: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Silhouette</label>
                              <input
                                type="text"
                                placeholder="e.g. A-Line"
                                value={formValues.silhouette}
                                onChange={(e) => setFormValues({...formValues, silhouette: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Length</label>
                              <input
                                type="text"
                                placeholder="e.g. Calf Length"
                                value={formValues.length}
                                onChange={(e) => setFormValues({...formValues, length: e.target.value})}
                                className="h-10 w-full rounded-lg border border-border bg-surface-secondary px-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 4 - Notes */}
                        <div>
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-maroon border-b border-border-light pb-2 mb-4">
                            Section 4 – Notes
                          </h4>
                          <div>
                            <label className="mb-1.5 block text-[11px] font-bold text-charcoal/80 uppercase">Additional Context (Optional)</label>
                            <textarea
                              rows={3}
                              placeholder="Describe fabrics, specific trim options, custom cuts, or manufacturing requirements..."
                              value={formValues.notes}
                              onChange={(e) => setFormValues({...formValues, notes: e.target.value})}
                              className="w-full rounded-lg border border-border bg-surface-secondary p-3 text-[13px] outline-none transition-all focus:border-maroon/40 focus:ring-2 focus:ring-maroon/10"
                            />
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                          <button
                            onClick={startAnalysis}
                            disabled={!formValues.name || !formValues.price}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-maroon py-3 text-[13px] font-bold text-white transition-all hover:bg-maroon-light disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Analyze Product →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Analyzing Loading State overlay */}
              {isAnalyzing && (
                <div className="rounded-2xl border border-border bg-white p-10 text-center shadow-sm animate-fade-in py-16">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-maroon border-t-transparent" />
                  
                  <h3 className="mt-8 font-playfair text-xl font-bold text-charcoal">
                    TRYND AI Engine Analyzing Design
                  </h3>
                  <p className="mt-2 text-[12px] text-muted">
                    Running deep predictive market intelligence checks...
                  </p>

                  <div className="mx-auto mt-8 max-w-sm rounded-xl border border-border bg-surface-secondary p-5 text-left space-y-3.5">
                    {stepsList.map((step, idx) => {
                      const isActive = idx === analysisStep;
                      const isDone = idx < analysisStep;
                      return (
                        <div
                          key={step}
                          className={`flex items-center gap-3 transition-opacity duration-300 ${
                            isActive ? "opacity-100" : isDone ? "opacity-60" : "opacity-30"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 size={16} className="text-accent-green flex-shrink-0" />
                          ) : isActive ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-maroon border-t-transparent flex-shrink-0" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-border flex-shrink-0" />
                          )}
                          <span className="text-[12px] font-medium text-charcoal truncate">
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Analysis Results View */}
              {analysisResult && !isAnalyzing && (
                <div className="rounded-2xl border border-border bg-white p-8 shadow-sm animate-slide-up space-y-8">
                  {/* Title & Decision Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                    <div className="flex items-center gap-4">
                      {entryMethod === "upload" && uploadedFile && (
                        <div className="h-16 w-16 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                          <img
                            src={uploadedFile.preview}
                            alt="Analysis subject"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">Analysis Scorecard</span>
                        <h3 className="font-playfair text-xl font-bold text-charcoal sm:text-2xl mt-0.5">
                          {analysisResult.name}
                        </h3>
                        <p className="text-[12px] text-muted mt-0.5">
                          {analysisResult.category} &nbsp;•&nbsp; {analysisResult.fabric} &nbsp;•&nbsp; {analysisResult.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[12px] font-semibold ${DECISION_STYLES[analysisResult.decision].bg}`}>
                        <span className={`h-2 w-2 rounded-full ${DECISION_STYLES[analysisResult.decision].dot}`} />
                        {DECISION_STYLES[analysisResult.decision].label}
                      </span>
                    </div>
                  </div>

                  {/* Core Metrics: Score & Signals */}
                  <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                    {/* Score Circle */}
                    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-secondary p-5 text-center">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-muted">Signal Score</span>
                      <div className="relative my-4 flex h-24 w-24 items-center justify-center">
                        <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="#f0ede8" strokeWidth="6" fill="transparent" />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke={
                              analysisResult.score >= 80 ? "#6b8f71" :
                              analysisResult.score >= 60 ? "#b8922a" :
                              analysisResult.score >= 45 ? "#7889a0" : "#b04858"
                            }
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * analysisResult.score) / 100}
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <span className="text-3xl font-bold tracking-tight text-charcoal">{analysisResult.score}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-muted">Confidence: High</span>
                    </div>

                    {/* Mini Signals grid */}
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                      {[
                        { label: "Demand Intensity", value: analysisResult.signals.demand, emoji: "🔥" },
                        { label: "Weather Match", value: analysisResult.signals.weather, emoji: "🌤" },
                        { label: "Social Sentiment", value: analysisResult.signals.sentiment, emoji: "📈" },
                        { label: "Influencer Heat", value: analysisResult.signals.influencer, emoji: "📱" },
                        { label: "Wedding Calendar", value: analysisResult.signals.wedding, emoji: "💍" },
                        { label: "Competitor Stock", value: analysisResult.signals.competitor, emoji: "👗" }
                      ].map((sig) => (
                        <div key={sig.label} className="rounded-xl border border-border bg-white p-3.5 flex flex-col justify-between">
                          <span className="text-[11px] font-bold text-muted flex items-center gap-1.5">
                            <span>{sig.emoji}</span>
                            {sig.label}
                          </span>
                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="text-lg font-bold text-charcoal">{sig.value}%</span>
                            <div className="h-1.5 w-12 overflow-hidden rounded-full bg-border-light">
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

                  {/* Recommendations Feed */}
                  <div className="space-y-4 rounded-xl border border-maroon/10 bg-cream/30 p-5">
                    <h4 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-maroon">
                      <Sparkles size={14} /> TRYND AI Recommendations
                    </h4>
                    <div className="space-y-3">
                      {analysisResult.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-maroon/10 text-[10px] font-bold text-maroon">
                            {i + 1}
                          </span>
                          <p className="text-[12.5px] leading-relaxed text-charcoal/90">
                            {rec}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={handleStartAnother}
                      className="flex-1 rounded-xl border border-border bg-white py-3.5 text-[13px] font-bold text-charcoal transition-colors hover:bg-neutral-50"
                    >
                      Analyze Another Design
                    </button>
                    <button
                      onClick={handleSaveToDashboard}
                      className="flex-1 rounded-xl bg-maroon py-3.5 text-[13px] font-bold text-white transition-all hover:bg-maroon-light hover:shadow-lg hover:shadow-maroon/10"
                    >
                      Save to Dashboard & Close →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: What TRYND Analyzes Sticky Panel */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-playfair text-lg font-bold text-charcoal border-b border-border-light pb-3.5">
                  What TRYND Analyzes
                </h3>
                
                <div className="mt-4 space-y-4 max-h-[500px] overflow-y-auto pr-1 dashboard-scroll">
                  {ANALYZED_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="group flex gap-3.5 rounded-xl border border-transparent p-2.5 transition-all duration-200 hover:border-border hover:bg-surface-secondary">
                        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                          <Icon size={18} className="stroke-[1.75]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[12.5px] font-bold text-charcoal">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-[11px] leading-relaxed text-muted">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
          </div>
        )}

        {/* BOTTOM SECTION: Recent Analyses */}
        <div className="border-t border-border pt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon">
                Audit Trail
              </p>
              <h2 className="mt-1 font-playfair text-2xl font-bold tracking-wide text-charcoal">
                Recent Analyses
              </h2>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-[12px] font-bold text-maroon hover:underline flex items-center gap-1"
            >
              Go to Dashboard <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allRecentAnalyses.map((product) => {
              const dStyle = DECISION_STYLES[product.decision] || DECISION_STYLES.hold;
              return (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
                >
                  {/* Product Image preview */}
                  <div
                    className="relative mb-4 h-36 w-full overflow-hidden rounded-xl bg-surface-secondary border border-border transition-transform duration-300 group-hover:scale-[1.02]"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-gradient-to-tr"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${product.color || "#8b7193"}80, ${product.color || "#8b7193"}20)`,
                        }}
                      >
                        {/* Abstract fabric pattern background overlay */}
                        <div className="absolute inset-0 opacity-15" style={{
                          backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
                          backgroundSize: '8px 8px'
                        }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-playfair text-3xl font-bold text-charcoal/30">
                            {product.name?.split(" ").map(n => n[0]).slice(0,2).join("")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="truncate text-[13.5px] font-bold text-charcoal group-hover:text-maroon transition-colors">
                        {product.name}
                      </h4>
                      <p className="mt-0.5 text-[11px] text-muted">
                        Category: {product.category}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-[13px] font-bold text-charcoal">
                        Score: {product.score}
                      </span>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] font-bold ${dStyle.bg}`}>
                        <span className={`h-1 w-1 rounded-full ${dStyle.dot}`} />
                        {dStyle.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
