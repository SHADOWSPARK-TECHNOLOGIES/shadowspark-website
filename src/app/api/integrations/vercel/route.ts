import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    type: "integration",
    name: "ShadowSpark for Vercel",
    description:
      "Connect Vercel deployments to ShadowSpark rewards and pilot analytics.",
    configuration: {
      url: "https://shadowspark.tech/dashboard/settings",
      access: "read-only",
      scopes: ["project", "deployment"],
    },
    webhooks: {
      deploymentSucceeded: "https://shadowspark.tech/api/integrations/vercel/events",
    },
  });
}

export async function POST(request: Request) {
  const eventType = request.headers.get("x-vercel-signature");
  if (!eventType) {
    return NextResponse.json({ error: "Missing verification" }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    message: "Vercel event acknowledged. Processing is stubbed in this release.",
  });
}
