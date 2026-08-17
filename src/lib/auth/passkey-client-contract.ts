import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/server";

export function registrationVerificationPayload(
  options: PublicKeyCredentialCreationOptionsJSON,
  response: RegistrationResponseJSON,
): { challenge: string; response: RegistrationResponseJSON } {
  return { challenge: options.challenge, response };
}

export function authenticationVerificationPayload(
  options: PublicKeyCredentialRequestOptionsJSON,
  response: AuthenticationResponseJSON,
): { challenge: string; response: AuthenticationResponseJSON } {
  return { challenge: options.challenge, response };
}

export function verificationSucceeded(
  responseOk: boolean,
  body: { verified?: boolean },
): boolean {
  return responseOk && body.verified === true;
}
