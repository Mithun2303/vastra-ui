import {
  Tag, AlertCircle, Edit3, Rocket,
  TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import { KPI_DATA } from "@/lib/dashboardData";

const ICON_MAP = {
  tag: Tag,
  "alert-circle": AlertCircle,
  "edit-3": Edit3,
  rocket: Rocket,
};

const COLOR_MAP = {
  green: {
    bg: "bg-accent-green-bg",
    icon: "text-accent-green",
    trend: "text-accent-green",
  },
  amber: {
    bg: "bg-accent-amber-bg",
    icon: "text-accent-amber",
    trend: "text-accent-amber",
  },
  blue: {
    bg: "bg-accent-blue-bg",
    icon: "text-accent-blue",
    trend: "text-accent-blue",
  },
  purple: {
    bg: "bg-accent-purple-bg",
    icon: "text-accent-purple",
    trend: "text-accent-purple",
  },
  red: {
    bg: "bg-accent-red-bg",
    icon: "text-accent-red",
    trend: "text-accent-red",
  },
};

const ACCENT_VARS = {
  green: "var(--color-accent-green)",
  amber: "var(--color-accent-amber)",
  blue: "var(--color-accent-blue)",
  purple: "var(--color-accent-purple)",
  red: "var(--color-accent-red)",
};

export default function KpiCards() {
  return (
    <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {KPI_DATA.map((kpi) => {
        const Icon = ICON_MAP[kpi.icon] || Tag;
        const colors = COLOR_MAP[kpi.color] || COLOR_MAP.green;

        return (
          <div
            key={kpi.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-light hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
            >
              <Icon size={18} className={colors.icon} />
            </div>

            <p className="text-3xl font-bold tracking-tight text-charcoal">
              {kpi.value}
            </p>

            <p className="mt-1 text-[13px] font-medium text-muted">
              {kpi.label}
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              {kpi.trendUp === true && (
                <TrendingUp size={13} className={colors.trend} />
              )}
              {kpi.trendUp === false && (
                <TrendingDown size={13} className="text-accent-red" />
              )}
              {kpi.trendUp === null && (
                <Minus size={13} className={colors.trend} />
              )}
              <span className={`text-[11px] font-medium ${colors.trend}`}>
                {kpi.trend}
              </span>
            </div>

            <div
              className="absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-[0.06] transition-opacity group-hover:opacity-[0.1]"
              style={{ background: ACCENT_VARS[kpi.color] || ACCENT_VARS.green }}
            />
          </div>
        );
      })}
    </div>
  );
}
