import { describe, expect, it } from "vitest";

import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/server";

import {
  authenticationVerificationPayload,
  registrationVerificationPayload,
  verificationSucceeded,
} from "@/lib/auth/passkey-client-contract";

const registrationOptions: PublicKeyCredentialCreationOptionsJSON = {
  rp: { name: "ShadowSpark", id: "example.com" },
  user: { id: "user-id", name: "user@example.com", displayName: "User" },
  challenge: "registration-challenge",
  pubKeyCredParams: [{ alg: -7, type: "public-key" }],
};

const registrationResponse: RegistrationResponseJSON = {
  id: "credential-id",
  rawId: "credential-id",
  type: "public-key",
  response: {
    clientDataJSON: "client-data",
    attestationObject: "attestation",
  },
  clientExtensionResults: {},
};

const authenticationOptions: PublicKeyCredentialRequestOptionsJSON = {
  challenge: "authentication-challenge",
  rpId: "example.com",
  userVerification: "required",
};

const authenticationResponse: AuthenticationResponseJSON = {
  id: "credential-id",
  rawId: "credential-id",
  type: "public-key",
  response: {
    clientDataJSON: "client-data",
    authenticatorData: "authenticator-data",
    signature: "signature",
    userHandle: null,
  },
  clientExtensionResults: {},
};

describe("passkey browser contracts", () => {
  it("builds registration payloads from the server challenge and browser response", () => {
    expect(registrationVerificationPayload(registrationOptions, registrationResponse)).toEqual({
      challenge: "registration-challenge",
      response: registrationResponse,
    });
    expect(registrationVerificationPayload(registrationOptions, registrationResponse)).not.toHaveProperty("userId");
    expect(registrationVerificationPayload(registrationOptions, registrationResponse)).not.toHaveProperty("publicKey");
    expect(registrationVerificationPayload(registrationOptions, registrationResponse)).not.toHaveProperty("signatureCounter");
    expect(registrationVerificationPayload(registrationOptions, registrationResponse)).not.toHaveProperty("handoff");
  });

  it("builds authentication payloads without client-derived proof fields", () => {
    expect(authenticationVerificationPayload(authenticationOptions, authenticationResponse)).toEqual({
      challenge: "authentication-challenge",
      response: authenticationResponse,
    });
    expect(authenticationVerificationPayload(authenticationOptions, authenticationResponse)).not.toHaveProperty("userId");
    expect(authenticationVerificationPayload(authenticationOptions, authenticationResponse)).not.toHaveProperty("publicKey");
    expect(authenticationVerificationPayload(authenticationOptions, authenticationResponse)).not.toHaveProperty("signatureCounter");
    expect(authenticationVerificationPayload(authenticationOptions, authenticationResponse)).not.toHaveProperty("handoff");
  });

  it("allows redirects only for an HTTP success with explicit verification", () => {
    expect(verificationSucceeded(true, { verified: true })).toBe(true);
    expect(verificationSucceeded(false, { verified: true })).toBe(false);
    expect(verificationSucceeded(true, { verified: false })).toBe(false);
    expect(verificationSucceeded(true, {})).toBe(false);
  });
});
