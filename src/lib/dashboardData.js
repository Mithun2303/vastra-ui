export const KPI_DATA = [
  {
    id: "products-analyzed",
    label: "Total Products Analyzed",
    value: 18,
    trend: "+12% this month",
    trendUp: true,
    icon: "tag",
    color: "purple",
  },
  {
    id: "pending-decisions",
    label: "Pending Decisions",
    value: 4,
    trend: "2 require attention",
    trendUp: null,
    icon: "alert-circle",
    color: "amber",
  },
  {
    id: "recommended-modify",
    label: "Recommended to Modify",
    value: 6,
    trend: "Weather mismatch detected",
    trendUp: false,
    icon: "edit-3",
    color: "blue",
  },
  {
    id: "recommended-launch",
    label: "Recommended to Launch",
    value: 3,
    trend: "High confidence",
    trendUp: true,
    icon: "rocket",
    color: "green",
  },
];

export const MARKET_PULSE = {
  score: 68,
  signals: [
    { label: "Demand Trend", value: 74, direction: "up", color: "green" },
    { label: "Influencer Heat", value: 81, direction: "up", color: "green" },
    { label: "Competition", value: 55, direction: "neutral", color: "amber" },
    { label: "Weather Caution", value: 42, direction: "down", color: "red" },
  ],
  cities: ["Tirupur", "Coimbatore", "Erode", "Madurai", "Kerala"],
};

import img1 from "@/assets/dress-1.jpg";
import aishwarya from "@/assets/dress-2.jpg";
import kanishka from "@/assets/dress-3.jpg";

export const RECENT_ANALYSES = [
  {
    id: 1,
    name: "Block Print A-Line Kurti",
    category: "Kurti",
    score: 74,
    decision: "modify",
    analyzedAt: "2 hours ago",
    color: "#8b7193",
    image: img1,
  },
  {
    id: 2,
    name: "Cotton Linen Coord Set",
    category: "Coords",
    score: 89,
    decision: "produce",
    analyzedAt: "5 hours ago",
    color: "#6b8f71",
    image: kanishka,
  },
  {
    id: 3,
    name: "Embroidered Salwar Set",
    category: "Salwar",
    score: 62,
    decision: "hold",
    analyzedAt: "1 day ago",
    color: "#7889a0",
    image: aishwarya,
  },
  {
    id: 4,
    name: "Floral Dupatta Collection",
    category: "Dupatta",
    score: 34,
    decision: "drop",
    analyzedAt: "1 day ago",
    color: "#b8922a",
    image: img1,
  },
  {
    id: 5,
    name: "Occasion Wear Saree",
    category: "Saree",
    score: 91,
    decision: "produce",
    analyzedAt: "2 days ago",
    color: "#7b1c2e",
    image: aishwarya,
  },
];

export const QUICK_ACTIONS = [
  {
    id: "new-analysis",
    label: "New Product Analysis",
    desc: "Upload and get AI-powered insights",
    icon: "sparkles",
    color: "#7b1c2e",
  },
  {
    id: "upload-photo",
    label: "Upload Product Photo",
    desc: "AI detects product attributes",
    icon: "camera",
    color: "#8b7193",
  },
  {
    id: "manual-entry",
    label: "Manual Product Entry",
    desc: "Enter product details yourself",
    icon: "file-text",
    color: "#6b8f71",
  },
  {
    id: "city-trends",
    label: "View City Trends",
    desc: "Market intelligence by city",
    icon: "map-pin",
    color: "#7889a0",
  },
];

export const SIGNAL_HIGHLIGHTS = [
  { id: 1, label: "Demand Score", score: 74, status: "High", color: "green", sparkline: [40, 55, 48, 62, 58, 74] },
  { id: 2, label: "Competition Score", score: 55, status: "Moderate", color: "amber", sparkline: [60, 52, 58, 50, 55, 55] },
  { id: 3, label: "Weather Commerce", score: 42, status: "Caution", color: "red", sparkline: [70, 65, 55, 48, 44, 42] },
  { id: 4, label: "Wedding Intelligence", score: 83, status: "Peak Season", color: "green", sparkline: [50, 60, 68, 75, 80, 83] },
  { id: 5, label: "Film & OTT", score: 61, status: "Active", color: "amber", sparkline: [30, 45, 55, 50, 58, 61] },
  { id: 6, label: "Competitor Stock", score: 38, status: "Low", color: "green", sparkline: [55, 48, 42, 40, 39, 38] },
  { id: 7, label: "College Calendar", score: 72, status: "Re-opening", color: "green", sparkline: [40, 45, 55, 60, 68, 72] },
  { id: 8, label: "Influencer Heat", score: 81, status: "Trending", color: "green", sparkline: [55, 60, 65, 72, 78, 81] },
  { id: 9, label: "Climate Mood", score: 47, status: "Monsoon", color: "amber", sparkline: [65, 58, 52, 50, 48, 47] },
  { id: 10, label: "Market Sentiment", score: 68, status: "Positive", color: "green", sparkline: [50, 55, 58, 62, 65, 68] },
];

export const AI_RECOMMENDATIONS = [
  {
    id: 1,
    text: "Switch cotton knit to cotton-linen blend for Coimbatore market. Linen demand is up 34% this quarter.",
    confidence: 92,
    type: "material",
    time: "2 hours ago",
  },
  {
    id: 2,
    text: "Launch before July 5 for maximum demand. Wedding season peaks in your price segment ₹800–₹1200.",
    confidence: 87,
    type: "timing",
    time: "4 hours ago",
  },
  {
    id: 3,
    text: "Current competitor inventory appears low in block-print kurtis. Window of opportunity: ~3 weeks.",
    confidence: 78,
    type: "opportunity",
    time: "6 hours ago",
  },
  {
    id: 4,
    text: "Reduce embroidery density by 20% to hit the ₹999 sweet spot. Current cost structure pushes to ₹1299.",
    confidence: 85,
    type: "pricing",
    time: "1 day ago",
  },
];

export const PRODUCTION_TIMELINE = [
  { day: 0, label: "Supplier Confirmation", status: "completed", desc: "Raw material suppliers confirmed" },
  { day: 2, label: "Fabric Order", status: "completed", desc: "Cotton-linen blend, 500 meters" },
  { day: 5, label: "Production Start", status: "active", desc: "Cutting & stitching begins" },
  { day: 12, label: "Quality Check", status: "upcoming", desc: "QC sampling & adjustments" },
  { day: 19, label: "Launch", status: "upcoming", desc: "Market release & distribution" },
];

export const PRICING_DATA = {
  recommended: { min: 899, ideal: 1199, max: 1499 },
  comparison: [
    { label: "Your Brand", value: 1099, color: "#7b1c2e" },
    { label: "Competitors", value: 1249, color: "#6b6157" },
    { label: "Market Average", value: 1149, color: "#b8922a" },
  ],
};

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "new-analysis", label: "New Analysis", icon: "sparkles" },
  { id: "products", label: "Products", icon: "shopping-bag" },
  { id: "signals", label: "Signals", icon: "activity" },
  { id: "recommendations", label: "Recommendations", icon: "lightbulb" },
  { id: "production", label: "Production Plans", icon: "calendar" },
  { id: "pricing", label: "Pricing Intelligence", icon: "indian-rupee" },
  { id: "cities", label: "City Insights", icon: "map-pin" },
  { id: "settings", label: "Settings", icon: "settings" },
];
