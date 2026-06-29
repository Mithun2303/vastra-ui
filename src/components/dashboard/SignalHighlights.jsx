import { SIGNAL_HIGHLIGHTS } from "@/lib/dashboardData";

function Sparkline({ data, color }) {
  const h = 24;
  const w = 60;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const colorMap = {
    green: "#6b8f71",
    amber: "#b8922a",
    red: "#b04858",
  };
  const strokeColor = colorMap[color] || colorMap.green;

  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STATUS_STYLES = {
  green: {
    dot: "bg-accent-green",
    text: "text-accent-green",
    bg: "bg-accent-green/5",
  },
  amber: {
    dot: "bg-accent-amber",
    text: "text-accent-amber",
    bg: "bg-accent-amber/5",
  },
  red: {
    dot: "bg-accent-red",
    text: "text-accent-red",
    bg: "bg-accent-red/5",
  },
};

export default function SignalHighlights() {
  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon">
            Live Intelligence
          </p>
          <h3 className="mt-1 text-lg font-semibold text-charcoal">
            Signal Highlights
          </h3>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse-dot" />
          Live · Updated 5m ago
        </span>
      </div>

      <div className="stagger-children grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {SIGNAL_HIGHLIGHTS.map((signal) => {
          const styles = STATUS_STYLES[signal.color] || STATUS_STYLES.green;

          return (
            <div
              key={signal.id}
              className="group rounded-xl border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="mb-3 flex items-start justify-between gap-1.5">
                <p className="text-[11px] font-medium text-muted leading-tight min-w-0 flex-1">
                  {signal.label}
                </p>
                <Sparkline data={signal.sparkline} color={signal.color} />
              </div>

              <p className="text-2xl font-bold tracking-tight text-charcoal">
                {signal.score}
              </p>

              <div className="mt-2 flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                <span className={`text-[10px] font-semibold ${styles.text}`}>
                  {signal.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
