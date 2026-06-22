import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, ArrowRight } from "lucide-react";

export default function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-16">
      <div className="mx-auto max-w-lg text-center">
        {/* Decorative illustration */}
        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-border animate-[spin_20s_linear_infinite]" />
          {/* Middle ring */}
          <div className="absolute inset-4 rounded-full border border-maroon/10" />
          {/* Inner content */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-maroon/5">
            <Sparkles size={32} className="text-maroon" />
          </div>
          {/* Floating dots */}
          <div className="absolute -right-1 top-6 h-3 w-3 rounded-full bg-accent-green/40 animate-pulse-dot" />
          <div className="absolute bottom-4 -left-2 h-2.5 w-2.5 rounded-full bg-accent-amber/40 animate-pulse-dot" style={{ animationDelay: "0.5s" }} />
          <div className="absolute right-4 bottom-0 h-2 w-2 rounded-full bg-accent-blue/40 animate-pulse-dot" style={{ animationDelay: "1s" }} />
        </div>

        {/* Headline */}
        <h3 className="font-playfair text-2xl font-bold text-charcoal md:text-3xl">
          Upload your first product
        </h3>

        <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
          Let TRYND predict what will sell before you manufacture. Our AI
          analyzes demand signals, competitor data, and market trends to give you
          a clear produce-or-drop decision.
        </p>

        {/* Divider */}
        <div className="mx-auto my-8 flex w-48 items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">✦</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/onboarding")}
            className="group flex items-center gap-2 rounded-xl bg-maroon px-6 py-3 text-[13px] font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-maroon/15"
          >
            <Sparkles size={15} />
            Analyze Your First Product
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-[13px] font-semibold text-charcoal transition-all hover:border-charcoal/30 hover:bg-surface-secondary">
            <FileText size={15} />
            Manual Entry
          </button>
        </div>

        <p className="mt-6 text-[11px] text-muted/60">
          Takes less than 2 minutes · No credit card required
        </p>
      </div>
    </div>
  );
}
