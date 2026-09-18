const WEBHOOKS = [
  { label: "Meta WhatsApp webhook", path: "/api/webhooks/whatsapp/meta" },
  { label: "Twilio SMS webhook", path: "/api/webhooks/twilio/sms" },
  { label: "Twilio Voice webhook", path: "/api/webhooks/twilio/voice" },
  { label: "Paystack webhook", path: "/api/webhooks/paystack" },
] as const;

const SECRET_NAMES = [
  "CRON_SECRET",
  "WHATSAPP_VERIFY_TOKEN",
  "META_APP_SECRET",
  "WHATSAPP_API_TOKEN",
  "TWILIO_AUTH_TOKEN",
  "DATABASE_URL",
] as const;

export default function SettingsPage() {
  return (
    <>
      <div>
        <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Settings
        </h2>
        <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginTop: 2 }}>
          Read-only repository paths and secret names. Values are not stored on this page.
        </p>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <div className="card-title">Listings expiry cron</div>
          <div className="card-sub">From vercel.json · Vercel invokes GET</div>
        </div>
        <div className="settings-section">
          <div className="settings-row">
            <div>
              <div className="settings-label">Path</div>
            </div>
            <code className="settings-input">/api/cron/listings/expiry</code>
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-label">Schedule (UTC)</div>
            </div>
            <code className="settings-input">0 9 * * *</code>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <div className="card-title">Messaging webhooks</div>
          <div className="card-sub">WhatsApp is Meta-only. Twilio is SMS and Voice.</div>
        </div>
        <div className="settings-section">
          {WEBHOOKS.map((hook) => (
            <div className="settings-row" key={hook.path}>
              <div>
                <div className="settings-label">{hook.label}</div>
              </div>
              <code className="settings-input">{hook.path}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <div className="card-title">Hosting secrets</div>
          <div className="card-sub">Names only. Values live in the hosting environment.</div>
        </div>
        <div className="settings-section">
          {SECRET_NAMES.map((name) => (
            <div className="settings-row" key={name}>
              <div>
                <div className="settings-label">{name}</div>
              </div>
              <span className="settings-desc">not shown here</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
