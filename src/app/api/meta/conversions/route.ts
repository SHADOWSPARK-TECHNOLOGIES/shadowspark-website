import { NextResponse, type NextRequest } from "next/server";
import {
  buildMetaPayload,
  hashUserData,
  sendToMetaAPI,
  type MetaUserData,
  type MetaCustomData,
} from "@/lib/meta-api";

type ConversionsRequestBody = {
  event_name: string;
  event_time?: number;
  user_data?: {
    em?: string;
    ph?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
    external_id?: string;
  };
  custom_data?: MetaCustomData;
};

function sanitizeUserData(
  userData: ConversionsRequestBody["user_data"]
): MetaUserData | undefined {
  if (!userData) return undefined;

  const sanitized: MetaUserData = {};

  if (userData.client_ip_address) sanitized.client_ip_address = userData.client_ip_address;
  if (userData.client_user_agent) sanitized.client_user_agent = userData.client_user_agent;
  if (userData.fbc) sanitized.fbc = userData.fbc;
  if (userData.fbp) sanitized.fbp = userData.fbp;
  if (userData.external_id) sanitized.external_id = userData.external_id;

  return sanitized;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ConversionsRequestBody;

    if (!body.event_name || typeof body.event_name !== "string") {
      return NextResponse.json(
        { success: false, error: "event_name is required" },
        { status: 400 }
      );
    }

    const hashed = await hashUserData(body.user_data?.em, body.user_data?.ph);
    const sanitizedUserData = sanitizeUserData(body.user_data);

    const userData: MetaUserData = {
      ...sanitizedUserData,
      ...hashed,
    };

    const eventSourceUrl = request.headers.get("referer") ?? undefined;

    const payload = buildMetaPayload(
      body.event_name,
      userData,
      body.custom_data,
      eventSourceUrl,
      body.event_time
    );

    const result = await sendToMetaAPI(payload);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      events_received: result.events_received ?? 1,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[meta/conversions] Request failed:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
