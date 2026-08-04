import { ShieldCheck, Lock, Globe, UserCheck } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#1ABC9C]" />,
      text: "DMARC p=reject",
    },
    {
      icon: <Globe className="h-5 w-5 text-[#1ABC9C]" />,
      text: "SPF -all Enforced",
    },
    {
      icon: <Lock className="h-5 w-5 text-[#1ABC9C]" />,
      text: "CSRF & CAPTCHA Hardened",
    },
    {
      icon: <UserCheck className="h-5 w-5 text-[#1ABC9C]" />,
      text: "Quarterly Social Engineering Training",
    },
  ];

  return (
    <div className="bg-[#0B1B2B] py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[#94A3B8]"
            >
              {badge.icon}
              <span className="text-xs font-medium sm:text-sm">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
