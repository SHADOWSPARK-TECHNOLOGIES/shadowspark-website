const problemStats = [
  { value: "Manual", label: "Spreadsheet handoffs" },
  { value: "Repeated", label: "Document follow-up" },
  { value: "Disconnected", label: "Customer conversations" },
  { value: "Review-heavy", label: "Compliance evidence" },
];

export function Problem() {
  return (
    <section id="problem" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Why Now?
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Common Workflow Bottlenecks
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
            The pilot program focuses on workflows where spreadsheets, chat threads,
            document checks, and payment follow-up create repeated manual handoffs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problemStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-center transition-colors hover:border-slate-600 hover:bg-slate-800"
            >
              <div className="text-4xl font-black text-amber-500 sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-3 text-sm font-semibold text-slate-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
