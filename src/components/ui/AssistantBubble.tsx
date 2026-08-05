"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

function getGreeting(): string {
  if (typeof navigator === "undefined") return "Ẹ káàbọ̀";
  const userLang = navigator.language || navigator.languages?.[0] || "en";
  if (userLang.toLowerCase().startsWith("yo")) return "Ẹ káàbọ̀";
  if (userLang.toLowerCase().startsWith("ha")) return "Sannu";
  if (userLang.toLowerCase().startsWith("ig")) return "Nnọọ";
  return "Ẹ káàbọ̀";
}

export default function AssistantBubble({ slug }: { slug?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [greeting] = useState(getGreeting);

  // The ai-sdk React hook types do not align with our runtime options shape.
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/assistant",
    body: { slug },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any) as any;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 flex h-[550px] w-[380px] flex-col overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#0A0A0A] shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-950/50 p-6">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2 w-2 rounded-full ${isLoading ? "animate-ping bg-cyan-300" : "bg-cyan-500"}`}
                />
                <div>
                  <span className="block font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                    System Assistant
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    Online · Ready
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto scroll-smooth p-6"
            >
              {messages.length === 0 && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 text-sm leading-relaxed text-zinc-300">
                  {greeting}. This is the ShadowSpark System Assistant. Ask me about
                  deployment, pricing, or how our infrastructure works.
                </div>
              )}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {messages.map((m: any) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl border p-4 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-tr-none border-cyan-500/20 bg-cyan-500/10 text-white"
                        : "rounded-tl-none border-zinc-800 bg-zinc-900/50 text-zinc-300"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex animate-pulse items-center justify-start gap-2 text-xs text-zinc-500">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  </span>
                  Infrastructure AI is reasoning...
                </div>
              )}
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-xs text-red-500">
                  System Error: Neural link interrupted. Please try again.
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-zinc-900 bg-zinc-950 p-4">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about deployment, pricing, or infrastructure..."
                  className="w-full rounded-xl border border-zinc-800 bg-[#050505] px-4 py-3 pr-12 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 text-cyan-500 transition-colors disabled:text-zinc-700"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-[101] flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 text-black shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
      </button>
    </div>
  );
}
