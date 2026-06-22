import { Sparkles, Camera, FileText, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QUICK_ACTIONS } from "@/lib/dashboardData";

const ICON_MAP = {
  sparkles: Sparkles,
  camera: Camera,
  "file-text": FileText,
  "map-pin": MapPin,
};

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-maroon">
        Quick Actions
      </p>

      <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_ACTIONS.map((action) => {
          const Icon = ICON_MAP[action.icon] || Sparkles;

          return (
            <button
              key={action.id}
              onClick={() => {
                if (action.id === "new-analysis") {
                  navigate("/analysis");
                } else if (action.id === "upload-photo") {
                  navigate("/analysis", { state: { method: "upload" } });
                } else if (action.id === "manual-entry") {
                  navigate("/analysis", { state: { method: "manual" } });
                } else {
                  navigate("/dashboard");
                }
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${action.color}08, ${action.color}04)`,
                }}
              />

              <div className="relative">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${action.color}10` }}
                >
                  <Icon size={20} style={{ color: action.color }} />
                </div>

                <h4 className="text-[14px] font-semibold text-charcoal">
                  {action.label}
                </h4>
                <p className="mt-1 text-[12px] text-muted">{action.desc}</p>

                <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold transition-all group-hover:gap-2" style={{ color: action.color }}>
                  Get started
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
