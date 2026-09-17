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
  isOutboundAlreadyAccepted,
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
export {
  getTwilioAuthToken,
  getTwilioPublicUrl,
  parseTwilioFormBody,
  verifyTwilioSignature,
} from "./twilio-signature";
export {
  isSmsStopCommand,
  processTwilioSmsWebhook,
  processTwilioVoiceWebhook,
  rejectTwilioWhatsApp,
  sendSmsViaTwilio,
  sendVoiceViaTwilio,
} from "./twilio-adapter";

