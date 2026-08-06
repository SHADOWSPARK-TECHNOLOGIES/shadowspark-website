"use client";

import type { MetaCustomData } from "@/lib/meta-api";

type MetaEventParams = MetaCustomData;

async function sendEventToServer(eventName: string, params?: MetaEventParams) {
  if (typeof window === "undefined") return;

  try {
    await fetch("/api/meta/conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: eventName,
        custom_data: params,
      }),
    });
  } catch (error) {
    console.error(`[meta-events] Server send failed for ${eventName}:`, error);
  }
}

export function trackMetaEvent(event: string, params?: MetaEventParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  try {
    if (event === "PageView") {
      window.fbq("track", "PageView", params);
    } else {
      window.fbq("trackCustom", event, params);
    }
  } catch (error) {
    console.error(`[meta-events] Failed to track ${event}:`, error);
  }
}

export function trackMetaLead(params?: MetaEventParams) {
  trackMetaEvent("Lead", params);
  void sendEventToServer("Lead", params);
}

export function trackMetaInitiateCheckout(params?: MetaEventParams) {
  trackMetaEvent("InitiateCheckout", params);
  void sendEventToServer("InitiateCheckout", params);
}

export function trackMetaPurchase(params?: MetaEventParams) {
  trackMetaEvent("Purchase", params);
  void sendEventToServer("Purchase", params);
}

export function trackMetaContact(params?: MetaEventParams) {
  trackMetaEvent("Contact", params);
  void sendEventToServer("Contact", params);
}
