/**
 * PasskeyClient — FIDO2/WebAuthn Passkey Registration & Login
 *
 * Provides passkey registration and authentication flows using the
 * WebAuthn API (navigator.credentials.create / navigator.credentials.get).
 *
 * Integrates with the existing NextAuth session system and the
 * new /api/auth/passkey/* API routes.
 *
 * "use client" is required for WebAuthn browser APIs.
 */

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Fingerprint, ShieldCheck, Loader2, Key } from "lucide-react";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/server";
import {
  authenticationVerificationPayload,
  registrationVerificationPayload,
  verificationSucceeded,
} from "@/lib/auth/passkey-client-contract";

// ── Types ──────────────────────────────────────────────────────────────────

type PasskeyMode = "register" | "login";

interface PasskeyClientProps {
  mode: PasskeyMode;
  email?: string;
  onSuccess?: () => void;
  className?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

// ── Component ──────────────────────────────────────────────────────────────

export function PasskeyClient({
  mode,
  email: initialEmail,
  onSuccess,
  className = "",
}: PasskeyClientProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail || "");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const checkWebAuthnSupport = useCallback((): boolean => {
    if (!window.PublicKeyCredential) {
      setError(
        "WebAuthn is not supported in this browser. Please use Chrome, Safari, or Edge.",
      );
      return false;
    }
    return true;
  }, []);

  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!checkWebAuthnSupport()) return;

      setLoading(true);
      setError(null);

      try {
        // 1. Get registration options from server
        const optionsRes = await fetch("/api/auth/register-options", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name: name || undefined }),
        });

        if (!optionsRes.ok) {
          const errData = await optionsRes.json();
          throw new Error(errData.error || "Failed to get registration options");
        }

        const registrationOptions =
          (await optionsRes.json()) as PublicKeyCredentialCreationOptionsJSON;

        const response: RegistrationResponseJSON = await startRegistration({
          optionsJSON: registrationOptions,
        });

        // 5. Verify registration on server
        const verifyRes = await fetch("/api/auth/verify-registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            registrationVerificationPayload(registrationOptions, response),
          ),
        });

        const verifyBody = (await verifyRes.json()) as {
          verified?: boolean;
          error?: string;
        };
        if (!verificationSucceeded(verifyRes.ok, verifyBody)) {
          throw new Error(verifyBody.error || "Failed to verify registration");
        }

        setSuccess(true);
        onSuccess?.();

        // Redirect to login after short delay
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Passkey registration failed",
        );
      } finally {
        setLoading(false);
      }
    },
    [email, name, checkWebAuthnSupport, onSuccess, router],
  );

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!checkWebAuthnSupport()) return;

      setLoading(true);
      setError(null);

      try {
        // 1. Get login options from server
        const optionsRes = await fetch("/api/auth/login-options", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!optionsRes.ok) {
          const errData = await optionsRes.json();
          throw new Error(errData.error || "Failed to get login options");
        }

        const authenticationOptions =
          (await optionsRes.json()) as PublicKeyCredentialRequestOptionsJSON;

        const response: AuthenticationResponseJSON = await startAuthentication({
          optionsJSON: authenticationOptions,
        });

        // 5. Verify login on server
        const verifyRes = await fetch("/api/auth/verify-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            authenticationVerificationPayload(authenticationOptions, response),
          ),
        });

        const verifyBody = (await verifyRes.json()) as {
          verified?: boolean;
          error?: string;
        };
        if (!verificationSucceeded(verifyRes.ok, verifyBody)) {
          throw new Error(verifyBody.error || "Failed to verify authentication");
        }
        setSuccess(true);
        onSuccess?.();

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Passkey authentication failed",
        );
      } finally {
        setLoading(false);
      }
    },
    [email, checkWebAuthnSupport, onSuccess, router],
  );

  return (
    <div className={`w-full ${className}`}>
      <form
        onSubmit={mode === "register" ? handleRegister : handleLogin}
        className="space-y-4"
      >
        {!initialEmail && (
          <div>
            <label
              htmlFor="passkey-email"
              className="block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="passkey-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="you@example.com"
            />
          </div>
        )}

        {mode === "register" && (
          <div>
            <label
              htmlFor="passkey-name"
              className="block text-sm font-medium text-slate-300"
            >
              Full Name
            </label>
            <input
              id="passkey-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="John Doe"
            />
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-400">
            {mode === "register"
              ? "Passkey registered successfully! Redirecting..."
              : "Authenticated successfully! Redirecting..."}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email || success}
          className="group relative w-full overflow-hidden rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md golden-transition duration-300 hover:bg-emerald-500/20 hover:shadow-[0_0_40px_rgba(16,149,106,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(16,149,106,0.08),transparent)] translate-x-[-100%] golden-transition duration-700 group-hover:translate-x-[100%]" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : mode === "register" ? (
              <Key className="h-4 w-4" />
            ) : (
              <Fingerprint className="h-4 w-4" />
            )}
            {loading
              ? mode === "register"
                ? "Registering Passkey..."
                : "Authenticating..."
              : mode === "register"
                ? "Register with Passkey"
                : "Sign in with Passkey"}
          </span>
        </button>

        <p className="text-center text-[10px] font-mono tracking-wider text-zinc-600">
          <ShieldCheck className="inline-block h-3 w-3 mr-1" />
          Phishing-resistant FIDO2/WebAuthn
        </p>
      </form>
    </div>
  );
}

export default PasskeyClient;
