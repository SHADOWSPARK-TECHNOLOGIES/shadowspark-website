-- Model A secure messaging: additive persistence for messages, consent, provider events, and outbound attempts.

CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'QUEUED',
    "address" TEXT NOT NULL,
    "body" TEXT,
    "templateName" TEXT,
    "idempotencyKey" TEXT,
    "leadId" TEXT,
    "providerMessageId" TEXT,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "messages_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "messages_channel_check" CHECK ("channel" IN ('WHATSAPP', 'SMS', 'VOICE')),
    CONSTRAINT "messages_provider_check" CHECK ("provider" IN ('META', 'TWILIO')),
    CONSTRAINT "messages_direction_check" CHECK ("direction" IN ('OUTBOUND', 'INBOUND')),
    CONSTRAINT "messages_state_check" CHECK ("state" IN ('QUEUED', 'SENT', 'DELIVERED', 'READ', 'FAILED')),
    CONSTRAINT "messages_route_check" CHECK (
        ("channel" = 'WHATSAPP' AND "provider" = 'META')
        OR ("channel" IN ('SMS', 'VOICE') AND "provider" = 'TWILIO')
    )
);

CREATE UNIQUE INDEX "messages_idempotencyKey_key" ON "messages"("idempotencyKey");
CREATE INDEX "messages_channel_address_idx" ON "messages"("channel", "address");
CREATE INDEX "messages_state_idx" ON "messages"("state");
CREATE INDEX "messages_provider_providerMessageId_idx" ON "messages"("provider", "providerMessageId");

ALTER TABLE "messages"
    ADD CONSTRAINT "messages_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "channel_consents" (
    "id" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "leadId" TEXT,
    "granted" BOOLEAN NOT NULL,
    "purpose" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "channel_consents_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "channel_consents_channel_check" CHECK ("channel" IN ('WHATSAPP', 'SMS', 'VOICE'))
);

CREATE UNIQUE INDEX "channel_consents_channel_address_key" ON "channel_consents"("channel", "address");
CREATE INDEX "channel_consents_address_idx" ON "channel_consents"("address");

CREATE TABLE "consent_events" (
    "id" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "purpose" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "consent_events_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "consent_events_channel_check" CHECK ("channel" IN ('WHATSAPP', 'SMS', 'VOICE')),
    CONSTRAINT "consent_events_action_check" CHECK ("action" IN ('GRANT', 'REVOKE'))
);

CREATE INDEX "consent_events_channel_address_createdAt_idx" ON "consent_events"("channel", "address", "createdAt");

CREATE TABLE "provider_events" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerEventId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "messageId" TEXT,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "provider_events_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "provider_events_provider_check" CHECK ("provider" IN ('META', 'TWILIO'))
);

CREATE UNIQUE INDEX "provider_events_provider_providerEventId_key" ON "provider_events"("provider", "providerEventId");
CREATE INDEX "provider_events_createdAt_idx" ON "provider_events"("createdAt");

ALTER TABLE "provider_events"
    ADD CONSTRAINT "provider_events_messageId_fkey"
    FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "outbound_delivery_attempts" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "providerMessageId" TEXT,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "outbound_delivery_attempts_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "outbound_delivery_attempts_status_check" CHECK ("status" IN ('ACCEPTED', 'FAILED')),
    CONSTRAINT "outbound_delivery_attempts_provider_check" CHECK ("provider" IN ('META', 'TWILIO'))
);

CREATE UNIQUE INDEX "outbound_delivery_attempts_messageId_attemptNumber_key" ON "outbound_delivery_attempts"("messageId", "attemptNumber");
CREATE INDEX "outbound_delivery_attempts_providerMessageId_idx" ON "outbound_delivery_attempts"("providerMessageId");

ALTER TABLE "outbound_delivery_attempts"
    ADD CONSTRAINT "outbound_delivery_attempts_messageId_fkey"
    FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
