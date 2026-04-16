import { ShieldCheck, Lock, Globe } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      text: "SOC 2 Type II Compliant",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "GDPR Ready",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      text: "Sovereign Vault Encryption",
    },
  ];

  return (
    <div className="py-12 bg-transparent">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 text-cyan-300/70">
              <div className="flex-shrink-0">
                {badge.icon}
              </div>
              <span className="text-sm font-medium tracking-wider">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
