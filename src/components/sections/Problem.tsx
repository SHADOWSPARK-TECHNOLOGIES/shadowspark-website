const problemStats = [
  { value: "$32.2B", label: "MSME finance gap in Nigeria", source: "Ken Research 2026" },
  { value: "14 days", label: "Average manual loan processing time" },
  { value: "40%", label: "Application abandonment rate from slow response" },
  { value: "₦10M+", label: "Maximum NDPA non-compliance penalty", source: "ICLG 2026" },
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
            The $32.2 Billion Problem
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
            Nigerian microfinance banks still process loans on spreadsheets and WhatsApp
            chats. Loan officers manually verify identities, chase documents, and send
            payment reminders one by one. The result: 14-day approval cycles, 40%
            application drop-off, and compliance nightmares.
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
              {stat.source && (
                <div className="mt-1 text-xs text-slate-500">{stat.source}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
