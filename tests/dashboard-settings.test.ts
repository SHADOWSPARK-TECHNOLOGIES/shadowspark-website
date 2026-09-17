import { readFile } from "node:fs/promises";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import SettingsPage from "@/app/dashboard/settings/page";

describe("dashboard settings", () => {
  it("renders truthful webhook and cron paths without fake credential material", () => {
    const html = renderToStaticMarkup(createElement(SettingsPage));

    expect(html).toContain("/api/webhooks/whatsapp/meta");
    expect(html).toContain("/api/webhooks/twilio/sms");
    expect(html).toContain("/api/webhooks/twilio/voice");
    expect(html).toContain("/api/webhooks/paystack");
    expect(html).toContain("/api/cron/listings/expiry");
    expect(html).toContain("0 9 * * *");
    expect(html).not.toContain("postgresql://");
    expect(html).not.toContain("neon-secret-url");
    expect(html).not.toContain("/api/webhooks/whatsapp/twilio");
  });

  it("does not keep credential-shaped defaults in source", async () => {
    const source = await readFile(
      path.join(process.cwd(), "src/app/dashboard/settings/page.tsx"),
      "utf8",
    );
    expect(source).not.toContain("postgresql://");
    expect(source).not.toContain("c005a720");
    expect(source).not.toContain("Save Changes");
  });
});
