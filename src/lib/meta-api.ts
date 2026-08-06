const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_API_VERSION = "v18.0";

export type MetaUserData = {
  em?: string;
  ph?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string;
  fbp?: string;
  external_id?: string;
};

export type MetaCustomData = Record<string, unknown>;

export type MetaEventPayload = {
  data: Array<{
    event_name: string;
    event_time: number;
    event_source_url?: string;
    action_source: "website";
    user_data: MetaUserData;
    custom_data?: MetaCustomData;
  }>;
};

async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function hashUserData(
  email?: string,
  phone?: string
): Promise<{ em?: string; ph?: string }> {
  const hashed: { em?: string; ph?: string } = {};

  if (email) {
    hashed.em = await sha256(email);
  }
  if (phone) {
    const normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone) {
      hashed.ph = await sha256(normalizedPhone);
    }
  }

  return hashed;
}

export function buildMetaPayload(
  eventName: string,
  userData?: MetaUserData,
  customData?: MetaCustomData,
  eventSourceUrl?: string,
  eventTime?: number
): MetaEventPayload {
  return {
    data: [
      {
        event_name: eventName,
        event_time: eventTime ?? Math.floor(Date.now() / 1000),
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: userData ?? {},
        custom_data: customData,
      },
    ],
  };
}

export async function sendToMetaAPI(payload: MetaEventPayload): Promise<{
  success: boolean;
  events_received?: number;
  error?: string;
}> {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
    return {
      success: false,
      error: "Missing META_PIXEL_ID or META_ACCESS_TOKEN environment variables",
    };
  }

  const url = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${META_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[meta-api] Conversions API error:", response.status, errorBody);
      return {
        success: false,
        error: `Meta API returned ${response.status}: ${errorBody}`,
      };
    }

    const result = (await response.json()) as { events_received?: number };
    return {
      success: true,
      events_received: result.events_received ?? 1,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[meta-api] Failed to send to Meta API:", message);
    return {
      success: false,
      error: message,
    };
  }
}
