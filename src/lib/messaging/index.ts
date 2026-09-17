export {
  CHANNEL_PROVIDER,
  MESSAGING_CHANNELS,
  MESSAGING_PROVIDERS,
  MessagingRoutingError,
  assertRoute,
  isMessagingChannel,
  isMessagingProvider,
  providerFor,
  type MessagingChannel,
  type MessagingProvider,
} from "./routing";

export {
  MessagingConsentError,
  MessagingService,
  MessagingStateError,
  type MessagingDb,
  type ConsentInput,
  type DeliveryAttemptStatus,
  type MessageDirection,
  type MessageState,
  type ReceiveMessageInput,
  type SendMessageInput,
} from "./service";

export { getMetaAppSecret, getWhatsAppVerifyToken, verifyMetaSignature } from "./meta-signature";
export {
  processMetaWhatsAppWebhook,
  sendWhatsAppViaMeta,
  toWhatsAppAddress,
} from "./meta-whatsapp";

