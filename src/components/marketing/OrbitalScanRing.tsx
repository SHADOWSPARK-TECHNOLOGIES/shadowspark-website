/**
 * OrbitalScanRing — Anti-Deepfake Identity Component
 *
 * Renders an interactive orbital scan ring animation (2000ms linear infinite)
 * around a user avatar placeholder. This is purely visual UI that signals
 * "Active Liveness + Passive Behavioral Biometrics" to combat AI-fraud.
 *
 * "use client" not strictly needed since this is visual-only, but we use it
 * to support future interactivity.
 */

"use client";

import { Shield } from "lucide-react";

export function OrbitalScanRing() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Scan ring container */}
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Outer orbital ring */}
        <svg
          className="absolute inset-0 h-full w-full animate-[spin_2000ms_linear_infinite]"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animationTimingFunction: "linear" }}
        >
          {/* Dashed orbital path */}
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="url(#orbital-gradient)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            strokeLinecap="round"
          />
          {/* Scan arc (the moving highlight) */}
          <path
            d="M64 4 A60 60 0 0 1 124 64"
            stroke="#10956a"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="opacity-80"
          />
          {/* Orbital node */}
          <circle cx="64" cy="4" r="3" fill="#14b87a">
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="2000ms"
              repeatCount="indefinite"
            />
          </circle>
          <defs>
            <linearGradient id="orbital-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10956a" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#10956a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10956a" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner ring (counter-rotating) */}
        <svg
          className="absolute inset-4 h-[calc(100%-32px)] w-[calc(100%-32px)] animate-[spin_3000ms_linear_infinite]"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animationTimingFunction: "linear", animationDirection: "reverse" }}
        >
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke="#c9922a"
            strokeWidth="1"
            strokeDasharray="3 6"
            strokeLinecap="round"
            fill="none"
            className="opacity-30"
          />
        </svg>

        {/* Avatar placeholder */}
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-500/30 bg-emerald-500/10">
          <Shield className="h-8 w-8 text-emerald-400" />
        </div>
      </div>

      {/* Identity status */}
      <div className="text-center">
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-400">
          IDENTITY STATUS: SECURED
        </p>
        <p className="mt-1.5 text-[10px] font-mono tracking-wider text-zinc-600">
          Hardware-backed FIDO2 + Active Liveness
        </p>
        <p className="mt-0.5 text-[9px] font-mono tracking-[0.18em] text-zinc-700">
          rPPG Passive Scanning Active
        </p>
      </div>

      {/* Feature highlights */}
      <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active Liveness
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Passive Behavioral Biometrics
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Anti-Deepfake (69% AI-Fraud Mitigation)
        </span>
      </div>
    </div>
  );
}

export default OrbitalScanRing;
