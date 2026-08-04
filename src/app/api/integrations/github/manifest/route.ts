import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "ShadowSpark Copilot Rewards",
    url: "https://shadowspark.tech",
    hook_attributes: {
      url: "https://shadowspark.tech/api/integrations/github/events",
    },
    redirect_url: "https://shadowspark.tech/dashboard/pilots",
    setup_url: "https://shadowspark.tech/dashboard/settings",
    setup_on_update: true,
    default_permissions: {
      contents: "read",
      pull_requests: "read",
      issues: "read",
    },
    default_events: ["pull_request", "push", "issues"],
    public: false,
    description:
      "Reward contributors for shipped code, security fixes, and pilot impact directly inside GitHub.",
  });
}
