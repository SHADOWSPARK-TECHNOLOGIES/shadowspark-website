"use client";

import { useCalendly } from "@/components/calendly-modal";
import { cn } from "@/lib/utils";

type BookDemoButtonProps = {
  children: React.ReactNode;
  location: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
};

const CALENDLY_HREF =
  "https://calendly.com/wonderstevie702/30min?utm_source=shadowspark&utm_medium=website&utm_campaign=enterprise";

export function BookDemoButton({
  children,
  location,
  className,
  variant = "primary",
  href = CALENDLY_HREF,
  onClick,
}: BookDemoButtonProps) {
  const { openCalendly } = useCalendly();

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-bold transition-colors";

  const variantStyles = {
    primary:
      "rounded-xl bg-amber-500 px-8 py-4 text-sm text-slate-950 hover:bg-amber-400",
    secondary:
      "rounded-xl border border-slate-700 bg-transparent px-8 py-4 text-sm text-slate-100 hover:border-slate-500 hover:bg-slate-900",
    ghost:
      "rounded-lg border border-slate-700 bg-transparent px-6 py-3 text-sm text-slate-100 hover:border-slate-500 hover:bg-slate-800",
  };

  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
        openCalendly(location);
      }}
      className={cn(baseStyles, variantStyles[variant], className)}
      data-event="calendly_open"
      data-location={location}
    >
      {children}
    </a>
  );
}
