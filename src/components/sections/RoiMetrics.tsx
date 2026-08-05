type Metric = {
  value: string;
  label: string;
  source: string;
};

const metrics: Metric[] = [
  {
    value: "41.2%",
    label: "Instant Deflection",
    source: "Zendesk CX Trends 2026",
  },
  {
    value: "60%",
    label: "Faster Processing",
    source: "Modeled production workflows",
  },
  {
    value: "$3.50",
    label: "Average ROI per $1 Invested",
    source: "Freshworks Research",
  },
];

export function RoiMetrics() {
  return (
    <section id="roi" className="border-y border-slate-800 bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            The Enterprise Math
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Why lenders choose ShadowSpark
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col rounded-xl border border-slate-700 bg-slate-900 p-6 text-center"
            >
              <div className="text-4xl font-black text-amber-500 sm:text-5xl">
                {metric.value}
              </div>
              <div className="mt-3 text-base font-semibold text-slate-100">
                {metric.label}
              </div>
              <div className="mt-2 text-xs text-slate-500">{metric.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
