"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackMetaLead, trackMetaPurchase } from "@/components/meta-events";

type CalendlyContextValue = {
  openCalendly: (location: string) => void;
  closeCalendly: () => void;
};

const CalendlyContext = createContext<CalendlyContextValue | null>(null);

const CALENDLY_URL = "https://calendly.com/wonderstevie702/30min";

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("unknown");

  const openCalendly = useCallback((newLocation: string) => {
    setLocation(newLocation);
    console.log("[analytics] calendly_open", { location: newLocation });
    trackMetaLead({ location: newLocation });
    setIsOpen(true);
  }, []);

  const closeCalendly = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeCalendly();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCalendly]);

  return (
    <CalendlyContext.Provider value={{ openCalendly, closeCalendly }}>
      {children}
      <AnimatePresence>
        {isOpen && <CalendlyModal location={location} onClose={closeCalendly} />}
      </AnimatePresence>
    </CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const context = useContext(CalendlyContext);
  if (!context) {
    throw new Error("useCalendly must be used within a CalendlyProvider");
  }
  return context;
}

function CalendlyModal({ location, onClose }: { location: string; onClose: () => void }) {
  useCalendlyEventListener({
    onEventScheduled: () => {
      trackMetaPurchase({
        value: 0,
        currency: "NGN",
        content_name: "Demo Booking",
        location,
      });
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a demo with ShadowSpark"
      data-event="calendly_open"
      data-location={location}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-slate-900 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-amber-500/10 hover:text-amber-500"
          aria-label="Close booking modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="h-[70vh] min-h-[520px] w-full">
          <InlineWidget
            url={CALENDLY_URL}
            utm={{
              utmSource: "shadowspark",
              utmMedium: "website",
              utmCampaign: "enterprise",
            }}
            styles={{ height: "100%", width: "100%" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
