export const MESSAGING_CHANNELS = ["WHATSAPP", "SMS", "VOICE"] as const;
export const MESSAGING_PROVIDERS = ["META", "TWILIO"] as const;

export type MessagingChannel = (typeof MESSAGING_CHANNELS)[number];
export type MessagingProvider = (typeof MESSAGING_PROVIDERS)[number];

export const CHANNEL_PROVIDER = {
  WHATSAPP: "META",
  SMS: "TWILIO",
  VOICE: "TWILIO",
} as const satisfies Record<MessagingChannel, MessagingProvider>;

export class MessagingRoutingError extends Error {
  readonly code = "MESSAGING_ROUTING" as const;

  constructor(message: string) {
    super(message);
    this.name = "MessagingRoutingError";
  }
}

export function isMessagingChannel(value: string): value is MessagingChannel {
  return (MESSAGING_CHANNELS as readonly string[]).includes(value);
}

export function providerFor(channel: MessagingChannel): MessagingProvider {
  return CHANNEL_PROVIDER[channel];
}

export function assertRoute(
  channel: string,
  provider?: string,
): { channel: MessagingChannel; provider: MessagingProvider } {
  if (!isMessagingChannel(channel)) {
    throw new MessagingRoutingError(`Unsupported messaging channel: ${channel}`);
  }

  const expected = providerFor(channel);
  if (provider && provider !== expected) {
    throw new MessagingRoutingError(
      `Invalid route: ${channel} must use ${expected}, not ${provider}`,
    );
  }

  return { channel, provider: expected };
}
