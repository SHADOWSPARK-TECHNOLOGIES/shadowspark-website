import { Lock, Database, FileCheck, Server, ClipboardList, Activity } from "lucide-react";

const badges = [
  { icon: Lock, label: "TLS 1.3 Encrypted" },
  { icon: Database, label: "AES-256 at Rest" },
  { icon: FileCheck, label: "NDPA Aligned" },
  { icon: Server, label: "Isolated Environments" },
  { icon: ClipboardList, label: "Full Audit Logging" },
  { icon: Activity, label: "99.9% Uptime Target" },
];

export function TrustCompliance() {
  return (
    <section id="compliance" className="bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Security & Compliance
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Bank-Grade Security. African Compliance.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-900 p-5"
            >
              <div className="rounded-lg bg-emerald-500/10 p-2.5">
                <badge.icon className="h-5 w-5 text-emerald-500" />
              </div>
              <span className="text-sm font-semibold text-slate-200">{badge.label}</span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-400">
          ShadowSpark is designed in alignment with Nigeria&apos;s National Data Protection
          Regulation (NDPA). We do not sell, share, or use your customer data for any
          purpose outside your service agreement. Data Processing Addendums available on
          request.
        </p>
      </div>
    </section>
  );
}
