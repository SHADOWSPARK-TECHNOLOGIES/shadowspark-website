"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Zap } from "lucide-react";

import {
  handleNavigationEscape,
  navigationLinks,
  nextNavigationMenuState,
} from "@/lib/navigation";

/** Renders the corporate navigation and its keyboard-operable disclosure. */
export function Navigation() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      handleNavigationEscape(
        event.key,
        () => setOpen(false),
        menuButtonRef.current,
      );
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Zap aria-hidden="true" className="h-5 w-5" fill="currentColor" />
          </span>
          <span className="text-lg font-bold tracking-tight">ShadowSpark</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded text-sm font-medium text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/#solutions"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
          >
            Explore systems
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() =>
            setOpen((current) => nextNavigationMenuState(current, "toggle"))
          }
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-mobile-navigation"
        >
          {open ? (
            <X aria-hidden="true" className="h-6 w-6" />
          ) : (
            <Menu aria-hidden="true" className="h-6 w-6" />
          )}
        </button>
      </div>

      {open && (
        <div
          id="primary-mobile-navigation"
          className="border-t border-slate-800 bg-slate-950 px-4 py-4 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() =>
                  setOpen((current) => nextNavigationMenuState(current, "close"))
                }
                className="rounded text-base font-medium text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#solutions"
              onClick={() =>
                setOpen((current) => nextNavigationMenuState(current, "close"))
              }
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Explore systems
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
