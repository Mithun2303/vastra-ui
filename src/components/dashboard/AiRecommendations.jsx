import { Sparkles, ArrowRight } from "lucide-react";
import { AI_RECOMMENDATIONS } from "@/lib/dashboardData";

const TYPE_STYLES = {
  material: { accent: "#8b7193", label: "Material" },
  timing: { accent: "#6b8f71", label: "Timing" },
  opportunity: { accent: "#7b1c2e", label: "Opportunity" },
  pricing: { accent: "#b8922a", label: "Pricing" },
};

export default function AiRecommendations() {
  return (
    <div className="animate-fade-in rounded-2xl border border-border bg-surface p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-maroon/5">
            <Sparkles size={16} className="text-maroon" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal">
              AI Recommendations
            </h3>
            <p className="text-[11px] text-muted">
              Personalized insights based on your market
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-[12px] font-semibold text-maroon hover:underline">
          View all <ArrowRight size={13} />
        </button>
      </div>

      <div className="space-y-3">
        {AI_RECOMMENDATIONS.map((rec) => {
          const typeStyle = TYPE_STYLES[rec.type] || TYPE_STYLES.material;

          return (
            <div
              key={rec.id}
              className="group flex gap-4 rounded-xl border border-border-light p-4 transition-all duration-300 hover:border-border hover:bg-surface-secondary"
              style={{ borderLeftWidth: 3, borderLeftColor: typeStyle.accent }}
            >
              <div className="flex-1">
                <p className="text-[13px] leading-relaxed text-charcoal">
                  {rec.text}
                </p>
                <div className="mt-2.5 flex items-center gap-3">
                  <span
                    className="rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: typeStyle.accent }}
                  >
                    {typeStyle.label}
                  </span>
                  <span className="text-[11px] text-muted">{rec.time}</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-xl font-bold text-charcoal">
                  {rec.confidence}%
                </span>
                <span className="text-[9px] font-medium uppercase tracking-wider text-muted">
                  Confidence
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
