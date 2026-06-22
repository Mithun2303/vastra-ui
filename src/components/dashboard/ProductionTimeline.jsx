import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { PRODUCTION_TIMELINE } from "@/lib/dashboardData";

const STATUS_CONFIG = {
  completed: {
    icon: CheckCircle2,
    dot: "bg-accent-green border-accent-green",
    line: "bg-accent-green",
    text: "text-charcoal",
    badge: "bg-accent-green-bg text-accent-green",
    label: "Completed",
  },
  active: {
    icon: Loader2,
    dot: "bg-maroon border-maroon",
    line: "bg-border",
    text: "text-charcoal",
    badge: "bg-maroon/10 text-maroon",
    label: "In Progress",
  },
  upcoming: {
    icon: Circle,
    dot: "bg-surface border-border",
    line: "bg-border-light",
    text: "text-muted",
    badge: "bg-surface-secondary text-muted",
    label: "Upcoming",
  },
};

export default function ProductionTimeline() {
  return (
    <div className="animate-fade-in rounded-2xl border border-border bg-surface p-8">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon">
          Production Tracker
        </p>
        <h3 className="mt-1 text-lg font-semibold text-charcoal">
          Upcoming Production Plan
        </h3>
      </div>

      <div className="relative">
        {PRODUCTION_TIMELINE.map((step, i) => {
          const config = STATUS_CONFIG[step.status];
          const isLast = i === PRODUCTION_TIMELINE.length - 1;

          return (
            <div key={step.day} className="flex gap-4">
              {/* Timeline column */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${config.dot} transition-all`}
                >
                  {step.status === "completed" && (
                    <CheckCircle2 size={14} className="text-white" />
                  )}
                  {step.status === "active" && (
                    <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse-dot" />
                  )}
                  {step.status === "upcoming" && (
                    <div className="h-2 w-2 rounded-full bg-border" />
                  )}
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div className={`w-0.5 flex-1 ${config.line}`} />
                )}
              </div>

              {/* Content */}
              <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Day {step.day}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${config.badge}`}>
                    {config.label}
                  </span>
                </div>
                <h4 className={`mt-1 text-[14px] font-semibold ${config.text}`}>
                  {step.label}
                </h4>
                <p className="mt-0.5 text-[12px] text-muted">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
